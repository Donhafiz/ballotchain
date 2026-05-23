import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || "sk_test_demo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Reference required" }, { status: 400 });
  }

  console.log("Verifying payment:", reference);

  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
  });

  const data = await res.json();
  console.log("Paystack response:", JSON.stringify(data).slice(0, 500));

  return NextResponse.json({
    success: data.status && data.data.status === "success",
    data: data.data,
    metadata: data.data?.metadata,
  });
}
