"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, DollarSign, TrendingUp, Users, Vote, ArrowUpRight, Download, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export default function PaymentsPage() {
  const [mounted, setMounted] = useState(false);
  const [payments, setPayments] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, count: 0, todayTotal: 0, todayCount: 0 });

  useEffect(() => {
    setMounted(true);
    loadPayments();
  }, []);

  const loadPayments = () => {
    fetch("/api/votes")
      .then(r => r.json())
      .then(data => {
        const paidVotes = (data.votes || []).filter((v: any) => v.paymentRef);
        setPayments(paidVotes);
        
        const total = paidVotes.length;
        const today = paidVotes.filter((v: any) => {
          const d = new Date(v.createdAt);
          const t = new Date();
          return d.toDateString() === t.toDateString();
        });
        
        setStats({
          total: total * 1, // GHS 1 per vote
          count: total,
          todayTotal: today.length * 1,
          todayCount: today.length,
        });
      })
      .catch(() => {});
  };

  if (!mounted) return <div className="p-8 text-white/40">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10">
            <Sparkles className="h-6 w-6 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-[28px] font-black tracking-[-0.03em]">Payment History</h1>
            <p className="text-[13px] text-white/35 mt-1">Track all voting payments and revenue</p>
          </div>
        </div>
        <button onClick={loadPayments} className="px-4 py-[10px] rounded-xl bg-white/[0.03] border border-white/5 text-sm font-bold text-white/40 hover:text-white transition-all">Refresh</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { l: "Total Revenue", v: `GHS ${stats.total}`, i: DollarSign, c: "#10b981" },
          { l: "Total Votes", v: stats.count, i: Vote, c: "#06b6d4" },
          { l: "Today Revenue", v: `GHS ${stats.todayTotal}`, i: TrendingUp, c: "#8b5cf6" },
          { l: "Today Votes", v: stats.todayCount, i: Users, c: "#f59e0b" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
            <s.i className="w-5 h-5 mb-3" style={{ color: s.c }} />
            <div className="text-xl font-black">{s.v}</div>
            <div className="text-[11px] font-black text-white/25 uppercase mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden backdrop-blur-xl">
        <div className="p-6 border-b border-white/5">
          <h3 className="font-black">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Reference</th>
                <th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Candidate</th>
                <th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Votes</th>
                <th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Amount</th>
                <th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Status</th>
                <th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Time</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                  <td className="p-4 text-xs font-mono text-white/40">{p.paymentRef?.slice(0, 16)}...</td>
                  <td className="p-4 text-sm font-bold text-white">{p.candidateName}</td>
                  <td className="p-4 text-sm text-white/60">{p.voteNumber || 1}x</td>
                  <td className="p-4 text-sm font-bold text-emerald-300">GHS 1</td>
                  <td className="p-4"><span className="px-2 py-1 rounded-full text-[10px] font-black bg-emerald-400/10 text-emerald-300">Paid</span></td>
                  <td className="p-4 text-xs text-white/30">{new Date(p.createdAt).toLocaleString()}</td>
                </motion.tr>
              ))}
              {payments.length === 0 && (
                <tr><td colSpan={6} className="p-12 text-center text-white/20">No payments yet. Votes will appear here after payment.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
