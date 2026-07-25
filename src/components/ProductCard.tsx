import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2.5 top-2.5 rounded-md bg-royal px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          {product.metal === "gold"
            ? `${product.karat?.toUpperCase()} Gold`
            : "Diamond"}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="font-display line-clamp-2 min-h-[2.75rem] text-[15px] leading-snug text-ink sm:text-base">
          {product.name}
        </h3>
        <p className="mt-2 text-lg font-bold text-royal">
          {formatPrice(product.price, product.currency)}
        </p>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-ink-muted">
          {product.style}
        </p>
        <Link href="/appointment" className="btn-primary mt-3.5 w-full">
          Enquire / Book
        </Link>
      </div>
    </article>
  );
}
