import express from "express";
import { google } from "googleapis";
import pool from "../db/pool.js";
import { getOAuthClient } from "../google/googleClient.js";
import { getValidAccessToken } from "../google/getAccessToken.js";
import {
  OFFICE_END_HOUR,
  OFFICE_START_HOUR,
  addMinutes,
  buildDateTime,
  isWorkingDay,
  isWithinOfficeHours,
  parseDuration,
} from "../utils/scheduling.js";

const router = express.Router();
const SUPPORTED_LANGUAGES = new Set(["en", "fr", "he", "nl"]);

function isValidDateString(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createValidationError(error) {
  return { ok: false, error };
}

function parseBookingPayload(body) {
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim().toLowerCase();
  const phone = String(body?.phone || "").trim();
  const service = String(body?.service || "").trim();
  const language = String(body?.language || "").trim().toLowerCase();
  const date = String(body?.date || "").trim();
  const start = String(body?.start || "").trim();
  const duration = parseDuration(body?.duration);

  if (!name) return createValidationError("Name is required");
  if (!isValidEmail(email)) return createValidationError("Valid email is required");
  if (!service) return createValidationError("Service is required");
  if (!SUPPORTED_LANGUAGES.has(language)) {
    return createValidationError("Language must be one of: en, fr, he, nl");
  }
  if (!isValidDateString(date)) {
    return createValidationError("Date must be YYYY-MM-DD");
  }
  if (!/^\d{2}:\d{2}$/.test(start)) {
    return createValidationError("Start time must be HH:MM");
  }
  if (!duration) return createValidationError("Duration must be 30 or 60");

  const [hour, minute] = start.split(":").map(Number);
  const startTime = buildDateTime(date, hour, minute);
  const endTime = addMinutes(startTime, duration);

  if (!isWorkingDay(startTime)) {
    return createValidationError("Appointments are available Sunday to Thursday only");
  }

  if (!isWithinOfficeHours(startTime, duration)) {
    return createValidationError(
      `Slot must be within office hours ${String(OFFICE_START_HOUR).padStart(2, "0")}:00-${String(OFFICE_END_HOUR).padStart(2, "0")}:00`
    );
  }

  return {
    ok: true,
    payload: {
      name,
      email,
      phone: phone || null,
      service,
      language,
      date,
      start,
      duration,
      startTime,
      endTime,
    },
  };
}

router.post("/", async (req, res) => {
  const parsed = parseBookingPayload(req.body);
  if (!parsed.ok) {
    return res.status(400).json({ error: parsed.error });
  }

  const booking = parsed.payload;
  let createdEventId = null;

  try {
    const accessToken = await getValidAccessToken();
    const oauth2Client = getOAuthClient();
    oauth2Client.setCredentials({ access_token: accessToken });
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const freeBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: booking.startTime.toISOString(),
        timeMax: booking.endTime.toISOString(),
        items: [{ id: "primary" }],
      },
    });

    const busy = freeBusy.data.calendars?.primary?.busy ?? [];
    if (busy.length > 0) {
      return res.status(409).json({ error: "Requested slot is no longer available" });
    }

    const dbClient = await pool.connect();
    try {
      await dbClient.query("BEGIN");

      const overlapResult = await dbClient.query(
        `
          SELECT id
          FROM appointments
          WHERE tstzrange(start_time, end_time, '[)') && tstzrange($1::timestamptz, $2::timestamptz, '[)')
          LIMIT 1
        `,
        [booking.startTime.toISOString(), booking.endTime.toISOString()]
      );

      if (overlapResult.rows.length > 0) {
        await dbClient.query("ROLLBACK");
        return res.status(409).json({ error: "Requested slot is already booked" });
      }

      const event = await calendar.events.insert({
        calendarId: "primary",
        requestBody: {
          summary: `${booking.service} consultation`,
          description: [
            `Client: ${booking.name}`,
            `Email: ${booking.email}`,
            booking.phone ? `Phone: ${booking.phone}` : null,
            `Language: ${booking.language}`,
            `Duration: ${booking.duration} minutes`,
          ]
            .filter(Boolean)
            .join("\n"),
          start: { dateTime: booking.startTime.toISOString() },
          end: { dateTime: booking.endTime.toISOString() },
        },
      });

      createdEventId = event.data.id;

      const insertResult = await dbClient.query(
        `
          INSERT INTO appointments
            (name, email, phone, service, duration, language, start_time, end_time, google_event_id)
          VALUES
            ($1, $2, $3, $4, $5, $6, $7::timestamptz, $8::timestamptz, $9)
          RETURNING id, name, email, phone, service, duration, language, start_time, end_time, google_event_id, created_at
        `,
        [
          booking.name,
          booking.email,
          booking.phone,
          booking.service,
          booking.duration,
          booking.language,
          booking.startTime.toISOString(),
          booking.endTime.toISOString(),
          createdEventId,
        ]
      );

      await dbClient.query("COMMIT");
      return res.status(201).json({ appointment: insertResult.rows[0] });
    } catch (dbOrEventError) {
      await dbClient.query("ROLLBACK");

      if (createdEventId) {
        try {
          await calendar.events.delete({
            calendarId: "primary",
            eventId: createdEventId,
          });
        } catch (cleanupError) {
          console.error("Failed to rollback Google event:", cleanupError);
        }
      }

      throw dbOrEventError;
    } finally {
      dbClient.release();
    }
  } catch (err) {
    console.error("Booking error:");
    console.error(err?.response?.data || err);

    const details = err?.response?.data || String(err);
    const message = String(err?.message || "").toLowerCase();
    const providerError = String(err?.response?.data?.error || "").toLowerCase();
    const providerPayload = err?.response?.data?.error;
    const providerStatus = String(providerPayload?.status || "").toLowerCase();
    const providerMessage = String(providerPayload?.message || "").toLowerCase();
    const hasInsufficientPermissionReason = Array.isArray(providerPayload?.errors)
      ? providerPayload.errors.some(
          (item) => String(item?.reason || "").toLowerCase() === "insufficientpermissions"
        )
      : false;
    const hasScopeInsufficientDetail = Array.isArray(providerPayload?.details)
      ? providerPayload.details.some(
          (item) =>
            String(item?.reason || "").toLowerCase() === "access_token_scope_insufficient"
        )
      : false;

    const scopeInsufficient =
      providerError === "insufficientpermissions" ||
      providerStatus === "permission_denied" ||
      providerMessage.includes("insufficient authentication scopes") ||
      String(details).toLowerCase().includes("insufficient authentication scopes") ||
      String(details).toLowerCase().includes("access_token_scope_insufficient") ||
      hasInsufficientPermissionReason ||
      hasScopeInsufficientDetail;

    if (scopeInsufficient) {
      return res.status(401).json({
        error: "Google Calendar permissions are insufficient",
        code: "GOOGLE_RECONNECT_REQUIRED",
        details,
      });
    }

    if (message.includes("no google tokens stored") || providerError === "invalid_grant") {
      return res.status(401).json({
        error: "Google Calendar is not connected",
        code: "GOOGLE_NOT_CONNECTED",
        details,
      });
    }

    return res.status(500).json({
      error: "Booking failed",
      details,
    });
  }
});

export default router;
