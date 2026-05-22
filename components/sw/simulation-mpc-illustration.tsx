/**
 * Drum machine & step sequencer — 4×4 pads; HTML/CSS only (no waveform chrome).
 */

/**
 * 4×4 pads (row-major). 0 = light pad, 1 = graphite pad, 2 = hot / playing.
 */
const PAD_CELLS: number[] = [
  2, 0, 1, 0,
  0, 2, 0, 1,
  1, 0, 0, 2,
  0, 1, 0, 1,
];

function padClass(level: number) {
  if (level === 2) {
    return "bg-gradient-to-b from-white via-[#f3f3f3] to-[#e0e0e0] shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-3px_5px_rgba(0,0,0,0.06)] ring-1 ring-neutral-400 ring-offset-1 ring-offset-neutral-50";
  }
  if (level === 1) {
    return "bg-gradient-to-b from-neutral-400 via-neutral-500 to-neutral-600 shadow-[inset_0_2px_3px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.25)] ring-1 ring-black/15";
  }
  return "bg-gradient-to-b from-white via-neutral-50 to-neutral-200/90 shadow-[inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-3px_5px_rgba(0,0,0,0.06)] ring-1 ring-neutral-300/80";
}

export function SimulationMpcIllustration() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white text-neutral-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(255,255,255,1)] antialiased ring-1 ring-black/[0.04]"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 bg-white px-3 py-2.5 sm:px-4">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-neutral-800 sm:text-[10px]">
            Drum &amp; Sequence
          </span>
          <span className="text-[8px] uppercase tracking-[0.18em] text-neutral-500">
            Step grid · pattern memory · swing
          </span>
        </div>
        <span className="font-mono text-[9px] tabular-nums tracking-tight text-neutral-600 sm:text-[10px]">
          PAT 04 · 16 steps
        </span>
      </header>

      <div className="p-3 sm:p-5">
        <div className="mb-3 rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-2 shadow-inner sm:mb-4">
          <div className="flex items-center justify-between text-[7px] font-bold uppercase tracking-[0.2em] text-neutral-600">
            <span>Pattern A · 4×4</span>
            <span className="font-mono font-normal tracking-normal">BPM 174 · swing 58%</span>
          </div>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 16 }, (_, i) => (
              <span
                key={i}
                className={`h-2 flex-1 rounded-sm ${
                  [0, 4, 8, 12].includes(i) ? "bg-neutral-800" : i % 4 === 0 ? "bg-neutral-500" : "bg-neutral-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mb-3 rounded-xl border border-neutral-200 bg-neutral-50/80 p-1.5 shadow-inner sm:mb-4 sm:p-2">
          <div className="mx-auto w-full max-w-[min(100%,10.75rem)] sm:max-w-[12.25rem]">
            <div className="grid aspect-square w-full grid-cols-4 grid-rows-4 gap-1 sm:gap-1.5">
              {PAD_CELLS.map((level, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Drum pad ${i + 1}`}
                  className={`min-h-0 min-w-0 rounded-md transition-transform active:scale-[0.97] sm:rounded-lg ${padClass(level)}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-3">
          <div className="flex flex-wrap gap-1.5">
            {["KICK", "SNR", "HAT", "OPN"].map((lane) => (
              <span
                key={lane}
                className="rounded border border-neutral-200 bg-neutral-50 px-2 py-1 font-mono text-[7px] font-bold tracking-wider text-neutral-600"
              >
                {lane}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <TransportChip label="PLAY" />
            <TransportChip label="REC" dim />
            <TransportChip label="CLEAR" dim />
          </div>
        </div>
      </div>
    </div>
  );
}

function TransportChip({ label, dim }: { label: string; dim?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`rounded-md px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] shadow-sm transition active:translate-y-px ${
        dim
          ? "border border-neutral-300 bg-gradient-to-b from-neutral-200 to-neutral-400 text-neutral-800"
          : "border border-neutral-200 bg-gradient-to-b from-white to-neutral-100 text-neutral-900"
      }`}
    >
      {label}
    </button>
  );
}
