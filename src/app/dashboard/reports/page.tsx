"use client";

import { FileText, TrendingUp, ShieldCheck, Users, ArrowUpRight } from "lucide-react";

const reports = [
  { title: "Voter Turnout Report", desc: "Detailed turnout statistics by department", icon: TrendingUp, stat: "78.4%", color: "from-emerald-500/20 to-blue-500/20" },
  { title: "Election Results Summary", desc: "Complete results for all elections", icon: FileText, stat: "24 elections", color: "from-blue-500/20 to-purple-500/20" },
  { title: "Security Audit Log", desc: "Authentication & access logs", icon: ShieldCheck, stat: "1,247 events", color: "from-purple-500/20 to-pink-500/20" },
  { title: "Voter Demographics", desc: "Age, department & location breakdown", icon: Users, stat: "12,847 voters", color: "from-amber-500/20 to-red-500/20" },
];

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6 p-8">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Reports & Analytics</h1>
        <p className="mt-2 text-sm text-gray-400">Comprehensive election insights and analytics</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {reports.map((report, index) => (
          <div key={index} className="card-premium card-glow cursor-pointer p-7 transition-all hover:scale-[1.02]">
            <div className="flex items-start justify-between">
              <div className={"flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br " + report.color}>
                <report.icon className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-sm font-semibold text-gray-400">{report.stat}</span>
            </div>
            <h3 className="mt-5 text-lg font-bold">{report.title}</h3>
            <p className="mt-2 text-sm text-gray-400">{report.desc}</p>
            <button className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-400 transition-all hover:text-blue-300">
              View Report <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}