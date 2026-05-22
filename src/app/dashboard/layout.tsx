"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Vote, Users, Shield, BarChart3, FileText,
  Building2, Lock, Settings, CreditCard, Webhook, Palette,
  Heart, Mail, ChevronLeft, ChevronRight, Search, Zap, Bell,
  LogOut, User, ChevronDown, Plus, Home, Menu, X, Eye,
  Sparkles, Orbit, ArrowUpRight
} from "lucide-react";

const menuSections = [
  {
    title: "Main",
    items: [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
      { icon: Vote, label: "Elections", href: "/dashboard/elections" },
      { icon: Users, label: "Voters", href: "/dashboard/voters" },
      { icon: Shield, label: "Admin Panel", href: "/dashboard/admin" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { icon: BarChart3, label: "Live Results", href: "/dashboard/results" },
      { icon: FileText, label: "Reports", href: "/dashboard/reports" },
      { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    ],
  },
  {
    title: "Management",
    items: [
      { icon: Building2, label: "Organizations", href: "/dashboard/organizations" },
      { icon: Lock, label: "Security", href: "/dashboard/security" },
    ],
  },
  {
    title: "System",
    items: [
      { icon: Settings, label: "Settings", href: "/dashboard/settings" },
      { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
      { icon: Webhook, label: "Webhooks", href: "/dashboard/webhooks" },
      { icon: Palette, label: "Branding", href: "/dashboard/branding" },
      { icon: Heart, label: "Health", href: "/dashboard/health" },
      { icon: Mail, label: "Email Setup", href: "/dashboard/email-setup" },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") { setSearchOpen(false); setMobileOpen(false); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
  const getBreadcrumb = () => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return "Overview";
    return parts.slice(1).map(p => p.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())).join(" / ");
  };

  if (!mounted) return <div className="min-h-screen bg-[#030303]" />;

  return (
    <div className="flex min-h-screen bg-[#030303] text-white">
      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[15vh]" onClick={() => setSearchOpen(false)}>
            <motion.div initial={{ scale: 0.95, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: -20 }} className="w-full max-w-[560px] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                <Search className="w-5 h-5 text-white/20" />
                <input autoFocus placeholder="Search elections, voters, settings..." className="flex-1 bg-transparent text-white text-[15px] outline-none placeholder:text-white/15" />
                <kbd className="px-2 py-1 rounded-md bg-white/5 text-[11px] text-white/20 font-mono">ESC</kbd>
              </div>
              <div className="p-3">
                {[{ label: "Elections", icon: Vote }, { label: "Voters", icon: Users }, { label: "Results", icon: BarChart3 }, { label: "Settings", icon: Settings }].map((item, i) => (
                  <button key={i} onClick={() => { router.push("/dashboard/" + item.label.toLowerCase()); setSearchOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[14px] text-white/50 hover:bg-white/5 hover:text-white transition-all">
                    <item.icon className="w-4 h-4 text-white/20" /> {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className={"hidden lg:flex flex-col border-r border-white/5 bg-[#050508] transition-all duration-300 shrink-0 " + (collapsed ? "w-[72px]" : "w-[260px]")}>
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-3 no-underline shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-300 via-cyan-300 to-violet-300 flex items-center justify-center font-extrabold text-sm text-black shadow-[0_0_30px_rgba(16,185,129,0.2)]"><Orbit className="w-5 h-5" /></div>
          </Link>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="text-[15px] font-black tracking-[-0.02em] whitespace-nowrap">Ballot<span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Chain</span></div>
              <div className="text-[10px] font-black text-white/15 uppercase tracking-[0.12em] whitespace-nowrap">Enterprise v5</div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 text-[11px] font-semibold text-white/25 hover:text-white no-underline transition-colors"><Home className="w-3.5 h-3.5" />{!collapsed && "Back to Home"}</Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {menuSections.map((section, si) => (
            <div key={si} className="mb-1">
              {!collapsed && <div className="px-3 pt-4 pb-1 text-[9px] font-black text-white/10 uppercase tracking-[0.16em]">{section.title}</div>}
              {section.items.map((item, ii) => {
                const active = isActive(item.href);
                return (
                  <Link key={ii} href={item.href} className={"flex items-center gap-3 px-3 py-[10px] rounded-xl text-[13px] font-semibold no-underline transition-all duration-200 mb-[2px] group relative " + (active ? "bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 text-emerald-300 border border-emerald-400/15" : "text-white/30 hover:bg-white/[0.03] hover:text-white")}>
                    <item.icon className={"w-[18px] h-[18px] shrink-0 transition-colors " + (active ? "text-emerald-300" : "text-white/15 group-hover:text-white")} />
                    {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gradient-to-b from-emerald-300 to-cyan-300 rounded-r-full" />}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="px-3 py-3 border-t border-white/5">
          <button onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-white/15 hover:text-white hover:bg-white/[0.03] transition-all">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /> <span className="text-[11px] font-semibold">Collapse</span></>}
          </button>
        </div>

        <div className="relative px-4 py-4 border-t border-white/5" ref={userMenuRef}>
          <button onClick={() => setShowUserMenu(!showUserMenu)} className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.03] transition-all">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-300 to-cyan-300 flex items-center justify-center text-xs font-bold text-black shrink-0">AD</div>
            {!collapsed && <><div className="flex-1 text-left overflow-hidden"><div className="text-[12px] font-bold text-white truncate">Admin User</div><div className="text-[10px] text-white/20 truncate">Administrator</div></div><ChevronDown className="w-4 h-4 text-white/20" /></>}
          </button>
          {showUserMenu && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden z-50">
              {[{ icon: User, label: "Profile", action: () => router.push("/dashboard/settings") }, { icon: Settings, label: "Settings", action: () => router.push("/dashboard/settings") }, { icon: LogOut, label: "Sign Out", danger: true, action: () => { localStorage.clear(); window.location.href = "/login"; } }].map((item, i) => (
                <button key={i} onClick={item.action} className={"w-full flex items-center gap-3 px-4 py-[11px] text-[13px] font-semibold transition-all hover:bg-white/[0.03] " + (item.danger ? "text-red-400" : "text-white/50 hover:text-white")}><item.icon className="w-4 h-4" /> {item.label}</button>
              ))}
            </div>
          )}
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ duration: 0.3 }} className="fixed top-0 left-0 bottom-0 z-[160] w-[280px] bg-[#050508] border-r border-white/5 flex flex-col lg:hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5"><span className="text-[15px] font-black text-white">Menu</span><button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-white/20 hover:text-white"><X className="w-5 h-5" /></button></div>
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                {menuSections.map((section, si) => (
                  <div key={si} className="mb-1">
                    <div className="px-3 pt-4 pb-1 text-[9px] font-black text-white/10 uppercase tracking-[0.16em]">{section.title}</div>
                    {section.items.map((item, ii) => {
                      const active = isActive(item.href);
                      return (
                        <Link key={ii} href={item.href} onClick={() => setMobileOpen(false)} className={"flex items-center gap-3 px-3 py-[10px] rounded-xl text-[13px] font-semibold no-underline transition-all duration-200 mb-[2px] " + (active ? "bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 text-emerald-300" : "text-white/30 hover:bg-white/[0.03] hover:text-white")}>
                          <item.icon className="w-[18px] h-[18px] shrink-0" /><span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[56px] border-b border-white/5 flex items-center justify-between px-4 lg:px-6 bg-[#050508]/70 backdrop-blur-2xl shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg text-white/20 hover:text-white hover:bg-white/[0.04] transition-all"><Menu className="w-5 h-5" /></button>
            <div className="hidden sm:flex items-center gap-2 text-[12px]">
              <Link href="/dashboard" className="text-white/15 hover:text-white transition-colors no-underline"><LayoutDashboard className="w-[14px] h-[14px]" /></Link>
              <ChevronRight className="w-3 h-3 text-white/10" />
              <span className="text-white font-bold">{getBreadcrumb()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="hidden sm:flex items-center gap-[6px] px-3 py-[5px] rounded-full bg-emerald-400/5 border border-emerald-400/10">
              <span className="relative flex h-[6px] w-[6px]"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-emerald-300" /></span>
              <span className="text-[10px] font-black text-emerald-300 uppercase tracking-[0.06em]">Live</span>
            </div>
            <button onClick={() => setSearchOpen(true)} className="hidden md:flex items-center gap-2 px-3 py-[6px] rounded-lg bg-white/[0.03] border border-white/5 text-[11px] text-white/25 hover:border-white/10 hover:text-white transition-all"><Search className="w-3.5 h-3.5" /><span>Search...</span><kbd className="ml-1 px-[5px] py-[2px] rounded-[4px] bg-white/5 text-[10px] text-white/15 font-mono">CtrlK</kbd></button>
            <button className="relative p-2 rounded-lg text-white/20 hover:text-white hover:bg-white/[0.04] transition-all"><Bell className="w-[18px] h-[18px]" /><span className="absolute top-1 right-1 w-[8px] h-[8px] rounded-full bg-red-400" /></button>
            <Link href="/verify" className="hidden lg:flex items-center gap-1.5 px-3 py-[6px] rounded-lg text-[11px] font-semibold text-white/25 hover:text-emerald-300 hover:bg-emerald-400/5 transition-all no-underline"><Shield className="w-3.5 h-3.5" /> Verify</Link>
            <Link href="/audit" className="hidden lg:flex items-center gap-1.5 px-3 py-[6px] rounded-lg text-[11px] font-semibold text-white/25 hover:text-white hover:bg-white/[0.04] transition-all no-underline"><Eye className="w-3.5 h-3.5" /> Audit</Link>
            <Link href="/dashboard/elections/create" className="hidden md:flex items-center gap-[6px] px-4 py-[8px] rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-[12px] font-black no-underline hover:opacity-90 hover:-translate-y-[1px] transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"><Plus className="w-[14px] h-[14px]" /> New</Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8">{children}</main>
      </div>
    </div>
  );
}
