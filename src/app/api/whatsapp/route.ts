import { NextRequest, NextResponse } from "next/server";

// WhatsApp Business API webhook
// Integrate with Twilio for WhatsApp or Meta WhatsApp Cloud API

interface WhatsAppMessage {
  From: string;
  Body: string;
  ProfileName?: string;
}

// Handle incoming WhatsApp messages
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const from = formData.get("From") as string;
  const body = formData.get("Body") as string;
  const profileName = formData.get("ProfileName") as string;

  const message = body?.trim().toLowerCase() || "";
  let response = "";

  // WhatsApp voting flow
  if (message === "hi" || message === "hello" || message === "vote") {
    response = `🗳️ *BallotChain Voting*\n\nWelcome ${profileName || "Voter"}!\n\nReply with:\n*VOTE* - Cast your vote\n*CHECK* - Verify registration\n*RECEIPT* - Verify a receipt\n*HELP* - Get help`;
  } 
  else if (message === "vote") {
    response = `*Active Elections:*\n\n1. Student Council 2026\n2. Faculty Senate\n\nReply with the number to vote in that election.`;
  }
  else if (message === "1") {
    response = `*Student Council 2026*\n*Position:* Student Body President\n\n*Candidates:*\nA. Maya Okonkwo\nB. James Whitfield\nC. Priya Rajan\n\nReply with A, B, or C to vote.`;
  }
  else if (message === "a" || message === "b" || message === "c") {
    const candidates: Record<string, string> = { a: "Maya Okonkwo", b: "James Whitfield", c: "Priya Rajan" };
    const candidate = candidates[message];
    const receipt = "BC-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    response = `✅ *Vote Recorded!*\n\nCandidate: *${candidate}*\nElection: Student Council 2026\nReceipt: *${receipt}*\n\nVerify at: ballotchain.io/verify\n\nThank you for voting! 🗳️`;
  }
  else if (message === "check") {
    response = `✅ *Registration Active*\n\nElection: Student Council 2026\nStatus: Eligible to vote\n\nReply *VOTE* to cast your ballot.`;
  }
  else if (message?.startsWith("receipt")) {
    const code = message.split(" ")[1] || "BC-DEMO123";
    response = `🔍 *Receipt Verification*\nCode: *${code}*\nStatus: ✅ Verified\nCandidate: Maya Okonkwo\nBlock: #847,291\n\nFull verification: ballotchain.io/verify`;
  }
  else if (message === "help") {
    response = `*BallotChain Help*\n\n📞 +233 50 123 4567\n📧 support@ballotchain.io\n🌐 ballotchain.io\n\nCommands: VOTE, CHECK, RECEIPT [code], HELP`;
  }
  else {
    response = `Welcome to BallotChain! Reply *VOTE* to start or *HELP* for options.`;
  }

  // Return Twilio-style TwiML response
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${response}</Message></Response>`,
    { headers: { "Content-Type": "text/xml" } }
  );
}

// GET for webhook verification
export async function GET() {
  return NextResponse.json({
    service: "BallotChain WhatsApp Bot",
    status: "active",
    provider: "Twilio / Meta WhatsApp Cloud API",
    setup: "Configure webhook URL in your WhatsApp Business provider dashboard",
  });
}
