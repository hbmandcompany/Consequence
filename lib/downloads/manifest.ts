export type DownloadPlatform = "windows" | "macos" | "linux";

export type DownloadsManifest = {
  product?: string;
  displayName: string;
  version: string;
  tag?: string;
  releasedAt: string;
  publisher?: string;
  website?: string;
  manifestUrl?: string;
  downloads: Partial<Record<DownloadPlatform, string>>;
  filenames?: Partial<Record<DownloadPlatform, string>>;
};

export type ManifestFetchResult =
  | { status: "ready"; manifest: DownloadsManifest }
  | { status: "coming-soon" }
  | { status: "error" };

/** ISR / fetch cache TTL — limits unauthenticated GitHub API calls. */
export const MANIFEST_REVALIDATE_SECONDS = 300;

const RELEASES_API =
  "https://api.github.com/repos/hbmandcompany/Consequence/releases/latest";

export class NoReleaseError extends Error {
  constructor() {
    super("No release published yet");
    this.name = "NoReleaseError";
  }
}

export class NoManifestError extends Error {
  constructor() {
    super("No downloads.json in latest release");
    this.name = "NoManifestError";
  }
}

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export function displayVersion(manifest: DownloadsManifest): string {
  if (manifest.version) return manifest.version;
  return manifest.tag?.replace(/^v/i, "") ?? "";
}

export async function fetchLatestManifest(): Promise<DownloadsManifest> {
  const releaseRes = await fetch(RELEASES_API, {
    headers: githubHeaders(),
    next: { revalidate: MANIFEST_REVALIDATE_SECONDS },
  });

  if (!releaseRes.ok) {
    if (releaseRes.status === 404) {
      throw new NoReleaseError();
    }
    throw new Error(`Release fetch failed (${releaseRes.status})`);
  }

  const release = await releaseRes.json();
  const asset = release.assets?.find(
    (a: { name: string }) => a.name === "downloads.json"
  );

  if (!asset?.browser_download_url) {
    throw new NoManifestError();
  }

  const manifestRes = await fetch(asset.browser_download_url, {
    next: { revalidate: MANIFEST_REVALIDATE_SECONDS },
  });
  if (!manifestRes.ok) {
    throw new Error(`Manifest fetch failed (${manifestRes.status})`);
  }

  return manifestRes.json();
}

/** Server-side entry: never throws; maps missing release to coming-soon. */
export async function getLatestDownloadsManifest(): Promise<ManifestFetchResult> {
  try {
    const manifest = await fetchLatestManifest();
    return { status: "ready", manifest };
  } catch (error) {
    if (error instanceof NoReleaseError || error instanceof NoManifestError) {
      return { status: "coming-soon" };
    }
    return { status: "error" };
  }
}
