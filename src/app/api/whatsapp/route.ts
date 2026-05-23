import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle WhatsApp message
    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];
    
    if (message) {
      const from = message.from;
      const text = message.text?.body?.toLowerCase() || "";
      
      let reply = "";
      
      if (text === "vote" || text === "hi" || text === "hello") {
        reply = "🗳️ *BallotChain Voting*\n\nReply with:\n*VOTE* - Cast your vote\n*CHECK* - Verify registration\n*RECEIPT* - Verify a receipt\n*HELP* - Get help";
      } else if (text === "check") {
        reply = "✅ *Registration Active*\n\nYou are eligible to vote.\nReply *VOTE* to start.";
      } else if (text === "help") {
        reply = "*BallotChain Help*\n\n📞 +233 50 123 4567\n📧 support@ballotchain.io\n🌐 ballotchain.io";
      } else {
        reply = "Welcome to BallotChain! Reply *VOTE* to start or *HELP* for options.";
      }

      // Send reply via WhatsApp Cloud API
      const token = process.env.WHATSAPP_ACCESS_TOKEN;
      const phoneId = process.env.WHATSAPP_PHONE_ID;
      
      if (token && phoneId) {
        await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: from,
            type: "text",
            text: { body: reply },
          }),
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "ballotchain_webhook_verify";

  if (mode === "subscribe" && token === verifyToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}
