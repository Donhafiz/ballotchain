"use client";

import { useState } from "react";

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState([
    { id: "1", url: "https://api.example.com/webhook", events: ["election.created","vote.cast"], status: "active" },
    { id: "2", url: "https://hooks.slack.com/services/xxx", events: ["security.alert"], status: "active" },
  ]);
  const [newUrl, setNewUrl] = useState("");

  const addWebhook = () => {
    if (!newUrl) return;
    setWebhooks([...webhooks, { id: Date.now().toString(), url: newUrl, events: ["*"], status: "active" }]);
    setNewUrl("");
  };

  const removeWebhook = (id: string) => setWebhooks(webhooks.filter(w => w.id !== id));

  return (
    <div style={{ maxWidth: 700 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
        <div><h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>Webhooks</h1><p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Real-time event streaming to your servers</p></div>
      </div>
      <div className="glass" style={{ padding: 24, marginBottom: 16 }}>
        <h3 className="syne" style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Register Webhook</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="https://your-server.com/webhook" style={{ flex: 1, padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 13, outline: "none" }} />
          <button onClick={addWebhook} className="btn-purple">Add Webhook</button>
        </div>
      </div>
      <div className="glass" style={{ overflow: "hidden" }}>
        {webhooks.map((wh, i) => (
          <div key={wh.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: i < webhooks.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#fff", wordBreak: "break-all" }}>{wh.url}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <span className="badge-emerald">{wh.status}</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Events: {wh.events.join(", ")}</span>
              </div>
            </div>
            <button onClick={() => removeWebhook(wh.id)} style={{ background: "none", border: "none", color: "rgba(239,68,68,0.7)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
