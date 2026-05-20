import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Election from "@/lib/models/Election";
import { verifyToken, unauthorized } from "@/lib/auth/jwt";

export async function POST(req: NextRequest, { params }: { params: { electionId: string } }) {
  try {
    const user = verifyToken(req);
    if (!user) return unauthorized();
    await connectDB();
    const election = await Election.findById(params.electionId);
    if (!election) return NextResponse.json({ error: "Election not found" }, { status: 404 });
    const body = await req.json();
    election.candidates.push(body);
    await election.save();
    return NextResponse.json({ election }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}