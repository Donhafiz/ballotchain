"use client";

export default function ResultsExportPage() {
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Export Results</h1><p className="text-gray-500 mt-1">Download election results in various formats</p></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-4">
        {[{ format: "PDF Report", desc: "Official certified results document", icon: "📄" },{ format: "CSV Spreadsheet", desc: "Raw data for analysis", icon: "📊" },{ format: "JSON Data", desc: "Machine-readable format", icon: "💻" },{ format: "Blockchain Receipt", desc: "Cryptographic verification file", icon: "🔗" }].map((f, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="flex items-center gap-3"><span className="text-2xl">{f.icon}</span><div><div className="font-semibold text-gray-900 dark:text-white">{f.format}</div><div className="text-sm text-gray-500">{f.desc}</div></div></div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}