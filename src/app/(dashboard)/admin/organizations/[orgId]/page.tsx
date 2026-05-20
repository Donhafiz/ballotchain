"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function OrganizationDetailPage() {
  const { orgId } = useParams();

  return (
    <div className="space-y-6">
      <Link href="/dashboard/admin/organizations" className="text-sm text-blue-600 hover:underline">← Back to Organizations</Link>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center text-3xl">🏢</div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Tech University</h1>
            <p className="text-gray-500">Organization ID: {orgId}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[{ label: "Members", value: "4,500" }, { label: "Elections", value: "24" }, { label: "Active Elections", value: "3" }, { label: "Status", value: "Active" }].map((s, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center"><div className="text-2xl font-extrabold text-gray-900 dark:text-white">{s.value}</div><div className="text-xs text-gray-500 mt-1">{s.label}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}