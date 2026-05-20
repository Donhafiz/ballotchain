"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/lib/store/AppContext";

export default function ElectionDetailPage() {
  const { electionId } = useParams();
  const { token } = useApp();
  const [election, setElection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchElection();
  }, [electionId]);

  const fetchElection = async () => {
    try {
      const res = await fetch("/api/elections/" + electionId, {
        headers: { Authorization: "Bearer " + (token || localStorage.getItem("token")) },
      });
      if (res.ok) {
        const data = await res.json();
        setElection(data.election || data);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  if (loading) return <div className="p-8 text-center"><div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>;
  if (!election) return <div className="p-8 text-center text-gray-500">Election not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard/admin/elections" className="text-sm text-blue-600 hover:underline mb-2 block">← Back to Elections</Link>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{election.title}</h1>
          <p className="text-gray-500 mt-1">{election.description}</p>
        </div>
        <span className={"px-4 py-2 rounded-full text-sm font-bold " + (election.status === "active" ? "bg-green-100 text-green-700" : election.status === "draft" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600")}>{election.status}</span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Candidates", value: election.candidates?.length || 0, icon: "👤" },
          { label: "Total Voters", value: election.totalVoters || 0, icon: "👥" },
          { label: "Votes Cast", value: election.totalVotes || 0, icon: "🗳️" },
          { label: "Type", value: election.type?.replace("_", " ") || "N/A", icon: "📋" },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
            <span className="text-2xl">{s.icon}</span>
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Link href={"/dashboard/admin/elections/" + electionId + "/candidates"} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition-all text-center">
          <span className="text-3xl block mb-3">👤</span>
          <h3 className="font-bold text-gray-900 dark:text-white">Manage Candidates</h3>
          <p className="text-sm text-gray-500 mt-1">{election.candidates?.length || 0} candidates</p>
        </Link>
        <Link href={"/dashboard/admin/elections/" + electionId + "/voters"} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition-all text-center">
          <span className="text-3xl block mb-3">👥</span>
          <h3 className="font-bold text-gray-900 dark:text-white">Manage Voters</h3>
          <p className="text-sm text-gray-500 mt-1">{election.totalVoters || 0} registered</p>
        </Link>
        <Link href={"/dashboard/admin/elections/" + electionId + "/results"} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition-all text-center">
          <span className="text-3xl block mb-3">📊</span>
          <h3 className="font-bold text-gray-900 dark:text-white">View Results</h3>
          <p className="text-sm text-gray-500 mt-1">{election.totalVotes || 0} votes cast</p>
        </Link>
      </div>
    </div>
  );
}