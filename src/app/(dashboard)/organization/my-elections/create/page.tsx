"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrgCreateElectionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await new Promise(r => setTimeout(r, 1500)); router.push("/dashboard/organization/my-elections"); };

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Create Election</h1><p className="text-gray-500 mt-1">For your organization</p></div>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-5">
        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Title</label><input className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm" placeholder="Election title" required /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Start Date</label><input type="datetime-local" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm" required /></div>
          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">End Date</label><input type="datetime-local" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm" required /></div>
        </div>
        <button type="submit" disabled={loading} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60">{loading ? "Creating..." : "Create Election"}</button>
      </form>
    </div>
  );
}