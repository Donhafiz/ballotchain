"use client";

import { useEffect, useRef, useCallback } from "react";

export default function MagicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouse = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf: number;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;

    const orbs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 120 + Math.random() * 180,
      color: ["#6366F1","#8B5CF6","#A855F7","#EC4899","#06B6D4"][i],
      speed: 0.3 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
      pulse: 0,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    }));

    const particles: any[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, size: Math.random() * 2 + 0.5, life: Math.random() });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw orbs
      orbs.forEach((orb, i) => {
        orb.angle += orb.speed * 0.01;
        orb.pulse += orb.pulseSpeed;
        const pulseRadius = orb.radius + Math.sin(orb.pulse) * 30;
        
        // Mouse attraction
        const dx = mouseRef.current.x - orb.x;
        const dy = mouseRef.current.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400) {
          orb.x += dx * 0.003;
          orb.y += dy * 0.003;
        }
        orb.x += Math.cos(orb.angle) * 0.5;
        orb.y += Math.sin(orb.angle) * 0.5;

        // Wrap around
        if (orb.x < -200) orb.x = canvas.width + 200;
        if (orb.x > canvas.width + 200) orb.x = -200;
        if (orb.y < -200) orb.y = canvas.height + 200;
        if (orb.y > canvas.height + 200) orb.y = -200;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, pulseRadius);
        gradient.addColorStop(0, orb.color + "15");
        gradient.addColorStop(0.5, orb.color + "08");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw particles
      particles.forEach((p, idx) => {
        p.x += p.vx; p.y += p.vy;
        p.life += 0.003;
        if (p.life > 1) { p.life = 0; p.x = Math.random() * canvas.width; p.y = Math.random() * canvas.height; }
        const alpha = Math.sin(p.life * Math.PI) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(168,85,247," + alpha + ")";
        ctx.fill();

        // Connect nearby particles
        particles.forEach((p2, j) => {
          if (idx < j) {
            const d = Math.sqrt((p.x-p2.x)**2 + (p.y-p2.y)**2);
            if (d < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = "rgba(168,85,247," + (0.08 * (1 - d/100)) + ")";
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", handleMouse); };
  }, [handleMouse]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }} />;
}