import type { Metadata } from "next";
import { getHomeOrigin, getSoftwareOrigin } from "@/lib/urls";

export const BRAND_CC = {
  siteName: "Consequence.cc",
  defaultTitle: "Consequence.cc — Marketplace & creator economy",
  titleTemplate: "%s · Consequence.cc",
  description:
    "Consequence.cc — immersive producer marketplace, personalized feed, stems, sessions, and USDC wallet. Built by HBM & Company.",
  keywords: [
    "Consequence.cc",
    "music marketplace",
    "producer shop",
    "stems",
    "royalties",
    "USDC",
    "creator economy",
  ],
} as const;

export const BRAND_SOFTWARE = {
  siteName: "Consequence.software",
  defaultTitle: "Consequence.software — Studio & consequence engine",
  titleTemplate: "%s · Consequence.software",
  description:
    "Consequence.software — real-time music production, Monte Carlo rehearsal, AI assistant, and creator royalty settlement. Built by HBM & Company.",
  keywords: [
    "Consequence.software",
    "DAW",
    "music production",
    "royalty engine",
    "Session Protocol",
    "Monte Carlo",
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

/** Primary surface — consequence.cc (marketplace, shop, feed). */
export function ccMetadata(options?: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const origin = getHomeOrigin() || "https://www.consequence.cc";
  const path = options?.path ?? "";
  const url = `${origin}${path}`;
  const title = options?.title ?? BRAND_CC.defaultTitle;
  const description = options?.description ?? BRAND_CC.description;

  return {
    metadataBase: new URL(origin),
    title: options?.title
      ? { absolute: `${options.title} · ${BRAND_CC.siteName}` }
      : { default: BRAND_CC.defaultTitle, template: BRAND_CC.titleTemplate },
    description,
    keywords: [...BRAND_CC.keywords],
    applicationName: BRAND_CC.siteName,
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
export function softwareMetadata(options?: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  openGraph?: Partial<NonNullable<Metadata["openGraph"]>>;
}): Metadata {
  const origin = getSoftwareOrigin() || "https://www.consequence.software";
  const path = options?.path ?? "";
  const url = `${origin}${path}`;
  const title = options?.title ?? BRAND_SOFTWARE.defaultTitle;
  const description = options?.description ?? BRAND_SOFTWARE.description;

  return {
    metadataBase: new URL(origin),
    title: options?.title
      ? { absolute: `${options.title} · ${BRAND_SOFTWARE.siteName}` }
      : { default: BRAND_SOFTWARE.defaultTitle, template: BRAND_SOFTWARE.titleTemplate },
    description,
    keywords: [...BRAND_SOFTWARE.keywords],
    applicationName: BRAND_SOFTWARE.siteName,
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
