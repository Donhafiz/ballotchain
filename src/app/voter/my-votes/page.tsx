"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Shield, Download, Eye, Copy, Clock, Vote, ExternalLink } from "lucide-react";

export default function MyVotesPage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => { setMounted(true); }, []);

  const votes = [
    { id: "v1", election: "Faculty Senate", date: "May 19, 2026 14:32", candidate: "Dr. Sarah Mitchell", position: "Faculty Senator", receipt: "0xf1e2d3c4b5a67890abcdef1234567890", verified: true },
    { id: "v2", election: "Homecoming Court 2025", date: "Apr 10, 2025 09:15", candidate: "James Whitfield", position: "Homecoming King", receipt: "0xa1b2c3d4e5f67890abcdef1234567890", verified: true },
    { id: "v3", election: "Club Leadership 2024", date: "Nov 15, 2024 16:45", candidate: "Priya Rajan", position: "Club President", receipt: "0xe5f6g7h8i9j01234abcdef1234567890", verified: true },
  ];

  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0b0c0f]">
      <div className="max-w-[800px] mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/voter" className="p-2 rounded-xl text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">My Votes</h1>
            <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Your cryptographically verified voting history</p>
          </div>
        </div>

        <div className="space-y-4">
          {votes.map((vote) => (
            <Link key={vote.id} href={`/voter/my-votes/${vote.id}`} className="block bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 hover:border-[rgba(255,255,255,0.1)] transition-all no-underline group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-[#4fffb0]" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-white">{vote.election}</h3>
                    <p className="text-[13px] text-[rgba(255,255,255,0.4)]">{vote.position} · Voted for <span className="text-white font-semibold">{vote.candidate}</span></p>
                    <p className="text-[11px] text-[rgba(255,255,255,0.25)] mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {vote.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-[10px] font-mono text-[rgba(255,255,255,0.2)]">{vote.receipt.slice(0, 18)}...</span>
                  <Shield className="w-5 h-5 text-[#4fffb0]" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 text-center">
          <Shield className="w-12 h-12 text-[rgba(255,255,255,0.08)] mx-auto mb-3" />
          <h3 className="text-[15px] font-bold text-white">All votes are permanently recorded</h3>
          <p className="text-[13px] text-[rgba(255,255,255,0.3)] mt-1">Each receipt is cryptographically signed and anchored to the BallotChain blockchain for independent verification.</p>
        </div>
      </div>
    </div>
  );
}