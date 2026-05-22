import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, credential } = await request.json();

  // Store biometric credential for future verification
  // In production, save to database linked to user account
  
  return NextResponse.json({
    success: true,
    message: "Biometric credential registered",
  });
}
