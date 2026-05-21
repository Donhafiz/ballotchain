import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Vote } from "@/lib/models/Vote";
import { Election } from "@/lib/models/Election";
import { exportService } from "@/lib/services/export.service";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { electionId, type, format } = await request.json();

    let data: any = {};

    if (electionId) {
      const election = await Election.findById(electionId);
      const votes = await Vote.find({ electionId });
      data = { election, votes, totalVotes: votes.length };
    } else {
      const elections = await Election.find().sort({ createdAt: -1 });
      const votes = await Vote.find().sort({ createdAt: -1 });
      data = { elections, votes, totalElections: elections.length, totalVotes: votes.length };
    }

    const report = await exportService.generateReport({
      title: type || "Election Report",
      type: type || "report",
      data,
      format: format || "pdf",
    });

    return NextResponse.json({
      success: true,
      filename: report.filename,
      mimeType: report.mimeType,
      content: report.content,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
