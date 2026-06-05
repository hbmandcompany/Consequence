"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Circle,
  Mic,
  Pause,
  Play,
  Repeat,
  Square,
} from "lucide-react";
import { formatBarBeat } from "@/lib/workspace/music";
import { useWorkspaceStore } from "@/stores/workspace-store";

export function TransportBar() {
  const session = useWorkspaceStore((s) => s.session);
  const cpuUsage = useWorkspaceStore((s) => s.cpuUsage);
  const memoryUsage = useWorkspaceStore((s) => s.memoryUsage);
  const setPlaybackState = useWorkspaceStore((s) => s.setPlaybackState);
  const setPlaybackPositionTicks = useWorkspaceStore((s) => s.setPlaybackPositionTicks);
  const setTempo = useWorkspaceStore((s) => s.setTempo);
  const setTimeSignature = useWorkspaceStore((s) => s.setTimeSignature);
  const toggleLoop = useWorkspaceStore((s) => s.toggleLoop);
  const setMasterVolume = useWorkspaceStore((s) => s.setMasterVolume);
  const setSessionName = useWorkspaceStore((s) => s.setSessionName);
  const setUi = useWorkspaceStore((s) => s.setUi);

  const [editingTempo, setEditingTempo] = useState(false);
  const [tempoInput, setTempoInput] = useState(String(session.tempo));
  const [editingSig, setEditingSig] = useState(false);
  const [sigNum, setSigNum] = useState(String(session.timeSignature.numerator));
  const [sigDen, setSigDen] = useState(String(session.timeSignature.denominator));
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(session.name);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  const tickPlayback = useCallback(() => {
    const state = useWorkspaceStore.getState();
    if (state.session.playbackState !== "playing") return;
    const now = performance.now();
    if (lastTickRef.current === 0) lastTickRef.current = now;
    const elapsed = now - lastTickRef.current;
    lastTickRef.current = now;
    const ticksPerMs = (state.session.tempo / 60) * (480 / 1000);
    const next = state.session.playbackPositionTicks + elapsed * ticksPerMs;
    setPlaybackPositionTicks(next);
    rafRef.current = requestAnimationFrame(tickPlayback);
  }, [setPlaybackPositionTicks]);

  useEffect(() => {
    if (session.playbackState === "playing") {
      lastTickRef.current = 0;
      rafRef.current = requestAnimationFrame(tickPlayback);
    } else if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [session.playbackState, tickPlayback]);

  const isPlaying = session.playbackState === "playing";
  const isRecording = session.playbackState === "recording";

  return (
    <header
      className="flex h-12 shrink-0 items-center gap-3 border-b border-ws-border bg-ws-surface px-3"
      onFocus={() => setUi({ focusedPanel: "transport" })}
    >
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label={isPlaying ? "Stop" : "Play"}
          onClick={() => setPlaybackState(isPlaying ? "stopped" : "playing")}
          className="flex h-8 w-8 items-center justify-center rounded text-ws-text-primary hover:bg-ws-elevated"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          type="button"
          aria-label="Stop"
          onClick={() => {
            setPlaybackState("stopped");
            setPlaybackPositionTicks(0);
          }}
          className="flex h-8 w-8 items-center justify-center rounded text-ws-text-secondary hover:bg-ws-elevated hover:text-ws-text-primary"
        >
          <Square className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Record"
          onClick={() =>
            setPlaybackState(isRecording ? "stopped" : "recording")
          }
          className={`flex h-8 w-8 items-center justify-center rounded hover:bg-ws-elevated ${
            isRecording ? "text-red-400" : "text-ws-text-secondary hover:text-ws-text-primary"
          }`}
        >
          <Circle className={`h-3.5 w-3.5 ${isRecording ? "fill-current" : ""}`} />
        </button>
        <button
          type="button"
          aria-label="Toggle loop"
          onClick={toggleLoop}
          className={`flex h-8 w-8 items-center justify-center rounded hover:bg-ws-elevated ${
            session.loopEnabled ? "text-ws-accent" : "text-ws-text-secondary"
          }`}
        >
          <Repeat className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-3 text-[12px] font-mono text-ws-text-secondary">
        {editingTempo ? (
          <input
            autoFocus
            className="w-14 bg-ws-elevated border border-ws-border rounded px-1.5 py-0.5 text-ws-text-primary outline-none"
            value={tempoInput}
            onChange={(e) => setTempoInput(e.target.value)}
            onBlur={() => {
              const v = parseInt(tempoInput, 10);
              if (!Number.isNaN(v)) setTempo(v);
              setEditingTempo(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setTempoInput(String(session.tempo));
              setEditingTempo(true);
            }}
            className="hover:text-ws-text-primary tabular-nums"
          >
            {session.tempo} BPM
          </button>
        )}
        {editingSig ? (
          <span className="flex items-center gap-0.5">
            <input
              autoFocus
              className="w-6 bg-ws-elevated border border-ws-border rounded px-1 py-0.5 text-ws-text-primary outline-none text-center"
              value={sigNum}
              onChange={(e) => setSigNum(e.target.value)}
            />
            <span>/</span>
            <input
              className="w-6 bg-ws-elevated border border-ws-border rounded px-1 py-0.5 text-ws-text-primary outline-none text-center"
              value={sigDen}
              onChange={(e) => setSigDen(e.target.value)}
              onBlur={() => {
                const n = parseInt(sigNum, 10);
                const d = parseInt(sigDen, 10);
                if (!Number.isNaN(n) && !Number.isNaN(d)) setTimeSignature(n, d);
                setEditingSig(false);
              }}
            />
          </span>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSigNum(String(session.timeSignature.numerator));
              setSigDen(String(session.timeSignature.denominator));
              setEditingSig(true);
            }}
            className="hover:text-ws-text-primary tabular-nums"
          >
            {session.timeSignature.numerator}/{session.timeSignature.denominator}
          </button>
        )}
        <span className="text-ws-text-muted tabular-nums">
          {formatBarBeat(session.playbackPositionTicks, session.timeSignature)}
        </span>
      </div>

      <div className="flex flex-1 justify-center">
        {editingName ? (
          <input
            autoFocus
            className="max-w-[320px] w-full bg-transparent border-b border-ws-border text-[18px] text-ws-text-primary text-center outline-none font-sans"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onBlur={() => {
              setSessionName(nameInput);
              setEditingName(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
          />
        ) : (
          <button
            type="button"
            onDoubleClick={() => {
              setNameInput(session.name);
              setEditingName(true);
            }}
            className="text-[18px] text-ws-text-primary font-sans truncate max-w-[360px]"
          >
            {session.name}
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-[10px] text-ws-text-muted">
          <span>Master</span>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(session.masterVolume * 100)}
            onChange={(e) => setMasterVolume(Number(e.target.value) / 100)}
            className="w-20 h-1 accent-ws-accent"
          />
        </label>
        <div className="flex items-center gap-3 text-[10px] font-mono text-ws-text-muted tabular-nums">
          <span>CPU {cpuUsage}%</span>
          <span>MEM {memoryUsage}%</span>
        </div>
        {isRecording && (
          <span className="flex items-center gap-1 text-[10px] text-red-400 uppercase tracking-wider">
            <Mic className="h-3 w-3" /> REC
          </span>
        )}
      </div>
    </header>
  );
}
