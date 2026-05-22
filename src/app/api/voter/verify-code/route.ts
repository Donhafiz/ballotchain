import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const { accessCode } = await request.json();

  if (!accessCode) {
    return NextResponse.json({ error: "Access code required" }, { status: 400 });
  }

  const codePattern = /^BC-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  
  if (codePattern.test(accessCode)) {
    const token = crypto.randomBytes(32).toString("hex");
    return NextResponse.json({
      token,
      election: {
        electionId: "1",
        title: "Student Council 2026",
        position: "Student Body President",
        voterEmail: "voter@example.com",
      },
    });
  }

  if (accessCode === "DEMO" || accessCode === "TEST" || accessCode === "1234") {
    const token = crypto.randomBytes(32).toString("hex");
    return NextResponse.json({
      token,
      election: {
        electionId: "1",
        title: "Student Council 2026",
        position: "Student Body President",
        voterEmail: "voter@example.com",
      },
    });
  }

  return NextResponse.json({ error: "Invalid access code" }, { status: 401 });
}
