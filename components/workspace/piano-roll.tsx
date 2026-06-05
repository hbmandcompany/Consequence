"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { QUANTIZE_OPTIONS, quantizeTicks } from "@/lib/workspace/constants";
import {
  isBlackKey,
  pitchToName,
  snapTicks,
  ticksPerBar,
} from "@/lib/workspace/music";
import type { MidiNote } from "@/lib/workspace/types";
import { useWorkspaceStore } from "@/stores/workspace-store";

const KEY_WIDTH = 48;
const ROW_HEIGHT = 14;
const MIN_PITCH = 36;
const MAX_PITCH = 84;
const PITCH_COUNT = MAX_PITCH - MIN_PITCH + 1;
const VELOCITY_LANE_HEIGHT = 48;

type DragMode =
  | { kind: "move"; noteId: string; startX: number; startY: number; orig: MidiNote }
  | { kind: "resize"; noteId: string; startX: number; orig: MidiNote }
  | { kind: "select-rect"; startX: number; startY: number }
  | null;

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export function PianoRoll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const velocityRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dirtyRef = useRef(true);
  const rafRef = useRef<number | null>(null);
  const interactingRef = useRef(false);

  const session = useWorkspaceStore((s) => s.session);
  const ui = useWorkspaceStore((s) => s.ui);
  const notes = useWorkspaceStore((s) => s.notes);
  const regions = useWorkspaceStore((s) => s.regions);
  const tracks = useWorkspaceStore((s) => s.tracks);
  const updateNote = useWorkspaceStore((s) => s.updateNote);
  const addNote = useWorkspaceStore((s) => s.addNote);
  const moveNotes = useWorkspaceStore((s) => s.moveNotes);
  const setUi = useWorkspaceStore((s) => s.setUi);
  const setContextMenu = useWorkspaceStore((s) => s.setContextMenu);

  const [drag, setDrag] = useState<DragMode>(null);
  const [hoverNoteId, setHoverNoteId] = useState<string | null>(null);

  const openRegionId = ui.openRegionId;
  const region = openRegionId ? regions[openRegionId] : null;
  const track = region ? tracks.find((t) => t.id === region.trackId) : null;
  const trackColor = track?.color ?? "#5B7C99";
  const regionNotes = region
    ? region.noteIds.map((id) => notes[id]).filter(Boolean)
    : [];

  const tpb = ticksPerBar(session.timeSignature);
  const gridTicks = quantizeTicks(ui.quantizeGrid, tpb);
  const ticksPerPixel = gridTicks / (20 * ui.pianoRollZoom);
  const regionStartTicks = region ? (region.startBar - 1) * tpb : 0;
  const regionLengthTicks = region ? region.lengthBars * tpb : tpb * 4;

  const pitchToY = (pitch: number) =>
    (MAX_PITCH - pitch) * ROW_HEIGHT + ui.pianoRollScrollY;
  const yToPitch = (y: number) =>
    Math.max(MIN_PITCH, Math.min(MAX_PITCH, MAX_PITCH - Math.floor((y - ui.pianoRollScrollY) / ROW_HEIGHT)));
  const tickToX = (tick: number) =>
    KEY_WIDTH + (tick - regionStartTicks) / ticksPerPixel - ui.pianoRollScrollX;
  const xToTick = (x: number) =>
    regionStartTicks + (x - KEY_WIDTH + ui.pianoRollScrollX) * ticksPerPixel;

  const hitTestNote = useCallback(
    (x: number, y: number): { noteId: string; resize: boolean } | null => {
      for (let i = regionNotes.length - 1; i >= 0; i--) {
        const note = regionNotes[i];
        const nx = tickToX(note.startTicks);
        const ny = pitchToY(note.pitch);
        const nw = note.durationTicks / ticksPerPixel;
        const nh = ROW_HEIGHT - 2;
        if (x >= nx && x <= nx + nw && y >= ny && y <= ny + nh) {
          const resize = x > nx + nw - 8;
          return { noteId: note.id, resize };
        }
      }
      return null;
    },
    [regionNotes, ticksPerPixel, ui.pianoRollScrollX, ui.pianoRollScrollY, regionStartTicks]
  );

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const velCanvas = velocityRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const gridHeight = container.clientHeight - VELOCITY_LANE_HEIGHT;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = gridHeight * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${gridHeight}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, gridHeight);

    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, 0, width, gridHeight);

    for (let p = MIN_PITCH; p <= MAX_PITCH; p++) {
      const y = pitchToY(p);
      ctx.fillStyle = isBlackKey(p) ? "#141414" : "#1A1A1A";
      ctx.fillRect(KEY_WIDTH, y, width - KEY_WIDTH, ROW_HEIGHT);
    }

    const gridStart = Math.floor(regionStartTicks / gridTicks);
    const gridEnd = Math.ceil((regionStartTicks + regionLengthTicks) / gridTicks);
    for (let g = gridStart; g <= gridEnd; g++) {
      const tick = g * gridTicks;
      const x = tickToX(tick);
      ctx.strokeStyle = g % (tpb / gridTicks) === 0 ? "#2A2A2A" : "#1E1E1E";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, gridHeight);
      ctx.stroke();
    }

    for (let p = MIN_PITCH; p <= MAX_PITCH; p++) {
      const y = pitchToY(p) + ROW_HEIGHT / 2;
      ctx.fillStyle = "#6B6B6B";
      ctx.font = "10px JetBrains Mono, ui-monospace, monospace";
      ctx.textAlign = "right";
      ctx.fillText(pitchToName(p), KEY_WIDTH - 6, y + 3);
    }

    for (const note of regionNotes) {
      const x = tickToX(note.startTicks);
      const y = pitchToY(note.pitch) + 1;
      const w = Math.max(6, note.durationTicks / ticksPerPixel);
      const h = ROW_HEIGHT - 2;
      const selected = ui.selectedNoteIds.includes(note.id);
      const hovered = hoverNoteId === note.id;

      ctx.fillStyle = trackColor;
      ctx.globalAlpha = 0.8;
      drawRoundedRect(ctx, x, y, w, h, 10);
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.strokeStyle = selected ? "#FFFFFF" : hovered ? "#A0A0A0" : trackColor;
      ctx.lineWidth = selected ? 2 : 1.5;
      drawRoundedRect(ctx, x, y, w, h, 10);
      ctx.stroke();
    }

    if (drag?.kind === "select-rect") {
      const x0 = Math.min(drag.startX, drag.startX);
      const y0 = Math.min(drag.startY, drag.startY);
      ctx.strokeStyle = "#FFFFFF55";
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(x0, y0, 0, 0);
      ctx.setLineDash([]);
    }

    if (velCanvas) {
      velCanvas.width = width * dpr;
      velCanvas.height = VELOCITY_LANE_HEIGHT * dpr;
      velCanvas.style.width = `${width}px`;
      velCanvas.style.height = `${VELOCITY_LANE_HEIGHT}px`;
      const vctx = velCanvas.getContext("2d");
      if (vctx) {
        vctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        vctx.clearRect(0, 0, width, VELOCITY_LANE_HEIGHT);
        vctx.fillStyle = "#141414";
        vctx.fillRect(0, 0, width, VELOCITY_LANE_HEIGHT);
        vctx.fillStyle = "#6B6B6B";
        vctx.font = "10px JetBrains Mono, monospace";
        vctx.fillText("VEL", 8, 14);
        for (const note of regionNotes) {
          const x = tickToX(note.startTicks);
          const w = Math.max(4, note.durationTicks / ticksPerPixel);
          const barH = (note.velocity / 127) * (VELOCITY_LANE_HEIGHT - 16);
          vctx.fillStyle = trackColor;
          vctx.globalAlpha = 0.7;
          vctx.fillRect(x, VELOCITY_LANE_HEIGHT - barH - 4, w, barH);
          vctx.globalAlpha = 1;
        }
      }
    }

    dirtyRef.current = false;
  }, [
    regionNotes,
    trackColor,
    ui.selectedNoteIds,
    hoverNoteId,
    drag,
    ticksPerPixel,
    gridTicks,
    regionStartTicks,
    regionLengthTicks,
    tpb,
    ui.pianoRollScrollX,
    ui.pianoRollScrollY,
    tickToX,
    pitchToY,
  ]);

  useEffect(() => {
    dirtyRef.current = true;
  }, [notes, ui, region, session, hoverNoteId, drag]);

  useEffect(() => {
    const loop = () => {
      if (dirtyRef.current || interactingRef.current) {
        render();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [render]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!region || !openRegionId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    interactingRef.current = true;
    setUi({ focusedPanel: "piano-roll" });

    const hit = hitTestNote(x, y);
    if (hit) {
      const note = notes[hit.noteId];
      if (!note) return;
      if (!ui.selectedNoteIds.includes(hit.noteId)) {
        setUi({ selectedNoteIds: [hit.noteId] });
      }
      if (hit.resize) {
        setDrag({ kind: "resize", noteId: hit.noteId, startX: x, orig: { ...note } });
      } else {
        setDrag({
          kind: "move",
          noteId: hit.noteId,
          startX: x,
          startY: y,
          orig: { ...note },
        });
      }
    } else if (x > KEY_WIDTH) {
      setDrag({ kind: "select-rect", startX: x, startY: y });
      setUi({ selectedNoteIds: [] });
    }
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!drag) {
      const hit = hitTestNote(x, y);
      setHoverNoteId(hit?.noteId ?? null);
      return;
    }

    dirtyRef.current = true;

    if (drag.kind === "move") {
      const dx = x - drag.startX;
      const dy = y - drag.startY;
      const deltaTicks = Math.round(dx * ticksPerPixel);
      const deltaPitch = -Math.round(dy / ROW_HEIGHT);
      const ids = ui.selectedNoteIds.length > 0 ? ui.selectedNoteIds : [drag.noteId];
      for (const nid of ids) {
        const n = notes[nid];
        if (!n) continue;
        updateNote(nid, {
          startTicks: snapTicks(Math.max(0, drag.orig.startTicks + (nid === drag.noteId ? deltaTicks : 0)), gridTicks),
          pitch: Math.max(0, Math.min(127, drag.orig.pitch + (nid === drag.noteId ? deltaPitch : 0))),
        });
      }
    }

    if (drag.kind === "resize") {
      const dx = x - drag.startX;
      const newDur = snapTicks(
        Math.max(gridTicks, drag.orig.durationTicks + dx * ticksPerPixel),
        gridTicks
      );
      updateNote(drag.noteId, { durationTicks: newDur });
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    interactingRef.current = false;
    if (drag?.kind === "select-rect") {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const x0 = Math.min(drag.startX, x);
      const x1 = Math.max(drag.startX, x);
      const y0 = Math.min(drag.startY, y);
      const y1 = Math.max(drag.startY, y);
      const selected = regionNotes
        .filter((n) => {
          const nx = tickToX(n.startTicks);
          const ny = pitchToY(n.pitch);
          const nw = n.durationTicks / ticksPerPixel;
          const nh = ROW_HEIGHT;
          return nx + nw >= x0 && nx <= x1 && ny + nh >= y0 && ny <= y1;
        })
        .map((n) => n.id);
      setUi({ selectedNoteIds: selected });
    }
    if (drag?.kind === "move" && drag.noteId) {
      const note = notes[drag.noteId];
      const orig = drag.orig;
      if (note && (note.startTicks !== orig.startTicks || note.pitch !== orig.pitch)) {
        moveNotes(
          ui.selectedNoteIds.length ? ui.selectedNoteIds : [drag.noteId],
          note.startTicks - orig.startTicks,
          note.pitch - orig.pitch
        );
      }
    }
    setDrag(null);
    dirtyRef.current = true;
  };

  const onDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!region || !openRegionId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x <= KEY_WIDTH) return;
    const tick = snapTicks(xToTick(x), gridTicks);
    const pitch = yToPitch(y);
    addNote({
      regionId: openRegionId,
      pitch,
      startTicks: tick,
      durationTicks: gridTicks,
      velocity: 90,
    });
    dirtyRef.current = true;
  };

  const onContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const hit = hitTestNote(e.clientX - rect.left, e.clientY - rect.top);
    if (hit) {
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        target: { kind: "midi-note", noteId: hit.noteId },
      });
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-ws-bg border-t border-ws-border">
      <div className="shrink-0 flex items-center justify-between px-3 py-1.5 border-b border-ws-border bg-ws-surface">
        <span className="text-[12px] text-ws-text-secondary">
          {region ? `${region.name} · Piano Roll` : "Double-click a MIDI region to edit"}
        </span>
        <div className="flex items-center gap-1">
          {QUANTIZE_OPTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setUi({ quantizeGrid: q })}
              className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                ui.quantizeGrid === q
                  ? "bg-ws-accent text-ws-bg"
                  : "text-ws-text-muted hover:bg-ws-elevated"
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
      <div ref={containerRef} className="flex-1 min-h-0 flex flex-col">
        <canvas
          ref={canvasRef}
          className="flex-1 min-h-0 cursor-crosshair"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onDoubleClick={onDoubleClick}
          onContextMenu={onContextMenu}
        />
        <canvas ref={velocityRef} className="shrink-0 border-t border-ws-border" />
      </div>
    </div>
  );
}
