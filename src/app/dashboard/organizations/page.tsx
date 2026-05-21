"use client";

import { useState, useEffect } from "react";
import { Building2, Plus, Search, Users, Vote, Globe, Edit, Trash2, ChevronRight, Mail, Phone, MapPin, CheckCircle2, XCircle } from "lucide-react";

export default function OrganizationsPage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const showToast = (m: string, t: string = "success") => {
    setToast({ m, t });
    setTimeout(() => setToast(null), 3000);
  };

  const [orgs] = useState([
    { id: "1", name: "Riverdale University", type: "Education", members: 12450, elections: 24, plan: "Professional", status: "active", contact: "admin@riverdale.edu", location: "New York, USA" },
    { id: "2", name: "TechScale Inc.", type: "Corporate", members: 3200, elections: 8, plan: "Enterprise", status: "active", contact: "hr@techscale.com", location: "San Francisco, USA" },
    { id: "3", name: "City of Lyon", type: "Government", members: 89000, elections: 3, plan: "Enterprise", status: "active", contact: "elections@lyon.fr", location: "Lyon, France" },
    { id: "4", name: "National Student Union Ghana", type: "Non-Profit", members: 87000, elections: 2, plan: "Professional", status: "active", contact: "info@nsug.org", location: "Accra, Ghana" },
  ]);

  const stats = [
    { label: "Total Organizations", value: "4", icon: Building2, color: "#4fffb0" },
    { label: "Total Members", value: "191,650", icon: Users, color: "#00d4ff" },
    { label: "Active Elections", value: "3", icon: Vote, color: "#f59e0b" },
    { label: "Countries", value: "4", icon: Globe, color: "#a78bfa" },
  ];

  if (!mounted) {
    return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Organizations</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Manage multi-tenant organization accounts</p>
        </div>
        <button onClick={() => showToast("Add organization feature coming soon", "success")} className="flex items-center gap-2 px-5 py-[11px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold hover:opacity-90 transition-all">
          <Plus className="w-4 h-4" /> Add Organization
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: s.color + "15" }}><s.icon className="w-[18px] h-[18px]" style={{ color: s.color }} /></div>
            <div className="text-[28px] font-extrabold text-white">{s.value}</div>
            <div className="text-[11px] font-medium text-[rgba(255,255,255,0.3)] uppercase tracking-[0.06em] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orgs.map((org) => (
          <div key={org.id} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 hover:border-[rgba(255,255,255,0.1)] transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4fffb0]/20 to-[#00d4ff]/20 flex items-center justify-center text-xl font-bold text-[#4fffb0]">{org.name[0]}</div>
                <div>
                  <h3 className="text-[16px] font-bold text-white">{org.name}</h3>
                  <p className="text-[12px] text-[rgba(255,255,255,0.3)]">{org.type} · {org.location}</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-[rgba(79,255,176,0.1)] text-[#4fffb0]">{org.plan}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4 p-3 rounded-xl bg-[rgba(255,255,255,0.01)]">
              {[
                { icon: Users, label: "Members", value: org.members.toLocaleString() },
                { icon: Vote, label: "Elections", value: org.elections },
                { icon: Globe, label: "Status", value: org.status, isStatus: true },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <item.icon className="w-4 h-4 text-[rgba(255,255,255,0.25)] mx-auto mb-1" />
                  <div className="text-[16px] font-bold text-white">{item.isStatus ? <CheckCircle2 className="w-4 h-4 text-[#4fffb0] mx-auto" /> : item.value}</div>
                  <div className="text-[10px] text-[rgba(255,255,255,0.3)] uppercase">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[rgba(255,255,255,0.3)] mb-4">
              <Mail className="w-3 h-3" /> {org.contact}
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><Edit className="w-4 h-4" /></button>
              <button className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.05)] transition-all"><Trash2 className="w-4 h-4" /></button>
              <div className="flex-1" />
              <button className="px-3 py-[6px] rounded-lg bg-[rgba(79,255,176,0.05)] text-[#4fffb0] text-[11px] font-semibold hover:bg-[rgba(79,255,176,0.1)] transition-all flex items-center gap-1">Manage <ChevronRight className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
      </div>

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