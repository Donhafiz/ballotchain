"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Calendar, Clock, ArrowLeft, Zap, CheckCircle2 } from "lucide-react";

export default function CreateElectionPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [form, setForm] = useState({
    title: "", description: "", type: "single_choice",
    startDate: "", endDate: "", visibility: "private",
    positions: [{ title: "President", candidates: [{ name: "" }] }],
    voterEmails: [] as string[],
  });
  const [bulkEmailInput, setBulkEmailInput] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const showToast = (m: string, t = "success") => { setToast({ message: m, type: t }); setTimeout(() => setToast(null), 3000); };

  const addBulkEmails = () => {
    const emails = bulkEmailInput.split(/[\n,]+/).map(e => e.trim()).filter(e => e.includes("@"));
    setForm({ ...form, voterEmails: [...form.voterEmails, ...emails] });
    setBulkEmailInput("");
    showToast(`${emails.length} emails added`);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
      const res = await fetch("/api/elections", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...form, eligibleVoters: form.voterEmails.length, totalVotes: 0,
          timezone: "UTC", organizationId: "default",
          settings: { requireVerification: true, allowWriteIn: false, showLiveResults: true, anonymousVoting: true, twoFactorRequired: false, ipRestriction: false, sessionTimeout: 30 }
        }),
      });
      if (res.ok) {
        showToast("Election created!");
        setTimeout(() => router.push("/dashboard/elections"), 1500);
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to create election", "error");
        setLoading(false);
      }
    } catch (err: any) {
      showToast(err.message || "Failed to create election", "error");
      setLoading(false);
    }
  };

  if (!mounted) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => router.back()} className="p-2 rounded-xl text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><ArrowLeft className="w-5 h-5" /></button>
        <div><h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Create Election</h1><p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Set up your election in minutes</p></div>
      </div>

      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s) => (<button key={s} onClick={() => setStep(s)} className={"px-4 py-2 rounded-xl text-[12px] font-semibold transition-all " + (step === s ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : "text-[rgba(255,255,255,0.3)]")}>Step {s}</button>))}
      </div>

      {step === 1 && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 space-y-5">
          <div><label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-3">Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g., Student Council President 2026" className="w-full px-5 py-[14px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" /></div>
          <div><label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-3">Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe the election..." rows={3} className="w-full px-5 py-[14px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all resize-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-3"><Calendar className="w-3.5 h-3.5 inline mr-1" /> Start</label><input type="datetime-local" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} className="w-full px-5 py-[14px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all [color-scheme:dark]" /></div>
            <div><label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-3"><Clock className="w-3.5 h-3.5 inline mr-1" /> End</label><input type="datetime-local" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} className="w-full px-5 py-[14px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all [color-scheme:dark]" /></div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          {form.positions.map((pos, pi) => (
            <div key={pi} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 space-y-3">
              <input value={pos.title} onChange={e => { const p = [...form.positions]; p[pi].title = e.target.value; setForm({...form, positions: p}); }} placeholder="Position title" className="text-[16px] font-bold text-white bg-transparent border-none outline-none w-full" />
              {pos.candidates.map((cand, ci) => (
                <div key={ci} className="flex items-center gap-3 pl-4">
                  <input value={cand.name} onChange={e => { const p = [...form.positions]; p[pi].candidates[ci].name = e.target.value; setForm({...form, positions: p}); }} placeholder="Candidate name" className="flex-1 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-white text-[13px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" />
                  <button onClick={() => { const p = [...form.positions]; p[pi].candidates = p[pi].candidates.filter((_, j) => j !== ci); setForm({...form, positions: p}); }} className="text-[rgba(255,255,255,0.2)] hover:text-[#EF4444]"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button onClick={() => { const p = [...form.positions]; p[pi].candidates.push({ name: "" }); setForm({...form, positions: p}); }} className="text-[12px] text-[#4fffb0] hover:underline">+ Add Candidate</button>
            </div>
          ))}
          <button onClick={() => setForm({...form, positions: [...form.positions, { title: "", candidates: [{ name: "" }] }]})} className="w-full py-4 rounded-2xl border-2 border-dashed border-[rgba(255,255,255,0.06)] text-[14px] text-[rgba(255,255,255,0.25)] hover:border-[rgba(79,255,176,0.2)] hover:text-[#4fffb0] transition-all flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> Add Position</button>
        </div>
      )}

      {step === 3 && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 space-y-5">
          <div><label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-3">Bulk Add Voter Emails</label><textarea value={bulkEmailInput} onChange={e => setBulkEmailInput(e.target.value)} placeholder="alice@edu.com&#10;bob@edu.com&#10;carol@edu.com" rows={5} className="w-full px-5 py-[14px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[13px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all resize-none font-mono" /><button onClick={addBulkEmails} className="mt-3 flex items-center gap-2 px-4 py-[9px] rounded-xl bg-[rgba(79,255,176,0.08)] text-[#4fffb0] text-[12px] font-semibold hover:bg-[rgba(79,255,176,0.12)] transition-all"><Plus className="w-3.5 h-3.5" /> Add Emails</button></div>
          {form.voterEmails.length > 0 && (
            <div><label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-3">Added Voters ({form.voterEmails.length})</label><div className="max-h-[200px] overflow-y-auto space-y-1">{form.voterEmails.map((email, i) => (<div key={i} className="flex items-center justify-between px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.02)]"><span className="text-[13px] text-[rgba(255,255,255,0.6)]">{email}</span><button onClick={() => setForm({...form, voterEmails: form.voterEmails.filter((_, j) => j !== i)})} className="text-[rgba(255,255,255,0.15)] hover:text-[#EF4444]"><Trash2 className="w-3.5 h-3.5" /></button></div>))}</div></div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-4">
        <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} className="flex items-center gap-2 px-5 py-[12px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[14px] font-medium text-[rgba(255,255,255,0.5)] hover:text-white transition-all"><ArrowLeft className="w-4 h-4" /> {step === 1 ? "Cancel" : "Previous"}</button>
        {step < 3 ? (
          <button onClick={() => setStep(step + 1)} className="px-6 py-[12px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[14px] font-bold hover:opacity-90 transition-all">Continue</button>
        ) : (
          <button onClick={handleSubmit} disabled={loading} className="px-8 py-[12px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[14px] font-bold hover:opacity-90 hover:shadow-[0_20px_60px_rgba(79,255,176,0.3)] transition-all flex items-center gap-2 disabled:opacity-50">
            {loading ? "Creating..." : <><Zap className="w-4 h-4" /> Launch Election</>}
          </button>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 z-[300]">
          <div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]">
            <CheckCircle2 className="w-5 h-5 text-[#4fffb0]" /><span className="text-[13px] font-medium text-white">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
