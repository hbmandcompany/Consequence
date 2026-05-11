/**
 * Twin analytics workbook — one highlighted Producer intelligence card; Tableau-style chrome; HTML/CSS/SVG only.
 */

import { ChevronDown, Filter } from "lucide-react";

const CHART_GID = "stream-earn-chart";

const KPI = [
  { label: "Streams · 24h", value: "2.47M", sub: "+8.2% vs prior day", positive: true },
  { label: "Accrual · MTD", value: "$84.2k", sub: "gross before splits", positive: true },
  { label: "$ / 1K streams", value: "$12.08", sub: "blended DSP effective", positive: true },
  { label: "Twin refresh", value: "0.38 s", sub: "p50 lag · earnings ledger", positive: true },
];

const TABLE_ROWS = [
  { asset: "Cluster ent‑ak‑2044", streams: "184.2k", accrual: "$2,214", band: "±$118", src: "DSP mix" },
  { asset: "Cluster ent‑mx‑8891", streams: "96.8k", accrual: "$1,089", band: "±$74", src: "Radio + on‑demand" },
  { asset: "Cluster ent‑sg‑3302", streams: "52.1k", accrual: "$624", band: "±$41", src: "Catalog" },
];

export function DigitalTwinsDashboard() {
  return (
    <div className="overflow-hidden rounded-lg border border-ink/10 bg-[#f4f5f7] text-[11px] text-ink shadow-[0_20px_50px_-16px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.04]">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 bg-white px-3 py-2 sm:px-4">
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">Twin intelligence</span>
          <span className="truncate text-[12px] font-medium tracking-tight text-ink">Composition & capital · Production workbook</span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded border border-ink/10 bg-white px-2 py-1 text-[10px] font-medium text-ink/70 shadow-sm"
          >
            <Filter className="h-3 w-3 text-ink/45" strokeWidth={2} />
            Filters
            <ChevronDown className="h-3 w-3 text-ink/35" strokeWidth={2} />
          </button>
          <span className="hidden rounded border border-dashed border-ink/15 bg-snow-50 px-2 py-1 font-mono text-[9px] tabular-nums text-ink/55 sm:inline">
            WATERMARK &apos;2026‑05‑03 14:02 UTC&apos;
          </span>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 border-b border-ink/8 bg-[#eceef2] px-3 py-2 sm:px-4">
        {["Entity shard", "Twin family", "Confidence ≥ 90%", "Versioned state"].map((f) => (
          <span
            key={f}
            className="rounded-full border border-ink/10 bg-white px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-ink/60"
          >
            {f}
          </span>
        ))}
      </div>

      <div className="p-3 sm:p-4">
        {/* Only block with producer-specific context */}
        <div className="mb-3 rounded-lg border border-tiff/30 bg-gradient-to-br from-tiff/10 via-white to-white px-3 py-3 shadow-sm sm:mb-4 sm:px-4 sm:py-3.5">
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-tiff-700">Producer intelligence</div>
          <p className="mt-1.5 max-w-[68ch] text-[10px] leading-relaxed text-ink/70">
            Roll‑up for the primary payee lane: beat packs, stem SKUs, featured‑artist lines, and sample clearance
            accruals—scoped so catalog twins stay shard‑fair while publishing routes stay separable from the mesh.
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div>
              <dt className="text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/45">Beat / stem twins</dt>
              <dd className="mt-0.5 font-display text-lg leading-none text-ink">14.2k</dd>
            </div>
            <div>
              <dt className="text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/45">PRO / publisher paths</dt>
              <dd className="mt-0.5 font-display text-lg leading-none text-ink">6</dd>
            </div>
            <div>
              <dt className="text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/45">Guest feature queue</dt>
              <dd className="mt-0.5 font-display text-lg leading-none text-ink">23</dd>
            </div>
            <div>
              <dt className="text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/45">Statement tie‑out</dt>
              <dd className="mt-0.5 font-mono text-[11px] font-semibold leading-none text-ink">T+4h</dd>
            </div>
          </dl>
        </div>

        <div className="mb-3 grid grid-cols-2 gap-2 sm:mb-4 lg:grid-cols-4">
          {KPI.map((k) => (
            <div
              key={k.label}
              className="rounded-md border border-ink/10 bg-white px-3 py-2.5 shadow-sm sm:py-3"
            >
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/45">{k.label}</div>
              <div className="mt-1 font-display text-[22px] leading-none tracking-tight text-ink sm:text-[26px]">{k.value}</div>
              <div
                className={`mt-1 text-[9px] font-medium tabular-nums ${k.positive ? "text-emerald-600" : "text-ink/50"}`}
              >
                {k.sub}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-3 lg:grid-cols-5">
          <div className="rounded-md border border-ink/10 bg-white p-3 shadow-sm lg:col-span-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/45">Engagement vs. revenue realization</div>
                <div className="mt-0.5 text-[11px] font-medium text-ink">
                  Cumulative engagement (line) · 90% revenue band from twin posterior
                </div>
              </div>
              <span className="rounded bg-tiff/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-tiff-600">
                Live ingest
              </span>
            </div>
            <div className="mt-3 h-36 w-full sm:h-40">
              <svg className="h-full w-full" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid meet" aria-hidden>
                <defs>
                  <linearGradient id={`${CHART_GID}-earn`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgb(212 184 138)" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="rgb(212 184 138)" stopOpacity="0.06" />
                  </linearGradient>
                </defs>
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="48"
                    y1={32 + i * 26}
                    x2="388"
                    y2={32 + i * 26}
                    stroke="currentColor"
                    className="text-ink/[0.06]"
                    strokeWidth="1"
                  />
                ))}
                <path
                  d="M 52 108 L 112 96 L 172 78 L 232 88 L 292 70 L 352 82 L 352 118 L 292 128 L 232 122 L 172 112 L 112 118 L 52 126 Z"
                  fill={`url(#${CHART_GID}-earn)`}
                />
                <path
                  d="M 52 118 L 112 108 L 172 94 L 232 100 L 292 86 L 352 92"
                  fill="none"
                  stroke="rgb(60 120 112)"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {[
                  [52, 118],
                  [112, 108],
                  [172, 94],
                  [232, 100],
                  [292, 86],
                  [352, 92],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3.5" fill="white" stroke="rgb(60 120 112)" strokeWidth="1.5" />
                ))}
                <text x="48" y="150" className="fill-ink/40 font-sans" style={{ fontSize: "10px" }}>
                  Events sourced from streaming bus · accrual reconciled to ledger twin
                </text>
              </svg>
            </div>
          </div>

          <div className="rounded-md border border-ink/10 bg-white p-3 shadow-sm lg:col-span-2">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/45">Twin explorer</div>
            <div className="mt-2 overflow-hidden rounded border border-ink/8">
              <table className="w-full border-collapse text-left text-[9px] sm:text-[10px]">
                <thead>
                  <tr className="border-b border-ink/10 bg-[#f8f9fb]">
                    <th className="px-2 py-1.5 font-semibold uppercase tracking-[0.08em] text-ink/50">Entity</th>
                    <th className="px-2 py-1.5 font-semibold uppercase tracking-[0.08em] text-ink/50">Streams</th>
                    <th className="px-2 py-1.5 font-semibold uppercase tracking-[0.08em] text-ink/50">Accrual</th>
                    <th className="hidden px-2 py-1.5 font-semibold uppercase tracking-[0.08em] text-ink/50 sm:table-cell">± band</th>
                    <th className="px-2 py-1.5 font-semibold uppercase tracking-[0.08em] text-ink/50">Source</th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {TABLE_ROWS.map((r) => (
                    <tr key={r.asset} className="border-b border-ink/5 last:border-0 hover:bg-snow-50">
                      <td className="max-w-[7rem] truncate px-2 py-1.5 font-medium text-ink sm:max-w-none">{r.asset}</td>
                      <td className="px-2 py-1.5 text-ink/80">{r.streams}</td>
                      <td className="px-2 py-1.5 font-medium text-emerald-700">{r.accrual}</td>
                      <td className="hidden px-2 py-1.5 text-tiff-600 sm:table-cell">{r.band}</td>
                      <td className="px-2 py-1.5 text-ink/45">{r.src}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[8px] leading-snug text-ink/45">
              Twins fuse raw stream events with rate cards · ClickHouse time‑slice for audit
            </p>
          </div>
        </div>

        <footer className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-ink/8 pt-3 text-[8px] text-ink/40">
          <span className="uppercase tracking-[0.14em]">Governed payout view · splits applied outside this sheet</span>
          <span className="font-mono tabular-nums">Refreshed · 2.1 s ago</span>
        </footer>
      </div>
    </div>
  );
}
