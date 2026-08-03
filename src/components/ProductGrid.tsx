"use client";

import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/Motion";

export function ProductGrid({
  products,
  emptyMessage = "No pieces match these filters yet. Try another placement or metal.",
}: {
  products: Product[];
  emptyMessage?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
        <p className="font-display text-xl text-royal">Nothing here yet</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
      {products.map((product, i) => (
        <Reveal key={product.id} delay={Math.min(i * 60, 360)}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
