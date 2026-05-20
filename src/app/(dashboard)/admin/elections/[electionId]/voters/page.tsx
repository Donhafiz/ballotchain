"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function VotersPage() {
  const { electionId } = useParams();
  const [voters] = useState([
    { id: "1", name: "Alice Johnson", email: "alice@edu.com", status: "voted", votedAt: "2026-05-18 14:32" },
    { id: "2", name: "Bob Smith", email: "bob@edu.com", status: "registered", votedAt: null },
    { id: "3", name: "Carol Davis", email: "carol@edu.com", status: "voted", votedAt: "2026-05-19 09:15" },
    { id: "4", name: "Dan Wilson", email: "dan@edu.com", status: "pending", votedAt: null },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Voters</h1>
          <p className="text-gray-500 mt-1">{voters.length} registered voters</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">📥 Import CSV</button>
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">+ Add Voter</button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Voter</th>
              <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Voted At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {voters.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="p-4 font-medium text-gray-900 dark:text-white">{v.name}</td>
                <td className="p-4 text-sm text-gray-500">{v.email}</td>
                <td className="p-4">
                  <span className={"px-2 py-1 rounded-full text-xs font-bold " + (v.status === "voted" ? "bg-green-100 text-green-700" : v.status === "registered" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700")}>{v.status}</span>
                </td>
                <td className="p-4 text-sm text-gray-500">{v.votedAt || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}