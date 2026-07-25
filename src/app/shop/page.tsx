import { ShopExplorer } from "@/components/ShopExplorer";
import type { GoldKarat, MetalType, PiercingId } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Gold & Diamond",
  description:
    "Browse Aura Jewellery gold and diamond studs. Filter by 18K, 22K and diamond — all in one collection.",
};

type SearchParams = Promise<{
  metal?: string;
  karat?: string;
  piercing?: string;
}>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const metal =
    params.metal === "gold" || params.metal === "diamond"
      ? (params.metal as MetalType)
      : "all";
  const karat =
    params.karat === "18k" || params.karat === "22k"
      ? (params.karat as GoldKarat)
      : "all";
  const piercing = (params.piercing as PiercingId) || null;

  return (
    <ShopExplorer
      mode="catalog"
      initialMetal={metal}
      initialKarat={karat}
      initialPiercing={piercing}
      title="Gold & Diamond"
      subtitle="One collection for every metal. Use the filters below — Gold, Diamond, 18K and 22K stay visible."
    />
  );
}
