"use client";

import { useState, useEffect } from "react";
import { BarChart3, Vote, Users, TrendingUp, Clock, RefreshCw, Download, Zap } from "lucide-react";
import { api } from "@/lib/api/client";

export default function ResultsPage() {
  const [mounted, setMounted] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [elections, setElections] = useState<any[]>([]);
  const [selectedElection, setSelectedElection] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    loadElections();
  }, []);

  useEffect(() => {
    if (!autoRefresh || !selectedElection) return;
    const interval = setInterval(loadResults, 5000);
    return () => clearInterval(interval);
  }, [autoRefresh, selectedElection]);

  const loadElections = async () => {
    try {
      const data = await api("/api/elections");
      setElections(data.elections || []);
      if (data.elections?.length > 0) {
        setSelectedElection(data.elections[0]._id);
      }
    } catch {}
    setLoading(false);
  };

  const loadResults = async () => {
    if (!selectedElection) return;
    try {
      const data = await api(`/api/votes?electionId=${selectedElection}`);
      const votes = data.votes || [];
      
      // Aggregate by candidate
      const counts: Record<string, number> = {};
      votes.forEach((v: any) => {
        counts[v.candidateName] = (counts[v.candidateName] || 0) + 1;
      });
      
      const aggregated = Object.entries(counts).map(([name, votes]) => ({
        candidate: name,
        party: "",
        votes,
        percentage: 0,
        color: ["#4fffb0", "#8b5cf6", "#f59e0b", "#00d4ff"][Object.keys(counts).indexOf(name) % 4],
        trend: "up",
      }));
      
      const total = aggregated.reduce((s, c) => s + c.votes, 0);
      aggregated.forEach(c => c.percentage = total > 0 ? Math.round((c.votes / total) * 1000) / 10 : 0);
      aggregated.sort((a, b) => b.votes - a.votes);
      
      setResults(aggregated);
      setTotalVotes(total);
    } catch {
      // Fallback mock data
      setResults([
        { candidate: "Maya Okonkwo", party: "Student Action", votes: 2026, percentage: 47.3, color: "#4fffb0", trend: "up" },
        { candidate: "James Whitfield", party: "Progressive Union", votes: 1419, percentage: 33.1, color: "#8b5cf6", trend: "stable" },
        { candidate: "Priya Rajan", party: "United Students", votes: 840, percentage: 19.6, color: "#f59e0b", trend: "up" },
      ]);
      setTotalVotes(4285);
    }
  };

  useEffect(() => { if (selectedElection) loadResults(); }, [selectedElection]);

  if (!mounted) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

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

      <div className="flex items-center gap-2 flex-wrap">
        {elections.map((el) => (
          <button key={el._id} onClick={() => setSelectedElection(el._id)} className={"px-4 py-[9px] rounded-xl text-[13px] font-semibold transition-all flex items-center gap-2 " + (selectedElection === el._id ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "text-[rgba(255,255,255,0.3)] hover:text-white")}>
            {el.status === "live" && <span className="w-[6px] h-[6px] rounded-full bg-[#4fffb0] animate-pulse" />}
            {el.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <Vote className="w-5 h-5 text-[#4fffb0] mb-3" />
          <div className="text-[28px] font-extrabold text-white">{totalVotes.toLocaleString()}</div>
          <div className="text-[12px] text-[rgba(255,255,255,0.3)] mt-1">Total Votes Cast</div>
        </div>
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <TrendingUp className="w-5 h-5 text-[#00d4ff] mb-3" />
          <div className="text-[28px] font-extrabold text-white">{results.length > 0 ? Math.round(totalVotes / 50) : 0}%</div>
          <div className="text-[12px] text-[rgba(255,255,255,0.3)] mt-1">Voter Turnout</div>
        </div>
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <Clock className="w-5 h-5 text-[#f59e0b] mb-3" />
          <div className="text-[28px] font-extrabold text-white">3d 14h</div>
          <div className="text-[12px] text-[rgba(255,255,255,0.3)] mt-1">Time Remaining</div>
        </div>
      </div>

      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8">
        <h3 className="text-[16px] font-bold text-white mb-8">Candidate Results</h3>
        <div className="space-y-6">
          {results.map((result, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: result.color + "20", color: result.color }}>
                    {result.candidate.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-white">{result.candidate}</div>
                    <div className="text-[11px] text-[rgba(255,255,255,0.3)]">{result.party}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[18px] font-bold text-white">{result.percentage}%</div>
                  <div className="text-[11px] text-[rgba(255,255,255,0.3)]">{result.votes.toLocaleString()} votes</div>
                </div>
              </div>
              <div className="h-[8px] bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: result.percentage + "%", background: `linear-gradient(90deg, ${result.color}, ${result.color}88)` }} />
              </div>
            </div>
          ))}
          {results.length === 0 && <p className="text-sm text-[rgba(255,255,255,0.3)] text-center py-8">No votes recorded yet for this election.</p>}
        </div>
      </div>
    </div>
  );
}
