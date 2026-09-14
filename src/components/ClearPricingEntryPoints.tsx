"use client";

import Link from "next/link";
import { formatPrice } from "@/data/products";
import { Reveal, Tilt3D } from "@/components/Motion";
import { useGoldRates } from "@/components/GoldRatesProvider";
import { calculateEntryPointPrices } from "@/lib/pricing";

const TIERS = [
  {
    key: "everyday" as const,
    label: "Everyday 18K",
    desc: "Daily-wear gold studs",
    fallback: 2499,
  },
  {
    key: "signature" as const,
    label: "Signature",
    desc: "Elevated everyday pieces",
    fallback: 4499,
  },
  {
    key: "heritage" as const,
    label: "Heritage",
    desc: "Richer traditional gold",
    fallback: 6499,
  },
];

export function ClearPricingEntryPoints() {
  const { rates } = useGoldRates();
  const live = calculateEntryPointPrices(rates);

  return (
    <section className="site-gutter relative overflow-hidden bg-royal py-14 sm:py-16">
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-gold/15 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[var(--site-max)]">
        <Reveal>
          <h2 className="text-center font-display text-3xl text-white sm:text-4xl">
            Starts from
          </h2>
          <p className="mt-2 text-center text-sm text-white/65">
            Clear pricing · three entry points
            {rates?.gold22 != null ? " · live 22K rate" : ""}
          </p>
        </Reveal>
        <div className="mt-9 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {TIERS.map((tier, i) => {
            const price = live?.[tier.key] ?? tier.fallback;
            return (
              <Reveal key={tier.key} delay={i * 100}>
                <Tilt3D maxTilt={8} className="rounded-2xl">
                  <Link
                    href="/shop?metal=gold"
                    className="depth-card group flex flex-col items-center rounded-2xl border border-white/15 bg-white/5 px-5 py-9 text-center backdrop-blur-sm hover:border-gold/50 hover:bg-white/10"
                  >
                    <p className="eyebrow text-gold-bright">{tier.label}</p>
                    <p className="font-display mt-4 text-3xl text-white sm:text-4xl">
                      {formatPrice(price)}
                    </p>
                    <p className="mt-2 text-sm text-white/60">{tier.desc}</p>
                    <span className="mt-6 text-xs font-bold uppercase tracking-wider text-gold-bright transition group-hover:underline">
                      Browse →
                    </span>
                  </Link>
                </Tilt3D>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
