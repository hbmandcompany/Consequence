"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Send, Video, VideoOff } from "lucide-react";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { VideoSessionManager } from "@/lib/workspace/video-session-manager";

function VideoTile({
  name,
  color,
  stream,
  isLocal,
}: {
  name: string;
  color: string;
  stream: MediaStream | null;
  isLocal?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (stream) {
      el.srcObject = stream;
      void el.play().catch(() => undefined);
    } else {
      el.srcObject = null;
    }
  }, [stream]);

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-[140px] shrink-0">
      <div
        className="relative w-[140px] h-[100px] rounded overflow-hidden bg-ws-elevated border border-ws-border"
      >
        {stream ? (
          <video
            ref={videoRef}
            muted={isLocal}
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-medium text-ws-text-primary"
              style={{ backgroundColor: `${color}44`, border: `1.5px solid ${color}` }}
            >
              {initials}
            </span>
          </div>
        )}
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="text-[10px] text-ws-text-secondary truncate">{name}</span>
      </div>
    </div>
  );
}

export function CollaborationPanel() {
  const collaborators = useWorkspaceStore((s) => s.collaborators);
  const chatMessages = useWorkspaceStore((s) => s.chatMessages);
  const localUserId = useWorkspaceStore((s) => s.localUserId);
  const localUserName = useWorkspaceStore((s) => s.localUserName);
  const addChatMessage = useWorkspaceStore((s) => s.addChatMessage);
  const setLocalMediaState = useWorkspaceStore((s) => s.setLocalMediaState);
  const updateCollaborator = useWorkspaceStore((s) => s.updateCollaborator);

  const [chatInput, setChatInput] = useState("");
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const managerRef = useRef<VideoSessionManager | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    managerRef.current = new VideoSessionManager(localUserId);
    return () => {
      managerRef.current?.destroy();
    };
  }, [localUserId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const toggleCamera = async () => {
    const manager = managerRef.current;
    if (!manager) return;
    if (cameraOn) {
      await manager.disableCamera();
      setLocalStream(manager.getLocalStream());
      setCameraOn(false);
      setLocalMediaState(false, micOn);
    } else {
      const stream = await manager.enableCamera();
      setLocalStream(stream);
      setCameraOn(true);
      setLocalMediaState(true, micOn);
    }
    const local = collaborators.find((c) => c.id === localUserId) ?? collaborators[0];
    if (local) updateCollaborator(local.id, { cameraEnabled: !cameraOn });
  };

  const toggleMic = async () => {
    const manager = managerRef.current;
    if (!manager) return;
    const enabled = await manager.toggleMicrophone();
    setMicOn(enabled);
    setLocalMediaState(cameraOn, enabled);
    const local = collaborators.find((c) => c.id === localUserId) ?? collaborators[0];
    if (local) updateCollaborator(local.id, { micEnabled: enabled });
  };

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    addChatMessage(text);
    setChatInput("");
  };

  const displayCollabs =
    collaborators.length > 0
      ? collaborators
      : [
          {
            id: localUserId,
            name: localUserName,
            color: "#5B7C99",
            cursorX: 0,
            cursorY: 0,
            cameraEnabled: cameraOn,
            micEnabled: micOn,
          },
        ];

  return (
    <div className="flex flex-col h-full min-h-0 bg-ws-surface">
      <div className="shrink-0 p-3 flex flex-col gap-3 overflow-y-auto max-h-[280px]">
        {displayCollabs.map((c) => (
          <VideoTile
            key={c.id}
            name={c.name}
            color={c.color}
            stream={c.id === localUserId || c.id === displayCollabs[0]?.id ? localStream : null}
            isLocal={c.id === localUserId || c.id === displayCollabs[0]?.id}
          />
        ))}
      </div>

      <div className="flex-1 min-h-0 flex flex-col border-t border-ws-border">
        <div className="shrink-0 px-3 py-2 border-b border-ws-border">
          <span className="text-[10px] uppercase tracking-wider text-ws-text-muted">Chat</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
          {chatMessages.length === 0 && (
            <p className="text-[11px] text-ws-text-muted">No messages yet</p>
          )}
          {chatMessages.map((msg) => (
            <div key={msg.id} className="text-[11px]">
              <span className="text-ws-text-muted font-mono text-[10px]">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="text-ws-text-secondary ml-2 font-medium">{msg.userName}</span>
              <p className="text-ws-text-primary mt-0.5">{msg.text}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="shrink-0 p-2 border-t border-ws-border space-y-2">
          <div className="flex gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendChat();
              }}
              placeholder="Message collaborators…"
              className="flex-1 bg-ws-elevated border border-ws-border rounded px-2 py-1.5 text-[12px] text-ws-text-primary outline-none placeholder:text-ws-text-muted"
            />
            <button
              type="button"
              onClick={sendChat}
              className="flex h-8 w-8 items-center justify-center rounded bg-ws-elevated text-ws-text-secondary hover:text-ws-text-primary"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void toggleCamera()}
              className={`flex flex-1 items-center justify-center gap-1.5 py-1.5 rounded text-[11px] ${
                cameraOn ? "bg-ws-elevated text-ws-accent" : "text-ws-text-muted hover:bg-ws-elevated"
              }`}
            >
              {cameraOn ? <Video className="h-3.5 w-3.5" /> : <VideoOff className="h-3.5 w-3.5" />}
              Camera
            </button>
            <button
              type="button"
              onClick={() => void toggleMic()}
              className={`flex flex-1 items-center justify-center gap-1.5 py-1.5 rounded text-[11px] ${
                micOn ? "bg-ws-elevated text-ws-accent" : "text-ws-text-muted hover:bg-ws-elevated"
              }`}
            >
              {micOn ? <Mic className="h-3.5 w-3.5" /> : <MicOff className="h-3.5 w-3.5" />}
              Mic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
