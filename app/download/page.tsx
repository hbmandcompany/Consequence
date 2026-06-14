import Link from "next/link";
import clsx from "clsx";
import { ArrowDown, ArrowUpRight, Check, Cpu, HardDrive, Monitor } from "lucide-react";
import { Mark } from "@/components/mark";
import { Container, Display, Eyebrow, Lede, Pill, Section } from "@/components/ui";
import { softwareMetadata } from "@/lib/seo/metadata";

export const metadata = softwareMetadata({
  title: "Download",
  description:
    "Download Consequence for macOS and Windows — Conductor studio, Monte Carlo rehearsal, and ledger-native settlement in one desktop client.",
  path: "/download",
});

const VERSION = "0.9.4";
const BUILD = "2026.06.05";

type Platform = {
  id: string;
  name: string;
  arch: string;
  size: string;
  icon: typeof Monitor;
  accent: "ink" | "tiff";
  primary?: boolean;
};

const PLATFORMS: Platform[] = [
  {
    id: "mac-arm",
    name: "macOS",
    arch: "Apple Silicon",
    size: "184 MB",
    icon: Cpu,
    accent: "tiff",
    primary: true,
  },
  {
    id: "mac-intel",
    name: "macOS",
    arch: "Intel",
    size: "191 MB",
    icon: Cpu,
    accent: "ink",
  },
  {
    id: "win",
    name: "Windows",
    arch: "x64",
    size: "198 MB",
    icon: Monitor,
    accent: "ink",
  },
];

const REQUIREMENTS = [
  "macOS 13 Ventura or later · Windows 11 22H2+",
  "8 GB RAM minimum · 16 GB recommended for Monte Carlo fleets",
  "2 GB free disk · SSD strongly recommended",
  "Internet for ledger sync, Shop, and AI assistant metering",
];

export default function DownloadPage() {
  return (
    <>
      <Section className="relative pt-28 md:pt-32 lg:pt-36 pb-20 overflow-hidden border-b border-ink/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 15% 0%, rgba(127, 212, 204, 0.14), transparent 55%), radial-gradient(ellipse 45% 35% at 90% 20%, rgba(0, 0, 0, 0.04), transparent)",
          }}
          aria-hidden
        />
        <Container className="relative">
          <div className="grid grid-cols-12 gap-y-12 gap-x-8 lg:gap-x-12 items-start">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Eyebrow index="Desktop" label="Consequence client" accent="tiff" />
                <Pill tone="tiff">v{VERSION}</Pill>
                <span className="text-[11px] tabular tracking-[0.14em] uppercase text-ink/35">
                  Build {BUILD}
                </span>
              </div>
              <Display as="h1" className="max-w-[16ch]">
                Download
                <br />
                <span className="italic text-ink/85">Consequence.</span>
              </Display>
              <Lede className="mt-8 max-w-[52ch]">
                The desktop studio — Conductor arrangement, Monte Carlo rehearsal, AI
                assistant, and ledger-native settlement in one install. Sign in once;
                your catalog, twins, and wallet follow you.
              </Lede>
              <div className="mt-10 flex flex-wrap items-center gap-4 text-[13px] text-ink/55">
                <span className="inline-flex items-center gap-2">
                  <Mark className="w-4 h-4 text-ink/40" />
                  HBM & Company
                </span>
                <span className="hidden sm:inline text-ink/20">·</span>
                <Link href="/login" className="uline text-ink/70 hover:text-ink">
                  Already installed? Sign in
                </Link>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5">
              <div className="rounded-xl border border-ink/10 bg-snow-100/80 p-6 lg:p-8 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.12)]">
                <p className="text-[11px] tabular uppercase tracking-[0.18em] text-ink/40 mb-4">
                  Recommended
                </p>
                <PlatformCard platform={PLATFORMS[0]!} featured />
                <p className="mt-5 text-[12px] text-ink/45 leading-relaxed">
                  Not sure which Mac build? Apple menu → About This Mac — chips with
                  &ldquo;Apple M&rdquo; use Apple Silicon.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-12 gap-y-12 gap-x-8 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] tracking-tight text-ink mb-10">
                All platforms
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PLATFORMS.map((platform) => (
                  <PlatformCard key={platform.id} platform={platform} />
                ))}
              </div>

              <div className="my-12 border-t border-ink/10" />

              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-[13px] tabular uppercase tracking-[0.16em] text-ink/45 mb-4">
                    What&apos;s included
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Conductor — full arrangement, piano roll, and mix surface",
                      "Monte Carlo rehearsal fleets with metered Polygon receipts",
                      "Book of Genesis instruments and governed AI assistant",
                      "Shop publishing and USDC wallet sync",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 text-[14px] text-ink/70 leading-relaxed">
                        <Check className="w-4 h-4 shrink-0 mt-0.5 text-tiff" strokeWidth={2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[13px] tabular uppercase tracking-[0.16em] text-ink/45 mb-4">
                    System requirements
                  </h3>
                  <ul className="space-y-3">
                    {REQUIREMENTS.map((item) => (
                      <li key={item} className="flex gap-3 text-[14px] text-ink/70 leading-relaxed">
                        <HardDrive className="w-4 h-4 shrink-0 mt-0.5 text-ink/30" strokeWidth={1.75} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside className="col-span-12 lg:col-span-4 flex flex-col gap-4">
              <div className="rounded-lg border border-ink/10 bg-snow-100 p-6">
                <p className="text-[11px] tabular uppercase tracking-[0.18em] text-ink/40 mb-3">
                  Release notes
                </p>
                <p className="text-[14px] text-ink/70 leading-relaxed">
                  v{VERSION} — Conductor timeline polish, faster Monte Carlo cold start,
                  and improved Shop stem preview latency.
                </p>
                <Link
                  href="/book-of-genesis"
                  className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-ink uline"
                >
                  Explore Book of Genesis
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="rounded-lg border border-ink/10 p-6">
                <p className="text-[11px] tabular uppercase tracking-[0.18em] text-ink/40 mb-3">
                  Plans & metering
                </p>
                <p className="text-[14px] text-ink/65 leading-relaxed mb-4">
                  Hobby tier includes enough Monte Carlo and assistant capacity to finish
                  tracks. Upgrade when your room scales.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 text-[13px] text-ink uline"
                >
                  View pricing
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <p className="text-[11px] text-ink/35 leading-relaxed px-1">
                By downloading you agree to the Consequence client terms. Builds are
                code-signed; verify checksums in release notes after sign-in.
              </p>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

function PlatformCard({
  platform,
  featured = false,
}: {
  platform: Platform;
  featured?: boolean;
}) {
  const Icon = platform.icon;

  return (
    <div
      className={clsx(
        "group flex flex-col rounded-lg border transition-colors",
        featured
          ? "border-tiff/30 bg-snow-0"
          : "border-ink/10 bg-snow-0 hover:border-ink/20"
      )}
    >
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="font-display text-[22px] tracking-tight text-ink">{platform.name}</p>
          <p className="mt-1 text-[13px] text-ink/50">{platform.arch}</p>
        </div>
        <div
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-md border",
            platform.accent === "tiff"
              ? "border-tiff/25 bg-tiff/10 text-tiff"
              : "border-ink/10 bg-ink/[0.03] text-ink/50"
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
      </div>
      <div className="mt-auto border-t border-ink/[0.06] px-5 py-4 flex items-center justify-between gap-3">
        <span className="text-[11px] tabular tracking-[0.12em] uppercase text-ink/35">
          {platform.size} · .dmg / .exe
        </span>
        <Link
          href="/signup"
          className={clsx(
            "inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-[12px] tracking-tight transition-colors",
            platform.primary || featured
              ? "bg-ink text-snow-50 hover:bg-ink/90"
              : "bg-ink/[0.06] text-ink/80 hover:bg-ink/[0.1]"
          )}
        >
          <ArrowDown className="h-3.5 w-3.5" />
          Download
        </Link>
      </div>
    </div>
  );
}
