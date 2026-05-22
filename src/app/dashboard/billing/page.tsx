"use client";

import { useState, useEffect } from "react";
import { Sparkles, CreditCard, Zap, CheckCircle2, Download, Shield } from "lucide-react";
import Link from "next/link";

export default function BillingPage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(() => { setMounted(true); }, []);
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 3000); };

  const invoices = [
    { id: "INV-2026-001", date: "May 1, 2026", amount: "$299.00", status: "Paid" },
    { id: "INV-2026-002", date: "Apr 1, 2026", amount: "$299.00", status: "Paid" },
    { id: "INV-2026-003", date: "Mar 1, 2026", amount: "$299.00", status: "Paid" },
  ];

  if (!mounted) return <div className="p-8 text-white/40">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10"><Sparkles className="h-6 w-6 text-emerald-300" /></div>
        <div><h1 className="text-[28px] font-black tracking-[-0.03em]">Billing</h1><p className="text-[13px] text-white/35 mt-1">Manage your subscription and payments</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-3xl border border-emerald-400/15 bg-white/[0.02] p-8 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[radial-gradient(circle,rgba(16,185,129,0.06)_0%,transparent_70%)]" />
          <div className="relative flex items-center justify-between mb-6">
            <div><span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-400/10 text-emerald-300 uppercase">Current Plan</span><h2 className="text-[24px] font-black text-white mt-3">Professional</h2><p className="text-[14px] text-white/35">$299/month · 10,000 voters per election</p></div>
            <Zap className="w-10 h-10 text-emerald-300" />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {["Unlimited elections","Advanced analytics","Priority support · 4hr SLA","Full API access","Custom branding & domain","AI fraud detection"].map((f,i) => (
              <div key={i} className="flex items-center gap-2 text-[13px] text-white/50"><CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />{f}</div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={()=>showToast("Contacting sales...")} className="px-5 py-[10px] rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-[13px] font-black hover:opacity-90 transition-all">Upgrade to Enterprise</button>
            <button onClick={()=>showToast("Plan management opening...")} className="px-5 py-[10px] rounded-xl bg-white/[0.03] border border-white/5 text-[13px] font-bold text-white/40 hover:text-white transition-all">Manage Plan</button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl">
          <h3 className="text-[15px] font-black mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4 text-emerald-300" />Payment Method</h3>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-4"><div className="text-[13px] font-bold text-white">Visa ending in 4242</div><div className="text-[11px] text-white/25">Expires 12/2027</div></div>
          <button onClick={()=>showToast("Payment method update opening...")} className="w-full py-[10px] rounded-xl bg-white/[0.03] border border-white/5 text-[13px] font-bold text-white/40 hover:text-white transition-all">Update Method</button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden backdrop-blur-xl">
        <div className="p-6 border-b border-white/5"><h3 className="text-[15px] font-black">Invoice History</h3></div>
        <table className="w-full">
          <thead><tr className="border-b border-white/5"><th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Invoice</th><th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Date</th><th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Amount</th><th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Status</th><th className="text-right p-4 text-[10px] font-black text-white/15 uppercase">Action</th></tr></thead>
          <tbody>
            {invoices.map((inv,i) => (
              <tr key={i} className="border-b border-white/[0.02]"><td className="p-4 text-[13px] text-white font-bold">{inv.id}</td><td className="p-4 text-[13px] text-white/40">{inv.date}</td><td className="p-4 text-[13px] text-white font-bold">{inv.amount}</td><td className="p-4"><span className="px-2 py-1 rounded-full text-[10px] font-black bg-emerald-400/10 text-emerald-300">{inv.status}</span></td><td className="p-4 text-right"><button onClick={()=>showToast("Downloading...")} className="text-[12px] text-emerald-300 hover:underline font-bold"><Download className="w-3.5 h-3.5 inline mr-1" />PDF</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300]"><div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl bg-[#0a0a0a] border border-emerald-400/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"><CheckCircle2 className="w-5 h-5 text-emerald-300" /><span className="text-[13px] font-bold text-white">{toast}</span></div></div>}
    </div>
  );
}
