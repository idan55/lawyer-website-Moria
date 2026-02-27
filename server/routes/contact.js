import express from "express";
import { getMailer } from "../utils/mailer.js";

const router = express.Router();
const OFFICE_EMAIL = "moria@rodriglaw.com";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  const normalized = String(phone || "").replace(/[\s\-().]/g, "");
  if (!/^\+?\d+$/.test(normalized)) return false;
  const digitsOnly = normalized.startsWith("+")
    ? normalized.slice(1)
    : normalized;
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

router.post("/", async (req, res) => {
  try {
    const name = String(req.body?.name || "").trim();
    const phone = String(req.body?.phone || "").trim();
    const email = String(req.body?.email || "").trim().toLowerCase();
    const message = String(req.body?.message || "").trim();
    const consent = Boolean(req.body?.consent);

    if (name.length < 2) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!isValidPhone(phone)) {
      return res
        .status(400)
        .json({ error: "Enter a valid international phone number" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    if (message.length < 5) {
      return res.status(400).json({ error: "Message is required" });
    }
    if (!consent) {
      return res.status(400).json({ error: "Consent is required" });
    }

    const mailer = getMailer();
    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER;

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>");

    await mailer.sendMail({
      from: fromAddress,
      to: OFFICE_EMAIL,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    await mailer.sendMail({
      from: fromAddress,
      to: email,
      subject: "Your message has been sent to moria@rodriglaw.com",
      text: `Hello ${name},\n\nYour message has been sent to moria@rodriglaw.com. We will get back to you as soon as possible.\n\nRegards,\nMoria Rodrig - Law Office and Notary`,
      html: `
        <p>Hello ${safeName},</p>
        <p>Your message has been sent to <strong>moria@rodriglaw.com</strong>.</p>
        <p>We will get back to you as soon as possible.</p>
        <p>Regards,<br/>Moria Rodrig - Law Office and Notary</p>
      `,
    });

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("Contact form error:");
    console.error(err);
    return res.status(500).json({
      error: "Failed to send message",
      details: String(err),
    });
  }
});

export default router;
