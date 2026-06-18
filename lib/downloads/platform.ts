import type { DownloadPlatform } from "@/lib/downloads/manifest";

export type DetectedPlatform = DownloadPlatform | "mobile" | "unknown";

export function detectPlatform(): DetectedPlatform {
  if (typeof navigator === "undefined") return "unknown";

  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.platform || "").toLowerCase();

  if (/android|iphone|ipad|ipod|mobile|webos|blackberry/i.test(ua)) {
    return "mobile";
  }

  if (ua.includes("win") || platform.includes("win")) return "windows";
  if (ua.includes("mac") || platform.includes("mac")) return "macos";
  if (ua.includes("linux") || platform.includes("linux") || ua.includes("x11")) {
    return "linux";
  }

  return "unknown";
}

export const PLATFORM_LABELS: Record<
  DownloadPlatform,
  { name: string; arch: string }
> = {
  windows: { name: "Windows", arch: "x64" },
  macos: { name: "macOS", arch: "Universal" },
  linux: { name: "Linux", arch: "x64" },
};

export const PLATFORM_ORDER: DownloadPlatform[] = ["windows", "macos", "linux"];
