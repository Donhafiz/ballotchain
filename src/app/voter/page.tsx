"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VoterDashboard() {
  const [activeElections] = useState([
    { id: "1", title: "Student Council President 2026", deadline: "May 30, 2026", status: "active", voted: false, candidates: 4 },
    { id: "2", title: "Department Representative", deadline: "June 15, 2026", status: "upcoming", voted: false, candidates: 3 },
    { id: "3", title: "Faculty Senate Elections", deadline: "April 20, 2026", status: "closed", voted: true, candidates: 6 },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">BallotChain</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">👤 John Doe</span>
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Sign Out</Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Voting Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Cast your vote in active elections</p>
        </motion.div>

        {/* Active Elections */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Active Elections</h2>
          <div className="space-y-4">
            {activeElections.filter((e) => e.status === "active").map((election, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center text-2xl">🗳️</div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{election.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{election.candidates} candidates · Deadline: {election.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-bold">🟢 Active</span>
                  <Link href={"/voter/elections/" + election.id + "/vote"}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:scale-105">
                    Vote Now →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Elections</h2>
          <div className="space-y-4">
            {activeElections.filter((e) => e.status === "upcoming").map((election, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center justify-between opacity-70">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-2xl">📅</div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{election.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Starts {election.deadline} · {election.candidates} candidates</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold">🔵 Upcoming</span>
              </div>
            ))}
          </div>
        </div>

        {/* Voting History */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Voting History</h2>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl divide-y divide-gray-200 dark:divide-gray-800">
            {activeElections.filter((e) => e.status === "closed").map((election, i) => (
              <div key={i} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-lg">✅</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{election.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Voted · {election.deadline}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Receipt: #VOTE-{election.id}-2026</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}