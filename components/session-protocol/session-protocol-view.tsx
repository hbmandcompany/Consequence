"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode, type Ref } from "react";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Container, Display, FadeUp, Pill } from "@/components/ui";
import { useInViewOnce, usePrefersReducedMotion } from "@/hooks/use-in-view-once";
import { CodeBlock } from "@/components/how-rails-connect/code-block";
import {
  EquityTimelineSvg,
  FullFlowDiagram,
  HeroPillarsDiagram,
  SettlementBarsSvg,
  SolanaAccountTreeSvg,
} from "@/components/how-rails-connect/illustrations";
import {
  COMPUTE_ALGORITHMIC_EQUITY,
  EXECUTE_SETTLEMENT_WITH_EQUITY,
} from "@/lib/rails-code-samples";

const CHAPTERS = [
  { id: "overview", label: "Overview" },
  { id: "royalty", label: "Royalty math" },
  { id: "ledger", label: "Ledger branch" },
  { id: "equity", label: "Equity formula" },
  { id: "settlement", label: "Settlement" },
  { id: "timeline", label: "Full trace" },
] as const;

type ChapterId = (typeof CHAPTERS)[number]["id"];

const FLOW_STEPS = [
  { side: "L" as const, title: "Composition created", detail: "PDA initialized · A = 10,000 bp.", ms: "0ms" },
  { side: "R" as const, title: "Creator B joins", detail: "Session signals fan-out on Kafka.", ms: "50ms" },
  { side: "L" as const, title: "Equity recomputed", detail: "A = 6,673 bp · B = 3,327 bp.", ms: "120ms" },
  { side: "R" as const, title: "Solana update", detail: "recordEquityUpdate on-chain.", ms: "5s" },
  { side: "L" as const, title: "Buyer purchase", detail: "$15 USDC to escrow.", ms: "6s" },
  { side: "R" as const, title: "Splits computed", detail: "Net $13.50 → A · B · C legs.", ms: "6.1s" },
  { side: "L" as const, title: "Settlement", detail: "Circle + Solana confirmed.", ms: "done" },
];

function ChapterNav({
  active,
  onSelect,
}: {
  active: ChapterId;
  onSelect: (id: ChapterId) => void;
}) {
  return (
    <nav
      className="hidden xl:flex flex-col gap-1 sticky top-28 self-start w-44 shrink-0"
      aria-label="Session Protocol chapters"
    >
      {CHAPTERS.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onSelect(c.id)}
          className={clsx(
            "text-left px-3 py-2 rounded-md text-[11px] tabular uppercase tracking-[0.14em] transition-colors",
            active === c.id
              ? "bg-ink text-snow-0"
              : "text-ink/45 hover:text-ink hover:bg-snow-100"
          )}
        >
          {c.label}
        </button>
      ))}
    </nav>
  );
}

function ProtocolSection({
  id,
  children,
  className,
  dark,
}: {
  id: ChapterId;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "scroll-mt-28 py-20 lg:py-28 border-t border-ink/10",
        dark ? "bg-ink text-snow-0" : "bg-snow-0 text-ink",
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

function RoyaltyCalculator() {
  const [gross, setGross] = useState(15);
  const platformPct = 10;
  const fee = gross * (platformPct / 100);
  const net = gross - fee;
  const splits = [
    { label: "A", pct: 60, amount: net * 0.6 },
    { label: "B", pct: 30, amount: net * 0.3 },
    { label: "C", pct: 10, amount: net * 0.1 },
  ];

  return (
    <div className="border border-ink/10 bg-snow-100 p-6 lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] tabular uppercase tracking-[0.2em] text-ink/45">
            Live split model
          </p>
          <p className="mt-2 font-display text-3xl tabular text-ink">
            ${gross.toFixed(2)}{" "}
            <span className="text-lg text-ink/45">USDC gross</span>
          </p>
        </div>
        <label className="flex flex-col gap-2 min-w-[140px]">
          <span className="text-[10px] tabular uppercase tracking-[0.16em] text-ink/45">
            Sale amount
          </span>
          <input
            type="range"
            min={5}
            max={100}
            step={1}
            value={gross}
            onChange={(e) => setGross(Number(e.target.value))}
            className="w-full accent-ink"
          />
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="border border-ink/10 bg-snow-0 p-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink/40">Platform</p>
          <p className="mt-2 font-display text-xl tabular">−${fee.toFixed(2)}</p>
          <p className="text-[11px] text-ink/50 mt-1">{platformPct}% fee</p>
        </div>
        <div className="border border-ink/10 bg-snow-0 p-4 sm:col-span-1">
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink/40">Net pool</p>
          <p className="mt-2 font-display text-xl tabular">${net.toFixed(2)}</p>
        </div>
        {splits.map((s) => (
          <div key={s.label} className="border border-ink/10 bg-snow-0 p-4">
            <p className="text-[10px] uppercase tracking-[0.14em] text-ink/40">
              Creator {s.label} · {s.pct}%
            </p>
            <p className="mt-2 font-display text-xl tabular">${s.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[12px] text-ink/55 leading-relaxed max-w-[52ch]">
        Splits read from on-chain ownership at settlement time — not cached listing metadata.
        Platform fee accrues to treasury twin before net legs execute on Circle → Solana.
      </p>
    </div>
  );
}

export function SessionProtocolView() {
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState<ChapterId>("overview");
  const [heroReady, setHeroReady] = useState(false);
  const royaltyRef = useInViewOnce<HTMLDivElement>(0.12);
  const ledgerRef = useInViewOnce<HTMLDivElement>(0.1);
  const equityRef = useInViewOnce<HTMLDivElement>(0.1);
  const timelineRef = useInViewOnce<HTMLDivElement>(0.06);
  const motionOff = reducedMotion ?? false;

  useEffect(() => {
    setHeroReady(true);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-20% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id: ChapterId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  }, []);

  return (
    <div className="bg-snow-50 min-h-screen">
      {/* Immersive hero */}
      <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden bg-ink text-snow-0">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 0%, rgba(127, 212, 204, 0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(184, 153, 104, 0.12), transparent)",
          }}
          aria-hidden
        />
        <Container className="relative pb-16 lg:pb-24 pt-32">
          <FadeUp>
            <div className="flex items-center gap-3 text-[10px] tabular uppercase tracking-[0.22em] text-snow-0/55">
              <span className="text-snow-0/40">Protocol</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-tiff" />
              <span>The Reserve</span>
            </div>
            <Display as="h1" className="mt-8 text-snow-0 max-w-[14ch]">
              Session
              <br />
              <span className="italic text-snow-0/80">Protocol.</span>
            </Display>
            <p className="mt-10 max-w-[52ch] text-[clamp(16px,1.5vw,20px)] leading-[1.55] text-snow-0/65">
              How royalties are calculated, how the ledger branches between compose-time equity and
              sale-time settlement, and how every USDC leg stays auditable from Kafka through
              Solana.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => scrollTo("royalty")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-snow-0 text-ink text-[13px] hover:bg-snow-100 transition-colors"
              >
                Enter the protocol
                <ChevronDown className="w-4 h-4" />
              </button>
              <Link
                href="/treasury"
                className="inline-flex items-center gap-2 text-[13px] text-snow-0/70 hover:text-snow-0 uline"
              >
                Governance
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeUp>
          <motion.div
            className="mt-16 lg:mt-20 max-w-md ml-auto hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: heroReady ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8 }}
          >
            <HeroPillarsDiagram started={heroReady} reducedMotion={reducedMotion ?? false} />
          </motion.div>
        </Container>
      </section>

      <div className="flex gap-12 xl:gap-16">
        <div className="hidden xl:block w-44 shrink-0 pl-6 lg:pl-10 pt-12">
          <ChapterNav active={active} onSelect={scrollTo} />
        </div>

        <div className="flex-1 min-w-0">
          <ProtocolSection id="overview">
            <FadeUp>
              <p className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45 mb-4">
                00 · Charter
              </p>
              <h2 className="font-display text-[clamp(32px,4vw,56px)] tracking-tight leading-[1.02] max-w-[20ch]">
                One protocol. Two clocks.
              </h2>
              <p className="mt-8 max-w-[58ch] text-[16px] leading-[1.6] text-ink/65">
                Consequence runs two intertwined timelines: the <strong>compose clock</strong>{" "}
                (signals → algorithmic equity → Solana PDA updates) and the{" "}
                <strong>commerce clock</strong> (marketplace purchase → split calculation → Circle
                payouts). Session Protocol is the contract between them — what gets recorded, who
                may read it, and how capital always defers to the latest verified ownership vector.
              </p>
              <div className="mt-12 grid sm:grid-cols-3 gap-4">
                {[
                  {
                    k: "Compose",
                    v: "Signals & equity",
                    d: "MIDI, arrangement, AI acceptance, session time — normalized to 10,000 basis points.",
                  },
                  {
                    k: "Ledger",
                    v: "Branch authority",
                    d: "Mongo projections for speed; Solana PDAs for settlement truth; ClickHouse for analytics.",
                  },
                  {
                    k: "Settle",
                    v: "USDC legs",
                    d: "Platform fee, net pool, parallel creator transfers — confirmed <2s on Solana.",
                  },
                ].map((card) => (
                  <div
                    key={card.k}
                    className="border border-ink/10 p-5 bg-snow-100 hover:border-ink/25 transition-colors"
                  >
                    <Pill tone="tiff">{card.k}</Pill>
                    <p className="mt-4 font-display text-xl">{card.v}</p>
                    <p className="mt-2 text-[13px] text-ink/55 leading-snug">{card.d}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </ProtocolSection>

          <ProtocolSection id="royalty">
            <div ref={royaltyRef.ref as Ref<HTMLDivElement>}>
              <FadeUp>
                <p className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45 mb-4">
                  01 · Royalty calculation
                </p>
                <h2 className="font-display text-[clamp(28px,3.5vw,48px)] tracking-tight leading-[1.05]">
                  From gross sale to creator legs
                </h2>
                <p className="mt-6 max-w-[56ch] text-ink/65 leading-[1.6]">
                  Every marketplace purchase emits a single gross figure in USDC. The settlement
                  service applies a platform fee, reads ownership from the composition PDA on
                  Solana, and allocates the net pool proportionally. No renegotiation at checkout —
                  the chain snapshot wins.
                </p>
                <div className="mt-10 font-mono text-[13px] bg-snow-100 border border-ink/10 p-5 leading-relaxed">
                  <div>net = gross × (1 − platform_fee)</div>
                  <div className="mt-2 text-ink/55">
                    leg_i = net × (ownership_bp_i / 10_000)
                  </div>
                </div>
                <div className="mt-10">
                  <RoyaltyCalculator />
                </div>
                <div className="mt-12">
                  <SettlementBarsSvg
                    active={royaltyRef.active}
                    reducedMotion={motionOff}
                  />
                </div>
              </FadeUp>
            </div>
          </ProtocolSection>

          <ProtocolSection id="ledger" dark>
            <div ref={ledgerRef.ref as Ref<HTMLDivElement>}>
            <FadeUp>
              <p className="text-[10px] tabular uppercase tracking-[0.22em] text-snow-0/45 mb-4">
                02 · Ledger branch
              </p>
              <h2 className="font-display text-[clamp(28px,3.5vw,48px)] tracking-tight text-snow-0 leading-[1.05]">
                Ledger Branch — where truth lives
              </h2>
              <p className="mt-6 max-w-[56ch] text-snow-0/60 leading-[1.6]">
                The ledger is not one database — it is a <em>branch</em>. Hot twins in Mongo answer
                product surfaces in milliseconds. Solana holds the ownership vector settlement must
                cite. ClickHouse mirrors events for Monte Carlo and audit. Reconciliation jobs detect
                drift; settlement never proceeds on stale equity.
              </p>
              <div className="mt-12 grid lg:grid-cols-2 gap-10 items-start">
                <SolanaAccountTreeSvg
                  active={ledgerRef.active}
                  reducedMotion={motionOff}
                />
                <ul className="space-y-6 text-[14px] text-snow-0/70 leading-relaxed">
                  <li>
                    <strong className="text-snow-0">Composition PDA</strong> — stores normalized
                    basis points per creator; updated after each equity recomputation.
                  </li>
                  <li>
                    <strong className="text-snow-0">Equity snapshots</strong> — Mongo timeline of
                    every revision with signal evidence and rule overrides.
                  </li>
                  <li>
                    <strong className="text-snow-0">Settlement records</strong> — gross, fee, legs,
                    Circle + Solana refs — immutable once confirmed.
                  </li>
                  <li>
                    <strong className="text-snow-0">Event bus</strong> — Kafka partitions by
                    composition; purchase events enriched and on bus in &lt;100ms.
                  </li>
                </ul>
              </div>
            </FadeUp>
            </div>
          </ProtocolSection>

          <ProtocolSection id="equity">
            <div ref={equityRef.ref as Ref<HTMLDivElement>}>
              <FadeUp>
                <p className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45 mb-4">
                  03 · Algorithmic equity
                </p>
                <h2 className="font-display text-[clamp(28px,3.5vw,48px)] tracking-tight leading-[1.05]">
                  The equity formula
                </h2>
                <p className="mt-6 max-w-[58ch] text-ink/65 leading-[1.6]">
                  Contribution signals are normalized per channel, weighted, and summed. Log scaling
                  prevents spam; pre-agreed floors and caps apply when creators negotiate fixed splits.
                  Output is always 10,000 basis points — the only vector settlement trusts.
                </p>
                <div className="mt-8 rounded-lg border border-ink/10 bg-snow-100 p-5 font-mono text-[12px] leading-relaxed overflow-x-auto">
                  <div>S_total(i) = Σ_c  w_c · norm_c(i)</div>
                  <div className="mt-2 text-ink/55">
                    equity_bp(i) = round(10_000 · S_total(i) / Σ_j S_total(j))
                  </div>
                  <div className="mt-4 text-ink/45 text-[11px]">
                    Channels c: participation (0.25) · midi (0.30) · arrangement (0.20) · ai (0.15)
                    · structural (0.10)
                  </div>
                </div>
                <div className="mt-10">
                  <EquityTimelineSvg
                    active={equityRef.active}
                    reducedMotion={motionOff}
                  />
                </div>
                <div className="mt-10">
                  <CodeBlock
                    label="computeAlgorithmicEquity"
                    code={COMPUTE_ALGORITHMIC_EQUITY}
                  />
                </div>
              </FadeUp>
            </div>
          </ProtocolSection>

          <ProtocolSection id="settlement">
            <FadeUp>
              <p className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45 mb-4">
                04 · Settlement rail
              </p>
              <h2 className="font-display text-[clamp(28px,3.5vw,48px)] tracking-tight leading-[1.05]">
                Circle → Solana execution
              </h2>
              <p className="mt-6 max-w-[56ch] text-ink/65 leading-[1.6]">
                After splits are computed, Circle Payouts stages parallel USDC legs. The program
                verifies signatures against the PDA, writes settlement snapshots, and twins refresh
                lifetime revenue and available balances — auditable end-to-end.
              </p>
              <div className="mt-10">
                <CodeBlock
                  label="executeSettlementWithEquity"
                  code={EXECUTE_SETTLEMENT_WITH_EQUITY}
                />
              </div>
            </FadeUp>
          </ProtocolSection>

          <ProtocolSection id="timeline" className="pb-32">
            <div ref={timelineRef.ref as Ref<HTMLDivElement>}>
            <FadeUp>
              <p className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45 mb-4">
                05 · Full trace
              </p>
              <h2 className="font-display text-[clamp(28px,3.5vw,48px)] tracking-tight leading-[1.05]">
                Velvet Clip · $15 USDC
              </h2>
              <p className="mt-6 max-w-[56ch] text-ink/65 leading-[1.6] mb-12">
                From first bar to final leg — the same narrative the royalty carousel steps through,
                at architectural scale.
              </p>
              <FullFlowDiagram
                steps={FLOW_STEPS}
                active={timelineRef.active}
                reducedMotion={motionOff}
              />
            </FadeUp>
            </div>
            <div className="mt-20 flex flex-wrap gap-4">
              <Link
                href="/treasury"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-snow-0 text-[13px]"
              >
                Governance
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 text-[13px] uline text-ink/70">
                Back to home
              </Link>
            </div>
          </ProtocolSection>
        </div>
      </div>
    </div>
  );
}
