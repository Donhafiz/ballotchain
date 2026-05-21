import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Vote } from "@/lib/models/Vote";
import { Election } from "@/lib/models/Election";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const electionId = searchParams.get("electionId");

    // Get live election results
    const query: any = {};
    if (electionId) query.electionId = electionId;
    query.status = "anchored";

    const votes = await Vote.find(query).sort({ createdAt: -1 }).limit(100);

    // Aggregate by candidate
    const results: Record<string, { candidateName: string; votes: number }> = {};
    votes.forEach((vote) => {
      const key = `${vote.electionId}-${vote.candidateName}`;
      if (!results[key]) {
        results[key] = { candidateName: vote.candidateName, votes: 0 };
      }
      results[key].votes++;
    });

    // Get election totals
    const election = electionId ? await Election.findById(electionId) : null;
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      totalVotes: votes.length,
      results: Object.values(results),
      election: election ? { title: election.title, eligibleVoters: election.eligibleVoters, status: election.status } : null,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch real-time data" }, { status: 500 });
  }
}
