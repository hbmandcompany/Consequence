"use client";

import { useEffect } from "react";
import { TRACK_COLOR_PALETTE } from "@/lib/workspace/constants";
import { useWorkspaceStore } from "@/stores/workspace-store";

type MenuItem = {
  label: string;
  shortcut?: string;
  action: () => void;
};

export function WorkspaceContextMenu() {
  const menu = useWorkspaceStore((s) => s.ui.contextMenu);
  const setContextMenu = useWorkspaceStore((s) => s.setContextMenu);
  const createRegion = useWorkspaceStore((s) => s.createRegion);
  const deleteRegion = useWorkspaceStore((s) => s.deleteRegion);
  const openRegionInPianoRoll = useWorkspaceStore((s) => s.openRegionInPianoRoll);
  const deleteNotes = useWorkspaceStore((s) => s.deleteNotes);
  const deleteTrack = useWorkspaceStore((s) => s.deleteTrack);
  const duplicateTrack = useWorkspaceStore((s) => s.duplicateTrack);
  const updateTrack = useWorkspaceStore((s) => s.updateTrack);
  const updateRegion = useWorkspaceStore((s) => s.updateRegion);
  const tracks = useWorkspaceStore((s) => s.tracks);
  const notes = useWorkspaceStore((s) => s.notes);

  useEffect(() => {
    const close = () => setContextMenu(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("click", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [setContextMenu]);

  if (!menu) return null;

  const target = menu.target;
  let items: MenuItem[] = [];

  switch (target.kind) {
    case "timeline-empty": {
      const { trackId, bar } = target;
      items = [
        {
          label: "New MIDI region",
          shortcut: "⌘N",
          action: () => createRegion(trackId, bar, 4),
        },
        {
          label: "New audio region",
          action: () => createRegion(trackId, bar, 4),
        },
        { label: "Paste", shortcut: "⌘V", action: () => undefined },
      ];
      break;
    }
    case "midi-region": {
      const { regionId } = target;
      items = [
        {
          label: "Open in piano roll",
          action: () => openRegionInPianoRoll(regionId),
        },
        {
          label: "Duplicate",
          action: () => {
            const region = useWorkspaceStore.getState().regions[regionId];
            if (region) {
              createRegion(region.trackId, region.startBar + region.lengthBars, region.lengthBars);
            }
          },
        },
        {
          label: "Delete",
          shortcut: "⌫",
          action: () => deleteRegion(regionId),
        },
        {
          label: "Rename",
          action: () => updateRegion(regionId, { name: "Renamed" }),
        },
        {
          label: "Set color",
          action: () => {
            const region = useWorkspaceStore.getState().regions[regionId];
            if (!region) return;
            const track = tracks.find((t) => t.id === region.trackId);
            if (track) {
              const idx = TRACK_COLOR_PALETTE.indexOf(track.color as (typeof TRACK_COLOR_PALETTE)[number]);
              const next = TRACK_COLOR_PALETTE[(idx + 1) % TRACK_COLOR_PALETTE.length];
              useWorkspaceStore.getState().updateTrack(track.id, { color: next });
            }
          },
        },
        { label: "Quantize contents", action: () => undefined },
      ];
      break;
    }
    case "midi-note": {
      const { noteId } = target;
      const note = notes[noteId];
      items = [
        {
          label: "Delete",
          shortcut: "⌫",
          action: () => deleteNotes([noteId]),
        },
        {
          label: "Set velocity",
          action: () => {
            if (note) useWorkspaceStore.getState().updateNote(noteId, { velocity: 100 });
          },
        },
        { label: "Quantize", action: () => undefined },
        {
          label: "Set duration",
          action: () => {
            if (note) useWorkspaceStore.getState().updateNote(noteId, { durationTicks: 480 });
          },
        },
      ];
      break;
    }
    case "track": {
      const { trackId } = target;
      items = [
        {
          label: "Duplicate track",
          action: () => duplicateTrack(trackId),
        },
        {
          label: "Delete track",
          action: () => deleteTrack(trackId),
        },
        {
          label: "Rename track",
          action: () => {
            const t = tracks.find((tr) => tr.id === trackId);
            if (t) updateTrack(t.id, { name: `${t.name} (renamed)` });
          },
        },
        {
          label: "Set color",
          action: () => {
            const t = tracks.find((tr) => tr.id === trackId);
            if (t) {
              const idx = TRACK_COLOR_PALETTE.indexOf(t.color as (typeof TRACK_COLOR_PALETTE)[number]);
              updateTrack(t.id, { color: TRACK_COLOR_PALETTE[(idx + 1) % TRACK_COLOR_PALETTE.length] });
            }
          },
        },
        { label: "Add effect", action: () => undefined },
      ];
      break;
    }
  }

  return (
    <div
      className="fixed z-[100] min-w-[180px] rounded-md border border-ws-border bg-ws-elevated p-2 shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
      style={{ left: menu.x, top: menu.y }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => {
            item.action();
            setContextMenu(null);
          }}
          className="flex w-full h-8 items-center justify-between gap-4 rounded px-3 text-[12px] text-ws-text-primary hover:bg-ws-border"
        >
          <span>{item.label}</span>
          {item.shortcut && (
            <span className="text-[10px] text-ws-text-muted font-mono">{item.shortcut}</span>
          )}
        </button>
      ))}
    </div>
  );
}
