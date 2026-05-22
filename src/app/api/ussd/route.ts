import { NextRequest, NextResponse } from "next/server";

// USSD webhook for Africa's Talking / Twilio / Infobip
// This endpoint receives USSD requests from telecom providers

interface UssdRequest {
  sessionId: string;
  phoneNumber: string;
  text: string; // User input (empty = first request)
  serviceCode: string;
}

export async function POST(request: NextRequest) {
  const body: UssdRequest = await request.json();
  const { sessionId, phoneNumber, text } = body;

  // USSD menu flow
  const userInput = text ? text.split("*").pop() : "";
  const steps = text ? text.split("*").length : 0;

  let response = "";

  switch (steps) {
    case 0:
      // Welcome screen
      response = `CON Welcome to BallotChain Voting\n
1. Vote Now
2. Check Registration
3. Help`;
      break;

    case 1:
      if (userInput === "1") {
        response = `CON Enter your Voter ID:`;
      } else if (userInput === "2") {
        response = `END Your registration is active.\nElection: Student Council 2026\nStatus: Eligible`;
      } else {
        response = `END For help, contact:\nsupport@ballotchain.io\n+233 50 123 4567`;
      }
      break;

    case 2:
      // Voter ID entered - show candidates
      response = `CON Select Candidate:
1. Maya Okonkwo
2. James Whitfield
3. Priya Rajan`;
      break;

    case 3:
      // Candidate selected - confirm
      const candidates = ["Maya Okonkwo", "James Whitfield", "Priya Rajan"];
      const choice = parseInt(userInput) - 1;
      
      if (choice >= 0 && choice < candidates.length) {
        response = `CON Confirm your vote:
Candidate: ${candidates[choice]}
1. Yes, confirm
2. Cancel`;
      } else {
        response = `END Invalid selection. Please try again.`;
      }
      break;

    case 4:
      if (userInput === "1") {
        // Vote confirmed
        const receipt = "BC-" + Math.random().toString(36).substring(2, 10).toUpperCase();
        response = `END Vote recorded successfully!\nReceipt: ${receipt}\nThank you for voting!`;
      } else {
        response = `END Vote cancelled. You may try again.`;
      }
      break;

    default:
      response = `END Session ended. Dial *713*123# to start again.`;
  }

  return NextResponse.json({ response });
}

// GET for testing
export async function GET() {
  return NextResponse.json({
    service: "BallotChain USSD Gateway",
    shortCode: "*713*123#",
    status: "operational",
    countries: ["Ghana", "Nigeria", "Kenya", "South Africa"],
    endpoints: {
      africasTalking: "https://ballotchain.io/api/ussd",
      twilio: "https://ballotchain.io/api/ussd",
      infobip: "https://ballotchain.io/api/ussd",
    },
  });
}
