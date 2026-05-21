"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    router.push(token ? "/dashboard" : "/home");
  }, []);
  return <div style={{ minHeight: "100vh", background: "#0a0a14" }} />;
}
