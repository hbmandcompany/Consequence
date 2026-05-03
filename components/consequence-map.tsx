"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

// Deterministic node positions for SSR stability
function seedRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function ConsequenceMap() {
  const nodes = useMemo(() => {
    const rand = seedRandom(7);
    return Array.from({ length: 36 }, (_, i) => ({
      id: i,
      x: 8 + rand() * 84,
      y: 8 + rand() * 84,
      r: 1 + rand() * 2.4,
      delay: rand() * 4,
    }));
  }, []);

  const edges = useMemo(() => {
    const rand = seedRandom(19);
    const list: { a: number; b: number }[] = [];
    for (let i = 0; i < 22; i++) {
      const a = Math.floor(rand() * 36);
      let b = Math.floor(rand() * 36);
      if (a === b) b = (b + 1) % 36;
      list.push({ a, b });
    }
    return list;
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Engraved frame */}
      <div className="absolute inset-3 border border-ink/10" />
      <div className="absolute inset-5 border border-ink/[0.04]" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7FD4CC" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#7FD4CC" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7FD4CC" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {/* Mondrian guides */}
        <line x1="33" y1="0" x2="33" y2="100" stroke="#0A0A0A" strokeOpacity="0.04" strokeWidth="0.2" />
        <line x1="67" y1="0" x2="67" y2="100" stroke="#0A0A0A" strokeOpacity="0.04" strokeWidth="0.2" />
        <line x1="0" y1="40" x2="100" y2="40" stroke="#0A0A0A" strokeOpacity="0.04" strokeWidth="0.2" />
        <line x1="0" y1="72" x2="100" y2="72" stroke="#0A0A0A" strokeOpacity="0.04" strokeWidth="0.2" />

        {edges.map((e, i) => {
          const a = nodes[e.a];
          const b = nodes[e.b];
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#0A0A0A"
              strokeOpacity="0.12"
              strokeWidth="0.18"
            />
          );
        })}

        {/* A few accent edges (Tiffany) */}
        {edges.slice(0, 5).map((e, i) => {
          const a = nodes[e.a];
          const b = nodes[e.b];
          return (
            <line
              key={`acc-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#edge)"
              strokeWidth="0.4"
            />
          );
        })}

        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={n.r} fill="#0A0A0A" opacity="0.85" />
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.r * 2.4}
              fill="none"
              stroke="#7FD4CC"
              strokeWidth="0.22"
              initial={{ opacity: 0.0, scale: 1 }}
              animate={{ opacity: [0, 0.6, 0], scale: [1, 2.4, 3.4] }}
              transition={{
                duration: 3.6,
                delay: n.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
          </g>
        ))}

        {/* Crosshair */}
        <g>
          <circle cx="50" cy="50" r="2.4" fill="none" stroke="#0A0A0A" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="1.2" fill="#B89968" />
          <line x1="50" y1="38" x2="50" y2="62" stroke="#0A0A0A" strokeOpacity="0.35" strokeWidth="0.2" />
          <line x1="38" y1="50" x2="62" y2="50" stroke="#0A0A0A" strokeOpacity="0.35" strokeWidth="0.2" />
        </g>
      </svg>
    </div>
  );
}
