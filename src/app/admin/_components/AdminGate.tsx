"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clientSession } from "@/lib/admin-client";
import { isStaticPages, PAGES_ADMIN_PASSWORD } from "@/lib/static-pages";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      const session = await clientSession();
      if (cancelled) return;
      if (!session.ok) {
        const login = `/admin/login?next=${encodeURIComponent(pathname)}`;
        router.replace(login);
        return;
      }
      setReady(true);
    }
    void check();
    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-surface px-4">
        <p className="text-sm text-ink-muted">Loading owner dashboard…</p>
      </div>
    );
  }

  return (
    <>
      {isStaticPages && (
        <div className="border-b border-gold/40 bg-gold-soft px-4 py-2.5 text-center text-sm text-royal-deep lg:pl-64">
          GitHub Pages demo — product, order and booking changes stay in this
          browser so the client can test the dashboard. Password:{" "}
          <code className="font-semibold">{PAGES_ADMIN_PASSWORD}</code>
        </div>
      )}
      {children}
    </>
  );
}
