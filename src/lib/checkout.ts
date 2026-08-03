import type { CartItem } from "@/lib/types";
import { getProduct } from "@/data/products";

export type CheckoutCustomer = {
  name: string;
  email: string;
  phone: string;
};

export type CheckoutLine = {
  productId: string;
  name: string;
  size: string | null;
  qty: number;
  unitPrice: number;
  lineTotal: number;
};

export function buildCheckoutLines(items: CartItem[]): {
  lines: CheckoutLine[];
  amountPaise: number;
  amountInr: number;
  error?: string;
} {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      lines: [],
      amountPaise: 0,
      amountInr: 0,
      error: "Your cart is empty.",
    };
  }

  const lines: CheckoutLine[] = [];

  for (const item of items) {
    if (!item?.productId || typeof item.qty !== "number" || item.qty < 1) {
      return {
        lines: [],
        amountPaise: 0,
        amountInr: 0,
        error: "Invalid cart item.",
      };
    }

    const product = getProduct(item.productId);
    if (!product) {
      return {
        lines: [],
        amountPaise: 0,
        amountInr: 0,
        error: "A product in your cart is no longer available.",
      };
    }

    const needsSize = product.style === "stud" && product.unit === "single";
    if (needsSize && !item.size) {
      return {
        lines: [],
        amountPaise: 0,
        amountInr: 0,
        error: `Please choose a size for ${product.name}.`,
      };
    }

    const qty = Math.min(Math.floor(item.qty), 20);
    const lineTotal = product.price * qty;
    lines.push({
      productId: product.id,
      name: product.name,
      size: item.size,
      qty,
      unitPrice: product.price,
      lineTotal,
    });
  }

  const amountInr = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  return {
    lines,
    amountInr,
    amountPaise: amountInr * 100,
  };
}
