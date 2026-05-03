/**
 * Google Meet–style video grid mock — HTML/CSS + SVG only, no raster assets.
 */

import {
  Captions,
  Hand,
  Info,
  Mic,
  MicOff,
  MonitorUp,
  MoreVertical,
  PhoneOff,
  Square,
  Users,
  Video,
} from "lucide-react";
import type { ReactNode } from "react";

type Tile = {
  initials: string;
  label: string;
  tint: "slate" | "teal" | "violet" | "amber";
  activeSpeaker?: boolean;
  muted?: boolean;
};

const tiles: Tile[] = [
  { initials: "MR", label: "M. Reyes · Risk", tint: "slate", activeSpeaker: true },
  { initials: "AK", label: "A. Kim · Treasury", tint: "teal", muted: true },
  { initials: "You", label: "You (internal)", tint: "violet" },
  { initials: "TP", label: "T. Patel · Partner", tint: "amber", muted: true },
];

const tintClass: Record<Tile["tint"], string> = {
  slate: "from-[#3c4043] via-[#2a2c2e] to-[#1e1f21]",
  teal: "from-[#2d4a4a] via-[#1f3538] to-[#162428]",
  violet: "from-[#3d3a52] via-[#2a2838] to-[#1c1a26]",
  amber: "from-[#4a4034] via-[#353028] to-[#252018]",
};

export function InferenceMeetIllustration() {
  return (
    <div className="overflow-hidden rounded-xl border border-ink/10 bg-[#202124] text-[11px] text-white/90 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.35)] antialiased ring-1 ring-black/20">
      {/* Top chrome — Meet-style title strip */}
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] px-3 py-2 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1e8e3e]" />
          </span>
          <span className="truncate font-medium tracking-tight text-white/95">
            Treasury & ledger review — Inference
          </span>
        </div>
        <div className="flex items-center gap-3 text-white/50">
          <span className="tabular-nums tracking-tight">9:41 AM · live</span>
          <button
            type="button"
            className="rounded-full p-1.5 text-white/55 transition-colors hover:bg-white/[0.08]"
            aria-label="Meeting details"
          >
            <Info className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </header>

      {/* Video grid */}
      <div className="grid grid-cols-2 gap-2 p-2.5 sm:gap-2.5 sm:p-3 md:grid-cols-4">
        {tiles.map((t) => (
          <div
            key={t.label}
            className={`relative aspect-[4/3] overflow-hidden rounded-[10px] bg-gradient-to-br ${tintClass[t.tint]} ${
              t.activeSpeaker
                ? "ring-2 ring-[#1e8e3e] ring-offset-2 ring-offset-[#202124]"
                : "ring-1 ring-white/[0.12]"
            }`}
          >
            {/* Subtle “camera noise” */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-1 px-2 pb-1.5 pt-6">
              <span className="max-w-[70%] truncate font-medium tracking-tight text-white/95 drop-shadow-sm text-[10px] sm:text-[11px]">
                {t.label}
              </span>
              <div className="flex shrink-0 items-center gap-1">
                {t.muted ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/45 text-white/90 ring-1 ring-white/10">
                    <MicOff className="h-3 w-3" strokeWidth={2} />
                  </span>
                ) : null}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/35 text-[10px] font-semibold tabular-nums uppercase tracking-wide text-white/95 ring-1 ring-white/15">
                  {t.initials}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom control bar — Meet layout */}
      <footer className="flex flex-wrap items-center justify-center gap-1.5 border-t border-white/[0.06] bg-[#2d2e30] px-2 py-2.5 sm:gap-2 sm:px-4">
        <MeetBarButton label="Mute" icon={<Mic className="h-5 w-5" />} active />
        <MeetBarButton label="Stop video" icon={<Video className="h-5 w-5" />} />
        <MeetBarButton label="Share" icon={<MonitorUp className="h-5 w-5" />} />
        <MeetBarButton label="Captions" icon={<Captions className="h-5 w-5" />} mutedStyle />
        <MeetBarButton label="Raise hand" icon={<Hand className="h-5 w-5" />} mutedStyle />
        <MeetBarButton label="Participants" icon={<Users className="h-5 w-5" />} mutedStyle />
        <MeetBarButton label="More" icon={<MoreVertical className="h-5 w-5" />} mutedStyle />
        <button
          type="button"
          className="ml-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ea4335] text-white shadow-md shadow-black/30 transition-transform hover:scale-[1.03] active:scale-[0.98]"
          aria-label="Leave call"
        >
          <PhoneOff className="h-5 w-5" strokeWidth={2} />
        </button>
      </footer>

      <div className="flex items-center justify-center gap-2 border-t border-white/[0.05] bg-[#2d2e30] px-3 py-1.5 text-[10px] text-white/45">
        <Square className="h-3 w-3 shrink-0 text-white/35" strokeWidth={2} />
        <span>Wallet view is shared · comments sync to ledger line L‑204</span>
      </div>
    </div>
  );
}

function MeetBarButton({
  icon,
  label,
  active,
  mutedStyle,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  mutedStyle?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors ${
        active
          ? "bg-white/15 text-white ring-1 ring-white/20"
          : mutedStyle
            ? "text-white/55 hover:bg-white/[0.08]"
            : "text-white/80 hover:bg-white/[0.1]"
      }`}
    >
      {icon}
    </button>
  );
}
