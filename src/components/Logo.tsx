"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/site";

type Props = {
  context?: "headerBar" | "headerHero" | "footer";
  className?: string;
};

function SakuraMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={`h-4 w-4 ${className}`}
      fill="currentColor"
    >
      <path d="M10 1.5c-1 2.3-2.8 4-5.1 4.8 2.3.8 4.1 2.5 5.1 4.8 1-2.3 2.8-4 5.1-4.8-2.3-.8-4.1-2.5-5.1-4.8Z" />
    </svg>
  );
}

export function Logo({ context = "headerBar", className = "" }: Props) {
  const accentClass =
    context === "footer"
      ? "text-sakura-light"
      : context === "headerHero"
        ? "text-sakura-light drop-shadow-[0_0_12px_rgba(255,183,197,0.45)]"
        : "text-sakura-light";

  const subClass = context === "footer" ? "text-washi/55" : "text-washi/70";

  return (
    <motion.span
      className={`inline-flex items-center gap-2.5 leading-none ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 520, damping: 32 }}
    >
      <SakuraMark className={accentClass} />
      <span className="inline-flex flex-col items-start">
        <span className={`text-[9px] font-medium uppercase tracking-[0.35em] ${subClass} sm:text-[10px]`}>
          Студия дизайна
        </span>
        <span
          className={`heading-display mt-0.5 text-lg font-semibold uppercase tracking-[0.22em] sm:text-xl ${accentClass}`}
        >
          {SITE.brand}
        </span>
      </span>
    </motion.span>
  );
}
