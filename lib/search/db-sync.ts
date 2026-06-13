import type { SearchDocument } from "./types";

/** Row shape expected from PostgreSQL (or any ORM) when search sync is enabled. */
export type DatabaseSearchRow = {
  id: string;
  table: string;
  document: SearchDocument;
  deletedAt: number | null;
};

/**
 * Implement this adapter when PostgreSQL is connected.
 * Example: SELECT * FROM search_documents WHERE updated_at > $since
 */
export interface SearchDatabaseAdapter {
  fetchAll(): Promise<DatabaseSearchRow[]>;
  fetchChangedSince(sinceMs: number): Promise<DatabaseSearchRow[]>;
}

let dbAdapter: SearchDatabaseAdapter | null = null;

export function registerSearchDatabaseAdapter(adapter: SearchDatabaseAdapter): void {
  dbAdapter = adapter;
}

export function getSearchDatabaseAdapter(): SearchDatabaseAdapter | null {
  return dbAdapter;
}

export async function syncSearchIndexFromDatabase(options?: {
  sinceMs?: number;
  full?: boolean;
}): Promise<{ upserted: number; deleted: number }> {
  if (!dbAdapter) {
    throw new Error(
      "No SearchDatabaseAdapter registered. Call registerSearchDatabaseAdapter() after connecting PostgreSQL."
    );
  }

  const { upsertSearchDocuments, deleteSearchDocuments } = await import(
    "@/lib/meilisearch/index"
  );

  const rows =
    options?.full || options?.sinceMs === undefined
      ? await dbAdapter.fetchAll()
      : await dbAdapter.fetchChangedSince(options.sinceMs);

  const toUpsert = rows.filter((r) => r.deletedAt === null).map((r) => ({
    ...r.document,
    sourceId: r.id,
    sourceTable: r.table,
  }));

  const toDelete = rows.filter((r) => r.deletedAt !== null).map((r) => r.document.id);

  await upsertSearchDocuments(toUpsert);
  await deleteSearchDocuments(toDelete);

  return { upserted: toUpsert.length, deleted: toDelete.length };
}
