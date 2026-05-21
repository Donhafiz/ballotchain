"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Vote, Eye, Users, TrendingUp, BarChart3, CheckCircle2, 
  Clock, Shield, User, Edit, ExternalLink, ArrowLeft,
  Award, Zap, Bell
} from "lucide-react";

export default function CandidateDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const candidate = {
    name: "Maya Okonkwo",
    party: "Student Action",
    position: "Student Body President",
    election: "Student Council 2026",
    status: "active",
    votes: 2026,
    percentage: 47.3,
    rank: 1,
    totalCandidates: 3,
  };

  const stats = [
    { label: "Current Rank", value: `#${candidate.rank} of ${candidate.totalCandidates}`, icon: Award, color: "#f59e0b" },
    { label: "Total Votes", value: candidate.votes.toLocaleString(), icon: Vote, color: "#4fffb0" },
    { label: "Vote Share", value: candidate.percentage + "%", icon: TrendingUp, color: "#00d4ff" },
    { label: "Days Remaining", value: "3", icon: Clock, color: "#a78bfa" },
  ];

  const recentActivity = [
    { text: "You received 47 new votes in the last hour", time: "1 hour ago", type: "milestone" },
    { text: "Your profile was viewed 128 times today", time: "3 hours ago", type: "info" },
    { text: "New voter demographic data available", time: "5 hours ago", type: "insight" },
  ];

  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0b0c0f]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(11,12,15,0.8)] backdrop-blur-2xl">
        <div className="max-w-[1160px] mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/home" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#4fffb0] to-[#00d4ff] flex items-center justify-center font-extrabold text-xs text-[#0b0c0f]">BC</div>
            <span className="text-base font-bold">Ballot<span className="text-[#4fffb0]">Chain</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1 right-1 w-[6px] h-[6px] rounded-full bg-[#EF4444]" />
            </button>
            <div className="flex items-center gap-3 pl-3 border-l border-[rgba(255,255,255,0.06)]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f59e0b]/20 to-[#fbbf24]/20 flex items-center justify-center text-xs font-bold text-[#f59e0b]">MO</div>
              <span className="hidden md:block text-[13px] font-medium text-white">{candidate.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1100px] mx-auto px-6 py-8 space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-[28px] font-bold text-white">Candidate Dashboard</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">{candidate.position} · {candidate.election}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: stat.color + "15" }}>
                <stat.icon className="w-[18px] h-[18px]" style={{ color: stat.color }} />
              </div>
              <div className="text-[28px] font-extrabold text-white">{stat.value}</div>
              <div className="text-[11px] font-medium text-[rgba(255,255,255,0.3)] uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vote Progress */}
          <div className="lg:col-span-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8">
            <h3 className="text-[18px] font-bold text-white mb-6">Live Vote Progress</h3>
            <div className="space-y-6">
              {[
                { name: "You (Maya Okonkwo)", votes: 2026, percentage: 47.3, color: "#f59e0b", isYou: true },
                { name: "James Whitfield", votes: 1419, percentage: 33.1, color: "#8b5cf6" },
                { name: "Priya Rajan", votes: 840, percentage: 19.6, color: "#a78bfa" },
              ].map((c, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={"text-[14px] font-semibold " + (c.isYou ? "text-[#f59e0b]" : "text-white")}>{c.name}{c.isYou ? " ⭐" : ""}</span>
                    <span className="text-[13px] font-bold text-white">{c.percentage}%</span>
                  </div>
                  <div className="h-[8px] bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: c.percentage + "%", background: c.color }} />
                  </div>
                  <div className="text-[11px] text-[rgba(255,255,255,0.3)] mt-1">{c.votes.toLocaleString()} votes</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity + Actions */}
          <div className="space-y-4">
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
              <h3 className="text-[15px] font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-2">
                    <div className={"w-2 h-2 rounded-full mt-[6px] shrink-0 " + (a.type === "milestone" ? "bg-[#f59e0b]" : "bg-[#4fffb0]")} />
                    <div>
                      <div className="text-[12px] text-[rgba(255,255,255,0.5)]">{a.text}</div>
                      <div className="text-[10px] text-[rgba(255,255,255,0.2)] mt-1">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
              <h3 className="text-[15px] font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/candidate/profile" className="flex items-center gap-3 px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.02)] text-[13px] font-medium text-[rgba(255,255,255,0.5)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all no-underline">
                  <Edit className="w-4 h-4" /> Edit Profile
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.02)] text-[13px] font-medium text-[rgba(255,255,255,0.5)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all">
                  <Eye className="w-4 h-4" /> View Public Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.02)] text-[13px] font-medium text-[rgba(255,255,255,0.5)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all">
                  <BarChart3 className="w-4 h-4" /> Detailed Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}