"use client";

import { useState, useEffect } from "react";
import { BarChart3, Vote, Users, TrendingUp, Clock, RefreshCw, Download, Zap, ChevronRight } from "lucide-react";

export default function ResultsPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedElection, setSelectedElection] = useState("student_council");
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      setResults(prev => prev.map(r => ({
        ...r,
        votes: r.votes + Math.floor(Math.random() * 5),
        percentage: 0
      })).map((r, _, arr) => {
        const total = arr.reduce((s, c) => s + c.votes, 0);
        return { ...r, percentage: total > 0 ? ((r.votes / total) * 100) : 0 };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const [results, setResults] = useState([
    { candidate: "Maya Okonkwo", party: "Student Action", votes: 2026, percentage: 47.3, color: "#4fffb0", trend: "up" },
    { candidate: "James Whitfield", party: "Progressive Union", votes: 1419, percentage: 33.1, color: "#8b5cf6", trend: "stable" },
    { candidate: "Priya Rajan", party: "United Students", votes: 840, percentage: 19.6, color: "#f59e0b", trend: "up" },
  ]);

  const totalVotes = results.reduce((sum, r) => sum + r.votes, 0);
  const turnout = 78.4;
  const eligibleVoters = 4281;

  const elections = [
    { id: "student_council", title: "Student Council 2026", status: "live" },
    { id: "faculty_senate", title: "Faculty Senate", status: "live" },
    { id: "sports_committee", title: "Sports Committee", status: "upcoming" },
  ];

  if (!mounted) {
    return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Live Results</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Real-time election outcomes</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setAutoRefresh(!autoRefresh)} className={"flex items-center gap-2 px-4 py-[10px] rounded-xl text-[12px] font-semibold transition-all " + (autoRefresh ? "bg-[rgba(79,255,176,0.08)] text-[#4fffb0]" : "bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.08)]")}>
            <RefreshCw className={"w-3.5 h-3.5 " + (autoRefresh ? "animate-spin" : "")} /> {autoRefresh ? "Live" : "Paused"}
          </button>
          <button className="flex items-center gap-2 px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[12px] font-medium text-[rgba(255,255,255,0.4)] hover:text-white transition-all">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Election Selector */}
      <div className="flex items-center gap-2">
        {elections.map((el) => (
          <button key={el.id} onClick={() => setSelectedElection(el.id)} className={"px-4 py-[9px] rounded-xl text-[13px] font-semibold transition-all flex items-center gap-2 " + (selectedElection === el.id ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "text-[rgba(255,255,255,0.3)] hover:text-white")}>
            {el.status === "live" && <span className="relative flex h-[6px] w-[6px]"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fffb0] opacity-75" /><span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-[#4fffb0]" /></span>}
            {el.title}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <Users className="w-5 h-5 text-[#4fffb0] mb-3" />
          <div className="text-[28px] font-extrabold text-white">{totalVotes.toLocaleString()}</div>
          <div className="text-[12px] text-[rgba(255,255,255,0.3)] mt-1">Total Votes Cast</div>
        </div>
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <TrendingUp className="w-5 h-5 text-[#00d4ff] mb-3" />
          <div className="text-[28px] font-extrabold text-white">{turnout}%</div>
          <div className="text-[12px] text-[rgba(255,255,255,0.3)] mt-1">Voter Turnout</div>
        </div>
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <Clock className="w-5 h-5 text-[#f59e0b] mb-3" />
          <div className="text-[28px] font-extrabold text-white">3d 14h</div>
          <div className="text-[12px] text-[rgba(255,255,255,0.3)] mt-1">Time Remaining</div>
        </div>
      </div>

      {/* Results Bars */}
      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8">
        <h3 className="text-[16px] font-bold text-white mb-8">Candidate Results</h3>
        <div className="space-y-6">
          {results.map((result, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: result.color + "20", color: result.color }}>
                    {result.candidate.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-white">{result.candidate}</div>
                    <div className="text-[11px] text-[rgba(255,255,255,0.3)]">{result.party}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[14px] font-bold text-white">{result.percentage.toFixed(1)}%</div>
                  <div className="text-[11px] text-[rgba(255,255,255,0.3)]">{result.votes.toLocaleString()} votes</div>
                </div>
              </div>
              <div className="h-[8px] bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: result.percentage + "%", background: `linear-gradient(90deg, ${result.color}, ${result.color}88)` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}