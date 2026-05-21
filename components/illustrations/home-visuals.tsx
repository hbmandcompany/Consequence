/**
 * Homepage illustrations — Dropbox cloud UI (app window + folder iconography), LLM chat, plugin window.
 * Pure SVG.
 */

/** Dropbox brand palette — folder fill + UI accent. */
const DROPBOX_BLUE = "#0061fe";
const DROPBOX_BLUE_DEEP = "#0052cc";
const DROPBOX_BLUE_SOFT = "#3d8bfd";

const LUX_ACCENT = DROPBOX_BLUE;
const LUX_ACCENT_MUTED = DROPBOX_BLUE_DEEP;
const LUX_IVORY = "#e8e4dc";
const LUX_MUTED = "#9a958c";
const LUX_SUBTLE = "#5c5852";
const LUX_SHEEN = "#c4bdb2";
const LUX_ROW_SEL = "#1a2432";
const LUX_FILE = "#5a5854";
const LUX_FILE_DEEP = "#45433f";
const MUTED = LUX_MUTED;
const SUBTLE = LUX_SUBTLE;

/** Compact Dropbox-style file window (SVG background is transparent past the window card). */
export function DropboxStyleDarkIllustration({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "wide";
}) {
  const mono = "ui-monospace, ui-sans-serif, system-ui, sans-serif";
  const sans = "ui-sans-serif, system-ui, sans-serif";

  if (variant === "wide") {
    const W = 580;
    const H = 172;
    const sw = 84;
    const mainX = 16 + sw + 8;
    return (
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="dbxw-main" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#13120f" />
            <stop offset="55%" stopColor="#151311" />
            <stop offset="100%" stopColor="#1a1815" />
          </linearGradient>
          <linearGradient id="dbxw-folder-dbx" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={DROPBOX_BLUE_SOFT} />
            <stop offset="45%" stopColor={DROPBOX_BLUE} />
            <stop offset="100%" stopColor={DROPBOX_BLUE_DEEP} />
          </linearGradient>
          <linearGradient id="dbxw-card-face" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1816" />
            <stop offset="100%" stopColor="#12100e" />
          </linearGradient>
          <linearGradient id="dbxw-rim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={LUX_SHEEN} stopOpacity="0.22" />
            <stop offset="35%" stopColor="#4a4540" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1c1a18" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="dbxw-accent-plate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={DROPBOX_BLUE_SOFT} />
            <stop offset="50%" stopColor={DROPBOX_BLUE} />
            <stop offset="100%" stopColor={DROPBOX_BLUE_DEEP} />
          </linearGradient>
          <filter id="dbxw-shadow" x="-12%" y="-12%" width="124%" height="124%">
            <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="#000" floodOpacity="0.22" />
          </filter>
        </defs>
        <g filter="url(#dbxw-shadow)">
          <rect x="16" y="12" width={W - 32} height={H - 24} rx="10" fill="#11100e" stroke="url(#dbxw-rim)" strokeWidth="1" />
        </g>
        <rect x="16" y="12" width={W - 32} height="22" rx="10" fill="#0e0c0b" />
        <rect x="16" y="24" width={W - 32} height="10" fill="#0e0c0b" />
        <rect x="28" y="18" width="14" height="12" rx="2.5" fill="url(#dbxw-accent-plate)" />
        <path d="M32 22h6M35 19.5v5" stroke={LUX_IVORY} strokeWidth="1" strokeLinecap="round" opacity="0.92" />
        <text x="48" y="27" fill={LUX_IVORY} fontSize="8.5" fontFamily={sans} fontWeight="600" letterSpacing="0.08em">
          Content Cloud
        </text>
        <rect x="118" y="17" width="324" height="16" rx="8" fill="#12100e" stroke="#3a3632" strokeWidth="0.65" />
        <circle cx="130" cy="25" r="3" stroke={LUX_SUBTLE} strokeWidth="0.8" fill="none" />
        <path d="M128.5 25L129.8 26.2 132.2 23.5" stroke={LUX_SUBTLE} strokeWidth="0.7" strokeLinecap="round" opacity="0.85" />
        <text x="140" y="29" fill={LUX_MUTED} fontSize="7" fontFamily={sans}>
          Search files, folders, people…
        </text>
        <rect x="450" y="17" width="48" height="16" rx="4" fill="url(#dbxw-accent-plate)" />
        <text x="460" y="29" fill={LUX_IVORY} fontSize="7" fontFamily={sans} fontWeight="600">
          + New
        </text>
        <g transform="translate(508, 18)">
          <circle cx="7" cy="7" r="7" fill="#2a2622" stroke="#4a4540" strokeWidth="0.5" />
          <text x="7" y="10.5" textAnchor="middle" fill={LUX_IVORY} fontSize="6.5" fontFamily={sans} fontWeight="600">
            JD
          </text>
        </g>

        <rect x="16" y="34" width={sw} height={H - 46} fill="#11100e" />
        <line x1={16 + sw} y1="34" x2={16 + sw} y2={H - 16} stroke="#2e2b27" strokeWidth="1" />
        <text x="26" y="46" fill={LUX_SUBTLE} fontSize="6" fontFamily={sans} fontWeight="600" letterSpacing="0.06em">
          Favorites
        </text>
        <rect x="17" y="51" width="3" height="13" rx="1" fill={LUX_ACCENT} />
        <SmallNavIcon x={26} y={52} kind="folder" active />
        <text x="52" y="62" fill={LUX_IVORY} fontSize="7" fontFamily={sans} fontWeight="600">
          All Files
        </text>
        <SmallNavIcon x={26} y={66} kind="clock" />
        <text x="52" y="76" fill={LUX_MUTED} fontSize="7" fontFamily={sans}>
          Recents
        </text>
        <SmallNavIcon x={26} y={80} kind="people" />
        <text x="52" y="90" fill={LUX_MUTED} fontSize="7" fontFamily={sans}>
          Shared
        </text>
        <text x="26" y="102" fill={LUX_SUBTLE} fontSize="6" fontFamily={sans} fontWeight="600" letterSpacing="0.06em">
          Folders
        </text>
        <BoxFolderGlyph x={26} y={106} w={14} gradientId="dbxw-folder-dbx" />
        <text x="52" y="118" fill={LUX_IVORY} fontSize="7" fontFamily={sans}>
          Twins
        </text>

        <rect x={mainX} y="34" width={W - mainX - 16} height={H - 46} rx="5" fill="url(#dbxw-main)" stroke="#3a3632" strokeWidth="0.55" />
        {/* Path bar + actions */}
        <rect x={mainX + 6} y="40" width={W - mainX - 28} height="18" rx="3" fill="#151311" />
        <line x1={mainX + 6} y1="58" x2={W - 22} y2="58" stroke="#2e2b27" strokeWidth="0.5" />
        <text x={mainX + 12} y="52" fill={LUX_MUTED} fontSize="6" fontFamily={sans}>
          All Files
        </text>
        <text x={mainX + 56} y="52" fill={LUX_SUBTLE} fontSize="6" fontFamily={mono}>
          / Twins / Stream / V3
        </text>
        <rect x={mainX + 248} y="42" width="40" height="14" rx="3" fill="#1c1a17" stroke="#3a3632" strokeWidth="0.45" />
        <text x={mainX + 256} y="52" fill={LUX_MUTED} fontSize="5.5" fontFamily={sans}>
          Share
        </text>
        <rect x={mainX + 296} y="42" width="52" height="14" rx="3" fill="#1c1a17" stroke="#3a3632" strokeWidth="0.45" />
        <text x={mainX + 304} y="52" fill={LUX_MUTED} fontSize="5.5" fontFamily={sans}>
          Sort ▾
        </text>
        <rect x={mainX + 356} y="42" width="46" height="14" rx="3" fill="#1c1a17" stroke="#3a3632" strokeWidth="0.45" />
        <text x={mainX + 364} y="52" fill={LUX_MUTED} fontSize="5.5" fontFamily={sans}>
          List view
        </text>
        <text x={W - 92} y="52" fill={LUX_SUBTLE} fontSize="5.5" fontFamily={mono}>
          12 items
        </text>

        {/* Folder tiles — silver-gray */}
        {[
          { x: mainX + 8, label: "Ledger" },
          { x: mainX + 88, label: "Twins" },
          { x: mainX + 168, label: "Exports" },
        ].map((f) => (
          <g key={f.label} transform={`translate(${f.x}, 62)`}>
            <rect width="68" height="44" rx="4" fill="url(#dbxw-card-face)" stroke="#3f3a35" strokeWidth="0.55" />
            <BoxFolderGlyph x={8} y={6} w={26} gradientId="dbxw-folder-dbx" />
            <text x={8} y={40} fill={LUX_IVORY} fontSize="7" fontFamily={sans}>
              {f.label}
            </text>
          </g>
        ))}

        {/* Table header */}
        <rect x={mainX + 8} y="108" width={W - mainX - 32} height="11" fill="#0e0c0b" opacity="0.65" />
        <line x1={mainX + 8} y1="119" x2={W - 24} y2="119" stroke="#3a3632" strokeWidth="0.45" />
        <text x={mainX + 26} y="116" fill={LUX_SUBTLE} fontSize="5.5" fontFamily={sans} letterSpacing="0.08em">
          Name
        </text>
        <text x={mainX + 200} y="116" fill={LUX_SUBTLE} fontSize="5.5" fontFamily={sans} letterSpacing="0.04em">
          Modified
        </text>
        <text x={W - 72} y="116" fill={LUX_SUBTLE} fontSize="5.5" fontFamily={sans}>
          Size
        </text>

        {[
          { y: 126, name: "TwinStream.ts", ext: "TS", sz: "128 KB", mod: "Today · 2:14 PM", hi: true },
          { y: 140, name: "Sync.manifest.json", ext: "JSON", sz: "4 KB", mod: "May 1 · 9:02", hi: false },
          { y: 154, name: "Settlement.worker.ts", ext: "TS", sz: "52 KB", mod: "Apr 28", hi: false },
        ].map((row) => (
          <g key={row.name}>
            <rect
              x={mainX + 8}
              y={row.y - 8}
              width={W - mainX - 32}
              height="13"
              fill={row.hi ? LUX_ROW_SEL : "transparent"}
              stroke={row.hi ? LUX_ACCENT_MUTED : "#2e2b27"}
              strokeWidth={row.hi ? 0.45 : 0.25}
              opacity={row.hi ? 1 : 0.92}
            />
            <line x1={mainX + 8} y1={row.y + 6} x2={W - 24} y2={row.y + 6} stroke="#2e2b27" strokeWidth="0.35" opacity="0.65" />
            <rect
              x={mainX + 12}
              y={row.y - 5}
              width="5.5"
              height="5.5"
              rx="1"
              fill={row.hi ? LUX_ACCENT : "#151311"}
              stroke={row.hi ? LUX_ACCENT : LUX_SUBTLE}
              strokeWidth="0.6"
            />
            {row.hi && (
              <path
                d={`M${mainX + 13.6} ${row.y - 2.2}l1.2 1.2 2.4-2.6`}
                stroke={LUX_IVORY}
                strokeWidth="0.85"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            <rect x={mainX + 22} y={row.y - 4.5} width="5.5" height="5.5" rx="1.1" fill={LUX_FILE} stroke={LUX_FILE_DEEP} strokeWidth="0.35" />
            <text x={mainX + 32} y={row.y + 1} fill={LUX_IVORY} fontSize="6.5" fontFamily={mono}>
              {row.name}
            </text>
            <text x={mainX + 200} y={row.y + 1} fill={LUX_MUTED} fontSize="5.5" fontFamily={sans}>
              {row.mod}
            </text>
            <text x={W - 72} y={row.y + 1} fill={LUX_MUTED} fontSize="5.5" fontFamily={mono}>
              {row.sz}
            </text>
            <text x={W - 28} y={row.y + 1} fill={LUX_SUBTLE} fontSize="5.5" fontFamily={mono} textAnchor="end">
              {row.ext}
            </text>
            {row.hi && <rect x={mainX + 8} y={row.y - 8} width="2" height="13" rx="0.5" fill={LUX_ACCENT} />}
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 300 312"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="dbxh-main" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#13120f" />
          <stop offset="55%" stopColor="#151311" />
          <stop offset="100%" stopColor="#1a1815" />
        </linearGradient>
        <linearGradient id="dbxh-folder-dbx" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={DROPBOX_BLUE_SOFT} />
          <stop offset="45%" stopColor={DROPBOX_BLUE} />
          <stop offset="100%" stopColor={DROPBOX_BLUE_DEEP} />
        </linearGradient>
        <linearGradient id="dbxh-card-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1816" />
          <stop offset="100%" stopColor="#12100e" />
        </linearGradient>
        <linearGradient id="dbxh-rim" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={LUX_SHEEN} stopOpacity="0.22" />
          <stop offset="35%" stopColor="#4a4540" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1c1a18" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="dbxh-accent-plate" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={DROPBOX_BLUE_SOFT} />
          <stop offset="50%" stopColor={DROPBOX_BLUE} />
          <stop offset="100%" stopColor={DROPBOX_BLUE_DEEP} />
        </linearGradient>
        <filter id="dbxh-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="#000" floodOpacity="0.2" />
        </filter>
      </defs>
      <g filter="url(#dbxh-shadow)">
        <rect x="14" y="14" width="272" height="284" rx="12" fill="#11100e" stroke="url(#dbxh-rim)" strokeWidth="1" />
      </g>
      <rect x="14" y="14" width="272" height="26" rx="12" fill="#0e0c0b" />
      <rect x="14" y="30" width="272" height="10" fill="#0e0c0b" />
      <rect x="26" y="20" width="16" height="14" rx="3" fill="url(#dbxh-accent-plate)" />
      <path d="M31 25h6M34 22.5v5" stroke={LUX_IVORY} strokeWidth="1" strokeLinecap="round" opacity="0.92" />
      <text x="48" y="30" fill={LUX_IVORY} fontSize="8.5" fontFamily={sans} fontWeight="600" letterSpacing="0.08em">
        Content Cloud
      </text>
      <rect x="126" y="19" width="88" height="16" rx="8" fill="#12100e" stroke="#3a3632" strokeWidth="0.55" />
      <circle cx="136" cy="27" r="2.5" stroke={LUX_SUBTLE} strokeWidth="0.7" fill="none" />
      <text x="144" y="30" fill={LUX_MUTED} fontSize="6.5" fontFamily={sans}>
        Search…
      </text>
      <rect x="220" y="19" width="34" height="16" rx="4" fill="url(#dbxh-accent-plate)" />
      <text x="228" y="30" fill={LUX_IVORY} fontSize="6.5" fontFamily={sans} fontWeight="600">
        New
      </text>
      <circle cx="268" cy="27" r="6.5" fill="#2a2622" stroke="#4a4540" strokeWidth="0.5" />
      <text x="268" y="30" textAnchor="middle" fill={LUX_IVORY} fontSize="6" fontFamily={sans} fontWeight="600">
        JD
      </text>

      <rect x="14" y="40" width="92" height="258" fill="#11100e" />
      <line x1="106" y1="40" x2="106" y2="290" stroke="#2e2b27" strokeWidth="1" />
      <text x="24" y="54" fill={LUX_SUBTLE} fontSize="6" fontFamily={sans} fontWeight="600" letterSpacing="0.06em">
        Favorites
      </text>
      <rect x="15" y="59" width="3" height="14" rx="1" fill={LUX_ACCENT} />
      <SmallNavIcon x={23} y={60} kind="folder" active />
      <text x="48" y="70" fill={LUX_IVORY} fontSize="7.5" fontFamily={sans} fontWeight="600">
        All Files
      </text>
      <SmallNavIcon x={23} y={74} kind="clock" />
      <text x="48" y="84" fill={LUX_MUTED} fontSize="7.5" fontFamily={sans}>
        Recents
      </text>
      <SmallNavIcon x={23} y={88} kind="people" />
      <text x="48" y="98" fill={LUX_MUTED} fontSize="7.5" fontFamily={sans}>
        Shared
      </text>
      <text x="24" y="112" fill={LUX_SUBTLE} fontSize="6" fontFamily={sans} fontWeight="600" letterSpacing="0.06em">
        Folders
      </text>
      <BoxFolderGlyph x={23} y={116} w={16} gradientId="dbxh-folder-dbx" />
      <text x="48" y="129" fill={LUX_IVORY} fontSize="7.5" fontFamily={sans}>
        Twins
      </text>
      <BoxFolderGlyph x={23} y={135} w={16} gradientId="dbxh-folder-dbx" />
      <text x="48" y="148" fill={LUX_IVORY} fontSize="7.5" fontFamily={sans}>
        Stems
      </text>
      <BoxFolderGlyph x={23} y={154} w={16} gradientId="dbxh-folder-dbx" />
      <text x="48" y="167" fill={LUX_IVORY} fontSize="7.5" fontFamily={sans}>
        Contracts
      </text>

      <rect x="112" y="40" width="166" height="250" rx="6" fill="url(#dbxh-main)" stroke="#3a3632" strokeWidth="0.5" />
      <rect x="118" y="46" width="154" height="28" rx="4" fill="#151311" />
      <line x1="118" y1="74" x2="272" y2="74" stroke="#2e2b27" strokeWidth="0.5" />
      <text x="124" y="60" fill={LUX_MUTED} fontSize="6" fontFamily={sans}>
        All Files
      </text>
      <text x="124" y="69" fill={LUX_SUBTLE} fontSize="5.5" fontFamily={mono}>
        / Library / Dataset V3
      </text>
      <rect x="210" y="52" width="28" height="12" rx="3" fill="#1c1a17" stroke="#3a3632" strokeWidth="0.4" />
      <text x="216" y="61" fill={LUX_MUTED} fontSize="5" fontFamily={sans}>
        Share
      </text>
      <rect x="242" y="52" width="28" height="12" rx="3" fill="#1c1a17" stroke="#3a3632" strokeWidth="0.4" />
      <text x="248" y="61" fill={LUX_MUTED} fontSize="5" fontFamily={sans}>
        Sort
      </text>

      {[0, 1].map((row) =>
        [0, 1].map((col) => {
          const x = 118 + col * 81;
          const y = 82 + row * 64;
          const names = ["Dataset V3", "Snapshots", "Releases", "Vault"];
          return (
            <g key={`${row}-${col}`}>
              <rect x={x} y={y} width="73" height="56" rx="5" fill="url(#dbxh-card-face)" stroke="#3f3a35" strokeWidth="0.55" />
              <BoxFolderGlyph x={x + 8} y={y + 8} w={28} gradientId="dbxh-folder-dbx" />
              <text x={x + 8} y={y + 50} fill={LUX_IVORY} fontSize="7" fontFamily={sans}>
                {names[row * 2 + col]}
              </text>
            </g>
          );
        })
      )}

      <rect x="118" y="212" width="154" height="10" fill="#0e0c0b" opacity="0.55" />
      <line x1="118" y1="222" x2="272" y2="222" stroke="#3a3632" strokeWidth="0.45" />
      <text x="130" y="219" fill={LUX_SUBTLE} fontSize="5" fontFamily={sans} letterSpacing="0.06em">
        Name
      </text>
      <text x="198" y="219" fill={LUX_SUBTLE} fontSize="5" fontFamily={sans}>
        Modified
      </text>
      <text x="262" y="219" fill={LUX_SUBTLE} fontSize="5" fontFamily={sans} textAnchor="end">
        Kind
      </text>

      {[
        { name: "TwinStream.ts", t: "TS", hi: true, y: 228, mod: "Today" },
        { name: "Schema.types.ts", t: "TS", hi: false, y: 242, mod: "May 1" },
        { name: "Bundle.json", t: "JSON", hi: false, y: 256, mod: "Apr 30" },
        { name: "Archive.zip", t: "ZIP", hi: false, y: 270, mod: "Apr 28" },
      ].map((f) => (
        <g key={f.name}>
          <rect
            x="118"
            y={f.y - 6}
            width="154"
            height="12"
            fill={f.hi ? LUX_ROW_SEL : "transparent"}
            stroke={f.hi ? LUX_ACCENT_MUTED : "#2e2b27"}
            strokeWidth={f.hi ? 0.4 : 0.22}
          />
          <line x1="118" y1={f.y + 7} x2="272" y2={f.y + 7} stroke="#2e2b27" strokeWidth="0.32" opacity="0.65" />
          {f.hi && <rect x="118" y={f.y - 6} width="2" height="12" fill={LUX_ACCENT} />}
          <rect
            x="122"
            y={f.y - 3.5}
            width="5"
            height="5"
            rx="0.9"
            fill={f.hi ? LUX_ACCENT : "#151311"}
            stroke={f.hi ? LUX_ACCENT : LUX_SUBTLE}
            strokeWidth="0.55"
          />
          {f.hi && (
            <path
              d={`M 123.1 ${f.y - 2.1}l0.85 0.85 1.75-1.95`}
              stroke={LUX_IVORY}
              strokeWidth="0.65"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          <rect x="130" y={f.y - 3} width="5.5" height="5.5" rx="1" fill={LUX_FILE} stroke={LUX_FILE_DEEP} strokeWidth="0.35" />
          <text x="140" y={f.y + 3.5} fill={LUX_IVORY} fontSize="6.5" fontFamily={mono}>
            {f.name}
          </text>
          <text x="198" y={f.y + 3.5} fill={LUX_MUTED} fontSize="5.5" fontFamily={sans}>
            {f.mod}
          </text>
          <text x="262" y={f.y + 3.5} fill={LUX_SUBTLE} fontSize="5.5" fontFamily={mono} textAnchor="end">
            {f.t}
          </text>
        </g>
      ))}

      <text x="118" y="302" fill={LUX_SUBTLE} fontSize="5" fontFamily={mono} letterSpacing="0.04em">
        2.4 GB · Synced · Private vault
      </text>
    </svg>
  );
}

/** Dropbox-style folder icon — rounded body + left tab, blue gradient (product UI shape, not enterprise table chrome). */
function BoxFolderGlyph({ x, y, w, gradientId }: { x: number; y: number; w: number; gradientId: string }) {
  const s = w / 32;
  const d = `M 0 ${8 * s} L 0 ${22 * s} Q 0 ${26 * s} ${4 * s} ${26 * s} L ${28 * s} ${26 * s} Q ${32 * s} ${26 * s} ${32 * s} ${22 * s} L ${32 * s} ${10 * s} Q ${32 * s} ${8 * s} ${30 * s} ${8 * s} L ${14 * s} ${8 * s} L ${10 * s} ${4 * s} L ${4 * s} ${4 * s} Q 0 ${4 * s} 0 ${8 * s} Z`;
  const foldY = 8.2 * s;
  const hi = Math.max(0.3, w * 0.022);
  return (
    <g transform={`translate(${x},${y})`}>
      <path
        d={d}
        fill={`url(#${gradientId})`}
        stroke={DROPBOX_BLUE_DEEP}
        strokeWidth={hi}
        strokeOpacity={0.28}
        strokeLinejoin="round"
      />
      <line x1={3.2 * s} y1={foldY} x2={30 * s} y2={foldY} stroke="#fff" strokeOpacity={0.2} strokeWidth={hi} strokeLinecap="round" />
    </g>
  );
}

/** Small sidebar glyphs (folder / recents / shared). */
function SmallNavIcon({ x, y, kind, active }: { x: number; y: number; kind: "folder" | "clock" | "people"; active?: boolean }) {
  const stroke = active ? LUX_ACCENT : LUX_SUBTLE;
  const fill = active ? "rgba(0, 97, 254, 0.16)" : "#1c1a17";
  return (
    <g transform={`translate(${x},${y})`}>
      <rect width="14" height="14" rx="3" fill={fill} stroke={stroke} strokeWidth="0.45" opacity={active ? 1 : 0.9} />
      {kind === "folder" && <path d="M4 11V5.5h3.2l0.9 1.2H12V11H4Z" stroke={stroke} strokeWidth="0.65" fill="none" strokeLinejoin="round" />}
      {kind === "clock" && (
        <>
          <circle cx="7" cy="7.5" r="3.2" stroke={stroke} strokeWidth="0.65" fill="none" />
          <path d="M7 5.8V8l1.6 1" stroke={stroke} strokeWidth="0.6" strokeLinecap="round" />
        </>
      )}
      {kind === "people" && (
        <>
          <circle cx="5.2" cy="6" r="1.35" stroke={stroke} strokeWidth="0.55" fill="none" />
          <circle cx="8.8" cy="6" r="1.35" stroke={stroke} strokeWidth="0.55" fill="none" />
          <path d="M4 11.2c0-1.6 0.9-2.2 2-2.2s2 0.6 2 2.2M8 11.2c0-1.4 0.7-2 1.7-2.1" stroke={stroke} strokeWidth="0.55" fill="none" strokeLinecap="round" />
        </>
      )}
    </g>
  );
}

/** Full IDE + Agent chat — Cursor-inspired (editor left, talk panel right). */
export function LlmChatSurfaceIllustration({ className }: { className?: string }) {
  const w = 720;
  const h = 280;
  const mono = "ui-monospace, SF Mono, Monaco, monospace";
  const sans = "ui-sans-serif, system-ui, sans-serif";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="cursorShell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#232326" />
          <stop offset="100%" stopColor="#18181a" />
        </linearGradient>
        <linearGradient id="cursorChatBg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1c1c1f" />
          <stop offset="100%" stopColor="#161618" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} rx="10" fill="url(#cursorShell)" />
      <rect x="0" y="0" width={w} height="22" fill="#2b2b30" />
      <text x="12" y="15" fill="#8c8c8e" fontSize="8" fontFamily={mono} letterSpacing="0.04em">
        Consequence
      </text>
      <text x={w / 2} y="15" textAnchor="middle" fill="#6a6a6e" fontSize="7" fontFamily={mono}>
        velvet_clip.mid — Piano Roll
      </text>
      {/* Activity bar */}
      <rect x="0" y="22" width="40" height={h - 22} fill="#252528" />
      {[32, 52, 72, 92].map((y, i) => (
        <rect key={y} x="12" y={y} width="16" height="14" rx="3" fill="#3d3d42" opacity={0.35 + i * 0.08} />
      ))}
      <rect x="10" y="238" width="20" height="20" rx="4" fill="#7FD4CC" opacity="0.22" />
      {/* File tree */}
      <rect x="40" y="22" width="118" height={h - 22} fill="#1f1f23" />
      <text x="50" y="38" fill="#5a5a5e" fontSize="7" fontFamily={mono}>
        EXPLORER
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="48" y={48 + i * 18} width="100" height="12" rx="2" fill="#ffffff" opacity={i === 0 ? 0.06 : 0.03} />
          <text x="54" y={57 + i * 18} fill={i === 0 ? "#d4d4d8" : "#8b8b90"} fontSize="8" fontFamily={mono}>
            {i === 0
              ? "patterns/velvet_clip.mid"
              : i === 1
                ? "stems/vocal.wav"
                : i === 2
                  ? "midi/bass_ref.mid"
                  : i === 3
                    ? "arrangements/drop.json"
                    : "sessions/atelier.md"}
          </text>
        </g>
      ))}
      {/* Piano roll — MIDI notes */}
      <rect x="158" y="22" width="292" height={h - 22} fill="#1a1a1d" />
      <rect x="158" y="22" width="34" height={h - 22} fill="#161618" />
      <text x="166" y="36" fill="#5a5a5e" fontSize="6" fontFamily={mono} letterSpacing="0.06em">
        PITCH
      </text>
      {["G5", "E5", "C5", "G4", "E4", "C4", "A3", "F3"].map((note, i) => (
        <text key={note} x="182" y={52 + i * 26} fill="#6b6b70" fontSize="7" fontFamily={mono} textAnchor="end">
          {note}
        </text>
      ))}
      <rect x="188" y="40" width="254" height={h - 72} rx="3" fill="#141418" stroke="#2d2d32" strokeWidth="0.6" />
      {/* Beat grid */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <line
          key={`v-${i}`}
          x1={192 + i * 19.5}
          y1="44"
          x2={192 + i * 19.5}
          y2={h - 36}
          stroke="#ffffff"
          strokeOpacity={i % 4 === 0 ? "0.09" : "0.03"}
          strokeWidth="0.5"
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <line
          key={`h-${i}`}
          x1="192"
          y1={48 + i * 26}
          x2="438"
          y2={48 + i * 26}
          stroke="#ffffff"
          strokeOpacity="0.04"
          strokeWidth="0.5"
        />
      ))}
      {/* Beat ruler */}
      {[1, 2, 3, 4].map((b, i) => (
        <text key={b} x={200 + i * 58} y="52" fill="#5c6370" fontSize="6" fontFamily={mono}>
          {b}
        </text>
      ))}
      {/* MIDI note blocks — lane rows align with pitch grid */}
      <rect x="198" y="114" width="34" height="18" rx="2" fill="#7FD4CC" opacity="0.72" />
      <rect x="236" y="88" width="30" height="18" rx="2" fill="#c4a574" opacity="0.65" />
      <rect x="272" y="62" width="46" height="18" rx="2" fill="#9b7dd4" opacity="0.58" />
      <rect x="326" y="114" width="30" height="18" rx="2" fill="#7FD4CC" opacity="0.55" />
      <rect x="362" y="140" width="42" height="18" rx="2" fill="#c4a574" opacity="0.62" />
      <rect x="292" y="166" width="26" height="18" rx="2" fill="#7FD4CC" opacity="0.48" />
      <rect x="324" y="166" width="50" height="18" rx="2" fill="#5dade2" opacity="0.45" />
      <rect x="384" y="88" width="22" height="18" rx="2" fill="#9b7dd4" opacity="0.5" />
      <rect x="408" y="114" width="28" height="18" rx="2" fill="#7FD4CC" opacity="0.6" />
      <text x="196" y="200" fill="#5c6370" fontSize="6" fontFamily={mono}>
        MIDI · Ch 1 · groove · 1/16
      </text>
      <rect x="196" y="208" width="78" height="10" rx="2" fill="#7FD4CC" opacity="0.12" />
      <text x="200" y="216" fill="#7FD4CC" fontSize="6" fontFamily={mono}>
        Export clip ✓
      </text>
      {/* Chat / Agent panel */}
      <rect x="450" y="22" width={w - 450} height={h - 22} fill="url(#cursorChatBg)" />
      <line x1="450" y1="22" x2="450" y2={h} stroke="#2d2d32" strokeWidth="1" />
      <text x="462" y="36" fill="#e4e4e7" fontSize="9" fontFamily={sans} fontWeight="600">
        Agent
      </text>
      <rect x="518" y="28" width="52" height="14" rx="7" fill="#2a2a2e" stroke="#3f3f46" strokeWidth="0.6" />
      <text x="528" y="38" fill="#a1a1aa" fontSize="6" fontFamily={mono}>
        GPT-5
      </text>
      <rect x="670" y="28" width="40" height="14" rx="4" fill="#27272a" />
      <text x="678" y="38" fill="#71717a" fontSize="6" fontFamily={mono}>
        @twin
      </text>
      {/* User msg */}
      <rect x="470" y="56" width="228" height="36" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="0.6" />
      <text x="482" y="72" fill="#d4d4d8" fontSize="8" fontFamily={sans}>
        What happens next for this stem?
      </text>
      <text x="646" y="86" fill="#52525b" fontSize="6" fontFamily={mono}>
        You
      </text>
      {/* Assistant */}
      <rect x="462" y="102" width="244" height="72" rx="8" fill="#1f1f24" stroke="#333338" strokeWidth="0.6" />
      <rect x="470" y="110" width="10" height="10" rx="2" fill="#7FD4CC" opacity="0.35" />
      <text x="486" y="119" fill="#a1a1aa" fontSize="7" fontFamily={mono}>
        Assistant
      </text>
      <rect x="470" y="128" width="228" height="38" rx="4" fill="#121214" stroke="#2d2d32" strokeWidth="0.5" />
      <text x="476" y="142" fill="#7FD4CC" fontSize="6" fontFamily={mono}>
        Notes out
      </text>
      <text x="520" y="142" fill="#d4d4d8" fontSize="6" fontFamily={mono}>
        8 · vel 72–102
      </text>
      <text x="476" y="152" fill="#8b8b90" fontSize="6" fontFamily={mono}>
        C4 E4 G4 · 9.4s gate
      </text>
      <text x="476" y="162" fill="#6b9955" fontSize="6" fontFamily={mono}>
        MIDI CC
      </text>
      <text x="512" y="162" fill="#d4d4d8" fontSize="6" fontFamily={mono}>
        11→brightness · 1→mod
      </text>
      {/* Composer */}
      <rect x="462" y="230" width="244" height="36" rx="10" fill="#252528" stroke="#3f3f46" strokeWidth="0.8" />
      <text x="476" y="252" fill="#71717a" fontSize="9" fontFamily={sans}>
        Ask what happens next…
      </text>
      <rect x="678" y="240" width="20" height="20" rx="5" fill="#3f3f46" />
      <path d="M684 248 L692 250 L684 252" stroke="#e4e4e7" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Tall portrait Agent / chat panel for manifesto and side columns. */
export function LlmChatTallIllustration({ className }: { className?: string }) {
  const w = 300;
  const h = 520;
  const mono = "ui-monospace, SF Mono, Monaco, monospace";
  const sans = "ui-sans-serif, system-ui, sans-serif";
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="llmTallShell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#232326" />
          <stop offset="100%" stopColor="#18181a" />
        </linearGradient>
        <linearGradient id="llmTallChat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c1c1f" />
          <stop offset="100%" stopColor="#141416" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} rx="10" fill="url(#llmTallShell)" />
      <rect x="0" y="0" width={w} height="24" fill="#2b2b30" />
      <circle cx="14" cy="12" r="3.5" fill="#ff5f57" />
      <circle cx="26" cy="12" r="3.5" fill="#febc2e" />
      <circle cx="38" cy="12" r="3.5" fill="#28c840" />
      <text x="52" y="16" fill="#8c8c8e" fontSize="8" fontFamily={mono} letterSpacing="0.04em">
        Consequence
      </text>
      <text x={w - 12} y="16" textAnchor="end" fill="#6a6a6e" fontSize="7" fontFamily={mono}>
        velvet_clip.mid
      </text>

      <rect x="0" y="24" width={w} height={h - 24} fill="url(#llmTallChat)" />
      <rect x="12" y="36" width="56" height="16" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="0.6" />
      <text x="22" y="47" fill="#e4e4e7" fontSize="8" fontFamily={sans} fontWeight="600">
        Agent
      </text>
      <rect x="74" y="38" width="44" height="12" rx="6" fill="#2a2a2e" stroke="#3f3f46" strokeWidth="0.5" />
      <text x="82" y="47" fill="#a1a1aa" fontSize="6" fontFamily={mono}>
        GPT-5
      </text>
      <rect x={w - 52} y="38" width="40" height="12" rx="4" fill="#27272a" />
      <text x={w - 44} y="47" fill="#71717a" fontSize="6" fontFamily={mono}>
        @twin
      </text>

      <rect x="16" y="64" width={w - 32} height="40" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="0.6" />
      <text x="28" y="82" fill="#d4d4d8" fontSize="9" fontFamily={sans}>
        What happens next for this stem?
      </text>
      <text x={w - 28} y="98" textAnchor="end" fill="#52525b" fontSize="6" fontFamily={mono}>
        You
      </text>

      <rect x="12" y="116" width={w - 24} height="88" rx="8" fill="#1f1f24" stroke="#333338" strokeWidth="0.6" />
      <rect x="20" y="124" width="10" height="10" rx="2" fill="#7FD4CC" opacity="0.35" />
      <text x="36" y="133" fill="#a1a1aa" fontSize="7" fontFamily={mono}>
        Assistant
      </text>
      <rect x="20" y="142" width={w - 40} height="52" rx="4" fill="#121214" stroke="#2d2d32" strokeWidth="0.5" />
      <text x="26" y="156" fill="#7FD4CC" fontSize="7" fontFamily={mono}>
        Notes out · 8 · vel 72–102
      </text>
      <text x="26" y="170" fill="#d4d4d8" fontSize="7" fontFamily={mono}>
        C4 E4 G4 · harmonic lift +12%
      </text>
      <text x="26" y="184" fill="#6b9955" fontSize="7" fontFamily={mono}>
        Twin forecast · engagement ↑
      </text>

      <rect x="16" y="216" width={w - 32} height="36" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="0.6" />
      <text x="28" y="238" fill="#d4d4d8" fontSize="8" fontFamily={sans}>
        Rehearse the bridge in D minor?
      </text>

      <rect x="12" y="264" width={w - 24} height="96" rx="8" fill="#1f1f24" stroke="#333338" strokeWidth="0.6" />
      <rect x="20" y="272" width="10" height="10" rx="2" fill="#7FD4CC" opacity="0.35" />
      <text x="36" y="281" fill="#a1a1aa" fontSize="7" fontFamily={mono}>
        Assistant
      </text>
      <rect x="20" y="290" width={w - 40} height="60" rx="4" fill="#121214" stroke="#2d2d32" strokeWidth="0.5" />
      <text x="26" y="304" fill="#8b8b90" fontSize="7" fontFamily={mono}>
        10k paths · Monte Carlo
      </text>
      <text x="26" y="318" fill="#d4d4d8" fontSize="7" fontFamily={mono}>
        Median lift +18% if bridge lands bar 17
      </text>
      <text x="26" y="332" fill="#c4a574" fontSize="7" fontFamily={mono}>
        Harmony: i–VI–III–VII resolved
      </text>
      <text x="26" y="346" fill="#7FD4CC" fontSize="7" fontFamily={mono}>
        Ledger · split preview ready
      </text>

      <rect x="12" y="372" width={w - 24} height="56" rx="8" fill="#1a1a1e" stroke="#2d2d32" strokeWidth="0.5" />
      <text x="20" y="388" fill="#5c6370" fontSize="6" fontFamily={mono} letterSpacing="0.06em">
        LIVE COMPOSITION
      </text>
      <rect x="20" y="396" width={w - 40} height="6" rx="2" fill="#7FD4CC" opacity="0.25" />
      <rect x="20" y="396" width={(w - 40) * 0.62} height="6" rx="2" fill="#7FD4CC" opacity="0.7" />
      <text x="20" y="418" fill="#71717a" fontSize="6" fontFamily={mono}>
        Composer A · B · C in session
      </text>

      <rect x="12" y={h - 52} width={w - 24} height="40" rx="10" fill="#252528" stroke="#3f3f46" strokeWidth="0.8" />
      <text x="24" y={h - 28} fill="#71717a" fontSize="9" fontFamily={sans}>
        Ask what happens next…
      </text>
      <rect x={w - 44} y={h - 42} width="24" height="24" rx="6" fill="#3f3f46" />
      <path
        d={`M${w - 38} ${h - 32} L${w - 30} ${h - 30} L${w - 38} ${h - 28}`}
        stroke="#e4e4e7"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Square glazed window + grand piano (plan view) on top; synth rack below. */
export function SynthPluginDesktopIllustration({ className }: { className?: string }) {
  const W = 320;
  const H = 356;
  const mono = "ui-monospace, monospace";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="plugSqFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2630" />
          <stop offset="100%" stopColor="#141218" />
        </linearGradient>
        <linearGradient id="grandRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#181410" />
          <stop offset="45%" stopColor="#0b0908" />
          <stop offset="100%" stopColor="#221c1a" />
        </linearGradient>
        <linearGradient id="grandWood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5c4034" />
          <stop offset="100%" stopColor="#241a16" />
        </linearGradient>
        <radialGradient id="grandHarp" cx="42%" cy="38%" r="58%">
          <stop offset="0%" stopColor="#6b4e3e" stopOpacity="0.45" />
          <stop offset="65%" stopColor="#1a1412" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#080605" />
        </radialGradient>
      </defs>
      <rect x="7" y="9" width={W - 14} height={H - 18} rx="14" fill="#000" opacity="0.3" />
      <rect x="4" y="4" width={W - 8} height={H - 8} rx="12" fill="#0c0c0e" stroke="#2a282e" strokeWidth="1" />
      <rect x="4" y="4" width={W - 8} height="22" rx="12" fill="#3c3842" />
      <rect x="4" y="16" width={W - 8} height="10" fill="#3c3842" />
      <circle cx="17" cy="15" r="3" fill="#ff5f57" />
      <circle cx="29" cy="15" r="3" fill="#febc2e" />
      <circle cx="41" cy="15" r="3" fill="#28c840" />
      <text x={W / 2} y="17" textAnchor="middle" fill="#d4c4b0" fontSize="7" fontFamily={mono} fontWeight="600" letterSpacing="0.05em">
        CONSEQUENCE ANALOG — VST3
      </text>

      <rect x="8" y="28" width={W - 16} height={H - 36} rx="10" fill="url(#plugSqFace)" stroke="#5c5360" strokeWidth="0.75" />

      {/* Square window (equal sides) — grand piano from above */}
      <rect x="24" y="36" width="272" height="272" rx="8" fill="#0a0a0e" stroke="#94a3b8" strokeWidth="1.6" />
      <rect x="28" y="40" width="264" height="264" rx="6" fill="#050506" stroke="#334155" strokeWidth="0.55" />

      {/* Grand piano — bird&apos;s-eye: tail curve left, straight keyboard edge bottom */}
      <path
        d="M 98 282 L 222 282 L 228 280 C 246 272 254 252 254 228 C 254 158 208 92 140 78 C 82 66 38 112 38 176 C 38 220 62 268 98 282 Z"
        fill="url(#grandRim)"
        stroke="#2a2420"
        strokeWidth="1"
      />
      <ellipse cx="146" cy="178" rx="82" ry="68" fill="url(#grandHarp)" />
      <ellipse cx="146" cy="178" rx="66" ry="54" fill="url(#grandWood)" opacity="0.4" />
      {/* Brass / bridge arc */}
      <path d="M 108 132 Q 146 118 184 132" stroke="#a08b6a" strokeWidth="0.85" opacity="0.55" fill="none" strokeLinecap="round" />
      {/* Open lid line (swept curve like a concert grand) */}
      <path d="M 46 232 Q 96 120 220 92" stroke="#3d3632" strokeWidth="1.4" opacity="0.7" fill="none" strokeLinecap="round" />
      {/* Tail spike accent */}
      <path d="M 46 178 Q 32 198 44 230" stroke="#1a1512" strokeWidth="2" opacity="0.9" fill="none" strokeLinecap="round" />
      {/* Key bed shadow */}
      <rect x="92" y="268" width="136" height="12" rx="2" fill="#000" opacity="0.5" />
      <PianoKeys x0={96} y0={274} totalW={128} nWhite={11} keyH={10} />

      {/* Rack: scopes, CUTOFF, ADSR — below square */}
      <rect x="14" y="314" width="292" height="34" rx="6" fill="#121014" stroke="#3d3845" strokeWidth="0.5" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${22 + i * 54}, 320)`}>
          <rect width="46" height="22" rx="3" fill="#0a0a0c" stroke="#2d2d32" strokeWidth="0.45" />
          <path
            d={`M 6 14 Q 12 8 20 14 T 38 12`}
            stroke={i === 0 ? "#7FD4CC" : i === 1 ? "#c4a574" : "#9b7dd4"}
            strokeWidth="0.95"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      ))}
      <circle cx="218" cy="331" r="12" fill="#25232a" stroke="#c4a574" strokeWidth="1" />
      <circle cx="218" cy="331" r="8" fill="#1a181e" stroke="#453d4a" strokeWidth="0.5" />
      <line x1="218" y1="331" x2="218" y2="322" stroke="#c4a574" strokeWidth="1.6" strokeLinecap="round" />
      <text x="218" y="352" textAnchor="middle" fill="#8a7d6b" fontSize="6" fontFamily={mono}>
        CUTOFF
      </text>
      <path
        d="M 250 322 L 260 322 263 333 269 333 272 322 278 322 281 336"
        stroke="#7a7382"
        strokeWidth="1"
        fill="none"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <rect x="246" y="338" width="52" height="3" rx="1" fill="#c4a574" opacity="0.28" />
    </svg>
  );
}

/** Piano keys — whites + chromatic blacks (2/3 pattern per octave). */
function PianoKeys({
  x0,
  y0,
  totalW,
  nWhite = 14,
  keyH = 28,
}: {
  x0: number;
  y0: number;
  totalW: number;
  nWhite?: number;
  keyH?: number;
}) {
  const keyW = totalW / nWhite;
  const blackW = Math.max(7, keyW * 0.52);
  const blackH = keyH * 0.55;
  const hasBlackBetween = (whiteIndexFromLeft: number) => {
    const p = whiteIndexFromLeft % 7;
    return p === 0 || p === 1 || p === 3 || p === 4 || p === 5;
  };
  const blockH = keyH + 8;
  return (
    <g>
      <rect x={x0 - 3} y={y0 - 2} width={totalW + 6} height={blockH} rx="5" fill="#050506" stroke="#27272f" strokeWidth="0.5" />
      <rect x={x0 - 2} y={y0 - 1} width={totalW + 4} height="4" rx="1.5" fill="#5c1919" opacity="0.7" />
      {Array.from({ length: nWhite }).map((_, k) => (
        <rect
          key={`pw-${k}`}
          x={x0 + k * keyW + 0.4}
          y={y0 + 3}
          width={keyW - 0.8}
          height={keyH - 1}
          rx="1.5"
          fill="#f7f4ed"
          stroke="#b0aaa0"
          strokeWidth="0.4"
        />
      ))}
      {Array.from({ length: nWhite - 1 }).map((_, i) => {
        if (!hasBlackBetween(i)) return null;
        const bx = x0 + (i + 1) * keyW - blackW / 2;
        return (
          <rect
            key={`pb-${i}`}
            x={bx}
            y={y0 + 3}
            width={blackW}
            height={blackH}
            rx="1.2"
            fill="#0c0c10"
            stroke="#25252c"
            strokeWidth="0.35"
          />
        );
      })}
    </g>
  );
}
