import nodemailer from "nodemailer";

function parseBoolean(value, fallback = false) {
  if (value === undefined) return fallback;
  return String(value).toLowerCase() === "true";
}

function parseNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

let transporter;

export function getMailer() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = parseNumber(process.env.SMTP_PORT, 587);
  const secure = parseBoolean(process.env.SMTP_SECURE, port === 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured");
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}
