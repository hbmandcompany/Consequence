import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollaborationFeatureView } from "@/components/collaboration/collaboration-feature-view";
import { getCollaborationFeature } from "@/lib/collaboration-features";

const feature = getCollaborationFeature("split-proposals");

export const metadata: Metadata = {
  title: "Split proposals — Collaboration · Consequence",
  description:
    "Negotiated ownership percentages, algorithmic fallback, and audit trails for collaborator splits on Consequence.",
};

export default function SplitProposalsPage() {
  if (!feature) notFound();
  return <CollaborationFeatureView feature={feature} />;
}
