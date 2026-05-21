import { NextResponse } from "next/server";
import { predictTurnout, detectAnomalies, generateInsights } from "@/lib/ai/predictor";

export async function POST(req: Request) {
  try {
    const { type, data } = await req.json();
    let result;
    if (type === "turnout") result = predictTurnout(data);
    else if (type === "anomaly") result = detectAnomalies(data.pattern);
    else if (type === "insights") result = generateInsights(data);
    else return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
