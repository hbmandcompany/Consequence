/** Workspace design tokens and musical constants. */

export const WORKSPACE_COLORS = {
  background: "#0A0A0A",
  surface: "#141414",
  elevated: "#1E1E1E",
  border: "#2A2A2A",
  textMuted: "#6B6B6B",
  textSecondary: "#A0A0A0",
  textPrimary: "#F0F0F0",
  accent: "#FFFFFF",
} as const;

/** Twelve muted track colors — professional, desaturated palette. */
export const TRACK_COLOR_PALETTE = [
  "#5B7C99", // muted blue
  "#5C8A6E", // muted green
  "#9A8B5C", // muted amber
  "#9A6B76", // muted rose
  "#7A6B9A", // muted violet
  "#5C8A9A", // muted cyan
  "#9A7A5C", // muted orange
  "#5C8A8A", // muted teal
  "#9A5C5C", // muted red
  "#6B6B9A", // muted indigo
  "#7A9A5C", // muted lime
  "#9A6B9A", // muted fuchsia
] as const;

export const TICKS_PER_QUARTER = 480;

export const DEFAULT_LEFT_PANEL_WIDTH = 280;
export const DEFAULT_RIGHT_PANEL_WIDTH = 320;
export const DEFAULT_PIANO_ROLL_HEIGHT = 280;
export const MIN_PANEL_WIDTH = 200;
export const MAX_PANEL_WIDTH = 480;
export const MIN_PIANO_ROLL_HEIGHT = 160;
export const MAX_PIANO_ROLL_HEIGHT = 600;

export const DEFAULT_TRACK_HEIGHT = 64;
export const MIN_TRACK_HEIGHT = 40;
export const MAX_TRACK_HEIGHT = 120;

export const COLLABORATOR_COLORS = [
  "#5B7C99",
  "#9A6B76",
  "#7A6B9A",
  "#5C8A6E",
  "#9A7A5C",
  "#5C8A9A",
] as const;

export type QuantizeGrid = "1/4" | "1/8" | "1/16" | "1/32" | "triplet";

export const QUANTIZE_OPTIONS: QuantizeGrid[] = ["1/4", "1/8", "1/16", "1/32", "triplet"];

export function quantizeTicks(grid: QuantizeGrid, ticksPerBar: number): number {
  const beat = ticksPerBar / 4;
  switch (grid) {
    case "1/4":
      return beat;
    case "1/8":
      return beat / 2;
    case "1/16":
      return beat / 4;
    case "1/32":
      return beat / 8;
    case "triplet":
      return beat / 3;
  }
}
