import { NextRequest, NextResponse } from "next/server";

export function securityHeaders(request: NextRequest, response: NextResponse) {
  // Content Security Policy
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://api.resend.com https://*.mongodb.net; frame-ancestors 'none';"
  );
  
  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  
  return response;
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) return { valid: false, message: "Password must be at least 8 characters" };
  if (password.length > 128) return { valid: false, message: "Password must be less than 128 characters" };
  if (!/[A-Z]/.test(password)) return { valid: false, message: "Password must contain an uppercase letter" };
  if (!/[a-z]/.test(password)) return { valid: false, message: "Password must contain a lowercase letter" };
  if (!/[0-9]/.test(password)) return { valid: false, message: "Password must contain a number" };
  return { valid: true };
}
