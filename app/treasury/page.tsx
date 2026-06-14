import Link from "next/link";
import { TreasuryHero } from "@/components/immersive/surface-hero";
import {
  InfrastructureSettlementSection,
  LedgerBranchSection,
} from "@/components/sw/engine-sections";
import { Container, Section } from "@/components/ui";

export default function TreasuryPage() {
  return (
    <>
      <TreasuryHero />
      <Section className="py-6 border-b border-ink/10 bg-snow-0">
        <Container>
          <p className="text-[13px] text-ink/55">
            Ledger narrative and settlement infrastructure — same substrate that powers{" "}
            <Link href="/shop" className="uline text-ink">
              Shop
            </Link>
            .
          </p>
        </Container>
      </Section>
      <LedgerBranchSection />
      <InfrastructureSettlementSection />
    </>
  );
}
