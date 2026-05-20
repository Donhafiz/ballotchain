"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store/AppContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useApp();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setLoading(true); setError("");
    try { await register(form); router.push("/login?registered=true"); }
    catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-800 rounded-2xl text-[13px] text-red-700 dark:text-red-400 font-medium">{error}</div>}
      <div className="grid grid-cols-2 gap-4">
        <Input label="First Name" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="John" required />
        <Input label="Last Name" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Doe" required />
      </div>
      <Input label="Email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" required />
      <Input label="Password" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Min. 8 characters" required />
      <Input label="Confirm Password" type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="Repeat password" required />
      <Button type="submit" variant="primary" className="w-full" size="lg" loading={loading}>Create Account</Button>
    </form>
  );
}