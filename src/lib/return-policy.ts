export const RETURN_POLICY = {
  summary:
    "7-day exchange on unworn, unused pieces with original packaging and tags.",
  points: [
    "Hallmarked gold and certified diamond jewellery — quality assured on delivery.",
    "Exchange within 7 days if unused, unworn, and in original condition.",
    "Custom / made-to-order pieces are non-returnable.",
    "Piercing services and opened hygiene-sealed jewellery cannot be returned.",
  ],
} as const;

export const STUD_SIZES = ["2.5mm", "3mm", "4mm", "5mm", "6mm"] as const;

export type DefaultStudSize = (typeof STUD_SIZES)[number];

export function getProductSizes(product: {
  style: string;
  unit: string;
  sizes?: string[];
}): string[] {
  if (product.style !== "stud" || product.unit !== "single") return [];
  if (Array.isArray(product.sizes)) return product.sizes;
  return [...STUD_SIZES];
}

export function productNeedsSize(product: {
  style: string;
  unit: string;
  sizes?: string[];
}) {
  return getProductSizes(product).length > 0;
}
