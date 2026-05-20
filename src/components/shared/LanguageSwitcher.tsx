"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n/I18nContext";

export default function LanguageSwitcher() {
  const { language, setLanguage, languages } = useI18n();
  const [open, setOpen] = useState(false);
  const current = languages.find(l => l.code === language);

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
        {current?.flag} {current?.code.toUpperCase()}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
            style={{ position: "absolute", top: "100%", right: 0, marginTop: 4, borderRadius: 12, background: "rgba(15,20,35,0.98)", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", zIndex: 50, minWidth: 160 }}>
            {languages.map(lang => (
              <button key={lang.code} onClick={() => { setLanguage(lang.code); setOpen(false); }}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", width: "100%", border: "none", background: language === lang.code ? "rgba(99,102,241,0.15)" : "transparent", color: language === lang.code ? "#818CF8" : "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500, cursor: "pointer", textAlign: "left" }}>
                <span>{lang.flag}</span> {lang.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}