"use client";

import { useParams } from "next/navigation";

export default function ElectionSettingsPage() {
  const { electionId } = useParams();
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Election Settings</h1><p className="text-gray-500 mt-1">Configure election parameters</p></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-5">
        {[{ label: "Allow Anonymous Voting", desc: "Votes not linked to identity" },{ label: "Require Voter Verification", desc: "Email verification required" },{ label: "Public Results", desc: "Results visible to everyone" },{ label: "Allow Vote Changes", desc: "Voters can change their vote" }].map((s, i) => (
          <div key={i} className="flex items-center justify-between"><div><div className="font-semibold text-gray-900 dark:text-white">{s.label}</div><div className="text-sm text-gray-500">{s.desc}</div></div><button className="relative w-12 h-7 rounded-full bg-blue-600"><div className="absolute top-0.5 right-0.5 w-6 h-6 bg-white rounded-full shadow" /></button></div>
        ))}
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700">Save Settings</button>
      </div>
    </div>
  );
}