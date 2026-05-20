"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/store/AppContext";

const navLinks = [
  {
    label: "Platform",
    items: [
      { title: "Elections", desc: "Create & manage secure elections", icon: "🗳️", href: "/dashboard/elections", color: "blue" },
      { title: "Live Results", desc: "Real-time analytics dashboard", icon: "📊", href: "/dashboard/results", color: "purple" },
      { title: "Voter Management", desc: "Import & manage voters", icon: "👥", href: "/dashboard/voters", color: "gold" },
      { title: "Audit Trail", desc: "Blockchain-verified logs", icon: "🔒", href: "/dashboard/reports/audit", color: "cyan" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { title: "Government", desc: "National & local elections", icon: "🏛️", href: "/solutions/government", color: "blue" },
      { title: "Enterprise", desc: "Corporate board voting", icon: "🏢", href: "/solutions/enterprise", color: "purple" },
      { title: "Education", desc: "Universities & schools", icon: "🎓", href: "/solutions/education", color: "gold" },
      { title: "Nonprofits", desc: "NGO & association voting", icon: "🤝", href: "/solutions/nonprofits", color: "emerald" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useApp();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getColor = (color: string) => {
    const colors: any = {
      blue: { bg: "rgba(37,99,235,0.12)", text: "#93c5fd", border: "rgba(37,99,235,0.25)" },
      purple: { bg: "rgba(124,58,237,0.12)", text: "#c4b5fd", border: "rgba(124,58,237,0.25)" },
      gold: { bg: "rgba(245,158,11,0.12)", text: "#fcd34d", border: "rgba(245,158,11,0.25)" },
      cyan: { bg: "rgba(8,145,178,0.12)", text: "#67e8f9", border: "rgba(8,145,178,0.25)" },
      emerald: { bg: "rgba(5,150,105,0.12)", text: "#6ee7b7", border: "rgba(5,150,105,0.25)" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{
      background: scrolled ? "rgba(10,10,20,0.94)" : "rgba(10,10,20,0.7)",
      backdropFilter: "blur(24px)",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
    }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg transition-transform group-hover:scale-105 btn-purple">
              BC
            </div>
            <div>
              <span className="syne text-lg font-bold text-white tracking-tight">Ballot<span className="glow-text">Chain</span></span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((section) => (
              <div key={section.label} className="relative"
                onMouseEnter={() => setActiveDropdown(section.label)}
                onMouseLeave={() => setActiveDropdown(null)}>
                <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{ color: activeDropdown === section.label ? "#a5b4fc" : "rgba(255,255,255,0.7)" }}>
                  {section.label}
                  <svg className="w-3 h-3 transition-transform" style={{ transform: activeDropdown === section.label ? "rotate(180deg)" : "rotate(0deg)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <AnimatePresence>
                  {activeDropdown === section.label && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-72 rounded-2xl p-3 shadow-2xl" style={{ background: "rgba(15,20,35,0.98)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      {section.items.map((item) => {
                        const c = getColor(item.color);
                        return (
                          <Link key={item.title} href={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group/item">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: c.bg, color: c.text }}>{item.icon}</div>
                            <div>
                              <div className="text-sm font-semibold text-white group-hover/item:text-indigo-400 transition-colors">{item.title}</div>
                              <div className="text-xs text-gray-400">{item.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link href="/home#pricing" className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ color: "rgba(255,255,255,0.7)" }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = "#fcd34d"}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)"}>
              Pricing
            </Link>
          </div>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {user ? (
              <Link href="/dashboard" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-purple">Dashboard →</Link>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.color = "#fff"}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)"}>Sign In</Link>
                <Link href="/register" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-blue">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/[0.08]" style={{ background: "rgba(10,10,20,0.98)" }}>
            <div className="px-6 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {navLinks.map((section) => (
                <div key={section.label}>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">{section.label}</div>
                  {section.items.map((item) => {
                    const c = getColor(item.color);
                    return (
                      <Link key={item.title} href={item.href} onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: c.bg, color: c.text }}>{item.icon}</div>
                        <div><div className="text-sm font-semibold text-white">{item.title}</div><div className="text-xs text-gray-400">{item.desc}</div></div>
                      </Link>
                    );
                  })}
                </div>
              ))}
              <div className="pt-4 space-y-3 border-t border-white/[0.08]">
                {user ? (
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block text-center py-3 rounded-xl text-white font-semibold btn-purple">Dashboard</Link>
                ) : (
                  <>
                    <Link href="/register" onClick={() => setMobileOpen(false)} className="block text-center py-3 rounded-xl text-white font-semibold btn-blue">Get Started</Link>
                    <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-center py-2 text-sm text-gray-400">Sign In</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}