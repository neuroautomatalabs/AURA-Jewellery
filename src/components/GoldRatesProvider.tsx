"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CjaRates } from "@/lib/cja-rates";

type GoldRatesContextValue = {
  rates: CjaRates | null;
  failed: boolean;
  refresh: () => Promise<void>;
};

const GoldRatesContext = createContext<GoldRatesContextValue | null>(null);

function hasPrimaryRates(rates: CjaRates | null) {
  return rates != null && rates.gold22 != null;
}

async function fetchLiveRates(): Promise<CjaRates> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12_000);

  try {
    const live = await fetch(`/api/gold-rate?_=${Date.now()}`, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (live.ok) {
      return (await live.json()) as CjaRates;
    }
  } finally {
    window.clearTimeout(timeout);
  }

  const baked = await fetch("/gold-rates.json", { cache: "no-store" });
  if (!baked.ok) {
    throw new Error(`HTTP ${baked.status}`);
  }
  return (await baked.json()) as CjaRates;
}

export function GoldRatesProvider({
  initialRates = null,
  children,
}: {
  initialRates?: CjaRates | null;
  children: ReactNode;
}) {
  const [rates, setRates] = useState<CjaRates | null>(initialRates);
  const [failed, setFailed] = useState(!hasPrimaryRates(initialRates));

  const refresh = useCallback(async () => {
    try {
      const data = await fetchLiveRates();
      setRates(data);
      setFailed(!hasPrimaryRates(data));
    } catch {
      if (!hasPrimaryRates(rates) && !hasPrimaryRates(initialRates)) {
        setFailed(true);
      }
    }
  }, [initialRates, rates]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchLiveRates();
        if (!cancelled) {
          setRates(data);
          setFailed(!hasPrimaryRates(data));
        }
      } catch {
        if (!cancelled && !hasPrimaryRates(initialRates)) {
          setFailed(true);
        }
      }
    }

    void load();
    const onFocus = () => {
      void load();
    };
    const interval = window.setInterval(load, 30 * 60 * 1000);
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [initialRates]);

  const value = useMemo(
    () => ({ rates, failed, refresh }),
    [rates, failed, refresh],
  );

  return (
    <GoldRatesContext.Provider value={value}>{children}</GoldRatesContext.Provider>
  );
}

export function useGoldRates() {
  const ctx = useContext(GoldRatesContext);
  if (!ctx) {
    return {
      rates: null as CjaRates | null,
      failed: true,
      refresh: async () => undefined,
    };
  }
  return ctx;
}
