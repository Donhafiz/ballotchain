"use client";

import { useState, useEffect } from "react";

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>(["*"]);
  const [message, setMessage] = useState("");

  const events = ["*","election.created","election.started","election.completed","vote.cast","voter.registered","results.published","security.alert"];

  const addWebhook = async () => {
    const res = await fetch("/api/webhooks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: newUrl, events: selectedEvents }) });
    if (res.ok) { setMessage("Webhook added!"); setNewUrl(""); fetchWebhooks(); setTimeout(() => setMessage(""), 3000); }
  };

  const removeWebhook = async (url: string) => {
    await fetch("/api/webhooks", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) });
    fetchWebhooks();
  };

  const fetchWebhooks = async () => {
    const res = await fetch("/api/webhooks");
    if (res.ok) { const data = await res.json(); setWebhooks(data.webhooks || []); }
  };

  useEffect(() => { fetchWebhooks(); }, []);

  return (
    <div style={{ padding: "24px 32px", maxWidth: 800 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="syne" style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Webhooks</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Real-time event streaming to your servers</p>
      </div>

      {message && <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(34,197,94,0.1)", border: "0.5px solid rgba(34,197,94,0.2)", color: "rgba(34,197,94,0.9)", fontSize: 13, marginBottom: 16 }}>{message}</div>}

      <div className="glass rounded-2xl p-6" style={{ marginBottom: 16 }}>
        <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Register Webhook</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://your-server.com/webhook" style={{ padding: "12px 16px", borderRadius: 10, border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 13 }} />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {events.map(e => (
              <button key={e} onClick={() => setSelectedEvents(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e])}
                style={{ padding: "6px 12px", borderRadius: 100, border: "0.5px solid rgba(255,255,255,0.1)", background: selectedEvents.includes(e) ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.02)", color: selectedEvents.includes(e) ? "#818CF8" : "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>{e}</button>
            ))}
          </div>
          <button onClick={addWebhook} className="btn-blue" style={{ padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer", alignSelf: "flex-start" }}>Add Webhook</button>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div style={{ padding: "14px 20px", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
          <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Active Webhooks ({webhooks.length})</h3>
        </div>
        {webhooks.length === 0 ? <div style={{ padding: 40, textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>No webhooks registered yet.</div> : webhooks.map((wh, i) => (
          <div key={i} style={{ padding: "14px 20px", borderBottom: "0.5px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ fontSize: 13, color: "#fff", fontWeight: 500, wordBreak: "break-all" }}>{wh.url}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Events: {wh.events?.join(", ")}</div></div>
            <button onClick={() => removeWebhook(wh.url)} style={{ color: "rgba(239,68,68,0.7)", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}