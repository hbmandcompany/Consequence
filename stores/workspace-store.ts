"use client";

import { create } from "zustand";
import {
  DEFAULT_TRACK_HEIGHT,
  MAX_PANEL_WIDTH,
  MAX_PIANO_ROLL_HEIGHT,
  MIN_PANEL_WIDTH,
  MIN_PIANO_ROLL_HEIGHT,
  TRACK_COLOR_PALETTE,
  quantizeTicks,
} from "@/lib/workspace/constants";
import {
  createDefaultSession,
  createDefaultUiState,
  createDemoNotes,
} from "@/lib/workspace/default-session";
import {
  barToTicks,
  generateId,
  snapTicks,
  ticksPerBar,
} from "@/lib/workspace/music";
import type {
  ChatMessage,
  Collaborator,
  ContextMenuState,
  MidiNote,
  PlaybackState,
  Region,
  Track,
  TrackType,
  UiState,
  WorkspaceSnapshot,
} from "@/lib/workspace/types";
import {
  createCommandHistory,
  pushCommand,
  redoCommand,
  undoCommand,
  type Command,
  type CommandHistory,
} from "./command-history";

type WorkspaceStore = WorkspaceSnapshot & {
  ui: UiState;
  collaborators: Collaborator[];
  chatMessages: ChatMessage[];
  localUserId: string;
  localUserName: string;
  commandHistory: CommandHistory;
  cpuUsage: number;
  memoryUsage: number;

  initSession: (userName: string) => void;
  applyCommand: (command: Command) => void;
  undo: () => void;
  redo: () => void;

  setPlaybackState: (state: PlaybackState) => void;
  setTempo: (tempo: number) => void;
  setTimeSignature: (numerator: number, denominator: number) => void;
  setPlaybackPositionTicks: (ticks: number) => void;
  toggleLoop: () => void;
  setMasterVolume: (volume: number) => void;
  setSessionName: (name: string) => void;

  selectTrack: (trackId: string, additive?: boolean) => void;
  addTrack: (type: TrackType) => void;
  deleteTrack: (trackId: string) => void;
  updateTrack: (trackId: string, patch: Partial<Track>) => void;
  duplicateTrack: (trackId: string) => void;

  createRegion: (trackId: string, startBar: number, lengthBars: number) => void;
  deleteRegion: (regionId: string) => void;
  openRegionInPianoRoll: (regionId: string) => void;
  updateRegion: (regionId: string, patch: Partial<Region>) => void;

  addNote: (note: Omit<MidiNote, "id">) => void;
  deleteNotes: (noteIds: string[]) => void;
  updateNote: (noteId: string, patch: Partial<MidiNote>) => void;
  moveNotes: (noteIds: string[], deltaTicks: number, deltaPitch: number) => void;

  setUi: (patch: Partial<UiState>) => void;
  setContextMenu: (menu: ContextMenuState) => void;
  clearSelection: () => void;

  addChatMessage: (text: string) => void;
  updateCollaborator: (id: string, patch: Partial<Collaborator>) => void;
  setLocalMediaState: (camera: boolean, mic: boolean) => void;
};

function cloneSnapshot(state: WorkspaceSnapshot): WorkspaceSnapshot {
  return {
    session: { ...state.session },
    tracks: state.tracks.map((t) => ({ ...t, effects: [...t.effects], regionIds: [...t.regionIds] })),
    regions: Object.fromEntries(
      Object.entries(state.regions).map(([k, v]) => [k, { ...v, noteIds: [...v.noteIds] }])
    ),
    notes: Object.fromEntries(Object.entries(state.notes).map(([k, v]) => [k, { ...v }])),
  };
}

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  ...createDefaultSession("Producer"),
  ui: createDefaultUiState(),
  collaborators: [],
  chatMessages: [],
  localUserId: generateId("user"),
  localUserName: "Producer",
  commandHistory: createCommandHistory(),
  cpuUsage: 12,
  memoryUsage: 34,

  initSession(userName) {
    const snapshot = createDefaultSession(userName);
    const track = snapshot.tracks[0];
    const regionId = track.regionIds[0];
    const demoNotes = Object.values(createDemoNotes(regionId, track.color));
    const notes: Record<string, MidiNote> = {};
    const noteIds: string[] = [];
    for (const n of demoNotes) {
      notes[n.id] = n;
      noteIds.push(n.id);
    }
    snapshot.regions[regionId].noteIds = noteIds;
    snapshot.notes = notes;

    set({
      ...snapshot,
      ui: {
        ...createDefaultUiState(),
        selectedTrackIds: [track.id],
        openRegionId: regionId,
      },
      localUserName: userName,
      localUserId: generateId("user"),
      collaborators: [
        {
          id: generateId("collab"),
          name: userName,
          color: TRACK_COLOR_PALETTE[0],
          cursorX: 0,
          cursorY: 0,
          cameraEnabled: false,
          micEnabled: false,
        },
      ],
      chatMessages: [],
      commandHistory: createCommandHistory(),
    });
  },

  applyCommand(command) {
    const state = get();
    const snapshot: WorkspaceSnapshot = {
      session: state.session,
      tracks: state.tracks,
      regions: state.regions,
      notes: state.notes,
    };
    const next = command.do(cloneSnapshot(snapshot));
    set({
      ...next,
      commandHistory: pushCommand(state.commandHistory, command),
    });
  },

  undo() {
    const state = get();
    const snapshot: WorkspaceSnapshot = {
      session: state.session,
      tracks: state.tracks,
      regions: state.regions,
      notes: state.notes,
    };
    const result = undoCommand(state.commandHistory, snapshot);
    if (!result) return;
    set({ ...result.state, commandHistory: result.history });
  },

  redo() {
    const state = get();
    const snapshot: WorkspaceSnapshot = {
      session: state.session,
      tracks: state.tracks,
      regions: state.regions,
      notes: state.notes,
    };
    const result = redoCommand(state.commandHistory, snapshot);
    if (!result) return;
    set({ ...result.state, commandHistory: result.history });
  },

  setPlaybackState(playbackState) {
    set((s) => ({ session: { ...s.session, playbackState } }));
  },

  setTempo(tempo) {
    set((s) => ({ session: { ...s.session, tempo: Math.max(20, Math.min(300, tempo)) } }));
  },

  setTimeSignature(numerator, denominator) {
    set((s) => ({
      session: { ...s.session, timeSignature: { numerator, denominator } },
    }));
  },

  setPlaybackPositionTicks(ticks) {
    set((s) => ({ session: { ...s.session, playbackPositionTicks: Math.max(0, ticks) } }));
  },

  toggleLoop() {
    set((s) => ({ session: { ...s.session, loopEnabled: !s.session.loopEnabled } }));
  },

  setMasterVolume(volume) {
    set((s) => ({
      session: { ...s.session, masterVolume: Math.max(0, Math.min(1, volume)) },
    }));
  },

  setSessionName(name) {
    set((s) => ({ session: { ...s.session, name: name.trim() || "Untitled Session" } }));
  },

  selectTrack(trackId, additive = false) {
    set((s) => ({
      ui: {
        ...s.ui,
        selectedTrackIds: additive
          ? s.ui.selectedTrackIds.includes(trackId)
            ? s.ui.selectedTrackIds.filter((id) => id !== trackId)
            : [...s.ui.selectedTrackIds, trackId]
          : [trackId],
        focusedPanel: "tracks",
      },
    }));
  },

  addTrack(type) {
    const state = get();
    const id = generateId("track");
    const color = TRACK_COLOR_PALETTE[state.tracks.length % TRACK_COLOR_PALETTE.length];
    const track: Track = {
      id,
      name: `${type === "audio" ? "Audio" : type === "instrument" ? "Instrument" : "MIDI"} ${state.tracks.length + 1}`,
      type,
      color,
      mute: false,
      solo: false,
      arm: false,
      volume: 0.8,
      pan: 0,
      midiChannel: state.tracks.length + 1,
      instrument: type === "audio" ? "Input 1" : "Genesis Synth",
      effects: [],
      regionIds: [],
      level: 0,
    };
    const command: Command = {
      id: generateId("cmd"),
      label: "Add track",
      do: (snap) => ({ ...snap, tracks: [...snap.tracks, track] }),
      undo: (snap) => ({ ...snap, tracks: snap.tracks.filter((t) => t.id !== id) }),
      toJSON: () => ({ type: "addTrack", trackId: id }),
    };
    get().applyCommand(command);
    set((s) => ({ ui: { ...s.ui, selectedTrackIds: [id] } }));
  },

  deleteTrack(trackId) {
    const state = get();
    const prev = cloneSnapshot(state);
    const command: Command = {
      id: generateId("cmd"),
      label: "Delete track",
      do: (snap) => {
        const track = snap.tracks.find((t) => t.id === trackId);
        if (!track) return snap;
        const regionIds = new Set(track.regionIds);
        const notes = { ...snap.notes };
        for (const rid of regionIds) {
          const region = snap.regions[rid];
          if (region) {
            for (const nid of region.noteIds) delete notes[nid];
          }
        }
        const regions = { ...snap.regions };
        for (const rid of regionIds) delete regions[rid];
        return {
          ...snap,
          tracks: snap.tracks.filter((t) => t.id !== trackId),
          regions,
          notes,
        };
      },
      undo: () => prev,
      toJSON: () => ({ type: "deleteTrack", trackId }),
    };
    get().applyCommand(command);
  },

  updateTrack(trackId, patch) {
    set((s) => ({
      tracks: s.tracks.map((t) => (t.id === trackId ? { ...t, ...patch } : t)),
    }));
  },

  duplicateTrack(trackId) {
    const state = get();
    const source = state.tracks.find((t) => t.id === trackId);
    if (!source) return;
    const newTrackId = generateId("track");
    const newTrack: Track = {
      ...source,
      id: newTrackId,
      name: `${source.name} Copy`,
      regionIds: [],
      effects: [...source.effects],
    };
    const newRegions: Record<string, Region> = {};
    const newNotes: Record<string, MidiNote> = {};
    const regionIdMap = new Map<string, string>();

    for (const rid of source.regionIds) {
      const region = state.regions[rid];
      if (!region) continue;
      const newRid = generateId("region");
      regionIdMap.set(rid, newRid);
      const noteIds: string[] = [];
      for (const nid of region.noteIds) {
        const note = state.notes[nid];
        if (!note) continue;
        const newNid = generateId("note");
        newNotes[newNid] = { ...note, id: newNid, regionId: newRid };
        noteIds.push(newNid);
      }
      newRegions[newRid] = { ...region, id: newRid, trackId: newTrackId, noteIds };
      newTrack.regionIds.push(newRid);
    }

    const command: Command = {
      id: generateId("cmd"),
      label: "Duplicate track",
      do: (snap) => ({
        ...snap,
        tracks: [...snap.tracks, newTrack],
        regions: { ...snap.regions, ...newRegions },
        notes: { ...snap.notes, ...newNotes },
      }),
      undo: (snap) => ({
        ...snap,
        tracks: snap.tracks.filter((t) => t.id !== newTrackId),
        regions: Object.fromEntries(
          Object.entries(snap.regions).filter(([k]) => !regionIdMap.has(k) && !Object.values(newRegions).some((r) => r.id === k))
        ),
        notes: Object.fromEntries(
          Object.entries(snap.notes).filter(([, n]) => n.regionId !== newTrackId && !Object.values(newNotes).some((nn) => nn.id === n.id))
        ),
      }),
      toJSON: () => ({ type: "duplicateTrack", sourceId: trackId }),
    };
    get().applyCommand(command);
  },

  createRegion(trackId, startBar, lengthBars) {
    const state = get();
    const regionId = generateId("region");
    const region: Region = {
      id: regionId,
      trackId,
      name: "Region",
      startBar,
      lengthBars: Math.max(1, lengthBars),
      noteIds: [],
    };
    const prev = cloneSnapshot(state);
    const command: Command = {
      id: generateId("cmd"),
      label: "Add region",
      do: (snap) => ({
        ...snap,
        tracks: snap.tracks.map((t) =>
          t.id === trackId ? { ...t, regionIds: [...t.regionIds, regionId] } : t
        ),
        regions: { ...snap.regions, [regionId]: region },
      }),
      undo: () => prev,
      toJSON: () => ({ type: "createRegion", regionId }),
    };
    get().applyCommand(command);
  },

  deleteRegion(regionId) {
    const state = get();
    const prev = cloneSnapshot(state);
    const command: Command = {
      id: generateId("cmd"),
      label: "Delete region",
      do: (snap) => {
        const region = snap.regions[regionId];
        if (!region) return snap;
        const notes = { ...snap.notes };
        for (const nid of region.noteIds) delete notes[nid];
        const regions = { ...snap.regions };
        delete regions[regionId];
        return {
          ...snap,
          tracks: snap.tracks.map((t) =>
            t.id === region.trackId
              ? { ...t, regionIds: t.regionIds.filter((id) => id !== regionId) }
              : t
          ),
          regions,
          notes,
        };
      },
      undo: () => prev,
      toJSON: () => ({ type: "deleteRegion", regionId }),
    };
    get().applyCommand(command);
  },

  openRegionInPianoRoll(regionId) {
    set((s) => ({
      ui: {
        ...s.ui,
        openRegionId: regionId,
        selectedRegionIds: [regionId],
        focusedPanel: "piano-roll",
      },
    }));
  },

  updateRegion(regionId, patch) {
    set((s) => ({
      regions: {
        ...s.regions,
        [regionId]: { ...s.regions[regionId], ...patch },
      },
    }));
  },

  addNote(noteInput) {
    const state = get();
    const id = generateId("note");
    const note: MidiNote = { ...noteInput, id };
    const region = state.regions[noteInput.regionId];
    if (!region) return;
    const prev = cloneSnapshot(state);
    const command: Command = {
      id: generateId("cmd"),
      label: "Add note",
      do: (snap) => {
        const r = snap.regions[noteInput.regionId];
        if (!r) return snap;
        return {
          ...snap,
          notes: { ...snap.notes, [id]: note },
          regions: {
            ...snap.regions,
            [noteInput.regionId]: { ...r, noteIds: [...r.noteIds, id] },
          },
        };
      },
      undo: () => prev,
      toJSON: () => ({ type: "addNote", noteId: id }),
    };
    get().applyCommand(command);
  },

  deleteNotes(noteIds) {
    const state = get();
    const prev = cloneSnapshot(state);
    const command: Command = {
      id: generateId("cmd"),
      label: "Delete notes",
      do: (snap) => {
        const notes = { ...snap.notes };
        const regions = { ...snap.regions };
        for (const nid of noteIds) {
          const note = notes[nid];
          if (!note) continue;
          delete notes[nid];
          const r = regions[note.regionId];
          if (r) {
            regions[note.regionId] = {
              ...r,
              noteIds: r.noteIds.filter((id) => id !== nid),
            };
          }
        }
        return { ...snap, notes, regions };
      },
      undo: () => prev,
      toJSON: () => ({ type: "deleteNotes", noteIds }),
    };
    get().applyCommand(command);
    set((s) => ({
      ui: {
        ...s.ui,
        selectedNoteIds: s.ui.selectedNoteIds.filter((id) => !noteIds.includes(id)),
      },
    }));
  },

  updateNote(noteId, patch) {
    set((s) => {
      const note = s.notes[noteId];
      if (!note) return s;
      return { notes: { ...s.notes, [noteId]: { ...note, ...patch } } };
    });
  },

  moveNotes(noteIds, deltaTicks, deltaPitch) {
    const state = get();
    const prev = cloneSnapshot(state);
    const tpb = ticksPerBar(state.session.timeSignature);
    const grid = quantizeTicks(state.ui.quantizeGrid, tpb);
    const command: Command = {
      id: generateId("cmd"),
      label: "Move notes",
      do: (snap) => {
        const notes = { ...snap.notes };
        for (const nid of noteIds) {
          const note = notes[nid];
          if (!note) continue;
          notes[nid] = {
            ...note,
            startTicks: snapTicks(Math.max(0, note.startTicks + deltaTicks), grid),
            pitch: Math.max(0, Math.min(127, note.pitch + deltaPitch)),
          };
        }
        return { ...snap, notes };
      },
      undo: () => prev,
      toJSON: () => ({ type: "moveNotes", noteIds, deltaTicks, deltaPitch }),
    };
    get().applyCommand(command);
  },

  setUi(patch) {
    set((s) => {
      const next = { ...s.ui, ...patch };
      if (patch.leftPanelWidth !== undefined) {
        next.leftPanelWidth = Math.max(MIN_PANEL_WIDTH, Math.min(MAX_PANEL_WIDTH, patch.leftPanelWidth));
      }
      if (patch.rightPanelWidth !== undefined) {
        next.rightPanelWidth = Math.max(MIN_PANEL_WIDTH, Math.min(MAX_PANEL_WIDTH, patch.rightPanelWidth));
      }
      if (patch.pianoRollHeight !== undefined) {
        next.pianoRollHeight = Math.max(MIN_PIANO_ROLL_HEIGHT, Math.min(MAX_PIANO_ROLL_HEIGHT, patch.pianoRollHeight));
      }
      if (patch.trackHeight !== undefined) {
        next.trackHeight = Math.max(40, Math.min(120, patch.trackHeight));
      }
      return { ui: next };
    });
  },

  setContextMenu(menu) {
    set((s) => ({ ui: { ...s.ui, contextMenu: menu } }));
  },

  clearSelection() {
    set((s) => ({
      ui: {
        ...s.ui,
        selectedNoteIds: [],
        selectedRegionIds: [],
        contextMenu: null,
      },
    }));
  },

  addChatMessage(text) {
    const state = get();
    const msg: ChatMessage = {
      id: generateId("chat"),
      userId: state.localUserId,
      userName: state.localUserName,
      text,
      timestamp: Date.now(),
    };
    set((s) => ({ chatMessages: [...s.chatMessages, msg] }));
  },

  updateCollaborator(id, patch) {
    set((s) => ({
      collaborators: s.collaborators.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  },

  setLocalMediaState(camera, mic) {
    const state = get();
    const local = state.collaborators.find((c) => c.id === state.localUserId) ?? state.collaborators[0];
    if (local) {
      get().updateCollaborator(local.id, { cameraEnabled: camera, micEnabled: mic });
    }
  },
}));

export { DEFAULT_TRACK_HEIGHT, barToTicks, ticksPerBar };
