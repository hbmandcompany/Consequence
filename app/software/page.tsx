"use client";

import { useEffect } from "react";

/** Legacy URL: canonical content is on `/` at `#software`. */
export default function SoftwareAliasPage() {
  useEffect(() => {
    window.location.replace("/#software");
  }, []);

  return (
    <div className="min-h-[40vh] flex items-center justify-center text-[13px] text-ink/45 tabular tracking-wide">
      Opening engine…
    </div>
  );
}
