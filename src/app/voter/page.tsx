"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getEarnedBadges, getBadgeColor, type VoterStats } from "@/lib/gamification/badges";
import { 
  Vote, Clock, CheckCircle2, Eye, ChevronRight, Shield, 
  BarChart3, Calendar, Users, Bell, LogOut, User, Home,
  Fingerprint, Lock, BadgeCheck
, Award, Medal} from "lucide-react";

export default function VoterDashboard() {
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const voter = {
    name: "Alice Johnson",
    email: "alice@student.edu",
    verified: true,
    organization: "Riverdale University",
    voterSince: "January 2026",
  };

  const activeElections = [
    { id: "1", title: "Student Council 2026", deadline: "May 22, 2026, 11:59 PM", status: "active", voted: false, turnout: 78 },
    { id: "2", title: "Faculty Senate", deadline: "May 25, 2026, 11:59 PM", status: "active", voted: true, turnout: 54 },
    { id: "3", title: "Sports Committee", deadline: "Jun 8, 2026, 11:59 PM", status: "upcoming", voted: false, turnout: 0 },
  ];

  const votingHistory = [
    { id: "v1", election: "Faculty Senate", date: "May 19, 2026", candidate: "Dr. Sarah Mitchell", receipt: "0xf1e2...d3c4" },
    { id: "v2", election: "Homecoming Court 2025", date: "Apr 10, 2025", candidate: "James Whitfield", receipt: "0xa1b2...c3d4" },
    { id: "v3", election: "Club Leadership 2024", date: "Nov 15, 2024", candidate: "Priya Rajan", receipt: "0xe5f6...g7h8" },
  ];

  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0b0c0f]">
      {/* Voter Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(11,12,15,0.8)] backdrop-blur-2xl">
        <div className="max-w-[1160px] mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/voter" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#4fffb0] to-[#00d4ff] flex items-center justify-center font-extrabold text-xs text-[#0b0c0f]">BC</div>
            <span className="text-base font-bold tracking-[-0.3px]">Ballot<span className="text-[#4fffb0]">Chain</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/voter/elections" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-[rgba(255,255,255,0.4)] hover:text-white hover:bg-[rgba(255,255,255,0.03)] transition-all no-underline">
              <Vote className="w-4 h-4" /> Elections
            </Link>
            <Link href="/voter/my-votes" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-[rgba(255,255,255,0.4)] hover:text-white hover:bg-[rgba(255,255,255,0.03)] transition-all no-underline">
              <CheckCircle2 className="w-4 h-4" /> My Votes
            </Link>
            <button className="relative p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1 right-1 w-[8px] h-[8px] rounded-full bg-[#EF4444]" />
            </button>
            <div className="flex items-center gap-3 pl-3 border-l border-[rgba(255,255,255,0.06)]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4fffb0]/20 to-[#00d4ff]/20 flex items-center justify-center text-xs font-bold text-[#4fffb0]">{voter.name.split(" ").map(n => n[0]).join("")}</div>
              <span className="hidden md:block text-[13px] font-medium text-white">{voter.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1160px] mx-auto px-6 py-8 space-y-8">
        {/* Welcome */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">{greeting}, {voter.name.split(" ")[0]} ðŸ‘‹</h1>
            <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Your secure voting dashboard</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(79,255,176,0.06)] border border-[rgba(79,255,176,0.12)]">
            <BadgeCheck className="w-4 h-4 text-[#4fffb0]" />
            <span className="text-[12px] font-semibold text-[#4fffb0]">Verified Voter</span>
          </div>
        </div>

        {/* Active Elections */}
        <div>
          <h2 className="text-[18px] font-bold text-white mb-4 flex items-center gap-2">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fffb0] opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[#4fffb0]" /></span>
            Active Elections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeElections.map((election) => (
              <div key={election.id} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 hover:border-[rgba(255,255,255,0.1)] transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center">
                      <Vote className="w-5 h-5 text-[#4fffb0]" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-white">{election.title}</h3>
                      <p className="text-[12px] text-[rgba(255,255,255,0.3)] flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> {election.deadline}
                      </p>
                    </div>
                  </div>
                  <span className={"px-2 py-1 rounded-full text-[10px] font-bold uppercase " + (election.status === "active" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.3)]")}>
                    {election.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[12px] text-[rgba(255,255,255,0.3)]">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {election.turnout}% turnout</span>
                    {election.voted && <span className="flex items-center gap-1 text-[#4fffb0]"><CheckCircle2 className="w-3.5 h-3.5" /> Voted</span>}
                  </div>
                  {election.voted ? (
                    <Link href={`/voter/my-votes/${election.id}`} className="px-4 py-[8px] rounded-lg bg-[rgba(79,255,176,0.06)] text-[#4fffb0] text-[12px] font-semibold no-underline hover:bg-[rgba(79,255,176,0.1)] transition-all flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5" /> View Receipt
                    </Link>
                  ) : election.status === "active" ? (
                    <Link href={`/voter/elections/${election.id}/vote`} className="px-5 py-[8px] rounded-lg bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[12px] font-bold no-underline hover:opacity-90 transition-all flex items-center gap-2">
                      Vote Now <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <span className="text-[12px] text-[rgba(255,255,255,0.2)]">Opens soon</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voting History + Security Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-bold text-white">Voting History</h2>
              <Link href="/voter/my-votes" className="text-[12px] font-semibold text-[#4fffb0] hover:underline no-underline">View all â†’</Link>
            </div>
            <div className="space-y-2">
              {votingHistory.map((vote) => (
                <Link key={vote.id} href={`/voter/my-votes/${vote.id}`} className="flex items-center gap-4 p-4 rounded-xl hover:bg-[rgba(255,255,255,0.02)] transition-all no-underline group">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(79,255,176,0.06)] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#4fffb0]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold text-white">{vote.election}</div>
                    <div className="text-[12px] text-[rgba(255,255,255,0.3)]">Voted for {vote.candidate} Â· {vote.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[rgba(255,255,255,0.2)] hidden sm:block">{vote.receipt}</span>
                    <ChevronRight className="w-4 h-4 text-[rgba(255,255,255,0.15)] group-hover:text-white transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>{/* Badges Section */}
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 mb-6">
            <h2 className="text-[18px] font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#f59e0b]" /> Your Badges
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {getEarnedBadges({
                totalVotes: votingHistory.length,
                consecutiveVotes: 2,
                verifiedCount: 1,
                earlyVoter: true,
                crossElectionVoter: true,
              }).map((badge) => (
                <div key={badge.id} className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${getBadgeColor(badge.rarity)} bg-opacity-5 border border-white/5`}>
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <div className="text-[13px] font-bold text-white">{badge.name}</div>
                    <div className="text-[11px] text-white/40">{badge.description}</div>
                  </div>
                </div>
              ))}
              {getEarnedBadges({
                totalVotes: votingHistory.length,
                consecutiveVotes: 2,
                verifiedCount: 1,
                earlyVoter: true,
                crossElectionVoter: true,
              }).length === 0 && (
                <p className="text-[13px] text-white/30 col-span-2 text-center py-4">Vote in elections to earn badges!</p>
              )}
            </div>
          </div>


          {/* Security Card */}
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
            <h2 className="text-[18px] font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#4fffb0]" /> Security
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(79,255,176,0.03)]">
                <Fingerprint className="w-5 h-5 text-[#4fffb0]" />
                <div>
                  <div className="text-[13px] font-semibold text-white">Identity Verified</div>
                  <div className="text-[11px] text-[rgba(255,255,255,0.3)]">Your identity has been cryptographically verified</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(79,255,176,0.03)]">
                <Lock className="w-5 h-5 text-[#4fffb0]" />
                <div>
                  <div className="text-[13px] font-semibold text-white">End-to-End Encrypted</div>
                  <div className="text-[11px] text-[rgba(255,255,255,0.3)]">Your vote is sealed with zero-knowledge encryption</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(79,255,176,0.03)]">
                <BarChart3 className="w-5 h-5 text-[#4fffb0]" />
                <div>
                  <div className="text-[13px] font-semibold text-white">Blockchain Verified</div>
                  <div className="text-[11px] text-[rgba(255,255,255,0.3)]">Every vote is immutably recorded on-chain</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}