import { Meilisearch } from "meilisearch";
import { getMeiliApiKey, getMeiliHost } from "./config";

let client: Meilisearch | null = null;

export function getMeiliClient(): Meilisearch {
  if (!client) {
    client = new Meilisearch({
      host: getMeiliHost(),
      apiKey: getMeiliApiKey(),
    });
  }
  return client;
}

export async function isMeiliReachable(): Promise<boolean> {
  try {
    const health = await getMeiliClient().health();
    return health.status === "available";
  } catch {
    return false;
  }
}
