import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest, verifyToken } from "@/lib/auth/jwt";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(maxRequests: number = 100, windowMs: number = 60000) {
  return async (request: NextRequest) => {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const key = `${ip}:${request.nextUrl.pathname}`;
    const now = Date.now();
    
    const record = rateLimitMap.get(key);
    
    if (!record || now > record.resetTime) {
      rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
      return null;
    }
    
    if (record.count >= maxRequests) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    
    record.count++;
    return null;
  };
}

export function auditLog(event: string, detail: string, severity: "info" | "warning" | "high" = "info", metadata?: any) {
  return async (request: NextRequest) => {
    const user = (request as any).user;
    console.log(`[AUDIT] ${severity.toUpperCase()} | ${event} | ${detail} | User: ${user?.email || "anonymous"}`);
  };
}