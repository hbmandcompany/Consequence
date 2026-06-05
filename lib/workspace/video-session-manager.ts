/**
 * Manages local media devices and WebRTC peer connections for workspace collaboration.
 * Signaling is delegated to the WebSocket layer when connected.
 */

export type SignalMessage =
  | { type: "offer"; from: string; to: string; sdp: RTCSessionDescriptionInit }
  | { type: "answer"; from: string; to: string; sdp: RTCSessionDescriptionInit }
  | { type: "ice"; from: string; to: string; candidate: RTCIceCandidateInit };

type SignalHandler = (message: SignalMessage) => void;

export class VideoSessionManager {
  private localUserId: string;
  private localStream: MediaStream | null = null;
  private peers = new Map<string, RTCPeerConnection>();
  private remoteStreams = new Map<string, MediaStream>();
  private onSignal: SignalHandler | null = null;
  private onRemoteStream: ((peerId: string, stream: MediaStream) => void) | null = null;

  constructor(localUserId: string) {
    this.localUserId = localUserId;
  }

  setSignalHandler(handler: SignalHandler) {
    this.onSignal = handler;
  }

  setRemoteStreamHandler(handler: (peerId: string, stream: MediaStream) => void) {
    this.onRemoteStream = handler;
  }

  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  getRemoteStream(peerId: string): MediaStream | undefined {
    return this.remoteStreams.get(peerId);
  }

  async enableCamera(): Promise<MediaStream | null> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240 },
        audio: true,
      });
      this.localStream = stream;
      for (const pc of this.peers.values()) {
        for (const track of stream.getTracks()) {
          pc.addTrack(track, stream);
        }
      }
      return stream;
    } catch {
      return null;
    }
  }

  async disableCamera(): Promise<void> {
    if (!this.localStream) return;
    this.localStream.getVideoTracks().forEach((t) => {
      t.stop();
      this.localStream?.removeTrack(t);
    });
  }

  async toggleMicrophone(): Promise<boolean> {
    if (!this.localStream) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.localStream = stream;
        return true;
      } catch {
        return false;
      }
    }
    const audioTracks = this.localStream.getAudioTracks();
    if (audioTracks.length === 0) return false;
    const enabled = !audioTracks[0].enabled;
    audioTracks[0].enabled = enabled;
    return enabled;
  }

  async connectToPeer(peerId: string, initiator: boolean): Promise<void> {
    if (this.peers.has(peerId)) return;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    if (this.localStream) {
      for (const track of this.localStream.getTracks()) {
        pc.addTrack(track, this.localStream);
      }
    }

    pc.onicecandidate = (ev) => {
      if (ev.candidate && this.onSignal) {
        this.onSignal({
          type: "ice",
          from: this.localUserId,
          to: peerId,
          candidate: ev.candidate.toJSON(),
        });
      }
    };

    pc.ontrack = (ev) => {
      const stream = ev.streams[0];
      if (stream) {
        this.remoteStreams.set(peerId, stream);
        this.onRemoteStream?.(peerId, stream);
      }
    };

    this.peers.set(peerId, pc);

    if (initiator) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      this.onSignal?.({
        type: "offer",
        from: this.localUserId,
        to: peerId,
        sdp: offer,
      });
    }
  }

  async handleSignal(message: SignalMessage): Promise<void> {
    const peerId = message.from;
    let pc = this.peers.get(peerId);

    if (!pc && message.type === "offer") {
      await this.connectToPeer(peerId, false);
      pc = this.peers.get(peerId);
    }
    if (!pc) return;

    if (message.type === "offer") {
      await pc.setRemoteDescription(message.sdp);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      this.onSignal?.({
        type: "answer",
        from: this.localUserId,
        to: peerId,
        sdp: answer,
      });
    } else if (message.type === "answer") {
      await pc.setRemoteDescription(message.sdp);
    } else if (message.type === "ice") {
      await pc.addIceCandidate(message.candidate);
    }
  }

  destroy(): void {
    this.localStream?.getTracks().forEach((t) => t.stop());
    this.localStream = null;
    for (const pc of this.peers.values()) pc.close();
    this.peers.clear();
    this.remoteStreams.clear();
  }
}
