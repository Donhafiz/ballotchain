"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function VoteDetailPage() {
  const { voteId } = useParams();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/voter/my-votes" className="text-sm text-blue-600 hover:underline">← Back to History</Link>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Vote Receipt</h1>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Receipt ID:</span><span className="font-mono text-gray-900 dark:text-white">{voteId}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Election:</span><span className="font-semibold text-gray-900 dark:text-white">Student Council 2026</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Candidate:</span><span className="font-semibold text-gray-900 dark:text-white">John Smith</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date:</span><span className="text-gray-900 dark:text-white">May 19, 2026 14:32</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Status:</span><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">Confirmed</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}