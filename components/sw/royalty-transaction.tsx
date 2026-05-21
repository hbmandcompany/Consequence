"use client";

import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Calculator,
  CircleCheck,
  Database,
  Layers,
  Link2,
  ShoppingCart,
  Sparkles,
  Timer,
} from "lucide-react";

/** End-to-end trace: Velvet Clip · $15 USDC on consequence.cc */
export const royaltyFlow = [
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
    t: "Simulation trigger",
    d: "10k-scenario Monte Carlo — 30d revenue if trajectory holds: median $145 · p90 $340 · p10 $52. Wall ~8s · 0.8ms/scenario.",
    status: "Complete",
    txRef: "RAY:job‑88204 · output → Kafka sim‑out",
    Icon: Sparkles,
  },
  {
    n: "07",
    t: "Settlement pending",
    d: "Circle Payouts API staged: 3 legs vs on-chain ownership. Awaiting execution.",
    status: "Pending",
    txRef: "CIRCLE:po‑stg‑7712 · hold",
    Icon: Timer,
  },
  {
    n: "08",
    t: "Settlement executed",
    d: "Parallel USDC on Solana: A $8.10 · B $4.05 · C $1.35. Confirmed <2s. Circle + Solana refs written.",
    status: "Complete",
    txRef: "Circle:py‑884x · SOL sigs (3)",
    Icon: CircleCheck,
  },
  {
    n: "09",
    t: "Settled & recorded",
    d: "Twins refreshed: lifetime revenue, available earnings, fee accrual +$1.50. Mongo + Solana CVS snapshot. Auditable end-to-end.",
    status: "Complete",
    txRef: "mongo:txn‑ledger‑vc‑441a",
    Icon: Database,
  },
] as const;

const statusPillClass: Record<string, string> = {
  Pending: "bg-gold/25 text-ink/80",
  Complete: "bg-tiff/15 text-ink/80",
};

export function RoyaltyTxRow({
  n,
  t,
  d,
  status,
  txRef,
  Icon,
  compact,
  carousel,
}: {
  n: string;
  t: string;
  d: string;
  status: string;
  txRef: string;
  Icon: LucideIcon;
  compact?: boolean;
  /** Fixed-height slide for carousel — no scroll, equal layout every step */
  carousel?: boolean;
}) {
  const pill = clsx(
    "inline-flex w-fit items-center rounded-full font-medium tabular uppercase tracking-[0.14em] shrink-0",
    carousel ? "px-2.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[9px]",
    statusPillClass[status] ?? "bg-ink/6 text-ink/55"
  );

  if (carousel) {
    return (
      <div className="flex w-full items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink/10 bg-snow-100 text-ink/55">
          <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        </div>
        <div className="min-w-0 flex-1 space-y-2.5">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5">
            <span className="text-[11px] tabular tracking-[0.1em] text-ink/45">{n}</span>
            <span className="text-[13px] font-semibold tracking-tight text-ink leading-snug">
              {t}
            </span>
            <span className={pill}>{status}</span>
          </div>
          <p className="text-[12px] leading-[1.6] text-ink/75">{d}</p>
          <p className="font-mono text-[11px] leading-[1.5] tracking-wide text-ink/55 break-words">
            {txRef}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex gap-2.5",
        compact ? "py-2.5 first:pt-2 last:pb-2" : "py-3 first:pt-2.5 last:pb-2.5"
      )}
    >
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
        <div className="break-all pt-0.5 font-mono text-[11px] tracking-wide text-ink/45">
          {txRef}
        </div>
      </div>
    </div>
  );
}

export function RoyaltyTransactionPanel({
  className,
  compact,
  showFooter,
  fillHeight,
}: {
  className?: string;
  compact?: boolean;
  showFooter?: boolean;
  /** Treasury illustration — scrollable steps fill the column */
  fillHeight?: boolean;
}) {
  return (
    <div
      className={clsx(
        "bg-snow-0 text-ink",
        fillHeight && "flex h-full min-h-0 flex-col",
        className
      )}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div
        className={clsx(
          "flex shrink-0 items-baseline justify-between gap-3",
          compact || fillHeight ? "px-4 pt-4 lg:px-5 lg:pt-5" : ""
        )}
      >
        <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">
          Royalty transaction
        </div>
        <div className="text-[10px] text-ink/35 tabular">Velvet Clip · $15 USDC</div>
      </div>
      <div
        className={clsx(
          "divide-y divide-ink/10 border-y border-ink/10",
          compact && !fillHeight && "mx-4 mt-3 max-h-[min(320px,50vh)] overflow-y-auto overscroll-contain",
          fillHeight && "mx-4 mt-3 lg:mx-5 flex-1 min-h-0 overflow-y-auto overscroll-contain",
          !compact && !fillHeight && "mt-4"
        )}
      >
        {royaltyFlow.map((row) => (
          <RoyaltyTxRow key={row.n} {...row} compact={compact} />
        ))}
      </div>
      {showFooter !== false && (
        <div
          className={clsx(
            "grid shrink-0 grid-cols-2 gap-3 text-[11px] tabular uppercase tracking-[0.16em] text-ink/55 border-t border-ink/10",
            compact || fillHeight ? "mx-4 mt-4 mb-4 pt-4 lg:mx-5 lg:mb-5" : "mt-6 pt-5"
          )}
        >
          <div>
            <div className="text-ink/40">Median</div>
            <div className="font-display text-lg leading-none tabular text-ink mt-1">142ms</div>
          </div>
          <div>
            <div className="text-ink/40">p99</div>
            <div className="font-display text-lg leading-none tabular text-ink mt-1">478ms</div>
          </div>
        </div>
      )}
    </div>
  );
}
