/**
 * Homepage illustrations — Dropbox-inspired dark storage, LLM chat chrome,
 * floating plugin window. Pure SVG.
 */

const DROPBOX_BLUE = "#0061fe";
const DROPBOX_BLUE_SOFT = "#3d8bfd";

export function DropboxStyleDarkIllustration({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "wide";
}) {
  if (variant === "wide") {
    return (
      <svg
        viewBox="0 0 960 168"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="dbxWideBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0c10" />
            <stop offset="100%" stopColor="#141820" />
          </linearGradient>
          <linearGradient id="dbxFolder" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={DROPBOX_BLUE_SOFT} />
            <stop offset="100%" stopColor={DROPBOX_BLUE} />
          </linearGradient>
          <filter id="dbxGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="960" height="168" rx="14" fill="url(#dbxWideBg)" />
        <text x="32" y="36" fill="#8b9cb5" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.14em">
          SHARED DATASET · SYNCED TWINS
        </text>
        {/* Floating folder stack — Dropbox-style */}
        <g filter="url(#dbxGlow)" opacity="0.95">
          <rect x="48" y="56" width="112" height="88" rx="10" fill="#1a2332" stroke="#2563eb" strokeOpacity="0.35" strokeWidth="1" />
          <path d="M48 68 h112 v68 H48 Z" fill="url(#dbxFolder)" opacity="0.92" />
          <path d="M48 68 l28-12 h56 l28 12" fill={DROPBOX_BLUE} opacity="0.85" />
          <rect x="64" y="88" width="80" height="6" rx="2" fill="#fff" opacity="0.12" />
          <rect x="64" y="100" width="56" height="6" rx="2" fill="#fff" opacity="0.08" />
          <rect x="64" y="112" width="72" height="6" rx="2" fill="#fff" opacity="0.06" />
        </g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${220 + i * 168}, 52)`}>
            <rect width="148" height="100" rx="12" fill="#161c24" stroke="#2a3544" strokeWidth="1" />
            <rect x="12" y="14" width="36" height="28" rx="6" fill={DROPBOX_BLUE} opacity={0.35 + i * 0.08} />
            <rect x="12" y="52" width="124" height="5" rx="2" fill="#fff" opacity="0.06" />
            <rect x="12" y="62" width="92" height="5" rx="2" fill="#fff" opacity="0.05" />
            <rect x="12" y="78" width="104" height="5" rx="2" fill="#fff" opacity="0.04" />
          </g>
        ))}
        <circle cx="898" cy="104" r="36" fill={DROPBOX_BLUE} opacity="0.12" />
        <path d="M878 104 l14-10 v20z M904 94 v20 l12-10z" fill={DROPBOX_BLUE} opacity="0.55" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 400 520"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="dbxHeroBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c1018" />
          <stop offset="55%" stopColor="#121a26" />
          <stop offset="100%" stopColor="#0a0e14" />
        </linearGradient>
        <linearGradient id="dbxHeroFolder" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4b9dff" />
          <stop offset="100%" stopColor={DROPBOX_BLUE} />
        </linearGradient>
        <radialGradient id="dbxHeroOrb" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={DROPBOX_BLUE} stopOpacity="0.35" />
          <stop offset="100%" stopColor={DROPBOX_BLUE} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="520" rx="18" fill="url(#dbxHeroBg)" />
      <circle cx="200" cy="160" r="140" fill="url(#dbxHeroOrb)" />
      <text x="200" y="48" textAnchor="middle" fill="#8b9cb5" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.18em">
        CLOUD CORPUS · PRIVATE MESH
      </text>
      {/* Hero folder */}
      <g transform="translate(100, 120)">
        <rect x="0" y="24" width="200" height="140" rx="16" fill="#182230" stroke="#2563eb" strokeOpacity="0.4" strokeWidth="1.2" />
        <path d="M0 46 L40 20 H120 L160 46 V164 H0 Z" fill="url(#dbxHeroFolder)" />
        <rect x="24" y="88" width="152" height="8" rx="3" fill="#fff" opacity="0.15" />
        <rect x="24" y="106" width="112" height="8" rx="3" fill="#fff" opacity="0.1" />
        <rect x="24" y="124" width="136" height="8" rx="3" fill="#fff" opacity="0.07" />
      </g>
      {/* File cards */}
      {[0, 1, 2].flatMap((row) =>
        [0, 1].map((col) => {
          const x = 48 + col * 168;
          const y = 310 + row * 54;
          return (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width="148"
              height="44"
              rx="8"
              fill="#141c28"
              stroke="#2a3548"
              strokeWidth="0.8"
              opacity="0.95"
            />
          );
        })
      )}
      <rect x="64" y="326" width="28" height="24" rx="5" fill={DROPBOX_BLUE} opacity="0.5" />
      <rect x="232" y="326" width="28" height="24" rx="5" fill={DROPBOX_BLUE} opacity="0.35" />
      <rect x="64" y="380" width="28" height="24" rx="5" fill={DROPBOX_BLUE} opacity="0.42" />
      <rect x="232" y="380" width="28" height="24" rx="5" fill={DROPBOX_BLUE} opacity="0.28" />
      <path d="M200 480 L200 496" stroke={DROPBOX_BLUE} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <text x="200" y="508" textAnchor="middle" fill="#5c6d82" fontSize="8" fontFamily="ui-monospace, monospace">
        Replicated · triple AZ
      </text>
    </svg>
  );
}

/** ChatGPT-style assistant surface (dataset / reasoning). */
export function LlmChatSurfaceIllustration({ className }: { className?: string }) {
  const w = 640;
  const h = 124;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width={w} height={h} rx="10" fill="#1e1e1e" />
      {/* Sidebar */}
      <rect x="0" y="0" width="44" height={h} fill="#171717" />
      {[8, 22, 36].map((y, i) => (
        <rect key={y} x="10" y={y} width="24" height="8" rx="2" fill="#ffffff" opacity={0.06 + i * 0.02} />
      ))}
      <circle cx="22" cy="108" r="10" fill="#10a37f" opacity="0.9" />
      <path d="M18 108 l3 3 6-8" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Main */}
      <rect x="52" y="10" width="576" height="104" rx="8" fill="#212121" />
      {/* Assistant bubble */}
      <rect x="64" y="22" width="280" height="44" rx="10" fill="#2f2f2f" />
      <rect x="76" y="34" width="200" height="5" rx="2" fill="#fff" opacity="0.12" />
      <rect x="76" y="44" width="160" height="5" rx="2" fill="#fff" opacity="0.08" />
      <rect x="76" y="54" width="128" height="5" rx="2" fill="#fff" opacity="0.06" />
      {/* User bubble */}
      <rect x="380" y="22" width="220" height="32" rx="10" fill="#2a2a2a" stroke="#404040" strokeWidth="0.8" />
      <rect x="392" y="32" width="180" height="5" rx="2" fill="#7FD4CC" opacity="0.35" />
      <rect x="392" y="42" width="120" height="5" rx="2" fill="#7FD4CC" opacity="0.2" />
      {/* Input bar */}
      <rect x="64" y="78" width="528" height="28" rx="14" fill="#2f2f2f" stroke="#525252" strokeWidth="0.8" />
      <text x="84" y="96" fill="#737373" fontSize="10" fontFamily="ui-sans-serif, system-ui, sans-serif">
        Ask what happens next…
      </text>
      <circle cx="570" cy="92" r="8" fill="#404040" />
      <path d="M566 92 h8 M570 88v8" stroke="#a3a3a3" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/** Floating desktop window with synth-plugin chrome. */
export function SynthPluginDesktopIllustration({ className }: { className?: string }) {
  const w = 640;
  const h = 124;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="plugFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2830" />
          <stop offset="100%" stopColor="#1a181e" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width={w - 12} height={h - 12} rx="12" fill="#0c0c0e" stroke="#000" strokeOpacity="0.5" />
      {/* Title bar */}
      <rect x="6" y="6" width={w - 12} height="22" rx="12" fill="#3c3842" />
      <rect x="6" y="16" width={w - 12} height="12" fill="#3c3842" />
      <circle cx="20" cy="17" r="3.5" fill="#ff5f57" />
      <circle cx="34" cy="17" r="3.5" fill="#febc2e" />
      <circle cx="48" cy="17" r="3.5" fill="#28c840" />
      <text x={w / 2} y="19" textAnchor="middle" fill="#d4c4b0" fontSize="8" fontFamily="ui-monospace, monospace" fontWeight="600" letterSpacing="0.06em">
        CONSEQUENCE ANALOG — VST3
      </text>
      {/* Plugin face */}
      <rect x="10" y="32" width={w - 20} height={h - 42} rx="8" fill="url(#plugFace)" stroke="#5c5360" strokeWidth="0.7" />
      {/* Mini scopes */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={22 + i * 72} y={42} width="56" height="28" rx="4" fill="#121014" stroke="#3d3845" strokeWidth="0.6" />
          <path
            d={`M ${28 + i * 72} 56 Q ${40 + i * 72} 48 ${52 + i * 72} 58 T ${76 + i * 72} 54`}
            stroke={i === 0 ? "#7FD4CC" : i === 1 ? "#c4a574" : "#9b7dd4"}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.75"
          />
        </g>
      ))}
      {/* Big knob */}
      <circle cx="292" cy="66" r="22" fill="#25232a" stroke="#c4a574" strokeWidth="1.2" opacity="0.9" />
      <circle cx="292" cy="66" r="16" fill="#1a181e" stroke="#453d4a" strokeWidth="0.8" />
      <line x1="292" y1="66" x2="292" y2="52" stroke="#c4a574" strokeWidth="2" strokeLinecap="round" />
      <text x="292" y="98" textAnchor="middle" fill="#8a7d6b" fontSize="7" fontFamily="ui-monospace, monospace">
        CUTOFF
      </text>
      {/* ADSR */}
      <path d="M 340 52 L 352 52 356 68 364 68 368 52 376 52 380 72" stroke="#7a7382" strokeWidth="1.2" fill="none" strokeLinejoin="round" opacity="0.85" />
      <rect x="336" y="78" width="56" height="4" rx="1" fill="#c4a574" opacity="0.25" />
      {/* Mini keys */}
      <rect x="410" y="78" width="210" height="28" rx="4" fill="#0a0a0c" stroke="#333" strokeWidth="0.5" />
      {Array.from({ length: 14 }).map((_, k) => (
        <rect key={k} x={414 + k * 14} y="82" width="10" height="20" rx="1" fill="#e8e6e3" opacity={0.88 - (k % 3) * 0.05} />
      ))}
    </svg>
  );
}
