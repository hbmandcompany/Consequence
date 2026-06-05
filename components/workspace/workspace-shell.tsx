"use client";

import { useCallback } from "react";
import { usePanelResize } from "@/hooks/use-panel-resize";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useCollaboration } from "@/hooks/use-collaboration";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { ArrangementTimeline } from "./arrangement-timeline";
import { CollaborationPanel } from "./collaboration-panel";
import { WorkspaceContextMenu } from "./context-menu";
import { InspectorPanel, TrackList } from "./track-list";
import { PianoRoll } from "./piano-roll";
import { TransportBar } from "./transport-bar";

function ResizeHandle({
  axis,
  onResize,
}: {
  axis: "horizontal" | "vertical";
  onResize: (delta: number) => void;
}) {
  const { onPointerDown } = usePanelResize(axis, onResize);
  return (
    <div
      role="separator"
      onPointerDown={onPointerDown}
      className={
        axis === "horizontal"
          ? "w-1 shrink-0 cursor-col-resize bg-ws-border hover:bg-ws-text-muted transition-colors"
          : "h-1 shrink-0 cursor-row-resize bg-ws-border hover:bg-ws-text-muted transition-colors"
      }
    />
  );
}

export function WorkspaceShell() {
  const ui = useWorkspaceStore((s) => s.ui);
  const setUi = useWorkspaceStore((s) => s.setUi);

  useKeyboardShortcuts();
  useCollaboration();

  const resizeLeft = useCallback(
    (delta: number) => setUi({ leftPanelWidth: ui.leftPanelWidth + delta }),
    [setUi, ui.leftPanelWidth]
  );

  const resizeRight = useCallback(
    (delta: number) => setUi({ rightPanelWidth: ui.rightPanelWidth - delta }),
    [setUi, ui.rightPanelWidth]
  );

  const resizePianoRoll = useCallback(
    (delta: number) => setUi({ pianoRollHeight: ui.pianoRollHeight - delta }),
    [setUi, ui.pianoRollHeight]
  );

  const mainHeight = `calc(100vh - 48px - ${ui.pianoRollHeight}px)`;

  return (
    <div className="workspace-root flex h-screen w-screen flex-col overflow-hidden bg-ws-bg text-ws-text-primary font-sans">
      <TransportBar />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0" style={{ height: mainHeight }}>
          <aside
            className="flex shrink-0 flex-col border-r border-ws-border bg-ws-surface min-h-0"
            style={{ width: ui.leftPanelWidth }}
          >
            <div className="flex-[3] min-h-0 overflow-hidden">
              <TrackList />
            </div>
            <InspectorPanel />
          </aside>

          <ResizeHandle axis="horizontal" onResize={resizeLeft} />

          <main className="flex-1 min-w-0 min-h-0">
            <ArrangementTimeline />
          </main>

          <ResizeHandle axis="horizontal" onResize={resizeRight} />

          <aside
            className="shrink-0 border-l border-ws-border min-h-0"
            style={{ width: ui.rightPanelWidth }}
          >
            <CollaborationPanel />
          </aside>
        </div>

        <ResizeHandle axis="vertical" onResize={resizePianoRoll} />

        <section
          className="shrink-0 min-h-0 overflow-hidden"
          style={{ height: ui.pianoRollHeight }}
        >
          <PianoRoll />
        </section>
      </div>

      <WorkspaceContextMenu />
    </div>
  );
}
