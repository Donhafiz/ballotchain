"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/store/AppContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, logout, elections } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname.startsWith("/dashboard");

  const activeElections = elections.filter((e) => e.status === "active").length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={"fixed top-0 left-0 right-0 z-50 transition-all duration-500 " + (scrolled || isDashboard ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-2xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-black/5" : "bg-transparent")}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-xl shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-black text-lg">B</span>
            </div>
            <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Ballot<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Chain</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <Link href="/" className={"px-4 py-2 rounded-xl text-sm font-medium transition-all " + (pathname === "/" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800")}>Home</Link>
            {user && (
              <>
                <Link href="/dashboard" className={"px-4 py-2 rounded-xl text-sm font-medium transition-all " + (pathname === "/dashboard" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800")}>
                  Dashboard
                  {activeElections > 0 && <span className="ml-1.5 px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-[10px] font-bold">{activeElections}</span>}
                </Link>
                <Link href="/dashboard/elections" className={"px-4 py-2 rounded-xl text-sm font-medium transition-all " + (pathname.startsWith("/dashboard/elections") ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800")}>Elections</Link>
                <Link href="/dashboard/results" className={"px-4 py-2 rounded-xl text-sm font-medium transition-all " + (pathname.startsWith("/dashboard/results") ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800")}>Results</Link>
              </>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-500 dark:text-gray-400">👋 {user.firstName}</span>
                <button onClick={() => { logout(); router.push("/"); }} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Sign In</Link>
                <Link href="/register" className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}