"use client";

import Link from "next/link";

export default function VoterElectionsPage() {
  const elections = [
    { id: "1", title: "Student Council President 2026", deadline: "May 30, 2026", status: "active", candidates: 4 },
    { id: "2", title: "Department Representative", deadline: "June 15, 2026", status: "upcoming", candidates: 3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Link href="/voter" className="text-sm text-blue-600 hover:underline mb-2 block">← Back to Dashboard</Link>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Available Elections</h1>
          <p className="text-gray-500 mt-1">{elections.length} elections</p>
        </div>
        <div className="space-y-4">
          {elections.map((e) => (
            <Link key={e.id} href={"/voter/elections/" + e.id + "/vote"}
              className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center text-xl">🗳️</div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{e.title}</h3>
                    <p className="text-sm text-gray-500">{e.candidates} candidates · Deadline: {e.deadline}</p>
                  </div>
                </div>
                <span className={"px-3 py-1 rounded-full text-sm font-bold " + (e.status === "active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700")}>
                  {e.status === "active" ? "Vote Now →" : "Upcoming"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}