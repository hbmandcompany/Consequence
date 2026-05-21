import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Display, Eyebrow, Lede, Pill, Section } from "@/components/ui";

export function ShopHero() {
  return (
    <Section className="relative pt-28 lg:pt-36 pb-20 overflow-hidden border-b border-ink/10">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(127, 212, 204, 0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 20%, rgba(10, 10, 10, 0.04), transparent)",
        }}
        aria-hidden
      />
      <Container className="relative">
        <div className="grid grid-cols-12 gap-y-10 gap-x-8 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Pill tone="tiff">Shop</Pill>
              <span className="text-[11px] tabular tracking-[0.2em] uppercase text-ink/45">
                Studio · Marketplace · Wallet
              </span>
            </div>
            <Display as="h1">
              Everything
              <br />
              you release,
              <br />
              <span className="italic text-ink/85">in one room.</span>
            </Display>
            <Lede className="mt-10 max-w-[56ch]">
              An immersive producer surface — personalized feed, stem marketplace,
              live sessions, and USDC settlement in the same glass stack. Browse
              without an account; sign in when you are ready to publish and get paid.
            </Lede>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3 lg:items-end">
            <Link
              href="/signup"
              className="group w-full lg:max-w-xs inline-flex items-center justify-between bg-ink text-snow-50 px-6 py-4 hover:bg-ink/90 transition-colors"
            >
              <span className="text-[13px] tracking-tight">Sign up to publish</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/login"
              className="group w-full lg:max-w-xs inline-flex items-center justify-between border border-ink/15 px-6 py-4 hover:border-ink/50 transition-colors"
            >
              <span className="text-[13px] tracking-tight text-ink/80">Client login</span>
              <ArrowUpRight className="w-4 h-4 text-ink/40" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function TreasuryHero() {
  return (
    <Section className="relative pt-28 lg:pt-36 pb-20 overflow-hidden border-b border-ink/10 bg-snow-100">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 85% 0%, rgba(196, 165, 116, 0.18), transparent 50%), radial-gradient(ellipse 40% 30% at 10% 80%, rgba(127, 212, 204, 0.08), transparent)",
        }}
        aria-hidden
      />
      <Container className="relative">
        <div className="grid grid-cols-12 gap-y-10 gap-x-8 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Eyebrow index="Treasury" label="The Reserve" accent="gold" />
              <Pill tone="gold">Live ledger</Pill>
            </div>
            <Display as="h1">
              Capital with
              <br />
              the same fidelity
              <br />
              <span className="italic text-ink/85">as the mix.</span>
            </Display>
            <Lede className="mt-10 max-w-[56ch]">
              The institutional consequence layer — composition events, royalty
              splits, Circle USDC, and Solana-confirmed settlement on one
              Kubernetes-native substrate. Partners integrate through the same
              rails HBM runs in production.
            </Lede>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3 lg:items-end">
            <Link
              href="/login"
              className="group w-full lg:max-w-xs inline-flex items-center justify-between bg-ink text-snow-50 px-6 py-4 hover:bg-ink/90 transition-colors"
            >
              <span className="text-[13px] tracking-tight">Client login</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/session-protocol"
              className="group w-full lg:max-w-xs inline-flex items-center justify-between border border-ink/15 px-6 py-4 hover:border-ink/50 transition-colors"
            >
              <span className="text-[13px] tracking-tight text-ink/80">Session Protocol</span>
              <ArrowUpRight className="w-4 h-4 text-ink/40" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
