import type { Metadata } from "next";
import { getHomeOrigin, getSoftwareOrigin } from "@/lib/urls";

export const BRAND_CC = {
  siteName: "Consequence.cc",
  defaultTitle: "Consequence.cc — Music Marketplace for Producers",
  titleTemplate: "%s · Consequence.cc",
  description:
    "Buy and sell stems, beats, and sessions on Consequence.cc — a music marketplace with personalized discovery, producer spotlight, collaboration, and USDC creator payouts.",
  keywords: [
    "Consequence.cc",
    "music marketplace",
    "buy beats online",
    "sell stems",
    "producer marketplace",
    "beat marketplace",
    "music samples",
    "stem packs",
    "music licensing",
    "independent producers",
    "creator economy",
    "music royalties",
    "USDC music payments",
    "producer shop",
    "music discovery",
    "For You feed",
    "session marketplace",
    "collaborate with producers",
  ],
} as const;

export const BRAND_SOFTWARE = {
  siteName: "Consequence.software",
  defaultTitle: "Consequence.software — Music Production Software",
  titleTemplate: "%s · Consequence.software",
  description:
    "Music production software for composing, collaborating, and releasing — Conductor studio, Monte Carlo rehearsal, AI assistant, piano roll, and royalty settlement in one DAW.",
  keywords: [
    "Consequence.software",
    "music production software",
    "DAW",
    "digital audio workstation",
    "music production",
    "beat making software",
    "piano roll",
    "MIDI editor",
    "music collaboration software",
    "studio software",
    "recording software",
    "music composition",
    "Monte Carlo music",
    "AI music assistant",
    "producer software",
    "download music software",
    "Conductor DAW",
    "Session Protocol",
  ],
} as const;

const sharedIcons: Metadata["icons"] = {
  icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
};

function baseOpenGraph(
  brand: typeof BRAND_CC | typeof BRAND_SOFTWARE,
  origin: string,
  overrides?: Partial<Metadata["openGraph"]>
): Metadata["openGraph"] {
  return {
    type: "website",
    siteName: brand.siteName,
    locale: "en_US",
    url: origin,
    title: brand.defaultTitle,
    description: brand.description,
    ...overrides,
  };
}

type MetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  keywords?: string[];
};

/** Primary surface — consequence.cc (marketplace, shop, feed). */
export function ccMetadata(options?: MetadataOptions): Metadata {
  const origin = getHomeOrigin() || "https://www.consequence.cc";
  const path = options?.path ?? "";
  const url = `${origin}${path}`;
  const title = options?.title ?? BRAND_CC.defaultTitle;
  const description = options?.description ?? BRAND_CC.description;
  const keywords = options?.keywords ?? [...BRAND_CC.keywords];

  return {
    metadataBase: new URL(origin),
    title: options?.title
      ? { absolute: `${options.title} · ${BRAND_CC.siteName}` }
      : { default: BRAND_CC.defaultTitle, template: BRAND_CC.titleTemplate },
    description,
    keywords,
    applicationName: BRAND_CC.siteName,
    category: "music",
    alternates: { canonical: url },
    openGraph: baseOpenGraph(BRAND_CC, origin, {
      title,
      description,
      url,
    }),
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@consequence",
    },
    icons: sharedIcons,
    robots: options?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

/** Software surface — consequence.software (studio, treasury, docs). */
export function softwareMetadata(
  options?: MetadataOptions & {
    openGraph?: Partial<NonNullable<Metadata["openGraph"]>>;
  }
): Metadata {
  const origin = getSoftwareOrigin() || "https://www.consequence.software";
  const path = options?.path ?? "";
  const url = `${origin}${path}`;
  const title = options?.title ?? BRAND_SOFTWARE.defaultTitle;
  const description = options?.description ?? BRAND_SOFTWARE.description;
  const keywords = options?.keywords ?? [...BRAND_SOFTWARE.keywords];

  return {
    metadataBase: new URL(origin),
    title: options?.title
      ? { absolute: `${options.title} · ${BRAND_SOFTWARE.siteName}` }
      : { default: BRAND_SOFTWARE.defaultTitle, template: BRAND_SOFTWARE.titleTemplate },
    description,
    keywords,
    applicationName: BRAND_SOFTWARE.siteName,
    category: "music",
    alternates: { canonical: url },
    openGraph: baseOpenGraph(BRAND_SOFTWARE, origin, {
      title,
      description,
      url,
      ...options?.openGraph,
    }),
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@consequence",
    },
    icons: sharedIcons,
    robots: options?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export const rootMetadata: Metadata = ccMetadata();
