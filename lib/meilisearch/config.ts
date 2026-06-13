export const MEILI_INDEX = "consequence_search";

export function getMeiliHost(): string {
  return process.env.MEILI_HOST ?? "http://127.0.0.1:7700";
}

export function getMeiliApiKey(): string | undefined {
  const key = process.env.MEILI_MASTER_KEY;
  return key && key.length > 0 ? key : undefined;
}

export function isMeiliConfigured(): boolean {
  return Boolean(getMeiliHost());
}
