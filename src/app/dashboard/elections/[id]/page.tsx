"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Vote, Users, BarChart3, Clock, Calendar, Globe, 
  Edit, Play, Pause, Trash2, Copy, Share2, Download, Eye,
  CheckCircle2, XCircle, AlertTriangle, Shield, Link2, Mail,
  ChevronRight, MoreHorizontal, RefreshCw, Zap
} from "lucide-react";

export default function ElectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      setElection(prev => ({ ...prev, votes: prev.votes + Math.floor(Math.random() * 3) }));
    }, 4000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const showToast = (m: string, t: string = "success") => {
    setToast({ message: m, type: t });
    setTimeout(() => setToast(null), 3000);
  };

  const [election, setElection] = useState({
    id: params.id || "1",
    title: "Student Council 2026",
    description: "Annual student council election for the 2026-2027 academic year. All enrolled students are eligible to vote.",
    status: "live",
    type: "Single Choice",
    visibility: "Private",
    startDate: "May 15, 2026",
    endDate: "May 22, 2026",
    timezone: "America/New_York",
    voters: 450,
    eligibleVoters: 450,
    votes: 3850,
    turnout: 78.4,
    positions: 1,
    candidates: 3,
    createdBy: "Admin User",
    createdAt: "May 10, 2026",
    accessLink: "https://vote.ballotchain.io/e/stuco2026",
    blockchainHash: "0x7a3b...8f2c",
  });

  const [candidates] = useState([
    { name: "Maya Okonkwo", party: "Student Action", votes: 2026, percentage: 52.6, color: "#4fffb0", platform: "Affordable housing, mental health services, sustainable campus" },
    { name: "James Whitfield", party: "Progressive Union", votes: 1419, percentage: 36.9, color: "#8b5cf6", platform: "Tech innovation, industry partnerships, entrepreneurship hub" },
    { name: "Priya Rajan", party: "United Students", votes: 405, percentage: 10.5, color: "#f59e0b", platform: "Cultural diversity, international student support, arts funding" },
  ]);

  const [voters] = useState([
    { name: "Alice Johnson", email: "alice@student.edu", status: "voted", votedAt: "May 15, 14:32", receipt: "0xa1b2...c3d4" },
    { name: "Bob Smith", email: "bob@student.edu", status: "voted", votedAt: "May 16, 09:15", receipt: "0xe5f6...g7h8" },
    { name: "Carol Williams", email: "carol@student.edu", status: "voted", votedAt: "May 17, 11:20", receipt: "0xi9j0...k1l2" },
    { name: "David Brown", email: "david@student.edu", status: "pending", votedAt: null, receipt: null },
    { name: "Eva Martinez", email: "eva@student.edu", status: "pending", votedAt: null, receipt: null },
    { name: "Frank Lee", email: "frank@student.edu", status: "not_voted", votedAt: null, receipt: null },
  ]);

  const activity = [
    { text: "Maya Okonkwo took the lead", time: "2 min ago", type: "milestone" },
    { text: "Alice Johnson cast her vote", time: "5 min ago", type: "vote" },
    { text: "Turnout reached 75%", time: "18 min ago", type: "milestone" },
    { text: "Admin updated election settings", time: "1 hour ago", type: "admin" },
    { text: "Bob Smith verified blockchain receipt", time: "2 hours ago", type: "verify" },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "candidates", label: "Candidates", icon: Users },
    { id: "voters", label: "Voters", icon: Vote },
    { id: "activity", label: "Activity", icon: Clock },
    { id: "settings", label: "Settings", icon: Shield },
  ];

  if (!mounted) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/dashboard/elections")} className="p-2 rounded-xl text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">{election.title}</h1>
              <span className={"inline-flex items-center gap-[5px] px-3 py-[4px] rounded-full text-[10px] font-bold uppercase " + (election.status === "live" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "bg-[rgba(245,158,11,0.1)] text-[#f59e0b]")}>
                {election.status === "live" && <span className="w-[5px] h-[5px] rounded-full bg-[#4fffb0] animate-pulse" />}
                {election.status}
              </span>
            </div>
            <p className="text-[13px] text-[rgba(255,255,255,0.35)] mt-1">{election.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => showToast("Link copied!")} className="p-2 rounded-xl text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><Share2 className="w-4 h-4" /></button>
          <button onClick={() => showToast("Downloading report...")} className="p-2 rounded-xl text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><Download className="w-4 h-4" /></button>
          <button onClick={() => showToast("Edit mode coming soon")} className="p-2 rounded-xl text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><Edit className="w-4 h-4" /></button>
          {election.status === "live" ? (
            <button onClick={() => { setElection({...election, status: "ended"}); showToast("Election ended", "warning"); }} className="px-4 py-[9px] rounded-xl bg-[rgba(245,158,11,0.08)] text-[#f59e0b] text-[12px] font-semibold hover:bg-[rgba(245,158,11,0.12)] transition-all flex items-center gap-2"><Pause className="w-3.5 h-3.5" /> End Election</button>
          ) : (
            <button onClick={() => { setElection({...election, status: "live"}); showToast("Election is now live!"); }} className="px-4 py-[9px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[12px] font-bold hover:opacity-90 transition-all flex items-center gap-2"><Play className="w-3.5 h-3.5" /> Publish</button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Total Votes", value: election.votes.toLocaleString(), icon: Vote, color: "#4fffb0" },
          { label: "Turnout", value: election.turnout + "%", icon: TrendingUp, color: "#00d4ff" },
          { label: "Voters", value: `${election.votes.toLocaleString()}/${election.voters}`, icon: Users, color: "#8b5cf6" },
          { label: "Candidates", value: election.candidates, icon: Users, color: "#f59e0b" },
          { label: "Time Left", value: "3d 14h", icon: Clock, color: "#22C55E" },
        ].map((stat, i) => (
          <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              <span className="text-[10px] font-semibold text-[rgba(255,255,255,0.3)] uppercase">{stat.label}</span>
            </div>
            <div className="text-[22px] font-extrabold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Live Toggle + Auto Refresh */}
      <div className="flex items-center gap-3">
        <button onClick={() => setAutoRefresh(!autoRefresh)} className={"flex items-center gap-2 px-4 py-[9px] rounded-xl text-[12px] font-semibold transition-all " + (autoRefresh ? "bg-[rgba(79,255,176,0.08)] text-[#4fffb0]" : "bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.08)]")}>
          <RefreshCw className={"w-3.5 h-3.5 " + (autoRefresh ? "animate-spin" : "")} /> {autoRefresh ? "Live" : "Paused"}
        </button>
        <div className="flex-1" />
        <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={"flex items-center gap-2 px-4 py-[8px] rounded-lg text-[12px] font-semibold transition-all " + (activeTab === tab.id ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "text-[rgba(255,255,255,0.3)] hover:text-white")}>
              <tab.icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-[fadeSlideUp_0.3s_ease]">
          {/* Results */}
          <div className="lg:col-span-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
            <h3 className="text-[15px] font-bold text-white mb-6">Live Results</h3>
            <div className="space-y-5">
              {candidates.map((c, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: c.color + "20", color: c.color }}>{c.name.split(" ").map(n => n[0]).join("")}</div>
                      <div>
                        <div className="text-[14px] font-semibold text-white">{c.name}</div>
                        <div className="text-[11px] text-[rgba(255,255,255,0.3)]">{c.party}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[18px] font-bold text-white">{c.percentage}%</div>
                      <div className="text-[11px] text-[rgba(255,255,255,0.3)]">{c.votes.toLocaleString()} votes</div>
                    </div>
                  </div>
                  <div className="h-[8px] bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: c.percentage + "%", background: `linear-gradient(90deg, ${c.color}, ${c.color}88)` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-[rgba(79,255,176,0.03)] border border-[rgba(79,255,176,0.08)] flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#4fffb0]" />
              <div>
                <div className="text-[12px] font-semibold text-[#4fffb0]">Blockchain Verified</div>
                <div className="text-[11px] text-[rgba(255,255,255,0.3)] font-mono">Hash: {election.blockchainHash}</div>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-4">
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
              <h3 className="text-[15px] font-bold text-white mb-4">Details</h3>
              <div className="space-y-3 text-[13px]">
                {[
                  { label: "Type", value: election.type },
                  { label: "Visibility", value: election.visibility },
                  { label: "Start", value: election.startDate },
                  { label: "End", value: election.endDate },
                  { label: "Timezone", value: election.timezone },
                  { label: "Created by", value: election.createdBy },
                  { label: "Created", value: election.createdAt },
                ].map((d, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-[rgba(255,255,255,0.02)]">
                    <span className="text-[rgba(255,255,255,0.3)]">{d.label}</span>
                    <span className="text-white font-medium">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
              <h3 className="text-[15px] font-bold text-white mb-4">Access Link</h3>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-[10px] rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[11px] text-[rgba(255,255,255,0.5)] font-mono truncate">{election.accessLink}</code>
                <button onClick={() => showToast("Link copied!")} className="p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-[#4fffb0] hover:bg-[rgba(79,255,176,0.05)] transition-all"><Copy className="w-4 h-4" /></button>
              </div>
              <button onClick={() => showToast("Access links sent!")} className="w-full mt-3 py-[9px] rounded-lg bg-[rgba(79,255,176,0.06)] text-[#4fffb0] text-[12px] font-semibold hover:bg-[rgba(79,255,176,0.1)] transition-all flex items-center justify-center gap-2"><Mail className="w-3.5 h-3.5" /> Send Access Links</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "candidates" && (
        <div className="space-y-4 animate-[fadeSlideUp_0.3s_ease]">
          {candidates.map((c, i) => (
            <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold" style={{ background: c.color + "20", color: c.color }}>{c.name.split(" ").map(n => n[0]).join("")}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[16px] font-bold text-white">{c.name}</h3>
                      <p className="text-[13px] text-[rgba(255,255,255,0.35)]">{c.party}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[20px] font-bold text-white">{c.percentage}%</div>
                      <div className="text-[12px] text-[rgba(255,255,255,0.3)]">{c.votes.toLocaleString()} votes</div>
                    </div>
                  </div>
                  <div className="mt-4 h-[6px] bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: c.percentage + "%", background: `linear-gradient(90deg, ${c.color}, ${c.color}88)` }} />
                  </div>
                  <p className="mt-4 text-[13px] text-[rgba(255,255,255,0.4)] leading-relaxed">{c.platform}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "voters" && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden animate-[fadeSlideUp_0.3s_ease]">
          <table className="w-full">
            <thead><tr className="border-b border-[rgba(255,255,255,0.05)]"><th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Voter</th><th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Status</th><th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Voted At</th><th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Receipt</th><th className="text-right p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Actions</th></tr></thead>
            <tbody>
              {voters.map((v, i) => (
                <tr key={i} className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(79,255,176,0.08)] flex items-center justify-center text-xs font-bold text-[#4fffb0]">{v.name.split(" ").map(n => n[0]).join("")}</div>
                      <div>
                        <div className="text-[13px] font-semibold text-white">{v.name}</div>
                        <div className="text-[11px] text-[rgba(255,255,255,0.3)]">{v.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={"inline-flex items-center gap-1 px-2 py-[3px] rounded-full text-[10px] font-bold uppercase " + (v.status === "voted" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : v.status === "pending" ? "bg-[rgba(245,158,11,0.1)] text-[#f59e0b]" : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.3)]")}>
                      <span className={"w-[5px] h-[5px] rounded-full " + (v.status === "voted" ? "bg-[#4fffb0]" : "bg-[#f59e0b]")} />{v.status}
                    </span>
                  </td>
                  <td className="p-4 text-[12px] text-[rgba(255,255,255,0.4)]">{v.votedAt || "—"}</td>
                  <td className="p-4 text-[12px] font-mono text-[rgba(255,255,255,0.3)]">{v.receipt || "—"}</td>
                  <td className="p-4 text-right">
                    {v.receipt && <button onClick={() => showToast("Blockchain receipt verified!")} className="text-[11px] text-[#4fffb0] hover:underline font-semibold">Verify</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 animate-[fadeSlideUp_0.3s_ease]">
          <div className="space-y-1">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                <div className={"w-2 h-2 rounded-full mt-[6px] shrink-0 " + (a.type === "vote" ? "bg-[#4fffb0]" : a.type === "milestone" ? "bg-[#f59e0b]" : "bg-[#8b5cf6]")} />
                <div className="flex-1">
                  <div className="text-[13px] text-[rgba(255,255,255,0.6)]">{a.text}</div>
                  <div className="text-[11px] text-[rgba(255,255,255,0.2)] mt-1">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 animate-[fadeSlideUp_0.3s_ease]">
          <h3 className="text-[16px] font-bold text-white mb-4">Election Settings</h3>
          {[
            { label: "Require Voter Verification", desc: "Voters must verify identity before accessing ballot", value: true },
            { label: "Allow Write-In Candidates", desc: "Voters can add unlisted candidates", value: false },
            { label: "Show Live Results", desc: "Display results in real-time while election is active", value: true },
            { label: "Anonymous Voting", desc: "Ballots cannot be traced back to individual voters", value: true },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.03)]">
              <div>
                <div className="text-[14px] font-semibold text-white">{s.label}</div>
                <div className="text-[12px] text-[rgba(255,255,255,0.3)]">{s.desc}</div>
              </div>
              <div className={"w-12 h-7 rounded-full transition-all relative cursor-pointer " + (s.value ? "bg-[#4fffb0]" : "bg-[rgba(255,255,255,0.08)]")}>
                <div className={"absolute top-1 w-5 h-5 rounded-full bg-white transition-all shadow-sm " + (s.value ? "right-1" : "left-1")} />
              </div>
            </div>
          ))}
          <button onClick={() => showToast("Settings saved")} className="mt-6 px-6 py-[10px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold hover:opacity-90 transition-all">Save Settings</button>
        </div>
      )}

      {toast && <div className="fixed bottom-8 right-8 z-[300] animate-[fadeSlideUp_0.3s_ease]"><div className={"flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border " + (toast.type === "success" ? "bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]" : "bg-[rgba(245,158,11,0.08)] border-[rgba(245,158,11,0.2)]")}><CheckCircle2 className="w-5 h-5 text-[#4fffb0]" /><span className="text-[13px] font-medium text-white">{toast.message}</span></div></div>}
    </div>
  );
}