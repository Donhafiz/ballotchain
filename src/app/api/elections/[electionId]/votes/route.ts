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
    if (election.status !== "active") return NextResponse.json({ error: "Election is not active" }, { status: 400 });
    const { candidateId } = await req.json();
    const candidate = election.candidates.id(candidateId);
    if (!candidate) return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    candidate.votes = (candidate.votes || 0) + 1;
    election.totalVotes += 1;
    await election.save();
    return NextResponse.json({ message: "Vote recorded successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}