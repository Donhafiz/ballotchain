"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Vote, Shield, AlertTriangle, CheckCircle2, Ban, Sparkles } from "lucide-react";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const [toast, setToast] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [elections, setElections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetch("/api/voters").then(r => r.json()).then(d => setUsers(d.voters || [])).catch(() => {});
    fetch("/api/elections").then(r => r.json()).then(d => setElections(d.elections || [])).catch(() => {});
    setLoading(false);
  }, []);

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 3000); };

  if (!mounted || loading) return <div className="p-8 text-white/40">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10"><Sparkles className="h-6 w-6 text-emerald-300" /></div>
        <div><h1 className="text-[28px] font-black tracking-[-0.03em]">Admin Panel</h1><p className="text-[13px] text-white/35 mt-1">Manage users and elections</p></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[{l:"Total Users",v:users.length,i:Users,c:"#10b981"},{l:"Elections",v:elections.length,i:Vote,c:"#06b6d4"},{l:"Live",v:elections.filter(e=>e.status==="live").length,i:Shield,c:"#f59e0b"},{l:"Alerts",v:"0",i:AlertTriangle,c:"#8b5cf6"}].map((s,i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"><s.i className="w-5 h-5 mb-3" style={{color:s.c}} /><div className="text-2xl font-black">{s.v}</div><div className="text-[11px] font-black text-white/25 uppercase mt-1">{s.l}</div></div>
        ))}
      </div>

      <div className="flex gap-1 bg-white/[0.02] border border-white/5 rounded-2xl p-1.5">
        {[{id:"users",label:"Users",icon:Users},{id:"elections",label:"Elections",icon:Vote}].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-[9px] rounded-xl text-[13px] font-bold transition-all ${activeTab===tab.id?"bg-emerald-400/10 text-emerald-300":"text-white/25 hover:text-white"}`}><tab.icon className="w-4 h-4" />{tab.label}</button>
        ))}
      </div>

      {activeTab === "users" && (
        <div className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden backdrop-blur-xl">
          <table className="w-full">
            <thead><tr className="border-b border-white/5"><th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">User</th><th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Status</th><th className="text-right p-4 text-[10px] font-black text-white/15 uppercase">Actions</th></tr></thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id || user._id} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                  <td className="p-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-300/20 to-cyan-300/10 flex items-center justify-center text-xs font-bold text-emerald-300">{user.name?.charAt(0) || "?"}</div><div><div className="text-[13px] font-bold text-white">{user.name || user.email}</div><div className="text-[11px] text-white/25">{user.email}</div></div></div></td>
                  <td className="p-4"><span className="px-2 py-1 rounded-full text-[10px] font-black bg-emerald-400/10 text-emerald-300">Active</span></td>
                  <td className="p-4"><div className="flex items-center justify-end gap-1"><button onClick={()=>showToast("User suspended")} className="p-2 rounded-lg text-white/15 hover:text-amber-300 transition-all"><Ban className="w-4 h-4" /></button></div></td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan={3} className="p-12 text-center text-white/20">No users found</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "elections" && (
        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl">
          <div className="space-y-3">
            {elections.map(e => (
              <div key={e._id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.01]">
                <div><div className="font-bold">{e.title}</div><div className="text-xs text-white/25">{e.status} · {e.totalVotes || 0} votes</div></div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-black ${e.status==="live"?"bg-emerald-400/10 text-emerald-300":"bg-white/5 text-white/25"}`}>{e.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {toast && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300]"><div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl bg-[#0a0a0a] border border-emerald-400/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"><CheckCircle2 className="w-5 h-5 text-emerald-300" /><span className="text-[13px] font-bold text-white">{toast}</span></div></div>}
    </div>
  );
}
