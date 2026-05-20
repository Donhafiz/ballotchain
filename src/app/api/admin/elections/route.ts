import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Election from "@/lib/models/Election";
import { verifyToken, unauthorized } from "@/lib/auth/jwt";

export async function PUT(req: NextRequest) {
  try {
    const admin = verifyToken(req);
    if (!admin) return unauthorized();
    const { electionId, ...updates } = await req.json();
    await connectDB();
    const election = await Election.findByIdAndUpdate(electionId, updates, { new: true });
    return NextResponse.json({ election });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = verifyToken(req);
    if (!admin) return unauthorized();
    const { electionId } = await req.json();
    await connectDB();
    await Election.findByIdAndDelete(electionId);
    return NextResponse.json({ message: "Election deleted" });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}