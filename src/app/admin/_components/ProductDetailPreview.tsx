"use client";

import { useEffect } from "react";
import { ProductDetail } from "@/components/ProductDetail";
import type { Product } from "@/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  product: Product;
  published: boolean;
  liveHref?: string;
};

export function ProductDetailPreview({
  open,
  onClose,
  product,
  published,
  liveHref,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const canOpenLive = Boolean(published && liveHref);

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-royal-deep/70 p-3 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close preview"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Product page preview"
        className="relative z-10 my-4 w-full max-w-7xl overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-lift)]"
      >
        <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white px-4 py-3 sm:px-6">
          <p className="text-sm font-semibold text-royal">Product page preview</p>
          <div className="flex flex-wrap items-center gap-2">
            {canOpenLive ? (
              <a
                href={liveHref}
                target="_blank"
                rel="noreferrer"
                className="btn-gold min-h-9 px-3 text-[11px]"
              >
                Open live page
              </a>
            ) : (
              <button
                type="button"
                disabled
                title="Save with Published on the shop checked to open the live page"
                className="btn-gold min-h-9 px-3 text-[11px]"
              >
                Open live page
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-1.5 text-sm font-semibold text-ink-muted hover:bg-surface hover:text-royal"
            >
              Close
            </button>
          </div>
        </div>
        <ProductDetail product={product} preview />
      </div>
    </div>
  );
}
