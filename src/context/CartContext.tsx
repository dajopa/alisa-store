"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

export type CartLine = {
  product: Product;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  addItem: (product: Product) => void;
  removeLine: (productId: string) => void;
  decQty: (productId: string) => void;
  clear: () => void;
  totalQty: number;
  subtotal: number;
  formatSubtotal: string;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addItem = useCallback((product: Product) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.product.id === product.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return [...prev, { product, qty: 1 }];
    });
  }, []);

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== productId));
  }, []);

  const decQty = useCallback((productId: string) => {
    setLines((prev) =>
      prev
        .map((l) =>
          l.product.id === productId ? { ...l, qty: l.qty - 1 } : l,
        )
        .filter((l) => l.qty > 0),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { totalQty, subtotal } = useMemo(() => {
    let qty = 0;
    let sum = 0;
    for (const l of lines) {
      qty += l.qty;
      sum += l.product.price * l.qty;
    }
    return { totalQty: qty, subtotal: sum };
  }, [lines]);

  const value = useMemo(
    () => ({
      lines,
      addItem,
      removeLine,
      decQty,
      clear,
      totalQty,
      subtotal,
      formatSubtotal: formatPrice(subtotal),
    }),
    [lines, addItem, removeLine, decQty, clear, totalQty, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
