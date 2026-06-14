import Link from "next/link";
import clsx from "clsx";
import { Check } from "lucide-react";
import { Container, Display, Eyebrow, Lede, Pill, Section } from "@/components/ui";
import { softwareMetadata } from "@/lib/seo/metadata";

export const metadata = softwareMetadata({
  title: "Pricing",
  description:
    "Consequence.software pricing — Monte Carlo simulation, AI assistant usage, and Polygon-token metering on the decentralized ledger.",
  path: "/pricing",
});

type Tier = {
  name: string;
  price: string;
  period: string;
  description: string;
  accent: "ink" | "tiff" | "gold";
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Hobby",
    price: "$0",
    period: "to start",
    description:
      "For solo producers exploring Conductor — enough Monte Carlo rehearsal and AI assistant capacity to finish tracks without enterprise overhead.",
    accent: "ink",
    features: [
      "500 Monte Carlo paths / month across melodic, harmonic, and rhythmic futures",
      "AI assistant: 25k tokens / month for lyrics, arrangement, and split guidance",
      "Polygon metering: on-chain usage receipts for assistant and simulation events",
      "Decentralized ledger mirror — attribution and split state recorded per session",
      "1 active work · 2 collaborators · Shop publishing",
    ],
    cta: "Start free",
    href: "/signup",
  },
  {
    name: "Professional",
    price: "$49",
    period: "/ month",
    description:
      "For working creators and small rooms who run Monte Carlo daily and lean on the AI assistant across every session.",
    accent: "tiff",
    highlight: true,
    features: [
      "50,000 Monte Carlo paths / month with priority fleet scheduling",
      "AI assistant: 500k tokens / month · meter, rhyme, and semantic fit models",
      "Polygon POL settlement for usage — every inference leg hashed to the ledger",
      "Full decentralized audit trail: twins, splits, and payout eligibility",
      "Unlimited works · 8 collaborators · marketplace analytics",
    ],
    cta: "Go Professional",
    href: "/signup",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "for labels",
    description:
      "For record labels and publisher groups — fleet-scale simulation, governed AI, and ledger-grade reconciliation across rosters.",
    accent: "gold",
    features: [
      "Dedicated Monte Carlo pools — millions of paths with SLA-backed turnaround",
      "AI assistant: unlimited governed tokens · custom motif and compliance guardrails",
      "Polygon + Base settlement orchestration with label-wide custody policy",
      "Enterprise ledger mesh — multi-roster twins, audit exports, and SOC-ready logs",
      "Unlimited seats · SSO · dedicated success · custom split governance",
    ],
    cta: "Contact sales",
    href: "/contact",
  },
];

export default function PricingPage() {
  return (
    <>
      <Section className="pt-28 md:pt-32 lg:pt-36 pb-16 border-b border-ink/10">
        <Container>
          <Eyebrow label="Pricing" />
          <Display as="h1" className="mt-6 max-w-[20ch]">
            Metered intelligence.
            <br />
            <span className="italic text-ink/85">Ledger-backed.</span>
          </Display>
          <Lede className="mt-8 max-w-[62ch] text-[clamp(14px,1.1vw,17px)]">
            Monte Carlo rehearsal and the AI assistant are billed by usage — every simulation
            path and every token is recorded on Consequence&apos;s decentralized ledger and
            settled against Polygon (POL) for transparent, attributable metering. Choose the
            tier that matches your room.
          </Lede>
          <div className="mt-8 flex flex-wrap gap-3">
            <Pill tone="tiff">Monte Carlo</Pill>
            <Pill tone="ghost">AI Assistant</Pill>
            <Pill tone="gold">Polygon POL</Pill>
            <Pill tone="ghost">Decentralized ledger</Pill>
          </div>
        </Container>
      </Section>

      <Section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={clsx(
                  "col-span-12 md:col-span-4 flex flex-col border p-8 lg:p-10 transition-colors",
                  tier.highlight
                    ? "border-ink/25 bg-snow-100 shadow-[0_20px_56px_-24px_rgba(10,10,10,0.12)]"
                    : "border-ink/10 bg-snow-0 hover:border-ink/25"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-3xl tracking-tight">{tier.name}</h2>
                  {tier.highlight ? <Pill tone="tiff">Popular</Pill> : null}
                </div>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-[clamp(36px,4vw,48px)] leading-none tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-[13px] text-ink/50">{tier.period}</span>
                </div>
                <p className="mt-5 text-[14px] text-ink/65 leading-[1.65]">{tier.description}</p>
                <ul className="mt-8 space-y-3 flex-1 border-t border-ink/10 pt-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[13px] text-ink/75 leading-snug">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tiff-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className={clsx(
                    "mt-10 inline-flex h-11 items-center justify-center rounded-lg text-[14px] transition-colors",
                    tier.highlight
                      ? "bg-ink text-snow-50 hover:bg-ink/90"
                      : "bg-snow-200 text-ink hover:bg-snow-300"
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-ink/10 pt-12">
            <h3 className="font-display text-2xl tracking-tight">How metering works</h3>
            <div className="mt-8 grid md:grid-cols-3 gap-8">
              {[
                {
                  t: "Monte Carlo",
                  d: "Each simulation path — melodic variation, harmonic branch, or rhythmic what-if — is hashed and written to the ledger before results return to Conductor.",
                },
                {
                  t: "AI Assistant",
                  d: "Token usage for lyrics, arrangement, and split guidance is metered per request. POL debits settle on Polygon; attribution stays tied to the active work twin.",
                },
                {
                  t: "Decentralized record",
                  d: "Every billable event mirrors to Consequence's decentralized ledger — creators and labels audit usage, splits, and settlement without trusting a single operator view.",
                },
              ].map((item) => (
                <div key={item.t}>
                  <div className="text-[10px] tabular uppercase tracking-[0.2em] text-ink/45">
                    {item.t}
                  </div>
                  <p className="mt-3 text-[14px] text-ink/65 leading-[1.65]">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
