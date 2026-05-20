"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/lib/store/AppContext";

export default function AddCandidatePage() {
  const { electionId } = useParams();
  const router = useRouter();
  const { token } = useApp();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", position: "", description: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/elections/" + electionId + "/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + (token || localStorage.getItem("token")) },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/dashboard/admin/elections/" + electionId + "/candidates");
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const ic = "w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white text-sm font-medium";
  const lc = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Add Candidate</h1>
        <p className="text-gray-500 mt-1">Add a new candidate to this election</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-5">
        <div><label className={lc}>Full Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={ic} placeholder="e.g., John Smith" required /></div>
        <div><label className={lc}>Position</label><input type="text" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className={ic} placeholder="e.g., President" required /></div>
        <div><label className={lc}>Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={ic + " h-24 resize-none"} placeholder="Brief bio and platform..." required /></div>
        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/25 disabled:opacity-60">{loading ? "Adding..." : "Add Candidate"}</button>
          <button type="button" onClick={() => router.back()} className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl">Cancel</button>
        </div>
      </form>
    </div>
  );
}