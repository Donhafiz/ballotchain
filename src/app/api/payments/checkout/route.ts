import { NextResponse } from "next/server";

// Paystack Integration
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || "sk_test_xxxxxxxx";
const PAYSTACK_BASE = "https://api.paystack.co";

export async function POST(req: Request) {
  try {
    const { plan, email, amount } = await req.json();

    // Initialize Paystack transaction
    const response = await fetch(PAYSTACK_BASE + "/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + PAYSTACK_SECRET,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Paystack uses kobo (smallest currency unit)
        currency: "NGN",
        plan: plan,
        callback_url: process.env.NEXT_PUBLIC_APP_URL + "/dashboard/billing?success=true",
        metadata: { plan, email },
      }),
    });

    const data = await response.json();

    if (data.status) {
      return NextResponse.json({
        success: true,
        authorization_url: data.data.authorization_url,
        reference: data.data.reference,
        access_code: data.data.access_code,
      });
    }

    return NextResponse.json({ error: data.message }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Verify Paystack transaction
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Reference required" }, { status: 400 });
  }

  try {
    const response = await fetch(PAYSTACK_BASE + "/transaction/verify/" + reference, {
      headers: { Authorization: "Bearer " + PAYSTACK_SECRET },
    });

    const data = await response.json();

    if (data.status && data.data.status === "success") {
      return NextResponse.json({
        success: true,
        message: "Payment verified",
        amount: data.data.amount / 100,
        email: data.data.customer.email,
        plan: data.data.metadata?.plan,
      });
    }

    return NextResponse.json({ error: "Payment not verified" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}