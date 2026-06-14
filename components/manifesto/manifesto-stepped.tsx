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
            <figure
              className="relative z-20 m-0 w-full max-w-[68rem] mx-auto mb-8 sm:mb-10 lg:mb-12"
              aria-label="Consequence studio — piano roll and agent"
            >
              <div className="w-full rounded-[2rem] sm:rounded-[2.25rem] lg:rounded-[2.75rem] overflow-hidden border border-white/[0.08] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.7)] bg-[#161618] aspect-[72/28] lg:aspect-[72/24]">
                <LlmChatSurfaceIllustration className="w-full h-full block min-h-[190px]" />
              </div>
            </figure>

            <div className="relative z-10 max-w-[68rem] mx-auto flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8 xl:gap-10 rounded-[1.75rem] sm:rounded-[2rem] border border-white/[0.1] bg-white/[0.04] px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
              <h3 className="shrink-0 font-sans font-bold text-[clamp(1.35rem,2.8vw,2.25rem)] uppercase leading-[0.92] tracking-[-0.035em] text-snow-50 lg:max-w-[11ch]">
                Three pillars.
                <br />
                <span className="font-display font-normal normal-case italic tracking-tight text-snow-50/72">
                  One shape.
                </span>
              </h3>

              <p className="flex-1 min-w-0 text-[clamp(12px,1.05vw,14px)] leading-[1.65] text-snow-50/72 lg:border-l lg:border-white/[0.1] lg:pl-8 xl:pl-10">
                A unified event fabric carries every signal; low-latency inference ranks and
                forecasts in real time; large-scale Monte Carlo runs explore compositional,
                marketplace, and creator outcomes in parallel. The same pipeline traces
                royalties and settlements end to end — so creative, commercial, and capital
                consequence stay aligned.
              </p>

              <Link
                href="#surfaces"
                className="group shrink-0 inline-flex w-full sm:w-auto lg:w-auto items-center justify-center gap-2.5 rounded-full bg-tiff px-6 py-3.5 lg:px-7 lg:py-4 text-[12px] lg:text-[13px] font-semibold tracking-tight text-ink shadow-[0_10px_32px_-8px_rgba(127,212,204,0.55)] hover:bg-tiff-400 transition-colors"
              >
                Explore surfaces
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
