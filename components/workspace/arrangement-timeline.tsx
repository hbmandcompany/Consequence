"use client";

import { useCallback, useRef, useState } from "react";
import { barToTicks, ticksPerBar } from "@/lib/workspace/music";
import { useWorkspaceStore } from "@/stores/workspace-store";

const PIXELS_PER_BAR = 80;

export function ArrangementTimeline() {
  const tracks = useWorkspaceStore((s) => s.tracks);
  const regions = useWorkspaceStore((s) => s.regions);
  const session = useWorkspaceStore((s) => s.session);
  const ui = useWorkspaceStore((s) => s.ui);
  const createRegion = useWorkspaceStore((s) => s.createRegion);
  const openRegionInPianoRoll = useWorkspaceStore((s) => s.openRegionInPianoRoll);
  const setContextMenu = useWorkspaceStore((s) => s.setContextMenu);
  const setUi = useWorkspaceStore((s) => s.setUi);
  const setPlaybackPositionTicks = useWorkspaceStore((s) => s.setPlaybackPositionTicks);

  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<{
    trackId: string;
    startBar: number;
    currentBar: number;
  } | null>(null);

  const zoom = ui.timelineZoom;
  const ppb = PIXELS_PER_BAR * zoom;
  const tpb = ticksPerBar(session.timeSignature);
  const totalBars = 32;
  const playheadX =
    ((session.playbackPositionTicks / tpb) * ppb) - ui.timelineScrollX;

  const barFromClientX = useCallback(
    (clientX: number, trackLaneEl: HTMLElement) => {
      const rect = trackLaneEl.getBoundingClientRect();
      const x = clientX - rect.left + ui.timelineScrollX;
      return Math.max(1, Math.floor(x / ppb) + 1);
    },
    [ppb, ui.timelineScrollX]
  );

  const onLanePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    trackId: string
  ) => {
    if (e.button !== 0) return;
    const bar = barFromClientX(e.clientX, e.currentTarget);
    setDragging({ trackId, startBar: bar, currentBar: bar });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onLanePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const bar = barFromClientX(e.clientX, e.currentTarget);
    setDragging((d) => (d ? { ...d, currentBar: bar } : null));
  };

  const onLanePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const start = Math.min(dragging.startBar, dragging.currentBar);
    const end = Math.max(dragging.startBar, dragging.currentBar);
    const length = Math.max(1, end - start + 1);
    const track = tracks.find((t) => t.id === dragging.trackId);
    if (track && (track.type === "midi" || track.type === "instrument")) {
      createRegion(dragging.trackId, start, length);
    }
    setDragging(null);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full min-h-0 bg-ws-bg"
      onFocus={() => setUi({ focusedPanel: "timeline" })}
      onWheel={(e) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          setUi({
            timelineZoom: Math.max(0.5, Math.min(3, ui.timelineZoom + (e.deltaY > 0 ? -0.1 : 0.1))),
          });
        } else {
          setUi({ timelineScrollX: Math.max(0, ui.timelineScrollX + e.deltaY) });
        }
      }}
    >
      <div className="shrink-0 h-6 border-b border-ws-border bg-ws-surface relative overflow-hidden">
        <div
          className="absolute top-0 h-full"
          style={{ transform: `translateX(-${ui.timelineScrollX}px)` }}
        >
          {Array.from({ length: totalBars }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full border-l border-ws-border text-[10px] font-mono text-ws-text-muted pl-1"
              style={{ left: i * ppb, width: ppb }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 relative">
        <div
          className="absolute top-0 bottom-0 w-px bg-ws-accent z-20 pointer-events-none"
          style={{ left: playheadX }}
        />

        {tracks.map((track) => (
          <div
            key={track.id}
            className="relative border-b border-ws-border"
            style={{ height: ui.trackHeight }}
          >
            <div
              className="absolute inset-0"
              style={{ transform: `translateX(-${ui.timelineScrollX}px)` }}
              onPointerDown={(e) => onLanePointerDown(e, track.id)}
              onPointerMove={onLanePointerMove}
              onPointerUp={onLanePointerUp}
              onContextMenu={(e) => {
                e.preventDefault();
                const bar = barFromClientX(e.clientX, e.currentTarget);
                setContextMenu({
                  x: e.clientX,
                  y: e.clientY,
                  target: { kind: "timeline-empty", trackId: track.id, bar },
                });
              }}
              onClick={(e) => {
                const bar = barFromClientX(e.clientX, e.currentTarget);
                setPlaybackPositionTicks(barToTicks(bar, session.timeSignature));
              }}
            >
              {Array.from({ length: totalBars }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 h-full border-l border-ws-border/50"
                  style={{ left: i * ppb }}
                />
              ))}

              {dragging?.trackId === track.id && (
                <div
                  className="absolute top-1 bottom-1 rounded-md border border-ws-accent/60 bg-ws-accent/10"
                  style={{
                    left:
                      (Math.min(dragging.startBar, dragging.currentBar) - 1) * ppb,
                    width:
                      Math.abs(dragging.currentBar - dragging.startBar + 1) * ppb,
                  }}
                />
              )}

              {track.regionIds.map((rid) => {
                const region = regions[rid];
                if (!region) return null;
                const left = (region.startBar - 1) * ppb;
                const width = region.lengthBars * ppb;
                const isAudio = track.type === "audio";
                return (
                  <div
                    key={rid}
                    role="button"
                    tabIndex={0}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      openRegionInPianoRoll(rid);
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setContextMenu({
                        x: e.clientX,
                        y: e.clientY,
                        target: { kind: "midi-region", regionId: rid },
                      });
                    }}
                    className="absolute top-1 bottom-1 rounded-lg overflow-hidden cursor-pointer"
                    style={{
                      left,
                      width,
                      backgroundColor: `${track.color}33`,
                      border: `1.5px solid ${track.color}`,
                    }}
                  >
                    {isAudio ? (
                      <svg className="w-full h-full opacity-70" preserveAspectRatio="none">
                        <path
                          d={`M0 ${ui.trackHeight / 2} ${Array.from({ length: 40 })
                            .map((_, i) => {
                              const x = (i / 39) * 100;
                              const y =
                                50 +
                                Math.sin(i * 0.8) * 20 +
                                Math.cos(i * 0.3) * 15;
                              return `L${x}% ${y}%`;
                            })
                            .join(" ")}`}
                          fill="none"
                          stroke={track.color}
                          strokeWidth="1"
                        />
                      </svg>
                    ) : (
                      <span className="px-2 text-[10px] text-ws-text-primary truncate block pt-1">
                        {region.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
