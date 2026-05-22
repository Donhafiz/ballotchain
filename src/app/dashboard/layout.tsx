"use client";

import Link from "next/link";
import { usePathname, useRouter , Shield, Eye} from "next/navigation";
import { useState, useEffect, useRef , Shield, Eye} from "react";
import { 
  LayoutDashboard, Vote, Users, Shield, BarChart3, FileText, 
  Building2, Lock, Settings, CreditCard, Webhook, Palette, 
  Heart, ChevronLeft, ChevronRight, Search, Zap, Bell, 
  LogOut, User, ChevronDown, Plus, Home, Menu, X,
  CheckCircle2, AlertTriangle, Clock, Eye
, Shield, Eye} from "lucide-react";

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
    ],
  },
];

const notificationsList = [
  { id: 1, text: "Student Council election reached 75% turnout", time: "2 min ago", type: "milestone", read: false },
  { id: 2, text: "New voter Alice Johnson registered", time: "8 min ago", type: "info", read: false },
  { id: 3, text: "Security alert: Unusual login from new IP", time: "25 min ago", type: "alert", read: false },
  { id: 4, text: "Faculty Senate results certified on-chain", time: "1 hour ago", type: "success", read: true },
  { id: 5, text: "Weekly report generated and ready to download", time: "3 hours ago", type: "info", read: true },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsList);
  const [mounted, setMounted] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
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

  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));

  if (!mounted) return <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#4fffb0] border-t-transparent rounded-full animate-spin" /></div>;

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <div className="flex items-center gap-3 px-5 py-6 border-b border-[rgba(255,255,255,0.04)]">
        <Link href="/dashboard" className="flex items-center gap-3 no-underline shrink-0" onClick={() => mobile && setMobileOpen(false)}>
          <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#4fffb0] to-[#00d4ff] flex items-center justify-center font-extrabold text-sm text-[#0b0c0f] shadow-[0_0_30px_rgba(79,255,176,0.2)]">BC</div>
        </Link>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-[15px] font-bold text-white tracking-[-0.02em] whitespace-nowrap">BallotChain</div>
            <div className="text-[10px] font-semibold text-[rgba(255,255,255,0.2)] uppercase tracking-[0.12em] whitespace-nowrap">Enterprise v5</div>
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.03)]">
        <Link href="/home" className="flex items-center gap-2 text-[11px] font-medium text-[rgba(255,255,255,0.3)] hover:text-white no-underline transition-colors">
          <Home className="w-3.5 h-3.5" />
          {!collapsed && "Back to Home"}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {menuSections.map((section, si) => (
          <div key={si} className="mb-1">
            {!collapsed && <div className="px-3 pt-4 pb-1 text-[9px] font-bold text-[rgba(255,255,255,0.12)] uppercase tracking-[0.16em]">{section.title}</div>}
            {section.items.map((item, ii) => {
              const active = isActive(item.href);
              return (
                <Link key={ii} href={item.href} onClick={() => mobile && setMobileOpen(false)} className={"flex items-center gap-3 px-3 py-[10px] rounded-xl text-[13px] font-medium no-underline transition-all duration-200 mb-[2px] group relative " + (active ? "bg-[rgba(79,255,176,0.08)] text-[#4fffb0]" : "text-[rgba(255,255,255,0.35)] hover:bg-[rgba(255,255,255,0.03)] hover:text-white")}>
                  <item.icon className={"w-[18px] h-[18px] shrink-0 transition-colors " + (active ? "text-[#4fffb0]" : "text-[rgba(255,255,255,0.2)] group-hover:text-white")} />
                  {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                  {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#4fffb0] rounded-r-full" />}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#0b0c0f]">
      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]" onClick={() => setSearchOpen(false)}>
          <div className="w-full max-w-[560px] bg-[#14151a] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(255,255,255,0.05)]">
              <Search className="w-5 h-5 text-[rgba(255,255,255,0.3)]" />
              <input autoFocus placeholder="Search elections, voters, settings..." className="flex-1 bg-transparent text-white text-[15px] outline-none placeholder:text-[rgba(255,255,255,0.2)]" />
              <kbd className="px-2 py-1 rounded-md bg-[rgba(255,255,255,0.06)] text-[11px] text-[rgba(255,255,255,0.25)] font-mono">ESC</kbd>
            </div>
            <div className="p-3">
              {[{ label: "Elections", icon: Vote }, { label: "Voters", icon: Users }, { label: "Results", icon: BarChart3 }, { label: "Settings", icon: Settings }].map((item, i) => (
                <button key={i} onClick={() => { router.push("/dashboard/" + item.label.toLowerCase()); setSearchOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[14px] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.04)] hover:text-white transition-all">
                  <item.icon className="w-4 h-4 text-[rgba(255,255,255,0.3)]" /> {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className={"hidden lg:flex flex-col border-r border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] transition-all duration-300 shrink-0 " + (collapsed ? "w-[72px]" : "w-[260px]")}>
        <SidebarContent />
        <div className="px-3 py-3 border-t border-[rgba(255,255,255,0.04)]">
          <button onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[rgba(255,255,255,0.2)] hover:text-white hover:bg-[rgba(255,255,255,0.03)] transition-all">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /> <span className="text-[11px] font-medium">Collapse</span></>}
          </button>
        </div>
        <div className="relative px-4 py-4 border-t border-[rgba(255,255,255,0.05)]" ref={userMenuRef}>
          <button onClick={() => setShowUserMenu(!showUserMenu)} className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-all">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#4fffb0] to-[#00d4ff] flex items-center justify-center text-xs font-bold text-[#0b0c0f] shrink-0">AD</div>
            {!collapsed && <><div className="flex-1 text-left overflow-hidden"><div className="text-[12px] font-semibold text-white truncate">Admin User</div><div className="text-[10px] text-[rgba(255,255,255,0.25)] truncate">Administrator</div></div><ChevronDown className="w-4 h-4 text-[rgba(255,255,255,0.3)]" /></>}
          </button>
          {showUserMenu && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#14151a] border border-[rgba(255,255,255,0.08)] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden z-50">
              {[{ icon: User, label: "Profile" }, { icon: Settings, label: "Settings" }, { icon: LogOut, label: "Sign Out", danger: true }].map((item, i) => (
                <button key={i} className={"w-full flex items-center gap-3 px-4 py-[11px] text-[13px] font-medium transition-all hover:bg-[rgba(255,255,255,0.03)] " + (item.danger ? "text-[#EF4444]" : "text-[rgba(255,255,255,0.6)] hover:text-white")}>
                  <item.icon className="w-4 h-4" /> {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[150] bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={"fixed top-0 left-0 bottom-0 z-[160] w-[280px] bg-[#0b0c0f] border-r border-[rgba(255,255,255,0.05)] flex flex-col transition-transform duration-300 lg:hidden " + (mobileOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(255,255,255,0.04)]">
          <span className="text-[15px] font-bold text-white">Menu</span>
          <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <SidebarContent mobile />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[56px] border-b border-[rgba(255,255,255,0.04)] flex items-center justify-between px-4 lg:px-6 bg-[rgba(11,12,15,0.7)] backdrop-blur-2xl shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-[12px]">
              <Link href="/dashboard" className="text-[rgba(255,255,255,0.2)] hover:text-white transition-colors no-underline"><LayoutDashboard className="w-[14px] h-[14px]" /></Link>
              <ChevronRight className="w-3 h-3 text-[rgba(255,255,255,0.1)]" />
              <span className="text-white font-semibold capitalize">{getBreadcrumb()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <div className="hidden sm:flex items-center gap-[6px] px-3 py-[5px] rounded-full bg-[rgba(79,255,176,0.06)] border border-[rgba(79,255,176,0.15)]">
              <span className="relative flex h-[6px] w-[6px]"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fffb0] opacity-75" /><span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-[#4fffb0]" /></span>
              <span className="text-[10px] font-bold text-[#4fffb0] uppercase tracking-[0.06em]">3 Live</span>
            </div>
            <button onClick={() => setSearchOpen(true)} className="hidden md:flex items-center gap-2 px-3 py-[6px] rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[11px] text-[rgba(255,255,255,0.3)] hover:border-[rgba(255,255,255,0.12)] hover:text-white transition-all">
              <Search className="w-3.5 h-3.5" /><span>Search...</span><kbd className="ml-1 px-[5px] py-[2px] rounded-[4px] bg-[rgba(255,255,255,0.06)] text-[10px] text-[rgba(255,255,255,0.2)] font-mono">âŒ˜K</kbd>
            </button>

            {/* Notification Bell + Dropdown */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-lg text-[rgba(255,255,255,0.3)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all">
                <Bell className="w-[18px] h-[18px]" />
                {unreadCount > 0 && <span className="absolute top-1 right-1 w-[16px] h-[16px] rounded-full bg-[#EF4444] text-[9px] font-bold text-white flex items-center justify-center">{unreadCount}</span>}
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-[360px] bg-[#14151a] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden z-50">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(255,255,255,0.05)]">
                    <h3 className="text-[14px] font-bold text-white">Notifications</h3>
                    <button onClick={markAllRead} className="text-[11px] font-semibold text-[#4fffb0] hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-[360px] overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className={"flex items-start gap-3 px-5 py-4 border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.02)] transition-colors " + (!n.read ? "bg-[rgba(79,255,176,0.02)]" : "")}>
                        <div className={"w-2 h-2 rounded-full mt-[6px] shrink-0 " + (n.type === "alert" ? "bg-[#EF4444]" : n.type === "milestone" ? "bg-[#f59e0b]" : n.type === "success" ? "bg-[#4fffb0]" : "bg-[#00d4ff]")} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] text-[rgba(255,255,255,0.7)] leading-relaxed">{n.text}</p>
                          <span className="text-[10px] text-[rgba(255,255,255,0.2)]">{n.time}</span>
                        </div>
                        {!n.read && <div className="w-[6px] h-[6px] rounded-full bg-[#4fffb0] shrink-0 mt-[6px]" />}
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-[rgba(255,255,255,0.04)]">
                    <button className="text-[12px] font-semibold text-[rgba(255,255,255,0.4)] hover:text-white transition-all">View all notifications â†’</button>
                  </div>
                </div>
              )}
            </div>

            <Link href="/dashboard/elections/create" className="hidden md:flex items-center gap-[6px] px-4 py-[8px] rounded-[10px] bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[12px] font-bold no-underline hover:opacity-90 hover:-translate-y-[1px] transition-all shadow-[0_0_20px_rgba(79,255,176,0.2)]">
              <Plus className="w-[14px] h-[14px]" /> New
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}