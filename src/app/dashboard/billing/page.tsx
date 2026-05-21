import Link from "next/link";

export default function BillingPage() {
  return (
    <div>
      <h1 className="syne" style={{ fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Billing & Plans</h1>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Manage your subscription</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {[
          { name: "Starter", price: "Free", features: ["500 voters","5 elections","Basic analytics"], cta: "Current Plan", current: true },
          { name: "Professional", price: "$299/mo", features: ["10,000 voters","Unlimited elections","Advanced analytics","Priority support","API access"], cta: "Upgrade", popular: true },
          { name: "Enterprise", price: "Custom", features: ["Unlimited voters","Dedicated infra","SLA guarantee","24/7 support"], cta: "Contact Sales" },
        ].map((p, i) => (
          <div key={i} className={`glass ${p.popular ? "card-purple" : ""}`} style={{ padding: 28, textAlign: "center", position: "relative" }}>
            {p.popular && <div className="btn-purple" style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 16px", borderRadius: 100, fontSize: 10, fontWeight: 700 }}>Most Popular</div>}
            <h3 className="syne" style={{ fontSize: 18, fontWeight: 700, marginTop: p.popular ? 8 : 0 }}>{p.name}</h3>
            <div className="syne" style={{ fontSize: 32, fontWeight: 800, margin: "16px 0 4px" }}>{p.price}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 24px", textAlign: "left" }}>{p.features.map((f, j) => <li key={j} style={{ padding: "6px 0", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>✓ {f}</li>)}</ul>
            <button className={p.current ? "btn-outline" : p.popular ? "btn-purple" : "btn-blue"} style={{ width: "100%", justifyContent: "center" }}>{p.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
