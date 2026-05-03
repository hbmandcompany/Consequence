"use client";

import { Container, Eyebrow, HairlineRow, Pill, Section } from "@/components/ui";
import { ArrowDownRight, ArrowUpRight, ChevronRight } from "lucide-react";

const flows = [
  { t: "Velvet Room — split", who: "Lou Marsden + Eos Veil", v: "+ $1,242.18", k: "in" },
  { t: "Antwerp Brushed Rhodes", who: "Sólveig Tinde — pack purchased", v: "− $38.00", k: "out" },
  { t: "Halls of Linen — pre-save royalties", who: "Network share, 412 listeners", v: "+ $84.40", k: "in" },
  { t: "Ownership transfer · Quiet Hours", who: "Solana mint — 0xA9…1F2", v: "+ $220.00", k: "in" },
  { t: "Marketplace fee · this week", who: "HBM & Company · house cut", v: "− $46.12", k: "out" },
];

export function Wallet() {
  return (
    <Section className="py-24 border-t border-ink/10 bg-snow-100">
      <Container>
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow label="Wallet · Live ledger" />
            <h2 className="font-display text-[clamp(36px,4.6vw,72px)] leading-[1.02] tracking-tight mt-6 max-w-[14ch]">
              Settled in seconds. Read like a magazine.
            </h2>
            <p className="mt-6 text-[15px] text-ink/65 leading-[1.7] max-w-[44ch]">
              Splits are computed by the engine, signed on Solana, settled in
              USDC. The ledger updates in real time and reads the way you
              actually think about money.
            </p>

            <div className="mt-10 bg-snow-0 border border-ink/10 p-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] tabular uppercase tracking-[0.2em] text-ink/45">
                    Available · USDC
                  </div>
                  <div className="font-display text-[clamp(48px,6vw,88px)] leading-none tabular mt-2">
                    $14,820<span className="text-ink/50">.46</span>
                  </div>
                </div>
                <Pill tone="tiff">+12.4% · 30d</Pill>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 pt-5 border-t border-ink/10">
                <Mini label="Pending" value="$612.18" />
                <Mini label="In escrow" value="$2,140.00" />
                <Mini label="This week" value="$1,486.04" />
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button className="flex-1 px-4 py-3 rounded-full bg-ink text-snow-50 text-[12px] tracking-tight hover:bg-ink/90">
                  Withdraw to bank
                </button>
                <button className="flex-1 px-4 py-3 rounded-full border border-ink/20 text-[12px] tracking-tight hover:border-ink/60">
                  Move to Solana wallet
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7">
            <div className="bg-snow-0 border border-ink/10">
              <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
                <div className="text-[11px] tabular uppercase tracking-[0.2em] text-ink/55">
                  Latest flows
                </div>
                <a href="#" className="text-[12px] uline text-ink/65">
                  Full ledger
                </a>
              </div>
              {flows.map((f, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-5 px-6 py-5 border-b last:border-b-0 border-ink/10 hover:bg-snow-100 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      f.k === "in" ? "bg-tiff-100 text-tiff-700" : "bg-snow-200 text-ink/65"
                    }`}
                  >
                    {f.k === "in" ? (
                      <ArrowDownRight className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] text-ink/90 truncate">{f.t}</div>
                    <div className="text-[11px] tabular uppercase tracking-[0.16em] text-ink/45 mt-1 truncate">
                      {f.who}
                    </div>
                  </div>
                  <div className="font-display text-xl tabular leading-none">
                    {f.v}
                  </div>
                  <ChevronRight className="w-4 h-4 text-ink/30 group-hover:text-ink/70 transition-colors" />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <HairlineRow left="Settlement engine" right="Circle USDC · Solana mint" />
              <HairlineRow left="Median split time" right="9.4s · last 30 days" />
              <HairlineRow left="Disputed flows" right="0.02% · auto-resolved" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tabular uppercase tracking-[0.18em] text-ink/45">
        {label}
      </div>
      <div className="font-display text-xl tabular mt-1.5">{value}</div>
    </div>
  );
}
