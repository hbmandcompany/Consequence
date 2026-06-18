"use client";

import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Cpu,
  HardDrive,
  Monitor,
  Terminal,
} from "lucide-react";
import { Mark } from "@/components/mark";
import { Container, Display, Eyebrow, Lede, Pill, Section } from "@/components/ui";
import {
  displayVersion,
  type DownloadPlatform,
  type DownloadsManifest,
  type ManifestFetchResult,
} from "@/lib/downloads/manifest";
import {
  detectPlatform,
  PLATFORM_LABELS,
  PLATFORM_ORDER,
  type DetectedPlatform,
} from "@/lib/downloads/platform";

const REQUIREMENTS = [
  "macOS 13 Ventura or later · Windows 11 22H2+ · Linux x64",
  "8 GB RAM minimum · 16 GB recommended for Monte Carlo fleets",
  "2 GB free disk · SSD strongly recommended",
  "Internet for ledger sync, Shop, and AI assistant metering",
];

const PLATFORM_ICONS = {
  windows: Monitor,
  macos: Cpu,
  linux: Terminal,
} as const;

/** Primary desktop platforms shown in the hero panel. */
const HERO_PLATFORMS: DownloadPlatform[] = ["macos", "windows"];

const DOWNLOAD_BTN =
  "inline-flex items-center gap-2 rounded-md bg-ink px-3.5 py-2 text-[12px] tracking-tight text-snow-50 transition-colors hover:bg-ink/90";

type PageState = ManifestFetchResult & { detected: DetectedPlatform };

function formatReleasedAt(releasedAt: string): string {
  const parsed = new Date(releasedAt);
  if (Number.isNaN(parsed.getTime())) return releasedAt;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function fileExtension(filename?: string, url?: string): string {
  const source = filename ?? url?.split("/").pop() ?? "";
  if (!source) return "";
  const ext = source.split(".").pop();
  return ext ? `.${ext}` : "";
}

function logDownload(platform: DownloadPlatform, version: string) {
  track("download_click", { platform, version });
}

function downloadFilename(filename?: string, url?: string): string | undefined {
  return filename ?? url?.split("/").pop() ?? undefined;
}

export function DownloadView({
  manifestState,
}: {
  manifestState: ManifestFetchResult;
}) {
  const [detected, setDetected] = useState<DetectedPlatform>("unknown");

  useEffect(() => {
    setDetected(detectPlatform());
  }, []);

  const state: PageState = { ...manifestState, detected };
  const manifest = state.status === "ready" ? state.manifest : null;
  const availablePlatforms = manifest
    ? PLATFORM_ORDER.filter((id) => Boolean(manifest.downloads[id]))
    : [];
  const primaryPlatform =
    detected !== "mobile" &&
    detected !== "unknown" &&
    manifest?.downloads[detected]
      ? detected
      : availablePlatforms[0];

  return (
    <>
      <Section className="relative pt-28 md:pt-32 lg:pt-36 pb-20 overflow-hidden border-b border-ink/10 min-h-svh">
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
                {manifest && (
                  <>
                    <Pill tone="tiff">v{displayVersion(manifest)}</Pill>
                    <span className="text-[11px] tabular tracking-[0.14em] uppercase text-ink/35">
                      Released {formatReleasedAt(manifest.releasedAt)}
                    </span>
                  </>
                )}
              </div>
              <Display as="h1" className="max-w-[16ch]">
                Consequence
              </Display>
              <Lede className="mt-8 max-w-[52ch]">
                native desktop DAW by HBM & Company
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
              <HeroDownloadCard
                state={state}
                primaryPlatform={primaryPlatform}
                manifest={manifest}
                detected={detected}
              />
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

              {(state.status === "coming-soon" || state.status === "error") && (
                <ComingSoonPanel error={state.status === "error"} />
              )}

              {manifest && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {PLATFORM_ORDER.map((id) => (
                    <PlatformCard
                      key={id}
                      platformId={id}
                      url={manifest.downloads[id]}
                      filename={manifest.filenames?.[id]}
                      version={displayVersion(manifest)}
                      featured={id === primaryPlatform}
                      disabled={!manifest.downloads[id]}
                    />
                  ))}
                </div>
              )}

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
                  Release
                </p>
                {manifest && (
                  <p className="text-[14px] text-ink/70 leading-relaxed">
                    v{displayVersion(manifest)} — released {formatReleasedAt(manifest.releasedAt)}.
                    Installers are code-signed and pulled from the latest GitHub release.
                  </p>
                )}
                {(state.status === "coming-soon" || state.status === "error") && (
                  <p className="text-[14px] text-ink/70 leading-relaxed">
                    Desktop builds ship with each tagged release. Request early access while
                    the first public build is rolling out.
                  </p>
                )}
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

function HeroDownloadCard({
  state,
  primaryPlatform,
  manifest,
  detected,
}: {
  state: PageState;
  primaryPlatform?: DownloadPlatform;
  manifest: DownloadsManifest | null;
  detected: DetectedPlatform;
}) {
  if (detected === "mobile") {
    return (
      <div className="rounded-xl border border-ink/10 bg-snow-100/80 p-6 lg:p-8 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.12)]">
        <p className="text-[11px] tabular uppercase tracking-[0.18em] text-ink/40 mb-4">
          Desktop app
        </p>
        <p className="font-display text-[22px] tracking-tight text-ink">
          Consequence is a desktop app
        </p>
        <p className="mt-3 text-[14px] text-ink/60 leading-relaxed">
          Install on Windows, macOS, or Linux from a computer. Open this page on desktop
          when you are ready to download.
        </p>
      </div>
    );
  }

  const version = manifest ? displayVersion(manifest) : "";
  const showComingSoonNote =
    state.status === "coming-soon" || state.status === "error" || !manifest;

  return (
    <div className="rounded-xl border border-ink/10 bg-snow-100/80 p-6 lg:p-8 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.12)]">
      <p className="text-[11px] tabular uppercase tracking-[0.18em] text-ink/40 mb-4">
        Recommended
      </p>
      <div className="flex flex-col gap-4">
        {HERO_PLATFORMS.map((platformId) => (
          <HeroPlatformCard
            key={platformId}
            platformId={platformId}
            url={manifest?.downloads[platformId]}
            filename={manifest?.filenames?.[platformId]}
            version={version}
            featured={platformId === primaryPlatform}
          />
        ))}
      </div>
      {showComingSoonNote ? (
        <p className="mt-5 text-[12px] text-ink/45 leading-relaxed">
          {state.status === "error"
            ? "We could not reach the release server. Try again shortly or request early access."
            : "Installers publish with each tagged release. Request early access to be notified when downloads go live."}
          {" "}
          <Link href="/contact" className="uline text-ink/70 hover:text-ink">
            Request early access
          </Link>
        </p>
      ) : (
        <p className="mt-5 text-[12px] text-ink/45 leading-relaxed">
          Not sure which Mac build? Apple menu → About This Mac — chips with
          &ldquo;Apple M&rdquo; use Apple Silicon. The macOS download is a universal build.
        </p>
      )}
    </div>
  );
}

function HeroPlatformCard({
  platformId,
  url,
  filename,
  version,
  featured = false,
}: {
  platformId: DownloadPlatform;
  url?: string;
  filename?: string;
  version: string;
  featured?: boolean;
}) {
  const labels = PLATFORM_LABELS[platformId];
  const Icon = PLATFORM_ICONS[platformId];
  const available = Boolean(url);
  const ext = fileExtension(filename, url);

  return (
    <div
      className={clsx(
        "rounded-lg border bg-snow-0 p-5",
        featured ? "border-tiff/30" : "border-ink/10"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-[22px] tracking-tight text-ink">{labels.name}</p>
          <p className="mt-1 text-[13px] text-ink/50">{labels.arch}</p>
        </div>
        <div
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-md border",
            featured
              ? "border-tiff/25 bg-tiff/10 text-tiff"
              : "border-ink/10 bg-ink/[0.03] text-ink/50"
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/[0.06] pt-4">
        <span className="text-[11px] tabular tracking-[0.12em] uppercase text-ink/35">
          {available
            ? `${version ? `v${version}` : "Latest"}${ext ? ` · ${ext}` : ""}`
            : "Coming soon"}
        </span>
        {available && url ? (
          <a
            href={url}
            download={downloadFilename(filename, url)}
            rel="noopener noreferrer"
            onClick={() => logDownload(platformId, version)}
            className={DOWNLOAD_BTN}
          >
            <ArrowDown className="h-3.5 w-3.5" />
            Download
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-md bg-ink/20 px-3.5 py-2 text-[12px] tracking-tight text-snow-50/70 cursor-not-allowed">
            <ArrowDown className="h-3.5 w-3.5" />
            Download
          </span>
        )}
      </div>
    </div>
  );
}

function ComingSoonPanel({ error }: { error?: boolean }) {
  return (
    <div className="rounded-lg border border-ink/10 bg-snow-100/60 p-8">
      <p className="font-display text-[24px] tracking-tight text-ink">
        {error ? "Could not load release" : "Coming soon"}
      </p>
      <p className="mt-3 max-w-[48ch] text-[14px] text-ink/65 leading-relaxed">
        {error
          ? "We could not reach the release server. Try again in a moment or request early access."
          : "Desktop installers publish with each tagged release. Request early access and we will let you know when downloads are available."}
      </p>
      <Link
        href="/contact"
        className="mt-6 inline-flex items-center gap-2 text-[13px] text-ink uline"
      >
        Request early access
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function PlatformCard({
  platformId,
  url,
  filename,
  version,
  featured = false,
  disabled = false,
}: {
  platformId: DownloadPlatform;
  url?: string;
  filename?: string;
  version: string;
  featured?: boolean;
  disabled?: boolean;
}) {
  const labels = PLATFORM_LABELS[platformId];
  const Icon = PLATFORM_ICONS[platformId];
  const available = Boolean(url) && !disabled;

  return (
    <div
      className={clsx(
        "group flex flex-col rounded-lg border transition-colors",
        featured
          ? "border-tiff/30 bg-snow-0"
          : "border-ink/10 bg-snow-0",
        !available && "opacity-60"
      )}
    >
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="font-display text-[22px] tracking-tight text-ink">{labels.name}</p>
          <p className="mt-1 text-[13px] text-ink/50">{labels.arch}</p>
        </div>
        <div
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-md border",
            featured
              ? "border-tiff/25 bg-tiff/10 text-tiff"
              : "border-ink/10 bg-ink/[0.03] text-ink/50"
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
      </div>
      <div className="mt-auto border-t border-ink/[0.06] px-5 py-4 flex items-center justify-between gap-3">
        <span className="text-[11px] tabular tracking-[0.12em] uppercase text-ink/35">
          {available
            ? `v${version}${filename || url ? ` · ${fileExtension(filename, url)}` : ""}`
            : "Not available yet"}
        </span>
        {available && url ? (
          <a
            href={url}
            download={downloadFilename(filename, url)}
            rel="noopener noreferrer"
            onClick={() => logDownload(platformId, version)}
            className={DOWNLOAD_BTN}
          >
            <ArrowDown className="h-3.5 w-3.5" />
            Download
          </a>
        ) : (
          <span className="inline-flex items-center rounded-md bg-ink/[0.04] px-3.5 py-2 text-[12px] text-ink/35">
            Unavailable
          </span>
        )}
      </div>
    </div>
  );
}
