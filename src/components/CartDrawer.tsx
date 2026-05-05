"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import { SITE } from "@/lib/site";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: Props) {
  const { lines, removeLine, decQty, addItem, totalQty, formatSubtotal } =
    useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Закрыть корзину"
            className="fixed inset-0 z-[75] bg-ink/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed bottom-0 right-0 top-0 z-[76] flex w-full max-w-md flex-col border-l border-violet-muted/35 bg-ink shadow-[ -24px_0_48px_rgba(46,16,101,0.25)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="flex items-center justify-between border-b border-violet-muted/25 px-6 py-5">
              <h2 id="cart-title" className="text-xs font-semibold uppercase tracking-[0.28em] text-white">
                Корзина
                {totalQty > 0 && (
                  <span className="ml-2 text-lime-brand">({totalQty})</span>
                )}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-lime-brand"
              >
                Закрыть
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden">
              {lines.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center"
                >
                  <p className="text-sm font-light text-white/55">Корзина пуста</p>
                  <Link
                    href="/#collection"
                    onClick={onClose}
                    className="mt-8 inline-flex min-h-11 items-center bg-lime-brand px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink hover:brightness-105"
                  >
                    К покупкам
                  </Link>
                </motion.div>
              ) : (
                <ul className="flex-1 overflow-y-auto px-4 py-4">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.product.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden border-b border-violet-muted/20 py-4 last:border-0"
                      >
                        <div className="flex gap-4">
                          <div className="relative h-[88px] w-[68px] flex-shrink-0 overflow-hidden bg-white/10">
                            <Image
                              src={line.product.image}
                              alt={line.product.name}
                              fill
                              sizes="68px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-white">
                              {line.product.name}
                            </p>
                            <p className="mt-1 text-xs text-lime-brand/90">
                              {formatPrice(line.product.price)}
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-3">
                              <div className="flex items-center gap-2 border border-violet-muted/35">
                                <button
                                  type="button"
                                  aria-label="Меньше"
                                  className="px-2 py-1 text-sm text-white/80 transition-colors hover:bg-violet-muted/20 hover:text-lime-brand"
                                  onClick={() => decQty(line.product.id)}
                                >
                                  −
                                </button>
                                <span className="min-w-[1.25rem] text-center text-xs text-white">
                                  {line.qty}
                                </span>
                                <button
                                  type="button"
                                  aria-label="Больше"
                                  className="px-2 py-1 text-sm text-white/80 transition-colors hover:bg-violet-muted/20 hover:text-lime-brand"
                                  onClick={() => addItem(line.product)}
                                >
                                  +
                                </button>
                              </div>
                              <button
                                type="button"
                                className="text-[10px] uppercase tracking-[0.18em] text-white/35 underline-offset-4 hover:text-white/70 hover:underline"
                                onClick={() => removeLine(line.product.id)}
                              >
                                Удалить
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-violet-muted/25 bg-violet-muted/10 px-6 py-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    Итого
                  </span>
                  <span className="font-mono text-lg font-medium text-lime-brand">
                    {formatSubtotal}
                  </span>
                </div>
                <p className="mt-4 text-[11px] font-light leading-relaxed text-white/45">
                  Онлайн-оплата на сайте пока недоступна — заказ можно согласовать по телефону{" "}
                  <span className="font-mono text-white/65">{SITE.phoneDisplay}</span>
                  {" "}или адресу{" "}
                  <span className="text-white/65">{SITE.addressDisplay}</span>.
                </p>
                <Link
                  href="#contacts"
                  onClick={onClose}
                  className="mt-6 flex w-full min-h-12 items-center justify-center border border-lime-brand/60 bg-transparent text-[11px] font-semibold uppercase tracking-[0.18em] text-lime-brand transition-colors hover:bg-lime-brand hover:text-ink"
                >
                  Связаться для заказа
                </Link>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
