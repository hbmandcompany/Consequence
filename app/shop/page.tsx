import Link from "next/link";
import { ForYouFeed } from "@/components/cc/for-you";
import { Marketplace } from "@/components/cc/marketplace";
import { ProducerSpotlight } from "@/components/cc/spotlight";
import { Wallet } from "@/components/cc/wallet";
import { CCTopBar } from "@/components/cc/topbar";
import { ShopHero } from "@/components/immersive/surface-hero";
import { SessionBanner } from "@/components/auth/session-banner";
import {
  Container,
  Display,
  Eyebrow,
  FadeUp,
  Pill,
  Section,
} from "@/components/ui";

export default function ShopPage() {
  return (
    <>
      <ShopHero />
      <SessionBanner />
      <Section className="pb-16 border-b border-ink/10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Pill tone="tiff">Tonight</Pill>
                <span className="text-[11px] tabular tracking-[0.2em] uppercase text-ink/45">
                  Shop · Atelier 04
                </span>
              </div>
              <Display as="h2" className="text-[clamp(32px,4vw,64px)] max-w-[14ch]">
                Good evening,
                <br />
                <span className="italic text-ink/85">Margot.</span>
              </Display>
              <p className="mt-8 max-w-[52ch] text-[16px] text-ink/65 leading-[1.6]">
                The room has been listening. Twelve sessions resumed in the
                background, three collaborators noticed your last bounce, and the
                marketplace surfaced two stems your model thinks you&rsquo;ll fall in
                love with at 3:14 a.m.
              </p>
            </div>
            <CCTopBar />
          </div>
        </Container>
      </Section>

      <ForYouFeed />
      <Marketplace />
      <ProducerSpotlight />
      <Wallet />

      <Section id="tuned" className="py-32 border-t border-ink/10 scroll-mt-28">
        <Container>
          <FadeUp>
            <Eyebrow label="The room knows" />
            <div className="mt-8 grid grid-cols-12 gap-8 items-end">
              <div className="col-span-12 md:col-span-7">
                <Display as="h2">
                  Tuned to you.
                  <br />
                  <span className="italic text-ink/80">Quietly. Continuously.</span>
                </Display>
              </div>
              <div className="col-span-12 md:col-span-5">
                <p className="text-[15px] text-ink/65 leading-[1.7]">
                  Every play, skip, save, and split feeds back into your twin. Your
                  shop rearranges itself overnight. Your feed is never the same shape
                  twice. The work moves with you.
                </p>
                <Link
                  href="/treasury"
                  className="inline-block mt-6 text-[13px] uline text-ink"
                >
                  Open Treasury →
                </Link>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
