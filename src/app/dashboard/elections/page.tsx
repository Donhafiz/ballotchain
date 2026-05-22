"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Vote, Plus, Search, Play, Pause, Eye, Edit, Copy, CheckCircle2, Zap, Clock, Users, BarChart3 } from "lucide-react";
import { elections as electionsApi } from "@/lib/api/client";

export default function ElectionsPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [elections, setElections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setMounted(true); loadElections(); }, []);

  const loadElections = async () => {
    try {
      const data = await electionsApi.list();
      setElections(data.elections || []);
    } catch {
      // Mock fallback
      setElections([
        { _id: "1", title: "Student Council 2026", status: "live", eligibleVoters: 450, totalVotes: 3847, turnout: 78, startDate: "May 15", endDate: "May 22", type: "Single Choice" },
        { _id: "2", title: "Faculty Senate", status: "live", eligibleVoters: 280, totalVotes: 2190, turnout: 54, startDate: "May 18", endDate: "May 25", type: "Ranked Choice" },
        { _id: "3", title: "Sports Committee", status: "scheduled", eligibleVoters: 120, totalVotes: 0, turnout: 0, startDate: "Jun 1", endDate: "Jun 8", type: "Single Choice" },
        { _id: "4", title: "Board of Trustees", status: "draft", eligibleVoters: 35, totalVotes: 0, turnout: 0, startDate: "Jun 15", endDate: "Jun 22", type: "Approval" },
      ]);
    }
    setLoading(false);
  };

  const showToast = (m: string, t = "success") => { setToast({ message: m, type: t }); setTimeout(() => setToast(null), 3000); };

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

  if (!mounted) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Elections</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Create, manage and monitor your elections</p>
        </div>
        <Link href="/dashboard/elections/create" className="flex items-center gap-2 px-5 py-[11px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold no-underline hover:opacity-90 transition-all shadow-[0_0_30px_rgba(79,255,176,0.2)]">
          <Plus className="w-4 h-4" /> New Election
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: stat.color + "15" }}><stat.icon className="w-[18px] h-[18px]" style={{ color: stat.color }} /></div>
            <div className="text-[28px] font-extrabold text-white">{stat.value}</div>
            <div className="text-[11px] font-medium text-[rgba(255,255,255,0.3)] uppercase mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.2)]" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search elections..." className="w-full pl-11 pr-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[13px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" />
        </div>
        {["all", "live", "scheduled", "draft", "ended"].map(status => (
          <button key={status} onClick={() => setFilterStatus(status)} className={"px-4 py-[9px] rounded-xl text-[12px] font-semibold capitalize transition-all " + (filterStatus === status ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.03)]")}>{status}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((election) => (
          <div key={election._id || election.id} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 hover:border-[rgba(255,255,255,0.1)] transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center"><Vote className="w-5 h-5 text-[#4fffb0]" /></div>
                <div>
                  <h3 className="text-[15px] font-bold text-white">{election.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-[rgba(255,255,255,0.3)]">{election.startDate} — {election.endDate}</span>
                  </div>
                </div>
              </div>
              <span className={"inline-flex items-center gap-[5px] px-2 py-[3px] rounded-full text-[10px] font-bold uppercase " + (election.status === "live" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : election.status === "scheduled" ? "bg-[rgba(245,158,11,0.1)] text-[#f59e0b]" : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.3)]")}>
                {election.status === "live" && <span className="w-[5px] h-[5px] rounded-full bg-[#4fffb0] animate-pulse" />}{election.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div><div className="text-[11px] text-[rgba(255,255,255,0.3)] uppercase">Voters</div><div className="text-[16px] font-bold text-white">{election.eligibleVoters?.toLocaleString() || "0"}</div></div>
              <div><div className="text-[11px] text-[rgba(255,255,255,0.3)] uppercase">Votes</div><div className="text-[16px] font-bold text-white">{election.totalVotes?.toLocaleString() || "0"}</div></div>
              <div><div className="text-[11px] text-[rgba(255,255,255,0.3)] uppercase">Turnout</div><div className="text-[16px] font-bold text-white">{election.turnout || 0}%</div></div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link href={"/dashboard/elections/" + (election._id || election.id)} className="p-2 rounded-lg text-[rgba(255,255,255,0.25)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><Eye className="w-4 h-4" /></Link>
              <div className="flex-1" />
              {election.status === "draft" && <button onClick={() => handlePublish(election)} className="px-3 py-[6px] rounded-lg bg-[rgba(79,255,176,0.08)] text-[#4fffb0] text-[11px] font-semibold hover:bg-[rgba(79,255,176,0.12)] transition-all flex items-center gap-1"><Play className="w-3 h-3" /> Publish</button>}
              {election.status === "live" && <button onClick={() => handleEnd(election)} className="px-3 py-[6px] rounded-lg bg-[rgba(245,158,11,0.08)] text-[#f59e0b] text-[11px] font-semibold hover:bg-[rgba(245,158,11,0.12)] transition-all flex items-center gap-1"><Pause className="w-3 h-3" /> End</button>}
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 z-[300] animate-[fadeSlideUp_0.3s_ease]">
          <div className={"flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border " + (toast.type === "success" ? "bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]" : "bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.2)]")}>
            <CheckCircle2 className="w-5 h-5 text-[#4fffb0]" />
            <span className="text-[13px] font-medium text-white">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function handlePublish(election: any) {
  const { elections } = require("@/lib/api/client");
  elections.update(election._id || election.id, { status: "live" }).then(() => window.location.reload()).catch(() => {});
}

function handleEnd(election: any) {
  const { elections } = require("@/lib/api/client");
  elections.update(election._id || election.id, { status: "ended" }).then(() => window.location.reload()).catch(() => {});
}
