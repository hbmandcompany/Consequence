/** Long-form TypeScript samples for How the Rails Connect — documentation only; illustrative. */

export const RECORD_CONTRIBUTION_SIGNAL = `import type { PublicKey } from "@solana/web3.js";
import { enqueueSolanaBatch } from "./chain";
import { equitySignalsCollection } from "./mongo";

export type SignalKind =
  | "session_participation"
  | "midi"
  | "arrangement"
  | "ai_suggestion"
  | "structural";

export interface RecordSignalInput {
  compositionId: string;
  creatorPubkey: PublicKey;
  kind: SignalKind;
  payload: Record<string, unknown>;
  occurredAt: Date;
}

export async function recordContributionSignal(
  input: RecordSignalInput
): Promise<void> {
  const doc = {
    composition_id: input.compositionId,
    creator_pubkey: input.creatorPubkey.toBase58(),
    kind: input.kind,
    payload: input.payload,
    ts: input.occurredAt,
  };

  await equitySignalsCollection.insertOne(doc);

  await enqueueSolanaBatch({
    instruction: "record_contribution",
    accounts: {
      composition: await deriveCompositionPda(input.compositionId),
      contributor: input.creatorPubkey,
    },
    data: encodeSignalForChain(input.kind, input.payload),
  });
}

function encodeSignalForChain(kind: SignalKind, payload: Record<string, unknown>): Buffer {
  return Buffer.from(JSON.stringify({ kind, payload }));
}

async function deriveCompositionPda(_compositionId: string): Promise<PublicKey> {
  throw new Error("Implement PDA derivation");
}`;

export const COMPUTE_ALGORITHMIC_EQUITY = `export interface CreatorSignals {
  creatorId: string;
  participationSeconds: number;
  midiNotesCreated: number;
  arrangementImprovements: number;
  aiSuggestionsGenerated: number;
  aiSuggestionsAccepted: number;
  structuralChanges: number;
}

export const SIGNAL_WEIGHTS = {
  participation: 0.25,
  midi: 0.3,
  arrangement: 0.2,
  ai: 0.15,
  structural: 0.1,
} as const;

function log1pScaled(n: number): number {
  return Math.log1p(Math.max(0, n));
}

function normalizedParticipation(signals: CreatorSignals[], i: number): number {
  const total = signals.reduce((s, c) => s + c.participationSeconds, 0);
  if (total === 0) return signals.length ? 1 / signals.length : 0;
  return signals[i].participationSeconds / total;
}

function normalizedMidi(signals: CreatorSignals[], i: number): number {
  const raw = signals.map((c) => log1pScaled(c.midiNotesCreated));
  const sum = raw.reduce((a, b) => a + b, 0);
  if (sum === 0) return signals.length ? 1 / signals.length : 0;
  return raw[i] / sum;
}

function blendAiCredit(signals: CreatorSignals[], i: number): number {
  const gen = log1pScaled(signals[i].aiSuggestionsGenerated);
  const acc = log1pScaled(signals[i].aiSuggestionsAccepted);
  const score = 0.3 * gen + 0.7 * acc;
  const scores = signals.map(
    (c) => 0.3 * log1pScaled(c.aiSuggestionsGenerated) + 0.7 * log1pScaled(c.aiSuggestionsAccepted)
  );
  const sum = scores.reduce((a, b) => a + b, 0);
  return sum === 0 ? (signals.length ? 1 / signals.length : 0) : scores[i] / sum;
}

function normArrangement(signals: CreatorSignals[], i: number): number {
  const raw = signals.map((c) => log1pScaled(c.arrangementImprovements));
  const sum = raw.reduce((a, b) => a + b, 0);
  if (sum === 0) return signals.length ? 1 / signals.length : 0;
  return raw[i] / sum;
}

function normStructural(signals: CreatorSignals[], i: number): number {
  const raw = signals.map((c) => log1pScaled(c.structuralChanges));
  const sum = raw.reduce((a, b) => a + b, 0);
  if (sum === 0) return signals.length ? 1 / signals.length : 0;
  return raw[i] / sum;
}

export function computeAlgorithmicEquity(signals: CreatorSignals[]): Map<string, number> {
  if (signals.length === 0) return new Map();

  const weighted = signals.map((_, i) => {
    const p = normalizedParticipation(signals, i) * SIGNAL_WEIGHTS.participation;
    const m = normalizedMidi(signals, i) * SIGNAL_WEIGHTS.midi;
    const ar = normArrangement(signals, i) * SIGNAL_WEIGHTS.arrangement;
    const ai = blendAiCredit(signals, i) * SIGNAL_WEIGHTS.ai;
    const st = normStructural(signals, i) * SIGNAL_WEIGHTS.structural;
    return p + m + ar + ai + st;
  });

  const total = weighted.reduce((a, b) => a + b, 0);
  const out = new Map<string, number>();
  if (total === 0) {
    const even = Math.floor(10_000 / signals.length);
    signals.forEach((c, idx) =>
      out.set(c.creatorId, even + (idx === 0 ? 10_000 - even * signals.length : 0))
    );
    return out;
  }

  let allocated = 0;
  signals.forEach((c, i) => {
    const bp = Math.round((weighted[i]! / total) * 10_000);
    allocated += bp;
    out.set(c.creatorId, bp);
  });
  const drift = 10_000 - allocated;
  if (drift !== 0 && signals[0]) {
    const id = signals[0].creatorId;
    out.set(id, (out.get(id) ?? 0) + drift);
  }
  return out;
}`;

export const APPLY_EQUITY_RULE = `export type EquityRule =
  | { type: "algorithmic" }
  | { type: "fixed"; basisPointsByCreator: Record<string, number> }
  | {
      type: "hybrid";
      minBasisPoints: Record<string, number>;
      maxBasisPoints: Record<string, number>;
    }
  | { type: "tiered_initiator"; initiatorId: string; initiatorShareBp: number };

function sumBp(m: Map<string, number>): number {
  let s = 0;
  for (const v of m.values()) s += v;
  return s;
}

function renormalize(m: Map<string, number>): Map<string, number> {
  const t = sumBp(m);
  if (t === 0) return m;
  const scale = 10_000 / t;
  const next = new Map<string, number>();
  let acc = 0;
  const keys = [...m.keys()];
  keys.forEach((k, i) => {
    const v = Math.round(m.get(k)! * scale);
    acc += v;
    next.set(k, v);
  });
  const drift = 10_000 - acc;
  if (keys[0]) next.set(keys[0], (next.get(keys[0]) ?? 0) + drift);
  return next;
}

function clampMap(
  algorithmic: Map<string, number>,
  min: Record<string, number>,
  max: Record<string, number>
): Map<string, number> {
  const next = new Map<string, number>();
  for (const [k, v] of algorithmic) {
    const lo = min[k] ?? 0;
    const hi = max[k] ?? 10_000;
    next.set(k, Math.min(hi, Math.max(lo, v)));
  }
  return renormalize(next);
}

export function applyEquityRule(
  rule: EquityRule,
  algorithmic: Map<string, number>,
  allCreatorIds: string[]
): Map<string, number> {
  switch (rule.type) {
    case "fixed": {
      const m = new Map<string, number>();
      let s = 0;
      for (const id of allCreatorIds) {
        const bp = rule.basisPointsByCreator[id] ?? 0;
        m.set(id, bp);
        s += bp;
      }
      if (s !== 10_000) throw new Error("fixed rule must sum to 10_000 bp");
      return m;
    }
    case "hybrid":
      return clampMap(algorithmic, rule.minBasisPoints, rule.maxBasisPoints);
    case "tiered_initiator": {
      const initiator = rule.initiatorId;
      const initBp = rule.initiatorShareBp;
      const restIds = allCreatorIds.filter((id) => id !== initiator);
      const sub = new Map<string, number>();
      for (const id of restIds) sub.set(id, algorithmic.get(id) ?? 0);
      const subTotal = sumBp(sub);
      const out = new Map<string, number>();
      out.set(initiator, initBp);
      const remainder = 10_000 - initBp;
      if (subTotal === 0) {
        const even = Math.floor(remainder / restIds.length);
        restIds.forEach((id, i) =>
          out.set(id, even + (i === 0 ? remainder - even * restIds.length : 0))
        );
        return out;
      }
      let allocated = 0;
      restIds.forEach((id) => {
        const share = Math.round((remainder * (sub.get(id) ?? 0)) / subTotal);
        allocated += share;
        out.set(id, share);
      });
      if (restIds[0])
        out.set(restIds[0], (out.get(restIds[0]) ?? 0) + (remainder - allocated));
      return out;
    }
    case "algorithmic":
    default:
      return algorithmic;
  }
}`;

export const RECORD_EQUITY_UPDATE_SOLANA = `import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { PROGRAM_ID, deriveCompositionPda } from "./program";

export interface EquityRow {
  pubkey: PublicKey;
  basisPoints: number;
  locked: boolean;
}

export async function recordEquityUpdateToSolana(params: {
  rpc: Connection;
  payer: Keypair;
  compositionId: string;
  ownership: EquityRow[];
  snapshotDigest: Uint8Array;
}): Promise<string> {
  const pda = await deriveCompositionPda(params.compositionId);
  const ix = new TransactionInstruction({
    keys: [
      { pubkey: pda, isSigner: false, isWritable: true },
      { pubkey: params.payer.publicKey, isSigner: true, isWritable: false },
    ],
    programId: PROGRAM_ID,
    data: encodeComputeEquityIx(params.ownership, params.snapshotDigest),
  });

  const { blockhash, lastValidBlockHeight } = await params.rpc.getLatestBlockhash();
  const tx = new Transaction({ feePayer: params.payer.publicKey, recentBlockhash: blockhash });
  tx.add(ix);
  tx.sign(params.payer);

  const sig = await params.rpc.sendRawTransaction(tx.serialize(), {
    skipPreflight: false,
    maxRetries: 3,
  });

  await params.rpc.confirmTransaction(
    { signature: sig, blockhash, lastValidBlockHeight },
    "confirmed"
  );
  return sig;
}

function encodeComputeEquityIx(
  ownership: EquityRow[],
  snapshotDigest: Uint8Array
): Buffer {
  const parts: Buffer[] = [Buffer.from([3])];
  parts.push(Buffer.from(new Uint16Array([ownership.length]).buffer));
  for (const row of ownership) {
    parts.push(row.pubkey.toBuffer());
    parts.push(Buffer.from(new Uint16Array([row.basisPoints]).buffer));
    parts.push(Buffer.from([row.locked ? 1 : 0]));
  }
  parts.push(Buffer.from(snapshotDigest));
  return Buffer.concat(parts);
}`;

export const EXECUTE_SETTLEMENT_WITH_EQUITY = `import type { Connection, PublicKey } from "@solana/web3.js";

export interface SettlementQuote {
  saleGrossUsdc: bigint;
  platformFeeBps: number;
}

/**
 * Settlement always hydrates authoritative ownership from the Solana PDA —
 * never from a Mongo cache — before computing per-creator payouts.
 */
export async function executeSettlementWithEquity(params: {
  rpc: Connection;
  compositionPda: PublicKey;
  quote: SettlementQuote;
  /** Platform treasury receives fee leg */
  platformTreasury: PublicKey;
  creatorWallets: Map<string, PublicKey>;
}): Promise<{
  netToCreator: Map<string, bigint>;
  platformFee: bigint;
  equitySnapshotSig: string;
}> {
  const acct = await params.rpc.getAccountInfo(params.compositionPda, "confirmed");
  if (!acct?.data) throw new Error("missing composition account");

  const { ownership, lastSnapshotSig } = decodeCompositionState(acct.data);
  const totalBps = ownership.reduce((s, o) => s + o.basisPoints, 0);
  if (totalBps !== 10_000) throw new Error("invalid equity sum");

  const gross = params.quote.saleGrossUsdc;
  const fee =
    (gross * BigInt(params.quote.platformFeeBps)) /
    10_000n;
  const net = gross - fee;

  const netToCreator = new Map<string, bigint>();
  for (const row of ownership) {
    const wallet = params.creatorWallets.get(row.creatorId);
    if (!wallet) continue;
    const share = (net * BigInt(row.basisPoints)) / 10_000n;
    netToCreator.set(row.creatorId, share);
    await transferUsdc(params.rpc, params.platformTreasury, wallet, share);
  }

  await recordSettlementOnChain({
    composition: params.compositionPda,
    gross,
    fee,
    netSplits: netToCreator,
    equitySnapshotSig: lastSnapshotSig,
  });

  return { netToCreator, platformFee: fee, equitySnapshotSig: lastSnapshotSig };
}

function decodeCompositionState(_data: Buffer): {
  ownership: { creatorId: string; basisPoints: number }[];
  lastSnapshotSig: string;
} {
  throw new Error("decode Borsh layout for your program version");
}

async function transferUsdc(
  _rpc: Connection,
  _from: PublicKey,
  _to: PublicKey,
  _amount: bigint
): Promise<void> {
  // SPL transfer_checked
}

async function recordSettlementOnChain(_args: unknown): Promise<void> {
  // record_settlement instruction
}`;
