"use client";
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownProps {
  endDate: string;
  className?: string;
}

export default function ElectionCountdown({ endDate, className = "" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setIsExpired(true);
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (isExpired) {
    return <span className={`inline-flex items-center gap-2 text-[#EF4444] text-sm font-semibold ${className}`}><Clock className="w-4 h-4" /> Ended</span>;
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <Clock className="w-4 h-4 text-[#f59e0b]" />
      <div className="flex items-center gap-2 text-sm font-mono font-bold">
        {timeLeft.days > 0 && <span>{timeLeft.days}d</span>}
        <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
        <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
        <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
      </div>
    </div>
  );
}
