"use client";

import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Calculator,
  CircleCheck,
  Cpu,
  Database,
  Layers,
  Link2,
  ShoppingCart,
  Sparkles,
  Timer,
} from "lucide-react";
import { useState } from "react";

const layers = [
  {
    n: "Application",
    id: "07",
    tag: "Surfaces",
    desc: "Trending · WorkSpace · partner APIs · admin tools · royalty surfaces",
    accent: "ink",
  },
  {
    n: "Digital Twin",
    id: "06",
    tag: "Twin layer",
    desc: "Living state of every composition, creator, marketplace edge, and capital leg — probabilistic, queryable, sharded by entity",
    accent: "tiff",
  },
  {
    n: "Simulation",
    id: "05",
    tag: "Argo + Ray",
    desc: "Monte Carlo · agent-based · discrete-event · RL — 10,000-pod parallelism on demand",
    accent: "ink",
  },
  {
    n: "Inference",
    id: "04",
    tag: "Triton · GPU",
    desc: "p99 < 50ms · MIG partitioning · canary + shadow + auto-rollback",
    accent: "gold",
  },
  {
    n: "Data",
    id: "03",
    tag: "Storage",
    desc: "Kafka · MongoDB · Qdrant · ClickHouse · PostgreSQL · Redis · MinIO",
    accent: "ink",
  },
  {
    n: "Orchestration",
    id: "02",
    tag: "Kubernetes",
    desc: "Multi-cluster · Istio mesh · GitOps via Argo CD · CSI · cluster autoscaler",
    accent: "ink",
  },
  {
    n: "Infrastructure",
    id: "01",
    tag: "Compute",
    desc: "Hetzner bare-metal · NVIDIA H100 / L40S · NVMe local · Ceph shared · S3 archival",
    accent: "ink",
  },
];

/** End-to-end trace: Velvet Clip · $15 USDC on consequence.cc */
const royaltyFlow = [
  {
    n: "01",
    t: "Marketplace purchase",
    d: "Buyer $15 USDC · composition “Velvet Clip” · ownership 60% / 30% / 10% (A/B/C) · May 2, 2026 · 9:41 AM",
    status: "Pending",
    txRef: "ORD‑vc‑19041 · buyer‑9x2",
    Icon: ShoppingCart,
  },
  {
    n: "02",
    t: "Event ingestion",
    d: "Purchase event on Kafka (partitioned by composition). Validated, enriched, on bus <100ms.",
    status: "Complete",
    txRef: "KFK:off‑s9281 · latency 87ms",
    Icon: Activity,
  },
  {
    n: "03",
    t: "Twin update",
    d: "Composition twin +1 sale, +$15 revenue; creator twins +pending gross; marketplace twin +$15 day volume. Median <200ms across twins.",
    status: "Complete",
    txRef: "mongo:tw‑vc‑8891 · CH mirror lag 32ms",
    Icon: Layers,
  },
  {
    n: "04",
    t: "On-chain lookup",
    d: "Solana Consequence Program read for Velvet Clip — ownership 60/30/10, lineage. Signature captured for audit.",
    status: "Complete",
    txRef: "SOL:5xK…q8m · slot 284,112,901",
    Icon: Link2,
  },
  {
    n: "05",
    t: "Split calculation",
    d: "Gross $15.00 · platform 10% (−$1.50) · net $13.50 → A $8.10 · B $4.05 · C $1.35. Wall <50ms.",
    status: "Complete",
    txRef: "calc‑svc:split‑4412 · trace‑id 9af2",
    Icon: Calculator,
  },
  {
    n: "06",
    t: "Inference trigger",
    d: "Marketplace model +0.3 engagement; creator style drift +0.1; buyer preference vector shift. GPU batch p99 <500ms.",
    status: "Complete",
    txRef: "INF:batch‑v3 · GPU pool eu‑ams",
    Icon: Cpu,
  },
  {
    n: "07",
    t: "Simulation trigger",
    d: "10k-scenario Monte Carlo — 30d revenue if trajectory holds: median $145 · p90 $340 · p10 $52. Wall ~8s · 0.8ms/scenario.",
    status: "Complete",
    txRef: "RAY:job‑88204 · output → Kafka sim‑out",
    Icon: Sparkles,
  },
  {
    n: "08",
    t: "Settlement pending",
    d: "Circle Payouts API staged: 3 legs vs on-chain ownership. Awaiting execution.",
    status: "Pending",
    txRef: "CIRCLE:po‑stg‑7712 · hold",
    Icon: Timer,
  },
  {
    n: "09",
    t: "Settlement executed",
    d: "Parallel USDC on Solana: A $8.10 · B $4.05 · C $1.35. Confirmed <2s. Circle + Solana refs written.",
    status: "Complete",
    txRef: "Circle:py‑884x · SOL sigs (3)",
    Icon: CircleCheck,
  },
  {
    n: "10",
    t: "Settled & recorded",
    d: "Twins refreshed: lifetime revenue, available earnings, fee accrual +$1.50. Mongo + Solana CVS snapshot. Auditable end-to-end.",
    status: "Complete",
    txRef: "mongo:txn‑ledger‑vc‑441a",
    Icon: Database,
  },
] as const;

export function ArchitectureDiagram() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-12 gap-y-6 gap-x-8">
      <div className="col-span-12 md:col-span-8 order-2 md:order-1">
        <div className="bg-snow-0 border border-ink/10 overflow-hidden">
          {layers.map((l, i) => (
            <button
              key={l.id}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={clsx(
                "w-full text-left flex items-baseline gap-6 px-6 lg:px-8 py-6 border-b last:border-b-0 border-ink/10 transition-colors",
                hover === i ? "bg-snow-100" : ""
              )}
              style={{ paddingLeft: `${24 + i * 8}px` }}
            >
              <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/40 w-10">
                {l.id}
              </div>
              <div className="font-display text-[clamp(22px,2.6vw,38px)] leading-none tracking-tight w-[34%]">
                {l.n}
              </div>
              <div className="hidden md:block text-[11px] tabular uppercase tracking-[0.18em] text-ink/45 w-[22%]">
                {l.tag}
              </div>
              <div className="hidden md:flex flex-1 dot-leader text-ink/15 mx-2 h-3 self-center">&nbsp;</div>
              <div className="hidden md:block text-right text-[12px] text-ink/55 max-w-[36ch]">
                {l.desc}
              </div>
              <span
                className={clsx(
                  "inline-block w-2 h-2 rounded-full ml-2",
                  l.accent === "tiff" ? "bg-tiff" : l.accent === "gold" ? "bg-gold" : "bg-ink"
                )}
              />
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-4 text-[10px] tabular uppercase tracking-[0.18em] text-ink/45">
          <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-tiff" /> Twin</span>
          <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold" /> GPU</span>
          <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ink" /> Platform</span>
          <span className="ml-auto">Hover the layers</span>
        </div>
      </div>

      <div className="col-span-12 md:col-span-4 order-1 md:order-2">
        <div className="bg-snow-0 border border-ink/10 p-6 md:sticky md:top-24">
          <div className="flex items-baseline justify-between gap-3">
            <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">
              Royalty transaction
            </div>
            <div className="text-[10px] text-ink/35 tabular">Velvet Clip · $15 USDC</div>
          </div>
          <div className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
            {royaltyFlow.map((row) => (
              <RoyaltyTxRow key={row.n} {...row} />
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-ink/10 grid grid-cols-2 gap-3 text-[11px] tabular uppercase tracking-[0.16em] text-ink/55">
            <div>
              <div className="text-ink/40">Median</div>
              <div className="font-display text-lg leading-none tabular text-ink mt-1">142ms</div>
            </div>
            <div>
              <div className="text-ink/40">p99</div>
              <div className="font-display text-lg leading-none tabular text-ink mt-1">478ms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const statusPillClass: Record<string, string> = {
  Pending: "bg-gold/25 text-ink/80",
  Complete: "bg-tiff/15 text-ink/80",
};

function RoyaltyTxRow({
  n,
  t,
  d,
  status,
  txRef,
  Icon,
}: {
  n: string;
  t: string;
  d: string;
  status: string;
  txRef: string;
  Icon: LucideIcon;
}) {
  const pill = clsx(
    "inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[9px] font-medium tabular uppercase tracking-[0.14em]",
    statusPillClass[status] ?? "bg-ink/6 text-ink/55"
  );
  return (
    <div className="flex gap-2.5 py-3 first:pt-2.5 last:pb-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-ink/10 bg-snow-100 text-ink/55">
        <Icon className="h-3 w-3" strokeWidth={1.5} aria-hidden />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="text-[10px] tabular tracking-[0.12em] text-ink/40">{n}</div>
        <div className="text-[12px] font-medium tracking-tight text-ink leading-snug">{t}</div>
        <div>
          <span className={pill}>{status}</span>
        </div>
        <p className="text-[11px] leading-snug text-ink/55">{d}</p>
        <div className="break-all pt-0.5 font-mono text-[11px] tracking-wide text-ink/45">{txRef}</div>
      </div>
    </div>
  );
}
