"use client";

import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useCollaboration } from "@/hooks/use-collaboration";
import { ArrangementTimeline } from "./arrangement-timeline";
import { CollaborationPanel } from "./collaboration-panel";
import { WorkspaceContextMenu } from "./context-menu";
import { MasonryTile } from "./masonry-tile";
import { InspectorPanel, TrackList } from "./track-list";
import { PianoRoll } from "./piano-roll";
import { TransportBar } from "./transport-bar";

export function WorkspaceShell() {
  useKeyboardShortcuts();
  useCollaboration();

  return (
    <div className="workspace-root h-screen w-screen overflow-y-auto bg-ws-bg text-ws-text-primary font-sans">
      <div className="workspace-masonry min-h-full p-3">
        <MasonryTile span="masonry-span-transport">
          <TransportBar />
        </MasonryTile>

        <MasonryTile label="Tracks" span="masonry-span-tracks">
          <TrackList />
        </MasonryTile>

        <MasonryTile label="Arrangement" span="masonry-span-timeline">
          <ArrangementTimeline />
        </MasonryTile>

        <MasonryTile label="Collaboration" span="masonry-span-collab">
          <CollaborationPanel />
        </MasonryTile>

        <MasonryTile label="Inspector" span="masonry-span-inspector">
          <InspectorPanel />
        </MasonryTile>

        <MasonryTile label="Piano roll" span="masonry-span-piano">
          <PianoRoll />
        </MasonryTile>
      </div>

      <WorkspaceContextMenu />
    </div>
  );
}
