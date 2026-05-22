/**
 * Lyrics Accelerator — LLM-assisted writing UI mock (HTML/CSS only).
 */

import { Bot, Sparkles } from "lucide-react";

const SUGGESTIONS = [
  { label: "Rhyme · near", text: "silver line / winter sign" },
  { label: "Meter · 4/4", text: "stress: AND the NIGHT re-LEASES slow" },
  { label: "Semantic", text: "Keep motif: departure, signal loss, twin echo" },
];

export function LyricsAcceleratorIllustration() {
  return (
    <div className="overflow-hidden rounded-lg border border-ink/10 bg-[#f8f9fb] text-[11px] text-ink shadow-[0_20px_50px_-16px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.04]">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 bg-white px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-snow-50">
            <Bot className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
              Lyrics Accelerator
            </span>
            <span className="block truncate text-[12px] font-medium tracking-tight text-ink">
              LLM · meter · rhyme · semantic fit
            </span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-tiff/25 bg-tiff/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-tiff-700">
          <Sparkles className="h-3 w-3" strokeWidth={2} />
          Streaming
        </span>
      </header>

      <div className="grid gap-0 lg:grid-cols-[1fr_minmax(0,11rem)]">
        <div className="border-b border-ink/8 p-3 sm:p-4 lg:border-b-0 lg:border-r">
          <div className="mb-3 rounded-lg border border-ink/10 bg-white px-3 py-2.5 shadow-sm">
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/45">Your draft</p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink/80">
              The signal leaves the room in velvet time —
              <br />
              twin echoes fold where the chorus should climb.
            </p>
          </div>

          <div className="rounded-lg border border-ink/10 bg-white px-3 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/45">
              <Bot className="h-3.5 w-3.5 text-ink/50" strokeWidth={2} />
              Model response
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-ink/75">
              <span className="text-ink/40">▍</span> Try lifting the second line — swap{" "}
              <em className="text-ink/90 not-italic font-medium">chorus should climb</em> for{" "}
              <em className="text-tiff-700 not-italic font-medium">ledger learns the rhyme</em> to tie
              settlement imagery without breaking 4/4 stress on beat three…
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {["Tighten rhyme", "Open syllables", "Match hook motif"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-ink/10 bg-white px-2.5 py-1 text-[10px] font-medium text-ink/65"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <aside className="bg-[#eceef2]/80 p-3 sm:p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/45">Suggestions</p>
          <ul className="mt-2 space-y-2">
            {SUGGESTIONS.map((s) => (
              <li
                key={s.label}
                className="rounded-md border border-ink/10 bg-white px-2.5 py-2 shadow-sm"
              >
                <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-tiff-700">{s.label}</div>
                <p className="mt-1 font-mono text-[10px] leading-snug text-ink/70">{s.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-ink/10 pt-3 text-[9px] leading-relaxed text-ink/50">
            Context: Velvet Clip · harmonic minor · 92 BPM hook lane
          </p>
        </aside>
      </div>

      <footer className="flex items-center justify-between gap-2 border-t border-ink/8 bg-white px-3 py-2 text-[10px] text-ink/50 sm:px-4">
        <span className="font-mono tabular-nums">tokens 412 · latency 0.9s</span>
        <span>Governed export · attribution preserved</span>
      </footer>
    </div>
  );
}
