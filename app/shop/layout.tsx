import { ccMetadata } from "@/lib/seo/metadata";

export const metadata = ccMetadata({
  title: "Music Marketplace — Buy & Sell Stems, Beats & Sessions",
  description:
    "Shop stems, beats, and producer sessions on Consequence.cc — personalized For You discovery, marketplace listings, collaboration, and USDC creator wallet.",
  path: "/",
});

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
