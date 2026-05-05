"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { ProductGrid } from "./ProductGrid";
import { ProductSkeletonGrid } from "./ProductSkeletonGrid";

type SortKey = "popular" | "price-asc" | "price-desc";

type Props = {
  initialProducts: Product[];
};

export function SaleToolbar({ initialProducts }: Props) {
  const categories = useMemo(() => {
    const set = new Set(initialProducts.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [initialProducts]);

  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const filtered = useMemo(() => {
    const list =
      category === "all"
        ? [...initialProducts]
        : initialProducts.filter((p) => p.category === category);

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => Number(a.id) - Number(b.id));

    return list;
  }, [initialProducts, category, sort]);

  function applyChange(fn: () => void) {
    setPending(true);
    fn();
    window.setTimeout(() => setPending(false), 380);
  }

  return (
    <div className="lg:flex lg:gap-14 xl:gap-20">
      <aside className="mb-10 lg:mb-0 lg:w-52 lg:flex-shrink-0 xl:w-56">
        <motion.button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          className="flex w-full items-center justify-between border-b border-violet-muted/25 py-3 text-left lg:hidden"
          aria-expanded={filtersOpen}
          whileTap={{ scale: 0.99 }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink">
            Фильтры
          </span>
          <motion.span animate={{ rotate: filtersOpen ? 180 : 0 }} className="text-lime-brand">
            ▾
          </motion.span>
        </motion.button>

        <div className="hidden lg:block">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-muted">
            Категория
          </p>
          <ul className="space-y-3">
            {categories.map((c) => (
              <li key={c}>
                <motion.button
                  type="button"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  onClick={() => applyChange(() => setCategory(c))}
                  className={`text-left text-sm font-light tracking-wide transition-colors ${
                    category === c ? "font-medium text-violet-muted" : "text-neutral-600 hover:text-ink"
                  }`}
                >
                  {c === "all" ? "Все" : c}
                </motion.button>
              </li>
            ))}
          </ul>
        </div>

        <AnimatePresence initial={false}>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="space-y-3 border-b border-violet-muted/20 py-6">
                {categories.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => {
                        applyChange(() => setCategory(c));
                        setFiltersOpen(false);
                      }}
                      className={`text-left text-sm font-light tracking-wide ${
                        category === c ? "font-medium text-violet-muted" : "text-neutral-600"
                      }`}
                    >
                      {c === "all" ? "Все" : c}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-light text-neutral-600">
            {filtered.length}{" "}
            {filtered.length === 1 ? "позиция" : filtered.length < 5 ? "позиции" : "позиций"}
          </p>
          <label className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-muted">
              Сортировка
            </span>
            <select
              value={sort}
              onChange={(e) => applyChange(() => setSort(e.target.value as SortKey))}
              className="min-h-11 cursor-pointer border border-violet-muted/35 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-ink outline-none transition-colors focus:border-lime-brand focus:ring-1 focus:ring-lime-brand"
            >
              <option value="popular">Популярность</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
            </select>
          </label>
        </div>

        <AnimatePresence mode="wait">
          {pending ? (
            <motion.div
              key="sk"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProductSkeletonGrid />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProductGrid products={filtered} emphasizeDiscount />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
