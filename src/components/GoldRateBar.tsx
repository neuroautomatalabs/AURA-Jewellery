"use client";

import { useEffect, useState } from "react";
import { formatRateInr, type CjaRates } from "@/lib/cja-rates";

function RateChip({
  label,
  amount,
  unit = "/g",
  fractionDigits = 0,
}: {
  label: string;
  amount: number;
  unit?: string;
  fractionDigits?: number;
}) {
  return (
    <span className="inline-flex items-baseline gap-1 whitespace-nowrap">
      <span className="text-white/70">{label}</span>
      <span className="font-semibold text-gold-bright">
        {formatRateInr(amount, fractionDigits)}
        {unit}
      </span>
    </span>
  );
}

function FallbackBar({ message }: { message: string }) {
  return (
    <div className="bg-royal-deep px-3 py-2 text-center text-[11px] font-medium tracking-wide text-white sm:text-xs">
      {message}
    </div>
  );
}

async function loadRates(base: string): Promise<CjaRates> {
  // Prefer live API when a Node server is available (local / Vercel).
  try {
    const live = await fetch(`${base}/api/gold-rate`, { cache: "no-store" });
    if (live.ok) {
      return (await live.json()) as CjaRates;
    }
  } catch {
    // Fall through to static JSON (GitHub Pages).
  }

  const baked = await fetch(`${base}/gold-rates.json`, { cache: "no-store" });
  if (!baked.ok) {
    throw new Error(`HTTP ${baked.status}`);
  }
  return (await baked.json()) as CjaRates;
}

export function GoldRateBar() {
  const [rates, setRates] = useState<CjaRates | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

    async function load() {
      try {
        const data = await loadRates(base);
        if (!cancelled) {
          setRates(data);
          setFailed(false);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void load();

    const onFocus = () => {
      void load();
    };
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  if (!rates && !failed) {
    return <FallbackBar message="Loading today's CJA gold rates…" />;
  }

  if (!rates || rates.gold22 == null) {
    return (
      <FallbackBar message="Hallmarked gold & certified diamonds · Free styling consultation" />
    );
  }

  return (
    <div className="bg-royal-deep px-3 py-2 text-center text-[11px] font-medium tracking-wide text-white sm:text-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-4">
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-bright/90 sm:inline">
          Today&apos;s CJA rate
        </span>
        {rates.gold22 != null && <RateChip label="22K" amount={rates.gold22} />}
        {rates.gold18 != null && <RateChip label="18K" amount={rates.gold18} />}
        {rates.silver != null && rates.silver > 0 && (
          <span className="hidden sm:inline">
            <RateChip
              label="Silver"
              amount={rates.silver}
              fractionDigits={rates.silver % 1 === 0 ? 0 : 2}
            />
          </span>
        )}
        <span className="hidden text-white/45 md:inline" aria-hidden>
          ·
        </span>
        <a
          href="https://coimbatorejewellery.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/55 underline-offset-2 transition hover:text-white hover:underline"
        >
          {rates.updatedAt
            ? `Updated ${rates.updatedAt}`
            : "Coimbatore Jewellers Association"}
        </a>
      </div>
    </div>
  );
}
