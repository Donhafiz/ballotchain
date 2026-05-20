import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Election from "@/lib/models/Election";
import { verifyToken, unauthorized } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const user = verifyToken(req);
    if (!user) return unauthorized();

    await connectDB();
    const elections = await Election.find({ createdBy: user.userId }).sort({ createdAt: -1 });

    return NextResponse.json({ elections });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = verifyToken(req);
    if (!user) return unauthorized();

    const body = await req.json();
    await connectDB();

    const election = await Election.create({ ...body, createdBy: user.userId });

    return NextResponse.json({ election }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}