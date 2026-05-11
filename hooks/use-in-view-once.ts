"use client";

import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

export type UseInViewOnceResult<E extends Element = HTMLElement> = {
  ref: React.RefObject<E | null>;
  active: boolean;
};

/**
 * Fires once when the element intersects the viewport. Respects reduced motion by starting active.
 */
export function useInViewOnce<E extends Element = HTMLElement>(
  threshold = 0.12,
  rootMargin = "0px 0px -8% 0px"
): UseInViewOnceResult<E> {
  const ref = useRef<E | null>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduced) {
      setActive(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          ob.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [reduced, threshold, rootMargin]);

  return { ref: ref as RefObject<E | null>, active: reduced || active };
}
