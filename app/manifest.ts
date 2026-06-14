import type { MetadataRoute } from "next";
import { BRAND_CC, BRAND_SOFTWARE } from "@/lib/seo/metadata";
import { getRequestSeoSurface } from "@/lib/seo/surface";
import { getHomeOrigin, getSoftwareOrigin } from "@/lib/urls";

export default function manifest(): MetadataRoute.Manifest {
  const surface = getRequestSeoSurface();
  const isSoftware = surface === "software";
  const brand = isSoftware ? BRAND_SOFTWARE : BRAND_CC;
  const origin = isSoftware
    ? getSoftwareOrigin() || "https://www.consequence.software"
    : getHomeOrigin() || "https://www.consequence.cc";

  return {
    name: brand.siteName,
    short_name: "Consequence",
    description: brand.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F8F7F3",
    theme_color: "#0A0A0A",
    categories: ["music", isSoftware ? "productivity" : "shopping"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    id: origin,
  };
}
