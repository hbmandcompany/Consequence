import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
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
  Waveform,
} from "@/components/ui";
import { LiveTicker } from "@/components/live-ticker";
import { ConsequenceMap } from "@/components/consequence-map";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Surfaces />
      <Engine />
      <Numbers />
      <Press />
      <Closing />
    </>
  );
}

function Hero() {
  return (
    <Section className="pt-32 lg:pt-40 pb-24 lg:pb-32 overflow-hidden">
      <Container>
        <div className="grid grid-cols-12 gap-y-10 gap-x-8 items-end">
          <div className="col-span-12 lg:col-span-8">
            <FadeUp>
              <div className="flex items-center gap-4 mb-10">
                <Eyebrow index="01 / 04" label="A Hated By Many House Product" />
                <span className="hidden md:inline-flex items-center gap-2 text-[11px] tabular text-ink/55">
                  <span className="w-1.5 h-1.5 rounded-full bg-tiff animate-breathe" />
                  Live · 12,408 events / sec
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <Display as="h1">
                What
                <br />
                happens
                <br />
                <span className="italic text-ink/85">next.</span>
              </Display>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="mt-12 grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-7">
                  <Lede>
                    Consequence is a real-time consequence engine. It ingests
                    behavior, decisions, performance and capital as a single
                    stream, models every modeled thing as a living digital twin,
                    and answers — continuously, at industrial scale — the only
                    question that matters.
                  </Lede>
                </div>
                <div className="col-span-12 md:col-span-5 md:pl-8 md:border-l border-ink/10">
                  <div className="text-[11px] tabular uppercase tracking-[0.22em] text-ink/45 mb-3">
                    Two surfaces, one engine
                  </div>
                  <div className="space-y-3">
                    <Link
                      href="/cc"
                      className="group flex items-center justify-between border-b border-ink/10 pb-3 hover:border-ink/40 transition-colors"
                    >
                      <span className="text-[15px]">consequence.cc</span>
                      <span className="flex items-center gap-2 text-[11px] tabular text-ink/50 uppercase tracking-[0.16em]">
                        For You
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </Link>
                    <Link
                      href="/software"
                      className="group flex items-center justify-between border-b border-ink/10 pb-3 hover:border-ink/40 transition-colors"
                    >
                      <span className="text-[15px]">consequence.software</span>
                      <span className="flex items-center gap-2 text-[11px] tabular text-ink/50 uppercase tracking-[0.16em]">
                        Engine
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:pl-10">
            <FadeUp delay={0.25}>
              <div className="relative aspect-[3/4] bg-snow-50 border border-ink/10 overflow-hidden">
                <ConsequenceMap />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] tabular uppercase tracking-[0.2em] text-ink/55">
                  <span>Twin Net · Live</span>
                  <span>NL · 53.21°N</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] tabular uppercase tracking-[0.2em] text-ink/45">
                      Median latency
                    </div>
                    <div className="font-display text-3xl tabular leading-none mt-1">
                      142<span className="text-base text-ink/55 ml-1">ms</span>
                    </div>
                  </div>
                  <Waveform bars={22} className="text-ink/70 h-7" />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </Container>

      <div className="mt-24 lg:mt-32 border-y border-ink/10">
        <LiveTicker />
      </div>
    </Section>
  );
}

function Manifesto() {
  return (
    <Section className="py-32">
      <Container>
        <div className="grid grid-cols-12 gap-y-10 gap-x-8">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow index="02 / 04" label="Manifesto" />
          </div>
          <div className="col-span-12 md:col-span-8">
            <FadeUp>
              <p className="font-display text-[clamp(28px,3.6vw,52px)] leading-[1.1] tracking-tight text-ink/95">
                Most platforms wait for you to ask. We watch the world move,
                update twins of every actor inside it, and answer{" "}
                <span className="italic text-tiff-500">before the question forms</span>.
                The result is a quiet kind of luxury — software that already
                knows.
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 text-[14px] text-ink/70">
                <p>
                  Inference predicts the present. Simulation rehearses the
                  future. Twins remember it all. Three subsystems, one shape:
                  layered, event-driven, twin-centric.
                </p>
                <p>
                  Built on Kubernetes-native compute, Kafka as the nervous
                  system, GPU inference at the millisecond, and parallel
                  Monte&nbsp;Carlo at ten thousand pods on demand.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Surfaces() {
  return (
    <Section id="surfaces" className="py-32 border-t border-ink/10">
      <Container>
        <div className="flex items-end justify-between gap-8 mb-16">
          <div>
            <Eyebrow index="03 / 04" label="The Two Surfaces" />
            <Display className="mt-6 max-w-[14ch]">Two atriums. One house.</Display>
          </div>
          <div className="hidden md:block max-w-sm text-[14px] text-ink/65">
            The engine is one thing. It wears two faces — the studio and the
            stadium. Pick the door you came for.
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <SurfaceCard
            href="/cc"
            tag="consequence.cc"
            sub="For You"
            title="The studio you live inside."
            body="Producer-first feed, stems, sessions, the marketplace, your wallet. Tuned to the way you actually work — and to whoever you're about to become."
            stats={[
              { k: "Daily plays", v: "84.2M" },
              { k: "Active producers", v: "11,402" },
              { k: "Median split settled", v: "9.4s" },
            ]}
            tone="cc"
          />
          <SurfaceCard
            href="/software"
            tag="consequence.software"
            sub="Engine"
            title="The substrate everything runs on."
            body="Inference, simulation and digital twin services exposed as a Kubernetes-native, event-driven platform. For partners, integrators and the verticals we haven't built yet."
            stats={[
              { k: "Events / sec", v: "12.4k" },
              { k: "p99 inference", v: "47ms" },
              { k: "Twins online", v: "8.6M" },
            ]}
            tone="sw"
          />
        </div>
      </Container>
    </Section>
  );
}

function SurfaceCard({
  href,
  tag,
  sub,
  title,
  body,
  stats,
  tone,
}: {
  href: string;
  tag: string;
  sub: string;
  title: string;
  body: string;
  stats: { k: string; v: string }[];
  tone: "cc" | "sw";
}) {
  return (
    <FadeUp className="col-span-12 md:col-span-6">
      <Link
        href={href}
        className="group relative block bg-snow-0 border border-ink/10 p-8 lg:p-12 hover:border-ink/40 transition-colors duration-700 ease-out-expo overflow-hidden"
      >
        <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
             style={{
               background: tone === "cc"
                 ? "radial-gradient(closest-side, #D8F5F0, transparent)"
                 : "radial-gradient(closest-side, #F6EFE2, transparent)"
             }}
        />
        <div className="relative flex items-start justify-between mb-12">
          <div className="flex items-center gap-3">
            <Pill tone={tone === "cc" ? "tiff" : "gold"}>{sub}</Pill>
            <span className="text-[11px] tabular tracking-[0.18em] uppercase text-ink/45">
              {tag}
            </span>
          </div>
          <ArrowUpRight className="w-5 h-5 text-ink/40 group-hover:text-ink transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

        <div className="relative font-display text-[clamp(34px,4.4vw,64px)] leading-[1.02] tracking-tight max-w-[18ch]">
          {title}
        </div>

        <div className="relative mt-8 max-w-[44ch] text-[15px] text-ink/65 leading-[1.6]">
          {body}
        </div>

        <div className="relative mt-12 grid grid-cols-3 gap-6 pt-6 border-t border-ink/10">
          {stats.map((s) => (
            <div key={s.k}>
              <div className="font-display text-2xl tabular leading-none">
                {s.v}
              </div>
              <div className="text-[10px] tabular uppercase tracking-[0.18em] text-ink/45 mt-2">
                {s.k}
              </div>
            </div>
          ))}
        </div>
      </Link>
    </FadeUp>
  );
}

function Engine() {
  const layers = [
    { id: "07", n: "Application", t: "Surfaces humans touch" },
    { id: "06", n: "Digital Twin", t: "Living state of every modeled thing" },
    { id: "05", n: "Simulation", t: "Argo + Ray, ten-thousand-pod parallel" },
    { id: "04", n: "Inference", t: "Triton on H100 / L40S, p99 < 50ms" },
    { id: "03", n: "Data", t: "Kafka, Mongo, Qdrant, ClickHouse" },
    { id: "02", n: "Orchestration", t: "Kubernetes, GitOps via Argo CD" },
    { id: "01", n: "Infrastructure", t: "Hetzner bare-metal · GPU pools" },
  ];
  return (
    <Section className="py-32 border-t border-ink/10">
      <Container>
        <div className="grid grid-cols-12 gap-y-12 gap-x-8">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow index="04 / 04" label="The Engine" />
            <Display className="mt-6 max-w-[14ch]">
              Seven layers,
              <br />
              one breath.
            </Display>
            <Lede className="mt-8">
              Each layer scales independently. Each layer fails independently.
              None of them block the others. The shape is durable; the
              implementations underneath are free to evolve.
            </Lede>
            <Link
              href="/software#architecture"
              className="mt-10 inline-flex items-center gap-2 text-[13px] uline text-ink"
            >
              Read the architecture
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="col-span-12 md:col-span-7">
            <div className="bg-snow-0 border border-ink/10">
              {layers.map((l, i) => (
                <div
                  key={l.id}
                  className="group flex items-baseline gap-6 px-6 lg:px-8 py-5 border-b last:border-b-0 border-ink/10 hover:bg-snow-100 transition-colors"
                  style={{
                    paddingLeft: `${24 + i * 6}px`,
                  }}
                >
                  <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/35 w-10">
                    {l.id}
                  </div>
                  <div className="font-display text-[clamp(22px,2.4vw,34px)] leading-none tracking-tight w-[42%] md:w-[36%]">
                    {l.n}
                  </div>
                  <div className="flex-1 dot-leader text-ink/15 mx-2 hidden md:block">&nbsp;</div>
                  <div className="text-[12px] text-ink/55 text-right max-w-[34ch]">
                    {l.t}
                  </div>
                  <Plus className="w-3.5 h-3.5 text-ink/30 group-hover:text-ink/80 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Numbers() {
  return (
    <Section className="py-32 border-t border-ink/10 bg-snow-100">
      <Container>
        <div className="flex items-end justify-between gap-8 mb-16">
          <Display className="max-w-[16ch]">
            Industrial scale,
            <br />
            <span className="italic text-ink/75">domestic feel.</span>
          </Display>
          <div className="hidden md:block text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">
            Live · Q3 2026
          </div>
        </div>

        <div className="grid grid-cols-12 gap-y-12 gap-x-8 border-t border-ink/15 pt-12">
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="12.4k" unit="ev / s" label="Sustained event ingestion across the bus." />
          </div>
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="47" unit="ms p99" label="Inference latency at the production fleet edge." />
          </div>
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="8.6M" unit="twins" label="Living digital twins continuously updated." />
          </div>
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="10k" unit="pods" label="Monte Carlo workers spawned per simulation burst." />
          </div>
        </div>

        <div className="mt-20">
          <HairlineRow
            left="Throughput SLA"
            right="200ms median · 500ms p99 — ingest to twin update"
          />
          <HairlineRow
            left="Storage substrate"
            right="MongoDB · Qdrant · ClickHouse · PostgreSQL · Redis"
          />
          <HairlineRow
            left="Compute substrate"
            right="Hetzner bare-metal + hyperscaler burst, NVIDIA H100 / L40S"
          />
          <HairlineRow
            left="Settlement"
            right="Solana ownership · Circle USDC · sub-10s split"
          />
          <HairlineRow
            left="Resilience"
            right="3 AZ replication · canary inference · auto-rollback"
          />
        </div>
      </Container>
    </Section>
  );
}

function Press() {
  const quotes = [
    {
      q: "It feels less like a tool and more like a fast, quiet collaborator that already knows what I'm about to do.",
      a: "Studio Notes",
      r: "Berlin",
    },
    {
      q: "Tiffany blue, Mondrian bones, Apple restraint. The first time enterprise software has been allowed to be beautiful.",
      a: "Form / Field",
      r: "Amsterdam",
    },
    {
      q: "Hated By Many built the consequence engine the rest of us were too timid to imagine.",
      a: "The Bench",
      r: "Brooklyn",
    },
  ];
  return (
    <Section className="py-32 border-t border-ink/10">
      <Container>
        <Eyebrow label="In the Room" />
        <div className="mt-12 grid grid-cols-12 gap-8">
          {quotes.map((q, i) => (
            <FadeUp key={i} delay={i * 0.06} className="col-span-12 md:col-span-4">
              <div className="h-full flex flex-col justify-between border-t border-ink/15 pt-6">
                <p className="font-display text-[clamp(20px,1.7vw,26px)] leading-[1.25] text-ink/90">
                  &ldquo;{q.q}&rdquo;
                </p>
                <div className="mt-10 flex items-center justify-between text-[11px] tabular uppercase tracking-[0.18em] text-ink/55">
                  <span>{q.a}</span>
                  <span>{q.r}</span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Closing() {
  return (
    <Section className="py-32 border-t border-ink/10">
      <Container>
        <div className="grid grid-cols-12 gap-y-10 gap-x-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <Display>
              Step inside the
              <br />
              consequence.
            </Display>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <Link
              href="/cc"
              className="group flex items-center justify-between bg-ink text-snow-50 px-6 py-5 hover:bg-ink/90 transition-colors"
            >
              <div>
                <div className="text-[10px] tabular uppercase tracking-[0.22em] text-snow-50/55">
                  Enter the studio
                </div>
                <div className="font-display text-2xl mt-1">consequence.cc</div>
              </div>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <Link
              href="/software"
              className="group flex items-center justify-between border border-ink/15 px-6 py-5 hover:border-ink/60 transition-colors"
            >
              <div>
                <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/55">
                  Tour the engine
                </div>
                <div className="font-display text-2xl mt-1">consequence.software</div>
              </div>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
