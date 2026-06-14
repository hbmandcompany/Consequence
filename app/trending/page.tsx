import type { Metadata } from "next";
import { TrendingView } from "@/components/trending/trending-view";
import { ccMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = ccMetadata({
  title: "Trending — Music Discovery & For You Feed",
  description:
    "Discover trending stems, beats, and producer sessions on Consequence.cc — personalized For You radio, saves, and marketplace picks ranked for music creators.",
  path: "/trending",
});

export default function TrendingPage() {
  return <TrendingView />;
}
