import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Vote } from "@/lib/models/Vote";
import { Election } from "@/lib/models/Election";
import { blockchain } from "@/lib/services/blockchain.service";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { electionId, positionTitle, candidateName, voterEmail, voterId } = await request.json();

    if (!electionId || !candidateName || !voterEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if already voted
    const existingVote = await Vote.findOne({ electionId, voterEmail, positionTitle });
    if (existingVote) {
      return NextResponse.json({ error: "You have already voted in this election" }, { status: 409 });
    }

    // Anchor vote to blockchain
    const anchor = blockchain.anchorVote(voterEmail, electionId, candidateName);

    const vote = await Vote.create({
      electionId,
      positionTitle,
      candidateName,
      voterEmail,
      voterId,
      receipt: anchor.receipt,
      blockNumber: anchor.blockNumber,
      transactionHash: anchor.transactionHash,
      status: "anchored",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    // Update election vote count
    await Election.findByIdAndUpdate(electionId, { $inc: { totalVotes: 1 } });

    return NextResponse.json({
      vote: {
        id: vote._id,
        receipt: vote.receipt,
        blockNumber: vote.blockNumber,
        transactionHash: vote.transactionHash,
        merkleRoot: anchor.merkleRoot,
        status: vote.status,
      },
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const electionId = searchParams.get("electionId");
    const voterEmail = searchParams.get("voterEmail");
    const receipt = searchParams.get("receipt");

    if (receipt) {
      // Verify a specific receipt
      const vote = await Vote.findOne({ receipt });
      const blockchainVerification = blockchain.verifyReceipt(receipt);
      return NextResponse.json({
        vote,
        verified: !!blockchainVerification,
        blockchain: blockchainVerification,
      });
    }

    const query: any = {};
    if (electionId) query.electionId = electionId;
    if (voterEmail) query.voterEmail = voterEmail;

    const votes = await Vote.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ votes });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch votes" }, { status: 500 });
  }
}
