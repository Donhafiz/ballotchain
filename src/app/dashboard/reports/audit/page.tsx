"use client";

import { useState, useEffect } from "react";
import { FileText, Search, Filter, Download, Eye, Shield, CheckCircle2, Clock, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";

export default function AuditReportsPage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  useEffect(() => { setMounted(true); }, []);
  const showToast = (m: string) => { setToast({ message: m, type: "success" }); setTimeout(() => setToast(null), 3000); };

  const logs = Array.from({length: 20}, (_, i) => ({
    id: String(i + 1),
    event: ["vote.cast","election.created","user.login","voter.imported","settings.updated","report.generated","user.suspended","api.key_created","election.ended","webhook.triggered"][i % 10],
    user: ["Admin User","Sarah Johnson","System","Marcus Chen","API Service"][i % 5],
    detail: ["Voted in Student Council 2026","Created Faculty Senate election","Logged in from 192.168.1.1","Imported 142 voters via CSV","Updated security settings","Generated turnout report","Suspended user Emily Davis","Created API key for integration","Ended Homecoming Court 2025","Triggered vote.cast webhook"][i % 10],
    ip: `203.0.113.${i + 10}`,
    time: `${Math.floor(Math.random() * 24)}h ago`,
    status: i % 7 === 0 ? "flagged" : "verified",
  }));

  if (!mounted) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Audit Reports</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Complete system activity trail</p>
        </div>
        <button onClick={() => showToast("Audit log exported")} className="flex items-center gap-2 px-4 py-[10px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[12px] font-bold hover:opacity-90 transition-all"><Download className="w-4 h-4" /> Export CSV</button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.2)]" />
          <input placeholder="Search audit logs..." className="w-full pl-11 pr-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[13px] outline-none placeholder:text-[rgba(255,255,255,0.15)] focus:border-[rgba(79,255,176,0.3)] transition-all" />
        </div>
        <button className="px-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[12px] font-medium text-[rgba(255,255,255,0.4)] hover:text-white transition-all flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</button>
      </div>

      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.05)]">
                <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Event</th>
                <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">User</th>
                <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Detail</th>
                <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">IP</th>
                <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Time</th>
                <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                  <td className="p-4"><span className="text-[12px] font-mono font-semibold text-[#4fffb0]">{log.event}</span></td>
                  <td className="p-4 text-[12px] text-[rgba(255,255,255,0.5)]">{log.user}</td>
                  <td className="p-4 text-[12px] text-[rgba(255,255,255,0.4)] max-w-[300px] truncate">{log.detail}</td>
                  <td className="p-4 text-[12px] text-[rgba(255,255,255,0.3)] font-mono">{log.ip}</td>
                  <td className="p-4 text-[12px] text-[rgba(255,255,255,0.3)]">{log.time}</td>
                  <td className="p-4">
                    <span className={"inline-flex items-center gap-1 px-2 py-[3px] rounded-full text-[10px] font-bold " + (log.status === "verified" ? "bg-[rgba(79,255,176,0.08)] text-[#4fffb0]" : "bg-[rgba(245,158,11,0.08)] text-[#f59e0b]")}>
                      {log.status === "verified" ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t border-[rgba(255,255,255,0.04)]">
          <span className="text-[11px] text-[rgba(255,255,255,0.2)]">Showing 1-20 of 847 entries</span>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-white transition-all"><ChevronLeft className="w-4 h-4" /></button>
            {[1,2,3].map(p => <button key={p} className={"w-8 h-8 rounded-lg text-[12px] font-semibold transition-all " + (p === 1 ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "text-[rgba(255,255,255,0.3)] hover:text-white")}>{p}</button>)}
            <button className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-white transition-all"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {toast && <div className="fixed bottom-8 right-8 z-[300] animate-[fadeSlideUp_0.3s_ease]"><div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]"><CheckCircle2 className="w-5 h-5 text-[#4fffb0]" /><span className="text-[13px] font-medium text-white">{toast.message}</span></div></div>}
    </div>
  );
}