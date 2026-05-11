"use client";

import clsx from "clsx";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={clsx("relative", className)}>
      {children}
    </section>
  );
}

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={clsx("mx-auto max-w-[1480px] px-6 lg:px-10", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({
  index,
  label,
  accent = "tiff",
}: {
  index?: string;
  label: string;
  accent?: "tiff" | "gold" | "ink";
}) {
  const dot =
    accent === "tiff"
      ? "bg-tiff"
      : accent === "gold"
      ? "bg-gold"
      : "bg-ink";
  return (
    <div className="flex items-center gap-3 text-[10px] tabular uppercase tracking-[0.22em] text-ink/55">
      {index && (
        <span className="text-ink/40 mr-2">{index}</span>
      )}
      <span className={clsx("inline-block w-1.5 h-1.5 rounded-full", dot)} />
      <span>{label}</span>
    </div>
  );
}

export function Display({
  children,
  className,
  as: As = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <As
      className={clsx(
        "font-display tracking-tightest-2 leading-[0.95] text-ink",
        "text-[clamp(40px,7.4vw,128px)]",
        className
      )}
    >
      {children}
    </As>
  );
}

export function Lede({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        "text-ink/70 text-[clamp(16px,1.4vw,21px)] leading-[1.55] max-w-[58ch]",
        className
      )}
    >
      {children}
    </p>
  );
}

export function HairlineRow({
  left,
  right,
  className,
}: {
  left: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("flex items-center justify-between py-5 border-t border-ink/10", className)}>
      <div className="text-[13px] text-ink/85">{left}</div>
      {right && <div className="text-[12px] text-ink/55 tabular">{right}</div>}
    </div>
  );
}

export function Pill({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: "ink" | "tiff" | "gold" | "ghost";
}) {
  const cls =
    tone === "tiff"
      ? "bg-tiff-100 text-tiff-700 border-tiff-200"
      : tone === "gold"
      ? "bg-[#F6EFE2] text-gold-dark border-[#E8DBC4]"
      : tone === "ghost"
      ? "bg-transparent text-ink/60 border-ink/15"
      : "bg-ink text-snow-50 border-ink";
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] tabular uppercase tracking-[0.16em]",
        cls
      )}
    >
      {children}
    </span>
  );
}

export function Parallax({
  children,
  amount = 60,
  className,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion() === true;
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -24px 0px" }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.9,
        delay: reduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Waveform({
  bars = 28,
  className,
  active = true,
}: {
  bars?: number;
  className?: string;
  active?: boolean;
}) {
  const heights = Array.from({ length: bars }, (_, i) => {
    const t = i / bars;
    return 0.25 + Math.abs(Math.sin(t * Math.PI * 3 + 0.6)) * 0.75;
  });
  return (
    <div className={clsx("flex items-center gap-[3px] h-8", className)}>
      {heights.map((h, i) => (
        <span
          key={i}
          className={clsx("bar", active && "animate-wave")}
          style={{
            height: `${Math.round(h * 100)}%`,
            animationDelay: `${(i % 8) * 90}ms`,
            animationPlayState: active ? "running" : "paused",
          }}
        />
      ))}
    </div>
  );
}

export function NumberStat({
  value,
  unit,
  label,
}: {
  value: string;
  unit?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <div className="font-display text-[clamp(48px,7vw,96px)] leading-none tracking-tightest-2 tabular">
          {value}
        </div>
        {unit && (
          <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">
            {unit}
          </div>
        )}
      </div>
      <div className="text-[12px] text-ink/55 max-w-[28ch]">{label}</div>
    </div>
  );
}
