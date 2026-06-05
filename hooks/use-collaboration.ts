"use client";

import { useEffect } from "react";
import { CollaborationSocket } from "@/lib/workspace/collaboration-socket";
import { useWorkspaceStore } from "@/stores/workspace-store";

export function useCollaboration() {
  const sessionId = useWorkspaceStore((s) => s.session.id);
  const userId = useWorkspaceStore((s) => s.localUserId);

  useEffect(() => {
    const socket = new CollaborationSocket(sessionId, userId);

    socket.setHandler((event) => {
      const state = useWorkspaceStore.getState();
      switch (event.type) {
        case "cursor":
          state.updateCollaborator(event.userId, {
            cursorX: event.x,
            cursorY: event.y,
          });
          break;
        case "transport": {
          const payload = event.payload;
          if (typeof payload.state === "string") {
            state.setPlaybackState(payload.state as "stopped" | "playing" | "recording");
          }
          if (typeof payload.tempo === "number") {
            state.setTempo(payload.tempo);
          }
          break;
        }
        case "chat": {
          const text = event.payload.text;
          if (typeof text === "string") {
            useWorkspaceStore.setState((s) => ({
              chatMessages: [
                ...s.chatMessages,
                {
                  id: `remote_${event.lamport}`,
                  userId: event.userId,
                  userName: "Collaborator",
                  text,
                  timestamp: Date.now(),
                },
              ],
            }));
          }
          break;
        }
        default:
          break;
      }
    });

    socket.connect();

    const onMove = (e: MouseEvent) => {
      socket.sendCursor(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      socket.disconnect();
    };
  }, [sessionId, userId]);
}
