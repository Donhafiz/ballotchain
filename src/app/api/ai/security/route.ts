import { NextResponse } from "next/server";
import { analyzeThreat, getThreatStats, getBlockedIPs, blockIP, unblockIP } from "@/lib/ai/security";

export async function POST(req: Request) {
  try {
    const { type, data } = await req.json();

    switch (type) {
      case "analyze":
        const assessment = analyzeThreat(data);
        return NextResponse.json({ success: true, assessment });

      case "block":
        blockIP(data.ip);
        return NextResponse.json({ success: true, message: "IP blocked" });

      case "unblock":
        unblockIP(data.ip);
        return NextResponse.json({ success: true, message: "IP unblocked" });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const stats = getThreatStats();
  const blockedIPs = getBlockedIPs();
  return NextResponse.json({ stats, blockedIPs });
}