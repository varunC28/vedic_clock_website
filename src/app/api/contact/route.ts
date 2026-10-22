import { NextRequest, NextResponse } from "next/server";
import { getResendClient, getRecipientEmail } from "@/lib/resend";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    const resend = getResendClient();
    const recipientEmail = getRecipientEmail();

    // Prefer branded sender address; fallback to onboarding@resend.dev if custom domain is still pending verification
    const preferredSender =
      process.env.SENDER_EMAIL || "Vikramaditya Vedic Clock <contact@thevedicghadi.in>";

    const emailSubject = subject
      ? `[Vedic Clock Enquiry] ${subject} - ${name}`
      : `[Vedic Clock Enquiry] New message from ${name}`;

    const adminHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff; color: #1f2937;">
        <div style="border-bottom: 2px solid #B8873D; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #2D1B0E; margin: 0; font-size: 20px; font-weight: 700;">
            New Vedic Clock Contact Enquiry
          </h2>
          <p style="color: #6B7280; font-size: 13px; margin: 4px 0 0 0;">
            Received via the official website contact portal
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #6B7280; font-size: 13px; font-weight: 600; width: 100px;">Full Name:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B7280; font-size: 13px; font-weight: 600;">Email:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px;"><a href="mailto:${email}" style="color: #B8873D; text-decoration: none;">${email}</a></td>
          </tr>
          ${
            phone
              ? `<tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 13px; font-weight: 600;">Phone:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">${phone}</td>
                </tr>`
              : ""
          }
          ${
            subject
              ? `<tr>
                  <td style="padding: 8px 0; color: #6B7280; font-size: 13px; font-weight: 600;">Subject:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">${subject}</td>
                </tr>`
              : ""
          }
        </table>

        <div style="background-color: #FAF6F0; border-left: 4px solid #B8873D; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #2D1B0E; white-space: pre-wrap;">${
            message || "(No message provided)"
          }</p>
        </div>

        <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; font-size: 12px; color: #9CA3AF; text-align: center;">
          Shiv Enterprises · Vikramaditya Vedic Clock · Avanti Meridian 0°
        </div>
      </div>
    `;

    // 1. Attempt sending with branded custom domain
    let sendResult = await resend.emails.send({
      from: preferredSender,
      to: recipientEmail,
      replyTo: email,
      subject: emailSubject,
      html: adminHtml,
    });

    // 2. If custom domain is not yet verified on Resend, automatically fallback to onboarding@resend.dev
    if (sendResult.error && sendResult.error.message?.toLowerCase().includes("not verified")) {
      console.warn("Branded sender domain not verified yet. Falling back to onboarding@resend.dev");
      sendResult = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: recipientEmail,
        replyTo: email,
        subject: emailSubject,
        html: adminHtml,
      });
    }

    if (sendResult.error) {
      console.error("Resend API Error:", sendResult.error);
      return NextResponse.json({ error: sendResult.error.message }, { status: 500 });
    }

    // 3. Optional: Send automated confirmation receipt to inquirer (only works once custom domain is verified)
    try {
      await resend.emails.send({
        from: preferredSender,
        to: email,
        subject: `Thank you for contacting Vikramaditya Vedic Clock · Shiv Enterprises`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff; color: #1f2937;">
            <div style="border-bottom: 2px solid #B8873D; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="color: #2D1B0E; margin: 0; font-size: 20px; font-weight: 700;">
                Namaste ${name},
              </h2>
              <p style="color: #6B7280; font-size: 14px; margin: 6px 0 0 0;">
                Thank you for reaching out to Shiv Enterprises regarding the Vikramaditya Vedic Clock.
              </p>
            </div>
            <p style="font-size: 14px; line-height: 1.6; color: #374151;">
              We have received your message regarding <strong>${subject || "your enquiry"}</strong>. Our team will review your enquiry and get back to you shortly.
            </p>
            <div style="background-color: #FAF6F0; border-radius: 8px; padding: 14px 18px; margin: 20px 0; font-size: 13px; color: #4B5563;">
              <strong>Direct Contact:</strong><br />
              Varun Chaturvedi · +91 94066 64444<br />
              Email: contact@thevedicghadi.in
            </div>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; font-size: 12px; color: #9CA3AF; text-align: center;">
              Shiv Enterprises · Vikramaditya Vedic Clock · Avanti Meridian 0°
            </div>
          </div>
        `,
      });
    } catch {
      // Receipt email is optional and shouldn't block the main contact submission
    }

    return NextResponse.json({ success: true, id: sendResult.data?.id });
  } catch (err: unknown) {
    console.error("Internal Error sending email:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Quick verification endpoint to send test email
export async function GET() {
  try {
    const resend = getResendClient();
    const recipientEmail = getRecipientEmail();

    let sendResult = await resend.emails.send({
      from: "Vikramaditya Vedic Clock <contact@thevedicghadi.in>",
      to: recipientEmail,
      subject: "Hello World · Vedic Clock Custom Domain Verification",
      html: "<p>Congrats! Your custom domain <strong>thevedicghadi.in</strong> is active with Resend!</p>",
    });

    if (sendResult.error && sendResult.error.message?.toLowerCase().includes("not verified")) {
      sendResult = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: recipientEmail,
        subject: "Hello World · Vedic Clock Resend Integration (Sandbox)",
        html: "<p>Congrats on sending your email via Resend sandbox mode!</p>",
      });
    }

    if (sendResult.error) {
      return NextResponse.json({ error: sendResult.error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Test email successfully sent to " + recipientEmail,
      id: sendResult.data?.id,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
