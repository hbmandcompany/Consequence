import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
import { LiveTicker } from "@/components/live-ticker";
import { TwinNetDawIllustration } from "@/components/illustrations/daw-suite";
import {
  DropboxStyleDarkIllustration,
  LlmChatSurfaceIllustration,
  SynthPluginDesktopIllustration,
} from "@/components/illustrations/home-visuals";
import { PartnerStackMarquee } from "@/components/partner-stack-marquee";
import { EngineDeepDive } from "@/components/sw/engine-sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Surfaces />
      <EngineDeepDive />
      <Numbers />
      <Press />
      <Closing />
    </>
  );
}

function Hero() {
  return (
    <Section
      id="hero"
      className="pt-28 md:pt-32 lg:pt-36 pb-20 lg:pb-28 scroll-mt-24"
    >
      <Container>
        {/* items-start: with a tall map, items-end pushed the headline below the fold */}
        {/* overflow only on grid — not on section — so full-bleed LiveTicker is not clipped */}
        <div className="grid grid-cols-12 gap-y-12 gap-x-8 items-start overflow-x-clip">
          <div className="col-span-12 lg:col-span-8 space-y-10">
            <div className="flex flex-wrap items-center gap-4">
              <Eyebrow index="01 / 04" label="An HBM & Company House Product" />
              <span className="inline-flex items-center gap-2 text-[11px] tabular text-ink/55">
                <span className="w-1.5 h-1.5 rounded-full bg-tiff animate-breathe" />
                Live · 12,408 events / sec
              </span>
            </div>

            <Display as="h1">
              What
              <br />
              happens
              <br />
              <span className="italic text-ink/85">next.</span>
            </Display>

            <div className="grid grid-cols-12 gap-6 gap-y-8">
              <div className="col-span-12 md:col-span-7">
                <Lede>
                  Consequence is a real-time consequence engine for music production,
                  the marketplace, and creator royalties. It ingests composition, collaboration,
                  play, and capital events as one stream, keeps twins of every composition,
                  creator, transaction, and payout leg, and answers — continuously, at
                  industrial scale — the only question that matters.
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
                    <span className="text-[15px] text-ink">Trending</span>
                    <span className="flex items-center gap-2 text-[11px] tabular text-ink/50 uppercase tracking-[0.16em]">
                      For You
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                  <Link
                    href="/#software"
                    className="group flex items-center justify-between border-b border-ink/10 pb-3 hover:border-ink/40 transition-colors"
                  >
                    <span className="text-[15px] text-ink">WorkSpace</span>
                    <span className="flex items-center gap-2 text-[11px] tabular text-ink/50 uppercase tracking-[0.16em]">
                      Engine
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:pl-6 xl:pl-10">
            <div className="relative aspect-[100/130] w-full rounded-2xl border border-ink/15 bg-[#0a0c10] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.22)] overflow-hidden">
              <DropboxStyleDarkIllustration variant="hero" className="w-full h-full block" />
            </div>
          </div>
        </div>
      </Container>

      <div className="mt-16 lg:mt-24 border-y border-ink/10">
        <LiveTicker />
      </div>
    </Section>
  );
}

function Manifesto() {
  return (
    <Section id="manifesto" className="py-32 scroll-mt-28">
      <Container>
        <div className="grid grid-cols-12 gap-y-10 gap-x-8">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow index="02 / 04" label="Manifesto" />
          </div>
          <div className="col-span-12 md:col-span-8">
            <FadeUp>
              <p className="font-display text-[clamp(28px,3.6vw,52px)] leading-[1.1] tracking-tight text-ink/95">
                Most platforms wait for you to ask. We watch the world move,
                update twins of every composition, creator, transaction, and capital flow
                inside it, and answer{" "}
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
                  Monte&nbsp;Carlo at ten thousand pods on demand — predicting
                  compositional outcomes, marketplace performance, creator
                  trajectories, and the consequences of every royalty and
                  settlement through the stack.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.12}>
              <div className="mt-14 rounded-xl overflow-hidden border border-ink/15 shadow-lg bg-[#0a0c10]">
                <DropboxStyleDarkIllustration variant="wide" className="w-full h-auto block" />
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
            tag="For You"
            sub="Trending"
            title="The studio you live inside."
            body="Producer-first feed, stems, sessions, the marketplace, and wallet — piano roll to payouts. Tuned to the way you actually work — with AI that asks what happens next for this stem, session state you can trust, and earnings that update as the room listens."
            stats={[
              { k: "Daily plays", v: "84.2M" },
              { k: "Active producers", v: "11,402" },
              { k: "Settlements / day", v: "$1.84M" },
            ]}
            tone="cc"
            visual="llm"
          />
          <SurfaceCard
            href="/#software"
            tag="WorkSpace"
            sub="Engine"
            title="The substrate everything runs on."
            body="Inference, simulation, and digital twin services for creative prediction and financial consequence — same Kubernetes-native, event-driven platform. Partners plug into ranking, Monte Carlo earnings bands, and twin APIs that watch capital as carefully as audio."
            stats={[
              { k: "Events / sec", v: "12.4k" },
              { k: "p99 inference", v: "47ms" },
              { k: "Twins online", v: "8.6M" },
            ]}
            tone="sw"
            visual="plugin"
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
  visual,
}: {
  href: string;
  tag: string;
  sub: string;
  title: string;
  body: string;
  stats: { k: string; v: string }[];
  tone: "cc" | "sw";
  visual: "llm" | "plugin";
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

        <div className="relative mt-6 rounded-lg overflow-hidden border border-ink/10 bg-[#161618]">
          {visual === "llm" ? (
            <LlmChatSurfaceIllustration className="w-full h-[min(280px,42vw)] min-h-[220px] max-h-[320px] block" />
          ) : (
            <SynthPluginDesktopIllustration className="w-full h-auto max-h-[min(400px,90vw)] block mx-auto" />
          )}
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

function Numbers() {
  return (
    <Section id="scale" className="py-32 border-t border-ink/10 bg-snow-100 scroll-mt-28">
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
            <NumberStat value="12.4k" unit="ev / s" label="Sustained event ingestion — plays, carts, splits, settlements — across the bus." />
          </div>
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="47" unit="ms p99" label="Inference latency at the production fleet edge — ranking, stems, earnings models." />
          </div>
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="8.6M" unit="twins" label="Composition, creator, marketplace, and capital twins — continuously updated." />
          </div>
          <div className="col-span-12 md:col-span-3">
            <NumberStat value="10k" unit="pods" label="Monte Carlo workers spawned per simulation burst — revenue and engagement paths." />
          </div>
        </div>

        <div className="mt-20">
          <HairlineRow
            left="Throughput SLA"
            right="200ms median · 500ms p99 — ingest to twin update (plays + settlements)"
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
      q: "Tiffany blue, Mondrian bones, Apple restraint. The first time a creator platform watched capital flow as carefully as it watched creativity.",
      a: "Form / Field",
      r: "Amsterdam",
    },
    {
      q: "HBM & Company built the consequence engine the rest of us were too timid to imagine.",
      a: "The Bench",
      r: "Brooklyn",
    },
  ];
  return (
    <Section id="press" className="py-32 border-t border-ink/10 scroll-mt-28">
      <Container>
        <Eyebrow label="In the Room" />
        <FadeUp className="mt-10">
          <div className="rounded-2xl border border-ink/15 bg-[#1c1c1e] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] overflow-hidden max-w-4xl mx-auto">
            <TwinNetDawIllustration className="w-full h-auto max-h-[min(420px,52vw)] block mx-auto" />
          </div>
        </FadeUp>
        <div className="mt-14 grid grid-cols-12 gap-8">
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
    <Section id="closing" className="py-24 border-t border-ink/10 scroll-mt-28">
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
                  Open For You
                </div>
                <div className="font-display text-2xl mt-1">Trending</div>
              </div>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <Link
              href="/#software"
              className="group flex items-center justify-between border border-ink/15 px-6 py-5 hover:border-ink/60 transition-colors"
            >
              <div>
                <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/55">
                  Tour WorkSpace
                </div>
                <div className="font-display text-2xl mt-1">WorkSpace</div>
              </div>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-ink/10 max-md:-mx-1">
          <p className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/35 mb-4">
            Stack in motion
          </p>
          <PartnerStackMarquee />
        </div>
      </Container>
    </Section>
  );
}
