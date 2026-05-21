export type CollaborationFeatureId = "live-session" | "shared-workspace" | "split-proposals";

export type CollaborationFeature = {
  id: CollaborationFeatureId;
  href: string;
  label: string;
  tagline: string;
  headline: string;
  lede: string;
  pillars: { title: string; body: string }[];
  specs: { left: string; right: string }[];
};

export const COLLABORATION_FEATURES: Record<CollaborationFeatureId, CollaborationFeature> = {
  "live-session": {
    id: "live-session",
    href: "/collaboration/live-session",
    label: "Live session",
    tagline: "FaceTime-grade video · screen share · captions",
    headline: "Present,\nnot passive.",
    lede:
      "Studio calls run at broadcast latency with spatial presence — who is speaking, who is sharing, and what the room is deciding. Screen share carries the DAW or score; captions and session metadata write to the bus in parallel so nothing said in the call is lost to the ledger.",
    pillars: [
      {
        title: "Video & presence",
        body: "Multi-participant tiles with speaking indicators, mute state, and role labels tied to the active composition. Spotlight follows the lead; collaborators join without leaving the work context.",
      },
      {
        title: "Screen share",
        body: "Share piano roll, stem lanes, or arrangement notes in full resolution. Viewers see the same frame the host shares — not a stale export — with cursor and region hints when enabled.",
      },
      {
        title: "Captions & record",
        body: "Live captions index to session time for audit. Optional session archive links utterances and decisions to equity revisions and split proposals downstream.",
      },
    ],
    specs: [
      { left: "Latency target", right: "<150ms round-trip · regional SFU" },
      { left: "Participants", right: "Up to 12 · publisher + agent roles" },
      { left: "Bus events", right: "join · share · caption · hang-up" },
    ],
  },
  "shared-workspace": {
    id: "shared-workspace",
    href: "/collaboration/shared-workspace",
    label: "Shared workspace",
    tagline: "Piano roll · stems · arrangement notes",
    headline: "One score,\nmany hands.",
    lede:
      "The shared workspace is the compositional surface — piano roll, stem lanes, MIDI lanes, and arrangement notes synchronized in sub-second time. Every edit is entity-shaped, attributed, and queued for ledger write while the room keeps moving.",
    pillars: [
      {
        title: "Piano roll",
        body: "Melodic and harmonic edits land on a shared grid with per-note attribution. Voicing changes, quantize passes, and motif variants commit with reviewer gates when the room requires them.",
      },
      {
        title: "Stem lanes",
        body: "Vocal, drum, and instrument stems sit in labeled lanes with version lineage. Replacements and crossfades propagate to twins so marketplace and playback surfaces stay current.",
      },
      {
        title: "Arrangement notes",
        body: "Markdown and structured notes anchor to bars and sections — tempo marks, key changes, and production intent travel with the score instead of living in a side channel.",
      },
    ],
    specs: [
      { left: "Sync", right: "Sub-second CRDT · conflict → review queue" },
      { left: "Attribution", right: "Per-note · per-lane · per-section" },
      { left: "Formats", right: "MIDI · WAV stems · JSON arrangement" },
    ],
  },
  "split-proposals": {
    id: "split-proposals",
    href: "/collaboration/split-proposals",
    label: "Split proposals",
    tagline: "Negotiated % · algorithmic fallback · audit trail",
    headline: "Splits you\ncan defend.",
    lede:
      "Ownership is negotiated in the open — proposed percentages, algorithmic fallback when signals disagree, and an immutable audit trail from proposal through acceptance to on-chain basis points. Settlement always reads the latest verified vector.",
    pillars: [
      {
        title: "Negotiated %",
        body: "Creators propose fixed splits or floors and caps before signals run. Accepted proposals override algorithmic output until the next governed revision.",
      },
      {
        title: "Algorithmic fallback",
        body: "When no rule applies, contribution signals normalize to 10,000 basis points — session time, MIDI density, arrangement weight, AI acceptance, and structural edits.",
      },
      {
        title: "Audit trail",
        body: "Every proposal, counter, and acceptance is timestamped with evidence refs. Solana PDA updates cite the revision that settlement must trust.",
      },
    ],
    specs: [
      { left: "Vector", right: "10,000 bp · sums to 100%" },
      { left: "Fallback", right: "Weighted signals · pre-agreed rules win" },
      { left: "On-chain", right: "recordEquityUpdate after quorum" },
    ],
  },
};

export function getCollaborationFeature(id: string): CollaborationFeature | undefined {
  return COLLABORATION_FEATURES[id as CollaborationFeatureId];
}
