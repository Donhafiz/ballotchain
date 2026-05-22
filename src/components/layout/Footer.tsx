"use client";
import Link from "next/link";

const footerColumns = [
  { title: "Platform", links: ["Elections", "Results", "Voters", "Analytics", "API"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Contact", "Press Kit"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "GDPR", "Cookies"] },
];

const badges = ["ISO 27001", "SOC 2", "GDPR", "FIPS 140-2"];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.07)] pt-16 pb-9 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 no-underline">
              <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#4fffb0] to-[#00d4ff] flex items-center justify-center font-extrabold text-[13px] text-[#0b0c0f]">BC</div>
              <span className="text-[17px] font-bold">Ballot<span className="text-[#4fffb0]">Chain</span></span>
            </Link>
            <p className="text-[13px] text-[rgba(255,255,255,0.22)] leading-[1.7] max-w-[280px]">The world&apos;s most advanced voting platform. Trusted in 127 countries.</p>
          </div>
          {footerColumns.map((col, i) => (
            <div key={i}>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[rgba(255,255,255,0.22)] mb-4">{col.title}</p>
              <ul className="list-none flex flex-col gap-2">
                {col.links.map((link, j) => (
                  <li key={j}><Link href={`/${link.toLowerCase()}`} className="text-[rgba(255,255,255,0.45)] text-[13px] no-underline hover:text-white transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[rgba(255,255,255,0.07)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center justify-center gap-6 mb-2 md:mb-0 flex-wrap">
            <Link href="/verify" className="flex items-center gap-2 text-xs text-[rgba(255,255,255,0.3)] hover:text-[#4fffb0] transition-colors no-underline">🔒 Blockchain Verified</Link>
            <Link href="/audit" className="flex items-center gap-2 text-xs text-[rgba(255,255,255,0.3)] hover:text-[#4fffb0] transition-colors no-underline">👁 Public Audit</Link>
            <Link href="/verify" className="flex items-center gap-2 text-xs text-[rgba(255,255,255,0.3)] hover:text-[#4fffb0] transition-colors no-underline">🔐 Zero-Knowledge Proofs</Link>
          </div>
          <span className="text-xs text-[rgba(255,255,255,0.2)]">&copy; 2026 BallotChain. Built for free and fair elections worldwide.</span>
          <div className="flex gap-2">
            {badges.map((badge, i) => (
              <span key={i} className="px-[10px] py-1 rounded-full text-[10px] font-semibold border border-[rgba(255,255,255,0.07)] text-[rgba(255,255,255,0.22)]">{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
