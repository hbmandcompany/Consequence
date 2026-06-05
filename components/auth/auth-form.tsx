"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { loginUser, registerUser, setSession } from "@/lib/auth-session";

type Mode = "login" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const isLogin = mode === "login";

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);

    if (isLogin) {
      const result = loginUser({ email, password });
      setPending(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSession(result.user);
      router.push("/workspace");
      router.refresh();
      return;
    }

    if (password !== confirm) {
      setPending(false);
      setError("Passwords do not match.");
      return;
    }

    const result = registerUser({ name, email, password });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSession(result.user);
    router.push("/workspace");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {!isLogin && (
        <label className="block">
          <span className="text-[10px] tabular uppercase tracking-[0.2em] text-ink/45">
            Full name
          </span>
          <input
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Margot Chen"
            className="mt-2 w-full bg-transparent border-b border-ink/15 focus:border-ink/50 outline-none py-2.5 text-[15px] placeholder:text-ink/35"
            required
          />
        </label>
      )}
      <label className="block">
        <span className="text-[10px] tabular uppercase tracking-[0.2em] text-ink/45">
          Work email
        </span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@studio.com"
          className="mt-2 w-full bg-transparent border-b border-ink/15 focus:border-ink/50 outline-none py-2.5 text-[15px] placeholder:text-ink/35"
          required
        />
      </label>
      <label className="block">
        <span className="text-[10px] tabular uppercase tracking-[0.2em] text-ink/45">
          Password
        </span>
        <input
          type="password"
          autoComplete={isLogin ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={isLogin ? "••••••••" : "At least 8 characters"}
          className="mt-2 w-full bg-transparent border-b border-ink/15 focus:border-ink/50 outline-none py-2.5 text-[15px] placeholder:text-ink/35"
          required
          minLength={isLogin ? 0 : 8}
        />
      </label>
      {!isLogin && (
        <label className="block">
          <span className="text-[10px] tabular uppercase tracking-[0.2em] text-ink/45">
            Confirm password
          </span>
          <input
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            className="mt-2 w-full bg-transparent border-b border-ink/15 focus:border-ink/50 outline-none py-2.5 text-[15px] placeholder:text-ink/35"
            required
            minLength={8}
          />
        </label>
      )}

      {error && (
        <p className="text-[13px] text-red-700/90 leading-snug" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full inline-flex items-center justify-center gap-2 bg-ink text-snow-50 py-3.5 rounded-full text-[13px] tracking-tight hover:bg-ink/90 transition-colors disabled:opacity-60"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-tiff animate-breathe" />
        {pending ? "Please wait…" : isLogin ? "Client login" : "Create account"}
      </button>

      <p className="text-center text-[13px] text-ink/55">
        {isLogin ? (
          <>
            New here?{" "}
            <Link href="/signup" className="text-ink uline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have access?{" "}
            <Link href="/login" className="text-ink uline">
              Client login
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
