"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store/AppContext";

export default function ElectionsListPage() {
  const { elections, fetchElections, loading } = useApp();

  useEffect(() => { fetchElections(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Elections</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{elections.length} total elections</p>
        </div>
        <Link href="/dashboard/elections/create" className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all">+ New Election</Link>
      </div>

      {elections.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-16 text-center">
          <span className="text-5xl mb-4 block">🗳️</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No elections yet</h2>
          <p className="text-gray-500 mb-6">Create your first election to get started</p>
          <Link href="/dashboard/elections/create" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">Create Election</Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl divide-y divide-gray-200 dark:divide-gray-800">
          {elections.map((election) => (
            <Link key={election._id} href={"/dashboard/elections/" + election._id} className="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center text-lg">🗳️</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{election.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{election.candidates?.length || 0} candidates · {election.totalVoters} voters · {election.totalVotes} votes</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{new Date(election.startDate).toLocaleDateString()} → {new Date(election.endDate).toLocaleDateString()}</span>
                <span className={"px-3 py-1 rounded-full text-xs font-bold " + (election.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : election.status === "draft" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300")}>{election.status}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}