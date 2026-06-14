import { softwareMetadata } from "@/lib/seo/metadata";

export const metadata = softwareMetadata({
  title: "Treasury",
  description:
    "Consequence.software Treasury — royalty ledger, settlement rails, and governance for creators and labels.",
  path: "/treasury",
});

export default function TreasuryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
