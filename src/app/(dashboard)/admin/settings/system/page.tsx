"use client";

export default function SystemSettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">System Settings</h1><p className="text-gray-500 mt-1">System configuration</p></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-4">
        {[{ label: "Maintenance Mode", key: "maintenance" },{ label: "Debug Mode", key: "debug" },{ label: "API Rate Limiting", key: "ratelimit" }].map((s) => (
          <div key={s.key} className="flex items-center justify-between py-2"><span className="font-semibold text-gray-900 dark:text-white">{s.label}</span><button className="relative w-12 h-7 rounded-full bg-gray-300"><div className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow" /></button></div>
        ))}
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 mt-4">Save System Settings</button>
      </div>
    </div>
  );
}