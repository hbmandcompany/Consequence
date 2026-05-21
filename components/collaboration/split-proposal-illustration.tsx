"use client";

import clsx from "clsx";

const PROPOSALS = [
  { who: "Margot · Iso", pct: 60, status: "Accepted", tone: "tiff" as const },
  { who: "Lou Marsden", pct: 30, status: "Accepted", tone: "ink" as const },
  { who: "Eos Veil", pct: 10, status: "Pending", tone: "gold" as const },
];

export function SplitProposalIllustration({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "border border-ink/10 bg-snow-0 rounded-lg overflow-hidden",
        className
      )}
      aria-hidden
    >
      <div className="px-5 py-4 border-b border-ink/10 bg-snow-100/80">
        <p className="text-[10px] tabular uppercase tracking-[0.2em] text-ink/45">
          Split proposal · Velvet Clip
        </p>
        <p className="mt-1 text-[12px] text-ink/55">Algorithmic draft · awaiting publisher sign-off</p>
      </div>
      <div className="divide-y divide-ink/10">
        {PROPOSALS.map((row) => (
          <div key={row.who} className="flex items-center gap-4 px-5 py-4">
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-ink truncate">{row.who}</p>
              <div className="mt-2 h-1.5 rounded-full bg-ink/8 overflow-hidden">
                <div
                  className={clsx(
                    "h-full rounded-full transition-all",
                    row.tone === "tiff" ? "bg-tiff" : row.tone === "gold" ? "bg-gold" : "bg-ink/40"
                  )}
                  style={{ width: `${row.pct}%` }}
                />
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-display text-2xl tabular leading-none">{row.pct}%</p>
              <p
                className={clsx(
                  "mt-1 text-[9px] tabular uppercase tracking-[0.14em]",
                  row.status === "Accepted" ? "text-tiff-600" : "text-gold-dark"
                )}
              >
                {row.status}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-ink/10 bg-snow-100/60 flex items-center justify-between text-[10px] tabular text-ink/45">
        <span>Total · 10,000 bp</span>
        <span>Audit ref · prop‑vc‑4412</span>
      </div>
    </div>
  );
}
