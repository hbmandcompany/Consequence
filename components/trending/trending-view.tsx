import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { ForYouPlaybackIllustration } from "@/components/surface-cards/for-you-playback";
import { Container, Display, Eyebrow, FadeUp, HairlineRow, Lede, Pill } from "@/components/ui";

const SPECS = [
  { left: "Surface", right: "Trending · For You · Radio" },
  { left: "Ranking", right: "Twin + engagement · refreshed <15s" },
  { left: "Playback", right: "Stream · purchase · royalty leg on play" },
] as const;

const PILLARS = [
  {
    title: "For You",
    body: "A personalized front door — releases, sessions to resume, stems that match your twin, and collab invites ranked by what the engine believes you will act on next.",
  },
  {
    title: "Listen Now",
    body: "Apple Music–grade transport on every tile: play, scrub, queue, and share without leaving the feed. Every listen emits bus events that twins and settlement can trust.",
  },
  {
    title: "Radio",
    body: "Continuous discovery across your network and the marketplace — not a static chart. Momentum, social proof, and model score surface what is moving tonight.",
  },
] as const;

export function TrendingView() {
  return (
    <div className="bg-snow-50 min-h-screen">
      <section className="border-b border-ink/10 bg-snow-0 pt-28 lg:pt-32 pb-12 lg:pb-16">
        <Container>
          <FadeUp>
            <Link
              href="/#surfaces"
              className="inline-flex items-center gap-2 text-[12px] text-ink/50 hover:text-ink uline mb-8"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Two surfaces
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Pill tone="tiff">Trending</Pill>
              <span className="text-[11px] tabular tracking-[0.2em] uppercase text-ink/45">
                For You · Radio
              </span>
            </div>
            <Display as="h1" className="max-w-[14ch]">
              What moves
              <br />
              <span className="italic text-ink/85">you tonight.</span>
            </Display>
            <Lede className="mt-8 max-w-[58ch]">
              Trending is the listener surface — a ranked feed and radio layer that turns plays,
              saves, and purchases into consequence. The same engine that settles Velvet Clip in the
              treasury ranks what you hear next and logs every stream back to composition twins.
            </Lede>
          </FadeUp>
        </Container>
      </section>

      <section className="py-12 lg:py-16 border-b border-ink/10 bg-snow-100/40">
        <Container>
          <FadeUp>
            <div className="rounded-xl overflow-hidden border border-ink/10 bg-snow-0 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.12)]">
              <ForYouPlaybackIllustration className="min-h-[min(72vh,640px)] lg:min-h-[640px]" />
            </div>
          </FadeUp>
        </Container>
      </section>

      <section className="py-16 lg:py-24 border-b border-ink/10">
        <Container>
          <div className="grid grid-cols-12 gap-y-10 gap-x-8">
            <div className="col-span-12 lg:col-span-5 space-y-8">
              {PILLARS.map((p, i) => (
                <FadeUp key={p.title} delay={i * 0.05}>
                  <Eyebrow label={p.title} accent="tiff" />
                  <p className="mt-4 text-[15px] text-ink/65 leading-[1.65]">{p.body}</p>
                </FadeUp>
              ))}
              <FadeUp delay={0.15}>
                <div className="border-t border-ink/10 pt-6">
                  {SPECS.map((s) => (
                    <HairlineRow key={s.left} left={s.left} right={s.right} />
                  ))}
                </div>
              </FadeUp>
            </div>
            <FadeUp delay={0.08} className="col-span-12 lg:col-span-7 flex flex-col justify-center">
              <p className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/40 mb-4">
                In production
              </p>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] tracking-tight leading-[1.05] max-w-[20ch]">
                Ranked listens, not static shelves.
              </h2>
              <p className="mt-6 max-w-[48ch] text-[15px] text-ink/65 leading-[1.65]">
                Marketplace inventory still lives on Shop — Trending is where momentum meets playback.
                Every track card can open a purchase path; every play updates twins before the next
                refresh cycle.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-snow-50 text-[13px] hover:bg-ink/90 transition-colors"
                >
                  Open Shop
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link href="/" className="inline-flex items-center gap-2 text-[13px] uline text-ink/70">
                  Back to home
                </Link>
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>
    </div>
  );
}
