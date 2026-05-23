import { NextRequest, NextResponse } from "next/server";

const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH = process.env.TWILIO_AUTH_TOKEN || "";
const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER || "+233501234567";

export async function POST(request: NextRequest) {
  try {
    const { to, message } = await request.json();

    if (!to || !message) {
      return NextResponse.json({ error: "Phone and message required" }, { status: 400 });
    }

    // Send via Twilio
    if (TWILIO_SID && TWILIO_AUTH) {
      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
        method: "POST",
        headers: {
          Authorization: "Basic " + Buffer.from(`${TWILIO_SID}:${TWILIO_AUTH}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ To: to, From: TWILIO_PHONE, Body: message }).toString(),
      });
      const data = await res.json();
      return NextResponse.json({ success: true, sid: data.sid, live: true });
    }

    // Demo mode
    console.log(`[SMS DEMO] To: ${to} | ${message}`);
    return NextResponse.json({ success: true, demo: true, message: "SMS logged (demo mode)" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    service: "BallotChain SMS",
    provider: "Twilio",
    status: TWILIO_SID ? "live" : "demo",
    setup: "Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER to .env.local",
  });
}
