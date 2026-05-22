"use client";
import { Shield, Eye, BarChart3 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ObserversDashboard() {
  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[rgba(79,255,176,0.08)] flex items-center justify-center mx-auto mb-5"><Eye className="w-8 h-8 text-[#4fffb0]" /></div>
        <h1 className="text-4xl font-extrabold mb-4">Election Observers</h1>
        <p className="text-[rgba(255,255,255,0.4)] max-w-lg mx-auto mb-8">Independent third-party monitoring dashboard for election transparency.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ icon: Shield, title: "Verify Integrity", desc: "Monitor blockchain anchors in real-time" },{ icon: BarChart3, title: "Live Statistics", desc: "Turnout, geographic distribution, trends" },{ icon: Eye, title: "Audit Trail", desc: "Full immutable record of all votes" }].map((f, i) => (
            <div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6"><f.icon className="w-8 h-8 text-[#4fffb0] mx-auto mb-3" /><h3 className="font-bold mb-2">{f.title}</h3><p className="text-sm text-[rgba(255,255,255,0.4)]">{f.desc}</p></div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
