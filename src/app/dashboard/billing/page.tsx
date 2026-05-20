"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const plans = [
  { 
    name: "Starter", 
    price: "Free", 
    amount: 0,
    features: ["500 voters","5 elections/year","Basic analytics","Email support"], 
    plan: "starter",
    popular: false 
  },
  { 
    name: "Professional", 
    price: "₦299,000/yr", 
    amount: 299000,
    features: ["10,000 voters","Unlimited elections","Advanced analytics","Priority support","API access","Custom branding","Audit logs"], 
    plan: "professional",
    popular: true 
  },
  { 
    name: "Enterprise", 
    price: "Custom", 
    amount: 0,
    features: ["Unlimited voters","Dedicated infrastructure","SLA guarantee","24/7 phone support","On-premise option","Custom integrations","Security audit"], 
    plan: "enterprise",
    popular: false 
  },
];

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for successful payment callback
  const success = searchParams.get("success");
  const reference = searchParams.get("reference");

  if (success && reference) {
    // Verify payment
    fetch("/api/payments/checkout?reference=" + reference)
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setMessage("Payment verified! Your " + d.plan + " plan is now active.");
          setMessageType("success");
        }
      });
  }

  const handlePaystackCheckout = async (plan: typeof plans[0]) => {
    if (plan.plan === "enterprise") {
      router.push("/contact");
      return;
    }
    if (plan.plan === "starter") {
      setMessage("Starter plan activated! You can upgrade anytime.");
      setMessageType("success");
      return;
    }

    setLoading(plan.plan);
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plan.plan, email: "user@ballotchain.com", amount: plan.amount }),
      });
      const data = await res.json();
      
      if (data.authorization_url) {
        // Redirect to Paystack checkout page
        window.location.href = data.authorization_url;
      } else {
        setMessage("Payment initialization failed. Please try again.");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Network error. Please check your connection.");
      setMessageType("error");
    }
    setLoading(null);
  };

  return (
    <div style={{ padding: "24px 32px", maxWidth: 900 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Billing & Plans</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Secure payments powered by <strong style={{ color: "#0BA4DB" }}>Paystack</strong></p>
      </div>

      {message && (
        <div style={{ 
          padding: "14px 20px", borderRadius: 12, marginBottom: 20, fontSize: 13, fontWeight: 500,
          background: messageType === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
          border: "1px solid " + (messageType === "success" ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"),
          color: messageType === "success" ? "rgba(34,197,94,0.9)" : "rgba(239,68,68,0.9)",
        }}>
          {messageType === "success" ? "✅ " : "❌ "}{message}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, padding: "10px 16px", borderRadius: 12, background: "rgba(11,164,219,0.08)", border: "1px solid rgba(11,164,219,0.15)" }}>
        <span style={{ fontSize: 20 }}>💳</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0BA4DB" }}>Paystack Secure Payments</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Cards, Bank Transfer, USSD, Apple Pay, Google Pay</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {plans.map((p, i) => (
          <div key={i} className={`glass rounded-2xl p-7 text-center relative ${p.popular ? "ring-1 ring-purple-500/30" : ""}`}>
            {p.popular && (
              <div className="btn-purple" style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "3px 16px", borderRadius: 100, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap" }}>
                Most Popular
              </div>
            )}
            <h3 className="syne" style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginTop: p.popular ? 8 : 0 }}>{p.name}</h3>
            <div className="syne" style={{ fontSize: 32, fontWeight: 800, color: "#fff", margin: "16px 0 4px" }}>{p.price}</div>
            {p.amount > 0 && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>≈ ${(p.amount / 1500).toFixed(0)} USD</div>}
            
            <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 24px", textAlign: "left" }}>
              {p.features.map((f, j) => (
                <li key={j} style={{ padding: "7px 0", fontSize: 12, color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#22C55E", fontWeight: 700 }}>✓</span> {f}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handlePaystackCheckout(p)} 
              disabled={loading === p.plan}
              className={p.popular ? "btn-purple" : p.plan === "starter" ? "btn-outline" : "btn-blue"}
              style={{ width: "100%", padding: "12px", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer", opacity: loading === p.plan ? 0.6 : 1 }}>
              {loading === p.plan ? "Redirecting to Paystack..." : p.plan === "enterprise" ? "Contact Sales" : p.plan === "starter" ? "Get Started Free" : "Subscribe with Paystack"}
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, padding: "16px 20px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 16 }}>🔒</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Secured by Paystack</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>PCI-DSS Level 1 compliant. Your payment information is encrypted and secure.</div>
        </div>
      </div>
    </div>
  );
}