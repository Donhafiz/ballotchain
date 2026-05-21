import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (email === "admin@ballotchain.com" && password === "password123") {
      return NextResponse.json({
        token: "demo-jwt-token-abc123",
        user: {
          id: "demo-admin",
          firstName: "Admin",
          lastName: "User",
          email: email,
          role: "super_admin",
        },
      });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
