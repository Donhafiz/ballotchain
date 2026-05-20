"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store/AppContext";

export default function AdminElectionsPage() {
  const { elections, fetchElections } = useApp();
  useEffect(() => { fetchElections(); }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Elections</h1><p className="text-gray-500 mt-1">{elections.length} total elections</p></div>
        <Link href="/dashboard/admin/elections/create" className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/25">+ New Election</Link>
      </div>
      {elections.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-16 text-center">
          <span className="text-5xl mb-4 block">🗳️</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No elections yet</h2>
          <Link href="/dashboard/admin/elections/create" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl">Create First Election</Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl divide-y divide-gray-200 dark:divide-gray-800">
          {elections.map((e) => (
            <Link key={e._id} href={"/dashboard/admin/elections/" + e._id} className="flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">🗳️</div>
                <div><h3 className="font-semibold text-gray-900 dark:text-white">{e.title}</h3><p className="text-sm text-gray-500">{e.candidates?.length || 0} candidates · {e.totalVoters || 0} voters</p></div>
              </div>
              <span className={"px-3 py-1 rounded-full text-xs font-bold " + (e.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>{e.status}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}