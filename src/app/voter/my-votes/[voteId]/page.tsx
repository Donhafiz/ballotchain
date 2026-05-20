"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function VoteDetailPage() {
  const { voteId } = useParams();
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050508] py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/voter/my-votes" className="text-sm text-blue-600 hover:underline">← Back to History</Link>
        <Card>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Vote Receipt</h1>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800"><span className="text-gray-500">Receipt ID</span><span className="font-mono text-gray-900 dark:text-white">{voteId}</span></div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800"><span className="text-gray-500">Election</span><span className="font-semibold">Student Council 2026</span></div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800"><span className="text-gray-500">Candidate</span><span className="font-semibold">John Smith</span></div>
            <div className="flex justify-between py-2"><span className="text-gray-500">Date</span><span>May 19, 2026 14:32</span></div>
          </div>
        </Card>
        <Link href="/voter"><Button>Back to Dashboard</Button></Link>
      </div>
    </div>
  );
}