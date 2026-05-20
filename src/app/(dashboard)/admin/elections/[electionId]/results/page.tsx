"use client";

import { useParams } from "next/navigation";

export default function ElectionResultsPage() {
  const { electionId } = useParams();
  const results = [{ name: "John Smith", votes: 2847, pct: 42 },{ name: "Sarah Johnson", votes: 2190, pct: 32 },{ name: "Mike Brown", votes: 1103, pct: 16 },{ name: "Lisa Davis", votes: 591, pct: 9 }];
  
  return (
    <div className="p-6 space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Election Results</h1><p className="text-gray-500 mt-1">Election ID: {electionId}</p></div>
      <div className="grid grid-cols-4 gap-4">
        {[{ label: "Total Votes", value: "6,731", icon: "🗳️" },{ label: "Turnout", value: "78.4%", icon: "📊" },{ label: "Voters", value: "8,576", icon: "👥" },{ label: "Status", value: "Active", icon: "🟢" }].map((s, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5"><span className="text-2xl">{s.icon}</span><div className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">{s.value}</div><div className="text-xs text-gray-500">{s.label}</div></div>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Candidate Rankings</h3>
        {results.map((c, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between text-sm"><span className="font-semibold text-gray-900 dark:text-white">{i+1}. {c.name}</span><span className="text-gray-500">{c.votes.toLocaleString()} votes ({c.pct}%)</span></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full" style={{ width: c.pct + "%" }} /></div>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold">📄 Export PDF</button>
        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-semibold">📊 Export CSV</button>
      </div>
    </div>
  );
}