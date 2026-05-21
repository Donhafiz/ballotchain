"use client";

import Link from "next/link";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function OfflinePage() {
  const [checking, setChecking] = useState(false);

  const checkConnection = () => {
    setChecking(true);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center p-6">
      <div className="text-center max-w-[440px]">
        <div className="w-20 h-20 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-10 h-10 text-[rgba(255,255,255,0.2)]" />
        </div>
        <h1 className="text-[28px] font-bold text-white mb-3">You're Offline</h1>
        <p className="text-[15px] text-[rgba(255,255,255,0.4)] mb-8">
          Check your internet connection and try again. Some features may be unavailable while offline.
        </p>
        <button
          onClick={checkConnection}
          disabled={checking}
          className="px-6 py-[14px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[14px] font-bold hover:opacity-90 transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${checking ? "animate-spin" : ""}`} />
          {checking ? "Checking..." : "Try Again"}
        </button>
      </div>
    </div>
  );
}
