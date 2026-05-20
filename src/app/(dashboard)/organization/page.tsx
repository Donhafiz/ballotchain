"use client";

import Link from "next/link";

export default function OrganizationDashboard() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Organization Dashboard</h1><p className="text-gray-500 mt-1">Tech University</p></div>
      <div className="grid grid-cols-4 gap-4">
        {[{ label: "My Elections", value: "24", icon: "🗳️" },{ label: "Members", value: "4,500", icon: "👥" },{ label: "Active Now", value: "3", icon: "🟢" },{ label: "Total Votes", value: "8,391", icon: "✅" }].map((s, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5"><span className="text-2xl">{s.icon}</span><div className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">{s.value}</div><div className="text-xs text-gray-500">{s.label}</div></div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Link href="/dashboard/organization/my-elections" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center hover:border-blue-500 transition-all"><span className="text-3xl block mb-3">🗳️</span><h3 className="font-bold">My Elections</h3><p className="text-sm text-gray-500 mt-1">Manage your elections</p></Link>
        <Link href="/dashboard/organization/members" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center hover:border-blue-500 transition-all"><span className="text-3xl block mb-3">👥</span><h3 className="font-bold">Members</h3><p className="text-sm text-gray-500 mt-1">4,500 members</p></Link>
        <Link href="/dashboard/organization/settings" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center hover:border-blue-500 transition-all"><span className="text-3xl block mb-3">⚙️</span><h3 className="font-bold">Settings</h3><p className="text-sm text-gray-500 mt-1">Organization settings</p></Link>
      </div>
    </div>
  );
}