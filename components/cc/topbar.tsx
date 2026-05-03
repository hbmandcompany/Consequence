"use client";

import { Search, Mic2, Bell } from "lucide-react";

export function CCTopBar() {
  return (
    <div className="flex flex-col items-end gap-4">
      <div className="flex items-center gap-2 bg-snow-0 border border-ink/10 rounded-full px-4 py-2.5 w-full md:w-[420px]">
        <Search className="w-4 h-4 text-ink/40" />
        <input
          placeholder="Search stems, producers, sessions, twins…"
          className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-ink/35"
        />
        <span className="text-[10px] tabular uppercase tracking-[0.16em] text-ink/35 border-l border-ink/10 pl-3">
          ⌘ K
        </span>
      </div>
      <div className="flex items-center gap-3 text-[11px] tabular uppercase tracking-[0.18em] text-ink/55">
        <span className="inline-flex items-center gap-2 bg-snow-0 border border-ink/10 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-tiff animate-breathe" />
          BPM 92
        </span>
        <span className="inline-flex items-center gap-2 bg-snow-0 border border-ink/10 px-3 py-1.5 rounded-full">
          Key D♭ minor
        </span>
        <span className="inline-flex items-center gap-2 bg-snow-0 border border-ink/10 px-3 py-1.5 rounded-full">
          <Mic2 className="w-3 h-3" /> Live takes 3
        </span>
        <span className="inline-flex items-center gap-2 bg-snow-0 border border-ink/10 px-3 py-1.5 rounded-full">
          <Bell className="w-3 h-3" /> 7
        </span>
      </div>
    </div>
  );
}
