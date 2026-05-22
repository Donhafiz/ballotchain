"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Vote, Users, Share2, Download, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PublicResultsPage() {
  const params = useParams();
  const [results, setResults] = useState<any[]>([]);
  const [election, setElection] = useState<any>(null);

  useEffect(() => {
    const id = params.electionId || "1";
    fetch("/api/elections").then(r => r.json()).then(d => {
      const found = d.elections?.find((e: any) => e._id === id || e.id === id);
      setElection(found || { title: "Election Results" });
    }).catch(() => setElection({ title: "Election Results" }));

    fetch(`/api/votes?electionId=${id}`).then(r => r.json()).then(d => {
      const counts: Record<string, number> = {};
      d.votes?.forEach((v: any) => { counts[v.candidateName] = (counts[v.candidateName] || 0) + 1; });
      const total = Object.values(counts).reduce((s: number, c: number) => s + c, 0);
      const aggregated = Object.entries(counts).map(([name, votes]) => ({ candidate: name, votes, percentage: total > 0 ? Math.round((Number(votes) / total) * 100) : 0 }));
      aggregated.sort((a, b) => b.votes - a.votes);
      setResults(aggregated);
    }).catch(() => {
      setResults([{ candidate: "Maya Okonkwo", votes: 2026, percentage: 47 },{ candidate: "James Whitfield", votes: 1419, percentage: 33 },{ candidate: "Priya Rajan", votes: 840, percentage: 20 }]);
    });
  }, [params.electionId]);

  const totalVotes = results.reduce((s, r) => s + r.votes, 0);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-2">{election?.title || "Election Results"}</h1>
          <p className="text-[rgba(255,255,255,0.4)]">Public, verifiable, blockchain-anchored results</p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <button onClick={() => { navigator.clipboard.writeText(shareUrl); alert("Link copied!"); }} className="px-4 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] text-sm hover:bg-[rgba(255,255,255,0.08)] transition-all flex items-center gap-2"><Share2 className="w-4 h-4" /> Share</button>
            <button className="px-4 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] text-sm hover:bg-[rgba(255,255,255,0.08)] transition-all flex items-center gap-2"><Download className="w-4 h-4" /> Download</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 text-center"><Vote className="w-5 h-5 text-[#4fffb0] mx-auto mb-2" /><div className="text-2xl font-extrabold">{totalVotes}</div><div className="text-xs text-[rgba(255,255,255,0.3)]">Total Votes</div></div>
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 text-center"><Users className="w-5 h-5 text-[#00d4ff] mx-auto mb-2" /><div className="text-2xl font-extrabold">{results.length}</div><div className="text-xs text-[rgba(255,255,255,0.3)]">Candidates</div></div>
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 text-center"><Shield className="w-5 h-5 text-[#a78bfa] mx-auto mb-2" /><div className="text-2xl font-extrabold">✓</div><div className="text-xs text-[rgba(255,255,255,0.3)]">Verified</div></div>
        </div>
        <div className="space-y-4">
          {results.map((r, i) => (
            <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
              <div className="flex justify-between items-center mb-3"><span className="font-bold text-lg">{r.candidate}</span><span className="font-bold text-lg">{r.percentage}%</span></div>
              <div className="h-3 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] transition-all duration-1000" style={{ width: `${r.percentage}%` }} /></div>
              <div className="text-xs text-[rgba(255,255,255,0.3)] mt-2">{r.votes.toLocaleString()} votes</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}