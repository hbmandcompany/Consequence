import type { Metadata } from "next";
import { HowRailsConnectView } from "@/components/how-rails-connect/how-rails-connect-view";

export const metadata: Metadata = {
  title: "How the Rails Connect — Consequence",
  description:
    "From marketplace purchase to creator settlement: Solana program architecture, algorithmic equity, MongoDB patterns, and USDC settlement — HBM & Company.",
  openGraph: {
    title: "How the Rails Connect",
    description: "Architecture of capital flow through Solana, algorithmic equity, and MongoDB.",
    type: "article",
  },
};

export default function HowTheRailsConnectPage() {
  return <HowRailsConnectView />;
}
