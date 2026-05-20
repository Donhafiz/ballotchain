"use client";

export default function ReportsPage() {
  const reports = [
    { title: "Voter Turnout Report", desc: "Detailed turnout statistics", icon: "📊", date: "Updated daily" },
    { title: "Election Results Summary", desc: "All completed elections", icon: "🗳️", date: "Updated hourly" },
    { title: "Security Audit Log", desc: "Authentication & access logs", icon: "🔒", date: "Real-time" },
    { title: "Voter Demographics", desc: "Age, department, location", icon: "👥", date: "Updated weekly" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Reports & Analytics</h1>
        <p className="text-gray-500 mt-1">Comprehensive election insights</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {reports.map((r, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition-all cursor-pointer">
            <div className="flex items-start justify-between">
              <span className="text-3xl">{r.icon}</span>
              <span className="text-xs text-gray-400">{r.date}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4">{r.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{r.desc}</p>
            <button className="mt-4 text-sm text-blue-600 font-semibold hover:underline">View Report →</button>
          </div>
        ))}
      </div>
    </div>
  );
}