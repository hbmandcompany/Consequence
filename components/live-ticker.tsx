"use client";

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

export function LiveTicker() {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="fade-x-mask overflow-hidden">
      <div className="ticker-marquee flex py-5" style={{ width: "max-content" }}>
        {repeated.map((it, i) => (
          <div
            key={i}
            className="flex items-baseline gap-3 px-8 whitespace-nowrap"
          >
            <span className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">
              {it.l}
            </span>
            <span className="font-display text-[20px] leading-none text-ink tabular">
              {it.v}
            </span>
            <span className="w-1 h-1 rounded-full bg-ink/15 ml-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
