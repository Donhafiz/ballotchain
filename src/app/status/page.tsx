"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Sparkles } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-6 pt-32">
        <div className="text-center max-w-lg">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300/15 to-cyan-300/10 text-emerald-300 mx-auto mb-6">
            <Sparkles className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-4">Status</h1>
          <p className="text-white/50 text-lg leading-relaxed">
            This page is under construction. Content coming soon to support the BallotChain digital democracy infrastructure.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
