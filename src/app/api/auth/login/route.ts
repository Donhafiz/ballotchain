import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (email === "admin@ballotchain.com" && password === "password123") {
    return NextResponse.json({
      token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJkZW1vIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoic3VwZXJfYWRtaW4ifQ.demo",
      user: {
        id: "demo-admin",
        firstName: "Admin",
        lastName: "User",
        email: "admin@ballotchain.com",
        role: "super_admin",
      },
    });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}