"use client";

import clsx from "clsx";
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

export function ArchitectureDiagram() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-12 gap-y-6 gap-x-8">
      <div className="col-span-12 md:col-span-8">
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

      <div className="col-span-12 md:col-span-4">
        <div className="bg-snow-0 border border-ink/10 p-6 sticky top-24">
          <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">
            Event flow
          </div>
          <div className="mt-4 space-y-3 text-[13px] text-ink/80">
            <Step n="01" t="Ingest" d="Ingestion endpoints validate & enrich" />
            <Step n="02" t="Stream" d="Kafka — partitioned by entity, 3-replica" />
            <Step n="03" t="Feature" d="Stateless workers compute derived features" />
            <Step n="04" t="Twin update" d="Per-entity workers, in-order, transactional" />
            <Step n="05" t="Inference" d="Triton — batched at 5–25ms, GPU-served" />
            <Step n="06" t="Trigger" d="Simulation orchestrator fans out workflows" />
            <Step n="07" t="Propagate" d="Outputs back into the bus as new state" />
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

function Step({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="flex items-baseline gap-3 border-t border-ink/10 pt-3 first:border-t-0 first:pt-0">
      <span className="text-[10px] tabular uppercase tracking-[0.18em] text-ink/40 w-6">
        {n}
      </span>
      <div>
        <div className="text-ink/90">{t}</div>
        <div className="text-[12px] text-ink/55">{d}</div>
      </div>
    </div>
  );
}
