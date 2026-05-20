"use client";

import { useParams } from "next/navigation";

export default function CandidateDetailPage() {
  const { electionId, candidateId } = useParams();
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Candidate Details</h1><p className="text-gray-500 mt-1">Candidate ID: {candidateId}</p></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-2xl font-bold text-blue-700">J</div>
          <div><h2 className="text-xl font-bold text-gray-900 dark:text-white">John Smith</h2><p className="text-gray-500">President</p></div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-gray-500">Votes:</span> <span className="font-bold text-gray-900 dark:text-white">2,847</span></div>
          <div><span className="text-gray-500">Percentage:</span> <span className="font-bold text-gray-900 dark:text-white">42%</span></div>
        </div>
      </div>
    </div>
  );
}