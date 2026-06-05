import { TICKS_PER_QUARTER } from "./constants";
import type { TimeSignature } from "./types";

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;

export function ticksPerBar(timeSignature: TimeSignature): number {
  const beatsPerBar = timeSignature.numerator;
  const beatUnit = 4 / timeSignature.denominator;
  return Math.round(TICKS_PER_QUARTER * beatsPerBar * beatUnit);
}

export function barBeatFromTicks(
  ticks: number,
  timeSignature: TimeSignature
): { bar: number; beat: number; tick: number } {
  const tpb = ticksPerBar(timeSignature);
  const bar = Math.floor(ticks / tpb) + 1;
  const remainder = ticks % tpb;
  const ticksPerBeat = tpb / timeSignature.numerator;
  const beat = Math.floor(remainder / ticksPerBeat) + 1;
  const tick = remainder % ticksPerBeat;
  return { bar, beat, tick };
}

export function formatBarBeat(
  ticks: number,
  timeSignature: TimeSignature
): string {
  const { bar, beat, tick } = barBeatFromTicks(ticks, timeSignature);
  return `${bar}.${beat}.${Math.floor(tick)}`;
}

export function pitchToName(pitch: number): string {
  const clamped = Math.max(0, Math.min(127, Math.floor(pitch)));
  const octave = Math.floor(clamped / 12) - 1;
  const name = NOTE_NAMES[clamped % 12];
  return `${name}${octave}`;
}

export function isBlackKey(pitch: number): boolean {
  const pc = Math.floor(pitch) % 12;
  return [1, 3, 6, 8, 10].includes(pc);
}

export function barToTicks(bar: number, timeSignature: TimeSignature): number {
  return (bar - 1) * ticksPerBar(timeSignature);
}

export function snapTicks(ticks: number, gridTicks: number): number {
  if (gridTicks <= 0) return ticks;
  return Math.round(ticks / gridTicks) * gridTicks;
}

export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
