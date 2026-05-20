"use client";

import { useParams } from "next/navigation";

export default function OrgElectionDetailPage() {
  const { electionId } = useParams();
  return (
    <div className="p-6 space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Election Details</h1><p className="text-gray-500 mt-1">ID: {electionId}</p></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5"><span className="text-2xl">👤</span><div className="text-xl font-extrabold mt-2">4</div><div className="text-xs text-gray-500">Candidates</div></div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5"><span className="text-2xl">👥</span><div className="text-xl font-extrabold mt-2">450</div><div className="text-xs text-gray-500">Voters</div></div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5"><span className="text-2xl">🗳️</span><div className="text-xl font-extrabold mt-2">392</div><div className="text-xs text-gray-500">Votes</div></div>
      </div>
    </div>
  );
}