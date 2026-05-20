import { NextResponse } from "next/server";

const webhookEvents = [
  "election.created",
  "election.started",
  "election.completed",
  "vote.cast",
  "voter.registered",
  "voter.imported",
  "results.published",
  "security.alert",
];

// Webhook Registry
let webhooks: { url: string; events: string[] }[] = [];

export async function GET() {
  return NextResponse.json({ events: webhookEvents, webhooks });
}

export async function POST(req: Request) {
  try {
    const { url, events } = await req.json();
    if (!url || !events?.length) return NextResponse.json({ error: "URL and events required" }, { status: 400 });

    webhooks.push({ url, events });

    // Send test ping
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "test", timestamp: new Date().toISOString(), message: "Webhook registered successfully" }),
      });
    } catch {}

    return NextResponse.json({ success: true, message: "Webhook registered" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { url } = await req.json();
  webhooks = webhooks.filter(w => w.url !== url);
  return NextResponse.json({ success: true, message: "Webhook removed" });
}

// Fire webhook events
export async function fireWebhook(event: string, data: any) {
  const matching = webhooks.filter(w => w.events.includes(event) || w.events.includes("*"));
  for (const wh of matching) {
    try {
      await fetch(wh.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: event, timestamp: new Date().toISOString(), data }),
      });
    } catch {}
  }
}