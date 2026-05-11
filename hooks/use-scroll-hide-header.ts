"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const DEFAULT_HIDE_AFTER_PX = 120;
const DEFAULT_TOP_TOLERANCE = 8;
const SCROLL_DELTA_MIN = 3;
/** ms — synchronized fade + translate */
const TRANSITION_MS = 350;
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

export type UseScrollHideHeaderOptions = {
  /** Scroll distance from top before hide-on-scroll-down can engage */
  hideAfterPx?: number;
  /** Treat as “at top” while scrollY ≤ this value */
  topTolerance?: number;
};

export type UseScrollHideHeaderResult = {
  /** True when header should be off-screen / inert */
  hidden: boolean;
  prefersReducedMotion: boolean;
  transitionStyle: CSSProperties;
};

export function useScrollHideHeader(
  options: UseScrollHideHeaderOptions = {}
): UseScrollHideHeaderResult {
  const hideAfterPx = options.hideAfterPx ?? DEFAULT_HIDE_AFTER_PX;
  const topTolerance = options.topTolerance ?? DEFAULT_TOP_TOLERANCE;

  const [hidden, setHidden] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => setPrefersReducedMotion(mq.matches);
    onMotionChange();
    mq.addEventListener("change", onMotionChange);
    return () => mq.removeEventListener("change", onMotionChange);
  }, []);

  useEffect(() => {
    lastScrollY.current = typeof window !== "undefined" ? window.scrollY : 0;

    const flush = () => {
      rafId.current = null;
      const y = window.scrollY;
      const doc = document.documentElement;
      const shortPage = doc.scrollHeight <= window.innerHeight + 2;

      if (shortPage) {
        setHidden(false);
        lastScrollY.current = y;
        return;
      }

      if (y <= topTolerance) {
        setHidden(false);
        lastScrollY.current = y;
        return;
      }

      const delta = y - lastScrollY.current;
      lastScrollY.current = y;

      if (Math.abs(delta) < SCROLL_DELTA_MIN) return;

      if (delta > 0 && y > hideAfterPx) setHidden(true);
      else if (delta < 0) setHidden(false);
    };

    const onScroll = () => {
      if (rafId.current != null) return;
      rafId.current = window.requestAnimationFrame(flush);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Restore scroll position (e.g. bfcache): start in correct state
    if (window.scrollY > hideAfterPx) setHidden(true);
    lastScrollY.current = window.scrollY;
    flush();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current != null) window.cancelAnimationFrame(rafId.current);
    };
  }, [hideAfterPx, topTolerance]);

  const transitionStyle: CSSProperties = prefersReducedMotion
    ? { transition: "none" }
    : {
        transition: `opacity ${TRANSITION_MS}ms ${EASING}, transform ${TRANSITION_MS}ms ${EASING}`,
      };

  return { hidden, prefersReducedMotion, transitionStyle };
}

export const scrollHideHeaderTransitionMs = TRANSITION_MS;
export const scrollHideHeaderEasing = EASING;
