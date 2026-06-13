import { NextResponse } from "next/server";
import { getSearchStatus } from "@/lib/search/search-service";
import { syncSearchIndexFromDatabase, getSearchDatabaseAdapter } from "@/lib/search/db-sync";
import { upsertSearchDocuments } from "@/lib/meilisearch/index";
import { SEED_SEARCH_DOCUMENTS } from "@/lib/search/seed-documents";

export async function GET() {
  const status = await getSearchStatus();
  return NextResponse.json(status);
}

/** POST — reindex from DB adapter or re-seed demo corpus */
export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      mode?: "seed" | "database";
      sinceMs?: number;
      full?: boolean;
    };

    if (body.mode === "database") {
      if (!getSearchDatabaseAdapter()) {
        return NextResponse.json(
          {
            error:
              "No database adapter registered. Connect PostgreSQL and call registerSearchDatabaseAdapter().",
          },
          { status: 503 }
        );
      }
      const result = await syncSearchIndexFromDatabase({
        sinceMs: body.sinceMs,
        full: body.full,
      });
      return NextResponse.json({ ok: true, ...result });
    }

    await upsertSearchDocuments(SEED_SEARCH_DOCUMENTS);
    return NextResponse.json({ ok: true, upserted: SEED_SEARCH_DOCUMENTS.length });
  } catch (error) {
    console.error("[api/search/sync]", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
