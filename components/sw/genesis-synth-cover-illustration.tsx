/**
 * Genesis flagship synth — product cover art only (no playable UI).
 */

export function GenesisSynthCoverIllustration() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-ink/10 shadow-[0_24px_56px_-16px_rgba(10,10,10,0.22)] ring-1 ring-black/[0.04]">
      <div className="relative aspect-[16/10] min-h-[280px] w-full bg-[#0a0a0a]">
        {/* Cover art field */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 72% 38%, rgba(45, 212, 191, 0.35) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 22% 72%, rgba(201, 162, 39, 0.22) 0%, transparent 50%), linear-gradient(145deg, #0a0a0a 0%, #14141c 42%, #0d1218 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Abstract silhouette — suggestive of a synth body, not controls */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 640 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="genesis-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#c9a227" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#fcfcfa" stopOpacity="0.08" />
            </linearGradient>
            <filter id="genesis-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
          <ellipse cx="420" cy="200" rx="200" ry="140" fill="url(#genesis-glow)" filter="url(#genesis-blur)" opacity="0.7" />
          <path
            d="M80 320 Q200 180 360 240 T520 200 Q580 280 560 340 L80 340 Z"
            fill="none"
            stroke="rgba(252,252,250,0.12)"
            strokeWidth="1.5"
          />
          <path
            d="M120 300 C220 120 380 140 480 260"
            fill="none"
            stroke="rgba(45,212,191,0.35)"
            strokeWidth="2"
          />
        </svg>

        <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full border border-snow-50/15 bg-snow-50/[0.06] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-snow-50/70 backdrop-blur-sm">
              Flagship · Conductor
            </span>
            <span className="font-mono text-[10px] tabular-nums tracking-tight text-snow-50/40">v 1.0</span>
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-tiff-400/90">Neural timbre instrument</p>
            <h4 className="mt-2 font-display text-[clamp(52px,10vw,88px)] leading-[0.92] tracking-tightest-2 text-snow-50">
              Genesis
            </h4>
            <p className="mt-3 max-w-[36ch] text-[13px] leading-relaxed text-snow-50/55">
              Cover identity for the flagship synth — timbre, motion, and patch memory without exposing the full control surface.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>
    </div>
  );
}
