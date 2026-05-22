"use client";

import { useState } from "react";
import { Sparkles, Send, CheckCircle2, ExternalLink } from "lucide-react";

export default function EmailSetupPage() {
  const [testEmail, setTestEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendTest = async () => {
    if (!testEmail) return;
    setLoading(true);
    try {
      await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: testEmail,
          subject: "BallotChain Email Test",
          html: "<h1>BallotChain Email Service</h1><p>Your email integration is working!</p>",
        }),
      });
      setSent(true);
    } catch {}
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10"><Sparkles className="h-6 w-6 text-emerald-300" /></div>
        <div><h1 className="text-[28px] font-black tracking-[-0.03em]">Email Setup</h1><p className="text-[13px] text-white/35 mt-1">Configure email delivery for voter access codes</p></div>
      </div>

      <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl space-y-6">
        <div className="p-4 rounded-xl bg-emerald-400/5 border border-emerald-400/10">
          <p className="text-sm font-bold text-emerald-300 mb-2">Quick Setup</p>
          <p className="text-xs text-white/40">Add your Resend API key to <code className="text-emerald-300">.env.local</code>:</p>
          <code className="block mt-2 p-3 rounded-lg bg-white/[0.03] text-xs text-white/50 font-mono">SMTP_PASS=re_xxxxxxxxxxxx</code>
          <a href="https://resend.com" target="_blank" className="inline-flex items-center gap-1 mt-3 text-xs text-emerald-300 hover:underline font-bold">Get API Key <ExternalLink className="w-3 h-3" /></a>
        </div>

        <div>
          <h3 className="font-bold mb-3">Send Test Email</h3>
          <div className="flex gap-3">
            <input value={testEmail} onChange={e => setTestEmail(e.target.value)} placeholder="your@email.com" className="flex-1 px-4 py-[11px] rounded-xl bg-white/[0.03] border border-white/5 text-white text-sm outline-none focus:border-emerald-400/20 transition-all" />
            <button onClick={sendTest} disabled={loading} className="px-5 py-[11px] rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-sm font-black hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2">
              {sent ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              {sent ? "Sent!" : "Send Test"}
            </button>
          </div>
          {sent && <p className="mt-2 text-xs text-emerald-300">Test email sent! Check your inbox.</p>}
        </div>
      </div>
    </div>
  );
}
