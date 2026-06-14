import type { MetadataRoute } from "next";
import { getRequestSeoSurface } from "@/lib/seo/surface";
import { getHomeOrigin, getSoftwareOrigin } from "@/lib/urls";

export default function robots(): MetadataRoute.Robots {
  const surface = getRequestSeoSurface();
  const cc = getHomeOrigin() || "https://www.consequence.cc";
  const software = getSoftwareOrigin() || "https://www.consequence.software";
  const host = surface === "software" ? software : cc;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/workspace", "/api/"],
    },
    sitemap: [`${cc}/sitemap.xml`, `${software}/sitemap.xml`],
    host,
  };
}
