"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store/AppContext";

export default function RootPage() {
  const { user } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/home");
    }
  }, [user, router]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050714" }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "#6366F1", animation: "spin 0.8s linear infinite" }} />
    </div>
  );
}