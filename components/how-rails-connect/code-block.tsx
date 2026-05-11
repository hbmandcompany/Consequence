"use client";

import { useCallback, useState } from "react";

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

type CodeBlockProps = {
  code: string;
  /** Optional line numbers (1-based display) */
  numbered?: boolean;
  className?: string;
  label?: string;
};

export function CodeBlock({ code, numbered = false, className = "", label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(() => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  const lines = code.replace(/\n$/, "").split("\n");

  return (
    <div
      className={`relative rounded-lg border border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5] dark:bg-[#1F1F1F] overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-[#E8E8E8] dark:border-[#4A4A4A] bg-[#F5F5F5]/80 dark:bg-[#1F1F1F]/80">
        {label ? (
          <span className="text-[11px] font-mono text-[#8A8A8A] dark:text-[#9A9A9A]">{label}</span>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={onCopy}
          className="text-[11px] font-mono uppercase tracking-wide text-[#4A4A4A] dark:text-[#C4C4C4] hover:text-ink dark:hover:text-snow-0 transition-colors duration-200"
          style={{ transitionTimingFunction: EASE }}
          aria-label="Copy code to clipboard"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono text-ink dark:text-[#E8E8E8] max-h-[min(80vh,720px)]"
        tabIndex={0}
      >
        <code>
          {numbered
            ? lines.map((line, i) => (
                <div key={`${i}-${line.slice(0, 8)}`} className="flex gap-3">
                  <span className="flex-none w-8 text-right select-none text-[#8A8A8A] dark:text-[#6A6A6A] tabular-nums">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 whitespace-pre">{line || " "}</span>
                </div>
              ))
            : lines.map((line, i) => (
                <span key={`${i}-${line.slice(0, 8)}`} className="block whitespace-pre">
                  {line || " "}
                </span>
              ))}
        </code>
      </pre>
    </div>
  );
}
