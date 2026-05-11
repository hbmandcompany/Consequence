"use client";

import { useState } from "react";
import clsx from "clsx";

const tabs = [
  { id: "twin", label: "twin.ts", lang: "typescript" },
  { id: "yaml", label: "deployment.yaml", lang: "yaml" },
  { id: "sql", label: "twin.sql", lang: "sql" },
];

const samples: Record<string, string[]> = {
  twin: [
    "import { Engine } from \"@consequence/core\";",
    "",
    "const engine = Engine.connect({",
    "  cluster: \"prod-ams\",",
    "  region: \"eu-west\",",
    "});",
    "",
    "// Subscribe to a creator twin — creative + capital events",
    "const creator = await engine.twins.creator(\"c_18a4...\");",
    "",
    "for await (const update of creator.stream()) {",
    "  if (update.kind === \"composition.sold\") {",
    "    console.log(`Sale: +$${update.amount} USDC pending settlement`);",
    "    await engine.simulate.monteCarlo({",
    "      twinId: creator.id,",
    "      scenarios: 10_000,",
    "      domain: \"creator-earnings-and-capital\",",
    "      horizon: \"30d\",",
    "    });",
    "  }",
    "  if (update.kind === \"settlement.confirmed\") {",
    "    console.log(`Earnings settled: ${update.creatorShare} to ${update.walletAddress}`);",
    "    const twin = await creator.getTwin();",
    "    console.log(`Lifetime realized: $${twin.stats.earnings_lifetime_realized}`);",
    "  }",
    "}",
  ],
  yaml: [
    "apiVersion: serving.consequence.software/v1",
    "kind: Model",
    "metadata:",
    "  name: behavioral-prediction",
    "  namespace: inference",
    "spec:",
    "  framework: triton",
    "  artifact: s3://models/behavioral/v412.onnx",
    "  resources:",
    "    gpu: nvidia.com/l40s",
    "    instances: { min: 4, max: 64 }",
    "  batching:",
    "    maxDelayMs: 12",
    "    maxBatchSize: 32",
    "  rollout:",
    "    canary: { traffic: 5, shadow: true, rollbackOnRegression: true }",
  ],
  sql: [
    "-- Twin time-travel query, ClickHouse",
    "SELECT",
    "    twin_id,",
    "    asOfState(engagement_curve, '2026-04-12 00:00') AS curve_pre,",
    "    asOfState(engagement_curve, now())              AS curve_now,",
    "    cosineDistance(curve_pre, curve_now)          AS drift",
    "FROM twin_events",
    "WHERE entity = 'creator'",
    "  AND drift > 0.18",
    "ORDER BY drift DESC",
    "LIMIT 100",
  ],
};

export function CodeMonolith() {
  const [tab, setTab] = useState("twin");
  return (
    <div className="bg-ink text-snow-50 border border-ink overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-snow-50/10">
        <div className="flex items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={clsx(
                "px-3 py-1.5 text-[11px] tabular tracking-tight rounded-full transition-colors",
                tab === t.id
                  ? "bg-snow-50 text-ink"
                  : "text-snow-50/55 hover:text-snow-50"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] tabular uppercase tracking-[0.18em] text-snow-50/45">
          <span className="w-1.5 h-1.5 rounded-full bg-tiff" />
          @consequence/core · 1.0.0
        </div>
      </div>
      <pre className="font-mono text-[12.5px] leading-[1.7] p-6 lg:p-8 overflow-x-auto">
        <code>
          {samples[tab].map((line, i) => (
            <div key={i} className="flex gap-5">
              <span className="text-snow-50/25 select-none w-6 text-right tabular">
                {i + 1}
              </span>
              <span className={lineClass(line)}>{line || "\u00A0"}</span>
            </div>
          ))}
        </code>
      </pre>
      <div className="px-5 py-3 border-t border-snow-50/10 flex items-center justify-between text-[10px] tabular uppercase tracking-[0.18em] text-snow-50/45">
        <span>npm i @consequence/core · pnpm add @consequence/core</span>
        <span>Docs · changelog · status</span>
      </div>
    </div>
  );
}

function lineClass(line: string) {
  if (line.trim().startsWith("--") || line.trim().startsWith("//")) {
    return "text-snow-50/40";
  }
  return "text-snow-50/90";
}
