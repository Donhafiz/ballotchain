"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, Vote, Shield, Key, Activity, FileText, 
  UserPlus, Ban, Trash2, Edit, Search, Plus,
  CheckCircle2, XCircle, Clock, AlertTriangle,
  ArrowUp, ArrowDown, Filter, MoreHorizontal,
  ChevronLeft, ChevronRight, Eye, Download
} from "lucide-react";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const showToast = (message: string, type: string = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Mock data
  const [users, setUsers] = useState([
    { id: "1", name: "Admin User", email: "admin@ballotchain.io", role: "Super Admin", status: "active", lastLogin: "2 min ago", electionsCreated: 12 },
    { id: "2", name: "Sarah Johnson", email: "sarah@university.edu", role: "Election Manager", status: "active", lastLogin: "1 hour ago", electionsCreated: 5 },
    { id: "3", name: "Marcus Chen", email: "marcus@techcorp.com", role: "Organization Admin", status: "active", lastLogin: "3 hours ago", electionsCreated: 8 },
    { id: "4", name: "Emily Davis", email: "emily@gov.org", role: "Viewer", status: "suspended", lastLogin: "2 days ago", electionsCreated: 0 },
    { id: "5", name: "James Wilson", email: "james@ngo.org", role: "Election Manager", status: "active", lastLogin: "30 min ago", electionsCreated: 3 },
    { id: "6", name: "Lisa Park", email: "lisa@studentunion.edu", role: "Viewer", status: "invited", lastLogin: "Never", electionsCreated: 0 },
  ]);

  const [elections, setElections] = useState([
    { id: "1", title: "Student Council 2026", status: "live", voters: 450, votes: 3847, turnout: 78, createdBy: "Admin User", startDate: "2026-05-15" },
    { id: "2", title: "Faculty Senate", status: "live", voters: 280, votes: 2190, turnout: 54, createdBy: "Sarah Johnson", startDate: "2026-05-18" },
    { id: "3", title: "Sports Committee", status: "scheduled", voters: 120, votes: 0, turnout: 0, createdBy: "Marcus Chen", startDate: "2026-06-01" },
    { id: "4", title: "Board of Trustees", status: "draft", voters: 35, votes: 0, turnout: 0, createdBy: "Admin User", startDate: "2026-06-15" },
  ]);

  const stats = [
    { label: "Total Users", value: "1,247", icon: Users, color: "#4fffb0" },
    { label: "Active Elections", value: "3", icon: Vote, color: "#00d4ff" },
    { label: "Security Alerts", value: "2", icon: AlertTriangle, color: "#f59e0b" },
    { label: "API Calls Today", value: "48.2K", icon: Activity, color: "#a78bfa" },
  ];

  const handleAction = (action: string, item: any) => {
    switch(action) {
      case "ban":
        setUsers(users.map(u => u.id === item.id ? { ...u, status: "suspended" } : u));
        showToast(`${item.name} has been suspended`, "warning");
        break;
      case "unban":
        setUsers(users.map(u => u.id === item.id ? { ...u, status: "active" } : u));
        showToast(`${item.name} has been reactivated`, "success");
        break;
      case "delete":
        setUsers(users.filter(u => u.id !== item.id));
        showToast(`${item.name} has been removed`, "error");
        break;
      case "role":
        const roles = ["Super Admin", "Election Manager", "Organization Admin", "Viewer"];
        const currentIdx = roles.indexOf(item.role);
        const newRole = roles[(currentIdx + 1) % roles.length];
        setUsers(users.map(u => u.id === item.id ? { ...u, role: newRole } : u));
        showToast(`${item.name} role changed to ${newRole}`, "success");
        break;
      case "publish":
        setElections(elections.map(e => e.id === item.id ? { ...e, status: "live" } : e));
        showToast(`${item.title} is now live`, "success");
        break;
      case "unpublish":
        setElections(elections.map(e => e.id === item.id ? { ...e, status: "draft" } : e));
        showToast(`${item.title} has been unpublished`, "warning");
        break;
      case "archive":
        setElections(elections.filter(e => e.id !== item.id));
        showToast(`${item.title} has been archived`, "success");
        break;
    }
    setShowModal(null);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredElections = elections.filter(e =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted) {
    return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;
  }

  const tabs = [
    { id: "users", label: "Users", icon: Users, count: users.length },
    { id: "elections", label: "Elections", icon: Vote, count: elections.length },
    { id: "security", label: "Security", icon: Shield, count: 2 },
    { id: "audit", label: "Audit Log", icon: FileText, count: 847 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Admin Panel</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Manage users, elections, and system settings</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[13px] font-medium text-[rgba(255,255,255,0.5)] hover:text-white transition-all">
            <Download className="w-4 h-4" /> Export Logs
          </button>
          <button onClick={() => showToast("Invite sent successfully", "success")} className="flex items-center gap-2 px-4 py-[10px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold hover:opacity-90 transition-all">
            <UserPlus className="w-4 h-4" /> Invite Admin
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: stat.color + "15" }}>
                <stat.icon className="w-[18px] h-[18px]" style={{ color: stat.color }} />
              </div>
            </div>
            <div className="text-[28px] font-extrabold text-white tracking-[-0.03em]">{stat.value}</div>
            <div className="text-[11px] font-medium text-[rgba(255,255,255,0.3)] uppercase tracking-[0.06em] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSearchQuery(""); }}
            className={"flex items-center gap-2 px-4 py-[9px] rounded-xl text-[13px] font-semibold transition-all " + (activeTab === tab.id ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "text-[rgba(255,255,255,0.35)] hover:text-white")}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            <span className="text-[10px] opacity-50">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.2)]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-11 pr-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[13px] outline-none placeholder:text-[rgba(255,255,255,0.15)] focus:border-[rgba(79,255,176,0.3)] transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[12px] font-medium text-[rgba(255,255,255,0.4)] hover:text-white transition-all">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Users Table */}
      {activeTab === "users" && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase tracking-[0.1em]">User</th>
                  <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase tracking-[0.1em]">Role</th>
                  <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase tracking-[0.1em]">Status</th>
                  <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase tracking-[0.1em]">Last Login</th>
                  <th className="text-right p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase tracking-[0.1em]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#4fffb0]/20 to-[#00d4ff]/20 flex items-center justify-center text-xs font-bold text-[#4fffb0]">{user.name.split(" ").map(n => n[0]).join("")}</div>
                        <div>
                          <div className="text-[13px] font-semibold text-white">{user.name}</div>
                          <div className="text-[11px] text-[rgba(255,255,255,0.3)]">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-[12px] text-[rgba(255,255,255,0.5)]">{user.role}</span>
                    </td>
                    <td className="p-4">
                      <span className={"inline-flex items-center gap-[5px] px-2 py-[3px] rounded-full text-[10px] font-bold uppercase tracking-[0.04em] " + (user.status === "active" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : user.status === "suspended" ? "bg-[rgba(239,68,68,0.1)] text-[#EF4444]" : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.3)]")}>
                        <span className={"w-[5px] h-[5px] rounded-full " + (user.status === "active" ? "bg-[#4fffb0]" : user.status === "suspended" ? "bg-[#EF4444]" : "bg-[rgba(255,255,255,0.3)]")} />
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-[12px] text-[rgba(255,255,255,0.3)]">{user.lastLogin}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleAction("role", user)} className="p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all" title="Change role">
                          <Edit className="w-[14px] h-[14px]" />
                        </button>
                        {user.status === "active" ? (
                          <button onClick={() => handleAction("ban", user)} className="p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-[#f59e0b] hover:bg-[rgba(245,158,11,0.08)] transition-all" title="Suspend">
                            <Ban className="w-[14px] h-[14px]" />
                          </button>
                        ) : (
                          <button onClick={() => handleAction("unban", user)} className="p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-[#4fffb0] hover:bg-[rgba(79,255,176,0.08)] transition-all" title="Reactivate">
                            <CheckCircle2 className="w-[14px] h-[14px]" />
                          </button>
                        )}
                        <button onClick={() => handleAction("delete", user)} className="p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.08)] transition-all" title="Remove">
                          <Trash2 className="w-[14px] h-[14px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between p-4 border-t border-[rgba(255,255,255,0.04)]">
            <span className="text-[11px] text-[rgba(255,255,255,0.2)]">Showing {filteredUsers.length} of {users.length} users</span>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-[12px] text-white font-semibold">1</span>
              <button className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      )}

      {/* Elections Table */}
      {activeTab === "elections" && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Election</th>
                  <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Status</th>
                  <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Voters</th>
                  <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Turnout</th>
                  <th className="text-right p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredElections.map((election) => (
                  <tr key={election.id} className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[10px] bg-[rgba(79,255,176,0.08)] flex items-center justify-center"><Vote className="w-4 h-4 text-[#4fffb0]" /></div>
                        <div>
                          <div className="text-[13px] font-semibold text-white">{election.title}</div>
                          <div className="text-[11px] text-[rgba(255,255,255,0.3)]">by {election.createdBy}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={"inline-flex items-center gap-[5px] px-2 py-[3px] rounded-full text-[10px] font-bold uppercase " + (election.status === "live" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : election.status === "scheduled" ? "bg-[rgba(245,158,11,0.1)] text-[#f59e0b]" : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.3)]")}>
                        <span className={"w-[5px] h-[5px] rounded-full " + (election.status === "live" ? "bg-[#4fffb0] animate-pulse" : election.status === "scheduled" ? "bg-[#f59e0b]" : "bg-[rgba(255,255,255,0.3)]")} />
                        {election.status}
                      </span>
                    </td>
                    <td className="p-4 text-[12px] text-[rgba(255,255,255,0.5)]">{election.voters.toLocaleString()}</td>
                    <td className="p-4">
                      {election.turnout > 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-[4px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] rounded-full" style={{ width: election.turnout + "%" }} />
                          </div>
                          <span className="text-[11px] font-semibold text-[rgba(255,255,255,0.4)]">{election.turnout}%</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[rgba(255,255,255,0.2)]">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        {election.status === "live" ? (
                          <button onClick={() => handleAction("unpublish", election)} className="px-3 py-[6px] rounded-lg text-[11px] font-semibold text-[#f59e0b] hover:bg-[rgba(245,158,11,0.08)] transition-all">Unpublish</button>
                        ) : election.status !== "draft" ? (
                          <button onClick={() => handleAction("publish", election)} className="px-3 py-[6px] rounded-lg text-[11px] font-semibold text-[#4fffb0] hover:bg-[rgba(79,255,176,0.08)] transition-all">Publish</button>
                        ) : null}
                        <button onClick={() => handleAction("archive", election)} className="p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.08)] transition-all"><Trash2 className="w-[14px] h-[14px]" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[rgba(245,158,11,0.1)] flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-[#f59e0b]" /></div>
            <div>
              <h3 className="text-[15px] font-bold text-white">Security Alerts</h3>
              <p className="text-[12px] text-[rgba(255,255,255,0.3)]">2 active alerts requiring attention</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { title: "Multiple failed login attempts", detail: "IP 192.168.1.100 — 8 attempts in 5 minutes", severity: "high", time: "10 min ago" },
              { title: "Unusual API access pattern", detail: "Endpoint /api/elections hit 500x above normal rate", severity: "medium", time: "1 hour ago" },
            ].map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                <div className={"w-2 h-2 rounded-full mt-2 shrink-0 " + (alert.severity === "high" ? "bg-[#EF4444]" : "bg-[#f59e0b]")} />
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-white">{alert.title}</div>
                  <div className="text-[12px] text-[rgba(255,255,255,0.35)] mt-1">{alert.detail}</div>
                </div>
                <span className="text-[10px] text-[rgba(255,255,255,0.2)]">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Log Tab */}
      {activeTab === "audit" && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 text-center">
          <FileText className="w-12 h-12 text-[rgba(255,255,255,0.1)] mx-auto mb-4" />
          <h3 className="text-[15px] font-bold text-white mb-2">Audit Log</h3>
          <p className="text-[13px] text-[rgba(255,255,255,0.3)] mb-4">847 events recorded in the last 30 days</p>
          <button className="px-5 py-[10px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold hover:opacity-90 transition-all">
            <Download className="w-4 h-4 inline mr-2" /> Export Full Log
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[300] animate-[fadeSlideUp_0.3s_ease]">
          <div className={"flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border " + (toast.type === "success" ? "bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]" : toast.type === "warning" ? "bg-[rgba(245,158,11,0.08)] border-[rgba(245,158,11,0.2)]" : "bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.2)]")}>
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5 text-[#4fffb0]" /> : toast.type === "warning" ? <AlertTriangle className="w-5 h-5 text-[#f59e0b]" /> : <XCircle className="w-5 h-5 text-[#EF4444]" />}
            <span className="text-[13px] font-medium text-white">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}