import type { MetadataRoute } from "next";
import { getHomeOrigin, getSoftwareOrigin } from "@/lib/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const cc = getHomeOrigin() || "https://www.consequence.cc";
  const software = getSoftwareOrigin() || "https://www.consequence.software";
  const now = new Date();

  const ccRoutes: MetadataRoute.Sitemap = [
    {
      url: cc,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${cc}/trending`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const softwareRoutes: MetadataRoute.Sitemap = [
    {
      url: software,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${software}/download`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: `${software}/book-of-genesis`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${software}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${software}/treasury`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${software}/session-protocol`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${software}/collaboration/live-session`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${software}/collaboration/shared-workspace`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${software}/collaboration/split-proposals`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
  ];

  return [...ccRoutes, ...softwareRoutes];
}
