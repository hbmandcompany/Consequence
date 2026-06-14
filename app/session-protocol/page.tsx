import type { Metadata } from "next";
import { SessionProtocolView } from "@/components/session-protocol/session-protocol-view";
import { softwareMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = softwareMetadata({
  title: "Session Protocol",
  description:
    "Consequence.software Session Protocol — royalty calculation, ledger authority, algorithmic equity, and USDC settlement.",
  path: "/session-protocol",
  openGraph: {
    type: "article",
    title: "Session Protocol · Consequence.software",
    description: "Royalty calculation, ledger authority, equity formulas, and settlement rails.",
  },
});

export default function SessionProtocolPage() {
  return <SessionProtocolView />;
}
