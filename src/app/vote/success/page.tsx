import { Suspense } from "react";
import PaymentSuccessContent from "./PaymentSuccessContent";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030303] flex items-center justify-center"><div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" /></div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
