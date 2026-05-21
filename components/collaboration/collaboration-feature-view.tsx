import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { CollaborationSessionIllustration } from "@/components/sw/collaboration-session-illustration";
import { LlmChatSurfaceIllustration } from "@/components/illustrations/home-visuals";
import { SplitProposalIllustration } from "@/components/collaboration/split-proposal-illustration";
import { Container, Display, Eyebrow, FadeUp, HairlineRow, Lede, Pill } from "@/components/ui";
import type { CollaborationFeature, CollaborationFeatureId } from "@/lib/collaboration-features";
import { COLLABORATION_FEATURES } from "@/lib/collaboration-features";

function FeatureIllustration({ id }: { id: CollaborationFeatureId }) {
  if (id === "live-session") {
    return <CollaborationSessionIllustration />;
  }
  if (id === "shared-workspace") {
    return (
      <LlmChatSurfaceIllustration className="w-full h-auto rounded-lg border border-ink/10" />
    );
  }
  return <SplitProposalIllustration />;
}

export function CollaborationFeatureView({ feature }: { feature: CollaborationFeature }) {
  const others = (Object.keys(COLLABORATION_FEATURES) as CollaborationFeatureId[]).filter(
    (k) => k !== feature.id
  );

  const headlineParts = feature.headline.split("\n");

  return (
    <div className="bg-snow-50 min-h-screen">
      <section className="border-b border-ink/10 bg-snow-0 pt-28 lg:pt-32 pb-16 lg:pb-20">
        <Container>
          <FadeUp>
            <Link
              href="/#collaboration"
              className="inline-flex items-center gap-2 text-[12px] text-ink/50 hover:text-ink uline mb-8"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Collaboration
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Pill tone="tiff">Collaboration</Pill>
              <span className="text-[11px] tabular tracking-[0.2em] uppercase text-ink/45">
                {feature.tagline}
              </span>
            </div>
            <Display as="h1" className="max-w-[14ch]">
              {headlineParts[0]}
              {headlineParts[1] ? (
                <>
                  <br />
                  <span className="italic text-ink/85">{headlineParts[1]}</span>
                </>
              ) : null}
            </Display>
            <Lede className="mt-8 max-w-[58ch]">{feature.lede}</Lede>
          </FadeUp>
        </Container>
      </section>

      <section className="py-16 lg:py-20 border-b border-ink/10">
        <Container>
          <div className="grid grid-cols-12 gap-y-10 gap-x-8 items-start">
            <div className="col-span-12 lg:col-span-5 space-y-8">
              {feature.pillars.map((p, i) => (
                <FadeUp key={p.title} delay={i * 0.05}>
                  <Eyebrow label={p.title} accent="tiff" />
                  <p className="mt-4 text-[15px] text-ink/65 leading-[1.65]">{p.body}</p>
                </FadeUp>
              ))}
              <FadeUp delay={0.2}>
                <div className="border-t border-ink/10 pt-6">
                  {feature.specs.map((s) => (
                    <HairlineRow key={s.left} left={s.left} right={s.right} />
                  ))}
                </div>
              </FadeUp>
            </div>
            <FadeUp delay={0.08} className="col-span-12 lg:col-span-7">
              <FeatureIllustration id={feature.id} />
            </FadeUp>
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-ink/10 bg-snow-100/50">
        <Container>
          <p className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/40 mb-6">
            More in collaboration
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {others.map((id) => {
              const f = COLLABORATION_FEATURES[id];
              return (
                <Link
                  key={id}
                  href={f.href}
                  className="group flex items-center justify-between border border-ink/10 bg-snow-0 px-5 py-4 hover:border-ink/30 transition-colors"
                >
                  <div>
                    <p className="text-[14px] font-medium text-ink">{f.label}</p>
                    <p className="mt-1 text-[12px] text-ink/50">{f.tagline}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-ink/35 group-hover:text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              );
            })}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/session-protocol"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-snow-50 text-[13px] hover:bg-ink/90 transition-colors"
            >
              Session Protocol
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 text-[13px] uline text-ink/70">
              Back to home
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
