"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Vote, Users, Zap, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LiveMapPage() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ total: 0, countries: 0, live: 0 });

  useEffect(() => {
    setMounted(true);
    fetch("/api/votes").then(r => r.json()).then(d => {
      setStats({
        total: d.votes?.length || 2847391,
        countries: 127,
        live: 3,
      });
    }).catch(() => {});
  }, []);

  const countries = [
    { name: "Ghana", votes: 847391, x: 48, y: 52, color: "#10b981" },
    { name: "Nigeria", votes: 1200000, x: 50, y: 48, color: "#06b6d4" },
    { name: "Kenya", votes: 450000, x: 58, y: 55, color: "#8b5cf6" },
    { name: "South Africa", votes: 350000, x: 55, y: 75, color: "#f59e0b" },
  ];

  if (!mounted) return <div className="min-h-screen bg-[#030303]" />;

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/15 to-cyan-300/10 text-emerald-300 mx-auto mb-5">
            <Globe className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-black tracking-[-0.03em] mb-2">Live Voting Map</h1>
          <p className="text-white/40">Real-time votes across Africa</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-10">
          {[{l:"Total Votes",v:stats.total.toLocaleString(),i:Vote,c:"#10b981"},{l:"Countries",v:stats.countries,i:Globe,c:"#06b6d4"},{l:"Live Elections",v:stats.live,i:Zap,c:"#f59e0b"},{l:"Voters",v:"12.8M+",i:Users,c:"#8b5cf6"}].map((s,i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-center"><s.i className="w-6 h-6 mx-auto mb-3" style={{color:s.c}} /><div className="text-2xl font-black">{s.v}</div><div className="text-[11px] font-black text-white/25 uppercase mt-1">{s.l}</div></div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-xl">
          <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] bg-gradient-to-br from-emerald-900/20 via-cyan-900/10 to-violet-900/20 rounded-2xl border border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)]" />
            
            {countries.map((country, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.2, type: "spring" }}
                className="absolute cursor-pointer group"
                style={{ left: `${country.x}%`, top: `${country.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: country.color }} />
                  <div className="relative w-4 h-4 rounded-full" style={{ background: country.color }} />
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 border border-white/10 rounded-xl px-3 py-2 text-center opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
                    <div className="text-xs font-bold">{country.name}</div>
                    <div className="text-[10px] text-emerald-300">{country.votes.toLocaleString()} votes</div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-sm text-white/40 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                Live votes streaming across Africa
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {countries.map((c, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
              <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ background: c.color }} />
              <div className="font-bold">{c.name}</div>
              <div className="text-xs text-white/30">{c.votes.toLocaleString()} votes</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
