import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ballotchain";

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    
    if (!id || id === "[id]") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("ballotchain");
    
    const result = await db.collection("elections").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: data.status } }
    );
    
    console.log("PATCH result:", id, "matched:", result.matchedCount, "modified:", result.modifiedCount);
    
    const updated = await db.collection("elections").findOne({ _id: new ObjectId(id) });
    await client.close();
    
    return NextResponse.json({ election: updated });
  } catch (error: any) {
    console.error("PATCH failed:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ election: {} });
}