import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — Consequence",
  description:
    "Immersive producer shop — feed, marketplace, sessions, and wallet on Consequence.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
