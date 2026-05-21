"use client";

import { useState, useEffect } from "react";
import { CreditCard, CheckCircle2, Zap, Building2, Download, Clock, Shield, ChevronRight } from "lucide-react";

export default function BillingPage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  useEffect(() => { setMounted(true); }, []);
  const showToast = (m: string) => { setToast({ message: m, type: "success" }); setTimeout(() => setToast(null), 3000); };

  const invoices = [
    { id: "INV-2026-001", date: "May 1, 2026", amount: "$299.00", status: "Paid" },
    { id: "INV-2026-002", date: "Apr 1, 2026", amount: "$299.00", status: "Paid" },
    { id: "INV-2026-003", date: "Mar 1, 2026", amount: "$299.00", status: "Paid" },
  ];

  if (!mounted) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Billing</h1>
        <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Manage your subscription and payments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(79,255,176,0.15)] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[radial-gradient(circle,rgba(79,255,176,0.06)_0%,transparent_70%)]" />
          <div className="flex items-center justify-between mb-6 relative">
            <div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[rgba(79,255,176,0.1)] text-[#4fffb0] uppercase">Current Plan</span>
              <h2 className="text-[24px] font-bold text-white mt-3">Professional</h2>
              <p className="text-[14px] text-[rgba(255,255,255,0.35)]">$299/month · 10,000 voters per election</p>
            </div>
            <Zap className="w-10 h-10 text-[#4fffb0]" />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {["Unlimited elections","Advanced analytics","Priority support · 4hr SLA","Full API access","Custom branding & domain","AI fraud detection"].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-[13px] text-[rgba(255,255,255,0.5)]"><CheckCircle2 className="w-4 h-4 text-[#4fffb0] shrink-0" /> {f}</div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => showToast("Contacting sales team...")} className="px-5 py-[10px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold hover:opacity-90 transition-all">Upgrade to Enterprise</button>
            <button onClick={() => showToast("Plan management opening...")} className="px-5 py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[13px] font-medium text-[rgba(255,255,255,0.5)] hover:text-white transition-all">Manage Plan</button>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4 text-[#4fffb0]" /> Payment Method</h3>
          <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] mb-4">
            <div className="text-[13px] font-semibold text-white">Visa ending in 4242</div>
            <div className="text-[11px] text-[rgba(255,255,255,0.3)]">Expires 12/2027</div>
          </div>
          <button onClick={() => showToast("Payment method update opening...")} className="w-full py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[13px] font-medium text-[rgba(255,255,255,0.5)] hover:text-white transition-all">Update Method</button>
        </div>
      </div>

      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[rgba(255,255,255,0.04)]"><h3 className="text-[15px] font-bold text-white">Invoice History</h3></div>
        <table className="w-full">
          <thead><tr className="border-b border-[rgba(255,255,255,0.04)]"><th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Invoice</th><th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Date</th><th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Amount</th><th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Status</th><th className="text-right p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Action</th></tr></thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr key={i} className="border-b border-[rgba(255,255,255,0.03)]"><td className="p-4 text-[13px] text-white font-medium">{inv.id}</td><td className="p-4 text-[13px] text-[rgba(255,255,255,0.4)]">{inv.date}</td><td className="p-4 text-[13px] text-white font-semibold">{inv.amount}</td><td className="p-4"><span className="px-2 py-1 rounded-full text-[10px] font-bold bg-[rgba(79,255,176,0.1)] text-[#4fffb0]">{inv.status}</span></td><td className="p-4 text-right"><button onClick={() => showToast("Downloading invoice...")} className="text-[12px] text-[#4fffb0] hover:underline font-semibold"><Download className="w-3.5 h-3.5 inline mr-1" /> PDF</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast && <div className="fixed bottom-8 right-8 z-[300] animate-[fadeSlideUp_0.3s_ease]"><div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]"><CheckCircle2 className="w-5 h-5 text-[#4fffb0]" /><span className="text-[13px] font-medium text-white">{toast.message}</span></div></div>}
    </div>
  );
}