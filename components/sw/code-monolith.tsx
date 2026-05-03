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
    "// Subscribe to a user twin",
    "const twin = await engine.twins.user(\"u_18a4...\");",
    "",
    "for await (const update of twin.stream()) {",
    "  if (update.kind === \"behavioral.next-action\") {",
    "    await engine.simulate.monteCarlo({",
    "      twinId: twin.id,",
    "      scenarios: 10_000,",
    "      horizon: \"24h\",",
    "    });",
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
    "    asOfState(behavioral_pattern, '2026-04-12 00:00') AS pattern_pre,",
    "    asOfState(behavioral_pattern, now())              AS pattern_now,",
    "    cosineDistance(pattern_pre, pattern_now)          AS drift",
    "FROM twin_events",
    "WHERE entity = 'user'",
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
