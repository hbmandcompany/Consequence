const STACK = ["Apple", "Windows", "Circle", "Internet", "Coinbase"] as const;

/** Infinite L-to-R style strip (content moves left); decorative. */
export function PartnerStackMarquee() {
  const triple = [...STACK, ...STACK, ...STACK];
  return (
    <div
      className="w-full overflow-hidden fade-x-mask opacity-90"
      aria-label="Technology and platform context: Apple, Windows, Circle, open web, Coinbase"
    >
      <div className="flex w-max flex-nowrap items-baseline gap-x-12 md:gap-x-16 lg:gap-x-20 ticker-marquee py-1">
        {triple.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display text-[clamp(20px,3.2vw,34px)] tracking-tight text-ink/22 whitespace-nowrap"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
