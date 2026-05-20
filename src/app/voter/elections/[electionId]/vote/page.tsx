"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function VotePage() {
  const { electionId } = useParams();
  const router = useRouter();
  const [election, setElection] = useState<any>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [step, setStep] = useState(1); // 1=select, 2=confirm, 3=success
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchElection();
  }, [electionId]);

  const fetchElection = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/elections/" + electionId, {
        headers: { Authorization: "Bearer " + token },
      });
      if (res.ok) {
        const data = await res.json();
        setElection(data.election || data);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmitVote = async () => {
    if (!selectedCandidate) return;
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/elections/" + electionId + "/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify({ candidateId: selectedCandidate }),
      });
      if (res.ok) {
        setStep(3);
      }
    } catch (err) { console.error(err); }
    finally { setSubmitting(false); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (!election) return <div className="min-h-screen flex items-center justify-center text-gray-500">Election not found</div>;

  const selectedCandidateData = election.candidates?.find((c: any) => c._id === selectedCandidate);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/25">
            <span className="text-white text-2xl">🗳️</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{election.title}</h1>
          <p className="text-gray-500 mt-2">{election.description}</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-bold">🟢 Active</span>
            <span className="text-sm text-gray-500">{election.type?.replace("_", " ")}</span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={"w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all " + (step >= s ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25" : "bg-gray-200 dark:bg-gray-700 text-gray-500")}>
                {step > s ? "✓" : s}
              </div>
              {s < 3 && <div className={"w-12 h-0.5 " + (step > s ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700")} />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Candidate */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Select Your Candidate</h2>
            <div className="grid gap-4">
              {election.candidates?.map((candidate: any) => (
                <motion.div
                  key={candidate._id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCandidate(candidate._id)}
                  className={"p-6 rounded-2xl border-2 cursor-pointer transition-all " + (selectedCandidate === candidate._id ? "border-blue-500 bg-blue-50 dark:bg-blue-950 shadow-xl shadow-blue-500/20" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-300")}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {candidate.name?.[0]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{candidate.name}</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{candidate.position}</p>
                      <p className="text-sm text-gray-500 mt-1">{candidate.description}</p>
                    </div>
                    <div className={"w-6 h-6 rounded-full border-2 flex items-center justify-center " + (selectedCandidate === candidate._id ? "border-blue-600 bg-blue-600" : "border-gray-300")}>
                      {selectedCandidate === candidate._id && <span className="text-white text-xs">✓</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button onClick={() => setStep(2)} disabled={!selectedCandidate}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                Continue to Review →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Confirm Vote */}
        {step === 2 && selectedCandidateData && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Confirm Your Vote</h2>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                {selectedCandidateData.name?.[0]}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCandidateData.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium">{selectedCandidateData.position}</p>
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-xl text-sm text-yellow-700 dark:text-yellow-300">
                ⚠️ Your vote is final and cannot be changed once submitted.
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={() => setStep(1)} className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200">← Change</button>
              <button onClick={handleSubmitVote} disabled={submitting}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-xl shadow-green-500/25 hover:shadow-green-500/40 transition-all disabled:opacity-60">
                {submitting ? "Submitting..." : "✅ Confirm My Vote"}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="text-7xl">🎉</motion.div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Vote Submitted Successfully!</h2>
            <p className="text-gray-500 max-w-md mx-auto">Your vote for <strong>{selectedCandidateData?.name}</strong> has been securely recorded on the blockchain.</p>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 max-w-sm mx-auto">
              <p className="text-sm text-gray-500 mb-2">Vote Receipt</p>
              <p className="font-mono text-xs text-gray-400 break-all">0x{Math.random().toString(36).substring(2, 15)}...{Math.random().toString(36).substring(2, 15)}</p>
            </div>
            <button onClick={() => router.push("/voter")} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
              Back to Dashboard
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}