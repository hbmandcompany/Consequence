/** Document shape indexed in Meilisearch — mirrors future PostgreSQL search rows. */
export type SearchEntityType =
  | "stem"
  | "producer"
  | "session"
  | "twin"
  | "composition"
  | "midi"
  | "vocal"
  | "loop";

export type SearchDocument = {
  id: string;
  type: SearchEntityType;
  title: string;
  subtitle: string;
  tags: string[];
  bpm: number | null;
  key: string | null;
  /** Unix ms — used for incremental DB sync */
  updatedAt: number;
  /** Future PostgreSQL primary key */
  sourceId: string | null;
  /** Future table name e.g. marketplace_listings, sessions */
  sourceTable: string | null;
};

export type SearchHit = SearchDocument & {
  _formatted?: Partial<SearchDocument>;
};

export type SearchResponse = {
  hits: SearchHit[];
  query: string;
  attach: SearchEntityType[];
  processingTimeMs: number;
  source: "meilisearch" | "local";
};
