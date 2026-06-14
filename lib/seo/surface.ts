import { headers } from "next/headers";
import { isHomeHostname, isSoftwareHostname } from "@/lib/urls";

export type SeoSurface = "cc" | "software" | "default";

export function getSeoSurfaceFromHost(host: string): SeoSurface {
  if (isSoftwareHostname(host)) return "software";
  if (isHomeHostname(host)) return "cc";
  return "default";
}

/** Resolve marketplace (.cc) vs production (.software) from the incoming request. */
export function getRequestSeoSurface(): SeoSurface {
  const headerStore = headers();
  const surface = headerStore.get("x-consequence-surface");
  if (surface === "shop") return "cc";
  if (surface === "software") return "software";
  return getSeoSurfaceFromHost(headerStore.get("host") ?? "");
}
