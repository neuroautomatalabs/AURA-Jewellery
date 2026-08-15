import { ShopExplorer } from "@/components/ShopExplorer";
import { getCatalogProducts } from "@/lib/catalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ear & Nose Maps",
  description:
    "Animated interactive ear and nose maps. Tap a piercing placement to see matching gold and diamond pieces.",
};

export default async function PiercingsPage() {
  const products = await getCatalogProducts();
  return (
    <ShopExplorer
      products={products}
      mode="ear-map"
      title="Piercing Maps"
      subtitle="Tap glowing points on the ear or nose map to reveal pieces for that exact placement — or browse all below."
    />
  );
}
