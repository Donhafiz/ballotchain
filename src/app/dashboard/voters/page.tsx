"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Users, Search, Plus, Download, Upload, Mail, Trash2, CheckCircle2,
  XCircle, Clock, Filter, ChevronLeft, ChevronRight, Eye, MoreHorizontal,
  UserPlus, BarChart3, Vote, Link2, Copy, RefreshCw, AlertTriangle
} from "lucide-react";

export default function VotersPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterElection, setFilterElection] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showImport, setShowImport] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [selectedVoters, setSelectedVoters] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const showToast = (message: string, type: string = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const [voters, setVoters] = useState([
    { id: "1", name: "Alice Johnson", email: "alice@student.edu", election: "Student Council 2026", status: "voted", votedAt: "2 hours ago", verified: true },
    { id: "2", name: "Bob Smith", email: "bob@student.edu", election: "Student Council 2026", status: "pending", votedAt: null, verified: false },
    { id: "3", name: "Carol Williams", email: "carol@faculty.edu", election: "Faculty Senate", status: "voted", votedAt: "30 min ago", verified: true },
    { id: "4", name: "David Brown", email: "david@student.edu", election: "Student Council 2026", status: "not_voted", votedAt: null, verified: true },
    { id: "5", name: "Eva Martinez", email: "eva@faculty.edu", election: "Faculty Senate", status: "voted", votedAt: "1 hour ago", verified: true },
    { id: "6", name: "Frank Lee", email: "frank@student.edu", election: "Sports Committee", status: "pending", votedAt: null, verified: false },
    { id: "7", name: "Grace Kim", email: "grace@student.edu", election: "Student Council 2026", status: "not_voted", votedAt: null, verified: true },
    { id: "8", name: "Henry Chen", email: "henry@faculty.edu", election: "Faculty Senate", status: "voted", votedAt: "45 min ago", verified: true },
  ]);

  const stats = [
    { label: "Total Voters", value: voters.length.toString(), icon: Users, color: "#4fffb0" },
    { label: "Voted", value: voters.filter(v => v.status === "voted").length.toString(), icon: CheckCircle2, color: "#00d4ff" },
    { label: "Pending", value: voters.filter(v => v.status === "pending").length.toString(), icon: Clock, color: "#f59e0b" },
    { label: "Not Voted", value: voters.filter(v => v.status === "not_voted").length.toString(), icon: XCircle, color: "#a78bfa" },
  ];

  const filteredVoters = voters.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesElection = filterElection === "all" || v.election === filterElection;
    const matchesStatus = filterStatus === "all" || v.status === filterStatus;
    return matchesSearch && matchesElection && matchesStatus;
  });

  const elections = [...new Set(voters.map(v => v.election))];

  const handleBulkAction = (action: string) => {
    if (selectedVoters.length === 0) { showToast("No voters selected", "warning"); return; }
    switch(action) {
      case "resend":
        showToast(`Access links resent to ${selectedVoters.length} voters`, "success");
        break;
      case "verify":
        setVoters(voters.map(v => selectedVoters.includes(v.id) ? { ...v, verified: true, status: "pending" } : v));
        showToast(`${selectedVoters.length} voters verified`, "success");
        break;
      case "delete":
        setVoters(voters.filter(v => !selectedVoters.includes(v.id)));
        showToast(`${selectedVoters.length} voters removed`, "error");
        break;
    }
    setSelectedVoters([]);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast(`Importing voters from ${file.name}...`, "success");
      setTimeout(() => {
        const newVoters = [
          { id: String(Date.now()), name: "Imported Voter 1", email: "imported1@example.com", election: "Student Council 2026", status: "pending" as const, votedAt: null, verified: false },
          { id: String(Date.now() + 1), name: "Imported Voter 2", email: "imported2@example.com", election: "Student Council 2026", status: "pending" as const, votedAt: null, verified: false },
        ];
        setVoters([...voters, ...newVoters]);
        showToast("2 voters imported successfully!", "success");
      }, 1500);
    }
    setShowImport(false);
  };

  if (!mounted) {
    return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Voters</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Manage and monitor your voter base</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowImport(true)} className="flex items-center gap-2 px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[13px] font-medium text-[rgba(255,255,255,0.5)] hover:text-white transition-all">
            <Upload className="w-4 h-4" /> Import CSV
          </button>
          <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleImport} />
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-[10px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold hover:opacity-90 transition-all">
            <UserPlus className="w-4 h-4" /> Add Voter
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.2)]" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search voters..." className="w-full pl-11 pr-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[13px] outline-none placeholder:text-[rgba(255,255,255,0.15)] focus:border-[rgba(79,255,176,0.3)] transition-all" />
        </div>
        <select value={filterElection} onChange={(e) => setFilterElection(e.target.value)} className="px-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[12px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all cursor-pointer">
          <option value="all" className="bg-[#14151a]">All Elections</option>
          {elections.map(e => <option key={e} value={e} className="bg-[#14151a]">{e}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[12px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all cursor-pointer">
          <option value="all" className="bg-[#14151a]">All Status</option>
          <option value="voted" className="bg-[#14151a]">Voted</option>
          <option value="pending" className="bg-[#14151a]">Pending</option>
          <option value="not_voted" className="bg-[#14151a]">Not Voted</option>
        </select>
        {selectedVoters.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[rgba(255,255,255,0.4)]">{selectedVoters.length} selected</span>
            <button onClick={() => handleBulkAction("resend")} className="px-3 py-[8px] rounded-lg bg-[rgba(79,255,176,0.08)] text-[#4fffb0] text-[11px] font-semibold hover:bg-[rgba(79,255,176,0.12)] transition-all flex items-center gap-1"><Mail className="w-3 h-3" /> Resend</button>
            <button onClick={() => handleBulkAction("verify")} className="px-3 py-[8px] rounded-lg bg-[rgba(0,212,255,0.08)] text-[#00d4ff] text-[11px] font-semibold hover:bg-[rgba(0,212,255,0.12)] transition-all flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Verify</button>
            <button onClick={() => handleBulkAction("delete")} className="px-3 py-[8px] rounded-lg bg-[rgba(239,68,68,0.08)] text-[#EF4444] text-[11px] font-semibold hover:bg-[rgba(239,68,68,0.12)] transition-all flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button>
          </div>
        )}
      </div>

      {/* Voters Table */}
      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.05)]">
                <th className="text-left p-4 w-10">
                  <input type="checkbox" onChange={(e) => setSelectedVoters(e.target.checked ? filteredVoters.map(v => v.id) : [])} checked={selectedVoters.length === filteredVoters.length && filteredVoters.length > 0} className="rounded border-[rgba(255,255,255,0.15)] bg-transparent cursor-pointer" />
                </th>
                <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase tracking-[0.1em]">Voter</th>
                <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase tracking-[0.1em]">Election</th>
                <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase tracking-[0.1em]">Status</th>
                <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase tracking-[0.1em]">Verified</th>
                <th className="text-right p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase tracking-[0.1em]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVoters.map((voter) => (
                <tr key={voter.id} className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                  <td className="p-4">
                    <input type="checkbox" checked={selectedVoters.includes(voter.id)} onChange={(e) => {
                      if (e.target.checked) setSelectedVoters([...selectedVoters, voter.id]);
                      else setSelectedVoters(selectedVoters.filter(id => id !== voter.id));
                    }} className="rounded border-[rgba(255,255,255,0.15)] bg-transparent cursor-pointer" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#4fffb0]/20 to-[#00d4ff]/20 flex items-center justify-center text-xs font-bold text-[#4fffb0]">{voter.name.split(" ").map(n => n[0]).join("")}</div>
                      <div>
                        <div className="text-[13px] font-semibold text-white">{voter.name}</div>
                        <div className="text-[11px] text-[rgba(255,255,255,0.3)]">{voter.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-[12px] text-[rgba(255,255,255,0.5)]">{voter.election}</td>
                  <td className="p-4">
                    <span className={"inline-flex items-center gap-[5px] px-2 py-[3px] rounded-full text-[10px] font-bold uppercase " + (voter.status === "voted" ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : voter.status === "pending" ? "bg-[rgba(245,158,11,0.1)] text-[#f59e0b]" : "bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.3)]")}>
                      <span className={"w-[5px] h-[5px] rounded-full " + (voter.status === "voted" ? "bg-[#4fffb0]" : voter.status === "pending" ? "bg-[#f59e0b]" : "bg-[rgba(255,255,255,0.3)]")} />
                      {voter.status === "not_voted" ? "Not Voted" : voter.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {voter.verified ? <CheckCircle2 className="w-4 h-4 text-[#4fffb0]" /> : <XCircle className="w-4 h-4 text-[rgba(255,255,255,0.2)]" />}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => showToast("Access link copied!", "success")} className="p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-[#4fffb0] hover:bg-[rgba(79,255,176,0.08)] transition-all" title="Copy access link"><Copy className="w-[14px] h-[14px]" /></button>
                      <button onClick={() => showToast("Access link resent!", "success")} className="p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-[#00d4ff] hover:bg-[rgba(0,212,255,0.08)] transition-all" title="Resend link"><RefreshCw className="w-[14px] h-[14px]" /></button>
                      <button onClick={() => { setVoters(voters.filter(v => v.id !== voter.id)); showToast(`${voter.name} removed`, "error"); }} className="p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.08)] transition-all" title="Remove"><Trash2 className="w-[14px] h-[14px]" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredVoters.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <Users className="w-12 h-12 text-[rgba(255,255,255,0.08)] mx-auto mb-3" />
                    <p className="text-[14px] text-[rgba(255,255,255,0.3)]">No voters found</p>
                    <p className="text-[12px] text-[rgba(255,255,255,0.15)] mt-1">Try adjusting your search or filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t border-[rgba(255,255,255,0.04)]">
          <span className="text-[11px] text-[rgba(255,255,255,0.2)]">Showing {filteredVoters.length} of {voters.length} voters</span>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-white transition-all"><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-[12px] text-white font-semibold">1</span>
            <button className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-white transition-all"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showImport && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center" onClick={() => setShowImport(false)}>
          <div className="w-full max-w-md bg-[#14151a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 shadow-[0_40px_120px_rgba(0,0,0,0.6)]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[18px] font-bold text-white mb-2">Import Voters</h3>
            <p className="text-[13px] text-[rgba(255,255,255,0.35)] mb-6">Upload a CSV file with voter information</p>
            <div className="border-2 border-dashed border-[rgba(255,255,255,0.08)] rounded-2xl p-10 text-center mb-6 hover:border-[rgba(79,255,176,0.3)] transition-all cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-10 h-10 text-[rgba(255,255,255,0.15)] mx-auto mb-3" />
              <p className="text-[13px] text-[rgba(255,255,255,0.4)]">Click to upload CSV</p>
              <p className="text-[11px] text-[rgba(255,255,255,0.15)] mt-1">or drag and drop</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowImport(false)} className="flex-1 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[13px] font-medium text-[rgba(255,255,255,0.5)] hover:text-white transition-all">Cancel</button>
              <button onClick={() => fileInputRef.current?.click()} className="flex-1 py-[11px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold hover:opacity-90 transition-all">Select File</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
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