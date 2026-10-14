import { Resend } from "resend";

/**
 * Returns an authenticated Resend client instance.
 * Trims whitespace and strips accidental quotes to prevent deployment misconfigurations.
 */
export function getResendClient(): Resend {
  const rawKey = process.env.RESEND_API_KEY || "";
  const apiKey = rawKey.trim().replace(/^["']|["']$/g, "");

  if (!apiKey || apiKey === "re_xxxxxxxxx") {
    throw new Error(
      "RESEND_API_KEY environment variable is not defined or is set to placeholder. If you recently added it to Vercel Settings, please go to Vercel Deployments and click 'Redeploy' to apply it."
    );
  }

  return new Resend(apiKey);
}

/**
 * Returns the notification recipient email.
 */
export function getRecipientEmail(): string {
  const raw = process.env.CONTACT_NOTIFICATION_EMAIL || "chaturvedivarun28@gmail.com";
  return raw.trim().replace(/^["']|["']$/g, "");
}
