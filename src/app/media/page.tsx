"use client";
import { Globe, Download, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[rgba(0,212,255,0.08)] flex items-center justify-center mx-auto mb-5"><Globe className="w-8 h-8 text-[#00d4ff]" /></div>
        <h1 className="text-4xl font-extrabold mb-4">Media Center</h1>
        <p className="text-[rgba(255,255,255,0.4)] max-w-lg mx-auto mb-8">Press releases, brand assets, and election coverage resources.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[{ icon: FileText, title: "Press Kit", desc: "Logos, screenshots, brand guidelines" },{ icon: Download, title: "Data Export", desc: "Election results in machine-readable formats" }].map((f, i) => (
            <div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-2xl p-6 text-left hover:border-[rgba(255,255,255,0.12)] transition-all cursor-pointer"><f.icon className="w-6 h-6 text-[#00d4ff] mb-3" /><h3 className="font-bold mb-2">{f.title}</h3><p className="text-sm text-[rgba(255,255,255,0.4)]">{f.desc}</p></div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
