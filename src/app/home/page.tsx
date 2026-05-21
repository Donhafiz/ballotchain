"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [progress, setProgress] = useState(0);
  const [faqOpen, setFaqOpen] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      setProgress(pct);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    
    // Animate bars
    setTimeout(() => {
      ["bar1","bar2","bar3"].forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.style.width = [47.3, 33.1, 19.6][i] + "%";
      });
    }, 600);
    
    return () => { window.removeEventListener("scroll", handleScroll); observer.disconnect(); };
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ fontFamily: "var(--sans)", background: "var(--ink)", color: "#fff", minHeight: "100vh" }}>
      <div className="progress-bar" style={{ width: progress + "%" }} />
      
      {/* NAVBAR */}
      <nav className="navbar">
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div className="logo-mark">BC</div>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>Ballot<span style={{ color: "var(--accent)" }}>Chain</span></span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <a href="#features" className="nav-link">Features</a>
          <a href="#how" className="nav-link">How it works</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/login" className="btn-ghost">Sign In</Link>
          <Link href="/register" className="btn-primary">Get Started →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "160px 24px 100px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "80px 80px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)" }} />
        <div style={{ marginBottom: 28 }}>
          <div className="live-badge"><span className="live-dot" />Live · 2,847,391 votes secured today</div>
        </div>
        <h1 style={{ fontSize: "clamp(3.2rem, 6.5vw, 6rem)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.04em", marginBottom: 24 }}>
          Democracy<br />deserves <em style={{ fontFamily: "var(--serif)", fontStyle: "italic", background: "linear-gradient(135deg, var(--accent), var(--accent-2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 400 }}>better</em><br />infrastructure.
        </h1>
        <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.75, maxWidth: 580, margin: "0 auto 40px" }}>
          Enterprise-grade blockchain voting trusted by governments, Fortune 500 companies, and universities across 127 countries.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 80 }}>
          <Link href="/register" className="btn-primary-lg">Start for free →</Link>
          <a href="#how" className="btn-ghost-lg">Watch how it works</a>
        </div>
        <div className="stats-row">
          <div className="stat-item"><span className="stat-val">2.8M+</span><span className="stat-label">Votes Secured</span></div>
          <div className="stat-item"><span className="stat-val">15K+</span><span className="stat-label">Elections Run</span></div>
          <div className="stat-item"><span className="stat-val">127</span><span className="stat-label">Countries</span></div>
          <div className="stat-item"><span className="stat-val">99.99%</span><span className="stat-label">Uptime SLA</span></div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {["ISO 27001","SOC 2 Type II","FIPS 140-2","GDPR Compliant","End-to-End Verifiable","Zero-Knowledge Proofs","AES-256","Blockchain Immutable","AI Fraud Detection","300+ Edge Locations"].map((item, i) => (
            <span key={i} className="marquee-item"><span className="marquee-dot" />{item}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "120px 32px" }}>
        <div className="reveal" style={{ maxWidth: 520, marginBottom: 80 }}>
          <p className="section-label">Capabilities</p>
          <h2 className="section-title">Security that <em>scales</em> with democracy.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { tag: "FIPS 140-2", icon: "🔐", title: "Zero-Knowledge Encryption", desc: "Military-grade AES-256 with zero-knowledge proofs. Votes are cryptographically sealed.", wide: true },
            { tag: "SHA-256", icon: "🔗", title: "Blockchain Immutability", desc: "Every vote cryptographically hashed on-chain.", color: "blue" },
            { tag: "<100ms", icon: "⚡", title: "Real-Time Streaming", desc: "WebSocket-powered live results with sub-100ms latency." },
            { tag: "99.97%", icon: "🤖", title: "AI Fraud Detection", desc: "Deep learning models flag anomalies in real-time.", color: "warm" },
            { tag: "E2E-V", icon: "👁️", title: "End-to-End Verifiability", desc: "Voters verify their ballot independently.", color: "blue" },
            { tag: "300+ POPs", icon: "🌍", title: "Global Edge Network", desc: "300+ edge locations worldwide." },
          ].map((f, i) => (
            <div key={i} className={eat-card reveal} style={f.wide ? { gridColumn: "span 2" } : {}}>
              <div className={eat-tag }>{f.tag}</div>
              <div className={eat-icon }>{f.icon}</div>
              <h3 className="feat-title">{f.title}</h3>
              <p className="feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 32px 120px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {[{ icon: "📱", title: "Mobile-First Voting", desc: "Native app experience for touchscreens." },{ icon: "♿", title: "Full Accessibility", desc: "WCAG 2.1 AA compliant." },{ icon: "🌐", title: "50+ Languages", desc: "Automatic ballot translation." },{ icon: "📊", title: "Advanced Analytics", desc: "Turnout heatmaps and demographics." }].map((f, i) => (
            <div key={i} className="mini-card reveal"><span style={{ fontSize: 22, display: "block", marginBottom: 16 }}>{f.icon}</span><p className="mini-title">{f.title}</p><p className="mini-desc">{f.desc}</p></div>
          ))}
        </div>
      </div>

      <div className="security-ribbon reveal">
        {["🏛️ Government-Grade","🔒 Zero Data Leaks","⚖️ Legally Binding","🛡️ Pen-Tested Monthly","📋 Full Audit Trail"].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 16 }}>{r.split(" ")[0]}</span><span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-2)" }}>{r.split(" ").slice(1).join(" ")}</span></div>
        ))}
      </div>

      <section id="how" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.015)", padding: "100px 32px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <p className="section-label reveal">Live Results</p>
            <h2 className="section-title reveal">Watch votes counted <em>in real time.</em></h2>
          </div>
          <div className="demo-window reveal">
            <div className="demo-titlebar"><span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" /><span style={{ fontSize: 11, color: "var(--muted-2)", marginLeft: 8 }}>BallotChain · Student Body President 2026</span></div>
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                <div><div style={{ fontSize: 15, fontWeight: 700 }}>Student Body President</div><div style={{ fontSize: 11, color: "var(--muted-2)" }}>4,281 voters</div></div>
                <div className="live-badge"><span className="live-dot" />LIVE</div>
              </div>
              {[{ name: "Maya Okonkwo", pct: "47.3%", id: "bar1" },{ name: "James Whitfield", pct: "33.1%", id: "bar2" },{ name: "Priya Rajan", pct: "19.6%", id: "bar3" }].map(c => (
                <div key={c.id} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</span><span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)" }}>{c.pct}</span></div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden" }}><div id={c.id} style={{ height: "100%", borderRadius: 100, background: "linear-gradient(90deg, var(--accent), var(--accent-2))", width: 0, transition: "width 1.5s" }} /></div>
                </div>
              ))}
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
                <div><div style={{ fontSize: 11, color: "var(--muted-2)" }}>Turnout</div><div style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)" }}>78.4%</div></div>
                <button className="btn-ghost" style={{ fontSize: 11, padding: "6px 14px" }}>Verify my vote ↗</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" style={{ maxWidth: 1100, margin: "0 auto", padding: "120px 32px" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}><p className="section-label" style={{ color: "var(--accent-warm)" }}>Pricing</p><h2 className="section-title">Simple, <em>honest</em> pricing.</h2></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.08fr 1fr", gap: 16 }}>
          {[
            { name: "Starter", price: "Free", features: ["500 voters","5 elections","Basic analytics","Email support"], cta: "Start free", btn: "outline" },
            { name: "Professional", price: "", period: "/mo", features: ["10,000 voters","Unlimited elections","Advanced analytics","Priority support","API access","Custom branding"], cta: "Get started →", btn: "green", featured: true },
            { name: "Enterprise", price: "Custom", features: ["Unlimited voters","Dedicated infra","99.99% SLA","24/7 support","On-premise","Security audit"], cta: "Contact sales →", btn: "subtle" },
          ].map((p, i) => (
            <div key={i} className={price-card  reveal}>
              {p.featured && <div className="pop-badge">Most Popular</div>}
              <p className="plan-name">{p.name}</p><div className="plan-price">{p.price}{p.period && <span>{p.period}</span>}</div>
              <div style={{ height: 1, background: "var(--border)", margin: "24px 0" }} />
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>{p.features.map((f, j) => <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.75)" }}><span style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(79,255,176,0.1)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "var(--accent)", flexShrink: 0 }}>✓</span>{f}</li>)}</ul>
              <Link href="/register" className={plan-btn } style={{ width: "100%", textAlign: "center", display: "block", padding: "13px", borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <div style={{ borderTop: "1px solid var(--border)", padding: "120px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}><p className="section-label">Trusted</p><h2 className="section-title">What <em>customers say.</em></h2></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[{ quote: "We ran our national student union election with 87,000 voters. Zero issues.", author: "Kofi Asante", role: "National Student Union, Ghana", initials: "KA" },{ quote: "Board election participation went from 34% to 91%.", author: "Sofia Reyes", role: "TechScale Inc.", initials: "SR" },{ quote: "AI fraud detection flagged three patterns we would never have caught.", author: "Dr. Danielle Moreau", role: "City of Lyon", initials: "DM" }].map((t, i) => (
              <div key={i} className="testi-card reveal">
                <div style={{ color: "var(--accent-warm)", fontSize: 12, marginBottom: 16 }}>★★★★★</div>
                <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #4fffb0, #00d4ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>{t.initials}</div>
                  <div><div style={{ fontSize: 13, fontWeight: 700 }}>{t.author}</div><div style={{ fontSize: 11, color: "var(--muted-2)" }}>{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section id="faq" style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px 120px" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}><p className="section-label">FAQ</p><h2 className="section-title">Common <em>questions.</em></h2></div>
        {[
          { q: "How does blockchain verification work?", a: "Each vote is encrypted and assigned a unique cryptographic hash, anchored to our immutable blockchain." },
          { q: "Can I export results?", a: "Yes. Results export to PDF, CSV, and JSON with cryptographic signatures." },
          { q: "What if a voter loses their link?", a: "Admins can resend secure access links at any time." },
          { q: "Is this suitable for legal elections?", a: "Yes. Enterprise plan includes legal compliance for 40+ jurisdictions." },
          { q: "How does AI detect fraud?", a: "Models analyze patterns, timing, and behavioral signals in real-time." },
        ].map((f, i) => (
          <div key={i} className={aq-item reveal } onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
            <div className="faq-q">{f.q}<span className="faq-arrow">+</span></div>
            <div className="faq-a">{f.a}</div>
          </div>
        ))}
      </section>

      <section style={{ padding: "0 32px 120px" }}>
        <div className="reveal" style={{ maxWidth: 900, margin: "0 auto", borderRadius: 28, background: "rgba(79,255,176,0.03)", border: "1px solid rgba(79,255,176,0.12)", padding: "80px 60px", textAlign: "center" }}>
          <p className="section-label">Get started</p>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, marginBottom: 16 }}>Ready to run your most important vote?</h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Link href="/register" className="btn-primary-lg">Start for free →</Link>
            <a href="#" className="btn-ghost-lg">Talk to sales</a>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "60px 32px 36px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="logo-mark">BC</div>
                <span style={{ fontSize: 17, fontWeight: 700 }}>Ballot<span style={{ color: "var(--accent)" }}>Chain</span></span>
              </div>
            </div>
            {[{ t: "Platform", l: ["Elections","Results","Voters","Analytics","API"] },{ t: "Company", l: ["About","Blog","Careers","Contact"] },{ t: "Legal", l: ["Privacy","Terms","Security","GDPR"] }].map((c, i) => (
              <div key={i}><p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-2)", marginBottom: 16 }}>{c.t}</p><ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>{c.l.map(l => <li key={l}><a href="#" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 13 }}>{l}</a></li>)}</ul></div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>&copy; 2026 BallotChain.</span>
            <div style={{ display: "flex", gap: 8 }}>{["ISO 27001","SOC 2","GDPR","FIPS 140-2"].map(b => <span key={b} style={{ padding: "4px 10px", borderRadius: 100, fontSize: 10, fontWeight: 600, border: "1px solid var(--border)", color: "var(--muted-2)" }}>{b}</span>)}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}