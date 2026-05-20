"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingOrbsProps {
  count?: number;
  colors?: string[];
}

export default function FloatingOrbs({ count = 5, colors = ["#6366F1","#8B5CF6","#A855F7","#EC4899","#06B6D4"] }: FloatingOrbsProps) {
  const [orbs, setOrbs] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOrbs(Array.from({ length: count }, (_, i) => ({
      id: i,
      width: 60 + (i * 37) % 180,
      height: 60 + (i * 53) % 180,
      left: (i * 23) % 90,
      top: (i * 31) % 85,
      color: colors[i % colors.length],
      xRange: 80 + (i * 17) % 120,
      yRange: 60 + (i * 29) % 100,
      duration: 8 + (i * 3) % 10,
    })));
  }, [count]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.width,
            height: orb.height,
            left: orb.left + "%",
            top: orb.top + "%",
            background: "radial-gradient(circle, " + orb.color + "20 0%, transparent 70%)",
          }}
          animate={{
            x: [0, orb.xRange, 0, -orb.xRange/2, 0],
            y: [0, -orb.yRange/2, orb.yRange, 0, 0],
            scale: [1, 1.15, 0.95, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}