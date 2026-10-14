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

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: recipientEmail,
      replyTo: email,
      subject: subject
        ? `[Vedic Clock Enquiry] ${subject} - ${name}`
        : `[Vedic Clock Enquiry] New message from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff; color: #1f2937;">
          <div style="border-bottom: 2px solid #B8873D; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="color: #2D1B0E; margin: 0; font-size: 20px; font-weight: 700;">
              ✨ New Vedic Clock Contact Enquiry
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
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: unknown) {
    console.error("Internal Error sending email:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Quick verification endpoint to send test email as requested by user
export async function GET() {
  try {
    const resend = getResendClient();
    const recipientEmail = getRecipientEmail();

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: recipientEmail,
      subject: "Hello World · Vedic Clock Resend Integration",
      html: "<p>Congrats on sending your <strong>first email</strong> from the Vedic Clock project!</p>",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Test email successfully sent to " + recipientEmail,
      id: data?.id,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
