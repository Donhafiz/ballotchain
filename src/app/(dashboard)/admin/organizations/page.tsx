"use client";

import Link from "next/link";

const orgs = [
  { id: "1", name: "Tech University", members: 4500, elections: 24, status: "active" },
  { id: "2", name: "Global Corp Inc", members: 12000, elections: 56, status: "active" },
  { id: "3", name: "City Government", members: 85000, elections: 12, status: "active" },
  { id: "4", name: "Healthcare Alliance", members: 3200, elections: 8, status: "inactive" },
];

export default function OrganizationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Organizations</h1><p className="text-gray-500 mt-1">{orgs.length} organizations</p></div>
        <Link href="/dashboard/admin/organizations/create" className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/25">+ Add Organization</Link>
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl divide-y divide-gray-200 dark:divide-gray-800">
        {orgs.map((org) => (
          <Link key={org.id} href={"/dashboard/admin/organizations/" + org.id} className="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center text-lg">🏢</div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{org.name}</h3>
                <p className="text-sm text-gray-500">{org.members.toLocaleString()} members · {org.elections} elections</p>
              </div>
            </div>
            <span className={"px-3 py-1 rounded-full text-xs font-bold " + (org.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500")}>{org.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}