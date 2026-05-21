"use client";

/**
 * Studio session — FaceTime-style spotlight + Meet-style controls (HTML/CSS only).
 * Card grid and shared bar are static; optional ambient glow parallax on the shell only.
 */

import {
  Captions,
  Hand,
  Mic,
  MicOff,
  MonitorUp,
  PhoneOff,
  Users,
  Video,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Participant = {
  initials: string;
  name: string;
  role: string;
  tint: string;
  speaking?: boolean;
  muted?: boolean;
};

const participants: Participant[] = [
  {
    initials: "MI",
    name: "Margot · Iso",
    role: "Lead · Velvet Clip",
    tint: "from-[#2a2c2e] via-[#1e1f21] to-[#141516]",
    speaking: true,
  },
  {
    initials: "LM",
    name: "Lou Marsden",
    role: "Vocal sketch",
    tint: "from-[#2d4a4a] via-[#1f3538] to-[#162428]",
    muted: true,
  },
  {
    initials: "EV",
    name: "Eos Veil",
    role: "Arrangement",
    tint: "from-[#3d3a52] via-[#2a2838] to-[#1c1a26]",
  },
  {
    initials: "TW",
    name: "@twin",
    role: "Forecast · live",
    tint: "from-[#353028] via-[#2a2520] to-[#1a1814]",
  },
];

function VideoTile({
  p,
  large,
}: {
  p: Participant;
  large?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${p.tint} ${
        large
          ? "h-full min-h-[200px] rounded-2xl ring-2 ring-[#1e8e3e] ring-offset-2 ring-offset-[#1c1c1e]"
          : "aspect-[4/3] rounded-xl ring-1 ring-white/12"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div
        className={`absolute flex items-center justify-center rounded-full bg-white/10 font-semibold uppercase text-white/90 ring-1 ring-white/20 ${
          large
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 text-2xl"
            : "bottom-8 right-2 h-8 w-8 text-[10px]"
        }`}
      >
        {p.initials}
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 pt-8">
        <p className={`font-medium text-white/95 truncate ${large ? "text-sm" : "text-[10px]"}`}>
          {p.name}
        </p>
        <p className={`text-white/50 truncate ${large ? "text-xs mt-0.5" : "text-[9px]"}`}>
          {p.role}
        </p>
      </div>
      {p.muted && (
        <span className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white/90">
          <MicOff className="h-3 w-3" strokeWidth={2} />
        </span>
      )}
      {p.speaking && large && (
        <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/45 px-2 py-0.5 text-[9px] text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1e8e3e] animate-pulse" />
          Speaking
        </span>
      )}
    </div>
  );
}

function ControlButton({
  icon,
  label,
  highlight,
  danger,
}: {
  icon: ReactNode;
  label: string;
  highlight?: boolean;
  danger?: boolean;
}) {
  if (danger) {
    return (
      <button
        type="button"
        aria-label={label}
        className="ml-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff453a] text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]"
      >
        {icon}
      </button>
    );
  }
  return (
    <button
      type="button"
      aria-label={label}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors ${
        highlight
          ? "bg-white/18 text-white ring-1 ring-white/25"
          : "text-white/70 hover:bg-white/10"
      }`}
    >
      {icon}
    </button>
  );
}

export function CollaborationSessionIllustration() {
  const [lead, ...sidebar] = participants;
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        className="pointer-events-none absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-tiff/20 via-transparent to-gold/10 blur-2xl opacity-70"
        style={reduceMotion ? undefined : { y: glowY }}
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-[#1c1c1e] text-white shadow-[0_20px_56px_-14px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
        <header className="flex items-center justify-between gap-3 border-b border-white/[0.08] bg-[#2c2c2e]/90 px-4 py-2.5 backdrop-blur-sm">
          <div className="flex min-w-0 items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/35 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-[#30d158]" />
            </span>
            <span className="truncate text-[13px] font-medium tracking-tight">
              Velvet Clip · Studio session
            </span>
          </div>
          <span className="shrink-0 text-[11px] tabular text-white/45">9:41 · 4 in room</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,34%)] gap-2 p-2.5 md:p-3 min-h-[240px]">
          <div className="min-h-[200px] md:min-h-0">
            <VideoTile p={lead} large />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-2">
            {sidebar.map((p) => (
              <VideoTile key={p.initials} p={p} />
            ))}
          </div>
        </div>

        <div className="mx-3 mb-2 flex items-center gap-2 rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2 text-[10px] text-white/55">
          <MonitorUp className="h-3.5 w-3.5 shrink-0 text-tiff-300/80" strokeWidth={1.5} />
          <span className="truncate">
            Shared: piano roll · stem S‑12 · split proposal 60 / 30 / 10 under review
          </span>
        </div>

        <footer className="flex flex-wrap items-center justify-center gap-1.5 border-t border-white/[0.06] bg-[#2d2e30] px-3 py-3">
          <ControlButton label="Mute" icon={<Mic className="h-5 w-5" />} highlight />
          <ControlButton label="Video" icon={<Video className="h-5 w-5" />} />
          <ControlButton label="Share screen" icon={<MonitorUp className="h-5 w-5" />} />
          <ControlButton label="Captions" icon={<Captions className="h-5 w-5" />} />
          <ControlButton label="Raise hand" icon={<Hand className="h-5 w-5" />} />
          <ControlButton label="Participants" icon={<Users className="h-5 w-5" />} />
          <ControlButton label="Leave" icon={<PhoneOff className="h-5 w-5" strokeWidth={2} />} danger />
        </footer>
      </div>
    </div>
  );
}
