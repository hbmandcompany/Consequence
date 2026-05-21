"use client";

import { useCallback, useState } from "react";
import clsx from "clsx";
import {
  ListMusic,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";

function AlbumArt({ active }: { active?: boolean }) {
  return (
    <div className="relative overflow-hidden border border-ink/10 bg-snow-100 aspect-square w-full max-w-[200px] mx-auto rounded-xl">
      <div className="absolute inset-0 flex flex-col">
        <div className="bg-tiff/20 h-[38%]" />
        <div className="flex-1 bg-snow-200 relative">
          <div
            className="absolute bottom-0 left-0 right-0 h-px bg-ink/15"
            style={{ boxShadow: "0 -1px 0 0 rgba(10,10,10,0.06)" }}
          />
          <div className="absolute top-[22%] left-[18%] w-[42%] h-[3px] bg-ink/12 rounded-full" />
          <div className="absolute top-[32%] left-[24%] w-[28%] h-[3px] bg-ink/8 rounded-full" />
          <div className="absolute bottom-[28%] right-[16%] w-[36%] h-[36%] border border-ink/12 rounded-sm" />
        </div>
        <div className="bg-ink/[0.04] h-[18%]" />
      </div>
      {active && (
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full border border-ink/10 bg-snow-0/90 px-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-tiff animate-pulse" />
          <span className="text-[8px] tabular uppercase tracking-[0.14em] text-ink/55">
            Playing
          </span>
        </div>
      )}
    </div>
  );
}

function formatTime(p: number): string {
  const s = Math.floor(p * 214);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export function ForYouPlaybackIllustration({ className }: { className?: string }) {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0.41);

  const togglePlay = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPlaying((p) => !p);
  }, []);

  const onScrub = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setProgress(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)));
  }, []);

  return (
    <div
      className={clsx("bg-snow-0 text-ink select-none", className)}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="px-4 pt-4 pb-2 border-b border-ink/10">
        <span className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">
          Listen Now
        </span>
      </div>

      <div className="px-4 py-5">
        <AlbumArt active={playing} />

        <div className="mt-5 text-center">
          <h3 className="font-display text-[22px] leading-tight tracking-tight text-ink">
            Velvet Clip
          </h3>
          <p className="mt-1 text-[12px] text-ink/55 tabular tracking-wide">
            Margot · Iso · V12 · D♭ min
          </p>
          <p className="mt-2 text-[10px] tabular uppercase tracking-[0.16em] text-ink/40">
            Composition twin · match 0.94
          </p>
        </div>

        <div className="mt-6">
          <div
            role="slider"
            aria-valuenow={Math.round(progress * 100)}
            tabIndex={0}
            className="relative h-[3px] rounded-full bg-ink/10 cursor-pointer"
            onClick={onScrub}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-ink"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-ink border-2 border-snow-0 shadow-sm"
              style={{ left: `calc(${progress * 100}% - 5px)` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] tabular text-ink/45">
            <span>{formatTime(progress)}</span>
            <span>3:34</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between px-2">
          <button
            type="button"
            className="text-ink/35 hover:text-ink/60 p-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            aria-label="Shuffle"
          >
            <Shuffle className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="text-ink/50 hover:text-ink p-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            aria-label="Previous"
          >
            <SkipBack className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="w-11 h-11 rounded-full bg-ink text-snow-0 flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="w-5 h-5" fill="currentColor" strokeWidth={0} />
            ) : (
              <Play className="w-5 h-5 ml-0.5" fill="currentColor" strokeWidth={0} />
            )}
          </button>
          <button
            type="button"
            className="text-ink/50 hover:text-ink p-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            aria-label="Next"
          >
            <SkipForward className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="text-ink/35 hover:text-ink/60 p-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            aria-label="Repeat"
          >
            <Repeat className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 border-t border-ink/10 bg-snow-100/80">
        <ListMusic className="w-3.5 h-3.5 text-ink/40 shrink-0" strokeWidth={1.5} />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] tabular uppercase tracking-[0.14em] text-ink/40">
            Up next
          </p>
          <p className="text-[11px] text-ink/60 truncate">Halls of Linen · Eos Veil</p>
        </div>
        <span className="text-[10px] tabular text-ink/40 shrink-0">+4</span>
      </div>
    </div>
  );
}
