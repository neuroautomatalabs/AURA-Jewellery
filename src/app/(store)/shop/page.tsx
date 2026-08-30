import { ShopExplorer } from "@/components/ShopExplorer";
import { getCatalogProducts } from "@/lib/catalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Gold & Diamond",
  description:
    "Browse Aura Jewellery gold and diamond studs. Filter by gold, diamond, ear and nose — all in one collection.",
};

export default async function ShopPage() {
  const products = await getCatalogProducts();
  return (
    <ShopExplorer
      products={products}
      mode="catalog"
      title="Gold & Diamond"
    />
  );
}
