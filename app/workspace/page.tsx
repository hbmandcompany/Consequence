import { WorkspaceGuard } from "@/components/workspace/workspace-guard";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { softwareMetadata } from "@/lib/seo/metadata";

export const metadata = softwareMetadata({
  title: "Conductor",
  description:
    "Consequence.software Conductor — professional DAW workspace to compose, collaborate, and create.",
  path: "/workspace",
  noIndex: true,
});

export default function WorkspacePage() {
  return (
    <WorkspaceGuard>
      <WorkspaceShell />
    </WorkspaceGuard>
  );
}
