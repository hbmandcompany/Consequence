/**
 * Three-device banking workflow — compact phone frames, HTML/CSS only, no raster images.
 */

import {
  ArrowRight,
  ArrowRightLeft,
  Building2,
  Check,
  ChevronRight,
  CreditCard,
  Home,
  PieChart,
  Plus,
  ScanLine,
} from "lucide-react";
import type { ReactNode } from "react";

export function ReserveBankIllustration() {
  return (
    <div className="bg-snow-0 border border-ink/10 p-6 lg:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">
            Private banking · Mobile
          </div>
          <p className="mt-2 max-w-[40ch] text-[11px] leading-snug text-ink/55">
            Home → wire → settlement in three phone-sized surfaces. Same glass stack, scaled for the hero rail.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 self-start text-[10px] tabular uppercase tracking-[0.18em] text-ink/50">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live rate
        </span>
      </div>

      <div className="mt-8 w-full min-w-0 space-y-1.5">
        <div className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-0.5 sm:gap-x-1.5 md:gap-x-2 lg:gap-x-3">
          <FrameLabel>Portfolio</FrameLabel>
          <span className="min-w-[1rem] sm:min-w-[1.25rem]" aria-hidden />
          <FrameLabel>Wire</FrameLabel>
          <span className="min-w-[1rem] sm:min-w-[1.25rem]" aria-hidden />
          <FrameLabel>Settled</FrameLabel>
        </div>
        <div className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-0.5 sm:gap-x-1.5 md:gap-x-2 lg:gap-x-3">
          <PhoneDevice>
            <BankingHomeCompact />
          </PhoneDevice>
          <WorkflowArrow />
          <PhoneDevice>
            <WireFlowCompact />
          </PhoneDevice>
          <WorkflowArrow />
          <PhoneDevice>
            <SettledCompact />
          </PhoneDevice>
        </div>
      </div>
    </div>
  );
}

function FrameLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-4 min-w-0 items-end justify-center text-center">
      <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-ink/40">{children}</span>
    </div>
  );
}

function PhoneDevice({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-0 min-w-0 w-full">
      <div
        className="pointer-events-none absolute -inset-2 rounded-[2rem] opacity-35 blur-xl"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(127, 212, 204, 0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative rounded-[1.65rem] border-[2.5px] border-ink bg-gradient-to-b from-[#2a2826] via-ink to-ink p-[2px] shadow-[0_14px_36px_-10px_rgba(10,10,10,0.42)]">
        <div
          className="pointer-events-none absolute left-1/2 top-2 z-20 h-1 w-9 -translate-x-1/2 rounded-full bg-black/55 ring-1 ring-white/[0.07]"
          aria-hidden
        />
        <div className="relative h-[18.25rem] w-full min-h-0 overflow-hidden rounded-[1.45rem] bg-gradient-to-b from-[#0b0f14] via-[#0d1218] to-[#0a0d12] shadow-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

function WorkflowArrow() {
  return (
    <div className="flex shrink-0 items-center justify-center px-0.5 text-ink/25 sm:px-1" aria-hidden>
      <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
    </div>
  );
}

function StatusBarCompact() {
  return (
    <header className="flex items-center justify-between px-2.5 pb-0.5 pt-2">
      <div className="text-[8px] font-medium tabular-nums text-white/50">9:41</div>
      <div className="flex items-center gap-0.5 text-white/40">
        <svg className="h-2 w-2.5" viewBox="0 0 18 11" fill="currentColor" aria-hidden>
          <path d="M1 4h2v5H1V4zm4-2h2v7H5V2zm4 2h2v5H9V4zm4-3h2v8h-2V1z" />
        </svg>
        <div className="h-2 w-5 rounded-sm border border-white/30 px-0.5">
          <div className="mt-[0.5px] h-1 w-[65%] rounded-[1px] bg-white/65" />
        </div>
      </div>
    </header>
  );
}

function BankingHomeCompact() {
  return (
    <div className="flex h-full min-h-0 flex-col text-white antialiased">
      <StatusBarCompact />

      <div className="flex items-start justify-between gap-1 px-2.5 pt-0.5">
        <div className="min-w-0">
          <p className="text-[7px] font-medium uppercase tracking-[0.18em] text-white/36">Portfolio</p>
          <p className="mt-0.5 truncate font-display text-[15px] leading-none tracking-[-0.02em] text-white">
            $128,430
          </p>
          <p className="mt-0.5 text-[8px] text-emerald-400/90">+2.1k · 24h</p>
        </div>
        <button
          type="button"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] ring-1 ring-white/[0.1]"
          aria-label="Scan"
        >
          <ScanLine className="h-3 w-3 text-tiff-200" strokeWidth={2} />
        </button>
      </div>

      <div className="mx-2.5 mt-2 overflow-hidden rounded-xl ring-1 ring-white/[0.1]">
        <div className="bg-gradient-to-br from-[#1a2332]/95 via-[#141c28] to-[#0c1018] px-2.5 pb-2.5 pt-2">
          <div className="flex items-center justify-between gap-1">
            <div className="flex min-w-0 items-center gap-1.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold-light/90 to-gold/80">
                <Building2 className="h-3 w-3 text-ink" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[8px] font-semibold text-white">Treasury · USD</p>
                <p className="text-[7px] text-white/38">···· 4921</p>
              </div>
            </div>
            <ChevronRight className="h-3 w-3 shrink-0 text-white/22" strokeWidth={1.5} />
          </div>
          <div className="mt-2 flex items-end justify-between border-t border-white/[0.07] pt-2">
            <div>
              <p className="text-[7px] uppercase tracking-[0.12em] text-white/32">Avail.</p>
              <p className="mt-0.5 font-display text-[13px] leading-none text-white">$94.2k</p>
            </div>
            <p className="text-right text-[7px] leading-tight text-white/38">
              APY
              <br />
              <span className="font-medium text-tiff-200">4.12%</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-1 px-2.5">
        <QuickMini icon={<ArrowRightLeft className="h-2.5 w-2.5" />} label="Move" />
        <QuickMini icon={<Plus className="h-2.5 w-2.5" />} label="Add" />
        <QuickMini icon={<CreditCard className="h-2.5 w-2.5" />} label="Card" />
        <QuickMini icon={<PieChart className="h-2.5 w-2.5" />} label="Stats" />
      </div>

      <div className="mx-2.5 mt-2 flex-1 rounded-lg bg-black/25 p-1.5 ring-1 ring-white/[0.06]">
        <p className="mb-1 px-0.5 text-[7px] font-semibold uppercase tracking-[0.14em] text-white/32">Activity</p>
        {[
          { t: "Atlas Mfg", s: "Wire", a: "−$12.4k" },
          { t: "NYC Ops", s: "ACH", a: "+$48k" },
        ].map((row) => (
          <div key={row.t} className="flex items-center gap-1.5 rounded-md px-1 py-1">
            <div className="h-5 w-5 shrink-0 rounded-full bg-white/[0.08] ring-1 ring-white/[0.06]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[8px] font-medium text-white">{row.t}</p>
              <p className="text-[6px] text-white/35">{row.s}</p>
            </div>
            <p className="shrink-0 text-[8px] font-medium tabular-nums text-white/90">{row.a}</p>
          </div>
        ))}
      </div>

      <nav className="mt-auto flex items-center justify-around border-t border-white/[0.07] bg-black/35 px-1 py-1.5">
        <TabMini icon={<Home className="h-3 w-3" />} label="Home" active />
        <TabMini icon={<Building2 className="h-3 w-3" />} label="Bank" />
        <TabMini icon={<ArrowRightLeft className="h-3 w-3" />} label="Pay" />
        <TabMini icon={<CreditCard className="h-3 w-3" />} label="Cards" />
      </nav>
    </div>
  );
}

function WireFlowCompact() {
  return (
    <div className="flex h-full min-h-0 flex-col text-white antialiased">
      <StatusBarCompact />
      <div className="flex items-center gap-1 border-b border-white/[0.06] px-2.5 py-1.5">
        <button type="button" className="text-white/40" aria-label="Back">
          <ChevronRight className="h-3.5 w-3.5 rotate-180" strokeWidth={1.5} />
        </button>
        <span className="text-[9px] font-semibold tracking-wide text-white">Wire out · USD</span>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-2.5 py-2.5">
        <div>
          <p className="text-[7px] uppercase tracking-[0.14em] text-white/35">Amount</p>
          <p className="mt-0.5 font-display text-[18px] leading-none text-white">$12,400.00</p>
        </div>
        <div className="rounded-xl bg-white/[0.05] p-2 ring-1 ring-white/[0.08]">
          <p className="text-[7px] uppercase tracking-[0.12em] text-white/32">To</p>
          <p className="mt-0.5 text-[9px] font-medium text-white">Atlas Manufacturing LLP</p>
          <p className="mt-0.5 text-[7px] text-white/38">ABA ·····281 · Checking</p>
        </div>
        <div className="rounded-xl bg-white/[0.04] p-2 ring-1 ring-white/[0.06]">
          <p className="text-[7px] uppercase tracking-[0.12em] text-white/32">Memo</p>
          <p className="mt-1 text-[8px] leading-snug text-white/55">INV-2044 · steel shipment</p>
        </div>
        <button
          type="button"
          className="mt-auto w-full rounded-xl bg-gradient-to-r from-tiff-400/90 to-tiff-500/90 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink shadow-md shadow-black/25"
        >
          Authorize
        </button>
      </div>
    </div>
  );
}

function SettledCompact() {
  return (
    <div className="flex h-full min-h-0 flex-col text-white antialiased">
      <StatusBarCompact />
      <div className="flex flex-1 flex-col items-center justify-center px-3 pb-6 pt-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 ring-2 ring-emerald-400/35">
          <Check className="h-6 w-6 text-emerald-300" strokeWidth={2} />
        </div>
        <p className="mt-3 font-display text-[16px] leading-tight text-white">Settled</p>
        <p className="mt-1 text-[8px] leading-snug text-white/45">FedWire · Atlas Manufacturing</p>
        <p className="mt-2 font-display text-[13px] tabular-nums text-white/90">−$12,400.00</p>
        <p className="mt-2 rounded-lg bg-white/[0.06] px-2 py-1.5 text-[7px] leading-relaxed text-white/50 ring-1 ring-white/[0.08]">
          Ref FW-9C2‑88104
          <br />
          May 2, 2026 · 9:41 AM ET
        </p>
      </div>
      <div className="border-t border-white/[0.07] px-2.5 py-2">
        <button
          type="button"
          className="w-full rounded-lg bg-white/[0.08] py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/80 ring-1 ring-white/[0.1]"
        >
          Receipt
        </button>
      </div>
    </div>
  );
}

function QuickMini({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1 rounded-lg bg-white/[0.05] py-1 ring-1 ring-white/[0.06]"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.07] text-white/88 ring-1 ring-white/[0.07]">
        {icon}
      </span>
      <span className="text-[6px] font-semibold uppercase tracking-[0.08em] text-white/42">{label}</span>
    </button>
  );
}

function TabMini({ icon, label, active }: { icon: ReactNode; label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={`flex flex-col items-center gap-0 rounded-md px-1 py-0.5 ${active ? "text-tiff-200" : "text-white/32"}`}
    >
      {icon}
      <span className="text-[5.5px] font-semibold uppercase tracking-[0.1em]">{label}</span>
    </button>
  );
}
