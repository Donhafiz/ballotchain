import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    if (email === "admin@ballotchain.com" && password === "password123") {
      return NextResponse.json({ token: "demo-jwt-token", user: { id: "1", firstName: "Admin", lastName: "User", email, role: "admin" } });
    }
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
