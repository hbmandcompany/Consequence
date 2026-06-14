import type { Metadata } from "next";
import { HowRailsConnectView } from "@/components/how-rails-connect/how-rails-connect-view";
import { softwareMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = softwareMetadata({
  title: "How the Rails Connect",
  description:
    "Consequence.software — from marketplace purchase to creator settlement: Solana, algorithmic equity, MongoDB, and USDC settlement.",
  path: "/how-the-rails-connect",
  openGraph: { type: "article" },
});

export default function HowTheRailsConnectPage() {
  return <HowRailsConnectView />;
}
