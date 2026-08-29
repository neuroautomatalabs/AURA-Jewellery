"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";

export function useLiveCatalog(fallback: Product[]): Product[] {
  const [products, setProducts] = useState(fallback);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/catalog", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as { products?: Product[] };
        if (!cancelled && json.products?.length) {
          setProducts(json.products);
        }
      } catch {
        // Keep server-rendered fallback.
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [fallback]);

  return products;
}

export function useLiveBestsellers(fallback: Product[], limit = 8): Product[] {
  const catalog = useLiveCatalog(fallback);
  return catalog.slice(0, limit);
}

export function lookupLiveProduct(id: string, fallback: Product[]): Product | undefined {
  return fallback.find((p) => p.id === id);
}
