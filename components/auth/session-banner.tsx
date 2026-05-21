"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearSession, getSession, type AuthSession } from "@/lib/auth-session";
import { Container } from "@/components/ui";

export function SessionBanner() {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSession(getSession());
  }, []);

  if (!session) {
    return (
      <div className="border-b border-ink/10 bg-snow-100/80">
        <Container className="py-3 flex flex-wrap items-center justify-between gap-3 text-[12px] text-ink/60">
          <span>Browsing Shop as guest</span>
          <span className="flex items-center gap-4">
            <Link href="/login" className="uline text-ink">
              Client login
            </Link>
            <Link href="/signup" className="uline text-ink">
              Sign up
            </Link>
          </span>
        </Container>
      </div>
    );
  }

  return (
    <div className="border-b border-tiff/20 bg-tiff/10">
      <Container className="py-3 flex flex-wrap items-center justify-between gap-3 text-[12px] text-ink/70">
        <span>
          Signed in as <strong className="text-ink font-medium">{session.name}</strong>{" "}
          <span className="text-ink/45">({session.email})</span>
        </span>
        <button
          type="button"
          onClick={() => {
            clearSession();
            setSession(null);
          }}
          className="uline text-ink"
        >
          Sign out
        </button>
      </Container>
    </div>
  );
}
