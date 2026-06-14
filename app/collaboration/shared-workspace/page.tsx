import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollaborationFeatureView } from "@/components/collaboration/collaboration-feature-view";
import { getCollaborationFeature } from "@/lib/collaboration-features";
import { softwareMetadata } from "@/lib/seo/metadata";

const feature = getCollaborationFeature("shared-workspace");

export const metadata: Metadata = softwareMetadata({
  title: "Shared workspace",
  description:
    "Consequence.software collaboration — shared piano roll, stem lanes, and arrangement notes with sub-second sync.",
  path: "/collaboration/shared-workspace",
});

export default function SharedWorkspacePage() {
  if (!feature) notFound();
  return <CollaborationFeatureView feature={feature} />;
}
