import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollaborationFeatureView } from "@/components/collaboration/collaboration-feature-view";
import { getCollaborationFeature } from "@/lib/collaboration-features";

const feature = getCollaborationFeature("live-session");

export const metadata: Metadata = {
  title: "Live session — Collaboration · Consequence",
  description:
    "FaceTime-grade video, screen share, and captions for studio collaboration on Consequence.",
};

export default function LiveSessionPage() {
  if (!feature) notFound();
  return <CollaborationFeatureView feature={feature} />;
}
