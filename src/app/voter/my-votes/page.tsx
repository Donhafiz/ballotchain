"use client";

import Link from "next/link";

const voteHistory = [
  { id: "1", election: "Faculty Senate Elections", candidate: "Sarah Johnson", date: "2026-04-20", receipt: "0x7a3b...9f2e" },
  { id: "2", election: "Club President Vote", candidate: "Mike Brown", date: "2026-03-15", receipt: "0x4c8d...1a6f" },
];

export default function MyVotesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Link href="/voter" className="text-sm text-blue-600 hover:underline mb-2 block">← Back to Dashboard</Link>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Voting History</h1>
          <p className="text-gray-500 mt-1">{voteHistory.length} votes cast</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl divide-y divide-gray-200 dark:divide-gray-800">
          {voteHistory.map((vote) => (
            <div key={vote.id} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">{vote.election}</h3>
                <span className="text-sm text-gray-500">{vote.date}</span>
              </div>
              <p className="text-sm text-gray-500">Voted for: <span className="font-semibold text-gray-900 dark:text-white">{vote.candidate}</span></p>
              <p className="text-xs text-gray-400 mt-1 font-mono">Receipt: {vote.receipt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}