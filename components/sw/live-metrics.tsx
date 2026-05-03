"use client";

import { useEffect, useState } from "react";
import { Waveform } from "@/components/ui";

export function LiveMetrics() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 1500);
    return () => clearInterval(id);
  }, []);

  // gentle wandering deterministic-ish values
  const base = 12400 + Math.round(Math.sin(t / 3) * 220) + ((t * 37) % 90);
  const p99 = 47 + Math.round(Math.sin(t / 5) * 4);
  const twins = 8_612_300 + (t * 113);

  return (
    <div className="bg-snow-0 border border-ink/10 p-7">
      <div className="flex items-center justify-between">
        <div className="text-[10px] tabular uppercase tracking-[0.22em] text-ink/45">
          Engine · Live
        </div>
        <span className="inline-flex items-center gap-2 text-[10px] tabular uppercase tracking-[0.18em] text-ink/55">
          <span className="w-1.5 h-1.5 rounded-full bg-tiff animate-breathe" />
          AMS · WAW · BKLN
        </span>
      </div>

      <Row label="Events / sec">
        <span className="font-display text-[42px] leading-none tabular">
          {base.toLocaleString()}
        </span>
      </Row>

      <Row label="Inference p99">
        <span className="font-display text-[42px] leading-none tabular">
          {p99}
          <span className="text-base text-ink/50 ml-1">ms</span>
        </span>
      </Row>

      <Row label="Twins online">
        <span className="font-display text-[28px] leading-none tabular">
          {twins.toLocaleString()}
        </span>
      </Row>

      <div className="mt-6 pt-5 border-t border-ink/10 flex items-center justify-between">
        <div>
          <div className="text-[10px] tabular uppercase tracking-[0.18em] text-ink/45">
            GPU utilisation
          </div>
          <div className="font-display text-2xl tabular mt-1">84%</div>
        </div>
        <Waveform bars={28} className="text-ink/55 h-8" />
      </div>

      <div className="mt-6 pt-5 border-t border-ink/10 grid grid-cols-3 gap-4">
        <Mini k="Models" v="112" />
        <Mini k="Sims / day" v="9.4k" />
        <Mini k="Queue" v="0.02" />
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 pt-5 border-t border-ink/10">
      <div className="text-[10px] tabular uppercase tracking-[0.18em] text-ink/45 mb-2">
        {label}
      </div>
      {children}
    </div>
  );
}

function Mini({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-[10px] tabular uppercase tracking-[0.16em] text-ink/45">
        {k}
      </div>
      <div className="font-display text-xl tabular mt-1">{v}</div>
    </div>
  );
}
