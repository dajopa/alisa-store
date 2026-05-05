"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";

type Props = {
  product: Product;
  index?: number;
  emphasizeDiscount?: boolean;
};

export function ProductCard({ product, index = 0, emphasizeDiscount }: Props) {
  const [hovered, setHovered] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);
  const { addItem } = useCart();
  const hasAlt = Boolean(product.hoverImage);
  const showSale =
    product.onSale || (product.compareAtPrice && product.compareAtPrice > product.price);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAddedFlash(true);
    window.setTimeout(() => setAddedFlash(false), 1400);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{
        duration: 0.52,
        delay: Math.min(index * 0.055, 0.34),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="relative aspect-[3/4] overflow-hidden bg-[var(--surface)]"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        {showSale && (
          <span className="absolute left-3 top-3 z-10 bg-violet-deep/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-lime-brand backdrop-blur-sm">
            Sale
          </span>
        )}

        <motion.div
          className="relative h-full w-full"
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-500 ${
              hasAlt && hovered ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
          />
          {hasAlt && (
            <Image
              src={product.hoverImage!}
              alt=""
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
              className={`object-cover transition-opacity duration-500 ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              aria-hidden
            />
          )}
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-5"
          initial={false}
          animate={{ opacity: hovered || addedFlash ? 1 : 0, y: hovered || addedFlash ? 0 : 10 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            type="button"
            onClick={handleAdd}
            className="pointer-events-auto flex min-h-10 items-center justify-center bg-lime-brand px-9 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink shadow-lime hover:brightness-105"
            whileTap={{ scale: 0.97 }}
          >
            {addedFlash ? "Добавлено" : "В корзину"}
          </motion.button>
        </motion.div>
      </motion.div>

      <div className="mt-5 space-y-1.5">
        <h2 className="text-sm font-medium tracking-wide text-ink">{product.name}</h2>
        <div className="flex flex-wrap items-baseline gap-2">
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm font-light text-neutral-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
          <span
            className={`tracking-wide text-ink ${
              emphasizeDiscount && showSale ? "text-base font-semibold text-violet-muted" : "text-sm font-medium"
            }`}
          >
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
