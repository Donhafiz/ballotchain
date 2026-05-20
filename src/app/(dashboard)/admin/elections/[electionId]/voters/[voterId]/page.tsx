"use client";

import { useParams } from "next/navigation";

export default function VoterDetailPage() {
  const { electionId, voterId } = useParams();
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Voter Details</h1><p className="text-gray-500 mt-1">Voter ID: {voterId}</p></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-gray-500">Name:</span> <span className="font-semibold text-gray-900 dark:text-white">Alice Johnson</span></div>
          <div><span className="text-gray-500">Email:</span> <span className="font-semibold text-gray-900 dark:text-white">alice@edu.com</span></div>
          <div><span className="text-gray-500">Status:</span> <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">Voted</span></div>
          <div><span className="text-gray-500">Voted At:</span> <span className="font-semibold text-gray-900 dark:text-white">2026-05-19 14:32</span></div>
        </div>
      </div>
    </div>
  );
}