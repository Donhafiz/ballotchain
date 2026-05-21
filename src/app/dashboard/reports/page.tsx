"use client";

import { useState, useEffect } from "react";
import { 
  FileText, Download, Eye, BarChart3, TrendingUp, Calendar,
  Filter, Search, ChevronRight, CheckCircle2, Clock, Shield,
  Users, Vote, Activity, Printer, Share2, MoreHorizontal
} from "lucide-react";

export default function ReportsPage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [generating, setGenerating] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const showToast = (message: string, type: string = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const generateReport = (type: string) => {
    setGenerating(type);
    setTimeout(() => {
      setGenerating(null);
      showToast(`${type} report generated successfully!`, "success");
    }, 2000);
  };

  const reportTypes = [
    { id: "turnout", title: "Voter Turnout Report", desc: "Detailed breakdown of voter participation by demographic, precinct, and time", icon: Users, color: "#4fffb0", format: "PDF, CSV, JSON" },
    { id: "results", title: "Election Results Summary", desc: "Final certified results with cryptographic verification hashes", icon: Vote, color: "#00d4ff", format: "PDF, CSV" },
    { id: "audit", title: "Full Audit Trail", desc: "Complete log of all system actions, blockchain anchors, and verification records", icon: Shield, color: "#a78bfa", format: "PDF, JSON" },
    { id: "analytics", title: "Engagement Analytics", desc: "Voter engagement metrics, session durations, and drop-off analysis", icon: TrendingUp, color: "#f59e0b", format: "PDF, CSV" },
    { id: "security", title: "Security Incident Log", desc: "All security events, failed attempts, and mitigation actions taken", icon: Activity, color: "#EF4444", format: "PDF, CSV" },
    { id: "compliance", title: "Legal Compliance Package", desc: "Jurisdiction-specific reports for election law compliance (40+ countries)", icon: FileText, color: "#22C55E", format: "PDF" },
  ];

  const recentReports = [
    { name: "Turnout_Report_May2026.pdf", type: "Voter Turnout", size: "2.4 MB", date: "May 19, 2026", status: "ready" },
    { name: "Results_StudentCouncil_2026.pdf", type: "Election Results", size: "1.8 MB", date: "May 18, 2026", status: "ready" },
    { name: "Audit_Trail_May_Week3.json", type: "Audit Trail", size: "8.1 MB", date: "May 17, 2026", status: "ready" },
    { name: "Compliance_EU_GDPR_Q2.pdf", type: "Compliance", size: "3.2 MB", date: "May 15, 2026", status: "ready" },
  ];

  const scheduledReports = [
    { name: "Weekly Turnout Summary", schedule: "Every Monday 08:00", next: "May 25, 2026", format: "PDF", active: true },
    { name: "Monthly Audit Report", schedule: "1st of month 00:00", next: "Jun 1, 2026", format: "JSON", active: true },
  ];

  if (!mounted) {
    return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Reports</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Generate and manage election reports</p>
        </div>
      </div>

      {/* Generate Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report) => (
          <div key={report.id} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 hover:border-[rgba(255,255,255,0.1)] transition-all group">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: report.color + "15" }}>
              <report.icon className="w-5 h-5" style={{ color: report.color }} />
            </div>
            <h3 className="text-[15px] font-bold text-white mb-2">{report.title}</h3>
            <p className="text-[12px] text-[rgba(255,255,255,0.35)] leading-relaxed mb-4">{report.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[rgba(255,255,255,0.2)] uppercase tracking-[0.06em]">{report.format}</span>
              <button
                onClick={() => generateReport(report.title)}
                disabled={generating === report.title}
                className="px-4 py-[8px] rounded-lg bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[11px] font-bold hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {generating === report.title ? (
                  <><span className="w-3.5 h-3.5 border-2 border-[#0b0c0f] border-t-transparent rounded-full animate-spin" /> Generating...</>
                ) : (
                  <><Download className="w-3.5 h-3.5" /> Generate</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scheduled Reports */}
      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
        <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-[#4fffb0]" /> Scheduled Reports</h3>
        <div className="space-y-2">
          {scheduledReports.map((report, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[rgba(255,255,255,0.01)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[rgba(79,255,176,0.08)] flex items-center justify-center"><Clock className="w-4 h-4 text-[#4fffb0]" /></div>
                <div>
                  <div className="text-[13px] font-semibold text-white">{report.name}</div>
                  <div className="text-[11px] text-[rgba(255,255,255,0.3)]">{report.schedule} · Next: {report.next}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[rgba(255,255,255,0.3)] font-mono">{report.format}</span>
                <div className={"w-10 h-6 rounded-full transition-all relative cursor-pointer " + (report.active ? "bg-[#4fffb0]" : "bg-[rgba(255,255,255,0.1)]")}>
                  <div className={"absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all shadow-sm " + (report.active ? "right-0.5" : "left-0.5")} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[rgba(255,255,255,0.04)]">
          <h3 className="text-[15px] font-bold text-white">Recent Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.04)]">
                <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Report</th>
                <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Type</th>
                <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Size</th>
                <th className="text-left p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Date</th>
                <th className="text-right p-4 text-[10px] font-bold text-[rgba(255,255,255,0.2)] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report, i) => (
                <tr key={i} className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#4fffb0]" />
                      <span className="text-[13px] font-medium text-white">{report.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[12px] text-[rgba(255,255,255,0.4)]">{report.type}</td>
                  <td className="p-4 text-[12px] text-[rgba(255,255,255,0.4)]">{report.size}</td>
                  <td className="p-4 text-[12px] text-[rgba(255,255,255,0.4)]">{report.date}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => showToast("Downloading...", "success")} className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-[#4fffb0] hover:bg-[rgba(79,255,176,0.05)] transition-all"><Download className="w-4 h-4" /></button>
                      <button className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><Share2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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