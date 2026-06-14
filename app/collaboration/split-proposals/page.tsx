import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollaborationFeatureView } from "@/components/collaboration/collaboration-feature-view";
import { getCollaborationFeature } from "@/lib/collaboration-features";
import { softwareMetadata } from "@/lib/seo/metadata";

const feature = getCollaborationFeature("split-proposals");

export const metadata: Metadata = softwareMetadata({
  title: "Split proposals",
  description:
    "Consequence.software collaboration — negotiated ownership, algorithmic fallback, and audit trails for splits.",
  path: "/collaboration/split-proposals",
});

export default function SplitProposalsPage() {
  if (!feature) notFound();
  return <CollaborationFeatureView feature={feature} />;
}
