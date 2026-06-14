/** Hostnames that serve the shop/marketplace at `/`. */
export const SHOP_HOSTS = ["consequence.cc", "www.consequence.cc"] as const;

export function isShopHostname(host: string): boolean {
  const normalized = host.split(":")[0]?.toLowerCase() ?? "";
  const fromEnv = process.env.NEXT_PUBLIC_SHOP_HOSTS;
  if (fromEnv) {
    return fromEnv
      .split(",")
      .map((h) => h.trim().toLowerCase())
      .includes(normalized);
  }
  return (SHOP_HOSTS as readonly string[]).includes(normalized);
}

/** Marketing site — consequence.software in production. */
export function getMainSiteUrl(path = ""): string {
  const suffix = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  if (process.env.NEXT_PUBLIC_MAIN_SITE_URL) {
    return `${process.env.NEXT_PUBLIC_MAIN_SITE_URL.replace(/\/$/, "")}${suffix}`;
  }
  if (process.env.NODE_ENV === "production") {
    return `https://consequence.software${suffix}`;
  }
  return suffix || "/";
}

/** Shop/marketplace base URL — consequence.cc in production, /shop in dev. */
export function getShopUrl(path = ""): string {
  const suffix = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  if (process.env.NEXT_PUBLIC_SHOP_URL) {
    return `${process.env.NEXT_PUBLIC_SHOP_URL.replace(/\/$/, "")}${suffix || ""}`;
  }
  if (process.env.NODE_ENV === "production") {
    return `https://consequence.cc${suffix || ""}`;
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

/** @deprecated Use getShopUrl() */
export const SHOP_URL = getShopUrl();
