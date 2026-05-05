"use client";

import { motion } from "framer-motion";

type Props = {
  /** В шапке над героем mix-blend может искажать цвета — слегка другая интенсивность */
  context?: "headerBar" | "headerHero" | "footer";
  className?: string;
};

/**
 * Дизайнерский локап: читается как ALISAFILINI — ALISA (лёгкий ритм) + FILINI (акцент).
 */
export function Logo({ context = "headerBar", className = "" }: Props) {
  const filiniClass =
    context === "footer"
      ? "text-lime-brand"
      : context === "headerHero"
        ? "text-lime-brand drop-shadow-[0_0_12px_rgba(219,255,77,0.35)]"
        : "text-lime-brand";

  return (
    <motion.span
      className={`inline-flex items-baseline gap-0 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 520, damping: 32 }}
    >
      <span className="font-extralight uppercase tracking-[0.42em] text-[11px] sm:text-xs">
        ALISA
      </span>
      <span
        className={`relative ml-[1px] pb-1 font-semibold uppercase tracking-[0.22em] text-[13px] sm:text-sm ${filiniClass}`}
      >
        <span className="absolute -bottom-1 left-0 right-0 mx-auto h-px max-w-[92%] bg-violet-glow/55 sm:-bottom-1.5" />
        FILINI
      </span>
    </motion.span>
  );
}
