import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Container,
  Display,
  Eyebrow,
  FadeUp,
  HairlineRow,
  Lede,
  Section,
} from "@/components/ui";
import { MonochromeAudioVisualizer } from "@/components/surface-cards/monochrome-audio-visualizer";
import { ManifestoStepped } from "@/components/manifesto/manifesto-stepped";
import { HeroConsequenceVisual } from "@/components/hero/hero-consequence-visual";
import { CollaborationSection } from "@/components/sw/engine-sections";
import { softwareMetadata } from "@/lib/seo/metadata";

export const metadata = softwareMetadata({
  title: "Studio & consequence engine",
  description:
    "Consequence.software — real-time music production, Monte Carlo rehearsal, and creator royalty settlement from composition to USDC.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Surfaces />
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
        {/* overflow only on grid — not on section */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-10 items-start overflow-x-clip overflow-y-visible">
          <div className="col-span-12 md:col-span-7 space-y-10">
            <div className="flex flex-wrap items-center gap-4">
              <Eyebrow index="01 / 04" label="An HBM & Company House Product" />
              <span className="inline-flex items-center gap-2 text-[11px] tabular text-ink/55">
                <span className="w-1.5 h-1.5 rounded-full bg-tiff animate-breathe" />
                Live · 2,847 users online
              </span>
            </div>

            <Display as="h1" className="leading-[1.06] max-w-[22ch] lg:max-w-[26ch]">
              What happens next:{" "}
              <span className="italic text-ink/85">Define. Compose</span>
            </Display>

            <div className="space-y-5">
              <Lede className="text-[clamp(13px,1vw,15px)] leading-[1.6]">
                Consequence is the real-time consequence layer for music production,
                marketplace operations, and creator royalty settlement — one environment where
                you write, produce, release, and get paid without losing
                context.
              </Lede>
              <Lede className="text-[clamp(13px,1vw,15px)] leading-[1.6]">
                Composition, collaboration, playback, and capital events flow through a single
                stream; authoritative ledgers maintain state for every work, contributor,
                transaction, and payout. A note in the piano roll, a stem on the marketplace,
                a collaborator in the room, a USDC settlement on-chain — you always know what
                happens next.
              </Lede>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 flex flex-col gap-5 md:mt-6">
            <div
              className="hidden md:block h-[382px] lg:h-[442px] w-full shrink-0"
              aria-hidden
            >
              <HeroConsequenceVisual className="h-full w-full max-w-[28rem] mx-auto" />
            </div>
            <Link
              href="/download"
              className="group flex w-full h-11 shrink-0 items-center justify-center rounded-lg bg-snow-200 text-[15px] text-ink hover:bg-snow-300 active:bg-snow-300/90 transition-colors"
            >
              Download Consequence
            </Link>
            <Link
              href="/book-of-genesis"
              className="group flex w-full h-11 shrink-0 items-center justify-center rounded-lg bg-snow-200 text-[15px] text-ink hover:bg-snow-300 active:bg-snow-300/90 transition-colors"
            >
              Book of Genesis
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Manifesto() {
  return <ManifestoStepped />;
}

function Surfaces() {
  return (
    <Section id="surfaces" className="border-t border-ink/10 scroll-mt-28">
      <CollaborationSection />
      <CreativeEngineSection />
      <InfrastructureSection />
    </Section>
  );
}

function CreativeEngineSection() {
  return (
    <div id="creative-engine" className="scroll-mt-28 border-t border-ink/10 py-24 lg:py-32 bg-snow-0">
      <Container>
        <div className="grid grid-cols-12 gap-y-8 gap-x-8 lg:gap-x-12 lg:gap-y-6 lg:items-start">
          <FadeUp className="col-span-12 lg:col-span-5 lg:row-start-1 order-1">
            <Eyebrow index="03 / 04" label="Conductor" />
            <Display className="mt-4 max-w-[16ch]">
              Creative
              <br />
              <span className="italic text-ink/85">Engine.</span>
            </Display>
          </FadeUp>

          <FadeUp
            delay={0.06}
            className="col-span-12 lg:col-span-7 lg:row-start-1 lg:row-span-2 lg:self-start lg:mt-2 order-3 lg:order-2"
          >
            <div className="relative w-full min-h-[360px] sm:min-h-[min(52vh,520px)] lg:min-h-[min(62vh,580px)] lg:max-h-[min(68vh,640px)] rounded-xl overflow-hidden border border-ink/10 bg-snow-50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_20px_56px_-20px_rgba(10,10,10,0.1)]">
              <MonochromeAudioVisualizer
                mode="idle"
                theme="light"
                className="absolute inset-0 w-full h-full bg-snow-50"
              />
            </div>
          </FadeUp>

          <FadeUp className="col-span-12 lg:col-span-5 lg:row-start-2 flex flex-col justify-start order-2 lg:order-3">
            <p className="text-[15px] lg:text-[16px] text-ink/65 leading-[1.65] max-w-[44ch]">
              Inference, simulation, and digital twin services for creative prediction and financial
              consequence — same Kubernetes-native, event-driven platform. Partners plug into ranking,
              Monte Carlo earnings bands, and twin APIs that watch capital as carefully as audio.
            </p>
            <ul className="mt-5 space-y-3 border-l border-ink/15 pl-5">
              {[
                "Live composition with sub-second sync and per-note attribution",
                "Monte Carlo rehearsal over melodic, harmonic, and rhythmic futures",
                "Digital twins as immutable creative memory tied to settlement legs",
              ].map((line) => (
                <li key={line} className="text-[13px] text-ink/60 leading-snug">
                  {line}
                </li>
              ))}
            </ul>
            <Link
              href="/book-of-genesis"
              className="mt-8 inline-flex w-fit items-center gap-2 px-5 py-3 rounded-full bg-ink text-snow-50 text-[13px] hover:bg-ink/90 transition-colors"
            >
              Explore the engine
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </FadeUp>
        </div>
      </Container>
    </div>
  );
}

function InfrastructureSection() {
  return (
    <div id="scale" className="scroll-mt-28 border-t border-ink/10 bg-snow-100 py-24 lg:py-32">
      <Container>
        <HairlineRow
          left="Throughput"
          right="Most activity shows in under half a second; heavier royalty and play totals stay under about one second"
        />
        <HairlineRow
          left="Storage"
          right="Song and session data, search indexes, analytics history, account ledgers, and quick cache — each stored where it fits best"
        />
        <HairlineRow
          left="Compute"
          right="Dedicated servers for everyday load, cloud burst for busy days, GPUs for AI audio and text"
        />
        <HairlineRow
          left="Settlement"
          right="Session Protocol logs who did what; when splits are final, Base runs the on-chain leg and Circle routes USDC"
        />
        <HairlineRow
          left="Resilience"
          right="Copies kept in three zones, careful AI rollouts, and quick rollback — you can keep writing while money catches up safely"
        />
      </Container>
    </div>
  );
}
