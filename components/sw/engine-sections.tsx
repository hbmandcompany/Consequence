import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, ChevronRight, Zap } from "lucide-react";
import {
  Container,
  Display,
  Eyebrow,
  FadeUp,
  HairlineRow,
  Lede,
  NumberStat,
  Pill,
  Section,
} from "@/components/ui";
import { ArchitectureDiagram } from "@/components/sw/architecture";
import { RoyaltyTransactionPanel } from "@/components/sw/royalty-transaction";
import { CollaborationSessionIllustration } from "@/components/sw/collaboration-session-illustration";
import { COLLABORATION_FEATURES } from "@/lib/collaboration-features";
import { DigitalTwinsDashboard } from "@/components/sw/digital-twins-dashboard";
import { InferenceMeetIllustration } from "@/components/sw/inference-meet-illustration";
import { SimulationMpcIllustration } from "@/components/sw/simulation-mpc-illustration";
import { ScalePath } from "@/components/sw/scale-path";

/** WorkSpace / engine narrative — embedded on the homepage. */
export function EngineDeepDive() {
  return (
    <>
      <SwHero />
      <Pillars />
      <Architecture />
      <Collaboration />
      <Scaling />
      <Resilience />
      <CTA />
    </>
  );
}

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

function SwHero() {
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
                surface is WorkSpace, Trending, or the reserve itself, the core does not fork — it projects the same
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

function Pillars() {
  const pillars: Pillar[] = [
    {
      id: "inference",
      n: "Live Composition",
      tag: "Real-time · Collaborative · Presence · Attribution",
      title: "Composition happens together, instantly.",
      body: "Live melodic, harmonic, and rhythmic composition in one shared canvas — every voice, chord change, and groove edit synchronized in sub-second time. Collaborators see the same evolving score, not a stale export; presence and attribution track who shaped which line as the piece grows. A live earnings rail runs beside the music so splits stay honest while you write. Composer A sketches the hook, Composer B answers with harmony, and Composer C (10%) watches each melodic decision accrue — +$1.35 per sale toward settlement as the motif lands — with every note change logged for split and review before it commits.",
      bullets: [
        "Sub‑second sync on shared melodic lines, harmonic voicings, and rhythm grids",
        "Presence and cursors anchored to the phrase, bar, and beat — not static files",
        "Per-decision attribution: who wrote the motif, who voiced the harmony, who locked the groove",
        "Reviewer‑gated merges with live split preview before a compositional choice ships",
      ],
    },
    {
      id: "simulation",
      n: "Outcome Rehearsal",
      tag: "Monte Carlo · Agent-based · RL · Prediction",
      title: "Test every musical choice before you commit.",
      body: "Monte Carlo over compositional futures — how a harmonic pivot performs, how a melodic motif evolves across keys and arrangements, what happens if you tighten the rhythm or open the meter. Agent-based models trace how a creator’s voice and earning path shift as choices stack; discrete-event paths follow remix chains and upstream capital; RL searches policies for voicing, pacing, and release timing that lift engagement and payouts. Ten thousand pods on demand, outcomes aggregated and written back into the bus as rehearsed state you can act on.",
      bullets: [
        "10,000-scenario Monte Carlo: this cadence vs that resolution — performance and revenue bands",
        "Agent-based melodic trajectories — motif evolution, audience pull, and capital over 30d",
        "Discrete-event paths for harmonic reharmonization and rhythmic consequence chains",
        "RL search for voicing, tempo, and release moves that lift engagement and creator earnings",
      ],
    },
    {
      id: "twins",
      n: "Creative Ledger",
      tag: "Ownership · Memory · Attribution · Capital",
      title: "Every note belongs to someone. The ledger remembers.",
      body: "A ledger of creative ownership — who originated the melody, who contributed the harmony, who owns the rhythm pattern — with immutable memory of every compositional act, not just a probabilistic snapshot. Sharded by work and contributor, sub-10ms reads on hot attribution paths, history to the second, with capital legs tied to creative lineage so downstream systems treat ownership as fact: this phrase, this split, this settlement. The ledger remembers what twins predict; capital follows the notes that earned it.",
      bullets: [
        "Immutable creative memory: melody, harmony, and rhythm lineage per work",
        "Ownership graph — composer, co-writer, and contributor shares on every phrase",
        "Attribution tracking from first motif to final master, linked to settlement legs",
        "Time-travel queries — who owned what when, gross, fees, net, settled vs pending",
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
              Predict. Rehearse.
              <br />
              <span className="italic text-ink/80">Remember.</span>
            </Display>
          </div>
          <div className="col-span-12 md:col-span-5 text-[15px] text-ink/65 leading-[1.7]">
            Inference is the collaboration layer: shared studio context, presence,
            and review before anything ships — with earnings visible in the same
            frame. Simulation says what will happen if we release, price, or route
            capital. Twins remember every play, sale, split, and settlement. Each
            scales independently. Each fails independently. None of them block the
            others.
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
            <InferenceMeetIllustration />
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
            <DigitalTwinsDashboard />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Architecture() {
  return (
    <Section id="architecture" className="py-32 border-t border-ink/10 bg-snow-100 scroll-mt-28">
      <Container>
        <div className="grid grid-cols-12 gap-y-12 gap-x-8 items-end mb-12">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow label="Architecture" />
            <Display className="mt-6 max-w-[14ch]">
              Seven layers,
              <br />
              <span className="italic text-ink/80">one breath.</span>
            </Display>
          </div>
          <div className="col-span-12 md:col-span-5 text-[15px] text-ink/65 leading-[1.7]">
            Bottom to top: bare-metal Hetzner with mixed NVIDIA H100 / L40S
            pools, Kubernetes orchestration with regional clusters, a Kafka
            stream for plays, sales, and settlements, the data layer, the inference
            fleet, the simulation orchestrator, the twin layer for compositions
            creators and capital, and finally Shop and Treasury. Each layer
            scales and fails on its own clock.
          </div>
        </div>
        <ArchitectureDiagram />
      </Container>
    </Section>
  );
}

function Collaboration() {
  return (
    <Section id="collaboration" className="py-32 border-t border-ink/10 scroll-mt-28">
      <Container>
        <div className="grid grid-cols-12 gap-y-12 gap-x-8">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow label="Collaboration" accent="tiff" />
            <Display className="mt-6 max-w-[16ch]">
              In the room,
              <br />
              <span className="italic text-ink/80">on the record.</span>
            </Display>
            <Lede className="mt-8">
              Studio sessions bring composers, publishers, and agents into one
              live surface — video, shared piano roll, stem lanes, and split
              proposals that write back to the ledger as the conversation
              happens. Nothing is lost between the call and the contract: session
              state, attribution signals, and equity revisions stay synchronized.
            </Lede>
            <div className="mt-12">
              <HairlineRow
                left={COLLABORATION_FEATURES["live-session"].label}
                right={COLLABORATION_FEATURES["live-session"].tagline}
                href={COLLABORATION_FEATURES["live-session"].href}
              />
              <HairlineRow
                left={COLLABORATION_FEATURES["shared-workspace"].label}
                right={COLLABORATION_FEATURES["shared-workspace"].tagline}
                href={COLLABORATION_FEATURES["shared-workspace"].href}
              />
              <HairlineRow
                left={COLLABORATION_FEATURES["split-proposals"].label}
                right={COLLABORATION_FEATURES["split-proposals"].tagline}
                href={COLLABORATION_FEATURES["split-proposals"].href}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <CollaborationSessionIllustration />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Scaling() {
  return (
    <Section id="scaling" className="py-32 border-t border-ink/10 scroll-mt-28">
      <Container>
        <div className="flex items-end justify-between gap-8 mb-12">
          <div>
            <Eyebrow label="Scale path" />
            <Display className="mt-6 max-w-[18ch]">
              1M → 10M → 100M users.
            </Display>
          </div>
          <div className="hidden md:block max-w-md text-[14px] text-ink/65">
            The architectural shape persists. At 1M users you clear $1.84M/day in
            settlements on one mesh; at 100M, edge inference ranks feeds and
            capital velocity across regions while the same twin contracts hold.
          </div>
        </div>
        <ScalePath />

        <div className="mt-20 grid grid-cols-12 gap-y-12 gap-x-8">
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="6" unit="brokers" label="Kafka cluster size at the 1M-user MVP scale — plays, sales, settlements." />
          </div>
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="24" unit="brokers" label="Kafka at 10M; per-composition and per-creator partitions preserved." />
          </div>
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="3" unit="AZ" label="Replication across availability zones — catalog twins and settlement ledger alike." />
          </div>
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="100M" unit="users" label="Multi-region active-active, edge inference for feeds and live capital monitoring." />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Resilience() {
  const modes = [
    {
      t: "Inference fleet degradation",
      d: "If composition ranking fails, the mesh falls back to simpler ranking; earnings and risk models keep running on cached paths.",
      tag: "Graceful",
    },
    {
      t: "Kafka broker failure",
      d: "Royalty transaction stream and play stream share ISR ≥ 2; leaders re-elect; zero loss; settlement consumers resume degraded.",
      tag: "Tolerated",
    },
    {
      t: "Database primary loss",
      d: "Creator twins, capital twins, and ledger shards — Mongo, Qdrant, ClickHouse, PG — auto-failover without splitting payout truth.",
      tag: "Automatic",
    },
    {
      t: "Bad model deployment",
      d: "Shadow comparison catches regressions in AI stems suggestions or earnings forecasts; traffic returns to incumbent; owners paged.",
      tag: "Reversed",
    },
    {
      t: "Region partition",
      d: "Local producers keep arranging; USDC settles against local ledger views; cross-region replication reconciles capital on heal.",
      tag: "Local-first",
    },
    {
      t: "Compound failure",
      d: "Runbooks bound recovery to minutes; capital in flight protected by Solana finality and Circle custody; GitOps restores mesh state.",
      tag: "Bounded",
    },
  ];
  return (
    <Section id="resilience" className="py-32 border-t border-ink/10 bg-snow-100 scroll-mt-28">
      <Container>
        <div className="grid grid-cols-12 gap-y-12 gap-x-8 items-end mb-12">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow label="Resilience" />
            <Display className="mt-6 max-w-[14ch]">
              No single failure
              <br />
              <span className="italic text-ink/80">takes the room.</span>
            </Display>
          </div>
          <div className="col-span-12 md:col-span-5 text-[15px] text-ink/65 leading-[1.7]">
            Resilience is not luck. Every failure mode is anticipated, every
            recovery path is rehearsed in simulation, every blast radius is
            bounded. Graceful degradation is the default.
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

function CTA() {
  return (
    <Section id="contact" className="py-32 border-t border-ink/10 scroll-mt-28">
      <Container>
        <div className="grid grid-cols-12 gap-y-10 gap-x-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <Display>
              Build on the
              <br />
              consequence.
            </Display>
            <Lede className="mt-8">
              The engine is currently in private deployment for the HBM & Company
              music vertical. Partner integrations open Q4. If you are building a
              vertical that needs a real-time consequence substrate, we would
              like to hear about it.
            </Lede>
          </div>
          <div className="col-span-12 md:col-span-4 bg-ink text-snow-50 p-8">
            <div className="text-[10px] tabular uppercase tracking-[0.22em] text-snow-50/55">
              Client login
            </div>
            <div className="font-display text-3xl mt-2">Treasury</div>
            <p className="mt-4 text-[13px] text-snow-50/60 leading-relaxed">
              Partner and operator access to settlement rails, ledger APIs, and
              deployment consoles.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full inline-flex items-center justify-center gap-2 bg-snow-50 text-ink py-3 rounded-full text-[12px] tracking-tight hover:bg-snow-50/90 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-tiff animate-breathe" />
                Client login
              </Link>
              <Link
                href="/signup"
                className="w-full inline-flex items-center justify-center py-3 rounded-full text-[12px] tracking-tight border border-snow-50/25 text-snow-50/90 hover:border-snow-50/50 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
