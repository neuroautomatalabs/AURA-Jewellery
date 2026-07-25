import { ShopExplorer } from "@/components/ShopExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Gold & Diamond",
  description:
    "Browse Aura Jewellery gold and diamond studs. Filter by 18K, 22K and diamond — all in one collection.",
};

export default function ShopPage() {
  return (
    <ShopExplorer
      mode="catalog"
      title="Gold & Diamond"
      subtitle="One collection for every metal. Use the filters below — Gold, Diamond, 18K and 22K stay visible."
    />
  );
}
