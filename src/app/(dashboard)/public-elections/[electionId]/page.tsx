"use client";

import { useParams } from "next/navigation";

export default function PublicElectionPage() {
  const { electionId } = useParams();
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Student Council Election 2026</h1>
        <p className="text-gray-500 mt-2">Public election · Vote now</p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-bold">🟢 Active</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {["John Smith - President", "Sarah Johnson - President", "Mike Brown - VP", "Lisa Davis - VP"].map((c, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center hover:border-blue-500 cursor-pointer transition-all">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-blue-700">{c[0]}</div>
            <h3 className="font-bold text-gray-900 dark:text-white">{c.split(" - ")[0]}</h3>
            <p className="text-sm text-gray-500">{c.split(" - ")[1]}</p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700">Vote</button>
          </div>
        ))}
      </div>
    </div>
  );
}