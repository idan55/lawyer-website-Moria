import express from "express";
import { google } from "googleapis";
import { getValidAccessToken } from "../google/getAccessToken.js";
import { getOAuthClient } from "../google/googleClient.js";
import {
  OFFICE_END_HOUR,
  OFFICE_START_HOUR,
  buildDateTime,
  parseDuration,
  buildCandidateSlots,
  toSlots,
} from "../utils/scheduling.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const date = req.query.date; // YYYY-MM-DD
    if (!date) return res.status(400).json({ error: "Missing date" });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD" });
    }

    const requestedDuration = parseDuration(req.query.duration);
    if (req.query.duration !== undefined && requestedDuration === null) {
      return res.status(400).json({ error: "Invalid duration. Use 30 or 60" });
    }

    const accessToken = await getValidAccessToken();

    const oauth2Client = getOAuthClient();
    oauth2Client.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const startOfDay = buildDateTime(date, OFFICE_START_HOUR);
    const endOfDay = buildDateTime(date, OFFICE_END_HOUR);

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        items: [{ id: "primary" }],
      },
    });

    const busy = response.data.calendars?.primary?.busy ?? [];
    const busyWindows = busy.map((window) => ({
      start: new Date(window.start),
      end: new Date(window.end),
    }));

    const candidates = buildCandidateSlots(startOfDay, endOfDay);

    const slot30 = toSlots(candidates, 30, busyWindows);
    const slot60 = toSlots(candidates, 60, busyWindows);

    const availableSlots =
      requestedDuration === 30
        ? slot30
        : requestedDuration === 60
          ? slot60
          : { "30": slot30, "60": slot60 };

    return res.json({
      date,
      officeHours: {
        start: `${String(OFFICE_START_HOUR).padStart(2, "0")}:00`,
        end: `${String(OFFICE_END_HOUR).padStart(2, "0")}:00`,
      },
      busy,
      availableSlots,
    });
  } catch (err) {
    console.error("Availability error:");
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

    res.status(500).json({
      error: "Availability failed",
      details,
    });
  }
});

export default router;
