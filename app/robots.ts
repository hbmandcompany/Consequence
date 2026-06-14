import type { MetadataRoute } from "next";
import { getHomeOrigin } from "@/lib/urls";

export default function robots(): MetadataRoute.Robots {
  const origin = getHomeOrigin() || "https://www.consequence.cc";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/workspace", "/api/"],
    },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
