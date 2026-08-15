import { getProduct, products as seedProducts } from "@/data/products";
import { readStore, toPublicProduct } from "@/lib/store";
import type { Product } from "@/lib/types";

const isStaticExport = process.env.GITHUB_PAGES === "true";

export async function getCatalogProducts(): Promise<Product[]> {
  if (isStaticExport) return seedProducts;
  try {
    const store = await readStore();
    return store.products
      .filter((p) => p.published)
      .map(toPublicProduct);
  } catch {
    return seedProducts;
  }
}

export async function getBestsellerProducts(limit = 8): Promise<Product[]> {
  if (isStaticExport) return seedProducts.slice(0, limit);
  try {
    const store = await readStore();
    const live = store.products.filter((p) => p.published);
    const featured = live
      .filter((p) => p.bestseller)
      .sort((a, b) => (a.bestsellerRank ?? 99) - (b.bestsellerRank ?? 99))
      .map(toPublicProduct);
    if (featured.length) return featured.slice(0, limit);
    return live.slice(0, limit).map(toPublicProduct);
  } catch {
    return seedProducts.slice(0, limit);
  }
}

export async function getSellableProduct(id: string): Promise<Product | undefined> {
  if (isStaticExport) return getProduct(id);
  try {
    const store = await readStore();
    const found = store.products.find((p) => p.id === id);
    if (!found || !found.published) return undefined;
    return toPublicProduct(found);
  } catch {
    return getProduct(id);
  }
}

export async function getAdminProduct(id: string) {
  const store = await readStore();
  return store.products.find((p) => p.id === id);
}
