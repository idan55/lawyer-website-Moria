import express from "express";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { getMailer } from "../utils/mailer.js";

const router = express.Router();
const OFFICE_EMAIL = "moria@rodriglaw.com";
const CONTACT_FROM_EMAIL = "contact@rodriglaw.com";
const NO_REPLY_FROM_EMAIL = "no-reply@rodriglaw.com";
const SUPPORTED_LANGUAGES = new Set(["en", "fr", "he", "nl"]);
const LOGO_CONTENT_ID = "brand-logo";
const LOGO_FILE_PATH = fileURLToPath(
  new URL("../../public/brand-logo.png", import.meta.url)
);
let logoAttachment;

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

function normalizeLanguage(value) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .split("-")[0];
  return SUPPORTED_LANGUAGES.has(normalized) ? normalized : "en";
}

function normalizeBaseUrl(value) {
  const base = String(value || "").trim();
  if (!base) return "";
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

function getLogoAttachment() {
  if (logoAttachment !== undefined) return logoAttachment;

  try {
    const pngBuffer = fs.readFileSync(LOGO_FILE_PATH);
    logoAttachment = {
      filename: "brand-logo.png",
      content: pngBuffer.toString("base64"),
      contentType: "image/png",
      contentId: LOGO_CONTENT_ID,
    };
  } catch {
    logoAttachment = null;
  }

  return logoAttachment;
}

function buildConfirmationFooterHtml({ inlineLogo = false, logoUrl = "" }) {
  const src = inlineLogo ? `cid:${LOGO_CONTENT_ID}` : logoUrl;
  if (!src) return "";
  return `
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e6e6e6;">
      <img src="${src}" alt="Moria Rodrig - Law Office and Notary" width="140" style="display:block;max-width:140px;height:auto;" />
    </div>
  `;
}

function getConfirmationCopy(language, name, rawMessage, safeName, safeMessage) {
  if (language === "he") {
    return {
      subject: "קיבלנו את ההודעה שלך",
      text: `שלום ${name},\n\nקיבלנו את ההודעה שלך והיא נשלחה לתיבת המשרד. נחזור אליך בהקדם האפשרי.\n\nההודעה שלך:\n${rawMessage}\n\nאם לא שלחת את ההודעה, אפשר להתעלם מהמייל הזה.`,
      html: `
        <p>שלום ${safeName},</p>
        <p>קיבלנו את ההודעה שלך והיא נשלחה לתיבת המשרד. נחזור אליך בהקדם האפשרי.</p>
        <hr/>
        <p><strong>ההודעה שלך:</strong></p>
        <p>${safeMessage}</p>
        <p style="color:#666;font-size:12px;">אם לא שלחת את ההודעה, אפשר להתעלם מהמייל הזה.</p>
      `,
    };
  }

  if (language === "fr") {
    return {
      subject: "Nous avons bien recu votre message",
      text: `Bonjour ${name},\n\nNous avons bien recu votre message et il a ete transmis a notre cabinet. Nous vous repondrons des que possible.\n\nVotre message:\n${rawMessage}\n\nSi vous n'avez pas envoye ce message, vous pouvez ignorer cet e-mail.`,
      html: `
        <p>Bonjour ${safeName},</p>
        <p>Nous avons bien recu votre message et il a ete transmis a notre cabinet. Nous vous repondrons des que possible.</p>
        <hr/>
        <p><strong>Votre message:</strong></p>
        <p>${safeMessage}</p>
        <p style="color:#666;font-size:12px;">Si vous n'avez pas envoye ce message, vous pouvez ignorer cet e-mail.</p>
      `,
    };
  }

  if (language === "nl") {
    return {
      subject: "We hebben je bericht ontvangen",
      text: `Hallo ${name},\n\nWe hebben je bericht ontvangen en doorgestuurd naar ons kantoor. We nemen zo snel mogelijk contact met je op.\n\nJe bericht:\n${rawMessage}\n\nAls je dit bericht niet hebt verzonden, kun je deze e-mail negeren.`,
      html: `
        <p>Hallo ${safeName},</p>
        <p>We hebben je bericht ontvangen en doorgestuurd naar ons kantoor. We nemen zo snel mogelijk contact met je op.</p>
        <hr/>
        <p><strong>Je bericht:</strong></p>
        <p>${safeMessage}</p>
        <p style="color:#666;font-size:12px;">Als je dit bericht niet hebt verzonden, kun je deze e-mail negeren.</p>
      `,
    };
  }

  return {
    subject: "We received your message",
    text: `Hello ${name},\n\nWe received your message and it has been delivered to our office mailbox. We'll get back to you as soon as possible.\n\nYour message:\n${rawMessage}\n\nIf you didn't send this message, you can ignore this email.`,
    html: `
      <p>Hello ${safeName},</p>
      <p>We received your message and it has been delivered to our office mailbox. We'll get back to you as soon as possible.</p>
      <hr/>
      <p><strong>Your message:</strong></p>
      <p>${safeMessage}</p>
      <p style="color:#666;font-size:12px;">If you didn't send this message, you can ignore this email.</p>
    `,
  };
}

router.post("/", async (req, res) => {
  try {
    const name = String(req.body?.name || "").trim();
    const phone = String(req.body?.phone || "").trim();
    const email = String(req.body?.email || "").trim().toLowerCase();
    const message = String(req.body?.message || "").trim();
    const consent = Boolean(req.body?.consent);
    const language = normalizeLanguage(req.body?.language);

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
    const inlineLogoAttachment = getLogoAttachment();
    const clientBaseUrl = normalizeBaseUrl(process.env.CLIENT_URL);
    const logoUrl = clientBaseUrl ? `${clientBaseUrl}/brand-logo.png` : "";
    const confirmationFooterHtml = buildConfirmationFooterHtml({
      inlineLogo: Boolean(inlineLogoAttachment),
      logoUrl,
    });
    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>");
    const confirmationCopy = getConfirmationCopy(
      language,
      name,
      message,
      safeName,
      safeMessage
    );

    await mailer.sendMail({
      from: CONTACT_FROM_EMAIL,
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
      from: NO_REPLY_FROM_EMAIL,
      to: email,
      subject: confirmationCopy.subject,
      text: confirmationCopy.text,
      html: `${confirmationCopy.html}${confirmationFooterHtml}`,
      attachments: inlineLogoAttachment ? [inlineLogoAttachment] : undefined,
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
