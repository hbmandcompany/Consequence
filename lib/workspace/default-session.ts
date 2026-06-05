import {
  DEFAULT_PIANO_ROLL_HEIGHT,
  DEFAULT_LEFT_PANEL_WIDTH,
  DEFAULT_RIGHT_PANEL_WIDTH,
  TRACK_COLOR_PALETTE,
} from "./constants";
import { generateId } from "./music";
import type { MidiNote, Region, SessionState, Track, UiState, WorkspaceSnapshot } from "./types";

export function createDefaultSession(userName: string): WorkspaceSnapshot {
  const sessionId = generateId("session");
  const trackId = generateId("track");
  const regionId = generateId("region");

  const session: SessionState = {
    id: sessionId,
    name: "Untitled Session",
    tempo: 120,
    timeSignature: { numerator: 4, denominator: 4 },
    playbackPositionTicks: 0,
    playbackState: "stopped",
    loopEnabled: false,
    loopStartBar: 1,
    loopEndBar: 5,
    masterVolume: 0.85,
  };

  const track: Track = {
    id: trackId,
    name: `${userName.split(" ")[0] ?? "MIDI"} 1`,
    type: "midi",
    color: TRACK_COLOR_PALETTE[0],
    mute: false,
    solo: false,
    arm: false,
    volume: 0.8,
    pan: 0,
    midiChannel: 1,
    instrument: "Genesis Synth",
    effects: [],
    regionIds: [regionId],
    level: 0,
  };

  const region: Region = {
    id: regionId,
    trackId,
    name: "Intro",
    startBar: 1,
    lengthBars: 4,
    noteIds: [],
  };

  return {
    session,
    tracks: [track],
    regions: { [regionId]: region },
    notes: {},
  };
}

export function createDefaultUiState(): UiState {
  return {
    selectedTrackIds: [],
    selectedRegionIds: [],
    selectedNoteIds: [],
    openRegionId: null,
    timelineScrollX: 0,
    timelineZoom: 1,
    trackHeight: 64,
    pianoRollScrollX: 0,
    pianoRollScrollY: 0,
    pianoRollZoom: 1,
    quantizeGrid: "1/16",
    leftPanelWidth: DEFAULT_LEFT_PANEL_WIDTH,
    rightPanelWidth: DEFAULT_RIGHT_PANEL_WIDTH,
    pianoRollHeight: DEFAULT_PIANO_ROLL_HEIGHT,
    contextMenu: null,
    theoryPanelOpen: false,
    focusedPanel: null,
  };
}

export function createDemoNotes(regionId: string, trackColor: string): Record<string, MidiNote> {
  void trackColor;
  const notes: MidiNote[] = [
    { id: generateId("note"), regionId, pitch: 60, startTicks: 0, durationTicks: 480, velocity: 90 },
    { id: generateId("note"), regionId, pitch: 64, startTicks: 480, durationTicks: 480, velocity: 85 },
    { id: generateId("note"), regionId, pitch: 67, startTicks: 960, durationTicks: 480, velocity: 88 },
    { id: generateId("note"), regionId, pitch: 72, startTicks: 1440, durationTicks: 960, velocity: 95 },
    { id: generateId("note"), regionId, pitch: 69, startTicks: 1920, durationTicks: 480, velocity: 80 },
    { id: generateId("note"), regionId, pitch: 65, startTicks: 2400, durationTicks: 480, velocity: 82 },
  ];
  const map: Record<string, MidiNote> = {};
  for (const n of notes) map[n.id] = n;
  return map;
}
