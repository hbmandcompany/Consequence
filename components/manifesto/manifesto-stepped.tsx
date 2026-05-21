import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { LlmChatSurfaceIllustration } from "@/components/illustrations/home-visuals";
import { Container, Eyebrow, FadeUp, Section } from "@/components/ui";

export function ManifestoStepped() {
  return (
    <Section id="manifesto" className="py-28 lg:py-32 scroll-mt-28 overflow-hidden">
      <Container>
        <div className="mb-10 lg:mb-14">
          <Eyebrow index="02 / 04" label="Manifesto" />
        </div>

        <FadeUp>
          <div className="manifesto-stage relative rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] bg-ink text-snow-50 px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-14">
            <figure className="text-center max-w-[50rem] mx-auto mb-10 sm:mb-12 lg:mb-16 xl:mb-[4.5rem]">
              <blockquote className="font-display text-[clamp(1.25rem,2.8vw,2.65rem)] leading-[1.22] tracking-tight italic text-snow-50/95 px-2">
                &ldquo;Most platforms wait for you to ask. We watch the world move,
                update twins of every composition, creator, transaction, and capital flow
                inside it, and answer before the question forms. The result is a quiet
                kind of luxury — software that already knows.&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-[11px] tabular uppercase tracking-[0.22em] text-snow-50/45">
                — Consequence
              </figcaption>
            </figure>

            <div className="manifesto-bento relative max-w-[68rem] mx-auto flex flex-col gap-4 sm:gap-5 lg:grid lg:grid-cols-[41%_1fr] lg:grid-rows-[auto_auto] lg:gap-5">
              {/* Continuous L-shaped beige (desktop) — slabs sit on top, transparent */}
              <div className="manifesto-l-beige hidden lg:block" aria-hidden />

              {/* Media — unchanged position */}
              <figure
                className="manifesto-media relative z-20 m-0 w-full lg:col-start-1 lg:row-start-1 lg:min-h-[16rem] xl:min-h-[18rem]"
                aria-label="Consequence studio — piano roll and agent"
              >
                <div className="w-full rounded-[2rem] sm:rounded-[2.25rem] lg:rounded-[2.75rem] overflow-hidden border border-white/[0.08] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.7)] bg-[#161618] aspect-[72/28] lg:aspect-auto lg:h-full lg:min-h-[220px] xl:min-h-[260px]">
                  <LlmChatSurfaceIllustration className="w-full h-full block min-h-[190px] lg:min-h-[220px]" />
                </div>
              </figure>

              {/* Right content */}
              <div className="manifesto-slab-right relative z-10 bg-snow-100 lg:bg-transparent text-ink rounded-[2rem] sm:rounded-[2.25rem] lg:rounded-none lg:col-start-2 lg:row-start-1 lg:row-span-2 flex flex-col p-7 sm:p-9 lg:p-10 xl:p-12 lg:min-h-[28rem]">
                <div className="flex-1 flex flex-col justify-center lg:pt-2">
                  <p className="text-[14px] md:text-[15px] text-ink/70 leading-[1.75]">
                    Inference models the present. Simulation stress-tests what
                    comes next. Digital twins hold the authoritative record. Three
                    disciplines, one architecture: layered, event-driven, and
                    centered on live state.
                  </p>
                  <p className="mt-5 sm:mt-6 text-[14px] md:text-[15px] text-ink/70 leading-[1.75]">
                    A unified event fabric carries every signal; low-latency
                    inference ranks and forecasts in real time; large-scale Monte
                    Carlo runs explore compositional, marketplace, and creator
                    outcomes in parallel. The same pipeline traces royalties and
                    settlements end to end — so creative, commercial, and
                    capital consequence stay aligned.
                  </p>
                </div>
                <div className="mt-10 lg:mt-12 pt-8 lg:pt-10 border-t border-ink/[0.08] lg:border-t-0 lg:flex lg:justify-end lg:items-end shrink-0">
                  <Link
                    href="#surfaces"
                    className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-tiff px-8 py-4 text-[13px] font-semibold tracking-tight text-ink shadow-[0_10px_32px_-8px_rgba(127,212,204,0.55)] hover:bg-tiff-400 transition-colors"
                  >
                    Explore surfaces
                    <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </Link>
                </div>
              </div>

              {/* Bottom-left heading */}
              <div className="manifesto-slab-left relative z-10 bg-snow-100 lg:bg-transparent text-ink rounded-[2rem] sm:rounded-[2.25rem] lg:rounded-none lg:col-start-1 lg:row-start-2 p-7 sm:p-9 lg:p-10 xl:px-11 xl:py-10 flex items-end min-h-[10rem] lg:min-h-0">
                <h3 className="font-sans font-bold text-[clamp(1.65rem,4.2vw,3.35rem)] uppercase leading-[0.92] tracking-[-0.035em] text-ink max-w-[14ch]">
                  Three pillars.
                  <br />
                  <span className="font-display font-normal normal-case italic tracking-tight text-ink/72">
                    One shape.
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
