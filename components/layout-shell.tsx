"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { HashScroll } from "@/components/hash-scroll";

export function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isWorkspace = pathname.startsWith("/workspace");
  const hideFooter = isWorkspace || pathname === "/download";

  if (isWorkspace) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteNav />
      <HashScroll />
      <main className="relative">{children}</main>
      {!hideFooter && <SiteFooter />}
    </>
  );
}
