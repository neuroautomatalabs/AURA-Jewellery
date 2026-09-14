"use client";

import { formatPrice, formatPricePlain } from "@/data/products";
import { useGoldRates } from "@/components/GoldRatesProvider";
import {
  calculateProductPrice,
  resolveProductAmountInr,
} from "@/lib/pricing";
import type { Product } from "@/lib/types";

type ProductLike = Pick<
  Product,
  "metal" | "weight" | "price" | "diamondCarat" | "currency"
>;

export function useLiveProductPrice(
  product: ProductLike,
  options?: { shippingInr?: number },
) {
  const { rates } = useGoldRates();
  const breakdown = calculateProductPrice(product, rates, options);
  const amount = resolveProductAmountInr(product, rates, options);
  return {
    amount,
    breakdown,
    live: Boolean(breakdown),
    rates,
  };
}

export function ProductPrice({
  product,
  className,
  plain = false,
}: {
  product: ProductLike;
  className?: string;
  plain?: boolean;
}) {
  const { amount } = useLiveProductPrice(product);
  const text = plain
    ? formatPricePlain(amount, product.currency)
    : formatPrice(amount, product.currency);
  return <span className={className}>{text}</span>;
}

export function ProductPriceNote({ product }: { product: ProductLike }) {
  const { amount, live, breakdown } = useLiveProductPrice(product);
  return (
    <p className="mt-1 text-sm text-ink-muted">
      {formatPrice(amount, product.currency)}
      {live ? " · Live CJA rate · Taxes included." : " · Taxes included."}{" "}
      Shipping calculated at checkout
      {breakdown ? ` · ${breakdown.weightG} gm` : ""}.
    </p>
  );
}
