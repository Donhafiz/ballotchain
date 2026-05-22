"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Vote } from "lucide-react";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={"fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300 " + (scrolled ? "bg-[rgba(11,12,15,0.85)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.07)]" : "bg-transparent")}>
        <Link href="/" className="flex items-center gap-3 no-underline z-[110]">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#4fffb0] to-[#00d4ff] flex items-center justify-center font-extrabold text-[13px] text-[#0b0c0f]">BC</div>
          <span className="text-[17px] font-bold tracking-[-0.02em]">Ballot<span className="text-[#4fffb0]">Chain</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-[rgba(255,255,255,0.45)] text-[13px] font-medium no-underline hover:text-white transition-colors">{link.label}</a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/vote" className="px-4 py-[9px] rounded-[10px] bg-transparent border border-[rgba(79,255,176,0.2)] text-[#4fffb0] text-[13px] font-semibold no-underline hover:bg-[rgba(79,255,176,0.05)] transition-all flex items-center gap-1.5">
            <Vote className="w-3.5 h-3.5" /> Vote
          </Link>
          <Link href="/login" className="px-5 py-[9px] rounded-[10px] bg-transparent border border-[rgba(255,255,255,0.07)] text-[rgba(255,255,255,0.7)] text-[13px] font-medium no-underline hover:border-[rgba(255,255,255,0.15)] hover:text-white hover:bg-[rgba(255,255,255,0.03)] transition-all">Sign In</Link>
          <Link href="/register" className="px-[18px] py-[9px] rounded-[10px] bg-[#4fffb0] text-[#0b0c0f] text-[13px] font-bold tracking-[-0.02em] no-underline hover:opacity-[0.88] hover:-translate-y-px transition-all">Get Started</Link>
        </div>

        <button className="md:hidden z-[110] p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0b0c0f] flex flex-col justify-center items-center md:hidden">
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-xl font-semibold text-[rgba(255,255,255,0.7)] no-underline hover:text-white transition-colors">{link.label}</a>
            ))}
          </nav>
          <div className="flex flex-col gap-3 mt-8 w-56">
            <Link href="/vote" onClick={() => setMobileOpen(false)} className="w-full py-3 rounded-xl text-center bg-transparent border border-[rgba(79,255,176,0.2)] text-[#4fffb0] text-[15px] font-semibold no-underline hover:bg-[rgba(79,255,176,0.05)] transition-all">Vote Now</Link>
            <Link href="/login" onClick={() => setMobileOpen(false)} className="w-full py-3 rounded-xl text-center bg-transparent border border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.7)] text-[15px] font-medium no-underline hover:text-white transition-all">Sign In</Link>
            <Link href="/register" onClick={() => setMobileOpen(false)} className="w-full py-3 rounded-xl text-center bg-[#4fffb0] text-[#0b0c0f] text-[15px] font-bold no-underline hover:opacity-[0.88] transition-all">Get Started</Link>
          </div>
          <div className="absolute bottom-10 text-[rgba(255,255,255,0.1)] text-xs tracking-[0.2em] uppercase">BallotChain</div>
        </div>
      )}
    </>
  );
}
