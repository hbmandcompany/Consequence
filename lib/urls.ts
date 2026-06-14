/** Primary entry — marketplace / shop at `/` on consequence.cc. */
export const HOME_HOSTS = ["consequence.cc", "www.consequence.cc"] as const;

/** Software marketing site — consequence.software. */
export const SOFTWARE_HOSTS = [
  "consequence.software",
  "www.consequence.software",
] as const;

export function normalizeHostname(host: string): string {
  return host.split(":")[0]?.toLowerCase() ?? "";
}

export function isHomeHostname(host: string): boolean {
  const normalized = normalizeHostname(host);
  const fromEnv = process.env.NEXT_PUBLIC_HOME_HOSTS;
  if (fromEnv) {
    return fromEnv
      .split(",")
      .map((h) => h.trim().toLowerCase())
      .includes(normalized);
  }
  return (HOME_HOSTS as readonly string[]).includes(normalized);
}

export function isSoftwareHostname(host: string): boolean {
  const normalized = normalizeHostname(host);
  const fromEnv = process.env.NEXT_PUBLIC_SOFTWARE_HOSTS;
  if (fromEnv) {
    return fromEnv
      .split(",")
      .map((h) => h.trim().toLowerCase())
      .includes(normalized);
  }
  return (SOFTWARE_HOSTS as readonly string[]).includes(normalized);
}

/** @deprecated Use isHomeHostname */
export const isShopHostname = isHomeHostname;

/** Canonical shop origin — consequence.cc in production. */
export function getHomeOrigin(): string {
  if (process.env.NEXT_PUBLIC_HOME_URL) {
    return process.env.NEXT_PUBLIC_HOME_URL.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    return "https://www.consequence.cc";
  }
  return "";
}

/** Canonical software origin — consequence.software in production. */
export function getSoftwareOrigin(): string {
  if (process.env.NEXT_PUBLIC_SOFTWARE_URL) {
    return process.env.NEXT_PUBLIC_SOFTWARE_URL.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    return "https://www.consequence.software";
  }
  return "";
}

export function getHomeUrl(path = ""): string {
  const suffix = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const origin = getHomeOrigin();
  if (origin) {
    return `${origin}${suffix}`;
  }
  return suffix || "/";
}

export function getSoftwareUrl(path = ""): string {
  const suffix = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const origin = getSoftwareOrigin();
  if (origin) {
    return `${origin}${suffix}`;
  }
  return suffix || "/";
}

/** Homepage for the current surface — stays on .cc or .software, never cross-links. */
export function getSurfaceHomeUrl(hostname?: string): string {
  if (hostname) {
    if (isSoftwareHostname(hostname)) return getSoftwareUrl();
    if (isHomeHostname(hostname)) return getHomeUrl();
  }
  return "/";
}

/** Desktop client download page — always on consequence.software. */
export function getDownloadUrl(): string {
  return getSoftwareUrl("/download");
}

/** @deprecated Use getSoftwareUrl */
export function getMainSiteUrl(path = ""): string {
  return getSoftwareUrl(path);
}

/** @deprecated Use getSoftwareOrigin */
export function getMainSiteOrigin(): string {
  return getSoftwareOrigin();
}

/** Marketplace on consequence.cc in production, /shop in dev. */
export function getShopUrl(path = ""): string {
  const suffix = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  if (process.env.NEXT_PUBLIC_SHOP_URL) {
    return `${process.env.NEXT_PUBLIC_SHOP_URL.replace(/\/$/, "")}${suffix || ""}`;
  }
  if (process.env.NODE_ENV === "production") {
    return getHomeUrl(suffix);
  }
  return `/shop${suffix}`;
}

export function getShopSectionUrl(section: string): string {
  const hash = section.startsWith("#") ? section : `#${section}`;
  const base = getShopUrl();
  if (base.startsWith("http")) {
    return `${base.replace(/\/$/, "")}${hash}`;
  }
  return `${base}${hash}`;
}

export const SHOP_URL = getShopUrl();
