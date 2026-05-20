import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Election from "@/lib/models/Election";
import { verifyToken, unauthorized } from "@/lib/auth/jwt";

export async function DELETE(req: NextRequest) {
  try {
    const admin = verifyToken(req);
    if (!admin) return unauthorized();
    const { electionId, candidateId } = await req.json();
    await connectDB();
    const election = await Election.findById(electionId);
    if (!election) return NextResponse.json({ error: "Not found" }, { status: 404 });
    election.candidates = election.candidates.filter((c: any) => c._id.toString() !== candidateId);
    await election.save();
    return NextResponse.json({ election });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}