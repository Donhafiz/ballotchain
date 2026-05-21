import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, password } = await request.json();

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  return NextResponse.json({
    token: "demo-jwt-token-abc123",
    user: { id: "new-user", firstName, lastName, email, role: "voter" },
  }, { status: 201 });
}
