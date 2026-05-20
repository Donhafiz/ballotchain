"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "BallotChain",
    defaultRole: "voter",
    enableRegistration: true,
    requireEmailVerification: true,
    maxElectionsPerUser: 10,
    sessionTimeout: 60,
  });

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Admin Settings</h1>
        <p className="text-gray-500 mt-1">Configure system-wide settings</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-6">
        {[
          { label: "Site Name", key: "siteName", type: "text" },
          { label: "Default User Role", key: "defaultRole", type: "select", options: ["voter", "admin", "observer"] },
          { label: "Max Elections Per User", key: "maxElectionsPerUser", type: "number" },
          { label: "Session Timeout (minutes)", key: "sessionTimeout", type: "number" },
        ].map((field) => (
          <div key={field.key} className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-900 dark:text-white">{field.label}</label>
            {field.type === "select" ? (
              <select className="w-48 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm" value={(settings as any)[field.key]} onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}>
                {(field as any).options.map((o: string) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input type={field.type} className="w-48 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm" value={(settings as any)[field.key]} onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })} />
            )}
          </div>
        ))}

        <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          {[
            { label: "Enable Registration", key: "enableRegistration" },
            { label: "Require Email Verification", key: "requireEmailVerification" },
          ].map((s) => (
            <div key={s.key} className="flex items-center justify-between">
              <span className="text-sm text-gray-900 dark:text-white">{s.label}</span>
              <button onClick={() => setSettings({ ...settings, [s.key]: !(settings as any)[s.key] })}
                className={"relative w-12 h-7 rounded-full transition-colors " + ((settings as any)[s.key] ? "bg-blue-600" : "bg-gray-300")}>
                <div className={"absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform " + ((settings as any)[s.key] ? "translate-x-5" : "translate-x-0.5")} />
              </button>
            </div>
          ))}
        </div>

        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/25">Save Settings</button>
      </div>
    </div>
  );
}