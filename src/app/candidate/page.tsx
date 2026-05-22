"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Vote, TrendingUp, Award, Clock } from "lucide-react";

export default function CandidateDashboard() {
  const [mounted, setMounted] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [candidateName] = useState("Maya Okonkwo");
  const [electionTitle, setElectionTitle] = useState("");

  useEffect(() => {
    setMounted(true);
    fetch('/api/elections?status=live')
      .then(r => r.json())
      .then(data => {
        if (data.elections?.length > 0) {
          const election = data.elections[0];
          setElectionTitle(election.title);
          fetch(`/api/votes?electionId=${election._id}`)
            .then(r => r.json())
            .then(voteData => {
              const counts: Record<string, number> = {};
              voteData.votes?.forEach((v: any) => {
                counts[v.candidateName] = (counts[v.candidateName] || 0) + 1;
              });
              const aggregated = Object.entries(counts).map(([name, votes]) => ({
                candidate: name,
                votes,
                percentage: 0
              }));
              const total = aggregated.reduce((s, c) => s + c.votes, 0);
              aggregated.forEach(c => c.percentage = total > 0 ? Math.round((c.votes / total) * 100) : 0);
              aggregated.sort((a, b) => b.votes - a.votes);
              setResults(aggregated);
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  }, []);

  const myResult = results.find(r => r.candidate === candidateName);
  const rank = myResult ? results.findIndex(r => r.candidate === candidateName) + 1 : 0;

  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white">
      <nav className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(11,12,15,0.8)] backdrop-blur-2xl">
        <div className="max-w-[1160px] mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#4fffb0] to-[#00d4ff] flex items-center justify-center font-extrabold text-xs text-[#0b0c0f]">BC</div>
            <span className="text-base font-bold">Ballot<span className="text-[#4fffb0]">Chain</span></span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        <h1 className="text-[28px] font-bold tracking-[-0.03em]">Candidate Dashboard</h1>
        <p className="text-sm text-[rgba(255,255,255,0.35)]">{electionTitle || "Election"} · {candidateName}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5">
            <Award className="w-5 h-5 text-[#f59e0b] mb-2" />
            <div className="text-2xl font-extrabold">#{rank || '-'}</div>
            <div className="text-xs text-[rgba(255,255,255,0.3)] uppercase mt-1">Rank</div>
          </div>
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5">
            <Vote className="w-5 h-5 text-[#4fffb0] mb-2" />
            <div className="text-2xl font-extrabold">{myResult?.votes || 0}</div>
            <div className="text-xs text-[rgba(255,255,255,0.3)] uppercase mt-1">My Votes</div>
          </div>
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5">
            <TrendingUp className="w-5 h-5 text-[#00d4ff] mb-2" />
            <div className="text-2xl font-extrabold">{myResult?.percentage || 0}%</div>
            <div className="text-xs text-[rgba(255,255,255,0.3)] uppercase mt-1">Share</div>
          </div>
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5">
            <Clock className="w-5 h-5 text-[#a78bfa] mb-2" />
            <div className="text-2xl font-extrabold">3d</div>
            <div className="text-xs text-[rgba(255,255,255,0.3)] uppercase mt-1">Remaining</div>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8">
          <h3 className="text-lg font-bold mb-6">Live Results</h3>
          {results.map((r, i) => (
            <div key={i} className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-semibold ${r.candidate === candidateName ? 'text-[#f59e0b]' : 'text-white'}`}>
                  {r.candidate} {r.candidate === candidateName ? '⭐' : ''}
                </span>
                <span className="text-sm font-bold">{r.percentage}%</span>
              </div>
              <div className="h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#4fffb0] to-[#00d4ff]" style={{ width: `${r.percentage}%` }} />
              </div>
              <div className="text-xs text-[rgba(255,255,255,0.3)] mt-1">{r.votes} votes</div>
            </div>
          ))}
          {results.length === 0 && <p className="text-sm text-[rgba(255,255,255,0.3)]">No votes yet</p>}
        </div>
      </div>
    </div>
  );
}
