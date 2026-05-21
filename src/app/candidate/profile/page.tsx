"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, User, Upload, Globe, FileText, CheckCircle2 } from "lucide-react";

export default function CandidateProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => { setMounted(true); }, []);
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000); };

  const [profile, setProfile] = useState({
    name: "Maya Okonkwo",
    party: "Student Action",
    bio: "Junior, Political Science major. Current Student Senate member. I believe in affordable housing, accessible mental health services, and a sustainable campus for all students.",
    website: "https://mayaforpresident.edu",
    platform: "• Affordable housing for all students\n• 24/7 mental health services on campus\n• Carbon-neutral campus by 2028\n• Increased scholarships for first-gen students\n• Transparent budget allocation",
    experience: "• Student Senate Member (2024-2026)\n• Campus Sustainability Committee Chair\n• Volunteer at Local Community Center\n• Dean's List (All semesters)",
    photo: "",
  });

  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0b0c0f]">
      <div className="max-w-[720px] mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/candidate" className="p-2 rounded-xl text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-[28px] font-bold text-white">Edit Profile</h1>
            <p className="text-[14px] text-[rgba(255,255,255,0.35)] mt-1">Update your candidate information</p>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 space-y-6">
          {/* Photo */}
          <div className="flex items-center gap-6 pb-6 border-b border-[rgba(255,255,255,0.04)]">
            <div className="w-20 h-20 rounded-2xl bg-[rgba(245,158,11,0.08)] flex items-center justify-center text-2xl font-bold text-[#f59e0b]">MO</div>
            <div>
              <button onClick={() => showToast("Photo upload dialog...")} className="px-4 py-[9px] rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[12px] font-medium text-[rgba(255,255,255,0.5)] hover:text-white transition-all flex items-center gap-2">
                <Upload className="w-3.5 h-3.5" /> Upload Photo
              </button>
              <p className="text-[11px] text-[rgba(255,255,255,0.2)] mt-2">Recommended: 400x400px JPG/PNG</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Name</label>
              <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full px-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Party</label>
              <input value={profile.party} onChange={e => setProfile({...profile, party: e.target.value})} className="w-full px-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Bio</label>
            <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} rows={4} className="w-full px-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all resize-none" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Website</label>
            <input value={profile.website} onChange={e => setProfile({...profile, website: e.target.value})} className="w-full px-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Platform</label>
              <textarea value={profile.platform} onChange={e => setProfile({...profile, platform: e.target.value})} rows={6} className="w-full px-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all resize-none" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[rgba(255,255,255,0.3)] uppercase mb-2">Experience</label>
              <textarea value={profile.experience} onChange={e => setProfile({...profile, experience: e.target.value})} rows={6} className="w-full px-4 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white text-[14px] outline-none focus:border-[rgba(79,255,176,0.3)] transition-all resize-none" />
            </div>
          </div>

          <div className="pt-4 border-t border-[rgba(255,255,255,0.04)] flex justify-end gap-3">
            <Link href="/candidate" className="px-5 py-[11px] rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[13px] font-medium text-[rgba(255,255,255,0.5)] hover:text-white transition-all no-underline">Cancel</Link>
            <button onClick={() => showToast("Profile saved!")} className="px-6 py-[11px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold hover:opacity-90 transition-all flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>
          </div>
        </div>
      </div>

      {toast && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] animate-[fadeSlideUp_0.3s_ease]"><div className="flex items-center gap-2 px-5 py-[12px] rounded-xl bg-[#14151a] border border-[rgba(255,255,255,0.1)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-[13px] font-medium text-white"><CheckCircle2 className="w-4 h-4 text-[#4fffb0]" />{toast}</div></div>}
    </div>
  );
}