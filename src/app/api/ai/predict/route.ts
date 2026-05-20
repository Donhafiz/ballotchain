import { NextResponse } from "next/server";
import { predictTurnout, detectAnomalies, generateInsights } from "@/lib/ai/predictor";

export async function POST(req: Request) {
  try {
    const { type, data } = await req.json();
    let result;

    switch (type) {
      case "turnout":
        result = predictTurnout(data);
        break;
      case "anomaly":
        result = detectAnomalies(data.pattern);
        break;
      case "insights":
        result = generateInsights(data);
        break;
      default:
        return NextResponse.json({ error: "Invalid prediction type" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}