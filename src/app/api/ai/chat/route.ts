import { NextRequest, NextResponse } from "next/server";

const responses: Record<string, string> = {
  "create election": "To create an election, go to Dashboard → Elections → New Election. Fill in the title, add positions and candidates, set start/end dates, and add voter emails. Click 'Launch Election' when ready.",
  "publish": "To publish a draft election, go to Dashboard → Elections, find your election, and click the green 'Publish' button. This makes it live and visible to voters.",
  "add voters": "You can add voters by going to Dashboard → Voters → Add Voter (manual entry) or Import CSV (bulk upload). Each voter needs a valid email address.",
  "results": "Live results are available at Dashboard → Live Results. You can also share the public results page with anyone via the link on the election detail page.",
  "verify vote": "Voters can verify their vote at /verify by entering their receipt code. This independently confirms their ballot was recorded on the blockchain.",
  "security": "BallotChain uses zero-knowledge encryption, blockchain anchoring, and AI fraud detection. We are ISO 27001, SOC 2, and FIPS 140-2 certified.",
  "ussd": "Voters can dial *713*123# from any phone to vote via USSD — no internet needed. This works on all major networks in Ghana and across Africa.",
  "whatsapp": "We have a WhatsApp chatbot for voting. Voters can send 'VOTE' to our WhatsApp number to cast their ballot. The API is ready for Twilio/Meta integration.",
  "pricing": "We offer three plans: Starter (Free), Professional ($299/month), and Enterprise (Custom). See /#pricing for full details.",
  "blockchain": "Every vote is cryptographically hashed and anchored to the BallotChain blockchain. Voters receive a unique receipt they can independently verify.",
  "default": "I'm your BallotChain AI assistant. I can help with: creating elections, publishing, adding voters, viewing results, verifying votes, security info, USSD voting, pricing, and blockchain details. What would you like to know?",
};

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const msg = message?.toLowerCase() || "";

    let reply = responses.default;

    for (const [key, value] of Object.entries(responses)) {
      if (msg.includes(key)) {
        reply = value;
        break;
      }
    }

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      reply,
      confidence: reply === responses.default ? 0.5 : 0.92,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
