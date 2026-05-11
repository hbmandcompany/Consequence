/**
 * Logic Pro– / Native Instruments–inspired DAW chrome.
 * Pure SVG + CSS; no bitmaps. Dark UI panels on the marketing layout.
 */

const LP_BG = "#2b2b2e";
const LP_PANEL = "#323236";
const LP_RAIL = "#28282c";
const LP_LINE = "#45454a";
const LP_TEXT = "#d0d0d4";
const LP_MUTE = "#8e8e93";
const LP_PLAY = "#32d74b";
const LP_REC = "#ff453a";
const NI_ACCENT = "#c4a574";
const BRAND_PLAYHEAD = "#7FD4CC";

export function TwinNetDawIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 520"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dawWinBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3a3f" />
          <stop offset="100%" stopColor={LP_BG} />
        </linearGradient>
        <linearGradient id="dawMeterGr" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={BRAND_PLAYHEAD} stopOpacity="0.9" />
          <stop offset="55%" stopColor={BRAND_PLAYHEAD} stopOpacity="0.35" />
          <stop offset="100%" stopColor="#5a5a5e" stopOpacity="0.6" />
        </linearGradient>
        <pattern id="dawGrid" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="0.5" />
        </pattern>
        <clipPath id="dawRound">
          <rect x="4" y="4" width="392" height="512" rx="14" ry="14" />
        </clipPath>
      </defs>

      <g clipPath="url(#dawRound)">
        <rect x="4" y="4" width="392" height="512" fill="url(#dawWinBg)" />
        {/* Title bar — Logic-style traffic lights */}
        <rect x="4" y="4" width="392" height="36" fill={LP_PANEL} />
        <circle cx="22" cy="22" r="5" fill="#ff5f57" opacity="0.95" />
        <circle cx="40" cy="22" r="5" fill="#febc2e" opacity="0.95" />
        <circle cx="58" cy="22" r="5" fill="#28c840" opacity="0.95" />
        <text x="200" y="24" textAnchor="middle" fill={LP_TEXT} fontSize="11" fontFamily="ui-monospace, monospace">
          Twin Net · Velvet Clip — sales +$15 pending
        </text>
        <text x="368" y="24" textAnchor="end" fill={LP_MUTE} fontSize="9" fontFamily="ui-monospace, monospace">
          NL 53.21°N
        </text>

        {/* Transport — NI / Logic hybrid */}
        <rect x="4" y="40" width="392" height="44" fill={LP_RAIL} />
        <rect x="12" y="50" width="28" height="24" rx="4" fill="#404048" stroke={LP_LINE} strokeWidth="0.8" />
        <path d="M22 58 L22 66 M18 62 L26 62" stroke={LP_MUTE} strokeWidth="1.2" strokeLinecap="round" />
        <rect x="48" y="50" width="36" height="24" rx="5" fill={`${LP_PLAY}22`} stroke={LP_PLAY} strokeWidth="1" />
        <path d="M61 57 L61 67 L69 62 Z" fill={LP_PLAY} />
        <rect x="92" y="50" width="28" height="24" rx="4" fill="#404048" stroke={LP_LINE} strokeWidth="0.8" />
        <path d="M102 58 L102 66 M98 62 L106 62" stroke={LP_MUTE} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="134" cy="62" r="8" fill={`${LP_REC}18`} stroke={LP_REC} strokeWidth="1" />
        <circle cx="134" cy="62" r="3.5" fill={LP_REC} />
        <text x="158" y="66" fill={LP_TEXT} fontSize="12" fontFamily="ui-monospace, monospace" fontWeight="600">
          092 · 4/4
        </text>
        <text x="268" y="62" fill={LP_MUTE} fontSize="9" fontFamily="ui-monospace, monospace">
          BPM
        </text>
        <text x="268" y="72" fill={NI_ACCENT} fontSize="13" fontFamily="ui-monospace, monospace" fontWeight="600">
          92.00
        </text>
        <text x="330" y="66" fill={LP_TEXT} fontSize="11" fontFamily="ui-monospace, monospace">
          01 : 04 : 18 : 07
        </text>

        {/* Track headers + arrange */}
        <rect x="4" y="84" width="88" height="360" fill="#262628" />
        {["Velvet Clip", "MIDI · Twin", "Audio — NL", "Bus · Glue"].map((name, i) => {
          const y = 92 + i * 72;
          return (
            <g key={name}>
              <rect x="8" y={y} width="80" height="64" rx="4" fill="#2e2e32" stroke={LP_LINE} strokeWidth="0.6" />
              <rect x="14" y={y + 8} width="32" height="20" rx="2" fill="#1a1a1c" stroke={LP_LINE} strokeWidth="0.5" />
              <text x="48" y={y + 22} textAnchor="middle" fill={LP_MUTE} fontSize="8" fontFamily="system-ui, sans-serif">
                {i + 1}
              </text>
              <text x="14" y={y + 42} fill={LP_TEXT} fontSize="9" fontFamily="system-ui, sans-serif">
                {name}
              </text>
              <rect x="14" y={y + 48} width="54" height="3" rx="1" fill="#3d3d42" />
              <rect x="14" y={y + 48} width={18 + i * 10} height="3" rx="1" fill={NI_ACCENT} opacity="0.7" />
            </g>
          );
        })}

        {/* Arrangement / piano-roll region */}
        <rect x="92" y="84" width="304" height="360" fill="#242426" />
        <rect x="92" y="84" width="304" height="360" fill="url(#dawGrid)" opacity="0.6" />

        {/* Beat dividers */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((i) => (
          <line
            key={i}
            x1={100 + i * 13}
            y1={88}
            x2={100 + i * 13}
            y2={438}
            stroke="#fff"
            strokeOpacity={i % 4 === 0 ? 0.08 : 0.03}
            strokeWidth="0.6"
          />
        ))}

        {/* Lane separators */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={96}
            y1={92 + i * 72 + 72}
            x2={392}
            y2={92 + i * 72 + 72}
            stroke={LP_LINE}
            strokeOpacity="0.5"
            strokeWidth="0.6"
          />
        ))}

        {/* MIDI blocks — editor style */}
        <rect x="118" y="108" width="44" height="16" rx="2" fill={BRAND_PLAYHEAD} opacity="0.55" />
        <rect x="168" y="108" width="28" height="16" rx="2" fill={BRAND_PLAYHEAD} opacity="0.45" />
        <rect x="210" y="108" width="56" height="16" rx="2" fill={BRAND_PLAYHEAD} opacity="0.5" />
        <rect x="132" y="180" width="60" height="14" rx="2" fill="#5dade2" opacity="0.35" />
        <rect x="200" y="180" width="36" height="14" rx="2" fill="#5dade2" opacity="0.28" />
        <rect x="126" y="252" width="72" height="22" rx="3" fill={NI_ACCENT} opacity="0.25" />
        <rect x="210" y="258" width="40" height="16" rx="2" fill="#fff" opacity="0.12" />
        <rect x="140" y="324" width="88" height="18" rx="2" fill={LP_PLAY} opacity="0.2" />

        {/* Playhead — animated */}
        <g className="daw-playhead-scrub" style={{ transformBox: "fill-box", transformOrigin: "140px 88px" }}>
          <line x1="140" y1="88" x2="140" y2="438" stroke={BRAND_PLAYHEAD} strokeWidth="1.5" opacity="0.95" />
          <polygon points="136,88 144,88 140,94" fill={BRAND_PLAYHEAD} />
        </g>

        {/* Bottom mixer strip — NI-style */}
        <rect x="4" y="444" width="392" height="72" fill={LP_PANEL} />
        <text x="16" y="466" fill={LP_MUTE} fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="0.12em">
          MIXER
        </text>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x = 20 + i * 58;
          return (
            <g key={i}>
              <rect x={x} y="472" width="6" height="36" rx="1" fill="#1e1e22" stroke={LP_LINE} strokeWidth="0.4" />
              <rect x={x} y={508 - 8 - (i + 3) * 3.2} width="6" height={8 + (i + 3) * 3.2} rx="1" fill="url(#dawMeterGr)" opacity="0.85" />
              <rect x={x - 1} y="508" width="8" height="4" rx="1" fill="#4a4a52" />
            </g>
          );
        })}
        <text x="16" y="508" fill={LP_TEXT} fontSize="10" fontFamily="ui-monospace, monospace">
          Median latency
        </text>
        <text x="16" y="522" fill={BRAND_PLAYHEAD} fontSize="14" fontFamily="ui-monospace, monospace" fontWeight="700">
          142 ms
        </text>
        <text x="300" y="508" fill={LP_MUTE} fontSize="9" fontFamily="ui-monospace, monospace">
          Buffer 128 smp
        </text>
      </g>
      <rect x="4" y="4" width="392" height="512" rx="14" stroke={LP_LINE} strokeWidth="1" fill="none" opacity="0.9" />
    </svg>
  );
}

/** Wide session → twin bridge for manifesto. */
export function DawManifestoBridge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 960 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="manifestGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2e2e32" />
          <stop offset="50%" stopColor="#323236" />
          <stop offset="100%" stopColor="#2a2a2e" />
        </linearGradient>
      </defs>
      <rect width="960" height="140" rx="12" fill="url(#manifestGrad)" stroke="#45454a" strokeWidth="1" />
      <text x="24" y="28" fill="#8e8e93" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="0.15em">
        EVENT FLOW · REAL TIME
      </text>
      {/* Three Mackie/Logic-style modules */}
      {[
        { x: 24, t: "INGEST", sub: "Kafka bus" },
        { x: 336, t: "TWIN", sub: "State mesh" },
        { x: 648, t: "INFER", sub: "GPU lane" },
      ].map((m, idx) => (
        <g key={m.t}>
          <rect x={m.x} y={44} width="288" height="80" rx="8" fill="#28282c" stroke="#3d3d44" strokeWidth="0.8" />
          <text x={m.x + 14} y={64} fill="#c4a574" fontSize="10" fontFamily="ui-monospace, monospace" fontWeight="600">
            {m.t}
          </text>
          <text x={m.x + 14} y={80} fill="#8e8e93" fontSize="9" fontFamily="system-ui, sans-serif">
            {m.sub}
          </text>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect
              key={i}
              x={m.x + 14 + i * 34}
              y={90}
              width="26"
              height="4"
              rx="1"
              fill={idx === 0 ? "#7FD4CC" : idx === 1 ? "#5dade2" : "#32d74b"}
              opacity={0.25 + (i % 3) * 0.12}
            />
          ))}
          {/* Fake waveform blocks */}
          <path
            d={`M ${m.x + 14} 108 L ${m.x + 40} 98 L ${m.x + 70} 112 L ${m.x + 110} 94 L ${m.x + 150} 108 L ${m.x + 200} 100 L ${m.x + 260} 108`}
            stroke="#d0d0d4"
            strokeOpacity="0.25"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  );
}

/** Surface cards: studio session vs engine rack. */
export function DawSurfaceStrip({ variant }: { variant: "studio" | "engine" }) {
  const h = 100;
  const w = 600;
  if (variant === "studio") {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[100px]" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width={w} height={h} rx="8" fill="#2b2b2e" />
        <rect x="8" y="8" width={w - 16} height="24" rx="4" fill="#323236" />
        <text x="16" y="24" fill="#d0d0d4" fontSize="9" fontFamily="ui-monospace, monospace">
          SESSION · Velvet / Atelier
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={12 + i * 112} y={40} width="100" height="52" rx="4" fill="#262628" stroke="#45454a" strokeWidth="0.6" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((b) => (
              <rect
                key={b}
                x={18 + i * 112 + b * 7}
                y={78}
                width="5"
                height={8 + (b % 5) * 2}
                rx="0.5"
                fill="#7FD4CC"
                opacity={0.15 + (b % 4) * 0.08}
              />
            ))}
          </g>
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[100px]" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width={w} height={h} rx="8" fill="#252428" />
      <text x="12" y="22" fill="#c4a574" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="0.12em">
        RACK · ORCHESTRATION
      </text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={12 + i * 96} y={32} width="88" height="60" rx="4" fill="#2e2c30" stroke="#5c5360" strokeWidth="0.7" />
          <rect x={20 + i * 96} y={42} width="72" height="6" rx="2" fill="#1a181c" />
          <circle cx={28 + i * 96} cy="72" r="10" fill="#3a3640" stroke="#c4a574" strokeWidth="0.8" opacity="0.8" />
          <circle cx={28 + i * 96} cy="72" r="4" fill="#32d74b" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}
