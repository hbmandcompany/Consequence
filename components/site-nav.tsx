"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Mark } from "./mark";

const links = [
  { href: "/", label: "Home", suffix: undefined as string | undefined, active: (p: string, h: string) => p === "/" && h !== "#software" },
  { href: "/cc", label: "Trending", suffix: "For You", active: (p: string) => p === "/cc" },
  { href: "/#software", label: "WorkSpace", suffix: "Engine", active: (p: string, h: string) => p === "/" && h === "#software" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setHash(typeof window !== "undefined" ? window.location.hash : "");
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out-expo",
        scrolled
          ? "glass border-b border-ink/[0.06]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-[1480px] px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Mark className="w-6 h-6 text-ink transition-transform duration-700 ease-out-expo group-hover:rotate-180" />
          <span className="font-display text-[20px] leading-none tracking-tight">
            Consequence
          </span>
          <span className="hidden md:inline-block text-[10px] tabular tracking-[0.18em] uppercase text-ink/40 ml-2 pl-3 border-l border-ink/10">
            HBM & Company
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = l.active(pathname, hash);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "group relative px-4 py-2 rounded-full text-[13px] tracking-tight transition-colors",
                  active ? "text-ink" : "text-ink/55 hover:text-ink"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{l.label}</span>
                  {l.suffix && (
                    <span className="text-[9px] tabular tracking-[0.16em] uppercase text-ink/35">
                      {l.suffix}
                    </span>
                  )}
                </span>
                {active && (
                  <span className="absolute inset-0 rounded-full bg-ink/[0.04] border border-ink/[0.08]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cc"
            className="hidden sm:inline-flex items-center gap-2 text-[12px] tracking-tight text-ink/60 hover:text-ink uline"
          >
            Sign in
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-snow-50 text-[12px] tracking-tight hover:bg-ink/90 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-tiff animate-breathe" />
            Request access
          </Link>
        </div>
      </div>
    </header>
  );
}
