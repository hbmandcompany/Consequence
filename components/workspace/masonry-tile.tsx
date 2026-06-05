import clsx from "clsx";
import type { ReactNode } from "react";

export function MasonryTile({
  label,
  children,
  className,
  span,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
  span: string;
}) {
  return (
    <section
      className={clsx(
        "masonry-tile flex min-h-0 flex-col overflow-hidden rounded-lg border border-ws-border bg-ws-surface",
        span,
        className
      )}
    >
      {label && (
        <header className="shrink-0 border-b border-ws-border px-3 py-1.5">
          <span className="text-[10px] uppercase tracking-[0.18em] text-ws-text-muted">
            {label}
          </span>
        </header>
      )}
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </section>
  );
}
