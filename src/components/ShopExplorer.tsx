"use client";

import { useMemo, useState } from "react";
import { EarMap } from "@/components/EarMap";
import {
  ProductFilters,
  type KaratFilter,
  type MetalFilter,
} from "@/components/ProductFilters";
import { ProductGrid } from "@/components/ProductGrid";
import { filterProducts, products } from "@/data/products";
import { getPiercing } from "@/data/piercings";
import type { PiercingId } from "@/lib/types";

type Props = {
  initialMetal?: MetalFilter;
  initialKarat?: KaratFilter;
  initialPiercing?: PiercingId | null;
  mode?: "catalog" | "ear-map";
  title?: string;
  subtitle?: string;
};

export function ShopExplorer({
  initialMetal = "all",
  initialKarat = "all",
  initialPiercing = null,
  mode = "catalog",
  title = "Gold & Diamond",
  subtitle = "One collection — filter by metal and karat.",
}: Props) {
  const [metal, setMetal] = useState<MetalFilter>(initialMetal);
  const [karat, setKarat] = useState<KaratFilter>(initialKarat);
  const [piercing, setPiercing] = useState<PiercingId | null>(
    mode === "ear-map" ? initialPiercing : null,
  );

  const piercingMeta = piercing ? getPiercing(piercing) : null;

  const list = useMemo(
    () =>
      filterProducts(products, {
        metal,
        karat: metal === "diamond" ? "all" : karat,
        piercing: mode === "ear-map" ? piercing : null,
      }),
    [metal, karat, piercing, mode],
  );

  return (
    <div className="min-h-[60vh] bg-surface">
      <div
        className={
          mode === "ear-map"
            ? "bg-gradient-to-b from-royal-deep to-royal text-white"
            : "border-b border-line bg-white"
        }
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <p
            className={`text-[11px] font-bold uppercase tracking-[0.24em] ${
              mode === "ear-map" ? "text-gold-bright" : "text-gold"
            }`}
          >
            {mode === "ear-map" ? "Interactive experience" : "Collection"}
          </p>
          <h1
            className={`font-display mt-2 text-3xl sm:text-4xl md:text-5xl ${
              mode === "ear-map" ? "text-white" : "text-royal"
            }`}
          >
            {title}
          </h1>
          <p
            className={`mt-3 max-w-2xl text-sm sm:text-base ${
              mode === "ear-map" ? "text-white/75" : "text-ink-muted"
            }`}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <ProductFilters
        metal={metal}
        karat={karat}
        piercingLabel={mode === "ear-map" ? piercingMeta?.name : null}
        resultCount={list.length}
        onMetalChange={(m) => {
          setMetal(m);
          if (m === "diamond") setKarat("all");
        }}
        onKaratChange={setKarat}
        onClearPiercing={
          mode === "ear-map" ? () => setPiercing(null) : undefined
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {mode === "ear-map" ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr] xl:grid-cols-[minmax(0,420px)_1fr]">
            <div className="lg:sticky lg:top-44 lg:self-start">
              <EarMap
                selectedId={piercing}
                onSelect={(id) =>
                  setPiercing((prev) => (prev === id ? null : id))
                }
              />
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold text-ink">
                {piercingMeta
                  ? `Studs for ${piercingMeta.name}`
                  : "Select a piercing on the map — or browse all below"}
              </p>
              <ProductGrid products={list} />
            </div>
          </div>
        ) : (
          <ProductGrid products={list} />
        )}
      </div>
    </div>
  );
}
