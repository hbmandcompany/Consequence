import type { Metadata } from "next";
import { WorkspaceGuard } from "@/components/workspace/workspace-guard";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";

export const metadata: Metadata = {
  title: "WorkSpace — Consequence",
  description: "Professional digital audio workstation — compose, collaborate, and create.",
};

export default function WorkspacePage() {
  return (
    <WorkspaceGuard>
      <WorkspaceShell />
    </WorkspaceGuard>
  );
}
