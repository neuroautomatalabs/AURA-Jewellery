"use client";

import { useEffect, useState } from "react";
import { products as seedProducts } from "@/data/products";
import { readBrowserStore, subscribeBrowserStore } from "@/lib/browser-store";
import { isStaticPages } from "@/lib/static-pages";
import { publicBestsellers, publicCatalog } from "@/lib/store-core";
import type { Product } from "@/lib/types";

export function useLiveCatalog(fallback: Product[]): Product[] {
  const [products, setProducts] = useState(fallback);

  useEffect(() => {
    if (!isStaticPages) {
      setProducts(fallback);
      return;
    }
    function sync() {
      setProducts(publicCatalog(readBrowserStore()));
    }
    sync();
    return subscribeBrowserStore(sync);
  }, [fallback]);

  return products;
}

export function useLiveBestsellers(fallback: Product[], limit = 8): Product[] {
  const [products, setProducts] = useState(fallback);

  useEffect(() => {
    if (!isStaticPages) {
      setProducts(fallback);
      return;
    }
    function sync() {
      setProducts(publicBestsellers(readBrowserStore(), limit));
    }
    sync();
    return subscribeBrowserStore(sync);
  }, [fallback, limit]);

  return products;
}

export function lookupLiveProduct(id: string): Product | undefined {
  if (isStaticPages && typeof window !== "undefined") {
    const fromStore = publicCatalog(readBrowserStore()).find((p) => p.id === id);
    if (fromStore) return fromStore;
  }
  return seedProducts.find((p) => p.id === id);
}
