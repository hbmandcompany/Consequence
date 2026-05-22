import type { Metadata } from "next";
import { TrendingView } from "@/components/trending/trending-view";

export const metadata: Metadata = {
  title: "Trending · For You — Consequence",
  description:
    "Personalized For You feed and Radio playback on Consequence — ranked discovery, Listen Now, and stream events tied to the consequence engine.",
  openGraph: {
    title: "Trending · For You",
    description: "The listener surface — For You, Radio, and playback tied to twins and settlement.",
    type: "website",
  },
};

export default function TrendingPage() {
  return <TrendingView />;
}
