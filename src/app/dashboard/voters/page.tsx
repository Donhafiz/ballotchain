"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Users, Search, Upload, Mail, Trash2, CheckCircle2, XCircle, Clock, UserPlus, RefreshCw, AlertTriangle, Filter, Sparkles, ChevronRight } from "lucide-react";`nimport { PageSkeleton } from "@/components/shared/Skeletons";;

export default function VotersPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterElection, setFilterElection] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showImport, setShowImport] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState("");
  const [selectedVoters, setSelectedVoters] = useState<string[]>([]);
  const [voters, setVoters] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); loadVoters(); }, []);

  const loadVoters = () => {
    fetch("/api/voters").then(r => r.json()).then(data => setVoters(data.voters || [])).catch(() => {
      setVoters([
        { id: "1", name: "Alice Johnson", email: "alice@student.edu", election: "Student Council 2026", status: "voted", verified: true },
        { id: "2", name: "Bob Smith", email: "bob@student.edu", election: "Student Council 2026", status: "pending", verified: false },
        { id: "3", name: "Carol Williams", email: "carol@faculty.edu", election: "Faculty Senate", status: "voted", verified: true },
        { id: "4", name: "David Brown", email: "david@student.edu", election: "Empire 1 Awards", status: "not_voted", verified: true },
        { id: "5", name: "Eva Martinez", email: "eva@faculty.edu", election: "Empire 1 Awards", status: "pending", verified: false },
      ]);
    });
  };

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 3000); };

  const filtered = voters.filter(v => {
    const ms = v.name?.toLowerCase().includes(searchQuery.toLowerCase()) || v.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const me = filterElection === "all" || v.election === filterElection;
    const mst = filterStatus === "all" || v.status === filterStatus;
    return ms && me && mst;
  });

  const elections = [...new Set(voters.map(v => v.election).filter(Boolean))];

  if (!mounted) return <PageSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10"><Sparkles className="h-6 w-6 text-emerald-300" /></div>
          <div><h1 className="text-[28px] font-black tracking-[-0.03em]">Voters</h1><p className="text-[13px] text-white/35 mt-1">{voters.length} registered voters</p></div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowImport(true)} className="flex items-center gap-2 px-4 py-[10px] rounded-xl bg-white/[0.03] border border-white/5 text-[13px] font-bold text-white/40 hover:text-white hover:border-white/10 transition-all"><Upload className="w-4 h-4" /> Import CSV</button>
          <input ref={fileInputRef} type="file" accept=".csv" className="hidden" />
          <button onClick={() => setShowAddModal(true)} className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 p-[1px]">
            <div className="flex items-center gap-2 rounded-xl bg-[#030303] px-4 py-[10px] text-[13px] font-black text-white transition-all duration-300 group-hover:bg-transparent group-hover:text-black"><UserPlus className="w-4 h-4" /> Add Voter</div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[{l:"Total",v:voters.length,c:"#10b981"},{l:"Voted",v:voters.filter(v=>v.status==="voted").length,c:"#06b6d4"},{l:"Pending",v:voters.filter(v=>v.status==="pending").length,c:"#f59e0b"},{l:"Not Voted",v:voters.filter(v=>v.status==="not_voted").length,c:"#8b5cf6"}].map((s,i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"><div className="text-2xl font-black" style={{color:s.c}}>{s.v}</div><div className="text-[11px] font-black text-white/25 uppercase mt-1">{s.l}</div></div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-md"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/15" /><input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search voters..." className="w-full pl-11 pr-4 py-[11px] rounded-xl bg-white/[0.03] border border-white/5 text-white text-[13px] outline-none focus:border-emerald-400/20 transition-all placeholder:text-white/10" /></div>
        <select value={filterElection} onChange={e => setFilterElection(e.target.value)} className="px-4 py-[11px] rounded-xl bg-white/[0.03] border border-white/5 text-white text-[12px] outline-none cursor-pointer"><option value="all">All Elections</option>{elections.map(e => <option key={e} value={e}>{e}</option>)}</select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-[11px] rounded-xl bg-white/[0.03] border border-white/5 text-white text-[12px] outline-none cursor-pointer"><option value="all">All Status</option><option value="voted">Voted</option><option value="pending">Pending</option><option value="not_voted">Not Voted</option></select>
      </div>

      <div className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/5"><th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Voter</th><th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Election</th><th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Status</th><th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Verified</th><th className="text-right p-4 text-[10px] font-black text-white/15 uppercase">Actions</th></tr></thead>
            <tbody>
              {filtered.map((voter, i) => (
                <motion.tr key={voter.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                  <td className="p-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-300/20 to-cyan-300/10 flex items-center justify-center text-xs font-bold text-emerald-300">{voter.name?.split(" ").map((n:string) => n[0]).join("")}</div><div><div className="text-[13px] font-bold text-white">{voter.name}</div><div className="text-[11px] text-white/25">{voter.email}</div></div></div></td>
                  <td className="p-4 text-[12px] text-white/40">{voter.election}</td>
                  <td className="p-4"><span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black uppercase ${voter.status==="voted"?"bg-emerald-400/10 text-emerald-300":voter.status==="pending"?"bg-amber-400/10 text-amber-300":"bg-white/5 text-white/25"}`}>{voter.status==="not_voted"?"Not Voted":voter.status}</span></td>
                  <td className="p-4">{voter.verified ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <XCircle className="w-4 h-4 text-white/10" />}</td>
                  <td className="p-4"><div className="flex items-center justify-end gap-1"><button onClick={() => showToast("Access link resent")} className="p-2 rounded-lg text-white/15 hover:text-emerald-300 hover:bg-emerald-400/5 transition-all"><RefreshCw className="w-[14px] h-[14px]" /></button><button onClick={() => { setVoters(voters.filter(v => v.id !== voter.id)); showToast("Voter removed"); }} className="p-2 rounded-lg text-white/15 hover:text-red-400 hover:bg-red-400/5 transition-all"><Trash2 className="w-[14px] h-[14px]" /></button></div></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {toast && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300]"><div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl bg-[#0a0a0a] border border-emerald-400/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"><CheckCircle2 className="w-5 h-5 text-emerald-300" /><span className="text-[13px] font-bold text-white">{toast}</span></div></div>}
    </div>
  );
}
