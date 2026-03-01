import express from "express";
import crypto from "crypto";
import pool from "../db/pool.js";
import { getOAuthClient } from "../google/googleClient.js";

const router = express.Router();

// Full Calendar scope (read + availability + create/update events)
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

function canStartOAuth(req) {
  if (process.env.NODE_ENV !== "production") return true;
  if (String(process.env.OAUTH_CONNECT_LOCKED || "").toLowerCase() === "true") {
    return false;
  }

  const requiredToken = process.env.OAUTH_CONNECT_TOKEN;
  if (!requiredToken) return false;

  const providedToken =
    String(req.query.connect_token || "").trim() ||
    String(req.get("x-oauth-connect-token") || "").trim();

  return providedToken === requiredToken;
}

router.get("/google", (req, res) => {
  if (!canStartOAuth(req)) {
    return res.status(403).json({ error: "OAuth connect is restricted" });
  }

  const oauth2Client = getOAuthClient();

  const state = crypto.randomBytes(24).toString("hex");
  req.session.oauthState = state;

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    state,
    prompt: "consent", // ensures refresh_token on connect (esp first time)
  });

  return res.redirect(url);
});

router.get("/google/callback", async (req, res) => {
  try {
    const { code, state } = req.query;

    if (!code) return res.status(400).json({ error: "Missing code" });
    if (!state) return res.status(400).json({ error: "Missing state" });

    if (!req.session.oauthState || req.session.oauthState !== state) {
      return res.status(401).json({ error: "Invalid state" });
    }

    const oauth2Client = getOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);

    // tokens: access_token, refresh_token (sometimes), scope, token_type, expiry_date(ms)
    const accessToken = tokens.access_token || null;
    const refreshToken = tokens.refresh_token || null;
    const scope = tokens.scope || null;
    const tokenType = tokens.token_type || null;
    const expiryDate = tokens.expiry_date || null;

    // IMPORTANT: don't overwrite refresh_token with null
    console.log("SAVING TOKENS TO DB...", {
      accessToken: !!accessToken,
      refreshToken: !!refreshToken,
      expiryDate,
      scope,
    });

    await pool.query(
      `
        INSERT INTO google_tokens (id, access_token, refresh_token, scope, expiry_date)
        VALUES (1, $1, $2, $3, $4)
        ON CONFLICT (id) DO UPDATE SET
          access_token = EXCLUDED.access_token,
          scope = EXCLUDED.scope,
          expiry_date = EXCLUDED.expiry_date,
          refresh_token = COALESCE(EXCLUDED.refresh_token, google_tokens.refresh_token)
        `,
      [accessToken, refreshToken, scope, expiryDate]
    );
    // Cleanup state
    req.session.oauthState = null;

    return res.redirect(`${process.env.CLIENT_URL}/connected`);
  } catch (err) {
    console.error("OAuth callback error:");
    console.error(err?.response?.data || err); // <-- this prints Google error body when it exists
    return res.status(500).json({
      error: "OAuth failed",
      details: err?.response?.data || String(err),
    });
  }
});

export default router;
