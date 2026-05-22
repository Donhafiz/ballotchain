"use client";

import { useState, useEffect } from "react";
import { Sparkles, Webhook, Plus, Copy, Trash2, CheckCircle2, XCircle, Clock, RefreshCw, Key } from "lucide-react";

export default function WebhooksPage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(() => { setMounted(true); }, []);
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 3000); };

  const [webhooks] = useState([
    { id: "1", url: "https://api.riverdale.edu/webhooks/ballotchain", events: ["election.started","vote.cast","election.ended"], status: "active", lastDelivery: "2 min ago", successRate: "99.8%" },
    { id: "2", url: "https://hooks.slack.com/services/T01/B01/xxxxx", events: ["alert.triggered"], status: "active", lastDelivery: "1 hour ago", successRate: "100%" },
    { id: "3", url: "https://analytics.techscale.com/ingest", events: ["vote.cast","election.ended"], status: "failing", lastDelivery: "3 hours ago", successRate: "72%" },
  ]);

  if (!mounted) return <div className="p-8 text-white/40">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10"><Sparkles className="h-6 w-6 text-emerald-300" /></div>
          <div><h1 className="text-[28px] font-black tracking-[-0.03em]">Webhooks</h1><p className="text-[13px] text-white/35 mt-1">Configure real-time event notifications</p></div>
        </div>
        <button onClick={()=>showToast("Webhook creation opening...")} className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 p-[1px]"><div className="flex items-center gap-2 rounded-xl bg-[#030303] px-5 py-[10px] text-[13px] font-black text-white transition-all duration-300 group-hover:bg-transparent group-hover:text-black"><Plus className="w-4 h-4" /> Add Webhook</div></button>
      </div>

      <div className="space-y-4">
        {webhooks.map(webhook => (
          <div key={webhook.id} className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl hover:border-white/10 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${webhook.status==="active"?"bg-emerald-400/10":"bg-red-400/10"}`}><Webhook className={`w-5 h-5 ${webhook.status==="active"?"text-emerald-300":"text-red-400"}`} /></div>
                <div><div className="text-[14px] font-bold text-white font-mono truncate max-w-[400px]">{webhook.url}</div><div className="flex items-center gap-3 mt-2"><span className={`text-[10px] font-black uppercase ${webhook.status==="active"?"text-emerald-300":"text-red-400"}`}>{webhook.status}</span><span className="text-[10px] text-white/15">·</span><span className="text-[10px] text-white/25"><Clock className="w-3 h-3 inline mr-1" />{webhook.lastDelivery}</span><span className="text-[10px] text-white/15">·</span><span className="text-[10px] text-white/25">{webhook.successRate} success</span></div></div>
              </div>
              <div className="flex items-center gap-1"><button onClick={()=>showToast("Copied")} className="p-2 rounded-lg text-white/15 hover:text-white transition-all"><Copy className="w-4 h-4" /></button><button onClick={()=>showToast("Test sent")} className="p-2 rounded-lg text-white/15 hover:text-emerald-300 transition-all"><RefreshCw className="w-4 h-4" /></button><button onClick={()=>showToast("Removed")} className="p-2 rounded-lg text-white/15 hover:text-red-400 transition-all"><Trash2 className="w-4 h-4" /></button></div>
            </div>
            <div className="flex flex-wrap gap-2">{webhook.events.map(e=><span key={e} className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-400/5 text-emerald-300 border border-emerald-400/10">{e}</span>)}</div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl">
        <h3 className="text-[15px] font-black mb-4 flex items-center gap-2"><Key className="w-4 h-4 text-emerald-300" />Webhook Signing Secret</h3>
        <p className="text-[12px] text-white/25 mb-4">Use this secret to verify webhook payloads are from BallotChain</p>
        <div className="flex items-center gap-3"><code className="flex-1 px-4 py-[10px] rounded-xl bg-white/[0.03] border border-white/5 text-[13px] text-white/40 font-mono">whsec_a8f3c9d2e1b4f5a6c7d8e9f0a1b2c3d4</code><button onClick={()=>showToast("Secret copied")} className="px-4 py-[10px] rounded-xl bg-white/[0.03] border border-white/5 text-[12px] font-bold text-white/30 hover:text-white transition-all"><Copy className="w-4 h-4" /></button></div>
      </div>

      {toast && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300]"><div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl bg-[#0a0a0a] border border-emerald-400/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"><CheckCircle2 className="w-5 h-5 text-emerald-300" /><span className="text-[13px] font-bold text-white">{toast}</span></div></div>}
    </div>
  );
}
