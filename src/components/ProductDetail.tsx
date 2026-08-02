"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, ProductSpecRow, StudSize } from "@/lib/types";
import {
  formatPrice,
  formatPricePlain,
  getDiamondDetailRows,
  getProductDetailRows,
  getProductImages,
  getProductSku,
} from "@/data/products";
import { RETURN_POLICY, STUD_SIZES } from "@/lib/return-policy";
import { useCart } from "@/components/CartProvider";

function needsSize(product: Product) {
  return product.style === "stud" && product.unit === "single";
}

function SpecTable({
  title,
  rows,
}: {
  title: string;
  rows: ProductSpecRow[];
}) {
  if (!rows.length) return null;
  return (
    <div className="overflow-hidden rounded-xl border border-line shadow-[var(--shadow-soft)]">
      <div className="bg-royal px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
        {title}
      </div>
      <dl>
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 border-t border-line sm:grid-cols-[10rem_1fr]"
          >
            <dt className="bg-surface px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-muted">
              {row.label}
            </dt>
            <dd className="px-4 py-3 text-sm leading-relaxed text-ink">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const images = getProductImages(product);
  const sku = getProductSku(product);
  const showSize = needsSize(product);
  const detailRows = getProductDetailRows(product);
  const diamondRows = getDiamondDetailRows(product);

  const [active, setActive] = useState(0);
  const [size, setSize] = useState<StudSize | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const inCart = items
    .filter((i) => i.productId === product.id)
    .reduce((n, i) => n + i.qty, 0);

  useEffect(() => {
    setActive(0);
    setSize(null);
    setQty(1);
    setAdded(false);
    setShowPolicy(false);
  }, [product.id]);

  function prevImage() {
    setActive((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function nextImage() {
    setActive((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  function confirmAdd() {
    if (showSize && !size) return;
    addItem(product.id, showSize ? size : null, qty);
    setAdded(true);
  }

  const metalBadge =
    product.metal === "gold"
      ? `${product.karat?.toUpperCase()} Gold`
      : "Diamond";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-7 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] text-ink-muted">
        <Link href="/" className="transition hover:text-royal">
          Home
        </Link>
        <span aria-hidden>/</span>
        <Link href="/shop" className="transition hover:text-royal">
          Shop
        </Link>
        <span aria-hidden>/</span>
        <span className="line-clamp-1 font-semibold text-royal">
          {product.name}
        </span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="gallery-3d relative aspect-square overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-soft)]">
            <div className="metal-shine absolute inset-0">
              <Image
                src={images[active]}
                alt={`${product.name} — image ${active + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-royal-deep/60 to-transparent px-4 py-3.5">
              <button
                type="button"
                onClick={prevImage}
                className="rounded-md bg-white/95 px-3 py-1.5 text-sm font-semibold text-royal shadow-sm transition hover:bg-white"
                aria-label="Previous image"
              >
                ‹
              </button>
              <span className="rounded-md bg-white/95 px-3 py-1 text-xs font-semibold text-royal">
                {active + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={nextImage}
                className="rounded-md bg-white/95 px-3 py-1.5 text-sm font-semibold text-royal shadow-sm transition hover:bg-white"
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setActive(i)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  i === active
                    ? "border-royal shadow-sm"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                aria-label={`View image ${i + 1}`}
                aria-current={i === active}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow text-gold">{metalBadge}</p>
          <h1 className="font-display mt-3 text-3xl leading-tight text-royal sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-3 text-sm text-ink-muted">
            SKU:{" "}
            <span className="font-semibold tracking-wide text-ink">{sku}</span>
          </p>

          <div className="mt-6 border-y border-line py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Regular price
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-royal">
              {formatPricePlain(product.price, product.currency)}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              {formatPrice(product.price, product.currency)} · Taxes included.
              Shipping calculated at checkout.
            </p>
          </div>

          {showSize && (
            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Size
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {STUD_SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`min-h-10 rounded-full px-3.5 text-sm font-semibold transition ${
                      size === s
                        ? "bg-royal text-white"
                        : "bg-surface text-ink hover:bg-royal-soft"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {!size && (
                <p className="mt-2 text-xs text-ink-muted">
                  Choose a face size for this single stud.
                </p>
              )}
            </div>
          )}

          {product.unit === "pair" && (
            <p className="mt-6 text-sm text-ink-muted">
              Sold as a matched pair — size is pre-set for lobe wear.
            </p>
          )}

          <div className="mt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Quantity
            </p>
            <div className="mt-2 inline-flex items-center overflow-hidden rounded-lg border border-line">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-lg text-ink hover:bg-surface"
                aria-label={`Decrease quantity for ${product.name}`}
              >
                −
              </button>
              <span className="flex h-11 min-w-12 items-center justify-center border-x border-line text-sm font-semibold">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                className="flex h-11 w-11 items-center justify-center text-lg text-ink hover:bg-surface"
                aria-label={`Increase quantity for ${product.name}`}
              >
                +
              </button>
            </div>
            {inCart > 0 && (
              <p className="mt-2 text-xs text-ink-muted">
                ({inCart} in cart)
              </p>
            )}
          </div>

          {added ? (
            <div className="mt-6 space-y-2">
              <p className="rounded-lg bg-royal-soft px-3 py-2.5 text-center text-sm font-semibold text-royal">
                Added to cart
                {size ? ` · ${size}` : ""}
                {qty > 1 ? ` · ×${qty}` : ""}
              </p>
              <div className="flex gap-2">
                <Link href="/cart" className="btn-primary flex-1 text-center">
                  View cart
                </Link>
                <Link href="/shop" className="btn-outline flex-1 text-center">
                  Keep shopping
                </Link>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={confirmAdd}
              disabled={showSize && !size}
              className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-45"
            >
              {showSize && !size ? "Select a size" : "Add to cart"}
            </button>
          )}

          <div className="mt-5 rounded-xl border border-line bg-surface px-4 py-3.5">
            <button
              type="button"
              onClick={() => setShowPolicy((v) => !v)}
              className="flex w-full items-center justify-between gap-2 text-left"
            >
              <span className="text-sm font-semibold text-royal">
                Return policy
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {showPolicy ? "Hide" : "Details"}
              </span>
            </button>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
              {RETURN_POLICY.summary}
            </p>
            {showPolicy && (
              <ul className="mt-3 space-y-1.5 border-t border-line pt-3 text-xs leading-relaxed text-ink-muted">
                {RETURN_POLICY.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Product description tables */}
      <section className="mt-16 max-w-3xl">
        <p className="eyebrow text-gold">Details</p>
        <h2 className="font-display mt-2 text-2xl text-royal sm:text-3xl">
          Product description
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          {product.description}
        </p>

        <div className="mt-8 space-y-5">
          <SpecTable title="Product detail" rows={detailRows} />
          <SpecTable title="Diamond details" rows={diamondRows} />
        </div>
      </section>
    </div>
  );
}
