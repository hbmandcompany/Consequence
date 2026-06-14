import Link from "next/link";
import { GenesisPillarsSection } from "@/components/sw/engine-sections";
import { Container, Display, Eyebrow, Lede, Section } from "@/components/ui";

export const metadata = {
  title: "Book of Genesis — Consequence",
  description:
    "Genesis synth, Drum & Sequence, and Lyrics Accelerator — the three creative pillars of Conductor.",
};

export default function BookOfGenesisPage() {
  return (
    <>
      <Section className="pt-28 md:pt-32 lg:pt-36 pb-16 border-b border-ink/10">
        <Container>
          <Eyebrow index="Conductor" label="Book of Genesis" />
          <Display as="h1" className="mt-6 max-w-[18ch]">
            Sound. Groove.
            <br />
            <span className="italic text-ink/85">Language.</span>
          </Display>
          <Lede className="mt-8 max-w-[58ch] text-[clamp(14px,1.1vw,17px)]">
            The flagship instruments and assistants that power Conductor — neural timbre,
            pattern memory, and governed lyric intelligence. Each pillar scales independently;
            none blocks the others.
          </Lede>
          <Link
            href="/login"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-snow-200 px-6 text-[15px] text-ink hover:bg-snow-300 transition-colors"
          >
            Download Consequence
          </Link>
        </Container>
      </Section>
      <GenesisPillarsSection />
    </>
  );
}
