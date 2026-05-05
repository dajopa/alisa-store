"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/products";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SearchOverlay({ open, onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 120);
      setQ("");
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products.slice(0, 6);
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s),
    );
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-ink/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          role="dialog"
          aria-modal="true"
          aria-label="Поиск"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Закрыть поиск"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-24 w-full max-w-2xl px-4 sm:mt-28 sm:px-6"
          >
            <div className="relative border border-violet-muted/60 bg-white/5 px-4 py-3 backdrop-blur-xl transition-colors focus-within:border-lime-brand focus-within:shadow-[0_0_0_1px_rgba(216,255,74,0.35)]">
              <label className="sr-only" htmlFor="site-search">
                Поиск по каталогу
              </label>
              <input
                ref={inputRef}
                id="site-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Название или категория…"
                className="w-full bg-transparent text-sm font-light tracking-wide text-white placeholder:text-white/35 outline-none"
              />
            </div>

            <motion.ul
              layout
              className="relative mt-8 space-y-2"
              role="listbox"
              aria-label="Результаты"
            >
              {results.map((p, i) => (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 * Math.min(i, 8),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href="/#collection"
                    onClick={onClose}
                    className="flex items-center gap-4 rounded-lg border border-transparent px-3 py-2 transition-colors hover:border-violet-muted/40 hover:bg-white/5"
                  >
                    <div className="relative h-14 w-11 flex-shrink-0 overflow-hidden bg-white/10">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        {p.name}
                      </p>
                      <p className="text-xs font-light text-lime-brand/90">
                        {formatPrice(p.price)}
                      </p>
                    </div>
                  </Link>
                </motion.li>
              ))}
              {results.length === 0 && (
                <li className="py-8 text-center text-sm text-white/45">
                  Ничего не найдено
                </li>
              )}
            </motion.ul>

            <button
              type="button"
              onClick={onClose}
              className="relative mx-auto mt-12 block text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55 transition-colors hover:text-lime-brand"
            >
              Закрыть
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
