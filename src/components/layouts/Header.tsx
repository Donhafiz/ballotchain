"use client";

import React from "react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  status?: {
    label: string;
    tone?: "success" | "warning" | "danger" | "neutral";
  };
}

const statusStyles = {
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  danger: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  neutral: "bg-gray-500/10 text-gray-500 dark:text-gray-400 border-gray-500/20",
};

export default function Header({ title, subtitle, actions, breadcrumbs, status }: HeaderProps) {
  return (
    <div className="flex items-start justify-between gap-6" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
      
      {/* LEFT */}
      <div style={{ minWidth: 0, flex: 1 }}>
        
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "rgba(248,250,252,0.35)", marginBottom: 8 }}>
            {breadcrumbs.map((crumb, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {crumb.href ? (
                  <a href={crumb.href} style={{ color: "rgba(248,250,252,0.35)", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = "rgba(248,250,252,0.92)"}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = "rgba(248,250,252,0.35)"}>
                    {crumb.label}
                  </a>
                ) : (
                  <span style={{ color: "rgba(248,250,252,0.7)", fontWeight: 500 }}>{crumb.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span style={{ color: "rgba(248,250,252,0.2)" }}>/</span>}
              </div>
            ))}
          </nav>
        )}

        {/* TITLE ROW */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <h1 className="syne" style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 600, color: "rgba(248,250,252,0.92)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {title}
          </h1>

          {/* STATUS PILL */}
          {status && (
            <span style={{
              fontSize: 10, padding: "3px 10px", borderRadius: 100, fontWeight: 600,
              background: status.tone === "success" ? "rgba(34,197,94,0.1)" : status.tone === "warning" ? "rgba(245,158,11,0.1)" : status.tone === "danger" ? "rgba(239,68,68,0.1)" : "rgba(248,250,252,0.06)",
              color: status.tone === "success" ? "rgba(34,197,94,0.9)" : status.tone === "warning" ? "rgba(245,158,11,0.9)" : status.tone === "danger" ? "rgba(239,68,68,0.9)" : "rgba(248,250,252,0.5)",
              border: "0.5px solid " + (status.tone === "success" ? "rgba(34,197,94,0.2)" : status.tone === "warning" ? "rgba(245,158,11,0.2)" : status.tone === "danger" ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.08)"),
            }}>
              {status.label}
            </span>
          )}
        </div>

        {/* SUBTITLE */}
        {subtitle && (
          <p style={{ marginTop: 8, fontSize: 13, color: "rgba(248,250,252,0.35)", lineHeight: 1.6, maxWidth: 600 }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* RIGHT ACTIONS */}
      {actions && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {actions}
        </div>
      )}
    </div>
  );
}

// Export button variants
export function HeaderButton({ children, variant = "ghost", onClick }: { children: React.ReactNode; variant?: "primary" | "ghost" | "soft"; onClick?: () => void }) {
  const variants = {
    primary: { background: "#6366F1", color: "#fff", border: "none", boxShadow: "0 0 20px rgba(99,102,241,0.25)" },
    ghost: { background: "transparent", color: "rgba(248,250,252,0.6)", border: "none" },
    soft: { background: "rgba(255,255,255,0.05)", color: "rgba(248,250,252,0.8)", border: "0.5px solid rgba(255,255,255,0.08)" },
  };

  const v = variants[variant] as any;

  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px",
      fontSize: 12, fontWeight: 500, borderRadius: 8, cursor: "pointer",
      transition: "all 0.2s", border: v.border, background: v.background, color: v.color, boxShadow: v.boxShadow,
    }}
      onMouseEnter={(e) => { if (variant === "ghost") (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
      onMouseLeave={(e) => { if (variant === "ghost") (e.target as HTMLElement).style.background = "transparent"; }}>
      {children}
    </button>
  );
}
