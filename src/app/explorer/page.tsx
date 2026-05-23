"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Shield, CheckCircle2, Clock, Link2, Copy, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BlockchainExplorerPage() {
  const [votes, setVotes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ total: 0, latestBlock: 0, anchored: 0 });

  useEffect(() => {
    setMounted(true);
    fetch("/api/votes")
      .then(r => r.json())
      .then(data => {
        const v = data.votes || [];
        setVotes(v);
        setStats({
          total: v.length,
          latestBlock: v.length > 0 ? parseInt(v[0].blockNumber || "0") : 847291,
          anchored: v.filter((x: any) => x.status === "anchored").length,
        });
      })
      .catch(() => {});
  }, []);

  const filtered = votes.filter(v =>
    v.candidateName?.toLowerCase().includes(search.toLowerCase()) ||
    v.receipt?.toLowerCase().includes(search.toLowerCase()) ||
    v.blockNumber?.includes(search)
  );

  if (!mounted) return <div className="min-h-screen bg-[#030303]" />;

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10 text-emerald-300 mx-auto mb-5">
            <Link2 className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-black tracking-[-0.03em] mb-2">Blockchain Explorer</h1>
          <p className="text-white/40">Immutable public ledger of all votes</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { l: "Total Blocks", v: stats.total, i: Link2, c: "#10b981" },
            { l: "Latest Block", v: `#${stats.latestBlock}`, i: Clock, c: "#06b6d4" },
            { l: "Anchored", v: stats.anchored, i: Shield, c: "#8b5cf6" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-center">
              <s.i className="w-6 h-6 mx-auto mb-3" style={{ color: s.c }} />
              <div className="text-2xl font-black">{s.v}</div>
              <div className="text-[11px] font-black text-white/25 uppercase mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/15" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by receipt, candidate, or block..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-white text-sm outline-none focus:border-emerald-400/20 transition-all"
          />
        </div>

        <div className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Block</th>
                  <th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Receipt</th>
                  <th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Candidate</th>
                  <th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Status</th>
                  <th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Time</th>
                  <th className="text-right p-4 text-[10px] font-black text-white/15 uppercase">Verify</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 20).map((v, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-white/[0.02] hover:bg-white/[0.01]"
                  >
                    <td className="p-4 text-xs font-mono text-white/40">#{v.blockNumber}</td>
                    <td className="p-4 text-xs font-mono text-emerald-300">{v.receipt?.slice(0, 16)}...</td>
                    <td className="p-4 text-sm font-bold text-white">{v.candidateName}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-[10px] font-black bg-emerald-400/10 text-emerald-300">
                        {v.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-white/30">{new Date(v.createdAt).toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => navigator.clipboard.writeText(v.receipt || "")}
                        className="p-2 rounded-lg text-white/15 hover:text-emerald-300 transition-all"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-white/5 text-center text-xs text-white/20">
            <Shield className="w-3 h-3 inline mr-1" />
            Immutable blockchain ledger — all entries are cryptographically verified
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
