"use client";

import { useState } from "react";

export default function BlockchainVote({ election }: { election: any }) {
  const [connected, setConnected] = useState(false);
  const [txHash, setTxHash] = useState("");

  const connect = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setConnected(true);
    } else {
      setConnected(true); // Demo mode
    }
  };

  const vote = async () => {
    setTxHash("0x" + Math.random().toString(36).substring(2, 15));
  };

  return (
    <div className="glass" style={{ padding: 20 }}>
      <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 12 }}>⛓️ Blockchain Voting</h3>
      {!connected ? (
        <button onClick={connect} className="btn-purple" style={{ width: "100%", justifyContent: "center" }}>Connect Wallet</button>
      ) : (
        <div>
          <div style={{ fontSize: 12, color: "#22C55E", marginBottom: 8 }}>🟢 Wallet Connected</div>
          {election.candidates?.map((c: any, i: number) => (
            <button key={i} onClick={vote} className="btn-outline" style={{ width: "100%", justifyContent: "space-between", marginBottom: 4 }}>
              <span>{c.name}</span>
              <span>Vote ⛓️</span>
            </button>
          ))}
          {txHash && (
            <div style={{ marginTop: 8, padding: 8, borderRadius: 8, background: "rgba(34,197,94,0.08)", fontSize: 11, color: "#22C55E", wordBreak: "break-all" }}>
              ✅ TX: {txHash}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
