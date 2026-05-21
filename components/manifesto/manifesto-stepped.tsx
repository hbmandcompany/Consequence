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
          <div className="manifesto-stage relative rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] bg-ink text-snow-50 px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16 xl:px-16">
            <figure className="text-center max-w-[52rem] mx-auto mb-12 lg:mb-16 xl:mb-20">
              <blockquote className="font-display text-[clamp(1.35rem,3.2vw,2.75rem)] leading-[1.2] tracking-tight italic text-snow-50/95">
                &ldquo;Most platforms wait for you to ask. We watch the world move,
                update twins of every composition, creator, transaction, and capital
                flow inside it, and answer before the question forms. The result is a
                quiet kind of luxury — software that already knows.&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-[11px] tabular uppercase tracking-[0.22em] text-snow-50/45">
                — Consequence
              </figcaption>
            </figure>

            <div className="relative lg:min-h-[28rem]">
              {/* Top-left: accent bar + LLM (overlaps panel) */}
              <div className="manifesto-media relative z-30 flex gap-2 sm:gap-3 w-full max-w-lg mx-auto lg:mx-0 lg:absolute lg:left-0 lg:top-0 lg:max-w-[min(44%,520px)] lg:-translate-y-6 xl:-translate-y-10">
                <div
                  className="hidden sm:block w-2.5 lg:w-3 shrink-0 rounded-full bg-tiff shadow-[0_0_24px_rgba(127,212,204,0.35)] min-h-[11rem] lg:min-h-[17rem] self-stretch"
                  aria-hidden
                />
                <div className="flex-1 min-w-0 rounded-[1.25rem] sm:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_28px_70px_-12px_rgba(0,0,0,0.65)] bg-[#161618] aspect-[72/28] sm:aspect-[72/26] lg:aspect-auto lg:min-h-[220px] xl:min-h-[260px]">
                  <LlmChatSurfaceIllustration className="w-full h-full block min-h-[200px] lg:min-h-[220px]" />
                </div>
              </div>

              {/* Stepped cream panel */}
              <div className="manifesto-panel relative z-10 mt-8 sm:mt-10 lg:mt-[5.5rem] lg:ml-[6%] xl:ml-[7%] bg-snow-50 text-ink rounded-[1.75rem] sm:rounded-[2rem] lg:rounded-[2.75rem] xl:rounded-[3rem] border border-ink/[0.06] shadow-[0_40px_100px_-24px_rgba(10,10,10,0.35)] overflow-hidden">
                <div className="p-7 sm:p-9 lg:p-12 xl:p-14 lg:pt-12 xl:pt-14">
                  <div className="lg:pl-[36%] xl:pl-[38%] lg:min-h-[10rem]">
                    <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 text-[14px] md:text-[15px] text-ink/70 leading-[1.75]">
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
                  </div>

                  <div className="mt-10 lg:mt-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-10">
                    <h3 className="font-sans font-bold text-[clamp(1.75rem,4.5vw,3.25rem)] uppercase leading-[0.95] tracking-[-0.03em] text-ink max-w-[18ch]">
                      Three pillars.
                      <br />
                      <span className="font-display font-normal normal-case italic tracking-tight text-ink/75">
                        One shape.
                      </span>
                    </h3>
                    <Link
                      href="#surfaces"
                      className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-tiff px-7 py-3.5 text-[13px] font-medium tracking-tight text-ink shadow-[0_8px_28px_-6px_rgba(127,212,204,0.55)] hover:bg-tiff-400 transition-colors"
                    >
                      Explore surfaces
                      <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
