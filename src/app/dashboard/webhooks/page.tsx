"use client";

import { useState, useEffect } from "react";
import { Webhook, Plus, Copy, Trash2, CheckCircle2, XCircle, Clock, RefreshCw, Globe, Key } from "lucide-react";

export default function WebhooksPage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  useEffect(() => { setMounted(true); }, []);
  const showToast = (m: string, t: string = "success") => { setToast({ message: m, type: t }); setTimeout(() => setToast(null), 3000); };

  const [webhooks, setWebhooks] = useState([
    { id: "1", url: "https://api.riverdale.edu/webhooks/ballotchain", events: ["election.started","vote.cast","election.ended"], status: "active", lastDelivery: "2 min ago", successRate: "99.8%" },
    { id: "2", url: "https://hooks.slack.com/services/T01/B01/xxxxx", events: ["alert.triggered"], status: "active", lastDelivery: "1 hour ago", successRate: "100%" },
    { id: "3", url: "https://analytics.techscale.com/ingest", events: ["vote.cast","election.ended"], status: "failing", lastDelivery: "3 hours ago", successRate: "72%" },
  ]);

  if (!mounted) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Webhooks</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Configure real-time event notifications</p>
        </div>
        <button onClick={() => showToast("Webhook creation opening...")} className="flex items-center gap-2 px-5 py-[11px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold hover:opacity-90 transition-all"><Plus className="w-4 h-4" /> Add Webhook</button>
      </div>

      <div className="space-y-4">
        {webhooks.map((webhook) => (
          <div key={webhook.id} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 hover:border-[rgba(255,255,255,0.1)] transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={"w-10 h-10 rounded-xl flex items-center justify-center " + (webhook.status === "active" ? "bg-[rgba(79,255,176,0.08)]" : "bg-[rgba(239,68,68,0.08)]")}>
                  <Webhook className={"w-5 h-5 " + (webhook.status === "active" ? "text-[#4fffb0]" : "text-[#EF4444]")} />
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-white font-mono truncate max-w-[400px]">{webhook.url}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={"inline-flex items-center gap-1 text-[10px] font-bold uppercase " + (webhook.status === "active" ? "text-[#4fffb0]" : "text-[#EF4444]")}>
                      {webhook.status === "active" ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} {webhook.status}
                    </span>
                    <span className="text-[10px] text-[rgba(255,255,255,0.2)]">·</span>
                    <span className="text-[10px] text-[rgba(255,255,255,0.3)]"><Clock className="w-3 h-3 inline mr-1" />{webhook.lastDelivery}</span>
                    <span className="text-[10px] text-[rgba(255,255,255,0.2)]">·</span>
                    <span className="text-[10px] text-[rgba(255,255,255,0.3)]">{webhook.successRate} success</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => showToast("Webhook URL copied")} className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><Copy className="w-4 h-4" /></button>
                <button onClick={() => showToast("Test event sent")} className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-[#4fffb0] hover:bg-[rgba(79,255,176,0.05)] transition-all"><RefreshCw className="w-4 h-4" /></button>
                <button onClick={() => { setWebhooks(webhooks.filter(w => w.id !== webhook.id)); showToast("Webhook removed", "error"); }} className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.05)] transition-all"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {webhook.events.map((event) => (
                <span key={event} className="px-3 py-1 rounded-full text-[10px] font-semibold bg-[rgba(79,255,176,0.06)] text-[#4fffb0] border border-[rgba(79,255,176,0.1)]">{event}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
        <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2"><Key className="w-4 h-4 text-[#4fffb0]" /> Webhook Signing Secret</h3>
        <p className="text-[12px] text-[rgba(255,255,255,0.35)] mb-4">Use this secret to verify webhook payloads are from BallotChain</p>
        <div className="flex items-center gap-3">
          <code className="flex-1 px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[13px] text-[rgba(255,255,255,0.5)] font-mono">whsec_a8f3c9d2e1b4f5a6c7d8e9f0a1b2c3d4</code>
          <button onClick={() => showToast("Secret copied")} className="px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[12px] font-medium text-[rgba(255,255,255,0.4)] hover:text-white transition-all"><Copy className="w-4 h-4" /></button>
        </div>
      </div>

      {toast && <div className="fixed bottom-8 right-8 z-[300] animate-[fadeSlideUp_0.3s_ease]"><div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]"><CheckCircle2 className="w-5 h-5 text-[#4fffb0]" /><span className="text-[13px] font-medium text-white">{toast.message}</span></div></div>}
    </div>
  );
}