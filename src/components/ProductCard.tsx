"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/data/products";
import { Tilt3D } from "@/components/Motion";

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.id}`;
  const metalLabel =
    product.metal === "gold"
      ? `${product.karat?.toUpperCase()} Gold`
      : "Diamond";

  return (
    <Tilt3D className="h-full rounded-xl">
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[var(--shadow-soft)] transition duration-300 hover:border-royal/15 hover:shadow-[var(--shadow-lift)]">
        <Link
          href={href}
          className="metal-shine relative aspect-square overflow-hidden bg-surface"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-deep/30 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
          <div className="absolute left-2.5 top-2.5 rounded-md bg-royal/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {metalLabel}
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-3.5 sm:p-4">
          <Link href={href}>
            <h3 className="font-display line-clamp-2 min-h-[2.75rem] text-[15px] leading-snug text-ink transition group-hover:text-royal sm:text-base">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 text-lg font-bold tracking-tight text-royal">
            {formatPrice(product.price, product.currency)}
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-ink-muted">
            {product.unit === "pair" ? "Pair" : product.style}
          </p>
          <Link
            href={href}
            className="btn-primary mt-4 w-full text-center text-[11px] sm:text-[13px]"
          >
            View details
          </Link>
        </div>
      </article>
    </Tilt3D>
  );
}
