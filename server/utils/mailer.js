import { Resend } from "resend";

let mailer;

export function getMailer() {
  if (mailer) return mailer;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const resend = new Resend(apiKey);

  mailer = {
    async sendMail({ from, to, replyTo, subject, text, html, attachments }) {
      const { error } = await resend.emails.send({
        from,
        to,
        replyTo,
        subject,
        text,
        html,
        attachments,
      });

      if (error) {
        throw new Error(`Resend send failed: ${error.message || String(error)}`);
      }
    },
  };

  return mailer;
}
