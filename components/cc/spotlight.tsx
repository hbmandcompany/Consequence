"use client";

import { Container, Eyebrow, Pill, Section, Waveform } from "@/components/ui";
import { ArrowUpRight, Play } from "lucide-react";

const producers = [
  {
    name: "Eos Veil",
    place: "Amsterdam",
    bio: "Tape pads, long-form ambient, late-night studio twin.",
    cvs: 95,
    plays: "9.4M",
  },
  {
    name: "Sólveig Tinde",
    place: "Reykjavík",
    bio: "Brushed Rhodes, hushed harmonies, minimalist piano twin.",
    cvs: 92,
    plays: "6.8M",
  },
  {
    name: "Tomek Iłła",
    place: "Warsaw",
    bio: "Polished snare design, late-night UK garage textures.",
    cvs: 88,
    plays: "4.2M",
  },
];

export function ProducerSpotlight() {
  return (
    <Section id="studio" className="py-24 border-t border-ink/10">
      <Container>
        <div className="grid grid-cols-12 gap-y-8 gap-x-8 items-end mb-12">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow label="Studio · This Week" />
            <h2 className="font-display text-[clamp(36px,4.6vw,72px)] leading-[1.02] tracking-tight mt-6 max-w-[16ch]">
              Producers your twin keeps
              <span className="italic text-ink/80"> looping back to.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pl-8 md:border-l border-ink/10 text-[14px] text-ink/65 leading-[1.7]">
            Curated by your engagement embedding, with a small budget reserved
            for new voices. The reward model gates quality. The split engine
            settles in seconds.
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {producers.map((p, i) => (
            <ProducerCard key={p.name} p={p} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ProducerCard({
  p,
  index,
}: {
  p: (typeof producers)[number];
  index: number;
}) {
  return (
    <div className="col-span-12 md:col-span-4 group relative bg-snow-0 border border-ink/10 hover:border-ink/35 transition-colors duration-700 overflow-hidden">
      <div className="relative h-72 bg-gradient-to-b from-snow-100 to-snow-50 border-b border-ink/10 overflow-hidden">
        <Portrait index={index} />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Pill tone="gold">Atelier</Pill>
        </div>
        <button className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-snow-0 border border-ink/15 flex items-center justify-center text-ink hover:bg-ink hover:text-snow-50 transition-colors">
          <Play className="w-4 h-4 fill-current" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-display text-[28px] leading-none tracking-tight">
              {p.name}
            </div>
            <div className="text-[11px] tabular uppercase tracking-[0.18em] text-ink/45 mt-2">
              {p.place}
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-2xl leading-none tabular">{p.cvs}</div>
            <div className="text-[10px] tabular uppercase tracking-[0.18em] text-ink/45 mt-1">
              CVS
            </div>
          </div>
        </div>
        <p className="mt-5 text-[13px] text-ink/60 leading-[1.6]">{p.bio}</p>
        <div className="mt-6 pt-5 border-t border-ink/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] tabular uppercase tracking-[0.18em] text-ink/55">
            <span>{p.plays}</span>
            <span>plays · 30d</span>
          </div>
          <Waveform bars={18} className="text-ink/50" />
          <a href="#" className="inline-flex items-center gap-1 text-[12px] uline text-ink">
            Open <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Portrait({ index }: { index: number }) {
  // Abstract editorial portraits: arcs + circles, never literal faces
  const palettes = [
    { a: "#7FD4CC", b: "#0A0A0A", c: "#F8F7F3" },
    { a: "#B89968", b: "#0A0A0A", c: "#F8F7F3" },
    { a: "#0A0A0A", b: "#7FD4CC", c: "#F8F7F3" },
  ];
  const p = palettes[index % palettes.length];
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="300" fill={p.c} />
      <circle cx="280" cy="150" r="120" fill={p.a} opacity="0.85" />
      <circle cx="280" cy="150" r="60" fill={p.b} opacity="0.92" />
      <path
        d="M0 240 Q 120 200 220 240 T 400 250 L 400 300 L 0 300 Z"
        fill={p.b}
        opacity="0.08"
      />
      <line x1="0" y1="180" x2="400" y2="180" stroke={p.b} strokeOpacity="0.08" strokeWidth="0.6" />
      <line x1="200" y1="0" x2="200" y2="300" stroke={p.b} strokeOpacity="0.05" strokeWidth="0.6" />
      <text
        x="22"
        y="270"
        fontFamily="serif"
        fontStyle="italic"
        fontSize="18"
        fill={p.b}
        opacity="0.6"
      >
        Atelier {String(index + 1).padStart(2, "0")}
      </text>
    </svg>
  );
}
