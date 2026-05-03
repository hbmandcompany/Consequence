import Link from "next/link";
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
import { LiveMetrics } from "@/components/sw/live-metrics";
import { CodeMonolith } from "@/components/sw/code-monolith";
import { ScalePath } from "@/components/sw/scale-path";

/** Full WorkSpace / engine narrative — embedded on the homepage. */
export function EngineDeepDive() {
  return (
    <>
      <SwHero />
      <SwOverview />
      <Pillars />
      <Architecture />
      <CodeAndMetrics />
      <Scaling />
      <Resilience />
      <CTA />
    </>
  );
}

function SwHero() {
  return (
    <Section
      id="software"
      className="pt-20 lg:pt-28 pb-24 overflow-hidden border-t border-ink/10 scroll-mt-28"
    >
      <Container>
        <div className="grid grid-cols-12 gap-y-12 gap-x-8 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-3 mb-8">
              <Pill tone="gold">Engine</Pill>
              <span className="text-[11px] tabular tracking-[0.2em] uppercase text-ink/45">
                WorkSpace · v 1.0
              </span>
            </div>
            <Display as="h2">
              The engine
              <br />
              underneath
              <br />
              <span className="italic text-ink/85">everything.</span>
            </Display>
            <Lede className="mt-10 max-w-[60ch]">
              A Kubernetes-native, event-driven, GPU-accelerated substrate that
              ingests behavior, decisions, performance and capital — and
              answers, continuously and at industrial scale, the only question
              that matters: <em>what happens next?</em>
            </Lede>

            <div className="mt-10 flex items-center gap-4">
              <Link
                href="#architecture"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-snow-50 text-[13px] hover:bg-ink/90 transition-colors"
              >
                Read the architecture
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-[13px] uline text-ink"
              >
                Talk to a platform engineer
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <FadeUp>
              <LiveMetrics />
            </FadeUp>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function SwOverview() {
  const items = [
    {
      k: "Ingest",
      v: "Kafka",
      d: "Million-events-per-second nervous system. Schema-disciplined. Three-replica.",
    },
    {
      k: "Predict",
      v: "Triton",
      d: "GPU inference at p99 < 50ms. Canary, shadow, auto-rollback.",
    },
    {
      k: "Forecast",
      v: "Argo + Ray",
      d: "Monte Carlo, agent-based, RL — scaled to 10,000 pods on demand.",
    },
    {
      k: "Remember",
      v: "Twins",
      d: "Living digital state of every modeled actor — probabilistic, queryable.",
    },
  ];
  return (
    <Section className="py-20 border-t border-ink/10">
      <Container>
        <div className="grid grid-cols-12 gap-y-10 gap-x-8">
          {items.map((it, i) => (
            <FadeUp key={it.k} delay={i * 0.05} className="col-span-12 md:col-span-3">
              <div className="border-t border-ink/15 pt-6 h-full flex flex-col">
                <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">
                  {it.k}
                </div>
                <div className="font-display text-[clamp(36px,3.6vw,56px)] leading-none tracking-tight mt-3">
                  {it.v}
                </div>
                <p className="mt-5 text-[13px] text-ink/60 leading-[1.6]">
                  {it.d}
                </p>
              </div>
            </FadeUp>
          ))}
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
      n: "Inference",
      tag: "GPU · Triton · KServe · Ray Serve",
      title: "Models that score reality, in real time.",
      body: "Behavioral prediction, content ranking, virality scoring, anomaly detection, reward modelling. Multi-instance GPU partitioning, request batching at the millisecond, canary rollouts with shadow comparison and automatic rollback on regression.",
      bullets: [
        "p99 < 50ms on production fleets",
        "1067 req/s/GPU at 32-batch",
        "MIG partitioning · 4–7 instances per H100",
        "MLflow-tracked versions, traffic-shifted",
      ],
    },
    {
      id: "simulation",
      n: "Simulation",
      tag: "Argo Workflows · Ray · 10k-pod parallelism",
      title: "Rehearse the future, then act on it.",
      body: "Monte Carlo for distributions of outcomes, agent-based for emergent behavior, discrete-event for trajectories, RL for policy improvement. Ten thousand pods on demand, results aggregated and emitted back into the bus as new state.",
      bullets: [
        "10,000-scenario Monte Carlo runs",
        "Agent-based models with Ray actors",
        "Tiered priority scheduling on spot",
        "Outputs feed back into the live system",
      ],
    },
    {
      id: "twins",
      n: "Digital Twins",
      tag: "Mongo · Qdrant · ClickHouse · Redis",
      title: "Every modeled thing, continuously alive.",
      body: "Twins are not records — they are continuously-updated probabilistic models. Sharded by entity, queryable through a sub-10ms API, historical to the second, with explicit uncertainty so consumers can treat them as distributions, not point estimates.",
      bullets: [
        "8.6M live twins, sub-second update lag",
        "Probabilistic representation, not a record",
        "Sub-10ms median read for hot twins",
        "Time-travel queries via ClickHouse",
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
            Inference says what is happening now. Simulation says what will
            happen if we let it. Twins remember everything that has happened.
            Each scales independently. Each fails independently. None of them
            block the others.
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
    <div id={p.id} className="grid grid-cols-12 gap-y-8 gap-x-8 bg-snow-0 border border-ink/10 p-8 lg:p-12 hover:border-ink/30 transition-colors duration-700 scroll-mt-28">
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
            <li key={b} className="text-[13px] text-ink/75 flex items-start gap-2">
              <Zap className="w-3 h-3 text-tiff-500 mt-1 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
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
            streaming substrate, the data layer, the inference fleet, the
            simulation orchestrator, the twin layer, and finally the application
            surfaces. Each layer scales and fails on its own clock.
          </div>
        </div>
        <FadeUp>
          <ArchitectureDiagram />
        </FadeUp>
      </Container>
    </Section>
  );
}

function CodeAndMetrics() {
  return (
    <Section className="py-32 border-t border-ink/10">
      <Container>
        <div className="grid grid-cols-12 gap-y-12 gap-x-8">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow label="Operator-grade" />
            <Display className="mt-6 max-w-[14ch]">
              GitOps. Observability. <span className="italic text-ink/80">No surprises.</span>
            </Display>
            <Lede className="mt-8">
              Every cluster change is a Git commit. Every deployment is an
              Argo&nbsp;CD sync. Every model is a registered version with shadow
              comparison and an automatic rollback path. Prometheus, Grafana,
              Loki and Tempo are wired from day one — because retrofitting
              observability is much harder than building it in.
            </Lede>
            <div className="mt-12">
              <HairlineRow left="Service mesh" right="Istio · mTLS · canary traffic shifting" />
              <HairlineRow left="Streaming" right="Kafka 3-replica · ISR ≥ 2 · partitioned by entity" />
              <HairlineRow left="Inference" right="Triton + KServe · MIG · MLflow versions" />
              <HairlineRow left="Simulation" right="Argo Workflows + Ray · tiered priority" />
              <HairlineRow left="Storage" right="Mongo · Qdrant · ClickHouse · PG · Redis" />
              <HairlineRow left="Settlement" right="Solana · Circle USDC · sub-10s splits" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <CodeMonolith />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Scaling() {
  return (
    <Section className="py-32 border-t border-ink/10">
      <Container>
        <div className="flex items-end justify-between gap-8 mb-12">
          <div>
            <Eyebrow label="Scale path" />
            <Display className="mt-6 max-w-[18ch]">
              1M → 10M → 100M users.
            </Display>
          </div>
          <div className="hidden md:block max-w-md text-[14px] text-ink/65">
            The architectural shape persists. The implementations underneath
            evolve at every order of magnitude.
          </div>
        </div>
        <ScalePath />

        <div className="mt-20 grid grid-cols-12 gap-y-12 gap-x-8">
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="6" unit="brokers" label="Kafka cluster size at the 1M-user MVP scale." />
          </div>
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="24" unit="brokers" label="Kafka at 10M; partitioning per-entity preserved." />
          </div>
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="3" unit="AZ" label="Replication across availability zones, fault tolerant by default." />
          </div>
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="100M" unit="users" label="Multi-region active-active, edge inference caches, dedicated platform team." />
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
      d: "Circuit breakers in the mesh trip on elevated error rate. Callers fall back to cached predictions or simpler heuristics.",
      tag: "Graceful",
    },
    {
      t: "Kafka broker failure",
      d: "Three-replica, ISR ≥ 2. Partition leaders re-elect. Zero data loss. Cluster operates degraded.",
      tag: "Tolerated",
    },
    {
      t: "Database primary loss",
      d: "Mongo replica sets, Qdrant cluster, ClickHouse replicated tables, PG streaming replication — all auto-failover.",
      tag: "Automatic",
    },
    {
      t: "Bad model deployment",
      d: "Shadow comparison detects regression on candidate. Traffic snaps back to incumbent. Owning team paged.",
      tag: "Reversed",
    },
    {
      t: "Region partition",
      d: "Each region runs a complete stack. Local users continue to be served from local data. Cross-region replication catches up on heal.",
      tag: "Local-first",
    },
    {
      t: "Compound failure",
      d: "Documented runbooks. Bounded recovery time. GitOps-restorable cluster state.",
      tag: "Bounded",
    },
  ];
  return (
    <Section className="py-32 border-t border-ink/10 bg-snow-100">
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
              Request access
            </div>
            <div className="font-display text-3xl mt-2">WorkSpace</div>
            <div className="mt-6 space-y-4">
              <input
                placeholder="Name"
                className="w-full bg-transparent border-b border-snow-50/20 focus:border-snow-50/60 outline-none py-2 text-[14px] placeholder:text-snow-50/40"
              />
              <input
                placeholder="Work email"
                className="w-full bg-transparent border-b border-snow-50/20 focus:border-snow-50/60 outline-none py-2 text-[14px] placeholder:text-snow-50/40"
              />
              <input
                placeholder="Vertical or use case"
                className="w-full bg-transparent border-b border-snow-50/20 focus:border-snow-50/60 outline-none py-2 text-[14px] placeholder:text-snow-50/40"
              />
              <button className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-snow-50 text-ink py-3 rounded-full text-[12px] tracking-tight hover:bg-snow-50/90 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-tiff animate-breathe" />
                Send request
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
