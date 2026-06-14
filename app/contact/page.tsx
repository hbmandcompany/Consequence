import type { Metadata } from "next";
import Link from "next/link";
import { softwareMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = softwareMetadata({
  title: "Contact",
  description: "Request early access to Consequence.software.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 text-ink dark:text-snow-100 min-h-[60vh] bg-white dark:bg-[#0A0A0A]">
      <h1 className="font-display text-4xl tracking-tight">Request early access</h1>
      <p className="mt-6 text-ink/70 dark:text-snow-200/80 leading-relaxed">
        Reach the team from the home page contact section, or continue exploring the technical architecture while we route
        your request.
      </p>
      <p className="mt-8">
        <Link href="/#contact" className="uline">
          Contact on home →
        </Link>
      </p>
      <p className="mt-4">
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
