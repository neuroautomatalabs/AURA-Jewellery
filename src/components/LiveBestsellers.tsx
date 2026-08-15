"use client";

import { ProductGrid } from "@/components/ProductGrid";
import { useLiveBestsellers } from "@/lib/use-live-catalog";
import type { Product } from "@/lib/types";

export function LiveBestsellers({ products }: { products: Product[] }) {
  const live = useLiveBestsellers(products, 8);
  return <ProductGrid products={live} />;
}
