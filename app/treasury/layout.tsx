import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treasury — Consequence",
  description:
    "The Reserve, royalty ledger, inference, simulation, and creative ledger on Consequence.",
};

export default function TreasuryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
