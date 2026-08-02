"use client";

import type { GoldKarat, MetalType } from "@/lib/types";

export type MetalFilter = MetalType | "all";
export type KaratFilter = GoldKarat | "all";

type Props = {
  metal: MetalFilter;
  karat: KaratFilter;
  piercingLabel?: string | null;
  onMetalChange: (metal: MetalFilter) => void;
  onKaratChange: (karat: KaratFilter) => void;
  onClearPiercing?: () => void;
  resultCount?: number;
};

export function ProductFilters({
  metal,
  karat,
  piercingLabel,
  onMetalChange,
  onKaratChange,
  onClearPiercing,
  resultCount,
}: Props) {
  return (
    <div className="sticky top-[6.75rem] z-30 border-b border-line bg-white/90 shadow-[0_4px_20px_rgb(11_31_92/0.06)] backdrop-blur-lg sm:top-[6.5rem]">
      <div className="mx-auto max-w-7xl space-y-3 px-4 py-3.5 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Metal
          </span>
          {(
            [
              { id: "all", label: "All" },
              { id: "gold", label: "Gold" },
              { id: "diamond", label: "Diamond" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onMetalChange(opt.id)}
              className={`min-h-10 rounded-full px-4 text-sm font-semibold transition ${
                metal === opt.id
                  ? "bg-royal text-white shadow-sm"
                  : "bg-surface text-ink hover:bg-royal-soft"
              }`}
            >
              {opt.label}
            </button>
          ))}
          {typeof resultCount === "number" && (
            <span className="ml-auto rounded-full bg-royal-soft px-3 py-1 text-xs font-semibold text-royal">
              {resultCount} designs
            </span>
          )}
        </div>

        {(metal === "gold" || metal === "all") && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Karat
            </span>
            {(
              [
                { id: "all", label: "All" },
                { id: "18k", label: "18K" },
                { id: "22k", label: "22K" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onKaratChange(opt.id)}
                className={`min-h-10 rounded-full px-4 text-sm font-medium transition ${
                  karat === opt.id
                    ? "bg-gold text-royal-deep shadow-sm"
                    : "bg-gold-soft text-ink hover:brightness-95"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {piercingLabel && (
          <div className="flex flex-wrap items-center gap-2 rounded-xl bg-royal-soft px-3.5 py-2.5">
            <span className="text-sm text-royal">
              Showing for <strong>{piercingLabel}</strong>
            </span>
            {onClearPiercing && (
              <button
                type="button"
                onClick={onClearPiercing}
                className="ml-auto min-h-8 rounded-full bg-white px-3 text-xs font-semibold text-royal shadow-sm transition hover:bg-royal hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
