import type { SearchEntityType } from "./types";

export type AttachOption = {
  type: SearchEntityType;
  label: string;
  description: string;
};

export const SEARCH_ATTACH_OPTIONS: AttachOption[] = [
  { type: "stem", label: "Stems", description: "WAV & stem packs" },
  { type: "producer", label: "Producers", description: "Creators & studios" },
  { type: "session", label: "Sessions", description: "Works in progress" },
  { type: "twin", label: "Twins", description: "Creator & work twins" },
  { type: "composition", label: "Compositions", description: "Full arrangements" },
  { type: "midi", label: "MIDI", description: "Patterns & clips" },
  { type: "vocal", label: "Vocals", description: "Takes & libraries" },
  { type: "loop", label: "Loops", description: "One-shots & phrases" },
];
