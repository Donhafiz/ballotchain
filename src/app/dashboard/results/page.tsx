"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ResultsPage() {
  const barChartRef = useRef<HTMLCanvasElement>(null);

  const [results] = useState([
    { name: "Alex Thompson", party: "Student Unity", votes: 2847, percentage: 42.3, color: "#378ADD", trend: [200, 450, 800, 1200, 1800, 2400, 2847] },
    { name: "Maria Garcia", party: "Progressive Alliance", votes: 2190, percentage: 32.5, color: "#639922", trend: [180, 400, 700, 1000, 1500, 1900, 2190] },
    { name: "James Wilson", party: "Independent", votes: 1103, percentage: 16.4, color: "#EF9F27", trend: [100, 250, 400, 600, 800, 1000, 1103] },
    { name: "Sarah Kim", party: "Campus First", votes: 591, percentage: 8.8, color: "#7F77DD", trend: [50, 120, 200, 300, 400, 500, 591] },
  ]);

  const totalVotes = results.reduce((s, r) => s + r.votes, 0);
  const turnout = 78.4;
  const registeredVoters = 8576;
  const votesCast = totalVotes;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Live Results</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Student Council President Election 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">Live</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Votes", value: votesCast.toLocaleString(), icon: "🗳️", color: "blue" },
          { label: "Registered Voters", value: registeredVoters.toLocaleString(), icon: "👥", color: "green" },
          { label: "Turnout", value: turnout + "%", icon: "📊", color: "amber" },
          { label: "Remaining", value: (registeredVoters - votesCast).toLocaleString(), icon: "⏳", color: "purple" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
            <span className="text-2xl">{stat.icon}</span>
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">{stat.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Results List */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Candidate Rankings</h2>
        <div className="space-y-4">
          {results.map((candidate, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{i + 1}.</span>
                    <span className="font-bold text-gray-900 dark:text-white">{candidate.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full">{candidate.party}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 dark:text-white">{candidate.votes.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({candidate.percentage}%)</span>
                </div>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: candidate.percentage + "%" }} transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                  className="h-full rounded-full" style={{ background: candidate.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Export */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">Export Results</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Download certified election results</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">📄 PDF</button>
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">📊 CSV</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">📋 Certified Report</button>
        </div>
      </div>
    </div>
  );
}