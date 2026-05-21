import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollaborationFeatureView } from "@/components/collaboration/collaboration-feature-view";
import { getCollaborationFeature } from "@/lib/collaboration-features";

const feature = getCollaborationFeature("shared-workspace");

export const metadata: Metadata = {
  title: "Shared workspace — Collaboration · Consequence",
  description:
    "Shared piano roll, stem lanes, and arrangement notes — synchronized compositional workspace on Consequence.",
};

export default function SharedWorkspacePage() {
  if (!feature) notFound();
  return <CollaborationFeatureView feature={feature} />;
}
