import nodemailer from "nodemailer";

export type MailMessage = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  fromName?: string;
};

export function getMailConfig() {
  const businessEmail =
    process.env.BUSINESS_EMAIL || process.env.SMTP_USER || "";
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass || !businessEmail) {
    return null;
  }

  return { host, port, user, pass, businessEmail };
}

export async function sendMail(message: MailMessage) {
  const config = getMailConfig();
  if (!config) return { sent: false as const, reason: "missing-config" as const };

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });

  await transporter.sendMail({
    from: `"${message.fromName || "Aura Jewellery"}" <${config.user}>`,
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
    html: message.html,
  });

  return { sent: true as const, businessEmail: config.businessEmail };
}
