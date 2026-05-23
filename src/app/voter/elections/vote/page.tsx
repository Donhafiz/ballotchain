import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function VotingBoothPage() {
  const VotingBoothContent = require("./VotingBoothContent").default;
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030303] flex items-center justify-center"><div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" /></div>}>
      <VotingBoothContent />
    </Suspense>
  );
}
