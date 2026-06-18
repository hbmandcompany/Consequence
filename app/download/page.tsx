import { DownloadView } from "@/components/download/download-view";
import {
  getLatestDownloadsManifest,
  MANIFEST_REVALIDATE_SECONDS,
} from "@/lib/downloads/manifest";
import { softwareMetadata } from "@/lib/seo/metadata";

export const metadata = softwareMetadata({
  title: "Download Music Production Software",
  description:
    "Download Consequence for Windows, macOS, and Linux — native desktop DAW with Conductor, Monte Carlo rehearsal, AI assistant, and ledger-native settlement.",
  path: "/download",
});

export const revalidate = MANIFEST_REVALIDATE_SECONDS;

export default async function DownloadPage() {
  const manifestState = await getLatestDownloadsManifest();
  return <DownloadView manifestState={manifestState} />;
}
