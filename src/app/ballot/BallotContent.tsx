"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Printer, Shield, Vote } from "lucide-react";

export default function BallotContent() {
  const searchParams = useSearchParams();
  const electionId = searchParams.get("id") || "";
  const [election, setElection] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    if (electionId) {
      fetch("/api/elections").then(r => r.json()).then(data => {
        const found = data.elections?.find((e: any) => e._id === electionId);
        if (found) {
          setElection(found);
          const all: any[] = [];
          found.positions?.forEach((p: any) => p.candidates?.forEach((c: any) => all.push({...c, position: p.title})));
          setCandidates(all);
        }
      }).catch(() => {});
    }
  }, [electionId]);

  return (
    <div className="min-h-screen bg-white text-black p-8 print:p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 border-b-2 border-black pb-4">
          <h1 className="text-3xl font-black">OFFICIAL BALLOT</h1>
          <p className="text-lg mt-2">{election?.title || "Election"}</p>
          <p className="text-sm text-gray-600">BallotChain Verified · {new Date().toLocaleDateString()}</p>
        </div>
        <div className="space-y-3">
          {candidates.map((c, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-2 border-black rounded">
              <div className="w-8 h-8 border-2 border-black rounded flex items-center justify-center text-lg font-bold">{i + 1}</div>
              <div><div className="text-lg font-bold">{c.name}</div><div className="text-sm text-gray-600">{c.position}</div></div>
            </div>
          ))}
        </div>
        <button onClick={() => window.print()} className="mt-8 w-full py-3 bg-black text-white font-bold rounded print:hidden flex items-center justify-center gap-2"><Printer className="w-4 h-4" /> Print Ballot</button>
      </div>
    </div>
  );
}
