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
    <div className="bg-royal-deep px-3 py-2.5 text-center text-[11px] font-medium tracking-wide text-white/90 sm:text-xs">
      {message}
    </div>
  );
}

async function fetchLiveRates(): Promise<CjaRates> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12_000);

  try {
    const live = await fetch("/api/gold-rate", {
      cache: "no-store",
      signal: controller.signal,
    });
    if (live.ok) {
      return (await live.json()) as CjaRates;
    }
  } finally {
    window.clearTimeout(timeout);
  }

  const baked = await fetch("/gold-rates.json", { cache: "no-store" });
  if (!baked.ok) {
    throw new Error(`HTTP ${baked.status}`);
  }
  return (await baked.json()) as CjaRates;
}

export function GoldRateBar({
  initialRates = null,
}: {
  initialRates?: CjaRates | null;
}) {
  const [rates, setRates] = useState<CjaRates | null>(initialRates);
  const [failed, setFailed] = useState(
    initialRates != null && initialRates.gold18 == null,
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchLiveRates();
        if (!cancelled) {
          setRates(data);
          setFailed(data.gold18 == null);
        }
      } catch {
        if (!cancelled && initialRates == null) {
          setFailed(true);
        }
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
  }, [initialRates]);

  if (!rates && !failed) {
    return <FallbackBar message="Loading today's CJA gold rates…" />;
  }

  if (!rates || rates.gold18 == null) {
    return (
      <FallbackBar message="Hallmarked gold & certified diamonds · Free styling consultation" />
    );
  }

  return (
    <div className="bg-royal-deep px-3 py-2.5 text-center text-[11px] font-medium tracking-wide text-white sm:text-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-5">
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-bright/90 sm:inline">
          Today&apos;s CJA rate
        </span>
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
