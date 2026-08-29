"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clientSession } from "@/lib/admin-client";

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

  return <>{children}</>;
}
