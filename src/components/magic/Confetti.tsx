"use client";

import { useEffect, useState } from "react";

interface ConfettiPiece {
  x: number; y: number; vx: number; vy: number;
  color: string; size: number; rotation: number; rotationSpeed: number;
}

export default function Confetti({ active = false, duration = 3000 }: { active: boolean; duration?: number }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!active) return;
    setShow(true);
    const colors = ["#6366F1","#8B5CF6","#A855F7","#EC4899","#22C55E","#F59E0B","#06B6D4"];
    const newPieces: ConfettiPiece[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 100,
      vx: (Math.random() - 0.5) * 8,
      vy: 3 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 10,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
    }));
    setPieces(newPieces);

    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [active, duration]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]" style={{ overflow: "hidden" }}>
      {pieces.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            borderRadius: 2,
            transform: `rotate(${p.rotation}deg)`,
            animation: `confetti-fall ${2 + Math.random() * 3}s ease-out forwards`,
            opacity: 0.9,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}