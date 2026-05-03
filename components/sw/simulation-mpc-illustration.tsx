/**
 * White drum machine — 4×4 white/gray pads; simulation metaphor; HTML/CSS only.
 */

const WAVEFORM_GID = "sim-mpc-wf";

/**
 * 4×4 pads (row-major). 0 = light pad, 1 = graphite pad, 2 = hot / playing.
 */
const PAD_CELLS: number[] = [
  2, 0, 1, 0,
  0, 2, 0, 1,
  1, 0, 0, 2,
  0, 1, 0, 1,
];

const KNOB_ANGLES = [-35, 10, 45, -15, 25, -40, 5, 30];
const KNOB_LABELS = ["LEV", "TONE", "DEC", "SNP", "RES", "RATE", "SWG", "MIX"] as const;

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
          <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-neutral-800 sm:text-[10px]">Rhythm Composer</span>
          <span className="text-[8px] uppercase tracking-[0.18em] text-neutral-500">Simulation · Monte Carlo grid</span>
        </div>
        <span className="font-mono text-[9px] tabular-nums tracking-tight text-neutral-600 sm:text-[10px]">RUN 10,847 / 10,000</span>
      </header>

      <div className="p-3 sm:p-5">
        {/* Display strip */}
        <div className="mb-3 rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-2 shadow-inner sm:mb-4">
          <div className="flex items-center justify-between text-[7px] font-bold uppercase tracking-[0.2em] text-neutral-600">
            <span>Pattern · 16 cells</span>
            <span className="font-mono font-normal tracking-normal">BPM 174</span>
          </div>
          <div className="mt-2 h-6 overflow-hidden rounded border border-neutral-300/80 bg-neutral-900 sm:h-7">
            <svg className="h-full w-full opacity-95" preserveAspectRatio="none" viewBox="0 0 100 16" aria-hidden>
              <path
                d="M0 12 Q14 3 28 10 T52 7 T76 10 T100 5 L100 16 L0 16 Z"
                fill={`url(#${WAVEFORM_GID}-g)`}
              />
              <defs>
                <linearGradient id={`${WAVEFORM_GID}-g`} x1="0" x2="100" y1="0" y2="0">
                  <stop offset="0%" stopColor="rgb(212 212 212)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="rgb(250 250 250)" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* 4×4 drum pads */}
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

        <div className="mb-3 flex flex-wrap justify-center gap-x-3 gap-y-2 border-y border-neutral-200 py-3 sm:mb-4 sm:gap-x-4">
          {KNOB_ANGLES.map((deg, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="relative h-9 w-9 sm:h-10 sm:w-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#f8f8f8] via-[#a8a8a8] to-[#737373] shadow-[0_2px_5px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-neutral-500/35" />
                <div
                  className="absolute left-1/2 top-1/2 h-[40%] w-0.5 rounded-full bg-neutral-900 shadow-sm"
                  style={{ transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-42%)` }}
                />
                <div className="absolute inset-[28%] rounded-full bg-gradient-to-br from-white/90 to-transparent" />
              </div>
              <span className="text-[6px] font-bold uppercase tracking-[0.12em] text-neutral-500">{KNOB_LABELS[i]}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="h-10 flex-1 rounded-lg border border-neutral-200 bg-neutral-900 px-2 py-1 shadow-inner sm:max-w-[55%]">
            <div className="flex justify-between text-[6px] font-mono uppercase tracking-wider text-neutral-400">
              <span>Scenario mix</span>
              <span>OUT → BUS</span>
            </div>
            <svg className="mt-0.5 h-5 w-full" preserveAspectRatio="none" viewBox="0 0 100 20" aria-hidden>
              <path
                d="M0 14 Q12 4 25 12 T50 8 T75 11 T100 6 L100 20 L0 20 Z"
                fill={`url(#${WAVEFORM_GID}-h)`}
                opacity="0.9"
              />
              <defs>
                <linearGradient id={`${WAVEFORM_GID}-h`} x1="0" x2="100" y1="0" y2="0">
                  <stop offset="0%" stopColor="rgb(163 163 163)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="rgb(245 245 245)" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex items-center justify-end gap-1.5">
            <TransportChip label="START" />
            <TransportChip label="STOP" dim />
            <span className="pl-1 text-right text-[7px] font-semibold uppercase leading-snug tracking-[0.08em] text-neutral-500">
              Tier‑A
              <br />
              priority
            </span>
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
