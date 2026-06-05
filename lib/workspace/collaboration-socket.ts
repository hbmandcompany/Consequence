/**
 * WebSocket client for real-time workspace collaboration.
 * Connects to the Rust signaling server when available; falls back to local-only mode.
 */

export type CollaborationEvent =
  | { type: "cursor"; userId: string; x: number; y: number; lamport: number }
  | { type: "note-create"; userId: string; payload: Record<string, unknown>; lamport: number }
  | { type: "note-delete"; userId: string; payload: Record<string, unknown>; lamport: number }
  | { type: "note-modify"; userId: string; payload: Record<string, unknown>; lamport: number }
  | { type: "track-create"; userId: string; payload: Record<string, unknown>; lamport: number }
  | { type: "transport"; userId: string; payload: Record<string, unknown>; lamport: number }
  | { type: "chat"; userId: string; payload: Record<string, unknown>; lamport: number }
  | { type: "webrtc-signal"; userId: string; payload: Record<string, unknown>; lamport: number }
  | { type: "user-joined"; userId: string; payload: Record<string, unknown>; lamport: number };

type EventHandler = (event: CollaborationEvent) => void;

const WS_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8787"
    : "";

export class CollaborationSocket {
  private ws: WebSocket | null = null;
  private sessionId: string;
  private userId: string;
  private lamport = 0;
  private handler: EventHandler | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private cursorThrottle = 0;

  constructor(sessionId: string, userId: string) {
    this.sessionId = sessionId;
    this.userId = userId;
  }

  setHandler(handler: EventHandler) {
    this.handler = handler;
  }

  connect(): void {
    if (typeof window === "undefined") return;
    try {
      this.ws = new WebSocket(`${WS_URL}/session/${this.sessionId}`);
      this.ws.onopen = () => {
        this.send({ type: "user-joined", userId: this.userId, payload: {}, lamport: this.nextLamport() });
      };
      this.ws.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data as string) as CollaborationEvent;
          if (data.userId !== this.userId) {
            this.handler?.(data);
          }
        } catch {
          /* ignore malformed */
        }
      };
      this.ws.onclose = () => {
        this.scheduleReconnect();
      };
    } catch {
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, 3000);
  }

  private nextLamport(): number {
    this.lamport += 1;
    return this.lamport;
  }

  send(event: CollaborationEvent): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(event));
    }
  }

  sendCursor(x: number, y: number): void {
    const now = performance.now();
    if (now - this.cursorThrottle < 33) return;
    this.cursorThrottle = now;
    this.send({
      type: "cursor",
      userId: this.userId,
      x,
      y,
      lamport: this.nextLamport(),
    });
  }

  disconnect(): void {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.ws?.close();
    this.ws = null;
  }
}
