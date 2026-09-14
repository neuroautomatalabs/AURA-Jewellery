import type { CjaRates } from "@/lib/cja-rates";
import type { MetalType, Product } from "@/lib/types";

/** 18kt normal stones — wastage / stone allowance added to weight. */
export const NORMAL_WEIGHT_ADDON_G = 0.15;

/** Diamond ≤ 0.999g — wastage grams charged at 18kt rate. */
export const DIAMOND_LIGHT_WASTAGE_G = 0.19;

/** Diamond ≤ 0.999g — fixed making charges (INR). */
export const DIAMOND_LIGHT_MC_INR = 2700;

/** Diamond > 1.00g — fixed making charges (INR). */
export const DIAMOND_HEAVY_MC_INR = 3500;

/** Diamond rate per carat (INR). */
export const DIAMOND_RATE_PER_CT = 73_000;

/** GST on jewellery. */
export const GST_RATE = 0.03;

/**
 * Flat shipping added once per order (not per line).
 * Override with NEXT_PUBLIC_SHIPPING_INR.
 */
export const DEFAULT_SHIPPING_INR = Number(
  process.env.NEXT_PUBLIC_SHIPPING_INR ?? "0",
);

/** Homepage “Clear pricing · three entry points” — normal-stone starter weights. */
export const ENTRY_POINT_WEIGHTS_G = {
  everyday: 0.45,
  signature: 0.85,
  heritage: 1.35,
} as const;

export type PricingFormula =
  | "normal-stones"
  | "diamond-light"
  | "diamond-heavy";

export type PriceBreakdown = {
  formula: PricingFormula;
  weightG: number;
  diamondCt: number;
  goldRate: number;
  subtotal: number;
  gst: number;
  /** Product total with GST, before shipping. */
  totalInr: number;
  shippingInr: number;
  /** totalInr + shipping (for single-item “all-in” quotes). */
  grandTotalInr: number;
};

export type GoldRateInputs = {
  gold22: number | null | undefined;
  gold18: number | null | undefined;
};

export function parseDiamondCarats(value: string | number | undefined | null): number {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return value;
  }
  if (typeof value !== "string") return 0;
  const match = value.replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  if (!match) return 0;
  const n = Number(match[1]);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/**
 * Resolve net gold weight in grams.
 * Supports admin weight field, and the earlier migration that stored grams in `price`.
 */
export function getProductWeightGrams(
  product: Pick<Product, "weight" | "price">,
): number | null {
  if (typeof product.weight === "number" && Number.isFinite(product.weight) && product.weight > 0) {
    return product.weight;
  }
  // Admin form previously persisted grams into `price` when values look like weight.
  if (
    typeof product.price === "number" &&
    Number.isFinite(product.price) &&
    product.price > 0 &&
    product.price < 100
  ) {
    return product.price;
  }
  return null;
}

export function pickPricingFormula(
  metal: MetalType,
  weightG: number,
): PricingFormula {
  if (metal !== "diamond") return "normal-stones";
  return weightG < 1 ? "diamond-light" : "diamond-heavy";
}

function roundInr(amount: number) {
  return Math.round(amount);
}

function withGst(subtotal: number) {
  const gst = subtotal * GST_RATE;
  return {
    subtotal: roundInr(subtotal),
    gst: roundInr(gst),
    totalInr: roundInr(subtotal + gst),
  };
}

export function calculateJewelleryPrice(input: {
  metal: MetalType;
  weightG: number;
  diamondCt?: number;
  rates: GoldRateInputs;
  shippingInr?: number;
}): PriceBreakdown | null {
  const weightG = Number(input.weightG);
  if (!Number.isFinite(weightG) || weightG <= 0) return null;

  const diamondCt = Math.max(0, Number(input.diamondCt) || 0);
  const shippingInr = Math.max(0, Number(input.shippingInr) || 0);
  const formula = pickPricingFormula(input.metal, weightG);

  if (formula === "normal-stones") {
    const goldRate = Number(input.rates.gold22);
    if (!Number.isFinite(goldRate) || goldRate <= 0) return null;
    // (weight + 0.150) × 22kt rate → Value; + 3% GST; + shipping
    const subtotal = (weightG + NORMAL_WEIGHT_ADDON_G) * goldRate;
    const taxed = withGst(subtotal);
    return {
      formula,
      weightG,
      diamondCt: 0,
      goldRate,
      ...taxed,
      shippingInr,
      grandTotalInr: taxed.totalInr + shippingInr,
    };
  }

  const goldRate = Number(input.rates.gold18);
  if (!Number.isFinite(goldRate) || goldRate <= 0) return null;

  if (formula === "diamond-light") {
    // A = weight × 18kt; B = 0.190 × 18kt; C = 2700 MC; D = ct × 73000
    const a = weightG * goldRate;
    const b = DIAMOND_LIGHT_WASTAGE_G * goldRate;
    const c = DIAMOND_LIGHT_MC_INR;
    const d = diamondCt * DIAMOND_RATE_PER_CT;
    const taxed = withGst(a + b + c + d);
    return {
      formula,
      weightG,
      diamondCt,
      goldRate,
      ...taxed,
      shippingInr,
      grandTotalInr: taxed.totalInr + shippingInr,
    };
  }

  // Diamond above 1.00g: A = weight × 18kt; B = 3500 MC; C = ct × 73000
  const a = weightG * goldRate;
  const b = DIAMOND_HEAVY_MC_INR;
  const c = diamondCt * DIAMOND_RATE_PER_CT;
  const taxed = withGst(a + b + c);
  return {
    formula,
    weightG,
    diamondCt,
    goldRate,
    ...taxed,
    shippingInr,
    grandTotalInr: taxed.totalInr + shippingInr,
  };
}

export function calculateProductPrice(
  product: Pick<Product, "metal" | "weight" | "price" | "diamondCarat">,
  rates: GoldRateInputs | null | undefined,
  options?: { shippingInr?: number },
): PriceBreakdown | null {
  if (!rates) return null;
  const weightG = getProductWeightGrams(product);
  if (weightG == null) return null;
  return calculateJewelleryPrice({
    metal: product.metal,
    weightG,
    diamondCt: parseDiamondCarats(product.diamondCarat),
    rates,
    shippingInr: options?.shippingInr ?? 0,
  });
}

/** Live formula price, else legacy stored INR `price`. */
export function resolveProductAmountInr(
  product: Pick<Product, "metal" | "weight" | "price" | "diamondCarat" | "currency">,
  rates: GoldRateInputs | null | undefined,
  options?: { shippingInr?: number },
): number {
  const live = calculateProductPrice(product, rates, options);
  if (live) return live.totalInr;
  return Number.isFinite(product.price) ? Math.round(product.price) : 0;
}

export function calculateEntryPointPrices(rates: GoldRateInputs | null | undefined) {
  if (!rates?.gold22) return null;
  const mk = (weightG: number) =>
    calculateJewelleryPrice({
      metal: "gold",
      weightG,
      rates,
      shippingInr: 0,
    })?.totalInr ?? null;

  return {
    everyday: mk(ENTRY_POINT_WEIGHTS_G.everyday),
    signature: mk(ENTRY_POINT_WEIGHTS_G.signature),
    heritage: mk(ENTRY_POINT_WEIGHTS_G.heritage),
  };
}

export function ratesFromCja(rates: CjaRates | null | undefined): GoldRateInputs | null {
  if (!rates) return null;
  return { gold22: rates.gold22, gold18: rates.gold18 };
}
