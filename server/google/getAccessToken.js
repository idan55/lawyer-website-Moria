import pool from "../db/pool.js";
import { google } from "googleapis";
import { getOAuthClient } from "./googleClient.js";

export async function getValidAccessToken() {
  const { rows } = await pool.query(
    "SELECT * FROM google_tokens WHERE id = 1"
  );

  if (!rows.length) {
    throw new Error("No Google tokens stored");
  }

  const tokenData = rows[0];

  const oauth2Client = getOAuthClient();
  oauth2Client.setCredentials({
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expiry_date: tokenData.expiry_date,
  });

  // auto refresh if expired
  if (Date.now() >= tokenData.expiry_date) {
    const { credentials } = await oauth2Client.refreshAccessToken();

    await pool.query(
      `UPDATE google_tokens
       SET access_token=$1,
           expiry_date=$2
       WHERE id=1`,
      [credentials.access_token, credentials.expiry_date]
    );

    return credentials.access_token;
  }

  return tokenData.access_token;
}
