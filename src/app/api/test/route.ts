import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";

export async function GET() {
  try {
    const mongoose = await connectDB();
    const state = mongoose.connection.readyState;
    const states = ["disconnected", "connected", "connecting", "disconnecting"];
    return NextResponse.json({ status: states[state] || "unknown" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}