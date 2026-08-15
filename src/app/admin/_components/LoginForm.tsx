"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clientLogin, clientSession } from "@/lib/admin-client";
import { isStaticPages, PAGES_ADMIN_PASSWORD } from "@/lib/static-pages";
import { useEffect } from "react";

export function LoginForm({
  next,
}: {
  next: string;
}) {
  const router = useRouter();
  const search = useSearchParams();
  const dest = search.get("next") || next;
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [configured, setConfigured] = useState(isStaticPages);

  useEffect(() => {
    void clientSession().then((session) => {
      setConfigured(session.configured);
      if (session.ok) router.replace("/admin");
    });
  }, [router]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") ?? "");
    const result = await clientLogin(password, dest);
    if (result.error) {
      setError(result.error);
      setPending(false);
      return;
    }
    router.push(result.next || "/admin");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="field-label">Owner password</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="field-input"
          placeholder="••••••••"
        />
      </label>
      {isStaticPages && (
        <p className="rounded-xl border border-gold/40 bg-gold-soft px-3 py-2.5 text-sm text-royal-deep">
          Client preview password:{" "}
          <code className="font-semibold">{PAGES_ADMIN_PASSWORD}</code>
        </p>
      )}
      {!configured && !isStaticPages && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
          Add <code className="font-semibold">ADMIN_PASSWORD</code> to{" "}
          <code className="font-semibold">.env.local</code> first.
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800"
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending || (!configured && !isStaticPages)}
        className="btn-primary w-full"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
