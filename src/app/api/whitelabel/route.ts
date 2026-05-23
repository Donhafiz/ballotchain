import { NextRequest, NextResponse } from "next/server";

// White-label configuration store
const whitelabelConfigs: Record<string, any> = {
  default: {
    name: "BallotChain",
    logo: "BC",
    primaryColor: "#10b981",
    secondaryColor: "#06b6d4",
    accentColor: "#8b5cf6",
    customDomain: "",
    emailFrom: "noreply@ballotchain.io",
  },
};

export async function GET(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const config = whitelabelConfigs[hostname] || whitelabelConfigs.default;
  
  return NextResponse.json({ config });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { domain, config } = data;
  
  whitelabelConfigs[domain] = { ...whitelabelConfigs.default, ...config };
  
  return NextResponse.json({ success: true, config: whitelabelConfigs[domain] });
}
