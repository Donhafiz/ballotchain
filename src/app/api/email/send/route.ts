import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.SMTP_PASS || "";
    const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@ballotchain.io";

    if (!RESEND_API_KEY) {
      // Demo mode - log and return success
      console.log(`[EMAIL DEMO] To: ${to} | Subject: ${subject}`);
      return NextResponse.json({ success: true, demo: true, message: "Email logged (demo mode)" });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `BallotChain <${FROM_EMAIL}>`,
        to,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
