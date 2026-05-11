"use client";

const stops = [
  {
    n: "1M",
    sub: "MVP · Q3 2026",
    bullets: [
      "1 primary cluster · 20-40 nodes · composers, listeners, $1.84M/day settlements",
      "Kafka 6 brokers · sub-100k ev/s — plays + carts + splits",
      "Behavioral + earnings models live, single rollout plane",
      "Mongo at 10 shards — catalog twins + ledger projections",
    ],
  },
  {
    n: "10M",
    sub: "Plateau · 2027",
    bullets: [
      "Kafka 12-24 brokers, repartitioned per composition and creator",
      "Multi-cluster, regional split — ranking + fraud + payout paths",
      "Inference at hundreds of GPU pods — feed, stems, royalty risk",
      "ClickHouse cluster broadens — time-travel earnings + A/B experiments",
    ],
  },
  {
    n: "100M",
    sub: "Industrial · 2028+",
    bullets: [
      "Multi-region active-active",
      "Edge inference for marketplace feed + real-time capital flow monitoring",
      "Federated databases, graph for collaboration + ownership lineage",
      "Dedicated platform team per pillar — creative, capital, safety",
    ],
  },
];

export function ScalePath() {
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-[34px] h-px bg-ink/15" />
      <div className="absolute left-0 right-0 top-[34px] h-px bg-tiff/60" style={{ width: "33.3%" }} />

      <div className="grid grid-cols-3 gap-6">
        {stops.map((s, i) => (
          <div key={s.n} className="relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-3.5 h-3.5 rounded-full bg-snow-0 border-2 border-ink" />
              <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">
                {s.sub}
              </div>
            </div>
            <div className="font-display text-[clamp(64px,8vw,128px)] leading-none tracking-tightest-2 tabular">
              {s.n}
              <span className="text-ink/40 text-[0.4em] ml-2">users</span>
            </div>
            <ul className="mt-8 space-y-2 border-l border-ink/15 pl-5">
              {s.bullets.map((b) => (
                <li key={b} className="text-[13px] text-ink/70">{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
