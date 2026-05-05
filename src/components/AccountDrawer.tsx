"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { SITE } from "@/lib/site";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AccountDrawer({ open, onClose }: Props) {
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
            aria-label="Закрыть"
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
            aria-labelledby="account-title"
          >
            <div className="flex items-center justify-between border-b border-violet-muted/25 px-6 py-5">
              <h2 id="account-title" className="text-xs font-semibold uppercase tracking-[0.28em] text-white">
                Личный кабинет
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-lime-brand"
              >
                Закрыть
              </button>
            </div>

            <div className="flex flex-1 flex-col px-6 py-10">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="space-y-6"
              >
                <p className="text-sm font-light leading-relaxed text-white/70">
                  Авторизация и история заказов скоро появятся здесь. Пока можно уточнить заказ по
                  телефону или в сообщении — мы на связи.
                </p>
                <div className="rounded-xl border border-violet-muted/30 bg-violet-muted/10 px-5 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-lime-brand">
                    {SITE.brand}
                  </p>
                  <p className="mt-3 font-mono text-sm text-white">{SITE.phoneDisplay}</p>
                  <p className="mt-2 text-xs font-light text-white/55">{SITE.addressDisplay}</p>
                </div>
                <Link
                  href="/#collection"
                  onClick={onClose}
                  className="inline-flex min-h-11 items-center justify-center bg-lime-brand px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-[filter] hover:brightness-105"
                >
                  В каталог
                </Link>
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
