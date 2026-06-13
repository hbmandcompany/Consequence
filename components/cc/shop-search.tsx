"use client";

import clsx from "clsx";
import { Mic, Plus, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { SEARCH_ATTACH_OPTIONS } from "@/lib/search/attach-types";
import type { SearchEntityType, SearchHit } from "@/lib/search/types";

function useDebounced<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

export function ShopSearchBar({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "google";
}) {
  const isGoogle = variant === "google";
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [attachOpen, setAttachOpen] = useState(false);
  const [attached, setAttached] = useState<SearchEntityType[]>([]);
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const debouncedQuery = useDebounced(query, 220);
  const showResults = focused && (debouncedQuery.length > 0 || attached.length > 0);

  const toggleAttach = useCallback((type: SearchEntityType) => {
    setAttached((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }, []);

  const removeAttach = useCallback((type: SearchEntityType) => {
    setAttached((prev) => prev.filter((t) => t !== type));
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchResults() {
      if (!debouncedQuery && attached.length === 0) {
        setHits([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (debouncedQuery) params.set("q", debouncedQuery);
        if (attached.length) params.set("attach", attached.join(","));
        const res = await fetch(`/api/search?${params}`, { signal: controller.signal });
        if (!res.ok) return;
        const data = (await res.json()) as { hits: SearchHit[] };
        setHits(data.hits ?? []);
      } catch (e) {
        if ((e as Error).name !== "AbortError") setHits([]);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
    return () => controller.abort();
  }, [debouncedQuery, attached]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setAttachOpen(false);
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        rootRef.current?.querySelector<HTMLInputElement>("input[type='search']")?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const attachLabel = (type: SearchEntityType) =>
    SEARCH_ATTACH_OPTIONS.find((o) => o.type === type)?.label ?? type;

  return (
    <div ref={rootRef} className={clsx("relative w-full", className)}>
      <div
        className={clsx(
          "flex items-center w-full transition-shadow duration-200",
          isGoogle
            ? "min-h-12 md:min-h-[2.875rem] rounded-full border border-ink/[0.08] bg-snow-0 px-3 md:px-4 shadow-[0_1px_6px_rgba(32,33,36,0.08)] hover:shadow-[0_2px_10px_rgba(32,33,36,0.12)] focus-within:shadow-[0_2px_14px_rgba(32,33,36,0.16)] focus-within:border-ink/15"
            : "gap-2 max-w-xl rounded-full border border-ink/10 bg-snow-0 px-4 py-2.5"
        )}
      >
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setAttachOpen((o) => !o)}
            className={clsx(
              "rounded-full text-ink/50 hover:text-ink/80 hover:bg-ink/[0.04] transition-colors",
              isGoogle ? "p-1.5" : "p-1",
              attachOpen && "bg-ink/[0.06] text-ink/80"
            )}
            aria-expanded={attachOpen}
            aria-haspopup="listbox"
            aria-label="Attach data to search"
          >
            <Plus
              className={clsx(isGoogle ? "w-[18px] h-[18px] md:w-5 md:h-5" : "w-4 h-4")}
              aria-hidden
            />
          </button>

          {attachOpen ? (
            <div
              role="listbox"
              aria-label="Attach data types"
              className="absolute left-0 top-[calc(100%+8px)] z-50 w-[min(100vw-2rem,280px)] rounded-2xl border border-ink/10 bg-snow-0 py-2 shadow-[0_4px_24px_rgba(32,33,36,0.14)]"
            >
              <p className="px-4 pb-2 text-[10px] uppercase tracking-[0.16em] text-ink/40">
                Attach to search
              </p>
              {SEARCH_ATTACH_OPTIONS.map((opt) => {
                const selected = attached.includes(opt.type);
                return (
                  <button
                    key={opt.type}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => toggleAttach(opt.type)}
                    className={clsx(
                      "flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left transition-colors",
                      selected ? "bg-ink/[0.05]" : "hover:bg-ink/[0.03]"
                    )}
                  >
                    <span className="text-[14px] text-ink/90">{opt.label}</span>
                    <span className="text-[12px] text-ink/45">{opt.description}</span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        {attached.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5 shrink-0 max-w-[40%] overflow-hidden">
            {attached.map((type) => (
              <span
                key={type}
                className="inline-flex items-center gap-1 rounded-full bg-ink/[0.06] pl-2.5 pr-1 py-0.5 text-[11px] text-ink/70"
              >
                {attachLabel(type)}
                <button
                  type="button"
                  onClick={() => removeAttach(type)}
                  className="p-0.5 rounded-full hover:bg-ink/10 text-ink/45"
                  aria-label={`Remove ${attachLabel(type)} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        ) : null}

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={
            attached.length
              ? `Search within ${attached.map(attachLabel).join(", ")}…`
              : "Search stems, producers, sessions, twins…"
          }
          className={clsx(
            "flex-1 min-w-0 bg-transparent outline-none placeholder:text-ink/40",
            isGoogle ? "text-[15px] md:text-base text-ink/90 px-2" : "text-[14px] placeholder:text-ink/35"
          )}
          aria-label="Search Shop"
          aria-controls={showResults ? listId : undefined}
          aria-autocomplete="list"
        />

        {isGoogle ? (
          <div className="flex items-center gap-1 shrink-0 border-l border-ink/10 pl-2 md:pl-3">
            <button
              type="button"
              className="p-2 rounded-full text-ink/45 hover:bg-ink/[0.04] transition-colors"
              aria-label="Voice search"
            >
              <Mic className="w-[18px] h-[18px]" />
            </button>
            <kbd className="hidden lg:inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-mono text-ink/40 bg-ink/[0.04]">
              ⌘K
            </kbd>
          </div>
        ) : (
          <span className="hidden sm:inline text-[10px] tabular uppercase tracking-[0.16em] text-ink/35 border-l border-ink/10 pl-3">
            ⌘ K
          </span>
        )}
      </div>

      {showResults ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-40 max-h-[min(320px,50vh)] overflow-y-auto rounded-2xl border border-ink/10 bg-snow-0 py-2 shadow-[0_4px_24px_rgba(32,33,36,0.14)]"
        >
          {loading ? (
            <li className="px-4 py-3 text-[13px] text-ink/45">Searching…</li>
          ) : hits.length === 0 ? (
            <li className="px-4 py-3 text-[13px] text-ink/45">No matches yet.</li>
          ) : (
            hits.map((hit) => (
              <li key={hit.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={false}
                  className="flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left hover:bg-ink/[0.03] transition-colors"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setQuery(hit.title);
                    setFocused(false);
                  }}
                >
                  <span className="text-[14px] text-ink/90">{hit.title}</span>
                  <span className="text-[12px] text-ink/45">
                    {hit.subtitle}
                    {hit.bpm ? ` · ${hit.bpm} BPM` : ""}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-ink/35 mt-0.5">
                    {attachLabel(hit.type)}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
