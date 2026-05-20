"use client";

export default function PublicResultsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">Election Results</h1>
      <div className="space-y-4">
        {[{ name: "John Smith", votes: 2847, pct: 42 },{ name: "Sarah Johnson", votes: 2190, pct: 32 },{ name: "Mike Brown", votes: 1103, pct: 16 },{ name: "Lisa Davis", votes: 591, pct: 9 }].map((c, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
            <div className="flex justify-between mb-2"><span className="font-bold text-gray-900 dark:text-white">{c.name}</span><span className="text-sm text-gray-500">{c.votes.toLocaleString()} votes ({c.pct}%)</span></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full" style={{ width: c.pct + "%" }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}