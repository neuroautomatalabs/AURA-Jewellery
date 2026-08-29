"use client";

import { useCallback, useEffect, useState } from "react";
import { clientReadStore } from "@/lib/admin-client";
import type { AuraStore } from "@/lib/commerce";

export function useAdminStore() {
  const [store, setStore] = useState<AuraStore | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setStore(await clientReadStore());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load dashboard.");
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { store, error, reload };
}
