import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  formatPrice,
  getRelatedProducts,
  products as seedProducts,
} from "@/data/products";
import { ProductDetail } from "@/components/ProductDetail";
import { getCatalogProducts, getSellableProduct } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return seedProducts.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getSellableProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getSellableProduct(slug);
  if (!product) notFound();

  const catalog = await getCatalogProducts();
  const related = getRelatedProducts(product, 4, catalog);

  return (
    <>
      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="border-t border-line bg-surface">
          <div className="site-container py-12 sm:py-16">
            <p className="eyebrow text-gold">Continue browsing</p>
            <h2 className="font-display mt-2 text-2xl text-royal sm:text-3xl">
              You may also like
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Similar metal and piercing placements from the collection.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="group overflow-hidden rounded-xl border border-line bg-white shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-royal/15 hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-white">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3.5 sm:p-4">
                    <h3 className="font-display line-clamp-2 text-[15px] leading-snug text-ink transition group-hover:text-royal">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-base font-bold text-royal">
                      {formatPrice(item.price, item.currency)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
