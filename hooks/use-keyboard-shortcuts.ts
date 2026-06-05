"use client";

import { useEffect } from "react";
import { quantizeTicks } from "@/lib/workspace/constants";
import { ticksPerBar } from "@/lib/workspace/music";
import { useWorkspaceStore } from "@/stores/workspace-store";

export function useKeyboardShortcuts() {
  const store = useWorkspaceStore;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const state = store.getState();
      const meta = e.metaKey || e.ctrlKey;
      const tpb = ticksPerBar(state.session.timeSignature);
      const grid = quantizeTicks(state.ui.quantizeGrid, tpb);

      if (e.key === " " && !meta) {
        e.preventDefault();
        const next =
          state.session.playbackState === "playing" ? "stopped" : "playing";
        state.setPlaybackState(next);
        return;
      }

      if (e.key === "r" && !meta) {
        e.preventDefault();
        const trackId = state.ui.selectedTrackIds[0];
        if (!trackId) return;
        const track = state.tracks.find((t) => t.id === trackId);
        if (track) state.updateTrack(trackId, { arm: !track.arm });
        return;
      }

      if (meta && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        state.undo();
        return;
      }

      if (meta && (e.key === "Z" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        state.redo();
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        state.clearSelection();
        state.setUi({ theoryPanelOpen: false });
        return;
      }

      if (state.ui.focusedPanel !== "piano-roll") return;

      const noteIds = state.ui.selectedNoteIds;

      if (meta && e.key === "a") {
        e.preventDefault();
        const regionId = state.ui.openRegionId;
        if (!regionId) return;
        const region = state.regions[regionId];
        if (region) state.setUi({ selectedNoteIds: [...region.noteIds] });
        return;
      }

      if ((e.key === "Delete" || e.key === "Backspace") && noteIds.length > 0) {
        e.preventDefault();
        state.deleteNotes(noteIds);
        return;
      }

      if (meta && e.key === "d" && noteIds.length > 0) {
        e.preventDefault();
        for (const nid of noteIds) {
          const note = state.notes[nid];
          if (!note) continue;
          state.addNote({
            regionId: note.regionId,
            pitch: note.pitch,
            startTicks: note.startTicks + grid,
            durationTicks: note.durationTicks,
            velocity: note.velocity,
          });
        }
        return;
      }

      if (noteIds.length === 0) return;

      if (e.key === "ArrowUp" && !meta) {
        e.preventDefault();
        state.moveNotes(noteIds, 0, 1);
        return;
      }
      if (e.key === "ArrowDown" && !meta) {
        e.preventDefault();
        state.moveNotes(noteIds, 0, -1);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        state.moveNotes(noteIds, meta ? -tpb : -grid, 0);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        state.moveNotes(noteIds, meta ? tpb : grid, 0);
        return;
      }

      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        state.setUi({ pianoRollZoom: Math.min(4, state.ui.pianoRollZoom + 0.1) });
        return;
      }
      if (e.key === "-") {
        e.preventDefault();
        state.setUi({ pianoRollZoom: Math.max(0.25, state.ui.pianoRollZoom - 0.1) });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [store]);
}
