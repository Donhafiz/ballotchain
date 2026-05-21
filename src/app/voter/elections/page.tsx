"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Vote, Clock, CheckCircle2, ChevronRight, Search, Users, Calendar, ArrowLeft } from "lucide-react";

export default function VoterElectionsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const elections = [
    { id: "1", title: "Student Council 2026", deadline: "May 22, 2026", status: "active", voted: false, turnout: 78, description: "Annual election for Student Council President and representatives." },
    { id: "2", title: "Faculty Senate", deadline: "May 25, 2026", status: "active", voted: true, turnout: 54, description: "Election for faculty representatives to the university senate." },
    { id: "3", title: "Sports Committee", deadline: "Jun 8, 2026", status: "upcoming", voted: false, turnout: 0, description: "Select student representatives for the sports committee." },
    { id: "4", title: "Board of Trustees", deadline: "Jun 22, 2026", status: "upcoming", voted: false, turnout: 0, description: "Student trustee election for the board." },
    { id: "5", title: "Homecoming Court 2025", deadline: "Apr 17, 2025", status: "ended", voted: true, turnout: 92, description: "Vote for your Homecoming King and Queen." },
  ];

  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0b0c0f]">
      <div className="max-w-[1160px] mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/voter" className="p-2 rounded-xl text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">All Elections</h1>
            <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Browse active, upcoming, and past elections</p>
          </div>
        </div>

        <div className="space-y-4">
          {elections.map((election) => (
            <div key={election.id} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 hover:border-[rgba(255,255,255,0.1)] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center">
                    <Vote className="w-6 h-6 text-[#4fffb0]" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-white">{election.title}</h3>
                    <p className="text-[13px] text-[rgba(255,255,255,0.35)] mt-1">{election.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-[12px] text-[rgba(255,255,255,0.3)]">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {election.deadline}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {election.turnout}% turnout</span>
                    </div>
                  </div>
                </div>
                <span className={"px-3 py-1 rounded-full text-[10px] font-bold uppercase " + (election.status === "active" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : election.status === "upcoming" ? "bg-[rgba(245,158,11,0.1)] text-[#f59e0b]" : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.3)]")}>
                  {election.status}
                </span>
              </div>
              <div className="flex items-center justify-end">
                {election.voted ? (
                  <Link href={`/voter/my-votes/${election.id}`} className="px-4 py-[8px] rounded-lg bg-[rgba(79,255,176,0.06)] text-[#4fffb0] text-[12px] font-semibold no-underline hover:bg-[rgba(79,255,176,0.1)] transition-all flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> View Receipt
                  </Link>
                ) : election.status === "active" ? (
                  <Link href={`/voter/elections/${election.id}/vote`} className="px-5 py-[10px] rounded-lg bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold no-underline hover:opacity-90 transition-all flex items-center gap-2">
                    Vote Now <ChevronRight className="w-4 h-4" />
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}