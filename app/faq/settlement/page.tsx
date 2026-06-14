import type { Metadata } from "next";
import Link from "next/link";
import { softwareMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = softwareMetadata({
  title: "Settlement FAQ",
  description: "Frequently asked questions about USDC settlement on Consequence.software.",
  path: "/faq/settlement",
});

export default function SettlementFaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 text-ink dark:text-snow-100 min-h-[60vh] bg-white dark:bg-[#0A0A0A]">
      <h1 className="font-display text-4xl tracking-tight">Settlement FAQ</h1>
      <p className="mt-6 text-ink/70 dark:text-snow-200/80 leading-relaxed">
        Settlement always reads authoritative equity from Solana; MongoDB is a cache for product surfaces. See the
        reconciliation model for audit trails and freshness guarantees.
      </p>
      <p className="mt-8">
        <Link href="/how-the-rails-connect" className="uline">
          How the Rails Connect
        </Link>
      </p>
      <p className="mt-6">
        <Link href="/" className="text-sm uline">
          ← Back home
        </Link>
      </p>
    </div>
  );
}
