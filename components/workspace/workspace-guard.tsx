"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { getSession } from "@/lib/auth-session";
import { useWorkspaceStore } from "@/stores/workspace-store";

export function WorkspaceGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const initSession = useWorkspaceStore((s) => s.initSession);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    initSession(session.name);
    setReady(true);
  }, [router, initSession]);

  if (!ready) {
    return (
      <div className="workspace-root flex h-screen w-screen items-center justify-center bg-ws-bg text-ws-text-secondary text-[12px] font-mono">
        Initializing session…
      </div>
    );
  }

  return <>{children}</>;
}
