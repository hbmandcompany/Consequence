"use client";

import { Container, Eyebrow, Pill, Section, Waveform } from "@/components/ui";
import { Headphones, Heart, Plus, Play, Sparkles, Users } from "lucide-react";
import clsx from "clsx";

const tiles = [
  {
    kind: "session",
    title: "Velvet Room — V12",
    sub: "Resume from bar 47 · 02:14 left to mix",
    bpm: 92,
    key: "D♭ minor",
    tag: "Continue",
    tagTone: "tiff" as const,
    score: 0.94,
    meta: "Last touched 3h ago · Margot · Iso",
  },
  {
    kind: "release",
    title: "Halls of Linen",
    sub: "Eos Veil — out tonight in your network",
    bpm: 84,
    key: "F♯ major",
    tag: "First listen",
    tagTone: "gold" as const,
    score: 0.88,
    meta: "Two friends added it to a private mix",
  },
  {
    kind: "stem",
    title: "Brushed Rhodes — 14 stems",
    sub: "From the Antwerp pack you saved",
    bpm: 96,
    key: "A minor",
    tag: "Marketplace",
    tagTone: "ink" as const,
    score: 0.81,
    meta: "Twin match · 0.94 · €38 / pack",
  },
  {
    kind: "collab",
    title: "Lou Marsden wants in",
    sub: "On Velvet Room — adding a vocal sketch",
    bpm: 92,
    key: "D♭ minor",
    tag: "Collab",
    tagTone: "tiff" as const,
    score: 0.91,
    meta: "Split proposal · 60 / 30 / 10",
  },
  {
    kind: "forecast",
    title: "If released Friday → 9.2k plays / 7d",
    sub: "Monte Carlo · Velvet Room — V11 mix",
    bpm: 92,
    key: "D♭ minor",
    tag: "Forecast",
    tagTone: "ghost" as const,
    score: 0.86,
    meta: "10,000 scenarios · σ ±1.4k · 22 CPU-min",
  },
  {
    kind: "drill",
    title: "Reward model says: tighten the bridge",
    sub: "Quality model agrees on bars 33–48",
    bpm: 92,
    key: "D♭ minor",
    tag: "Note",
    tagTone: "ghost" as const,
    score: 0.78,
    meta: "Composition twin updated · 4m ago",
  },
];

export function ForYouFeed() {
  return (
    <Section id="feed" className="py-16 border-t border-ink/10 scroll-mt-28">
      <Container>
        <div className="flex items-end justify-between gap-8 mb-10">
          <div>
            <Eyebrow label="For You · Tonight" />
            <h2 className="font-display text-[clamp(28px,3vw,44px)] leading-[1.05] tracking-tight mt-4 max-w-[18ch]">
              Six things the engine pulled forward for you.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] tabular uppercase tracking-[0.2em] text-ink/45">
            <span>Refreshed 14s ago</span>
            <span className="w-1 h-1 rounded-full bg-ink/30" />
            <span>Twin v · 1,204</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {tiles.map((t, i) => (
            <FeedCard key={i} t={t} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FeedCard({
  t,
  index,
}: {
  t: (typeof tilesType)[number];
  index: number;
}) {
  const span =
    index === 0 ? "md:col-span-7" : index === 1 ? "md:col-span-5" : "md:col-span-4";
  const isHero = index === 0;
  return (
    <div
      className={clsx(
        "col-span-12 group relative bg-snow-0 border border-ink/10 hover:border-ink/35 transition-colors duration-700 ease-out-expo overflow-hidden",
        span
      )}
    >
      {isHero ? <HeroCardArt /> : <SmallCardArt index={index} />}

      <div className="relative p-6 lg:p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pill tone={t.tagTone}>{t.tag}</Pill>
            <span className="text-[10px] tabular uppercase tracking-[0.18em] text-ink/40">
              match · {Math.round(t.score * 100)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <IconBtn>
              <Heart className="w-3.5 h-3.5" />
            </IconBtn>
            <IconBtn>
              <Plus className="w-3.5 h-3.5" />
            </IconBtn>
            <IconBtn primary>
              <Play className="w-3.5 h-3.5 fill-current" />
            </IconBtn>
          </div>
        </div>

        <h3
          className={clsx(
            "font-display tracking-tight mt-4",
            isHero
              ? "text-[clamp(28px,3.4vw,48px)] leading-[1.05]"
              : "text-[clamp(20px,2vw,28px)] leading-[1.1]"
          )}
        >
          {t.title}
        </h3>
        <p className="text-[13px] text-ink/60 mt-2">{t.sub}</p>

        <div className="mt-5 flex items-center gap-2 text-[10px] tabular uppercase tracking-[0.16em] text-ink/45">
          <span>{t.bpm} BPM</span>
          <span className="w-1 h-1 rounded-full bg-ink/20" />
          <span>{t.key}</span>
          <span className="w-1 h-1 rounded-full bg-ink/20" />
          <span className="truncate">{t.meta}</span>
        </div>

        <div className="mt-5 pt-5 border-t border-ink/10 flex items-center justify-between text-ink/65">
          <Waveform bars={isHero ? 44 : 24} className="text-ink/55" />
          <span className="text-[10px] tabular uppercase tracking-[0.16em] text-ink/45">
            03:42
          </span>
        </div>
      </div>
    </div>
  );
}

const tilesType = tiles;

function IconBtn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <button
      className={clsx(
        "w-7 h-7 rounded-full inline-flex items-center justify-center transition-colors",
        primary
          ? "bg-ink text-snow-50 hover:bg-ink/85"
          : "bg-snow-100 text-ink/70 hover:bg-snow-200"
      )}
    >
      {children}
    </button>
  );
}

function HeroCardArt() {
  return (
    <div className="relative h-56 md:h-72 bg-gradient-to-br from-tiff-100 via-snow-100 to-snow-50 overflow-hidden border-b border-ink/10">
      <div className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 30%, rgba(127,212,204,0.6), transparent 55%), radial-gradient(circle at 20% 80%, rgba(184,153,104,0.25), transparent 60%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 280" preserveAspectRatio="none">
        {Array.from({ length: 80 }).map((_, i) => {
          const h = 30 + Math.abs(Math.sin(i * 0.42)) * 130 + Math.abs(Math.cos(i * 0.21)) * 60;
          return (
            <rect
              key={i}
              x={i * 7.5 + 6}
              y={140 - h / 2}
              width="2.4"
              height={h}
              rx="1.2"
              fill="#0A0A0A"
              opacity={0.18 + (i % 5) * 0.05}
            />
          );
        })}
      </svg>
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-ink/55" />
        <span className="text-[10px] tabular uppercase tracking-[0.2em] text-ink/55">
          Resumed by your twin · 03:14 a.m.
        </span>
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px] tabular uppercase tracking-[0.18em] text-ink/55">
        <Users className="w-3 h-3" />
        2 collaborators
      </div>
    </div>
  );
}

function SmallCardArt({ index }: { index: number }) {
  // Each tile gets its own subtle abstract treatment
  const variants = [
    "bg-gradient-to-br from-snow-100 via-snow-50 to-tiff-50",
    "bg-gradient-to-tr from-[#F6EFE2] via-snow-50 to-snow-100",
    "bg-gradient-to-bl from-snow-100 via-snow-50 to-snow-200",
    "bg-gradient-to-br from-snow-50 via-snow-100 to-tiff-50",
    "bg-gradient-to-tl from-snow-100 via-snow-50 to-[#F6EFE2]",
  ];
  return (
    <div
      className={clsx(
        "relative h-36 md:h-40 overflow-hidden border-b border-ink/10",
        variants[index % variants.length]
      )}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
        {Array.from({ length: 28 }).map((_, j) => (
          <circle
            key={j}
            cx={(j * 32 + index * 9) % 620}
            cy={100 + Math.sin(j * 0.7 + index) * 45}
            r={1 + (j % 4) * 0.6}
            fill="#0A0A0A"
            opacity={0.22}
          />
        ))}
        <line x1="0" y1="100" x2="600" y2="100" stroke="#0A0A0A" strokeOpacity="0.08" strokeWidth="0.5" />
      </svg>
      <Headphones className="absolute top-3 right-3 w-3.5 h-3.5 text-ink/35" />
    </div>
  );
}
