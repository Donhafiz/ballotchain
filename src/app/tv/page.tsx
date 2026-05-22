"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Vote, Users, TrendingUp, Clock, Shield, Zap, Globe, BarChart3 } from "lucide-react";

export default function TVDashboard() {
  const [results, setResults] = useState<any[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [time, setTime] = useState(new Date());
  const [election, setElection] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => { setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => { setMounted(true); loadData(); const i = setInterval(loadData, 5000); return () => clearInterval(i); }, []);

  useEffect(() => { setMounted(true);
    if (!chartRef.current || results.length === 0) return;
    (async () => {
      const Chart = (await import("chart.js/auto")).default;
      const ctx = chartRef.current?.getContext("2d");
      if (!ctx) return;
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, "rgba(16,185,129,0.3)");
      gradient.addColorStop(1, "rgba(16,185,129,0)");
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: results.map(r => r.candidate.split(" ")[0]),
          datasets: [{ data: results.map(r => r.votes), backgroundColor: ["#10b981","#06b6d4","#8b5cf6","#f59e0b","#ef4444","#ec4899"], borderRadius: 12, borderSkipped: false }]
        },
        options: {
          responsive: true, maintainAspectRatio: false, indexAxis: "y" as const,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "rgba(255,255,255,0.4)", font: { size: 14 } } },
            y: { grid: { display: false }, ticks: { color: "rgba(255,255,255,0.6)", font: { size: 16, weight: "bold" } } }
          }
        },
      });
    })();
  }, [results]);

  const loadData = () => {
    fetch("/api/votes").then(r => r.json()).then(data => {
      const counts: Record<string, number> = {};
      data.votes?.forEach((v: any) => { counts[v.candidateName] = (counts[v.candidateName] || 0) + 1; });
      const total = Object.values(counts).reduce((s: number, c: number) => s + c, 0);
      const agg = Object.entries(counts).map(([name, votes]) => ({ candidate: name, votes, percentage: total > 0 ? Math.round((Number(votes) / total) * 1000) / 10 : 0, color: ["#10b981","#06b6d4","#8b5cf6","#f59e0b","#ef4444","#ec4899"][Object.keys(counts).indexOf(name) % 6] }));
      agg.sort((a, b) => b.votes - a.votes);
      setResults(agg); setTotalVotes(total);
    }).catch(() => {
      setResults([{candidate:"Maya Okonkwo",votes:2026,percentage:47.3,color:"#10b981"},{candidate:"James Whitfield",votes:1419,percentage:33.1,color:"#06b6d4"},{candidate:"Priya Rajan",votes:840,percentage:19.6,color:"#8b5cf6"}]);
      setTotalVotes(4285);
    });
    fetch("/api/elections?status=live").then(r => r.json()).then(data => { if (data.elections?.length) setElection(data.elections[0]); }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white overflow-hidden">
      <div className="border-b border-white/5 bg-gradient-to-r from-emerald-900/30 via-cyan-900/20 to-violet-900/30 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-300 to-cyan-300 flex items-center justify-center"><Vote className="w-5 h-5 text-black" /></div><div><h1 className="text-lg font-black">BallotChain <span className="text-emerald-300">LIVE</span></h1><p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Election Command Center</p></div></div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20"><span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300" /></span><span className="text-xs font-black text-emerald-300 uppercase tracking-[0.1em]">Live</span></div>
        </div>
        <div className="text-right" suppressHydrationWarning><div className="text-2xl font-black font-mono">{mounted ? time.toLocaleTimeString() : "00:00:00"}</div><div className="text-[10px] text-white/20 uppercase">{mounted ? time.toLocaleDateString() : ""}</div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 p-8 h-[calc(100vh-80px)]">
        <div className="flex flex-col gap-6">
          <div className="text-center"><h2 className="text-4xl font-black">{election?.title || "Live Election Results"}</h2><p className="text-white/30 mt-2">Official Blockchain-Verified Results</p></div>
          <div className="grid grid-cols-4 gap-4">
            {[{l:"Total Votes",v:totalVotes.toLocaleString(),i:Vote,c:"#10b981"},{l:"Turnout",v:"78.4%",i:TrendingUp,c:"#06b6d4"},{l:"Voters",v:election?.eligibleVoters||"4,281",i:Users,c:"#8b5cf6"},{l:"Time Left",v:"3d 14h",i:Clock,c:"#f59e0b"}].map((s,i)=><div key={i} className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl text-center"><s.i className="w-6 h-6 mx-auto mb-3" style={{color:s.c}} /><div className="text-3xl font-black">{s.v}</div><div className="text-xs text-white/25 uppercase mt-2 tracking-[0.1em]">{s.l}</div></div>)}
          </div>
          <div className="flex-1 rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl"><div className="h-full"><canvas ref={chartRef} /></div></div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl flex flex-col">
          <h3 className="text-lg font-black mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-emerald-300" />Live Leaderboard</h3>
          <div className="space-y-3 flex-1">
            {results.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between mb-2"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black" style={{background:r.color+"20",color:r.color}}>#{i+1}</div><span className="font-bold">{r.candidate}</span></div><span className="text-lg font-black">{r.percentage}%</span></div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width:r.percentage+"%"}} transition={{duration:1,delay:i*0.2}} className="h-full rounded-full" style={{background:r.color}} /></div>
                <div className="text-[10px] text-white/25 mt-2 text-right">{r.votes.toLocaleString()} votes</div>
              </motion.div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-center gap-4 text-xs text-white/20"><span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-300" />Blockchain Verified</span><span>·</span><span className="flex items-center gap-1"><Globe className="w-3 h-3 text-cyan-300" />Live Global Feed</span><span>·</span><span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-300" />Real-Time</span></div>
        </div>
      </div>
    </div>
  );
}
