import { ccMetadata } from "@/lib/seo/metadata";

export const metadata = ccMetadata({
  title: "Marketplace",
  description:
    "Consequence.cc — personalized feed, stems, sessions, producer spotlight, and USDC wallet. Sourced from your network.",
  path: "/",
});

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
