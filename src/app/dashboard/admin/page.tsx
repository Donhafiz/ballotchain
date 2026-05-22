"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Vote, Shield, AlertTriangle, CheckCircle2, XCircle, Ban, RefreshCw, Sparkles, Eye , Activity} from "lucide-react";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const [toast, setToast] = useState("");

  useEffect(() => { setMounted(true); }, []);
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 3000); };

  const [users] = useState([
    { id: "1", name: "Admin User", email: "admin@ballotchain.io", role: "Super Admin", status: "active" },
    { id: "2", name: "Sarah Johnson", email: "sarah@university.edu", role: "Election Manager", status: "active" },
    { id: "3", name: "Marcus Chen", email: "marcus@techcorp.com", role: "Organization Admin", status: "active" },
    { id: "4", name: "Emily Davis", email: "emily@gov.org", role: "Viewer", status: "suspended" },
  ]);

  if (!mounted) return <div className="p-8 text-white/40">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10"><Sparkles className="h-6 w-6 text-emerald-300" /></div>
          <div><h1 className="text-[28px] font-black tracking-[-0.03em]">Admin Panel</h1><p className="text-[13px] text-white/35 mt-1">Manage users and elections</p></div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[{l:"Total Users",v:"1,247",i:Users,c:"#10b981"},{l:"Active Elections",v:"3",i:Vote,c:"#06b6d4"},{l:"Alerts",v:"2",i:AlertTriangle,c:"#f59e0b"},{l:"API Calls",v:"48.2K",i:Activity,c:"#8b5cf6"}].map((s,i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"><s.i className="w-5 h-5 mb-3" style={{color:s.c}} /><div className="text-2xl font-black">{s.v}</div><div className="text-[11px] font-black text-white/25 uppercase mt-1">{s.l}</div></div>
        ))}
      </div>

      <div className="flex gap-1 bg-white/[0.02] border border-white/5 rounded-2xl p-1.5">
        {[{id:"users",label:"Users",icon:Users},{id:"elections",label:"Elections",icon:Vote},{id:"security",label:"Security",icon:Shield}].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-[9px] rounded-xl text-[13px] font-bold transition-all ${activeTab===tab.id?"bg-emerald-400/10 text-emerald-300":"text-white/25 hover:text-white"}`}><tab.icon className="w-4 h-4" />{tab.label}</button>
        ))}
      </div>

      {activeTab === "users" && (
        <div className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden backdrop-blur-xl">
          <table className="w-full">
            <thead><tr className="border-b border-white/5"><th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">User</th><th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Role</th><th className="text-left p-4 text-[10px] font-black text-white/15 uppercase">Status</th><th className="text-right p-4 text-[10px] font-black text-white/15 uppercase">Actions</th></tr></thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                  <td className="p-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-300/20 to-cyan-300/10 flex items-center justify-center text-xs font-bold text-emerald-300">{user.name.split(" ").map(n=>n[0]).join("")}</div><div><div className="text-[13px] font-bold text-white">{user.name}</div><div className="text-[11px] text-white/25">{user.email}</div></div></div></td>
                  <td className="p-4 text-[12px] text-white/40">{user.role}</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${user.status==="active"?"bg-emerald-400/10 text-emerald-300":"bg-red-400/10 text-red-300"}`}>{user.status}</span></td>
                  <td className="p-4"><div className="flex items-center justify-end gap-1">{user.status==="active"?<button onClick={()=>showToast("User suspended")} className="p-2 rounded-lg text-white/15 hover:text-amber-300 transition-all"><Ban className="w-4 h-4" /></button>:<button onClick={()=>showToast("User reactivated")} className="p-2 rounded-lg text-white/15 hover:text-emerald-300 transition-all"><CheckCircle2 className="w-4 h-4" /></button>}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "security" && (
        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-400/10 flex items-center justify-center"><Shield className="w-8 h-8 text-emerald-300" /></div>
            <div><div className="text-[36px] font-black">94<span className="text-[16px] text-white/25">/100</span></div><div className="text-[14px] text-emerald-300 font-bold">Security Score — Excellent</div></div>
          </div>
          <div className="space-y-3">
            {[{t:"Multiple failed logins",d:"IP 203.0.113.42 — 12 attempts",s:"high"},{t:"API key generated",d:"Admin created key for integration",s:"info"},{t:"Unusual vote pattern",d:"Spike of 47 votes from single precinct",s:"medium"}].map((a,i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.01]"><div className={`w-2 h-2 rounded-full mt-1.5 ${a.s==="high"?"bg-red-400":a.s==="medium"?"bg-amber-400":"bg-emerald-400"}`} /><div><div className="text-[13px] font-bold text-white">{a.t}</div><div className="text-[12px] text-white/30 mt-1">{a.d}</div></div></div>
            ))}
          </div>
        </div>
      )}

      {toast && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300]"><div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl bg-[#0a0a0a] border border-emerald-400/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"><CheckCircle2 className="w-5 h-5 text-emerald-300" /><span className="text-[13px] font-bold text-white">{toast}</span></div></div>}
    </div>
  );
}
