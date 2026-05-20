"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

const ToastContext = createContext<{ toast: (message: string, type?: Toast["type"]) => void }>({ toast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Math.random().toString(36).substring(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const colors: Record<string, { bg: string; border: string; icon: string }> = {
    success: { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)", icon: "✅" },
    error: { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)", icon: "❌" },
    warning: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", icon: "⚠️" },
    info: { bg: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.3)", icon: "ℹ️" },
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 300, display: "flex", flexDirection: "column", gap: 8 }}>
        <AnimatePresence>
          {toasts.map(t => {
            const c = colors[t.type];
            return (
              <motion.div key={t.id} initial={{ opacity: 0, x: 100, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 100, scale: 0.9 }}
                style={{ padding: "12px 18px", borderRadius: 14, background: c.bg, border: "1px solid " + c.border, color: "#fff", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, minWidth: 280, backdropFilter: "blur(10px)", cursor: "pointer" }}
                onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}>
                <span>{c.icon}</span> {t.message}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);