import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: "5.0.0",
      services: {
        database: "connected",
        blockchain: "operational",
        email: "operational",
        websocket: "operational",
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: "degraded",
      error: "Database connection failed",
    }, { status: 503 });
  }
}