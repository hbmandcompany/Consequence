import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Platform docs — Consequence",
  description: "Consequence platform documentation.",
};

export default function DocsPlatformPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 text-ink dark:text-snow-100 min-h-[60vh] bg-white dark:bg-[#0A0A0A]">
      <h1 className="font-display text-4xl tracking-tight">Platform documentation</h1>
      <p className="mt-6 text-ink/70 dark:text-snow-200/80 leading-relaxed">
        Extended platform reference is being published with the next release. For the settlement and equity architecture,
        start with{" "}
        <Link href="/how-the-rails-connect" className="uline">
          How the Rails Connect
        </Link>
        .
      </p>
      <p className="mt-8">
        <Link href="/" className="text-sm uline">
          ← Back home
        </Link>
      </p>
    </div>
  );
}
