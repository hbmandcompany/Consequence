import { isMeiliReachable } from "@/lib/meilisearch/client";
import {
  ensureSearchIndex,
  getIndexedDocumentCount,
  upsertSearchDocuments,
} from "@/lib/meilisearch/index";
import { MEILI_INDEX } from "@/lib/meilisearch/config";
import { getMeiliClient } from "@/lib/meilisearch/client";
import { SEED_SEARCH_DOCUMENTS } from "./seed-documents";
import type { SearchEntityType, SearchHit, SearchResponse } from "./types";

let seedBootstrapped = false;

async function bootstrapSeedIfNeeded(): Promise<void> {
  if (seedBootstrapped) return;
  const reachable = await isMeiliReachable();
  if (!reachable) return;

  const count = await getIndexedDocumentCount();
  if (count === 0) {
    await upsertSearchDocuments(SEED_SEARCH_DOCUMENTS);
  }
  seedBootstrapped = true;
}

function localSearch(
  query: string,
  attach: SearchEntityType[]
): SearchHit[] {
  const q = query.trim().toLowerCase();
  let docs = SEED_SEARCH_DOCUMENTS;

  if (attach.length > 0) {
    docs = docs.filter((d) => attach.includes(d.type));
  }

  if (!q) return docs.slice(0, 8);

  return docs
    .filter((d) => {
      const hay = [d.title, d.subtitle, d.key ?? "", ...d.tags].join(" ").toLowerCase();
      return hay.includes(q);
    })
    .slice(0, 8);
}

function buildTypeFilter(attach: SearchEntityType[]): string | undefined {
  if (attach.length === 0) return undefined;
  const parts = attach.map((t) => `type = "${t}"`);
  return parts.length === 1 ? parts[0] : `(${parts.join(" OR ")})`;
}

export async function runSearch(
  query: string,
  attach: SearchEntityType[] = []
): Promise<SearchResponse> {
  const start = Date.now();
  const reachable = await isMeiliReachable();

  if (!reachable) {
    return {
      hits: localSearch(query, attach),
      query,
      attach,
      processingTimeMs: Date.now() - start,
      source: "local",
    };
  }

  await bootstrapSeedIfNeeded();
  await ensureSearchIndex();

  const index = getMeiliClient().index(MEILI_INDEX);
  const filter = buildTypeFilter(attach);

  const result = await index.search(query, {
    limit: 8,
    filter,
    attributesToHighlight: ["title", "subtitle"],
  });

  return {
    hits: result.hits as SearchHit[],
    query,
    attach,
    processingTimeMs: result.processingTimeMs ?? Date.now() - start,
    source: "meilisearch",
  };
}

export async function getSearchStatus(): Promise<{
  meilisearch: "available" | "unavailable";
  indexedDocuments: number;
  dbAdapterRegistered: boolean;
}> {
  const reachable = await isMeiliReachable();
  const { getSearchDatabaseAdapter } = await import("./db-sync");

  if (!reachable) {
    return {
      meilisearch: "unavailable",
      indexedDocuments: SEED_SEARCH_DOCUMENTS.length,
      dbAdapterRegistered: Boolean(getSearchDatabaseAdapter()),
    };
  }

  await bootstrapSeedIfNeeded();
  const count = await getIndexedDocumentCount();

  return {
    meilisearch: "available",
    indexedDocuments: count,
    dbAdapterRegistered: Boolean(getSearchDatabaseAdapter()),
  };
}
