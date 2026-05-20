"use client";

import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "Elections", href: "/dashboard/elections" },
        { label: "Live Results", href: "/dashboard/results" },
        { label: "Voter Management", href: "/dashboard/voters" },
        { label: "Analytics", href: "/dashboard/reports" },
        { label: "API", href: "/docs" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Government", href: "/solutions/government" },
        { label: "Enterprise", href: "/solutions/enterprise" },
        { label: "Education", href: "/solutions/education" },
        { label: "Nonprofits", href: "/solutions/nonprofits" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Security", href: "/security" },
        { label: "Compliance", href: "/compliance" },
        { label: "GDPR", href: "/gdpr" },
      ],
    },
  ];

  return (
    <footer style={{ background: "linear-gradient(180deg, rgba(10,10,20,0.98), rgba(10,10,20,0.95))", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 10 }}>
      {/* Gradient accent line */}
      <div style={{ height: 2, background: "linear-gradient(90deg, #6366F1, #8B5CF6, #A855F7, #EC4899)" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 32px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40 }}>
          {/* Brand Column */}
          <div>
            <Link href="/home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 20 }}>
              <div className="btn-purple" style={{ width: 38, height: 38, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0 }}>BC</div>
              <span className="syne" style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Ballot<span style={{ color: "#818CF8" }}>Chain</span></span>
            </Link>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: 24, maxWidth: 280 }}>
              The world&apos;s most advanced voting platform. Enterprise-grade security, blockchain verification, and AI-powered fraud detection.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { icon: "X", href: "#" },
                { icon: "GH", href: "#" },
                { icon: "LI", href: "#" },
                { icon: "EM", href: "#" },
              ].map((s, i) => (
                <a key={i} href={s.href} style={{ width: 34, height: 34, borderRadius: 10, border: "0.5px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)"; (e.target as HTMLElement).style.color = "#818CF8"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col, i) => (
            <div key={i}>
              <h4 className="syne" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 20 }}>{col.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.href} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.target as HTMLElement).style.color = "#fff"}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)"}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{ marginTop: 48, paddingTop: 28, borderTop: "0.5px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>&copy; 2026 BallotChain. All rights reserved. Built for free and fair elections worldwide.</p>
          <div style={{ display: "flex", gap: 16, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} /> SOC 2 Type II</span>
            <span>ISO 27001</span>
            <span>99.99% Uptime SLA</span>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}