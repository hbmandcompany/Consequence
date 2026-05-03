"use client";

import { Container, Eyebrow, Pill, Section, Waveform } from "@/components/ui";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";

const cats = ["Stems", "Sessions", "Compositions", "Loops", "Vocals", "MIDI"];

const listings = [
  {
    t: "Antwerp Brushed Rhodes",
    a: "by Sólveig Tinde",
    p: "€38",
    bpm: 96,
    k: "A m",
    cvs: 92,
    n: "14 stems · WAV · 24/96",
  },
  {
    t: "Linnen Vocal Pack",
    a: "by Lou Marsden",
    p: "€72",
    bpm: 84,
    k: "F♯ M",
    cvs: 88,
    n: "21 takes · dry + wet",
  },
  {
    t: "Velvet Subs Vol. 2",
    a: "by Eos Veil",
    p: "€48",
    bpm: 92,
    k: "D♭ m",
    cvs: 95,
    n: "10 stems · 808 + sine",
  },
  {
    t: "Quiet Hours — Composition",
    a: "by Margot",
    p: "€220",
    bpm: 78,
    k: "C M",
    cvs: 90,
    n: "Full session · MIDI + stems",
  },
  {
    t: "Pol. Late Snare Library",
    a: "by Tomek Iłła",
    p: "€26",
    bpm: 0,
    k: "—",
    cvs: 84,
    n: "62 one-shots · 24-bit",
  },
  {
    t: "Amsterdam Tape Pads",
    a: "by Studio NV9",
    p: "€54",
    bpm: 0,
    k: "—",
    cvs: 89,
    n: "18 long-form · stereo",
  },
];

export function Marketplace() {
  return (
    <Section id="market" className="py-20 border-t border-ink/10">
      <Container>
        <div className="flex items-end justify-between gap-8 mb-10">
          <div>
            <Eyebrow label="Marketplace · consequence.cc" />
            <h2 className="font-display text-[clamp(28px,3vw,44px)] leading-[1.05] tracking-tight mt-4 max-w-[20ch]">
              Sourced from your network. Priced by the room.
            </h2>
          </div>
          <a href="#" className="text-[12px] uline tabular uppercase tracking-[0.18em] text-ink/65">
            Open the floor →
          </a>
        </div>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto fade-x-mask -mx-2 px-2 pb-1">
          <CategoryChip active>All</CategoryChip>
          {cats.map((c) => (
            <CategoryChip key={c}>{c}</CategoryChip>
          ))}
          <span className="ml-auto hidden md:inline-flex items-center gap-2 text-[10px] tabular uppercase tracking-[0.18em] text-ink/45">
            <span className="w-1.5 h-1.5 rounded-full bg-tiff" />
            Demand index +12% (24h)
          </span>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {listings.map((l, i) => (
            <ListingCard key={i} l={l} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CategoryChip({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={clsx(
        "shrink-0 px-3.5 py-1.5 rounded-full text-[12px] tracking-tight border transition-colors",
        active
          ? "bg-ink text-snow-50 border-ink"
          : "bg-snow-0 text-ink/65 border-ink/15 hover:border-ink/40"
      )}
    >
      {children}
    </button>
  );
}

function ListingCard({
  l,
  index,
}: {
  l: (typeof listings)[number];
  index: number;
}) {
  const palettes = [
    "from-snow-100 to-tiff-50",
    "from-[#F6EFE2] to-snow-50",
    "from-tiff-50 to-snow-100",
    "from-snow-200 to-snow-50",
    "from-snow-100 to-[#F6EFE2]",
    "from-tiff-100 to-snow-50",
  ];
  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-4 group relative bg-snow-0 border border-ink/10 hover:border-ink/35 transition-colors duration-700 overflow-hidden">
      <div className={clsx("relative h-44 bg-gradient-to-br border-b border-ink/10", palettes[index % palettes.length])}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 180" preserveAspectRatio="none">
          {Array.from({ length: 60 }).map((_, j) => {
            const h = 20 + Math.abs(Math.sin(j * 0.5 + index)) * 110;
            return (
              <rect
                key={j}
                x={j * 6.5 + 6}
                y={90 - h / 2}
                width="2"
                height={h}
                rx="1"
                fill="#0A0A0A"
                opacity={0.16 + (j % 5) * 0.04}
              />
            );
          })}
        </svg>
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-[10px] tabular uppercase tracking-[0.18em] text-ink/55">
            CVS
          </span>
          <span className="font-display text-lg leading-none tabular">{l.cvs}</span>
        </div>
        <div className="absolute top-3 right-3">
          <Pill tone="ghost">Verified</Pill>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-display text-[22px] leading-[1.1] tracking-tight">
              {l.t}
            </div>
            <div className="text-[12px] text-ink/55 mt-1">{l.a}</div>
          </div>
          <div className="text-right">
            <div className="font-display text-[22px] leading-none tabular">{l.p}</div>
            <div className="text-[10px] tabular uppercase tracking-[0.18em] text-ink/40 mt-1">
              USDC
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[10px] tabular uppercase tracking-[0.16em] text-ink/45">
          {l.bpm > 0 && <span>{l.bpm} BPM</span>}
          {l.bpm > 0 && <span className="w-1 h-1 rounded-full bg-ink/20" />}
          <span>{l.k}</span>
          <span className="w-1 h-1 rounded-full bg-ink/20" />
          <span className="truncate">{l.n}</span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <Waveform bars={20} className="text-ink/50" />
          <button className="inline-flex items-center gap-1 text-[12px] uline text-ink">
            Audition
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
