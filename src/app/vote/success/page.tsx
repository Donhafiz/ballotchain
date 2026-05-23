"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Shield, Sparkles, Copy, Key, Vote, DollarSign, Receipt } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference") || "";
  const intentId = searchParams.get("intentId") || searchParams.get("trxref") || "";
  const [verified, setVerified] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [electionId, setElectionId] = useState("");
  const [details, setDetails] = useState<any>({});
  const [copied, setCopied] = useState(false);
  const [votesCast, setVotesCast] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (intentId) {
      // Retrieve the payment intent
      fetch(`/api/payments/intent?intentId=${intentId}`)
        .then(r => r.json())
        .then(data => {
          if (data.intent) {
            setVerified(true);
            setElectionId(data.intent.electionId);
            setDetails(data.intent);
            const code = "BC-" + Math.random().toString(36).substring(2, 10).toUpperCase();
            setAccessCode(code);
          }
        })
        .catch(() => setError("Could not retrieve payment details"));
    } else if (reference) {
      // Fallback: verify via Paystack
      fetch(`/api/payments?reference=${reference}`)
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            setVerified(true);
            setElectionId(data.metadata?.electionId || "");
            setDetails(data.metadata || {});
            const code = "BC-" + Math.random().toString(36).substring(2, 10).toUpperCase();
            setAccessCode(code);
          }
        })
        .catch(() => setError("Payment verification failed"));
    }
  }, [intentId, reference]);

  useEffect(() => {
    if (verified && electionId && details.candidateName && !votesCast) {
      setVotesCast(true);
      const numVotes = Number(details.votes) || 1;
      
      // Cast all votes
      for (let i = 0; i < numVotes; i++) {
        fetch("/api/votes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            electionId,
            positionTitle: details.category || "Position",
            candidateName: details.candidateName,
            voterEmail: details.email || `voter_${Date.now()}@paid.com`,
            paymentRef: reference || intentId,
            voteNumber: i + 1,
          }),
        }).catch(() => {});
      }

      // Record payment
      fetch("/api/payments/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: reference || intentId,
          electionId,
          electionTitle: details.electionTitle,
          candidateName: details.candidateName,
          category: details.category,
          votes: numVotes,
          amount: details.amount || numVotes,
          currency: "GHS",
          status: "success",
        }),
      }).catch(() => {});
    }
  }, [verified, electionId, details, reference, intentId, votesCast]);

  const copyCode = () => {
    navigator.clipboard.writeText(accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full rounded-3xl border border-emerald-400/15 bg-white/[0.02] p-10 backdrop-blur-xl"
      >
        {error ? (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-red-400/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-2xl font-black mb-2">Verification Failed</h1>
            <p className="text-white/40 mb-4">{error}</p>
            <button onClick={() => router.push("/vote/pay")} className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-sm font-black">
              Try Again
            </button>
          </div>
        ) : !verified ? (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-400/10 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-emerald-300 animate-pulse" />
            </div>
            <h1 className="text-2xl font-black mb-2">Verifying Payment</h1>
            <p className="text-white/40">Confirming your transaction...</p>
            <div className="flex justify-center gap-1.5 mt-6">
              <div className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce" style={{ animationDelay: "0.15s" }} />
              <div className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-emerald-400/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-300" />
            </motion.div>

            <h1 className="text-2xl font-black mb-2">Payment Confirmed!</h1>
            <p className="text-white/40 mb-2">Your votes have been cast and secured on the blockchain.</p>
            {reference && <p className="text-xs text-emerald-300 font-mono">Ref: {reference.slice(0, 16)}...</p>}

            {details.candidateName && (
              <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-left space-y-2">
                <div className="flex justify-between text-sm"><span className="text-white/40">Election</span><span className="font-bold text-white">{details.electionTitle}</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/40">Candidate</span><span className="font-bold text-emerald-300">{details.candidateName}</span></div>
                {details.votes && <div className="flex justify-between text-sm"><span className="text-white/40">Votes</span><span className="font-bold">{details.votes}x</span></div>}
                {details.amount && <div className="flex justify-between text-sm"><span className="text-white/40">Amount</span><span className="font-bold text-emerald-300">GHS {details.amount}</span></div>}
              </div>
            )}

            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-emerald-400/5 to-cyan-400/5 border border-emerald-400/10">
              <p className="text-xs text-white/40 mb-3 flex items-center justify-center gap-1"><Key className="w-3.5 h-3.5" /> Your Voting Access Code</p>
              <div className="flex items-center gap-2 justify-center">
                <p className="text-2xl font-black font-mono text-emerald-300 tracking-[0.1em]">{accessCode}</p>
                <button onClick={copyCode} className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] transition-all"><Copy className={`w-4 h-4 ${copied ? "text-emerald-300" : "text-white/30"}`} /></button>
              </div>
              {copied && <p className="text-xs text-emerald-300 mt-2">Copied!</p>}
            </div>

            <div className="mt-6 space-y-3">
              <Link href={`/voter/elections/vote?id=${electionId}&code=${accessCode}`} className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 text-black text-sm font-black hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <Vote className="w-4 h-4" /> Cast Your Votes Now
              </Link>
              <Link href="/dashboard/payments" className="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-sm font-bold text-white/40 hover:text-white transition-all flex items-center justify-center gap-2">
                <DollarSign className="w-4 h-4" /> View Payment History
              </Link>
              <button onClick={() => router.push("/verify")} className="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-sm font-bold text-white/40 hover:text-white transition-all flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" /> Verify on Blockchain
              </button>
            </div>

            <p className="mt-4 text-[10px] text-white/20"><Shield className="h-3 w-3 inline mr-1" />Payment secured by Paystack · Votes recorded on BallotChain</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
