"use client";

import { useMemo, useState } from "react";
import { EarMap } from "@/components/EarMap";
import { NoseMap } from "@/components/NoseMap";
import {
  ProductFilters,
  type KaratFilter,
  type MetalFilter,
} from "@/components/ProductFilters";
import { ProductGrid } from "@/components/ProductGrid";
import { filterProducts, products } from "@/data/products";
import { getPiercing } from "@/data/piercings";
import type {
  EarPiercingId,
  NosePiercingId,
  PiercingId,
  PiercingRegion,
} from "@/lib/types";

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
  const [region, setRegion] = useState<PiercingRegion>("ear");
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

  function switchRegion(next: PiercingRegion) {
    setRegion(next);
    setPiercing(null);
  }

  return (
    <div className="min-h-[60vh] bg-surface">
      <div
        className={
          mode === "ear-map"
            ? "relative overflow-hidden bg-gradient-to-b from-royal-deep to-royal text-white"
            : "border-b border-line bg-white"
        }
      >
        {mode === "ear-map" && (
          <div
            className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-gold/15 blur-3xl"
            aria-hidden
          />
        )}
        <div className="relative mx-auto max-w-7xl px-4 py-11 sm:px-6 sm:py-14">
          <p
            className={`eyebrow ${
              mode === "ear-map" ? "text-gold-bright" : "text-gold"
            }`}
          >
            {mode === "ear-map" ? "Interactive experience" : "Collection"}
          </p>
          <h1
            className={`font-display mt-3 text-3xl tracking-wide sm:text-4xl md:text-5xl ${
              mode === "ear-map" ? "text-white" : "text-royal"
            }`}
          >
            {title}
          </h1>
          <p
            className={`mt-3 max-w-2xl text-sm leading-relaxed sm:text-base ${
              mode === "ear-map" ? "text-white/75" : "text-ink-muted"
            }`}
          >
            {subtitle}
          </p>

          {mode === "ear-map" && (
            <div className="mt-7 inline-flex rounded-full bg-white/10 p-1 ring-1 ring-white/20 backdrop-blur-sm">
              {(
                [
                  { id: "ear", label: "Ear map" },
                  { id: "nose", label: "Nose map" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => switchRegion(tab.id)}
                  className={`min-h-10 rounded-full px-5 text-sm font-semibold transition ${
                    region === tab.id
                      ? "bg-gold text-royal-deep shadow-md"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
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
              {region === "ear" ? (
                <EarMap
                  selectedId={piercing as EarPiercingId | null}
                  onSelect={(id) =>
                    setPiercing((prev) => (prev === id ? null : id))
                  }
                />
              ) : (
                <NoseMap
                  selectedId={piercing as NosePiercingId | null}
                  onSelect={(id) =>
                    setPiercing((prev) => (prev === id ? null : id))
                  }
                />
              )}
            </div>
            <div>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
                <p className="text-sm font-semibold text-ink">
                  {piercingMeta
                    ? `Pieces for ${piercingMeta.name}`
                    : `Select a ${region} piercing on the map — or browse all below`}
                </p>
                {piercingMeta && (
                  <p className="text-xs text-ink-muted">
                    {list.length} matching design{list.length === 1 ? "" : "s"}
                  </p>
                )}
              </div>
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
