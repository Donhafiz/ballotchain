"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/lib/store/AppContext";

export default function CandidatesPage() {
  const { electionId } = useParams();
  const router = useRouter();
  const { token } = useApp();
  const [election, setElection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchElection(); }, [electionId]);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href={"/dashboard/admin/elections/" + electionId} className="text-sm text-blue-600 hover:underline mb-2 block">← Back to Election</Link>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Candidates</h1>
          <p className="text-gray-500 mt-1">{election?.title}</p>
        </div>
        <Link href={"/dashboard/admin/elections/" + electionId + "/candidates/add"} className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/25">+ Add Candidate</Link>
      </div>

      {election?.candidates?.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-16 text-center">
          <span className="text-5xl mb-4 block">👤</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No candidates yet</h2>
          <p className="text-gray-500 mb-6">Add candidates to this election</p>
          <Link href={"/dashboard/admin/elections/" + electionId + "/candidates/add"} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl">Add First Candidate</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {election?.candidates?.map((c: any, i: number) => (
            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-lg font-bold text-blue-700">{c.name?.[0]}</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{c.name}</h3>
                  <p className="text-sm text-gray-500">{c.position}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{c.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500">🗳️ {c.votes || 0} votes</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}