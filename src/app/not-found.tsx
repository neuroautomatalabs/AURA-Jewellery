"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductDetail } from "@/components/ProductDetail";
import { products as seedProducts } from "@/data/products";
import type { Product } from "@/lib/types";

export default function NotFound() {
  const [product, setProduct] = useState<Product | undefined>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const match = window.location.pathname.match(/^\/products\/([^/]+)$/);
    if (match) {
      setProduct(seedProducts.find((p) => p.id === decodeURIComponent(match[1])));
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  if (product) {
    return (
      <>
        <Header />
        <main className="site-main">
          <ProductDetail product={product} />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-surface px-4 text-center">
      <p className="eyebrow text-gold">404</p>
      <h1 className="font-display mt-3 text-4xl text-royal">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-ink-muted">
        That page is not in this collection. Head back to the shop to keep browsing.
      </p>
      <Link href="/" className="btn-primary mt-6">
        Back to home
      </Link>
    </div>
  );
}
