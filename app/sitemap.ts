import type { MetadataRoute } from "next";
import { getHomeOrigin, getSoftwareOrigin } from "@/lib/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const cc = getHomeOrigin() || "https://www.consequence.cc";
  const software = getSoftwareOrigin() || "https://www.consequence.software";
  const now = new Date();

  const ccRoutes: MetadataRoute.Sitemap = [
    { url: cc, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${cc}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  const softwareRoutes: MetadataRoute.Sitemap = [
    { url: software, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${software}/treasury`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${software}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${software}/book-of-genesis`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${software}/session-protocol`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${software}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${software}/signup`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  return [...ccRoutes, ...softwareRoutes];
}
