import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.email || !body.password) return NextResponse.json({ error: "All fields required" }, { status: 400 });
    return NextResponse.json({ message: "Account created" }, { status: 201 });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
