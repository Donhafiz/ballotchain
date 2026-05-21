"use client";

import { useState, useEffect } from "react";
import { Download, FileText, FileJson, Table2, CheckCircle2, Calendar, Filter } from "lucide-react";

export default function ExportReportsPage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  useEffect(() => { setMounted(true); }, []);
  const showToast = (m: string) => { setToast({ message: m, type: "success" }); setTimeout(() => setToast(null), 3000); };

  const exportOptions = [
    { icon: FileText, label: "PDF Report", desc: "Formatted document with charts and summaries", format: ".pdf", color: "#EF4444" },
    { icon: Table2, label: "CSV Export", desc: "Raw data for spreadsheet analysis", format: ".csv", color: "#22C55E" },
    { icon: FileJson, label: "JSON Export", desc: "Machine-readable format for API integration", format: ".json", color: "#f59e0b" },
  ];

  if (!mounted) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Export Reports</h1>
        <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Download election data in multiple formats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exportOptions.map((opt, i) => (
          <button key={i} onClick={() => showToast(`Exporting ${opt.label}...`)} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 text-left hover:border-[rgba(255,255,255,0.1)] transition-all group">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: opt.color + "15" }}>
              <opt.icon className="w-7 h-7" style={{ color: opt.color }} />
            </div>
            <h3 className="text-[16px] font-bold text-white mb-2">{opt.label}</h3>
            <p className="text-[13px] text-[rgba(255,255,255,0.35)] leading-relaxed mb-4">{opt.desc}</p>
            <span className="inline-flex items-center gap-2 px-4 py-[8px] rounded-lg bg-[rgba(255,255,255,0.03)] text-[12px] font-semibold text-[rgba(255,255,255,0.4)] group-hover:text-white transition-all">
              <Download className="w-3.5 h-3.5" /> Export {opt.format}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
        <h3 className="text-[15px] font-bold text-white mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-[#4fffb0]" /> Scheduled Exports</h3>
        {[
          { name: "Weekly Turnout Summary", schedule: "Every Monday", next: "May 25, 2026", format: "PDF + CSV" },
          { name: "Monthly Audit Archive", schedule: "1st of month", next: "Jun 1, 2026", format: "JSON" },
        ].map((exp, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[rgba(255,255,255,0.01)] mb-2">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-[#4fffb0]" />
              <div>
                <div className="text-[13px] font-semibold text-white">{exp.name}</div>
                <div className="text-[11px] text-[rgba(255,255,255,0.3)]">{exp.schedule} · Next: {exp.next} · {exp.format}</div>
              </div>
            </div>
            <button onClick={() => showToast("Export triggered manually")} className="px-3 py-[7px] rounded-lg bg-[rgba(79,255,176,0.05)] text-[#4fffb0] text-[11px] font-semibold hover:bg-[rgba(79,255,176,0.1)] transition-all">Run Now</button>
          </div>
        ))}
      </div>

      {toast && <div className="fixed bottom-8 right-8 z-[300] animate-[fadeSlideUp_0.3s_ease]"><div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]"><CheckCircle2 className="w-5 h-5 text-[#4fffb0]" /><span className="text-[13px] font-medium text-white">{toast.message}</span></div></div>}
    </div>
  );
}