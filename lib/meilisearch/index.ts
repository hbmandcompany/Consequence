import type { SearchDocument } from "@/lib/search/types";
import { getMeiliClient } from "./client";
import { MEILI_INDEX } from "./config";

const FILTERABLE = ["type", "tags", "sourceTable"] as const;
const SORTABLE = ["updatedAt", "title"] as const;
const SEARCHABLE = ["title", "subtitle", "tags", "key"] as const;

export async function ensureSearchIndex(): Promise<void> {
  const client = getMeiliClient();
  try {
    await client.getIndex(MEILI_INDEX);
  } catch {
    await client.createIndex(MEILI_INDEX, { primaryKey: "id" });
  }

  const index = client.index(MEILI_INDEX);
  await index.updateFilterableAttributes([...FILTERABLE]);
  await index.updateSortableAttributes([...SORTABLE]);
  await index.updateSearchableAttributes([...SEARCHABLE]);
}

export async function upsertSearchDocuments(docs: SearchDocument[]): Promise<void> {
  if (docs.length === 0) return;
  await ensureSearchIndex();
  const index = getMeiliClient().index(MEILI_INDEX);
  await index.addDocuments(docs, { primaryKey: "id" });
}

export async function deleteSearchDocuments(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  const index = getMeiliClient().index(MEILI_INDEX);
  await index.deleteDocuments(ids);
}

export async function getIndexedDocumentCount(): Promise<number> {
  try {
    const stats = await getMeiliClient().index(MEILI_INDEX).getStats();
    return stats.numberOfDocuments;
  } catch {
    return 0;
  }
}
