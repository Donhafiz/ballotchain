"use client";

export default function ResultsAnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Results Analytics</h1><p className="text-gray-500 mt-1">Detailed voting analytics</p></div>
      <div className="grid grid-cols-2 gap-4">
        {[{ title: "Voter Turnout by Department", desc: "Breakdown by academic department" },{ title: "Hourly Voting Pattern", desc: "Peak voting hours analysis" },{ title: "Demographic Distribution", desc: "Age, year, and gender stats" },{ title: "Geographic Heatmap", desc: "Voting locations map" }].map((r, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-blue-500 cursor-pointer transition-all">
            <span className="text-3xl mb-3 block">📊</span>
            <h3 className="font-bold text-gray-900 dark:text-white">{r.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{r.desc}</p>
            <button className="mt-4 text-sm text-blue-600 font-semibold hover:underline">View Report →</button>
          </div>
        ))}
      </div>
    </div>
  );
}