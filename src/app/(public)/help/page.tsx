"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6" style={{ background: "#0a0a14" }}>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="syne font-extrabold text-4xl md:text-5xl text-white mb-4">Help Center</h1>
        <p className="text-lg text-white/50 mb-12">Guides, tutorials, and frequently asked questions.</p>
        <div className="glass rounded-3xl p-12">
          <p className="text-white/40">This page is coming soon. For immediate assistance, please contact our support team.</p>
          <Link href="/contact" className="btn-blue inline-flex px-8 py-3 rounded-xl font-semibold text-white mt-6">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}