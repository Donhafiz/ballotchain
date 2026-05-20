"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useBlockchain } from "@/lib/blockchain/BlockchainContext";
import { Wallet, Shield, Link, Vote } from "lucide-react";

export default function BlockchainVote({ election }: { election: any }) {
  const { connected, address, connect, disconnect, switchToPolygon, ballotContract, chainId } = useBlockchain();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const castOnChainVote = async (candidateId: number) => {
    if (!ballotContract) return;
    setLoading(true);
    try {
      const tx = await ballotContract.castVote(election.blockchainId || 0, candidateId);
      await tx.wait();
      setTxHash(tx.hash);
    } catch (err: any) {
      console.error("Vote failed:", err);
    }
    setLoading(false);
  };

  const verifyOnChain = async () => {
    if (!ballotContract) return;
    const voted = await ballotContract.hasVoted(election.blockchainId || 0, address);
    setVerified(voted);
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(139,92,246,0.15)", color: "#A78BFA" }}>
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h3 className="syne" style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Blockchain Voting</h3>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
            {connected ? "Polygon Network • Immutable" : "Connect wallet to enable"}
          </p>
        </div>
      </div>

      {!connected ? (
        <div style={{ textAlign: "center", padding: 20 }}>
          <button onClick={connect} className="btn-purple" style={{ padding: "12px 24px", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer" }}>
            <Wallet className="w-4 h-4 inline mr-2" /> Connect MetaMask
          </button>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 8 }}>Vote on-chain with gasless meta-transactions</p>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "10px 14px", borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "0.5px solid rgba(34,197,94,0.15)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
            <button onClick={disconnect} style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 11 }}>Disconnect</button>
          </div>

          {chainId !== 80001 && (
            <button onClick={switchToPolygon} className="btn-outline" style={{ width: "100%", padding: "10px", borderRadius: 10, fontSize: 12, fontWeight: 600, marginBottom: 12 }}>
              Switch to Polygon Mumbai
            </button>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center" }}>Cast immutable vote on Polygon</p>
            {election.candidates?.map((c: any, i: number) => (
              <button key={c._id} onClick={() => castOnChainVote(i)} disabled={loading}
                className="btn-outline" style={{ width: "100%", padding: "10px", borderRadius: 10, fontSize: 12, fontWeight: 500, display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.7)", border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", cursor: "pointer" }}>
                <span>{c.name}</span>
                <Vote className="w-4 h-4" />
              </button>
            ))}
          </div>

          {txHash && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ padding: 12, borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "0.5px solid rgba(34,197,94,0.15)", textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "#22C55E", fontWeight: 600, margin: 0 }}>✅ Vote recorded on-chain!</p>
              <a href={"https://mumbai.polygonscan.com/tx/" + txHash} target="_blank" style={{ fontSize: 11, color: "#818CF8", textDecoration: "none" }}>
                View on Polygonscan ↗
              </a>
            </motion.div>
          )}

          <button onClick={verifyOnChain} className="btn-blue" style={{ width: "100%", padding: "10px", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "#fff", border: "none", cursor: "pointer", marginTop: 8 }}>
            Verify On-Chain
          </button>
          {verified && <p style={{ fontSize: 12, color: "#22C55E", textAlign: "center", marginTop: 8 }}>✅ Vote verified on blockchain</p>}
        </div>
      )}
    </div>
  );
}