import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Election from "@/lib/models/Election";
import { verifyToken } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ elections: [
        { _id: "1", title: "Student Council 2026", status: "active", totalVoters: 450, totalVotes: 392, candidates: [{ name: "John", position: "Pres", votes: 200 }], type: "single_choice", startDate: "2026-05-01", endDate: "2026-05-30" },
        { _id: "2", title: "Faculty Senate", status: "active", totalVoters: 280, totalVotes: 142, candidates: [], type: "multiple_choice", startDate: "2026-05-10", endDate: "2026-05-25" },
      ]});
    }

    await connectDB();
    const elections = await Election.find().sort({ createdAt: -1 });
    return NextResponse.json({ elections });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectDB();
    const election = await Election.create(body);
    return NextResponse.json({ election }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
