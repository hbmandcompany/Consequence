import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs — Consequence",
  description: "Consequence documentation index.",
};

export default function DocsIndexPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 text-ink dark:text-snow-100 min-h-[60vh] bg-white dark:bg-[#0A0A0A]">
      <h1 className="font-display text-4xl tracking-tight">Documentation</h1>
      <ul className="mt-8 space-y-4 text-ink/75 dark:text-snow-200/85">
        <li>
          <Link href="/how-the-rails-connect" className="uline font-medium">
            How the Rails Connect
          </Link>
          <span className="block text-sm mt-1 opacity-70">Equity, Solana, MongoDB, settlement.</span>
        </li>
        <li>
          <Link href="/docs/platform" className="uline font-medium">
            Platform documentation
          </Link>
        </li>
      </ul>
      <p className="mt-10">
        <Link href="/" className="text-sm uline">
          ← Back home
        </Link>
      </p>
    </div>
  );
}
