import type { Metadata } from "next";
import { SessionProtocolView } from "@/components/session-protocol/session-protocol-view";

export const metadata: Metadata = {
  title: "Session Protocol — Consequence",
  description:
    "How royalties are calculated, how the ledger branches, algorithmic equity, and USDC settlement — the full Session Protocol for Consequence.",
  openGraph: {
    title: "Session Protocol",
    description: "Royalty calculation, ledger authority, equity formulas, and settlement rails.",
    type: "article",
  },
};

export default function SessionProtocolPage() {
  return <SessionProtocolView />;
}
