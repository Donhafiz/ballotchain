"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setSent(true); setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6" style={{ background: "#0a0a14" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="syne font-extrabold text-4xl md:text-5xl text-white mb-4">Talk to <span className="glow-text">Sales</span></h1>
          <p className="text-lg text-white/50">Get a custom demo for your organization.</p>
        </div>

        {sent ? (
          <div className="glass rounded-3xl p-12 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="syne text-2xl font-bold text-white mb-2">Message Sent!</h2>
            <p className="text-white/50 mb-6">Our team will get back to you within 24 hours.</p>
            <Link href="/home" className="btn-blue inline-flex px-8 py-3 rounded-xl font-semibold text-white">Back to Home</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass rounded-3xl p-10 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">First Name</label>
                <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="John" required />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Last Name</label>
                <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="Doe" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Work Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="you@company.com" required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Organization</label>
              <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="Your organization" required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Message</label>
              <textarea className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-indigo-500 transition-colors h-28 resize-none" placeholder="Tell us about your needs..." required />
            </div>
            <button type="submit" disabled={loading} className="btn-purple w-full py-3.5 rounded-xl font-semibold text-white">
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}