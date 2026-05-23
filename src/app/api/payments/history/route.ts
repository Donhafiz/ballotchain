import { NextRequest, NextResponse } from "next/server";

// Store payments in memory (in production, use MongoDB)
const paymentHistory: any[] = [];

export async function POST(request: NextRequest) {
  const data = await request.json();
  paymentHistory.unshift({ ...data, id: Date.now().toString(), timestamp: new Date().toISOString() });
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ payments: paymentHistory });
}
