"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Clock, Users, Calendar, Globe, Lock, ArrowLeft, Save, Eye, Zap, Upload, CheckCircle2, ChevronDown, Copy, GripVertical, Image, Type, List, ToggleLeft, AlertTriangle, Mail } from "lucide-react";

export default function CreateElectionPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "single_choice",
    startDate: "",
    endDate: "",
    timezone: "UTC",
    visibility: "private",
    requireVerification: true,
    allowWriteIn: false,
    maxVotes: 1,
    positions: [{ title: "President", description: "", candidates: [{ name: "", bio: "", image: "" }] }],
    voterEmails: [] as string[],
    branding: { logo: "", primaryColor: "#4fffb0", accentColor: "#00d4ff" },
    security: { twoFactorRequired: false, ipRestriction: false, sessionTimeout: 30 },
  });
  const [bulkEmailInput, setBulkEmailInput] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const showToast = (message: string, type: string = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addPosition = () => {
    setForm({ ...form, positions: [...form.positions, { title: "", description: "", candidates: [{ name: "", bio: "", image: "" }] }] });
  };

  const removePosition = (index: number) => {
    setForm({ ...form, positions: form.positions.filter((_, i) => i !== index) });
  };

  const addCandidate = (posIndex: number) => {
    const newPositions = [...form.positions];
    newPositions[posIndex].candidates.push({ name: "", bio: "", image: "" });
    setForm({ ...form, positions: newPositions });
  };

  const removeCandidate = (posIndex: number, candIndex: number) => {
    const newPositions = [...form.positions];
    newPositions[posIndex].candidates = newPositions[posIndex].candidates.filter((_, i) => i !== candIndex);
    setForm({ ...form, positions: newPositions });
  };

  const addBulkEmails = () => {
    const emails = bulkEmailInput.split(/[\n,]+/).map(e => e.trim()).filter(e => e.includes("@"));
    setForm({ ...form, voterEmails: [...form.voterEmails, ...emails] });
    setBulkEmailInput("");
    showToast(`${emails.length} emails added`, "success");
  };

  const handleSubmit = () => {
    showToast("Election created successfully! ðŸŽ‰", "success");
    setTimeout(() => router.push("/dashboard/elections"), 1500);
  };

  const steps = [
    { num: 1, label: "Details", icon: Type },
    { num: 2, label: "Positions & Candidates", icon: Users },
    { num: 3, label: "Voters", icon: Mail },
    { num: 4, label: "Settings", icon: Lock },
    { num: 5, label: "Review", icon: Eye },
  ];

  if (!mounted) {
    return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => router.back()} className="p-2 rounded-xl text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">Create Election</h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Set up your election in minutes</p>
        </div>
      </div>

      {/* Step Progress */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <button onClick={() => setStep(s.num)} className={"flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all " + (step === s.num ? "bg-[rgba(79,255,176,0.1)] text-[#4fffb0]" : step > s.num ? "text-[rgba(255,255,255,0.4)]" : "text-[rgba(255,255,255,0.2)]")}>
              <s.icon className="w-4 h-4" /> {s.label}
            </button>
            {i < steps.length - 1 && <div className="w-6 h-[2px] bg-[rgba(255,255,255,0.06)]" />}
          </div>
        ))}
      </div>

      {/* Step 1: Details */}
      {step === 1 && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 space-y-6 animate-[fadeSlideUp_0.3s_ease]">
          <div>
            <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-3">Election Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g., Student Council President 2026" className="w-full px-5 py-[14px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-3">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the purpose and rules of this election..." rows={4} className="w-full px-5 py-[14px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-3"><Calendar className="w-3.5 h-3.5 inline mr-1" /> Start Date</label>
              <input type="datetime-local" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full px-5 py-[14px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all [color-scheme:dark]" />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-3"><Clock className="w-3.5 h-3.5 inline mr-1" /> End Date</label>
              <input type="datetime-local" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="w-full px-5 py-[14px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all [color-scheme:dark]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-3">Election Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-5 py-[14px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all cursor-pointer">
                <option value="single_choice" className="bg-[#14151a]">Single Choice</option>
                <option value="multiple_choice" className="bg-[#14151a]">Multiple Choice</option>
                <option value="ranked_choice" className="bg-[#14151a]">Ranked Choice</option>
                <option value="approval" className="bg-[#14151a]">Approval Voting</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-3"><Globe className="w-3.5 h-3.5 inline mr-1" /> Visibility</label>
              <select value={form.visibility} onChange={(e) => setForm({ ...form, visibility: e.target.value })} className="w-full px-5 py-[14px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all cursor-pointer">
                <option value="private" className="bg-[#14151a]">Private (Invite Only)</option>
                <option value="organization" className="bg-[#14151a]">Organization Only</option>
                <option value="public" className="bg-[#14151a]">Public</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Positions & Candidates */}
      {step === 2 && (
        <div className="space-y-4 animate-[fadeSlideUp_0.3s_ease]">
          {form.positions.map((position, posIndex) => (
            <div key={posIndex} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="w-5 h-5 text-[rgba(255,255,255,0.15)] cursor-grab" />
                  <input
                    value={position.title}
                    onChange={(e) => {
                      const newPositions = [...form.positions];
                      newPositions[posIndex].title = e.target.value;
                      setForm({ ...form, positions: newPositions });
                    }}
                    placeholder="Position title (e.g., President)"
                    className="text-[16px] font-bold text-white bg-transparent border-none outline-none placeholder:text-[rgba(255,255,255,0.2)]"
                  />
                </div>
                {form.positions.length > 1 && (
                  <button onClick={() => removePosition(posIndex)} className="p-2 rounded-lg text-[rgba(255,255,255,0.2)] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.08)] transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="space-y-3 pl-4 border-l-2 border-[rgba(79,255,176,0.15)]">
                {position.candidates.map((candidate, candIndex) => (
                  <div key={candIndex} className="flex items-center gap-3 bg-[rgba(255,255,255,0.02)] rounded-xl p-3">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.04)] flex items-center justify-center text-[rgba(255,255,255,0.2)]">
                      <Image className="w-4 h-4" />
                    </div>
                    <input
                      value={candidate.name}
                      onChange={(e) => {
                        const newPositions = [...form.positions];
                        newPositions[posIndex].candidates[candIndex].name = e.target.value;
                        setForm({ ...form, positions: newPositions });
                      }}
                      placeholder="Candidate name"
                      className="flex-1 bg-transparent border-none text-[14px] text-white outline-none placeholder:text-[rgba(255,255,255,0.2)]"
                    />
                    {position.candidates.length > 1 && (
                      <button onClick={() => removeCandidate(posIndex, candIndex)} className="p-1.5 rounded-lg text-[rgba(255,255,255,0.15)] hover:text-[#EF4444] transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={() => addCandidate(posIndex)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium text-[rgba(255,255,255,0.3)] hover:text-[#4fffb0] hover:bg-[rgba(79,255,176,0.05)] transition-all">
                  <Plus className="w-3.5 h-3.5" /> Add Candidate
                </button>
              </div>
            </div>
          ))}
          <button onClick={addPosition} className="w-full py-4 rounded-2xl border-2 border-dashed border-[rgba(255,255,255,0.06)] text-[14px] font-medium text-[rgba(255,255,255,0.25)] hover:border-[rgba(79,255,176,0.2)] hover:text-[#4fffb0] transition-all flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add Position
          </button>
        </div>
      )}

      {/* Step 3: Voters */}
      {step === 3 && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 space-y-6 animate-[fadeSlideUp_0.3s_ease]">
          <div>
            <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-3">Bulk Add Voter Emails</label>
            <textarea value={bulkEmailInput} onChange={(e) => setBulkEmailInput(e.target.value)} placeholder="Paste emails, one per line or comma-separated&#10;alice@edu.com&#10;bob@edu.com&#10;carol@edu.com" rows={6} className="w-full px-5 py-[14px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all resize-none font-mono text-[13px]" />
            <button onClick={addBulkEmails} className="mt-3 flex items-center gap-2 px-4 py-[9px] rounded-xl bg-[rgba(79,255,176,0.08)] text-[#4fffb0] text-[12px] font-semibold hover:bg-[rgba(79,255,176,0.12)] transition-all">
              <Plus className="w-3.5 h-3.5" /> Add Emails
            </button>
          </div>
          
          {form.voterEmails.length > 0 && (
            <div>
              <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-3">
                Added Voters ({form.voterEmails.length})
              </label>
              <div className="max-h-[200px] overflow-y-auto space-y-1">
                {form.voterEmails.map((email, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.02)]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4fffb0]" />
                      <span className="text-[13px] text-[rgba(255,255,255,0.6)]">{email}</span>
                    </div>
                    <button onClick={() => {
                      setForm({ ...form, voterEmails: form.voterEmails.filter((_, j) => j !== i) });
                    }} className="text-[rgba(255,255,255,0.15)] hover:text-[#EF4444] transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Settings */}
      {step === 4 && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 space-y-6 animate-[fadeSlideUp_0.3s_ease]">
          <h3 className="text-[16px] font-bold text-white flex items-center gap-2"><Lock className="w-4 h-4 text-[#4fffb0]" /> Security Settings</h3>
          {[
            { label: "Require Two-Factor Authentication", desc: "Voters must verify via email/SMS before voting", key: "twoFactorRequired" },
            { label: "IP Restriction", desc: "Limit voting to specific IP ranges", key: "ipRestriction" },
            { label: "Require Identity Verification", desc: "Voters must upload ID before accessing ballot", key: "requireVerification" },
            { label: "Allow Write-In Candidates", desc: "Voters can add unlisted candidates", key: "allowWriteIn" },
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.03)]">
              <div>
                <div className="text-[14px] font-semibold text-white">{setting.label}</div>
                <div className="text-[12px] text-[rgba(255,255,255,0.3)] mt-[2px]">{setting.desc}</div>
              </div>
              <button
                onClick={() => setForm({ ...form, [setting.key]: !(form as any)[setting.key] })}
                className={"w-12 h-7 rounded-full transition-all relative " + ((form as any)[setting.key] ? "bg-[#4fffb0]" : "bg-[rgba(255,255,255,0.08)]")}
              >
                <div className={"absolute top-1 w-5 h-5 rounded-full bg-white transition-all " + ((form as any)[setting.key] ? "right-1" : "left-1")} />
              </button>
            </div>
          ))}
          <div>
            <label className="block text-[11px] font-bold text-[rgba(255,255,255,0.3)] uppercase tracking-[0.1em] mb-3">Session Timeout (minutes)</label>
            <input type="number" value={form.security.sessionTimeout} onChange={(e) => setForm({ ...form, security: { ...form.security, sessionTimeout: parseInt(e.target.value) } })} className="w-32 px-4 py-[10px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" />
          </div>
        </div>
      )}

      {/* Step 5: Review */}
      {step === 5 && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 space-y-6 animate-[fadeSlideUp_0.3s_ease]">
          <div className="flex items-center gap-3 pb-6 border-b border-[rgba(255,255,255,0.04)]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4fffb0]/20 to-[#00d4ff]/20 flex items-center justify-center"><Vote className="w-6 h-6 text-[#4fffb0]" /></div>
            <div>
              <h3 className="text-[18px] font-bold text-white">{form.title || "Untitled Election"}</h3>
              <p className="text-[13px] text-[rgba(255,255,255,0.35)]">{form.description || "No description"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-[13px]">
            {[
              { label: "Type", value: form.type },
              { label: "Visibility", value: form.visibility },
              { label: "Positions", value: form.positions.length },
              { label: "Candidates", value: form.positions.reduce((sum, p) => sum + p.candidates.length, 0) },
              { label: "Voters", value: form.voterEmails.length },
              { label: "2FA Required", value: form.security.twoFactorRequired ? "Yes" : "No" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-[rgba(255,255,255,0.02)]">
                <span className="text-[rgba(255,255,255,0.3)]">{item.label}</span>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} className="flex items-center gap-2 px-5 py-[12px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[14px] font-medium text-[rgba(255,255,255,0.5)] hover:text-white transition-all">
          <ArrowLeft className="w-4 h-4" /> {step === 1 ? "Cancel" : "Previous"}
        </button>
        <div className="flex items-center gap-3">
          <button className="px-5 py-[12px] rounded-xl text-[14px] font-medium text-[rgba(255,255,255,0.35)] hover:text-white transition-all flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          {step < 5 ? (
            <button onClick={() => setStep(step + 1)} className="px-6 py-[12px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[14px] font-bold hover:opacity-90 transition-all">Continue</button>
          ) : (
            <button onClick={handleSubmit} className="px-8 py-[12px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[14px] font-bold hover:opacity-90 hover:shadow-[0_20px_60px_rgba(79,255,176,0.3)] transition-all flex items-center gap-2">
              <Zap className="w-4 h-4" /> Launch Election
            </button>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[300] animate-[fadeSlideUp_0.3s_ease]">
          <div className="flex items-center gap-3 px-5 py-[14px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border bg-[rgba(79,255,176,0.08)] border-[rgba(79,255,176,0.2)]">
            <CheckCircle2 className="w-5 h-5 text-[#4fffb0]" />
            <span className="text-[13px] font-medium text-white">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}