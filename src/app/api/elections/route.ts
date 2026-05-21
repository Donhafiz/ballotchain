import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Election } from "@/lib/models/Election";
import { requireAuth } from "@/lib/auth/jwt";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const user = (request as any).user;
    
    const elections = await Election.find({
      $or: [
        { createdBy: user?.userId },
        { visibility: "public" },
      ],
    }).sort({ createdAt: -1 }).limit(50);

    return NextResponse.json({ elections });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch elections" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return requireAuth(async (req: NextRequest) => {
    try {
      await connectDB();
      const user = (req as any).user;
      const data = await req.json();

      const election = await Election.create({
        ...data,
        createdBy: user.userId,
        organizationId: user.organizationId || "default",
      });

      return NextResponse.json({ election }, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }, ["super_admin", "election_manager", "organization_admin"])(request);
}