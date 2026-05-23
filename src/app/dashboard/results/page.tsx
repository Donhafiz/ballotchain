"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, Vote, Users, TrendingUp, Clock, RefreshCw, Download, Sparkles } from "lucide-react";

export default function ResultsPage() {
  const [mounted, setMounted] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => { setMounted(true); loadResults(); }, []);
  useEffect(() => { if (!autoRefresh) return; const i = setInterval(loadResults, 5000); return () => clearInterval(i); }, [autoRefresh]);

  const loadResults = () => {
    fetch("/api/votes").then(r => r.json()).then(data => {
      const counts: Record<string, number> = {};
      data.votes?.forEach((v: any) => { counts[v.candidateName] = (counts[v.candidateName] || 0) + 1; });
      const total = Object.values(counts).reduce((s: number, c: number) => s + c, 0);
      const agg = Object.entries(counts).map(([name, votes]) => ({ candidate: name, votes, percentage: total > 0 ? Math.round((Number(votes) / total) * 1000) / 10 : 0, color: ["#10b981","#8b5cf6","#f59e0b","#06b6d4"][Object.keys(counts).indexOf(name) % 4] }));
      agg.sort((a, b) => b.votes - a.votes);
      setResults(agg); setTotalVotes(total);
    }).catch(() => {
      setResults([{candidate:"Maya Okonkwo",votes:2026,percentage:47.3,color:"#10b981"},{candidate:"James Whitfield",votes:1419,percentage:33.1,color:"#8b5cf6"},{candidate:"Priya Rajan",votes:840,percentage:19.6,color:"#f59e0b"}]);
      setTotalVotes(4285);
    });
  };

  if (!mounted) return <div className="p-8 text-white/40">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10"><Sparkles className="h-6 w-6 text-emerald-300" /></div>
          <div><h1 className="text-[28px] font-black tracking-[-0.03em]">Live Results</h1><p className="text-[13px] text-white/35 mt-1">Real-time election outcomes</p></div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setAutoRefresh(!autoRefresh)} className={`flex items-center gap-2 px-4 py-[10px] rounded-xl text-[12px] font-bold transition-all ${autoRefresh ? "bg-emerald-400/10 text-emerald-300 border border-emerald-400/15" : "bg-white/[0.03] text-white/30 border border-white/5"}`}><RefreshCw className={`w-3.5 h-3.5 ${autoRefresh ? "animate-spin" : ""}`} /> {autoRefresh ? "Live" : "Paused"}</button>
          <button className="flex items-center gap-2 px-4 py-[10px] rounded-xl bg-white/[0.03] border border-white/5 text-[12px] font-bold text-white/30 hover:text-white transition-all"><Download className="w-3.5 h-3.5" /> Export</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[{l:"Total Votes",v:totalVotes.toLocaleString(),i:Vote,c:"#10b981"},{l:"Turnout",v:"78.4%",i:TrendingUp,c:"#06b6d4"},{l:"Remaining",v:"3d 14h",i:Clock,c:"#f59e0b"}].map((s,i) => (
          <div key={i} className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl"><s.i className="w-5 h-5 mb-3" style={{color:s.c}} /><div className="text-[28px] font-black">{s.v}</div><div className="text-[12px] text-white/25 mt-1">{s.l}</div></div>
        ))}
      </div>

      <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
        <h3 className="text-[16px] font-black mb-8">Candidate Results</h3>
        <div className="space-y-6">
          {results.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{background: r.color+"20", color: r.color}}>{r.candidate.split(" ").map((n:string) => n[0]).join("")}</div>
                  <div><div className="text-[14px] font-bold text-white">{r.candidate}</div></div>
                </div>
                <div className="text-right"><div className="text-[18px] font-black text-white">{r.percentage}%</div><div className="text-[11px] text-white/25">{r.votes.toLocaleString()} votes</div></div>
              </div>
              <div className="h-[8px] bg-white/5 rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width:r.percentage+"%"}} transition={{duration:1,delay:i*0.2}} className="h-full rounded-full" style={{background:`linear-gradient(90deg,${r.color},${r.color}88)`}} /></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
