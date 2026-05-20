import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Election from "@/lib/models/Election";
import { verifyToken, unauthorized } from "@/lib/auth/jwt";

export async function GET(req: NextRequest, { params }: { params: { electionId: string } }) {
  try {
    const user = verifyToken(req);
    if (!user) return unauthorized();
    
    await connectDB();
    const election = await Election.findById(params.electionId);
    
    if (!election) {
      return NextResponse.json({ error: "Election not found" }, { status: 404 });
    }
    
    return NextResponse.json({ election });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { electionId: string } }) {
  try {
    const user = verifyToken(req);
    if (!user) return unauthorized();
    
    const body = await req.json();
    await connectDB();
    
    const election = await Election.findByIdAndUpdate(params.electionId, body, { new: true });
    if (!election) return NextResponse.json({ error: "Election not found" }, { status: 404 });
    
    return NextResponse.json({ election });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { electionId: string } }) {
  try {
    const user = verifyToken(req);
    if (!user) return unauthorized();
    
    await connectDB();
    await Election.findByIdAndDelete(params.electionId);
    
    return NextResponse.json({ message: "Election deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}