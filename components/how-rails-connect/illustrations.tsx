"use client";

import { useEffect, useId, useState } from "react";

const STROKE = "currentColor";
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

type ActiveProps = { active: boolean; reducedMotion: boolean };

export function HeroPillarsDiagram({ started, reducedMotion }: { started: boolean; reducedMotion: boolean }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!started || reducedMotion) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setT(i);
      if (i >= 3) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [started, reducedMotion]);

  const instantLines = reducedMotion && started;
  const line1 = instantLines || t >= 1;
  const line2 = instantLines || t >= 2;
  const line3 = instantLines || t >= 3;

  return (
    <svg
      viewBox="0 0 420 280"
      className="w-full h-auto text-ink dark:text-snow-200 max-w-md mx-auto"
      aria-hidden
    >
      <rect x="24" y="40" width="100" height="72" rx="4" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <text x="74" y="82" textAnchor="middle" className="fill-current text-[11px] font-mono tracking-wider">
        SOLANA
      </text>
      <rect x="160" y="40" width="100" height="72" rx="4" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <text x="210" y="82" textAnchor="middle" className="fill-current text-[11px] font-mono tracking-wider">
        EQUITY
      </text>
      <rect x="296" y="40" width="100" height="72" rx="4" fill="none" stroke={STROKE} strokeWidth="1.2" />
      <text x="346" y="82" textAnchor="middle" className="fill-current text-[11px] font-mono tracking-wider">
        SETTLEMENT
      </text>
      <path
        d="M 124 76 H 160"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.2"
        opacity={line1 ? 1 : 0}
        style={{ transition: `opacity 400ms ${EASE}` }}
      />
      <path
        d="M 260 76 H 296"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.2"
        opacity={line2 ? 1 : 0}
        style={{ transition: `opacity 400ms ${EASE}` }}
      />
      <path
        d="M 210 112 V 180"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.2"
        opacity={line3 ? 1 : 0}
        style={{ transition: `opacity 400ms ${EASE}` }}
      />
      <path
        d="M 74 180 L 210 220 L 346 180"
        fill="none"
        stroke={STROKE}
        strokeWidth="1"
        opacity={line3 ? 0.55 : 0}
        style={{ transition: `opacity 500ms ${EASE}` }}
      />
      <text x="210" y="252" textAnchor="middle" className="fill-current text-[10px] opacity-50 font-sans">
        Capital flow
      </text>
    </svg>
  );
}

export function EquityTimelineSvg({ active, reducedMotion }: ActiveProps) {
  const on = reducedMotion || active;
  return (
    <svg
      viewBox="0 0 320 360"
      className="w-full h-auto text-ink dark:text-snow-200 lg:sticky lg:top-28"
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <text
          key={i}
          x="28"
          y={72 + i * 88}
          className="fill-current text-[12px] font-mono opacity-70"
        >
          {String.fromCharCode(65 + i)}
        </text>
      ))}
      <line x1="56" y1="64" x2="56" y2="296" stroke={STROKE} strokeWidth="1" opacity="0.25" />
      <line x1="120" y1="48" x2="280" y2="48" stroke={STROKE} strokeWidth="1" opacity="0.25" />
      {[
        { y: 68, w: 0.72, label: "creation" },
        { y: 156, w: 0.58, label: "B joins" },
        { y: 244, w: 0.45, label: "recomputed" },
      ].map((row, idx) => (
        <g key={row.label}>
          <rect
            x="120"
            y={row.y}
            width={on ? 160 * row.w : 0}
            height="8"
            fill="currentColor"
            opacity={0.15 + idx * 0.06}
            style={{
              transition: reducedMotion ? undefined : `width 900ms ${EASE}`,
              transitionDelay: reducedMotion ? undefined : `${idx * 120}ms`,
            }}
          />
          <text x="290" y={row.y + 24} textAnchor="end" className="fill-current text-[9px] opacity-50">
            {row.label}
          </text>
        </g>
      ))}
      <path
        d="M 120 72 L 190 160 L 235 248"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.2"
        strokeDasharray="200"
        strokeDashoffset={on ? 0 : 200}
        style={{
          transition: reducedMotion ? undefined : `stroke-dashoffset 1200ms ${EASE}`,
        }}
      />
      <text x="120" y="328" className="fill-current text-[10px] opacity-45">
        time →
      </text>
    </svg>
  );
}

export function SignalWeightsBar({ active, reducedMotion }: ActiveProps) {
  const on = reducedMotion || active;
  const segments = [
    { w: 25, label: "Session", key: "s1" },
    { w: 30, label: "MIDI", key: "s2" },
    { w: 20, label: "Arrange", key: "s3" },
    { w: 15, label: "AI", key: "s4" },
    { w: 10, label: "Structure", key: "s5" },
  ];
  let x = 8;
  return (
    <svg
      viewBox="0 0 640 120"
      className="w-full h-[min(300px,28vw)] text-ink dark:text-snow-200"
      aria-hidden
    >
      <rect x="8" y="16" width="624" height="36" fill="none" stroke={STROKE} strokeWidth="1" opacity="0.35" />
      {segments.map((s, i) => {
        const start = x;
        const width = (624 * s.w) / 100;
        x += width;
        return (
          <g key={s.key}>
            <rect
              x={start}
              y="16"
              width={on ? width : 0}
              height="36"
              fill="currentColor"
              opacity={0.12 + i * 0.07}
              style={{
                transition: reducedMotion ? undefined : `width 700ms ${EASE}`,
                transitionDelay: reducedMotion ? undefined : `${i * 80}ms`,
              }}
            />
            <text
              x={start + width / 2}
              y="78"
              textAnchor="middle"
              className="fill-current text-[10px] font-mono opacity-70"
            >
              {s.label}
            </text>
            <text
              x={start + width / 2}
              y="94"
              textAnchor="middle"
              className="fill-current text-[9px] font-mono opacity-50"
            >
              {s.w}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function SolanaAccountTreeSvg({ active, reducedMotion }: ActiveProps) {
  const on = reducedMotion || active;
  const delays = [0, 80, 160, 240, 320, 400, 480];
  const nodes = [
    { x: 240, y: 24, w: 200, h: 36, t: "Composition PDA" },
    { x: 80, y: 110, w: 150, h: 28, t: "Current equity" },
    { x: 240, y: 110, w: 150, h: 28, t: "Signals" },
    { x: 400, y: 110, w: 150, h: 28, t: "Equity rules" },
    { x: 80, y: 200, w: 150, h: 24, t: "… basis_points" },
    { x: 240, y: 200, w: 150, h: 24, t: "… midi / AI" },
    { x: 400, y: 200, w: 150, h: 24, t: "… encoded rule" },
  ];
  return (
    <svg
      viewBox="0 0 480 260"
      className="w-full h-auto max-h-[400px] text-ink dark:text-snow-200 mx-auto"
      aria-hidden
    >
      {nodes.map((n, i) => (
        <g
          key={n.t}
          opacity={on ? 1 : 0}
          style={{
            transition: reducedMotion ? undefined : `opacity 400ms ${EASE}`,
            transitionDelay: reducedMotion ? undefined : `${delays[Math.min(i, delays.length - 1)]!}ms`,
          }}
        >
          <rect
            x={n.x - n.w / 2}
            y={n.y}
            width={n.w}
            height={n.h}
            rx="3"
            fill="none"
            stroke={STROKE}
            strokeWidth="1"
          />
          <text x={n.x} y={n.y + n.h / 2 + 4} textAnchor="middle" className="fill-current text-[9px] font-mono">
            {n.t}
          </text>
        </g>
      ))}
      <path
        d="M 240 60 L 80 110 M 240 60 L 240 110 M 240 60 L 400 110"
        fill="none"
        stroke={STROKE}
        strokeWidth="1"
        strokeDasharray="120"
        strokeDashoffset={on ? 0 : 120}
        style={{ transition: reducedMotion ? undefined : `stroke-dashoffset 800ms ${EASE}` }}
      />
    </svg>
  );
}

export function MongoErdSvg({ active, reducedMotion }: ActiveProps) {
  const on = reducedMotion || active;
  const boxes = [
    { x: 20, y: 20, w: 160, h: 56, label: "composition_equity" },
    { x: 220, y: 20, w: 160, h: 56, label: "contribution_signals" },
    { x: 420, y: 20, w: 160, h: 56, label: "equity_history" },
    { x: 220, y: 120, w: 200, h: 56, label: "creator_earnings_view" },
  ];
  return (
    <svg viewBox="0 0 600 200" className="w-full h-auto text-ink dark:text-snow-200 min-h-[200px]" aria-hidden>
      {boxes.map((b, i) => (
        <g
          key={b.label}
          opacity={on ? 1 : 0}
          style={{
            transition: reducedMotion ? undefined : `opacity 500ms ${EASE}`,
            transitionDelay: reducedMotion ? undefined : `${i * 100}ms`,
          }}
        >
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="4" fill="none" stroke={STROKE} strokeWidth="1" />
          <text
            x={b.x + b.w / 2}
            y={b.y + b.h / 2 + 4}
            textAnchor="middle"
            className="fill-current text-[10px] font-mono"
          >
            {b.label}
          </text>
        </g>
      ))}
      <path
        d="M 100 76 L 100 90 L 220 90 L 220 100"
        fill="none"
        stroke={STROKE}
        strokeDasharray="80"
        strokeDashoffset={on ? 0 : 80}
        style={{ transition: reducedMotion ? undefined : `stroke-dashoffset 600ms ${EASE} 200ms` }}
      />
      <path
        d="M 300 76 L 300 90 L 320 90 L 320 100"
        fill="none"
        stroke={STROKE}
        strokeDasharray="60"
        strokeDashoffset={on ? 0 : 60}
        style={{ transition: reducedMotion ? undefined : `stroke-dashoffset 600ms ${EASE} 280ms` }}
      />
      <path
        d="M 500 76 L 500 90 L 320 90"
        fill="none"
        stroke={STROKE}
        strokeDasharray="80"
        strokeDashoffset={on ? 0 : 80}
        style={{ transition: reducedMotion ? undefined : `stroke-dashoffset 600ms ${EASE} 360ms` }}
      />
    </svg>
  );
}

export function ReconciliationFlowSvg({ active, reducedMotion }: ActiveProps) {
  const on = reducedMotion || active;
  const arrowId = useId().replace(/:/g, "");
  const cs: { cx: number; cy: number; a: string; b: string }[] = [
    { cx: 120, cy: 60, a: "MongoDB", b: "equity cache" },
    { cx: 300, cy: 60, a: "Solana", b: "equity authority" },
    { cx: 210, cy: 180, a: "Settlement", b: "service" },
  ];
  return (
    <svg viewBox="0 0 420 240" className="w-full max-w-2xl mx-auto h-auto text-ink dark:text-snow-200" aria-hidden>
      <defs>
        <marker id={arrowId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" className="text-ink dark:text-snow-200" />
        </marker>
      </defs>
      {cs.map((c, i) => (
        <g
          key={c.a}
          opacity={on ? 1 : 0}
          style={{
            transition: reducedMotion ? undefined : `opacity 450ms ${EASE}`,
            transitionDelay: reducedMotion ? undefined : `${i * 90}ms`,
          }}
        >
          <rect
            x={c.cx - 78}
            y={c.cy - 26}
            width="156"
            height="52"
            rx="4"
            fill="none"
            stroke={STROKE}
            strokeWidth="1"
          />
          <text x={c.cx} y={c.cy - 6} textAnchor="middle" className="fill-current text-[10px] font-mono">
            <tspan x={c.cx} dy="0">
              {c.a}
            </tspan>
            <tspan x={c.cx} dy="14">
              {c.b}
            </tspan>
          </text>
        </g>
      ))}
      <path
        d="M 210 114 L 300 86"
        fill="none"
        stroke={STROKE}
        markerEnd={`url(#${arrowId})`}
        strokeDasharray="100"
        strokeDashoffset={on ? 0 : 100}
        style={{ transition: reducedMotion ? undefined : `stroke-dashoffset 700ms ${EASE} 250ms` }}
      />
      <path
        d="M 300 114 L 246 154"
        fill="none"
        stroke={STROKE}
        strokeDasharray="80"
        strokeDashoffset={on ? 0 : 80}
        style={{ transition: reducedMotion ? undefined : `stroke-dashoffset 700ms ${EASE} 350ms` }}
      />
      <path
        d="M 174 154 L 120 114"
        fill="none"
        stroke={STROKE}
        strokeDasharray="80"
        strokeDashoffset={on ? 0 : 80}
        style={{ transition: reducedMotion ? undefined : `stroke-dashoffset 700ms ${EASE} 450ms` }}
      />
    </svg>
  );
}

function PieSlice({
  cx,
  cy,
  r,
  start,
  end,
  opacity,
}: {
  cx: number;
  cy: number;
  r: number;
  start: number;
  end: number;
  opacity: number;
}) {
  const x1 = cx + r * Math.cos(start);
  const y1 = cy + r * Math.sin(start);
  const x2 = cx + r * Math.cos(end);
  const y2 = cy + r * Math.sin(end);
  const large = end - start > Math.PI ? 1 : 0;
  const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
  return <path d={d} fill="currentColor" opacity={opacity} />;
}

export function ExamplePiesSvg({ active, reducedMotion }: ActiveProps) {
  const on = reducedMotion || active;
  return (
    <div className="grid sm:grid-cols-2 gap-8">
      <svg viewBox="0 0 200 200" className="w-full text-ink dark:text-snow-200" aria-hidden>
        <g
          style={{
            opacity: on ? 1 : 0,
            transform: on ? "scale(1)" : "scale(0.94)",
            transformOrigin: "100px 100px",
            transition: reducedMotion ? undefined : `opacity 500ms ${EASE}, transform 500ms ${EASE}`,
          }}
        >
          <PieSlice cx={100} cy={100} r={80} start={-Math.PI / 2} end={-Math.PI / 2 + 2 * Math.PI * 0.6673} opacity={0.35} />
          <PieSlice
            cx={100}
            cy={100}
            r={80}
            start={-Math.PI / 2 + 2 * Math.PI * 0.6673}
            end={-Math.PI / 2 + 2 * Math.PI}
            opacity={0.18}
          />
        </g>
        <text x="100" y="188" textAnchor="middle" className="fill-current text-[10px] opacity-55">
          A 66.73% · B 33.27%
        </text>
      </svg>
      <svg viewBox="0 0 200 200" className="w-full text-ink dark:text-snow-200" aria-hidden>
        <g
          style={{
            opacity: on ? 1 : 0,
            transform: on ? "scale(1)" : "scale(0.94)",
            transformOrigin: "100px 100px",
            transition: reducedMotion ? undefined : `opacity 500ms ${EASE} 120ms, transform 500ms ${EASE} 120ms`,
          }}
        >
          <PieSlice cx={100} cy={100} r={80} start={-Math.PI / 2} end={-Math.PI / 2 + 2 * Math.PI * 0.5} opacity={0.38} />
          <PieSlice
            cx={100}
            cy={100}
            r={80}
            start={-Math.PI / 2 + 2 * Math.PI * 0.5}
            end={-Math.PI / 2 + 2 * Math.PI * 0.875}
            opacity={0.22}
          />
          <PieSlice
            cx={100}
            cy={100}
            r={80}
            start={-Math.PI / 2 + 2 * Math.PI * 0.875}
            end={-Math.PI / 2 + 2 * Math.PI}
            opacity={0.14}
          />
        </g>
        <text x="100" y="188" textAnchor="middle" className="fill-current text-[10px] opacity-55">
          Tiered: A 50% · B 37.5% · C 12.5%
        </text>
      </svg>
    </div>
  );
}

export function SettlementBarsSvg({ active, reducedMotion }: ActiveProps) {
  const on = reducedMotion || active;
  const parts = [
    { w: 0.601, label: "A $9.01" },
    { w: 0.299, label: "B $4.49" },
    { w: 0.1, label: "fee $1.50" },
  ];
  let x = 4;
  return (
    <svg viewBox="0 0 400 48" className="w-full text-ink dark:text-snow-200 mt-4" aria-hidden>
      <rect x="4" y="4" width="392" height="20" fill="none" stroke={STROKE} strokeWidth="1" opacity="0.4" />
      {parts.map((p, i) => {
        const start = x;
        const width = 392 * p.w;
        x += width;
        return (
          <g key={p.label}>
            <rect
              x={start}
              y="4"
              width={on ? width : 0}
              height="20"
              fill="currentColor"
              opacity={0.15 + i * 0.08}
              style={{
                transition: reducedMotion ? undefined : `width 600ms ${EASE}`,
                transitionDelay: reducedMotion ? undefined : `${i * 70}ms`,
              }}
            />
            <text x={start + width / 2} y="40" textAnchor="middle" className="fill-current text-[9px] font-mono opacity-65">
              {p.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

type FlowStep = { side: "L" | "R"; title: string; detail: string; note?: string; ms?: string };

export function FullFlowDiagram({
  steps,
  active,
  reducedMotion,
}: {
  steps: FlowStep[];
  active: boolean;
  reducedMotion: boolean;
}) {
  const on = reducedMotion || active;
  return (
    <div
      className="rounded-[10px] border border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5]/70 dark:bg-[#1F1F1F]/60 p-5 md:p-8 overflow-x-auto"
      role="img"
      aria-label="End-to-end flow from composition to settlement"
    >
      <div className="min-w-[320px] max-w-3xl mx-auto space-y-5">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className={`flex flex-col md:flex-row md:items-start gap-2 md:gap-8 ${
              s.side === "R" ? "md:flex-row-reverse" : ""
            }`}
          >
            <div
              className={`max-w-lg w-full ${s.side === "L" ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"}`}
              style={{
                opacity: on ? 1 : 0,
                transform: on ? "translateY(0)" : "translateY(10px)",
                transition: reducedMotion ? undefined : `opacity 400ms ${EASE}, transform 400ms ${EASE}`,
                transitionDelay: reducedMotion ? undefined : `${i * 55}ms`,
              }}
            >
              <div className="rounded-lg border border-[#E8E8E8] dark:border-[#4A4A4A] bg-white/80 dark:bg-[#0A0A0A]/80 px-4 py-3 min-h-[72px] min-w-[240px] md:min-w-[300px]">
                <div className="font-mono text-[12px] text-ink dark:text-snow-100">{s.title}</div>
                {s.ms && (
                  <div className="md:hidden mt-1 text-[11px] font-mono text-[#8A8A8A] dark:text-[#9A9A9A]">{s.ms}</div>
                )}
                <div className="mt-1 text-[13px] text-[#4A4A4A] dark:text-[#C4C4C4] leading-relaxed">{s.detail}</div>
                {s.note && (
                  <div className="mt-2 text-[11px] text-[#8A8A8A] dark:text-[#9A9A9A] border-l-4 border-ink/25 dark:border-snow-200/50 pl-3">
                    {s.note}
                  </div>
                )}
              </div>
            </div>
            <div
              className={`hidden md:block w-24 shrink-0 text-[11px] font-mono font-semibold tabular-nums text-[#4A4A4A] dark:text-[#B0B0B0] pt-3 ${
                s.side === "R" ? "text-left" : "text-right"
              }`}
              style={{
                opacity: on ? 1 : 0,
                transition: reducedMotion ? undefined : `opacity 350ms ${EASE}`,
                transitionDelay: reducedMotion ? undefined : `${i * 55 + 40}ms`,
              }}
            >
              {s.ms ?? "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
