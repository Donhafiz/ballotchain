"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Vote, Plus, Search, Filter, Eye, Edit, Trash2, Play, Pause,
  Archive, ChevronLeft, ChevronRight, Clock, Users, BarChart3,
  MoreHorizontal, Copy, Zap, CheckCircle2
} from "lucide-react";

export default function ElectionsPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const showToast = (message: string, type: string = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const [elections, setElections] = useState([
    { id: "1", title: "Student Council 2026", status: "live", voters: 450, votes: 3847, turnout: 78, startDate: "May 15", endDate: "May 22", type: "Single Choice" },
    { id: "2", title: "Faculty Senate", status: "live", voters: 280, votes: 2190, turnout: 54, startDate: "May 18", endDate: "May 25", type: "Ranked Choice" },
    { id: "3", title: "Sports Committee", status: "scheduled", voters: 120, votes: 0, turnout: 0, startDate: "Jun 1", endDate: "Jun 8", type: "Single Choice" },
    { id: "4", title: "Board of Trustees", status: "draft", voters: 35, votes: 0, turnout: 0, startDate: "Jun 15", endDate: "Jun 22", type: "Approval" },
    { id: "5", title: "Homecoming Court 2025", status: "ended", voters: 890, votes: 7850, turnout: 92, startDate: "Apr 10", endDate: "Apr 17", type: "Multiple Choice" },
  ]);

  const filtered = elections.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || e.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = [
    { label: "Total", value: elections.length, icon: Vote, color: "#4fffb0" },
    { label: "Live", value: elections.filter(e => e.status === "live").length, icon: Zap, color: "#4fffb0" },
    { label: "Scheduled", value: elections.filter(e => e.status === "scheduled").length, icon: Clock, color: "#f59e0b" },
    { label: "Ended", value: elections.filter(e => e.status === "ended").length, icon: CheckCircle2, color: "#a78bfa" },
  ];

  if (!mounted) {
    return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Elections</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Create, manage and monitor your elections</p>
        </div>
        <Link href="/dashboard/elections/create" className="flex items-center gap-2 px-5 py-[11px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold no-underline hover:opacity-90 hover:-translate-y-[1px] transition-all shadow-[0_0_30px_rgba(79,255,176,0.2)]">
          <Plus className="w-4 h-4" /> New Election
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: stat.color + "15" }}>
              <stat.icon className="w-[18px] h-[18px]" style={{ color: stat.color }} />
            </div>
            <div className="text-[28px] font-extrabold text-white tracking-[-0.03em]">{stat.value}</div>
            <div className="text-[11px] font-medium text-[rgba(255,255,255,0.3)] uppercase tracking-[0.06em] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.2)]" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search elections..." className="w-full pl-11 pr-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[13px] outline-none placeholder:text-[rgba(255,255,255,0.15)] focus:border-[rgba(79,255,176,0.3)] transition-all" />
        </div>
        {["all", "live", "scheduled", "draft", "ended"].map((status) => (
          <button key={status} onClick={() => setFilterStatus(status)} className={"px-4 py-[9px] rounded-xl text-[12px] font-semibold capitalize transition-all " + (filterStatus === status ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.03)]")}>
            {status}
          </button>
        ))}
      </div>

      {/* Elections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((election) => (
          <div key={election.id} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 hover:border-[rgba(255,255,255,0.1)] transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center">
                  <Vote className="w-5 h-5 text-[#4fffb0]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-white">{election.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-[rgba(255,255,255,0.3)]">{election.startDate} — {election.endDate}</span>
                    <span className="text-[11px] text-[rgba(255,255,255,0.15)]">·</span>
                    <span className="text-[11px] text-[rgba(255,255,255,0.3)]">{election.type}</span>
                  </div>
                </div>
              </div>
              <span className={"inline-flex items-center gap-[5px] px-2 py-[3px] rounded-full text-[10px] font-bold uppercase " + (election.status === "live" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : election.status === "scheduled" ? "bg-[rgba(245,158,11,0.1)] text-[#f59e0b]" : election.status === "ended" ? "bg-[rgba(139,92,246,0.1)] text-[#a78bfa]" : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.3)]")}>
                {election.status === "live" && <span className="w-[5px] h-[5px] rounded-full bg-[#4fffb0] animate-pulse" />}
                {election.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-[0.05em]">Voters</div>
                <div className="text-[16px] font-bold text-white flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[rgba(255,255,255,0.3)]" /> {election.voters.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-[0.05em]">Votes</div>
                <div className="text-[16px] font-bold text-white flex items-center gap-1"><Vote className="w-3.5 h-3.5 text-[rgba(255,255,255,0.3)]" /> {election.votes.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-[0.05em]">Turnout</div>
                <div className="text-[16px] font-bold text-white flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5 text-[rgba(255,255,255,0.3)]" /> {election.turnout}%</div>
              </div>
            </div>

            {election.turnout > 0 && (
              <div className="h-[4px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden mb-4">
                <div className="h-full bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] rounded-full transition-all duration-700" style={{ width: election.turnout + "%" }} />
              </div>
            )}

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link href={"/dashboard/elections/" + election.id} className="p-2 rounded-lg text-[rgba(255,255,255,0.25)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><Eye className="w-4 h-4" /></Link>
              <button className="p-2 rounded-lg text-[rgba(255,255,255,0.25)] hover:text-[#4fffb0] hover:bg-[rgba(79,255,176,0.05)] transition-all"><Edit className="w-4 h-4" /></button>
              <button className="p-2 rounded-lg text-[rgba(255,255,255,0.25)] hover:text-[#f59e0b] hover:bg-[rgba(245,158,11,0.05)] transition-all"><Copy className="w-4 h-4" /></button>
              <div className="flex-1" />
              {election.status === "draft" && (
                <button onClick={() => { setElections(elections.map(e => e.id === election.id ? { ...e, status: "live" } : e)); showToast(`${election.title} is now live!`, "success"); }} className="px-3 py-[6px] rounded-lg bg-[rgba(79,255,176,0.08)] text-[#4fffb0] text-[11px] font-semibold hover:bg-[rgba(79,255,176,0.12)] transition-all flex items-center gap-1"><Play className="w-3 h-3" /> Publish</button>
              )}
              {election.status === "live" && (
                <button onClick={() => { setElections(elections.map(e => e.id === election.id ? { ...e, status: "ended" } : e)); showToast(`${election.title} has ended`, "warning"); }} className="px-3 py-[6px] rounded-lg bg-[rgba(245,158,11,0.08)] text-[#f59e0b] text-[11px] font-semibold hover:bg-[rgba(245,158,11,0.12)] transition-all flex items-center gap-1"><Pause className="w-3 h-3" /> End</button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 py-16 text-center">
            <Vote className="w-16 h-16 text-[rgba(255,255,255,0.06)] mx-auto mb-4" />
            <p className="text-[15px] text-[rgba(255,255,255,0.25)]">No elections found</p>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[300] animate-[fadeSlideUp_0.3s_ease]">
          <div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]">
            <CheckCircle2 className="w-5 h-5 text-[#4fffb0]" />
            <span className="text-[13px] font-medium text-white">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}