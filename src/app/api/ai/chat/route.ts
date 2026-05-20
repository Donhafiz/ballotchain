import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMsg = messages?.[messages.length - 1]?.content?.toLowerCase() || "";

    let reply = "I can help you with election management, voter imports, security settings, and results analysis. What specific task do you need help with?";

    if (lastMsg.includes("create") && lastMsg.includes("election")) {
      reply = "Great! To create an election: 1) Go to Dashboard → Elections → Create, 2) Add a title like 'Student Council 2026', 3) Set start/end dates, 4) Add candidates with names and positions, 5) Choose single/multiple/ranked choice voting method. Need help with any specific step?";
    } else if (lastMsg.includes("import") && lastMsg.includes("voter")) {
      reply = "To import voters: 1) Go to Elections → select your election → Voters → Import, 2) Prepare a CSV file with columns: name, email, department, 3) Upload the file, 4) Review the import summary. The system will automatically send access links to all imported voters.";
    } else if (lastMsg.includes("security") || lastMsg.includes("encrypt")) {
      reply = "BallotChain uses AES-256 encryption for all votes. Security features: end-to-end encryption, blockchain verification, biometric auth support, IP whitelisting, 2FA, audit logging, and SOC 2 Type II compliance. You can configure security settings in Dashboard → Security.";
    } else if (lastMsg.includes("result") || lastMsg.includes("analytics")) {
      reply = "Live results are available in Dashboard → Results. You can: view real-time vote counts, see turnout percentages, filter by time range, export as PDF/CSV, and share results publicly. Each voter also receives a cryptographic receipt.";
    } else if (lastMsg.includes("ranked")) {
      reply = "Ranked choice voting (RCV) lets voters rank candidates in order of preference. To set up: 1) Create election with 'Ranked Choice' type, 2) Add candidates, 3) Voters rank them 1st, 2nd, 3rd choice, 4) System calculates winner using instant runoff. Perfect for board elections!";
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "I'm here to help with election management. Ask me about creating elections, importing voters, security settings, or analyzing results!" });
  }
}