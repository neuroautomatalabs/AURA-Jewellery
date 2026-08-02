"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, StudSize } from "@/lib/types";

const STORAGE_KEY = "aura-cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (productId: string, size: StudSize | null, qty?: number) => void;
  removeItem: (productId: string, size: StudSize | null) => void;
  updateQty: (productId: string, size: StudSize | null, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function sameLine(a: CartItem, productId: string, size: StudSize | null) {
  return a.productId === productId && a.size === size;
}

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback(
    (productId: string, size: StudSize | null, qty = 1) => {
      const addBy = Math.max(1, Math.floor(qty));
      setItems((current) => {
        const idx = current.findIndex((i) => sameLine(i, productId, size));
        if (idx >= 0) {
          return current.map((i, n) =>
            n === idx ? { ...i, qty: i.qty + addBy } : i,
          );
        }
        return [...current, { productId, size, qty: addBy }];
      });
    },
    [],
  );

  const removeItem = useCallback(
    (productId: string, size: StudSize | null) => {
      setItems((current) =>
        current.filter((i) => !sameLine(i, productId, size)),
      );
    },
    [],
  );

  const updateQty = useCallback(
    (productId: string, size: StudSize | null, qty: number) => {
      setItems((current) => {
        if (qty <= 0) {
          return current.filter((i) => !sameLine(i, productId, size));
        }
        return current.map((i) =>
          sameLine(i, productId, size) ? { ...i, qty } : i,
        );
      });
    },
    [],
  );

  const clear = useCallback(() => setItems([]), []);

  const value: CartContextValue = {
    items: ready ? items : [],
    count: ready ? items.reduce((n, i) => n + i.qty, 0) : 0,
    addItem,
    removeItem,
    updateQty,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
