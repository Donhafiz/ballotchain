"use client";

export default function SecuritySettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Security Settings</h1><p className="text-gray-500 mt-1">Configure security policies</p></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-6">
        {[
          { label: "Two-Factor Authentication", desc: "Require 2FA for all admin users" },
          { label: "IP Whitelisting", desc: "Restrict access to specific IP ranges" },
          { label: "Session Timeout", desc: "Auto-logout after 60 minutes of inactivity" },
          { label: "Password Policy", desc: "Min 12 characters, require special characters" },
          { label: "Audit Logging", desc: "Log all admin actions for compliance" },
        ].map((s, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <div><div className="font-semibold text-gray-900 dark:text-white">{s.label}</div><div className="text-sm text-gray-500">{s.desc}</div></div>
            <button className="relative w-12 h-7 rounded-full bg-blue-600"><div className="absolute top-0.5 right-0.5 w-6 h-6 bg-white rounded-full shadow" /></button>
          </div>
        ))}
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700">Save Security Settings</button>
      </div>
    </div>
  );
}