import { NextRequest, NextResponse } from "next/server";
import { runSearch } from "@/lib/search/search-service";
import type { SearchEntityType } from "@/lib/search/types";

const VALID_TYPES = new Set<SearchEntityType>([
  "stem",
  "producer",
  "session",
  "twin",
  "composition",
  "midi",
  "vocal",
  "loop",
]);

function parseAttach(param: string | null): SearchEntityType[] {
  if (!param) return [];
  return param
    .split(",")
    .map((s) => s.trim())
    .filter((t): t is SearchEntityType => VALID_TYPES.has(t as SearchEntityType));
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") ?? "";
  const attach = parseAttach(searchParams.get("attach"));

  try {
    const result = await runSearch(q, attach);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[api/search]", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
