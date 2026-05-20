"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store/AppContext";

export default function AdminCreateElectionPage() {
  const router = useRouter();
  const { createElection } = useApp();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", organization: "Tech University",
    type: "single_choice", startDate: "", endDate: "",
    candidates: [{ name: "", position: "", description: "" }],
  });

  const updateField = (field: string, value: any) => setForm({ ...form, [field]: value });
  const addCandidate = () => setForm({ ...form, candidates: [...form.candidates, { name: "", position: "", description: "" }] });
  const removeCandidate = (i: number) => setForm({ ...form, candidates: form.candidates.filter((_, idx) => idx !== i) });
  const updateCandidate = (i: number, field: string, value: string) => {
    const c = [...form.candidates]; (c[i] as any)[field] = value; setForm({ ...form, candidates: c });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try { await createElection(form); router.push("/dashboard/admin/elections"); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const ic = "w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white text-sm font-medium";
  const lc = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2";

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Create New Election</h1><p className="text-gray-500 mt-1">Set up a secure election</p></div>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-5">
        <div><label className={lc}>Title</label><input type="text" value={form.title} onChange={(e) => updateField("title", e.target.value)} className={ic} placeholder="e.g., Student Council 2026" required /></div>
        <div><label className={lc}>Description</label><textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} className={ic + " h-24 resize-none"} placeholder="Election description..." required /></div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className={lc}>Type</label><select value={form.type} onChange={(e) => updateField("type", e.target.value)} className={ic}><option value="single_choice">Single Choice</option><option value="multiple_choice">Multiple Choice</option><option value="ranked_choice">Ranked Choice</option></select></div>
          <div><label className={lc}>Start Date</label><input type="datetime-local" value={form.startDate} onChange={(e) => updateField("startDate", e.target.value)} className={ic} required /></div>
          <div><label className={lc}>End Date</label><input type="datetime-local" value={form.endDate} onChange={(e) => updateField("endDate", e.target.value)} className={ic} required /></div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Candidates ({form.candidates.length})</h3>
          {form.candidates.map((c, i) => (
            <div key={i} className="grid grid-cols-3 gap-3 mb-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <input type="text" value={c.name} onChange={(e) => updateCandidate(i, "name", e.target.value)} className={ic} placeholder="Name" required />
              <input type="text" value={c.position} onChange={(e) => updateCandidate(i, "position", e.target.value)} className={ic} placeholder="Position" required />
              <div className="flex gap-2">
                <input type="text" value={c.description} onChange={(e) => updateCandidate(i, "description", e.target.value)} className={ic + " flex-1"} placeholder="Bio" required />
                {form.candidates.length > 1 && <button type="button" onClick={() => removeCandidate(i)} className="text-red-500 hover:text-red-600 font-bold px-2">×</button>}
              </div>
            </div>
          ))}
          <button type="button" onClick={addCandidate} className="text-blue-600 text-sm font-semibold hover:underline">+ Add Candidate</button>
        </div>
        <button type="submit" disabled={loading} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60">{loading ? "Creating..." : "Create Election"}</button>
      </form>
    </div>
  );
}