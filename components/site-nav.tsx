"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import clsx from "clsx";
import { Mark } from "./mark";
import { useScrollHideHeader } from "@/hooks/use-scroll-hide-header";

const links = [
  {
    href: "/",
    label: "Home",
    suffix: undefined as string | undefined,
    active: (p: string) => p === "/",
  },
  {
    href: "/shop",
    label: "Shop",
    suffix: "Marketplace",
    active: (p: string) => p === "/shop" || p === "/cc",
  },
  {
    href: "/treasury",
    label: "Treasury",
    suffix: "Governance",
    active: (p: string) => p === "/treasury" || p === "/software",
  },
] as const;

const BAR_TRANSITION = "background-color 350ms cubic-bezier(0.4, 0, 0.2, 1), border-color 350ms cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 350ms cubic-bezier(0.4, 0, 0.2, 1)";

export function SiteNav() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const immersiveHero =
    pathname === "/session-protocol" || pathname === "/how-the-rails-connect";
  const [onImmersiveHero, setOnImmersiveHero] = useState(immersiveHero);
  const { hidden, prefersReducedMotion, transitionStyle } = useScrollHideHeader({
    hideAfterPx: 120,
    topTolerance: 8,
  });
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    if (hidden) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
  }, [hidden]);

  useEffect(() => {
    setHash(typeof window !== "undefined" ? window.location.hash : "");
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      if (immersiveHero) {
        setOnImmersiveHero(window.scrollY < window.innerHeight * 0.5);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [immersiveHero]);

  useEffect(() => {
    setOnImmersiveHero(immersiveHero);
  }, [immersiveHero, pathname]);

  const lightOnDark = immersiveHero && onImmersiveHero && !scrolled;

  const shellMotion: CSSProperties = {
    ...transitionStyle,
    transform: hidden ? "translateY(calc(-100% - 20px))" : "translateY(0)",
    opacity: hidden ? 0 : 1,
    pointerEvents: hidden ? "none" : "auto",
    willChange: prefersReducedMotion ? undefined : "transform, opacity",
  };

  const barMotion: CSSProperties = prefersReducedMotion
    ? {}
    : { transition: BAR_TRANSITION };

  return (
    <header ref={headerRef} className="fixed top-0 inset-x-0 z-50" style={shellMotion}>
      <div
        className={clsx(
          "mx-auto max-w-[1480px] px-6 lg:px-10 h-16 flex items-center justify-between border-b transition-colors",
          scrolled
            ? "glass border-ink/[0.06]"
            : lightOnDark
              ? "bg-transparent border-snow-0/10"
              : "bg-transparent border-transparent"
        )}
        style={barMotion}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <Mark
            className={clsx(
              "w-6 h-6 transition-transform duration-700 ease-out-expo group-hover:rotate-180",
              lightOnDark ? "text-snow-0" : "text-ink"
            )}
          />
          <span
            className={clsx(
              "font-display text-[20px] leading-none tracking-tight",
              lightOnDark ? "text-snow-0" : "text-ink"
            )}
          >
            Consequence
          </span>
          <span
            className={clsx(
              "hidden md:inline-block text-[10px] tabular tracking-[0.18em] uppercase ml-2 pl-3 border-l",
              lightOnDark ? "text-snow-0/45 border-snow-0/15" : "text-ink/40 border-ink/10"
            )}
          >
            HBM & Company
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {links.map((l) => {
            const active = l.active(pathname);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "group relative px-4 py-2 rounded-full text-[13px] tracking-tight transition-colors",
                  lightOnDark
                    ? active
                      ? "text-snow-0"
                      : "text-snow-0/55 hover:text-snow-0"
                    : active
                      ? "text-ink"
                      : "text-ink/55 hover:text-ink"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{l.label}</span>
                  {l.suffix && (
                    <span
                      className={clsx(
                        "text-[9px] tabular tracking-[0.16em] uppercase",
                        lightOnDark ? "text-snow-0/35" : "text-ink/35"
                      )}
                    >
                      {l.suffix}
                    </span>
                  )}
                </span>
                {active && (
                  <span
                    className={clsx(
                      "absolute inset-0 rounded-full border",
                      lightOnDark
                        ? "bg-snow-0/[0.08] border-snow-0/15"
                        : "bg-ink/[0.04] border-ink/[0.08]"
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/signup"
            className={clsx(
              "hidden sm:inline-flex items-center gap-2 text-[12px] tracking-tight uline",
              lightOnDark ? "text-snow-0/60 hover:text-snow-0" : "text-ink/60 hover:text-ink"
            )}
          >
            Sign up
          </Link>
          <Link
            href="/login"
            className={clsx(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] tracking-tight transition-colors",
              lightOnDark
                ? "bg-snow-0 text-ink hover:bg-snow-100"
                : "bg-ink text-snow-50 hover:bg-ink/90"
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-tiff animate-breathe" />
            Client login
          </Link>
        </div>
      </div>
    </header>
  );
}
