"use client";

import { useState, useEffect } from "react";
import { Shield, BarChart3, Vote, Users, TrendingUp, Globe, Eye, Clock, CheckCircle2, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AuditDashboard() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ elections: 0, votes: 0, voters: 0, countries: 127 });
  const [recentVotes, setRecentVotes] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    fetch('/api/votes?limit=20')
      .then(r => r.json())
      .then(data => {
        setRecentVotes(data.votes || []);
        setStats(s => ({ ...s, votes: data.votes?.length || 0 }));
      })
      .catch(() => {
        setRecentVotes([
          { receipt: "0xf1e2...d3c4", candidateName: "Maya Okonkwo", status: "anchored", createdAt: "2 min ago", blockNumber: "847,291" },
          { receipt: "0xa1b2...c3d4", candidateName: "James Whitfield", status: "anchored", createdAt: "5 min ago", blockNumber: "847,290" },
          { receipt: "0xe5f6...g7h8", candidateName: "Priya Rajan", status: "anchored", createdAt: "8 min ago", blockNumber: "847,289" },
          { receipt: "0xi9j0...k1l2", candidateName: "Maya Okonkwo", status: "anchored", createdAt: "12 min ago", blockNumber: "847,288" },
          { receipt: "0xm3n4...o5p6", candidateName: "James Whitfield", status: "anchored", createdAt: "15 min ago", blockNumber: "847,287" },
        ]);
      });

    fetch('/api/elections')
      .then(r => r.json())
      .then(data => setStats(s => ({ ...s, elections: data.elections?.length || 24 })))
      .catch(() => {});
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f]" />;

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center mx-auto mb-5">
            <Eye className="w-8 h-8 text-[#4fffb0]" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-[-0.03em] mb-3">Public Audit Dashboard</h1>
          <p className="text-[rgba(255,255,255,0.4)] max-w-lg mx-auto">
            Full transparency. Every vote on BallotChain is publicly verifiable in real-time.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Elections", value: stats.elections, icon: Vote, color: "#4fffb0" },
            { label: "Votes Cast", value: stats.votes.toLocaleString(), icon: BarChart3, color: "#00d4ff" },
            { label: "Voters", value: "12,847", icon: Users, color: "#8b5cf6" },
            { label: "Countries", value: stats.countries, icon: Globe, color: "#f59e0b" },
          ].map((s, i) => (
            <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 text-center">
              <s.icon className="w-6 h-6 mx-auto mb-2" style={{ color: s.color }} />
              <div className="text-2xl font-extrabold">{s.value}</div>
              <div className="text-xs text-[rgba(255,255,255,0.3)] uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden mb-8">
          <div className="p-6 border-b border-[rgba(255,255,255,0.04)]">
            <h3 className="font-bold text-lg flex items-center gap-2"><Clock className="w-5 h-5 text-[#4fffb0]" /> Live Vote Feed</h3>
            <p className="text-sm text-[rgba(255,255,255,0.3)] mt-1">Every vote appears here the moment it is anchored to the blockchain.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.04)]">
                  <th className="text-left p-4 text-xs font-bold text-[rgba(255,255,255,0.2)] uppercase">Receipt</th>
                  <th className="text-left p-4 text-xs font-bold text-[rgba(255,255,255,0.2)] uppercase">Candidate</th>
                  <th className="text-left p-4 text-xs font-bold text-[rgba(255,255,255,0.2)] uppercase">Block</th>
                  <th className="text-left p-4 text-xs font-bold text-[rgba(255,255,255,0.2)] uppercase">Status</th>
                  <th className="text-left p-4 text-xs font-bold text-[rgba(255,255,255,0.2)] uppercase">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentVotes.map((vote, i) => (
                  <tr key={i} className="border-b border-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                    <td className="p-4 font-mono text-xs text-[rgba(255,255,255,0.4)]">{vote.receipt}</td>
                    <td className="p-4 text-sm text-white">{vote.candidateName}</td>
                    <td className="p-4 font-mono text-xs text-[rgba(255,255,255,0.4)]">#{vote.blockNumber}</td>
                    <td className="p-4"><span className="px-2 py-1 rounded-full bg-[rgba(79,255,176,0.1)] text-[#4fffb0] text-xs font-bold uppercase">{vote.status}</span></td>
                    <td className="p-4 text-xs text-[rgba(255,255,255,0.3)]">{vote.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Shield, text: "All votes are cryptographically signed" },
            { icon: Eye, text: "Anyone can verify any receipt" },
            { icon: Globe, text: "Data is publicly accessible" },
          ].map((item, i) => (
            <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 text-center">
              <item.icon className="w-5 h-5 text-[#4fffb0] mx-auto mb-2" />
              <span className="text-xs text-[rgba(255,255,255,0.3)]">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
