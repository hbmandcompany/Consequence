"use client";

import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import {
  Disc3,
  Layers,
  Mic2,
  Music2,
  Radio,
  Sparkles,
  SquareStack,
} from "lucide-react";
import { useState } from "react";

const layers = [
  {
    n: "Application",
    id: "07",
    tag: "Surfaces",
    desc: "Trending · WorkSpace · partner APIs · admin tools",
    accent: "ink",
  },
  {
    n: "Digital Twin",
    id: "06",
    tag: "Twin layer",
    desc: "Living state of every modeled actor — probabilistic, queryable, sharded by entity",
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

const payoutFlow = [
  {
    n: "01",
    t: "Sunday Receipt",
    d: "Voice note from the green room; hums sketched in, tempo tapped on a knee",
    status: "Tracked",
    txRef: "Sunday Receipt.logicx",
    Icon: Mic2,
  },
  {
    n: "02",
    t: "Coast Permission",
    d: "Guide bump hit the group chat; everyone has the same dirty board mix",
    status: "Vaulted",
    txRef: "Coast Permission.logicx",
    Icon: Radio,
  },
  {
    n: "03",
    t: "Every Third Echo",
    d: "Choir stacks printed in passes; breaths trimmed, the lift is all manual",
    status: "Comping",
    txRef: "Every Third Echo.logicx",
    Icon: Layers,
  },
  {
    n: "04",
    t: "Your Ghost Wore My Coat",
    d: "Two dates of the tour married on the timeline; one take leads, one shadows",
    status: "Frozen",
    txRef: "Your Ghost Wore My Coat.logicx",
    Icon: SquareStack,
  },
  {
    n: "05",
    t: "Nothing but Ceiling",
    d: "String lift mocked from MIDI; chairs arrive Thursday, bows marked in red",
    status: "Printed",
    txRef: "Nothing but Ceiling.logicx",
    Icon: Music2,
  },
  {
    n: "06",
    t: "Match Strike",
    d: "Count-offs staged for the full band pass; lights cue held on bar nine",
    status: "Cued",
    txRef: "Match Strike.logicx",
    Icon: Sparkles,
  },
  {
    n: "07",
    t: "Borrowed Light",
    d: "Last chorus recall printed back into the main session; rides copied by hand",
    status: "Closed",
    txRef: "Borrowed Light.logicx",
    Icon: Disc3,
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
              Song projects
            </div>
            <div className="text-[10px] text-ink/35 tabular">Songs in flight · .logicx</div>
          </div>
          <div className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
            {payoutFlow.map((row) => (
              <PayoutTxRow key={row.n} {...row} />
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
  Tracked: "bg-ink/8 text-ink/70",
  Vaulted: "bg-gold/15 text-ink/75",
  Comping: "bg-gold/25 text-ink/80",
  Frozen: "bg-tiff/10 text-ink/80",
  Printed: "bg-gold/20 text-ink/80",
  Cued: "bg-ink/6 text-ink/55",
  Closed: "bg-tiff/20 text-tiff",
};

function PayoutTxRow({
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
    <div className="flex gap-3 py-4 first:pt-3 last:pb-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ink/10 bg-snow-100 text-ink/55">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="text-[11px] tabular tracking-[0.12em] text-ink/40">{n}</div>
        <div className="text-[13px] font-medium tracking-tight text-ink">{t}</div>
        <div>
          <span className={pill}>{status}</span>
        </div>
        <p className="text-[12px] leading-snug text-ink/55">{d}</p>
        <div className="break-all pt-1 font-mono text-[11px] tracking-wide text-ink/50">{txRef}</div>
      </div>
    </div>
  );
}
