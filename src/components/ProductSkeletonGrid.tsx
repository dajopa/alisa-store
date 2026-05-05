"use client";

import { motion } from "framer-motion";

const cells = Array.from({ length: 6 });

export function ProductSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cells.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.4 }}
          animate={{
            opacity: [0.35, 0.85, 0.35],
            boxShadow: [
              "0 0 0 rgba(219,255,77,0)",
              "0 0 28px rgba(219,255,77,0.12)",
              "0 0 0 rgba(219,255,77,0)",
            ],
          }}
          transition={{
            duration: 1.45,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.06,
          }}
          className="space-y-4 rounded-sm bg-[var(--surface)]"
        >
          <div className="aspect-[3/4] bg-gradient-to-b from-violet-muted/25 to-violet-deep/10" />
          <div className="space-y-2 px-1 pb-4">
            <div className="h-3 w-2/3 bg-violet-muted/15" />
            <div className="h-3 w-1/3 bg-lime-brand/20" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
