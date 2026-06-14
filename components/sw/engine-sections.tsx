import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, ChevronRight, Zap } from "lucide-react";
import {
  Container,
  Display,
  Eyebrow,
  FadeUp,
  Lede,
  Pill,
  Section,
} from "@/components/ui";
import { RoyaltyTransactionPanel } from "@/components/sw/royalty-transaction";
import { GenesisSynthCoverIllustration } from "@/components/sw/genesis-synth-cover-illustration";
import { LyricsAcceleratorIllustration } from "@/components/sw/lyrics-accelerator-illustration";
import { SimulationMpcIllustration } from "@/components/sw/simulation-mpc-illustration";

const RESERVE_ENGINES = [
  {
    k: "Compose",
    v: "Writes",
    accent: "tiff" as const,
    d: "Every compositional act captured as it happens — melodic note entries, harmonic chord progressions, rhythmic pattern decisions, collaborator contributions — entity-shaped, atomically written to the ledger, fan-out replicated until quorum. Indexes warm async so writes stay ahead of reads while the room keeps composing.",
  },
  {
    k: "Analyze",
    v: "Memory",
    accent: "ink" as const,
    d: "Analyze live works for melodic patterns, harmonic tension, rhythmic structure, originality scores, and how a composition will evolve — with ownership splits and musical decisions as debits and credits that commit or roll back together under a single agreed ordering.",
  },
  {
    k: "Rehearse",
    v: "Simulation",
    accent: "gold" as const,
    d: "Rehearse compositional futures at fleet scale — Monte Carlo over melodic variations, harmonic progressions, and rhythmic arrangements — batch work that collapses into summarized paths so creators see what their music could become before they finalize it, beyond interactive limits.",
  },
  {
    k: "Remember",
    v: "Ledger",
    accent: "tiff" as const,
    d: "The ledger as immutable creative memory — who wrote the melody, who added the harmony, who shaped the rhythm, what every creator owns — projected into hot, queryable surfaces. Secondary indexes serve attribution lookups; timestamps and lineage tie every read to the compositional events that produced it.",
  },
] as const;

export function LedgerBranchSection() {
  return (
    <Section
      id="software"
      className="scroll-mt-28 border-t border-ink/10 bg-snow-0 overflow-hidden lg:min-h-[100svh] lg:flex lg:flex-col"
    >
      <Container className="py-12 md:py-14 lg:py-16 lg:flex-1 lg:flex lg:flex-col lg:min-h-0">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 lg:gap-x-8 lg:flex-1 lg:min-h-0 lg:items-stretch">
          {/* Left: headline + engine rail */}
          <div className="col-span-12 lg:col-span-7 flex flex-col lg:min-h-0 lg:justify-between lg:pr-2">
            <div className="flex flex-wrap items-center gap-3 mb-5 lg:mb-6">
              <Pill tone="gold">Treasury</Pill>
              <span className="text-[11px] tabular tracking-[0.2em] uppercase text-ink/45">
                The Reserve · v 1.0
              </span>
            </div>

            <Display as="h2" className="text-[clamp(40px,5.2vw,72px)] leading-[0.95] tracking-tightest-2">
              Ledger
              <br />
              <span className="italic text-ink/85">Branch.</span>
            </Display>

            <div className="mt-5 lg:mt-6 space-y-4 max-w-[62ch]">
              <Lede className="max-w-none text-[14px] lg:text-[15px] leading-[1.68]">
                A single royalty core that ingests composition sales, marketplace transactions, collaborator splits,
                USDC settlement, creator balances, and capital movement patterns — and answers, in continuous time and
                at institutional scale, the only question that matters:{" "}
                <em>what happens next?</em>
              </Lede>
              <Lede className="max-w-none text-[14px] lg:text-[15px] leading-[1.68] text-ink/65">
                The Ledger Branch is that answer made operational: every purchase, split revision, and payout leg
                enters the same partitioned bus, is enriched against composition and creator twins, and is checked
                against on-chain ownership before settlement executes. Studio sessions, governance actions, and
                treasury policy all converge here — one authoritative graph for gross, fees, net, pending, and
                settled, with lineage back to the note, the vote, and the transaction that produced each balance.
              </Lede>
              <Lede className="max-w-none text-[14px] lg:text-[15px] leading-[1.68] text-ink/65">
                Operators see end-to-end trace in real time; creators see earnings bands and available balance without
                waiting for batch close; publishers see attribution and audit refs tied to every leg. Whether the
                surface is Conductor, Trending, or the reserve itself, the core does not fork — it projects the same
                state, enforces the same ordering, and closes the loop when USDC lands on Solana and the twins refresh.
              </Lede>
            </div>

            <div className="mt-5 lg:mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/session-protocol"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-snow-50 text-[13px] hover:bg-ink/90 transition-colors"
              >
                Session Protocol
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/treasury"
                className="inline-flex items-center gap-2 text-[13px] uline text-ink"
              >
                Governance
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-8 lg:mt-0 lg:pt-8 border-t border-ink/10">
              <p className="hidden lg:block mb-3 text-[10px] tabular uppercase tracking-[0.22em] text-ink/40">
                Four surfaces · one core
              </p>
              <div className="hidden lg:grid lg:grid-cols-4 lg:divide-x lg:divide-ink/10 lg:border lg:border-ink/10 bg-snow-100/50">
                {RESERVE_ENGINES.map((it, i) => (
                  <FadeUp
                    key={it.k}
                    delay={i * 0.04}
                    className="px-4 py-4 xl:px-5 xl:py-5 flex flex-col min-h-0"
                  >
                    <div
                      className={clsx(
                        "text-[9px] tabular uppercase tracking-[0.22em]",
                        it.accent === "tiff" ? "text-tiff-600" : it.accent === "gold" ? "text-gold-600" : "text-ink/45"
                      )}
                    >
                      {it.k}
                    </div>
                    <div className="font-display text-[clamp(22px,2vw,36px)] leading-none tracking-tight mt-2">
                      {it.v}
                    </div>
                    <p className="mt-3 text-[11px] xl:text-[12px] text-ink/60 leading-[1.55] flex-1">
                      {it.d}
                    </p>
                  </FadeUp>
                ))}
              </div>

              <div className="lg:hidden space-y-6">
                {RESERVE_ENGINES.map((it, i) => (
                  <FadeUp key={it.k} delay={i * 0.05}>
                    <div className="border-t border-ink/15 pt-5">
                      <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">{it.k}</div>
                      <div className="font-display text-[clamp(32px,8vw,44px)] leading-none tracking-tight mt-2">
                        {it.v}
                      </div>
                      <p className="mt-3 text-[13px] text-ink/60 leading-[1.6]">{it.d}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>

          {/* Right: royalty transaction illustration */}
          <div className="col-span-12 lg:col-span-5 min-h-[22rem] lg:min-h-0 flex flex-col lg:border-l lg:border-ink/10 lg:pl-8">
            <FadeUp className="flex-1 min-h-0 flex flex-col h-full">
              <div className="flex-1 min-h-0 border border-ink/10 bg-snow-0">
                <RoyaltyTransactionPanel compact fillHeight />
              </div>
            </FadeUp>
          </div>
        </div>
      </Container>
    </Section>
  );
}

type Pillar = {
  id: string;
  n: string;
  tag: string;
  title: string;
  body: string;
  bullets: string[];
};

export function GenesisPillarsSection() {
  const pillars: Pillar[] = [
    {
      id: "inference",
      n: "Genesis",
      tag: "Flagship synth · Neural timbre · Patch memory",
      title: "The flagship instrument for Conductor.",
      body: "Genesis is Consequence’s flagship synthesizer — a neural timbre engine built for composition in Conductor, not a full control surface on the marketing page. Patches evolve with context: harmonic tension, rhythmic lane, and twin-backed earnings bands inform how a sound develops before you commit a take. The instrument ships as identity and cover art here; the playable matrix, modulation matrix, and performance macros live inside the studio where attribution and splits already run beside the session.",
      bullets: [
        "Neural timbre core — continuous morphing between analog warmth and digital edge",
        "Patch lineage tied to work, contributor, and session — not anonymous presets",
        "Context-aware voicing: arrangement lane, key center, and groove grid inform the model",
        "Studio-native surface: full synth UI opens in Conductor, not on this page",
      ],
    },
    {
      id: "simulation",
      n: "Drum & Sequence",
      tag: "Step grid · Pattern memory · Swing · Export",
      title: "Lock the groove before the arrangement moves.",
      body: "A dedicated drum machine and step sequencer for pattern-first composition — sixteen steps, four lanes, swing and probability per cell, and pattern chains that export directly to the shared bus. Program kick, snare, hat, and open textures on a 4×4 performance grid, audition variations in place, and commit the winning pattern to the arrangement without leaving Conductor. Patterns carry attribution like any other compositional act: who programmed the groove, which take shipped, and how it routes to settlement.",
      bullets: [
        "16-step grid with per-lane velocity, probability, and micro-timing offsets",
        "4×4 pad surface for live performance and step entry — pattern A/B and chain mode",
        "Swing, humanize, and lane mute written as first-class pattern metadata",
        "One-click export to arrangement stem lanes with split preview intact",
      ],
    },
    {
      id: "twins",
      n: "Lyrics Accelerator",
      tag: "LLM · Meter · Rhyme · Semantic fit",
      title: "Words that keep pace with the music.",
      body: "An LLM-native lyrics layer that respects meter, rhyme scheme, and semantic fit to the work already in flight — not a generic chat box pasted beside the DAW. Draft lines stream beside your hook motif; the model proposes near-rhymes, syllable stress fixes, and motif-consistent imagery while preserving attribution on every accepted stanza. Context pulls from the active work, tempo, key, and twin-backed themes so suggestions stay on-brand for Velvet Clip and the catalog around it.",
      bullets: [
        "Streaming completions with rhyme, meter, and stress annotations inline",
        "Semantic guardrails: hook motif, narrative arc, and banned phrase lists per work",
        "Rhyme and near-rhyme panels with syllable counts for 4/4 and compound meters",
        "Governed export — accepted lines become attributed compositional events on the bus",
      ],
    },
  ];
  return (
    <Section className="py-32 border-t border-ink/10">
      <Container>
        <div className="grid grid-cols-12 gap-8 items-end mb-16">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow label="Three pillars · One shape" />
            <Display className="mt-6 max-w-[16ch]">
              Sound. Groove.
              <br />
              <span className="italic text-ink/80">Language.</span>
            </Display>
          </div>
          <div className="col-span-12 md:col-span-5 text-[15px] text-ink/65 leading-[1.7]">
            Genesis is the flagship synth identity — timbre and patch memory for the
            room. Drum &amp; Sequence is the pattern engine: step grids, swing, and
            export into the arrangement. Lyrics Accelerator is the LLM layer for meter,
            rhyme, and semantic fit. Each scales independently; none blocks the others.
          </div>
        </div>

        <div className="space-y-4">
          {pillars.map((p, i) => (
            <PillarRow key={p.id} p={p} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function PillarRow({ p, index }: { p: Pillar; index: number }) {
  return (
    <div
      id={p.id}
      className="scroll-mt-28 border border-ink/10 bg-snow-0 p-8 transition-colors duration-700 hover:border-ink/30 lg:p-12"
    >
      <div className="grid grid-cols-12 gap-y-8 gap-x-8">
        <div className="col-span-12 md:col-span-4">
          <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/40">
            0{index + 1} / 03
          </div>
          <div className="font-display text-[clamp(48px,5.4vw,80px)] leading-[1] tracking-tightest-2 mt-3">
            {p.n}
          </div>
          <div className="text-[11px] tabular uppercase tracking-[0.18em] text-ink/45 mt-3">
            {p.tag}
          </div>
        </div>
        <div className="col-span-12 md:col-span-5">
          <h3 className="font-display text-[clamp(24px,2.4vw,34px)] leading-[1.15] tracking-tight">
            {p.title}
          </h3>
          <p className="mt-5 text-[15px] text-ink/65 leading-[1.7]">{p.body}</p>
        </div>
        <div className="col-span-12 md:col-span-3">
          <ul className="space-y-3 border-l border-ink/15 pl-5">
            {p.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[13px] text-ink/75">
                <Zap className="mt-1 h-3 w-3 shrink-0 text-tiff-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {p.id === "inference" ? (
        <div className="mt-10 border-t border-ink/10 pt-10">
          <div className="mx-auto max-w-5xl">
            <GenesisSynthCoverIllustration />
          </div>
        </div>
      ) : null}
      {p.id === "simulation" ? (
        <div className="mt-10 border-t border-ink/10 pt-10">
          <div className="mx-auto max-w-3xl">
            <SimulationMpcIllustration />
          </div>
        </div>
      ) : null}
      {p.id === "twins" ? (
        <div className="mt-10 border-t border-ink/10 pt-10">
          <div className="mx-auto max-w-6xl">
            <LyricsAcceleratorIllustration />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function InfrastructureSettlementSection() {
  const modes = [
    {
      t: "Base settlement continuity",
      d: "Coinbase Base executes on-chain legs when splits finalize — ownership transfers, royalty batches, and payout commits run with deterministic ordering while composition, inference, and session traffic stay on the mesh.",
      tag: "Settlement",
    },
    {
      t: "Circle USDC custody & flow",
      d: "Circle supplies USDC liquidity, wallet infrastructure, and programmable payments — creator balances route through custody policy and settlement velocity without blocking realtime collaboration or Session Protocol merges.",
      tag: "Custody",
    },
    {
      t: "Session Protocol synchronization",
      d: "Attribution, presence, and merge ordering are governed before capital moves — sub-second sync across collaborators; authorship events commit under protocol rules so settlement eligibility stays unambiguous.",
      tag: "Deterministic",
    },
    {
      t: "Royalty reconciliation",
      d: "Play and sale events reconcile to gross, fees, net, and split state on Consequence — pending and settled views stay aligned with programmable ownership until Base and USDC close the leg.",
      tag: "Reconciled",
    },
    {
      t: "Local-first creative operation",
      d: "Most musical activity remains off-chain — arrangement, sequencing, and lyric drafts continue on local session state when links degrade; edits queue with bounded divergence until Session Protocol reconciles authorship on heal.",
      tag: "Local-first",
    },
    {
      t: "Cross-region ledger consistency",
      d: "Regional partitions retain creative continuity; capital and attribution views replicate with eventual consistency — failover restores orchestration without splitting payout truth or breaking consensus across the ledger mesh.",
      tag: "Bounded",
    },
  ];
  return (
    <Section id="resilience" className="py-32 border-t border-ink/10 bg-snow-100 scroll-mt-28">
      <Container>
        <div className="grid grid-cols-12 gap-y-12 gap-x-8 items-end mb-12">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow label="Infrastructure" />
            <Display className="mt-6 max-w-[14ch]">
              Settlement
              <br />
              <span className="italic text-ink/80">without pause.</span>
            </Display>
          </div>
          <div className="col-span-12 md:col-span-5 text-[15px] text-ink/65 leading-[1.7]">
            Consequence holds creative state, Conductor collaboration, and attribution in a
            replicated mesh — realtime music stays off-chain. Session Protocol governs
            synchronization and authorship ordering before commits ship. Coinbase Base handles
            settlement and on-chain execution; Circle handles USDC liquidity, custody, and
            programmable payments. Blockchain is the settlement plane — ownership, royalties,
            and creator attribution — not the composition plane. Graceful degradation is the
            default; every blast radius is bounded.
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {modes.map((m, i) => (
            <FadeUp key={m.t} delay={i * 0.04} className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="bg-snow-0 border border-ink/10 p-7 h-full hover:border-ink/35 transition-colors duration-700">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] tabular uppercase tracking-[0.2em] text-ink/45">
                    Mode 0{i + 1}
                  </div>
                  <Pill tone="ghost">{m.tag}</Pill>
                </div>
                <div className="font-display text-[24px] leading-[1.15] tracking-tight mt-5">
                  {m.t}
                </div>
                <p className="mt-4 text-[13px] text-ink/65 leading-[1.6]">
                  {m.d}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}
