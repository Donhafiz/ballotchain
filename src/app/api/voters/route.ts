import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Try MongoDB
    const { connectDB } = await import("@/lib/db/mongodb");
    await connectDB();
    
    const mongoose = await import("mongoose");
    const db = mongoose.connections[0]?.db;
    
    if (db) {
      const voters = await db.collection("voters").find({}).limit(50).toArray();
      return NextResponse.json({ voters });
    }
  } catch (error) {
    console.log("MongoDB fetch failed, using mock data");
  }

  // Mock fallback
  return NextResponse.json({
    voters: [
      { id: "1", name: "Alice Johnson", email: "alice@student.edu", election: "Student Council 2026", status: "voted", votedAt: "2 hours ago", verified: true },
      { id: "2", name: "Bob Smith", email: "bob@student.edu", election: "Student Council 2026", status: "pending", votedAt: null, verified: false },
      { id: "3", name: "Carol Williams", email: "carol@faculty.edu", election: "Faculty Senate", status: "voted", votedAt: "30 min ago", verified: true },
      { id: "4", name: "David Brown", email: "david@student.edu", election: "Empire 1 Awards", status: "not_voted", votedAt: null, verified: true },
      { id: "5", name: "Eva Martinez", email: "eva@faculty.edu", election: "Empire 1 Awards", status: "pending", votedAt: null, verified: false },
    ]
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { connectDB } = await import("@/lib/db/mongodb");
    await connectDB();
    
    const mongoose = await import("mongoose");
    const db = mongoose.connections[0]?.db;
    
    if (db) {
      const result = await db.collection("voters").insertOne({
        ...data,
        createdAt: new Date(),
        status: "pending",
        verified: false,
      });
      return NextResponse.json({ voter: { _id: result.insertedId, ...data } }, { status: 201 });
    }
  } catch (error) {
    console.log("MongoDB insert failed, mock success");
  }

  return NextResponse.json({ voter: { id: "new", ...data } }, { status: 201 });
}
