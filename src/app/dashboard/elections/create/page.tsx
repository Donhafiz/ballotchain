"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store/AppContext";

export default function CreateElectionPage() {
  const router = useRouter();
  const { createElection } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", description: "", organization: "Tech University",
    type: "single_choice", startDate: "", endDate: "",
    isPublic: false, candidates: [{ name: "", position: "", description: "" }],
  });

  const updateField = (field: string, value: any) => setForm({ ...form, [field]: value });
  const addCandidate = () => setForm({ ...form, candidates: [...form.candidates, { name: "", position: "", description: "" }] });
  const removeCandidate = (i: number) => setForm({ ...form, candidates: form.candidates.filter((_, idx) => idx !== i) });
  const updateCandidate = (i: number, field: string, value: string) => {
    const c = [...form.candidates];
    (c[i] as any)[field] = value;
    setForm({ ...form, candidates: c });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await createElection(form);
      router.push("/dashboard/elections");
    } catch (err: any) { setError(err.message); setLoading(false); }
  };

  const ic = "w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400 text-sm font-medium transition-all";
  const lc = "block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Create New Election</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Set up a secure, transparent election in minutes.</p>
      </div>

      <div className="flex items-center gap-3">
        {["Details", "Candidates", "Review"].map((s, i) => (
          <button key={i} onClick={() => setStep(i + 1)} className={"flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all " + (step === i + 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25" : "bg-gray-100 dark:bg-gray-800 text-gray-500")}>
            <span className={"w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold " + (step === i + 1 ? "bg-white/20" : "bg-gray-200 dark:bg-gray-700")}>{i + 1}</span> {s}
          </button>
        ))}
      </div>

      {error && <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-2xl text-sm text-red-700 dark:text-red-300">{error}</div>}

      <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }} className="space-y-6">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-5">
              <div><label className={lc}>Election Title</label><input type="text" value={form.title} onChange={(e) => updateField("title", e.target.value)} className={ic} placeholder="e.g., Student Council President 2026" required /></div>
              <div><label className={lc}>Description</label><textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} className={ic + " h-24 resize-none"} placeholder="Describe the election purpose and rules..." required /></div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className={lc}>Type</label><select value={form.type} onChange={(e) => updateField("type", e.target.value)} className={ic}><option value="single_choice">Single Choice</option><option value="multiple_choice">Multiple Choice</option><option value="ranked_choice">Ranked Choice</option></select></div>
                <div><label className={lc}>Start Date</label><input type="datetime-local" value={form.startDate} onChange={(e) => updateField("startDate", e.target.value)} className={ic} required /></div>
                <div><label className={lc}>End Date</label><input type="datetime-local" value={form.endDate} onChange={(e) => updateField("endDate", e.target.value)} className={ic} required /></div>
              </div>
            </div>
            <div className="flex justify-end"><button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/25">Next: Candidates →</button></div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            {form.candidates.map((c, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-4">
                <div className="flex justify-between items-center"><h3 className="font-bold text-gray-900 dark:text-white">Candidate #{i + 1}</h3>{form.candidates.length > 1 && <button type="button" onClick={() => removeCandidate(i)} className="text-red-500 text-sm font-semibold">Remove</button>}</div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={lc}>Name</label><input type="text" value={c.name} onChange={(e) => updateCandidate(i, "name", e.target.value)} className={ic} placeholder="e.g., John Smith" required /></div>
                  <div><label className={lc}>Position</label><input type="text" value={c.position} onChange={(e) => updateCandidate(i, "position", e.target.value)} className={ic} placeholder="e.g., President" required /></div>
                </div>
                <div><label className={lc}>Description</label><textarea value={c.description} onChange={(e) => updateCandidate(i, "description", e.target.value)} className={ic + " h-20 resize-none"} placeholder="Brief bio..." required /></div>
              </div>
            ))}
            <button type="button" onClick={addCandidate} className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl text-sm font-semibold text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-all">+ Add Candidate</button>
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl">← Back</button>
              <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/25">Next: Review →</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Review Your Election</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500">Title:</span> <span className="font-semibold text-gray-900 dark:text-white">{form.title || "—"}</span></div>
                <div><span className="text-gray-500">Type:</span> <span className="font-semibold text-gray-900 dark:text-white">{form.type.replace("_", " ")}</span></div>
                <div><span className="text-gray-500">Candidates:</span> <span className="font-semibold text-gray-900 dark:text-white">{form.candidates.length}</span></div>
                <div><span className="text-gray-500">Start:</span> <span className="font-semibold text-gray-900 dark:text-white">{form.startDate || "—"}</span></div>
                <div><span className="text-gray-500">End:</span> <span className="font-semibold text-gray-900 dark:text-white">{form.endDate || "—"}</span></div>
              </div>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(2)} className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl">← Back</button>
              <button type="submit" disabled={loading} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all disabled:opacity-60">
                {loading ? "Creating..." : "🚀 Create Election"}
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}