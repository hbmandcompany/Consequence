"use client";

import type { ReactNode, RefObject } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInViewOnce, usePrefersReducedMotion } from "@/hooks/use-in-view-once";
import {
  APPLY_EQUITY_RULE,
  COMPUTE_ALGORITHMIC_EQUITY,
  EXECUTE_SETTLEMENT_WITH_EQUITY,
  RECORD_CONTRIBUTION_SIGNAL,
  RECORD_EQUITY_UPDATE_SOLANA,
} from "@/lib/rails-code-samples";
import { CodeBlock } from "./code-block";
import {
  EquityTimelineSvg,
  ExamplePiesSvg,
  FullFlowDiagram,
  HeroPillarsDiagram,
  MongoErdSvg,
  ReconciliationFlowSvg,
  SettlementBarsSvg,
  SignalWeightsBar,
  SolanaAccountTreeSvg,
} from "./illustrations";

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <aside
      className="my-6 pl-3 border-l-8 border-ink dark:border-snow-200 bg-[#F5F5F5] dark:bg-[#1F1F1F] py-3 px-4 text-[15px] md:text-base leading-relaxed text-ink dark:text-snow-100"
      role="note"
    >
      {children}
    </aside>
  );
}

function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "text-[15px] md:text-base leading-[1.6] text-ink dark:text-snow-100 [&_strong]:font-semibold",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="font-display text-[28px] sm:text-[30px] lg:text-[32px] tracking-tight text-ink dark:text-snow-50 scroll-mt-28"
    >
      {children}
    </h2>
  );
}

function Subhead({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold tracking-tight text-ink dark:text-snow-50 mt-14 first:mt-0">
      {children}
    </h3>
  );
}

function Muted({ children }: { children: ReactNode }) {
  return <p className="text-[#4A4A4A] dark:text-[#C4C4C4]">{children}</p>;
}

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[13px] px-1.5 py-0.5 rounded border border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5] dark:bg-[#1F1F1F]">
      {children}
    </code>
  );
}

const shell = "mx-auto max-w-[1480px] px-6 md:px-10 lg:px-[60px]";
const divider = "border-b border-[#E8E8E8] dark:border-[#4A4A4A]";

function SignalBlock({
  title,
  body,
  formula,
  example,
  weight,
}: {
  title: string;
  body: ReactNode;
  formula: string;
  example: string;
  weight: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <article
      className="space-y-3 pt-10 border-t border-[#E8E8E8] dark:border-[#4A4A4A] first:border-t-0 first:pt-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h4 className="text-xl md:text-[28px] font-bold text-ink dark:text-snow-50">{title}</h4>
      <Muted>{body}</Muted>
      <div className="rounded-lg border border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5] dark:bg-[#1F1F1F] p-3 font-mono text-[13px] md:text-sm whitespace-pre-wrap overflow-x-auto">
        {formula}
      </div>
      <div className="rounded-lg border border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5] dark:bg-[#1F1F1F] p-3 font-mono text-[12px] md:text-[13px] whitespace-pre-wrap overflow-x-auto text-[#4A4A4A] dark:text-[#C4C4C4]">
        {example}
      </div>
      <div className="pt-2">
        <div className="text-[11px] font-mono uppercase tracking-wide text-[#8A8A8A] mb-1">Weight {weight}</div>
        <div className="h-3 w-full border border-[#E8E8E8] dark:border-[#4A4A4A] rounded-sm overflow-hidden bg-white/40 dark:bg-black/20">
          <div
            className="h-full bg-ink/35 dark:bg-snow-200/35 transition-[transform,opacity] origin-left"
            style={{
              width: `${weight * 100}%`,
              transform: hover ? "scaleY(1.15)" : "scaleY(1)",
              opacity: hover ? 1 : 0.85,
              transition: `transform 300ms ${EASE}, opacity 300ms ${EASE}`,
            }}
          />
        </div>
        <div className="text-[11px] font-mono mt-1 text-[#4A4A4A] dark:text-[#C4C4C4]">{weight.toFixed(2)}</div>
      </div>
    </article>
  );
}

const FLOW_STEPS: { side: "L" | "R"; title: string; detail: string; note?: string; ms?: string }[] = [
  {
    side: "L",
    title: "Composition Created by Creator A",
    detail: "Solana PDA initialized with A = 10,000 bp.",
    ms: "0ms",
  },
  {
    side: "R",
    title: "Creator B Joins Session",
    detail: "Session service records participation signals for the collaborative workspace.",
    note: "Kafka fan-out to signal processors.",
    ms: "50ms",
  },
  {
    side: "L",
    title: "B Adds MIDI Notes",
    detail: "MIDI contribution signal recorded in MongoDB and batched for chain writes.",
    ms: "80ms",
  },
  {
    side: "R",
    title: "B Accepts AI Suggestion",
    detail: "AI signal applies 30% credit to suggester, 70% to acceptor for this event.",
    ms: "100ms",
  },
  {
    side: "L",
    title: "Equity Recomputation Triggered",
    detail: "computeAlgorithmicEquity() runs off-chain; outputs normalized basis points.",
    note: "New equity: A = 6,673 bp · B = 3,327 bp.",
    ms: "120ms",
  },
  {
    side: "R",
    title: "Solana Update",
    detail: "recordEquityUpdateToSolana() submits compute_equity; program validates signatures.",
    ms: "5s",
  },
  {
    side: "L",
    title: "MongoDB Synchronized",
    detail: "An EquitySnapshot is persisted for dashboards and audit timelines.",
    ms: "5.2s",
  },
  {
    side: "R",
    title: "Composition Ready for Marketplace",
    detail: "Final equity published to consequence.cc listing metadata.",
    ms: "5.5s",
  },
  {
    side: "L",
    title: "Buyer Initiates Purchase",
    detail: "$15 USDC sent to escrow; sale intent references composition PDA.",
    ms: "6s",
  },
  {
    side: "R",
    title: "Settlement Service Reads Equity",
    detail: "Reads current ownership from Solana PDA — not from cache.",
    note: "Read from Solana, not cache.",
    ms: "6.05s",
  },
  {
    side: "L",
    title: "Splits Computed",
    detail: "After 10% platform fee: A = $9.01, B = $4.49, platform = $1.50.",
    ms: "6.1s",
  },
  {
    side: "R",
    title: "Circle Payouts",
    detail: "USDC transfers initiated via treasury routes; confirmations polled to finality.",
    ms: "15s",
  },
  {
    side: "L",
    title: "Final Settlement",
    detail: "MongoDB settlement record marked confirmed; Solana settlement_snapshot anchored.",
    note: "Creator A +$9.01 ✓ · Creator B +$4.49 ✓ · Platform +$1.50 ✓",
    ms: "done",
  },
];

export function HowRailsConnectView() {
  const reducedMotion = usePrefersReducedMotion();
  const [heroMounted, setHeroMounted] = useState(false);
  useEffect(() => {
    setHeroMounted(true);
  }, []);

  const equityRef = useInViewOnce(0.1);
  const signalsRef = useInViewOnce(0.08);
  const solanaRef = useInViewOnce(0.08);
  const mongoRef = useInViewOnce(0.08);
  const reconRef = useInViewOnce(0.08);
  const examplesRef = useInViewOnce(0.08);
  const flowRef = useInViewOnce(0.06);

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#0A0A0A] text-ink dark:text-snow-100 min-h-screen">
      {/* HERO */}
      <section
        className={cx(shell, "min-h-[92vh] flex flex-col lg:flex-row gap-12 lg:gap-16 items-center pt-28 pb-16", divider)}
      >
        <div
          className="w-full lg:w-[55%] xl:w-[60%] space-y-6"
          style={{
            opacity: heroMounted ? 1 : 0,
            transition: reducedMotion ? undefined : `opacity 600ms ${EASE}`,
          }}
        >
          <h1 className="font-display text-[clamp(32px,5vw,64px)] leading-[1.05] tracking-tight text-ink dark:text-snow-50">
            How the Rails Connect
          </h1>
          <p className="font-sans text-[18px] md:text-[22px] lg:text-2xl text-[#4A4A4A] dark:text-[#C4C4C4] leading-snug max-w-2xl">
            From marketplace purchase to creator settlement: the architecture of capital flow through Solana,
            algorithmic equity, and MongoDB.
          </p>
          <Prose className="max-w-2xl text-[15px] md:text-base">
            <p>
              This document traces the full journey from the first bar of a composition through dynamic equity
              recalculation, USDC settlement, and on-chain recording. The goal is a single, legible narrative for
              engineers: how ownership is measured, how rules override math when creators agree, and how payouts stay
              faithful to the latest verified state—even when off-chain caches and streaming signals move faster than the
              ledger finalizes.
            </p>
          </Prose>
        </div>
        <div className="w-full lg:w-[45%] xl:w-[40%] flex justify-center">
          <HeroPillarsDiagram started={heroMounted} reducedMotion={reducedMotion} />
        </div>
      </section>

      {/* SECTION 2 — EQUITY MODEL */}
      <section className={cx(shell, "py-12 md:py-14 lg:py-16", divider)} aria-labelledby="equity-model-heading">
        <SectionTitle id="equity-model-heading">The Equity Model — Foundational Concepts</SectionTitle>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div ref={equityRef.ref as RefObject<HTMLDivElement>} className="lg:col-span-7 space-y-[60px]">
            <div>
              <Subhead>Composition Equity as a Living Record</Subhead>
              <Prose className="mt-4 space-y-4">
                <p>
                  Equity in Consequence is a living record—not a one-time split sheet. Every collaborative session emits
                  signals: time in the room, notes authored, structural moves, accepted intelligence. Those signals feed
                  an algorithm that recomputes normalized shares in basis points, bounded by physics (they must sum to
                  10,000) and by whatever creators negotiated beforehand. Yet the system remains humane: when a band
                  insists on a fixed split for branding reasons, the algorithm defers—while still logging the rationale
                  for auditors.
                </p>
                <p>
                  Think of equity as a contract with memory. Each revision snapshots what the machine knew at that second:
                  who contributed what evidence, which rule was in force, and what the resulting ownership vector became.
                  That history matters for disputes, for revisiting royalty disputes in court, and for creators who simply
                  want to understand why their percentage moved overnight when a collaborator accepted a harmonic rewrite.
                </p>
              </Prose>
              <Callout>
                Equity is stored both in MongoDB (for fast queries) and Solana (for immutable record and settlement
                authority).
              </Callout>
            </div>

            <div>
              <Subhead>Algorithmic Equity Equations</Subhead>
              <Prose className="mt-4 space-y-4">
                <p>
                  Algorithmic equity starts from weighted contribution scores. Each signal channel—presence, MIDI,
                  arrangement, AI acceptance, structural edits—is normalized per creator so the cohort sums to one within
                  that channel. Channels are then mixed with explicit weights that reflect how Consequence values different
                  kinds of labor. The mix yields a single scalar per creator; scalars are normalized again into basis
                  points for chain storage.
                </p>
                <p>
                  The weighted contribution score is intentionally richer than raw counts: logarithmic scaling prevents
                  a single obsessive note-spammer from swallowing the pie, while still rewarding meaningful work. Pre-
                  agreed floors and caps are applied after this step when rules demand it—so the math is honest, but not
                  cruel.
                </p>
              </Prose>
              <div className="mt-4 rounded-lg border border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5] dark:bg-[#1F1F1F] p-4 font-mono text-[13px] md:text-sm">
                equity_i = (weighted_contribution_score_i) / (sum of all weighted_contribution_scores)
              </div>
            </div>

            <div>
              <Subhead>Pre-Agreed Contribution Terms</Subhead>
              <Prose className="mt-4 space-y-4">
                <p>
                  Human bands negotiate in language, not tensors. Consequence encodes those agreements as structured rules
                  that can short-circuit or constrain the algorithm. A fixed split ignores signals for distribution
                  purposes but may still ingest signals for analytics. Hybrid rules let the algorithm run, then clamp each
                  creator into humane minimums and negotiated maximums, renormalizing silently so the ledger stays valid.
                </p>
                <p>
                  Tiered rules model first-dollar allocations: the initiator might lock the first 50% while everyone
                  else fights fairly over the remainder. The important invariant is determinism—given the same inputs and
                  rule version, any engineer must arrive at identical basis points, whether recomputing in TypeScript or in
                  the on-chain VM.
                </p>
              </Prose>
              <ul className="mt-4 space-y-2 font-mono text-[13px] md:text-sm">
                {[
                  "Fixed 50/50 split regardless of contribution signals",
                  "Lead creator 70%, collaborators split 30% by contribution",
                  "Algorithmic equity with minimum floor: no collaborator below 5%",
                  "Tiered: first 20% of composition by initiator, remainder by contribution",
                ].map((line) => (
                  <li
                    key={line}
                    className="rounded-md border border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5] dark:bg-[#1F1F1F] px-3 py-2"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Subhead>Equity Snapshots and Version History</Subhead>
              <Prose className="mt-4 space-y-4">
                <p>
                  Snapshots exist because music collaboration is asynchronous and emotional. Someone always joins
                  Tuesday night; someone else exports stems Wednesday morning. Each material change triggers a snapshot:
                  the exact timestamp, equity vector, signal bundle used, event label, and cryptographic pointer to the
                  on-chain update when it lands. History is not vanity—it is how you answer “who owed what when that
                  thirty-second placement cleared?”
                </p>
                <p>
                  Snapshots are cheap in MongoDB and expensive-by-design on-chain: the program stores a rolling buffer of
                  recent commits plus hashes anchoring older history. Settlement always references the specific snapshot
                  that was valid at payout time—closing the loop between human trust and machine proof.
                </p>
              </Prose>
              <Callout>
                Every recomputation creates a snapshot:{" "}
                <InlineCode>(timestamp, equity_distribution, signals_used, triggering_event)</InlineCode>.
              </Callout>
            </div>
          </div>
          <div className="lg:col-span-5 self-start">
            <EquityTimelineSvg active={equityRef.active} reducedMotion={reducedMotion} />
          </div>
        </div>
      </section>

      {/* SECTION 3 — SIGNALS */}
      <section className={cx(shell, "py-12 md:py-14 lg:py-16", divider)} aria-labelledby="signals-heading">
        <SectionTitle id="signals-heading">Contribution Signals and Weighting System</SectionTitle>
        <p className="mt-4 max-w-3xl text-[#4A4A4A] dark:text-[#C4C4C4] text-[15px] md:text-base leading-relaxed">
          Five signal families capture how creative labor accumulates. Each is normalized per cohort, then weighted. The
          weights sum to 1.0—no hidden knobs.
        </p>
        <div ref={signalsRef.ref as RefObject<HTMLDivElement>} className="mt-10 max-w-3xl space-y-0">
          <SignalBlock
            title="Session Participation Signal"
            weight={0.25}
            body={
              <>
                Presence is measured as verifiable seconds in the collaborative session, attributed to authenticated
                creators. The score is proportional share of total seconds—simple to audit, hard to fake without
                breaking session integrity.
              </>
            }
            formula="participation_score = (creator_session_seconds) / (total_all_creators_session_seconds)"
            example={`// Creator A: 3600s, Creator B: 1800s\n// normalized: A = 0.667, B = 0.333`}
          />
          <SignalBlock
            title="MIDI Contribution Signal"
            weight={0.3}
            body={
              <>
                Every authored note event increments MIDI weight, with decay for low-value mechanical duplicates.
                Edits that materially change pitch or rhythm count more than passive quantize passes—keeping the signal
                aligned with musical intent.
              </>
            }
            formula="midi_score_i = normalize(log1p(midi_notes_created_i))"
            example="// See computeAlgorithmicEquity() for full normalization across the cohort."
          />
          <SignalBlock
            title="Arrangement Optimization Signal"
            weight={0.2}
            body={
              <>
                Voice-leading improvements, harmonic substitutions, and formal sectioning moves accumulate here. The
                signal rewards breadth of arrangement craft—not just loudness changes—via reviewer-tuned feature tags on
                each commit.
              </>
            }
            formula="arrangement_score_i = normalize(log1p(arrangement_improvements_i))"
            example="// Improvements are attributed when a PR/merge style event lands in the arrangement graph."
          />
          <SignalBlock
            title="AI Suggestion Acceptance Signal"
            weight={0.15}
            body={
              <>
                When a suggestion fires, credit splits 30% to the model author routing the suggestion and 70% to the
                human who accepted and integrated it. That ratio privileges judgment while acknowledging tooling labor.
              </>
            }
            formula="ai_blend_i = 0.3 * normalize(gen_i) + 0.7 * normalize(acc_i)"
            example="// gen_i = suggestions generated · acc_i = suggestions accepted into timeline"
          />
          <SignalBlock
            title="Structural Contribution Signal"
            weight={0.1}
            body={
              <>
                Section adds, swaps, and large-form reorganization accumulate structural weight. This is intentionally
                smaller than MIDI to prevent macro-editing from swamping note-level craft—yet still nonzero so producers
                who architect the record are never invisible.
              </>
            }
            formula="structural_score_i = normalize(log1p(structural_changes_i))"
            example="// Structural changes are diff-sized against the arrangement tree schema."
          />
        </div>
        <div className="mt-[60px]">
          <SignalWeightsBar active={signalsRef.active} reducedMotion={reducedMotion} />
        </div>
      </section>

      {/* SECTION 4 — SOLANA */}
      <section className={cx(shell, "py-12 md:py-14 lg:py-16", divider)} aria-labelledby="solana-heading">
        <SectionTitle id="solana-heading">Solana Program Architecture with Algorithmic Equity</SectionTitle>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div ref={solanaRef.ref as RefObject<HTMLDivElement>} className="lg:col-span-7 space-y-10">
            <div>
              <Subhead>Program Structure and Instruction Handlers (Revised for Equity)</Subhead>
              <Prose className="mt-4 space-y-4">
                <p>
                  The Consequence program treats equity as first-class state. Instructions are narrow: each mutates a
                  small surface area of the PDA, emits events for indexers, and enforces signer rules so session services
                  cannot silently reallocate shares. Initialization seeds a composition; recording ingests batched
                  signals; compute reconciles the vector; finalize freezes marketing-critical releases for settlement.
                </p>
              </Prose>
              <div className="mt-4 rounded-lg border border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5] dark:bg-[#1F1F1F] p-4 font-mono text-[13px] whitespace-pre">
                {`initialize_composition
record_contribution
compute_equity
set_equity_rule
finalize_equity
transfer_share
record_settlement`}
              </div>
              <ul className="mt-4 space-y-2 text-[15px] md:text-base text-[#4A4A4A] dark:text-[#C4C4C4] list-disc pl-5">
                <li>
                  <strong className="text-ink dark:text-snow-100">initialize_composition</strong> — Seeds PDA, initial
                  owner set, baseline hash.
                </li>
                <li>
                  <strong className="text-ink dark:text-snow-100">record_contribution</strong> — Appends verifiable
                  signals for recomputation.
                </li>
                <li>
                  <strong className="text-ink dark:text-snow-100">compute_equity</strong> — Runs constrained math with
                  rule hooks.
                </li>
                <li>
                  <strong className="text-ink dark:text-snow-100">set_equity_rule</strong> — Authoritative rule payload
                  for hybrid/fixed paths.
                </li>
                <li>
                  <strong className="text-ink dark:text-snow-100">finalize_equity</strong> — Locks snapshot for listing.
                </li>
                <li>
                  <strong className="text-ink dark:text-snow-100">transfer_share</strong> — Rare manual corrections with
                  multisig.
                </li>
                <li>
                  <strong className="text-ink dark:text-snow-100">record_settlement</strong> — Anchors payout vector +
                  USDC trace.
                </li>
              </ul>
            </div>

            <div>
              <Subhead>Account Structure with Equity Signals</Subhead>
              <Prose className="mt-4 space-y-4">
                <p>
                  The PDA packs everything settlement needs: identity of the composition, current ownership rows with lock
                  bits, the dense numeric tensors backing signals, a versioned rule blob, and a bounded snapshot ring
                  buffer. Variable sections are length-prefixed so future SIMD optimizations do not break deserialization.
                  Rent discipline means we store aggregates on-chain and defer verbose commentary to Arweave/IPFS pointers
                  when needed.
                </p>
              </Prose>
              <div className="mt-4 rounded-lg border border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5] dark:bg-[#1F1F1F] p-4 font-mono text-[12px] md:text-[13px] whitespace-pre overflow-x-auto">
                {`[
  discriminator: 8 bytes
  composition_id: 32 bytes
  content_hash: 32 bytes

  // Current equity state
  current_ownership: variable
    - each creator: (pubkey: 32 bytes, basis_points: 16 bits, locked: 1 bit)

  contribution_signals: variable
    - participation_seconds: array[creator_index] → u64
    - midi_notes_created: array[creator_index] → u64
    - arrangement_improvements: array[creator_index] → u64
    - ai_suggestions_generated: array[creator_index] → u64
    - ai_suggestions_accepted: array[creator_index] → u64
    - structural_changes: array[creator_index] → u64
    - signal_last_updated: u64

  equity_rule: variable (JSON or encoded)

  equity_snapshots: array …
]`}
              </div>
              <Callout>This account structure is optimized for Solana&apos;s rent-exempt model.</Callout>
            </div>

            <div>
              <Subhead>On-Chain Equity Computation Logic</Subhead>
              <Prose className="mt-4 space-y-4">
                <p>
                  compute_equity mirrors the TypeScript reference implementation—byte for byte on integer paths—to
                  avoid “two truths.” The VM walks signals, applies rule precedence, normalizes, then writes the new
                  vector while appending a snapshot tuple. Events stream to indexers so Mongo catches up asynchronously
                  without ever becoming authoritative for payouts.
                </p>
              </Prose>
              <ol className="mt-4 list-decimal pl-6 space-y-2 text-[15px] md:text-base text-[#4A4A4A] dark:text-[#C4C4C4]">
                <li>Read contribution signals from account state.</li>
                <li>Apply pre-agreed equity rules.</li>
                <li>Compute weighted contribution scores.</li>
                <li>Normalize scores to basis points (10,000 sum).</li>
                <li>Write new current_ownership array.</li>
                <li>Append snapshot to equity_snapshots ring buffer.</li>
                <li>Emit EquityUpdated for off-chain subscribers.</li>
              </ol>
              <Callout>
                Why this on-chain computation matters: verifiability, single source of truth for settlement.
              </Callout>
            </div>

            <div>
              <Subhead>Pre-Agreed Rules Enforcement</Subhead>
              <Prose className="mt-4 space-y-4">
                <p>
                  Rules are data, not vibes. A fixed rule replaces the vector outright after sanity checks. Hybrid rules
                  compute algorithmic equity first, then clamp per-creator floors and ceilings, renormalizing in a
                  deterministic pass so basis points always sum correctly. The chain refuses ambiguous encodings—if a rule
                  cannot be applied safely, the instruction errors early rather than silently rounding creators out of
                  existence.
                </p>
              </Prose>
              <div className="mt-4 rounded-lg border border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5] dark:bg-[#1F1F1F] p-4 font-mono text-[12px] md:text-sm whitespace-pre overflow-x-auto">
                {`if rule_type == "fixed":
  current_ownership = rule.fixed_splits
else if rule_type == "hybrid":
  algorithmic_equity = compute_algorithmic(signals)
  current_ownership = clamp(algorithmic_equity, rule.min, rule.max)
else:
  current_ownership = compute_algorithmic(signals)`}
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex items-start justify-center lg:sticky lg:top-28">
            <SolanaAccountTreeSvg active={solanaRef.active} reducedMotion={reducedMotion} />
          </div>
        </div>
      </section>

      {/* SECTION 5 — TS WORKFLOW */}
      <section className={cx(shell, "py-12 md:py-14 lg:py-16", divider)}>
        <SectionTitle>TypeScript Workflow Illustrations — Equity Computation</SectionTitle>
        <div className="mt-12 space-y-10 md:space-y-12">
          <div>
            <h3 className="text-xl md:text-2xl font-bold">Recording Contribution Signals</h3>
            <p className="mt-3 max-w-3xl text-[#4A4A4A] dark:text-[#C4C4C4] leading-relaxed">
              Signals land in Mongo first for observability, then batch into chain instructions. This decouples DAW
              telemetry spikes from fee markets while preserving ordering guarantees via monotonic sequence numbers per
              composition.
            </p>
            <div className="mt-4">
              <CodeBlock code={RECORD_CONTRIBUTION_SIGNAL} numbered label="signals.ts" />
            </div>
            <Callout>Signals are batched and submitted to Solana for efficiency.</Callout>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold">Computing Algorithmic Equity</h3>
            <p className="mt-3 max-w-3xl text-[#4A4A4A] dark:text-[#C4C4C4] leading-relaxed">
              The TypeScript reference is what auditors diff against the BPF build. Log-shaped scalars dampen outliers;
              channel weights encode product philosophy explicitly so there is no secret sauce hidden in a weight vector on
              the chain.
            </p>
            <div className="mt-4">
              <CodeBlock code={COMPUTE_ALGORITHMIC_EQUITY} numbered label="equity.ts" />
            </div>
            <Callout>Log scaling prevents outlier users from dominating the equity distribution.</Callout>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold">Applying Pre-Agreed Equity Rules</h3>
            <p className="mt-3 max-w-3xl text-[#4A4A4A] dark:text-[#C4C4C4] leading-relaxed">
              Rules layer on top of the algorithmic vector. Hybrid clamping performs a normalization pass so basis points
              remain integers summing to 10,000—matching Solana account packing.
            </p>
            <div className="mt-4">
              <CodeBlock code={APPLY_EQUITY_RULE} numbered label="rules.ts" />
            </div>
            <Callout>Hybrid rules clamp algorithmic equity to rule-defined ranges.</Callout>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold">Recording Equity Update to Solana</h3>
            <p className="mt-3 max-w-3xl text-[#4A4A4A] dark:text-[#C4C4C4] leading-relaxed">
              After local computation, the payer submits compute_equity with the new rows. Confirmation waits for
              finality-level guarantees required by treasury policy before Mongo snapshots promote to “chain-final.”
            </p>
            <div className="mt-4">
              <CodeBlock code={RECORD_EQUITY_UPDATE_SOLANA} numbered label="chain/equity-update.ts" />
            </div>
            <Callout>This instruction is submitted to the Consequence Program on Solana mainnet.</Callout>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold">Settlement Using Current Equity</h3>
            <p className="mt-3 max-w-3xl text-[#4A4A4A] dark:text-[#C4C4C4] leading-relaxed">
              Settlement re-reads the PDA at execution time. Cached Mongo values may warm dashboards; they never gate
              money movement. If drift is detected between cache and chain, treasury halts and an incident unlocks.
            </p>
            <div className="mt-4">
              <CodeBlock code={EXECUTE_SETTLEMENT_WITH_EQUITY} numbered label="settlement/execute.ts" />
            </div>
            <Callout>Settlement always reads from Solana, never from cached MongoDB values.</Callout>
          </div>
        </div>
      </section>

      {/* SECTION 6 — MONGODB */}
      <section className={cx(shell, "py-12 md:py-14 lg:py-16", divider)}>
        <SectionTitle>MongoDB Persistence Patterns for Equity</SectionTitle>
        <div ref={mongoRef.ref as RefObject<HTMLDivElement>} className="mt-10 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <CollectionCard
              title="composition_equity"
              body="Stores the latest basis-point vector, active rule digest, and content hash mirrors for UX-heavy surfaces. Reads power dashboards; writes follow successful chain updates."
              schema={`export interface CompositionEquityDoc {
  _id: string;
  composition_id: string;
  chain_pda: string;
  basis_points: { creator_id: string; bp: number; locked: boolean }[];
  rule: EquityRulePayload;
  last_recomputation: Date;
  last_chain_sig: string;
}`}
              indexes="Compound: (composition_id, last_recomputation desc)"
              usage='Creator dashboards listing “my share across works.”'
            />
            <CollectionCard
              title="contribution_signals"
              body="Append-only log of normalized and raw signals with source metadata. Enables forensic replay if a chain instruction fails and needs reconstruction."
              schema={`export interface ContributionSignalDoc {
  _id: string;
  composition_id: string;
  creator_id: string;
  kind: SignalKind;
  payload_json: unknown;
  observed_at: Date;
  batch_id?: string;
}`}
              indexes="(composition_id, observed_at) · (creator_id, observed_at)"
              usage="Historical retrieval for audits, per-creator timelines."
            />
            <CollectionCard
              title="equity_history"
              body="Each snapshot from the text workflow—what changed, why, and which signals were consumed. Optimized for timeline APIs and dispute tooling."
              schema={`export interface EquitySnapshotDoc {
  _id: string;
  composition_id: string;
  ts: Date;
  basis_points: Record<string, number>;
  signals_digest: string;
  triggering_event: string;
  chain_sig?: string;
}`}
              indexes="(composition_id, ts desc)"
              usage="Transparency UI, legal exports, rollback analysis."
            />
          </div>

          <div className="rounded-2xl border border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5] dark:bg-[#1F1F1F] p-6 md:p-8">
            <h3 className="text-lg font-bold font-mono">creator_earnings_view</h3>
            <p className="mt-3 text-[#4A4A4A] dark:text-[#C4C4C4] leading-relaxed">
              Materialized view joining confirmed settlements with creator identities. Refreshed transactionally when
              settlement records flip to confirmed so finance never scans raw logs at read time.
            </p>
            <div className="mt-4 rounded-lg border border-[#E8E8E8] dark:border-[#4A4A4A] bg-white/50 dark:bg-[#0A0A0A]/50 p-4 font-mono text-[12px] overflow-x-auto">
              {`export interface CreatorEarningsViewDoc {
  creator_id: string;
  lifetime_usdc: string; // decimal as string
  pending_usdc: string;
  last_settlement_at?: Date;
}`}
            </div>
            <Callout>This is a materialized view updated whenever a settlement is executed.</Callout>
            <p className="mt-3 text-sm text-[#4A4A4A] dark:text-[#C4C4C4]">
              Usage: creator dashboard, lifetime earnings, pending payouts modules.
            </p>
          </div>

          <MongoErdSvg active={mongoRef.active} reducedMotion={reducedMotion} />
        </div>
      </section>

      {/* SECTION 7 — RECONCILIATION */}
      <section className={cx(shell, "py-12 md:py-14 lg:py-16", divider)}>
        <SectionTitle>Reconciliation Model (Equity + Capital)</SectionTitle>
        <div ref={reconRef.ref as RefObject<HTMLDivElement>} className="mt-10 space-y-10">
          <div>
            <Subhead>Equity Freshness Guarantee</Subhead>
            <Prose className="mt-4 space-y-4">
              <p>
                The settlement service treats Mongo equity as a hint, Solana equity as law. Every payout path begins with
                a read of the PDA, optionally cross-checked against a recent finalized slot watermark. If indexer lag is
                detected, payouts queue rather than guessing. This is the difference between “fast UI” and “correct
                money.”
              </p>
            </Prose>
            <Callout>MongoDB equity is a cache; Solana equity is authoritative.</Callout>
          </div>
          <div>
            <Subhead>Equity Change Detection</Subhead>
            <Prose className="mt-4 space-y-4">
              <p>
                Creators subscribe to delta notifications. When any basis-point allocation moves by more than a half
                basis point—roughly one part in twenty thousand—they receive a structured alert citing before/after
                vectors, triggering_event, and chain signature. The threshold is small enough to catch meaningful edits,
                large enough to ignore rounding shimmer during normalization.
              </p>
            </Prose>
            <Callout>
              If equity changes {">"} 0.5 basis points for any creator, notification is sent.
            </Callout>
          </div>
          <div>
            <Subhead>Settlement Audit Trail</Subhead>
            <Prose className="mt-4 space-y-4">
              <p>
                Each settlement record stores gross, fee, net, per-creator legs, treasury routing metadata, and the exact
                snapshot reference plus Solana signature proving which on-chain state was read. Auditors can replay a sale
                without privileged DB access—everything necessary is either on-chain or in an immutable log store.
              </p>
            </Prose>
            <Callout>Every settlement record includes the exact equity snapshot used and its Solana signature.</Callout>
          </div>
          <ReconciliationFlowSvg active={reconRef.active} reducedMotion={reducedMotion} />
        </div>
      </section>

      {/* SECTION 8 — EXAMPLES */}
      <section className={cx(shell, "py-12 md:py-14 lg:py-16", divider)}>
        <SectionTitle>Algorithmic Equity Examples</SectionTitle>
        <div ref={examplesRef.ref as RefObject<HTMLDivElement>} className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5] dark:bg-[#1F1F1F] p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold">Simple Collaboration: Two Creators</h3>
            <Prose className="mt-4 space-y-4">
              <p>
                Creator A initiates with 3,600 seconds of presence and 100 MIDI notes; Creator B joins with 1,800 seconds
                and 50 notes. With only participation and MIDI contributing materially—and no pre-agreed rule—the
                normalized channels align: A leads both channels two-to-one. Weighted mixing yields roughly two-thirds of
                distributable share for A, one-third for B, before basis-point rounding.
              </p>
            </Prose>
            <div className="mt-4 rounded-lg border border-[#E8E8E8] dark:border-[#4A4A4A] bg-white/60 dark:bg-[#0A0A0A]/60 p-4 font-mono text-[12px] whitespace-pre overflow-x-auto text-[#4A4A4A] dark:text-[#C4C4C4]">
              {`SIGNALS:
Participation: A=3600, B=1800
  → Normalized: A=0.667, B=0.333
MIDI: A=100, B=50
  → Normalized: A=0.667, B=0.333

WEIGHTED SCORES:
A: (0.667 × 0.25) + (0.667 × 0.30) = 0.367
B: (0.333 × 0.25) + (0.333 × 0.30) = 0.183
Total: 0.550

BASIS POINTS:
A: (0.367 / 0.550) × 10,000 = 6,673 bp (66.73%)
B: (0.183 / 0.550) × 10,000 = 3,327 bp (33.27%)

SETTLEMENT ($15 USDC sale):
Platform fee (10%): $1.50
Net: $13.50
Creator A: $13.50 × 0.6673 = $9.01
Creator B: $13.50 × 0.3327 = $4.49`}
            </div>
          </div>

          <div className="rounded-2xl border border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5] dark:bg-[#1F1F1F] p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold">Complex Collaboration with Pre-Agreed Rule</h3>
            <Prose className="mt-4 space-y-4">
              <p>
                Three creators collaborate under a tiered initiator rule: A locks 50%, B and C split the remainder
                proportionally by combined MIDI work. Pure algorithmic equity might have floated A lower; the rule pulls
                half the pie off the table before contribution math touches the rest—honoring a business agreement while
                still letting signals adjudicate the rest fairly.
              </p>
            </Prose>
            <div className="mt-4 rounded-lg border border-[#E8E8E8] dark:border-[#4A4A4A] bg-white/60 dark:bg-[#0A0A0A]/60 p-4 font-mono text-[12px] whitespace-pre overflow-x-auto text-[#4A4A4A] dark:text-[#C4C4C4]">
              {`WITHOUT RULE (Algorithmic sketch):
A: ~50%, B: ~33%, C: ~17%

PRE-AGREED (Initiator 50%):
A: 50% (5,000 bp)
Remainder: 50% for B and C by MIDI ratio (150 vs 50 notes)
B: 50% × 0.75 = 37.5% (3,750 bp)
C: 50% × 0.25 = 12.5% (1,250 bp)

SETTLEMENT ($15 USDC sale):
Platform fee (10%): $1.50
Net: $13.50
Creator A: $13.50 × 0.50 = $6.75
Creator B: $13.50 × 0.375 = $5.06
Creator C: $13.50 × 0.125 = $1.69`}
            </div>
            <p className="mt-4 text-sm text-[#8A8A8A] dark:text-[#9A9A9A]">
              Pies compare algorithmic two-creator equity (left) against tiered three-creator rule (right).
            </p>
          </div>
        </div>
        <div className="mt-10 space-y-6">
          <ExamplePiesSvg active={examplesRef.active} reducedMotion={reducedMotion} />
          <SettlementBarsSvg active={examplesRef.active} reducedMotion={reducedMotion} />
        </div>
      </section>

      {/* SECTION 9 — FLOW */}
      <section className={cx(shell, "py-12 md:py-14 lg:py-16", divider)}>
        <SectionTitle>TypeScript Workflow Diagram — Complete Flow</SectionTitle>
        <div ref={flowRef.ref as RefObject<HTMLDivElement>} className="mt-10">
          <FullFlowDiagram steps={FLOW_STEPS} active={flowRef.active} reducedMotion={reducedMotion} />
        </div>
      </section>

      {/* SECTION 10 — CLOSING */}
      <section
        className={cx(shell, "py-16 md:py-20 border-t border-[#E8E8E8] dark:border-[#4A4A4A]")}
        aria-labelledby="closing-heading"
      >
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2
            id="closing-heading"
            className="font-display text-[24px] md:text-[28px] tracking-tight text-ink dark:text-snow-50"
          >
            What Happens Next
          </h2>
          <Prose className="text-[#4A4A4A] dark:text-[#C4C4C4]">
            <p>
              Capital flow is storytelling. If the story is muddy, creators hesitate. When the rails are explicit—signals,
              weights, snapshots, chain proofs, treasury reads—the marketplace can move at the speed of culture without
              sacrificing receipts. This page is the canonical map: equity is computed with care, constrained by agreements
              you actually make in the room, and settlement always defers to the ledger you can audit in public.
            </p>
          </Prose>
          <p>
            <Link
              href="/docs/platform"
              className="text-ink dark:text-snow-100 uline font-medium"
            >
              Ready to start building? Visit the Platform Documentation
            </Link>
          </p>
          <nav aria-label="Related documentation" className="pt-6 text-left sm:text-center">
            <ul className="space-y-2 text-[15px]">
              <li>
                <Link href="/docs" className="text-ink dark:text-snow-100 uline">
                  Consequence Platform Docs
                </Link>
              </li>
              <li>
                <Link href="/earnings" className="text-ink dark:text-snow-100 uline">
                  Creator Earnings
                </Link>
              </li>
              <li>
                <Link href="/faq/settlement" className="text-ink dark:text-snow-100 uline">
                  Settlement FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ink dark:text-snow-100 uline">
                  Request Early Access
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
}

function CollectionCard({
  title,
  body,
  schema,
  indexes,
  usage,
}: {
  title: string;
  body: string;
  schema: string;
  indexes: string;
  usage: string;
}) {
  return (
    <article className="rounded-2xl border border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5] dark:bg-[#1F1F1F] p-5 md:p-6 flex flex-col">
      <h3 className="font-mono text-base md:text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-[14px] md:text-[15px] text-[#4A4A4A] dark:text-[#C4C4C4] leading-relaxed flex-1">{body}</p>
      <div className="mt-4 rounded-lg border border-[#E8E8E8] dark:border-[#4A4A4A] bg-white/50 dark:bg-[#0A0A0A]/50 p-3 font-mono text-[11px] md:text-[13px] overflow-x-auto whitespace-pre">
        {schema}
      </div>
      <div className="mt-3 pl-3 border-l-8 border-ink/80 dark:border-snow-200/80 bg-white/40 dark:bg-black/20 py-2 px-3 text-[13px] text-[#4A4A4A] dark:text-[#C4C4C4]">
        <div className="font-mono text-[11px] uppercase tracking-wide opacity-70 mb-1">Indexes</div>
        {indexes}
      </div>
      <p className="mt-3 text-[13px] text-[#8A8A8A] dark:text-[#9A9A9A]">{usage}</p>
    </article>
  );
}
