import type { Metadata } from "next";
import { TrendingView } from "@/components/trending/trending-view";
import { ccMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = ccMetadata({
  title: "Trending · For You",
  description:
    "Consequence.cc Trending — personalized For You feed and Radio playback, ranked discovery tied to the consequence engine.",
  path: "/trending",
});

export default function TrendingPage() {
  return <TrendingView />;
}
