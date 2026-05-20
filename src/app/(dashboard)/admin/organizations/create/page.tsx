"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateOrganizationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", type: "university", email: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await new Promise(r => setTimeout(r, 1500)); router.push("/dashboard/admin/organizations"); };

  const ic = "w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white text-sm font-medium";
  const lc = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Add Organization</h1><p className="text-gray-500 mt-1">Register a new organization</p></div>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-5">
        <div><label className={lc}>Organization Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={ic} placeholder="e.g., Tech University" required /></div>
        <div><label className={lc}>Type</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={ic}><option value="university">University</option><option value="corporate">Corporate</option><option value="government">Government</option><option value="nonprofit">Nonprofit</option></select></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={lc}>Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={ic} placeholder="org@example.com" required /></div>
          <div><label className={lc}>Phone</label><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={ic} placeholder="+1 (555) 000-0000" /></div>
        </div>
        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/25 disabled:opacity-60">{loading ? "Creating..." : "Create Organization"}</button>
          <button type="button" onClick={() => router.back()} className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl">Cancel</button>
        </div>
      </form>
    </div>
  );
}