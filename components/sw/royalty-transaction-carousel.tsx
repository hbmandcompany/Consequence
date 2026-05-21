"use client";

import { useCallback, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { royaltyFlow, RoyaltyTxRow } from "@/components/sw/royalty-transaction";

export function RoyaltyTransactionCarousel({
  compact,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const total = royaltyFlow.length;
  const step = royaltyFlow[index];

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + total) % total);
    },
    [total]
  );

  return (
    <div
      className={clsx(
        "bg-snow-0 border border-ink/10 min-w-0 h-full flex flex-col",
        compact ? "p-5 lg:p-6" : "p-7 lg:p-8",
        className
      )}
    >
      <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">
        Royalty transaction
      </div>

      <p
        className={clsx(
          "leading-[1.55] text-ink/60",
          compact ? "mt-1.5 text-[10px]" : "mt-2 text-[11px]"
        )}
      >
        End-to-end trace from purchase to settlement — step through the bus, twins, chain, and payout legs.
      </p>

      <div className={clsx("border border-ink/10 flex-1 flex flex-col min-h-0", compact ? "mt-3" : "mt-5")}>
        <div className="flex items-stretch">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex w-10 shrink-0 items-center justify-center border-r border-ink/10 text-ink/40 hover:text-ink hover:bg-snow-100 transition-colors"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>

          <div
            className={clsx(
              "relative flex-1 overflow-hidden bg-snow-0 min-h-0",
              compact ? "min-h-[10rem]" : "h-[16rem]"
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden px-4 py-4"
              >
                <div className="w-full">
                  <RoyaltyTxRow {...step} carousel />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            className="flex w-10 shrink-0 items-center justify-center border-l border-ink/10 text-ink/40 hover:text-ink hover:bg-snow-100 transition-colors"
            aria-label="Next step"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 border-t border-ink/10 px-4 py-3 bg-snow-100/60">
          {royaltyFlow.map((row, i) => (
            <button
              key={row.n}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to step ${row.n}: ${row.t}`}
              aria-current={i === index ? "step" : undefined}
              className={clsx(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-5 bg-ink" : "w-1.5 bg-ink/20 hover:bg-ink/40"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
