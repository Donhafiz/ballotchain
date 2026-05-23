import { NextRequest, NextResponse } from "next/server";

// Store payment intents in memory (use MongoDB in production)
const paymentIntents: Record<string, any> = {};

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const intentId = "pi_" + Date.now() + "_" + Math.random().toString(36).substring(2, 8);
    
    paymentIntents[intentId] = {
      ...data,
      intentId,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    return NextResponse.json({ success: true, intentId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const intentId = searchParams.get("intentId");

  if (!intentId || !paymentIntents[intentId]) {
    return NextResponse.json({ error: "Intent not found" }, { status: 404 });
  }

  return NextResponse.json({ intent: paymentIntents[intentId] });
}
