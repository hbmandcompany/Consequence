import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollaborationFeatureView } from "@/components/collaboration/collaboration-feature-view";
import { getCollaborationFeature } from "@/lib/collaboration-features";
import { softwareMetadata } from "@/lib/seo/metadata";

const feature = getCollaborationFeature("live-session");

export const metadata: Metadata = softwareMetadata({
  title: "Live session",
  description:
    "Consequence.software collaboration — FaceTime-grade video, screen share, and captions for studio sessions.",
  path: "/collaboration/live-session",
});

export default function LiveSessionPage() {
  if (!feature) notFound();
  return <CollaborationFeatureView feature={feature} />;
}
