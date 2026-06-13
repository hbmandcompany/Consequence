import Link from "next/link";
import { ForYouFeed } from "@/components/cc/for-you";
import { Marketplace } from "@/components/cc/marketplace";
import { ProducerSpotlight } from "@/components/cc/spotlight";
import { Wallet } from "@/components/cc/wallet";
import { ShopHero } from "@/components/immersive/surface-hero";
import {
  Container,
  Display,
  Eyebrow,
  FadeUp,
  Section,
} from "@/components/ui";

export default function ShopPage() {
  return (
    <>
      <ShopHero />

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
