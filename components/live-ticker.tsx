"use client";

import { useEffect, useState } from "react";

const items = [
  { l: "EVENTS / SEC", v: "12,408" },
  { l: "ACTIVE TWINS", v: "8,612,304" },
  { l: "INFERENCE p99", v: "47ms" },
  { l: "GPU UTIL", v: "84%" },
  { l: "SETTLEMENTS / DAY", v: "$1.84M" },
  { l: "REGIONS", v: "AMS · WAW · BKLN" },
  { l: "MODELS LIVE", v: "112" },
  { l: "SIMULATIONS / DAY", v: "9,420" },
  { l: "MEDIAN SPLIT", v: "9.4s" },
  { l: "QUEUE DEPTH", v: "0.02" },
];

function MetricCell({ it }: { it: (typeof items)[number] }) {
  return (
    <div className="flex items-baseline gap-3 whitespace-nowrap">
      <span className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">{it.l}</span>
      <span className="font-display text-[20px] leading-none text-ink tabular">{it.v}</span>
    </div>
  );
}

/** Marquee of live-style metrics; static wrap when prefers-reduced-motion. */
export function LiveTicker() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (reduced) {
    return (
      <div className="py-5 px-4" role="presentation">
        <div className="mx-auto max-w-[1480px] flex flex-wrap justify-center gap-x-10 gap-y-4">
          {items.map((it) => (
            <MetricCell key={it.l} it={it} />
          ))}
        </div>
      </div>
    );
  }

  const repeated = [...items, ...items, ...items];
  return (
    <div className="fade-x-mask overflow-hidden min-h-[3.25rem]" role="presentation">
      <div className="ticker-marquee flex items-center py-5" style={{ width: "max-content" }}>
        {repeated.map((it, i) => (
          <div key={i} className="flex items-baseline gap-3 px-8 whitespace-nowrap">
            <span className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">{it.l}</span>
            <span className="font-display text-[20px] leading-none text-ink tabular">{it.v}</span>
            <span className="w-1 h-1 rounded-full bg-ink/15 ml-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
