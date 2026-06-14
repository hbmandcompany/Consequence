import type { MetadataRoute } from "next";
import { BRAND_CC } from "@/lib/seo/metadata";
import { getHomeOrigin } from "@/lib/urls";

export default function manifest(): MetadataRoute.Manifest {
  const origin = getHomeOrigin() || "https://www.consequence.cc";

  return {
    name: BRAND_CC.siteName,
    short_name: "Consequence",
    description: BRAND_CC.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F8F7F3",
    theme_color: "#0A0A0A",
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
