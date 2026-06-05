import type { QuantizeGrid } from "./constants";

export type TrackType = "midi" | "audio" | "instrument";

export type PlaybackState = "stopped" | "playing" | "recording";

export type TimeSignature = {
  numerator: number;
  denominator: number;
};

export type SessionState = {
  id: string;
  name: string;
  tempo: number;
  timeSignature: TimeSignature;
  playbackPositionTicks: number;
  playbackState: PlaybackState;
  loopEnabled: boolean;
  loopStartBar: number;
  loopEndBar: number;
  masterVolume: number;
};

export type Track = {
  id: string;
  name: string;
  type: TrackType;
  color: string;
  mute: boolean;
  solo: boolean;
  arm: boolean;
  volume: number;
  pan: number;
  midiChannel: number;
  instrument: string;
  effects: string[];
  regionIds: string[];
  level: number;
};

export type Region = {
  id: string;
  trackId: string;
  name: string;
  startBar: number;
  lengthBars: number;
  noteIds: string[];
};

export type MidiNote = {
  id: string;
  regionId: string;
  pitch: number;
  startTicks: number;
  durationTicks: number;
  velocity: number;
};

export type Collaborator = {
  id: string;
  name: string;
  color: string;
  cursorX: number;
  cursorY: number;
  cameraEnabled: boolean;
  micEnabled: boolean;
};

export type ChatMessage = {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: number;
};

export type ContextMenuTarget =
  | { kind: "timeline-empty"; trackId: string; bar: number }
  | { kind: "midi-region"; regionId: string }
  | { kind: "midi-note"; noteId: string }
  | { kind: "track"; trackId: string };

export type ContextMenuState = {
  x: number;
  y: number;
  target: ContextMenuTarget;
} | null;

export type UiState = {
  selectedTrackIds: string[];
  selectedRegionIds: string[];
  selectedNoteIds: string[];
  openRegionId: string | null;
  timelineScrollX: number;
  timelineZoom: number;
  trackHeight: number;
  pianoRollScrollX: number;
  pianoRollScrollY: number;
  pianoRollZoom: number;
  quantizeGrid: QuantizeGrid;
  leftPanelWidth: number;
  rightPanelWidth: number;
  pianoRollHeight: number;
  contextMenu: ContextMenuState;
  theoryPanelOpen: boolean;
  focusedPanel: "timeline" | "piano-roll" | "tracks" | "transport" | null;
};

export type WorkspaceSnapshot = {
  session: SessionState;
  tracks: Track[];
  regions: Record<string, Region>;
  notes: Record<string, MidiNote>;
};
