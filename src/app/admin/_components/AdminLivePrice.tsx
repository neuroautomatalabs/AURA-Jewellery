"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/data/products";
import type { CjaRates } from "@/lib/cja-rates";
import {
  getProductWeightGrams,
  resolveProductAmountInr,
} from "@/lib/pricing";
import type { Product } from "@/lib/types";

type ProductLike = Pick<
  Product,
  "metal" | "weight" | "price" | "diamondCarat" | "currency"
>;

export function AdminLivePrice({ product }: { product: ProductLike }) {
  const [rates, setRates] = useState<CjaRates | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/gold-rate?_=${Date.now()}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: CjaRates | null) => {
        if (!cancelled && data) setRates(data);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const amount = resolveProductAmountInr(product, rates);
  const weight = getProductWeightGrams(product);

  return (
    <div>
      <p className="font-semibold">{formatPrice(amount, product.currency)}</p>
      {weight != null && (
        <p className="text-xs text-ink-muted">
          {weight < 1 ? weight.toFixed(3) : String(weight)} gm · live rate
        </p>
      )}
    </div>
  );
}
