"use client";

import { Plus, Volume2 } from "lucide-react";
import { useWorkspaceStore } from "@/stores/workspace-store";

function LevelMeter({ level }: { level: number }) {
  const bars = 4;
  return (
    <div className="flex gap-px h-3 items-end">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm bg-ws-border"
          style={{
            height: `${Math.max(2, (level * 12) * ((i + 1) / bars))}px`,
            backgroundColor: level * bars > i ? "#A0A0A0" : undefined,
          }}
        />
      ))}
    </div>
  );
}

export function TrackList() {
  const tracks = useWorkspaceStore((s) => s.tracks);
  const selectedTrackIds = useWorkspaceStore((s) => s.ui.selectedTrackIds);
  const selectTrack = useWorkspaceStore((s) => s.selectTrack);
  const updateTrack = useWorkspaceStore((s) => s.updateTrack);
  const addTrack = useWorkspaceStore((s) => s.addTrack);
  const setUi = useWorkspaceStore((s) => s.setUi);
  const setContextMenu = useWorkspaceStore((s) => s.setContextMenu);

  return (
    <div
      className="flex flex-col h-full min-h-0"
      onFocus={() => setUi({ focusedPanel: "tracks" })}
    >
      <div className="shrink-0 px-3 py-2 border-b border-ws-border">
        <span className="text-[10px] uppercase tracking-wider text-ws-text-muted">Tracks</span>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0">
        {tracks.map((track) => {
          const selected = selectedTrackIds.includes(track.id);
          return (
            <div
              key={track.id}
              role="button"
              tabIndex={0}
              onClick={() => selectTrack(track.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                selectTrack(track.id);
                setContextMenu({
                  x: e.clientX,
                  y: e.clientY,
                  target: { kind: "track", trackId: track.id },
                });
              }}
              className={`flex items-center gap-2 px-2 py-2 border-b border-ws-border cursor-pointer ${
                selected ? "bg-ws-elevated" : "hover:bg-ws-surface"
              }`}
            >
              <span
                className="w-1 h-8 rounded-full shrink-0"
                style={{ backgroundColor: track.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-ws-text-primary truncate">{track.name}</p>
                <p className="text-[10px] text-ws-text-muted capitalize">{track.type}</p>
              </div>
              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  type="button"
                  aria-label="Mute"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateTrack(track.id, { mute: !track.mute });
                  }}
                  className={`w-6 h-6 text-[10px] rounded ${
                    track.mute ? "bg-ws-accent text-ws-bg" : "text-ws-text-muted hover:bg-ws-elevated"
                  }`}
                >
                  M
                </button>
                <button
                  type="button"
                  aria-label="Solo"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateTrack(track.id, { solo: !track.solo });
                  }}
                  className={`w-6 h-6 text-[10px] rounded ${
                    track.solo ? "bg-ws-accent text-ws-bg" : "text-ws-text-muted hover:bg-ws-elevated"
                  }`}
                >
                  S
                </button>
                <button
                  type="button"
                  aria-label="Arm"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateTrack(track.id, { arm: !track.arm });
                  }}
                  className={`w-6 h-6 text-[10px] rounded ${
                    track.arm ? "text-red-400 bg-ws-elevated" : "text-ws-text-muted hover:bg-ws-elevated"
                  }`}
                >
                  R
                </button>
              </div>
              <LevelMeter level={track.level} />
            </div>
          );
        })}
      </div>
      <div className="shrink-0 p-2 border-t border-ws-border">
        <button
          type="button"
          onClick={() => addTrack("midi")}
          className="flex w-full items-center justify-center gap-2 py-2 text-[12px] text-ws-text-secondary hover:text-ws-text-primary hover:bg-ws-elevated rounded"
        >
          <Plus className="h-3.5 w-3.5" />
          Add track
        </button>
      </div>
    </div>
  );
}

export function InspectorPanel() {
  const tracks = useWorkspaceStore((s) => s.tracks);
  const selectedTrackIds = useWorkspaceStore((s) => s.ui.selectedTrackIds);
  const updateTrack = useWorkspaceStore((s) => s.updateTrack);

  const track = tracks.find((t) => t.id === selectedTrackIds[0]);

  if (!track) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 text-[12px] text-ws-text-muted">
        Select a track
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto min-h-0 border-t border-ws-border p-3 space-y-4">
      <p className="text-[14px] text-ws-text-primary font-sans">Inspector</p>
      <label className="block">
        <span className="text-[10px] uppercase tracking-wider text-ws-text-muted">Name</span>
        <input
          value={track.name}
          onChange={(e) => updateTrack(track.id, { name: e.target.value })}
          className="mt-1 w-full bg-ws-elevated border border-ws-border rounded px-2 py-1.5 text-[12px] text-ws-text-primary outline-none focus:border-ws-text-muted"
        />
      </label>
      <label className="block">
        <span className="text-[10px] uppercase tracking-wider text-ws-text-muted">Instrument</span>
        <input
          value={track.instrument}
          onChange={(e) => updateTrack(track.id, { instrument: e.target.value })}
          className="mt-1 w-full bg-ws-elevated border border-ws-border rounded px-2 py-1.5 text-[12px] text-ws-text-primary outline-none"
        />
      </label>
      <label className="block">
        <span className="text-[10px] uppercase tracking-wider text-ws-text-muted">MIDI Channel</span>
        <input
          type="number"
          min={1}
          max={16}
          value={track.midiChannel}
          onChange={(e) => updateTrack(track.id, { midiChannel: Number(e.target.value) })}
          className="mt-1 w-full bg-ws-elevated border border-ws-border rounded px-2 py-1.5 text-[12px] text-ws-text-primary font-mono outline-none"
        />
      </label>
      <label className="block">
        <span className="text-[10px] uppercase tracking-wider text-ws-text-muted flex items-center gap-1">
          <Volume2 className="h-3 w-3" /> Volume
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(track.volume * 100)}
          onChange={(e) => updateTrack(track.id, { volume: Number(e.target.value) / 100 })}
          className="mt-2 w-full h-1 accent-ws-accent"
        />
      </label>
      <label className="block">
        <span className="text-[10px] uppercase tracking-wider text-ws-text-muted">Pan</span>
        <input
          type="range"
          min={-100}
          max={100}
          value={Math.round(track.pan * 100)}
          onChange={(e) => updateTrack(track.id, { pan: Number(e.target.value) / 100 })}
          className="mt-2 w-full h-1 accent-ws-accent"
        />
      </label>
      <div>
        <span className="text-[10px] uppercase tracking-wider text-ws-text-muted">Effects</span>
        <p className="mt-1 text-[12px] text-ws-text-secondary">
          {track.effects.length === 0 ? "No effects" : track.effects.join(" → ")}
        </p>
      </div>
    </div>
  );
}
