import Link from "next/link";
import { TreasuryHero } from "@/components/immersive/surface-hero";
import { EngineDeepDive } from "@/components/sw/engine-sections";
import { Container, Section } from "@/components/ui";

export default function TreasuryPage() {
  return (
    <>
      <TreasuryHero />
      <Section className="py-6 border-b border-ink/10 bg-snow-0">
        <Container>
          <p className="text-[13px] text-ink/55">
            Full engine narrative below — same substrate that powers{" "}
            <Link href="/shop" className="uline text-ink">
              Shop
            </Link>
            .
          </p>
        </Container>
      </Section>
      <EngineDeepDive />
    </>
  );
}
