"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

const nav = [
  { href: "/#about", label: "О студии" },
  { href: "/#services", label: "Услуги" },
  { href: "/#products", label: "Товары" },
  { href: "/#contacts", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-400 ${
        solid
          ? "border-b border-sakura/30 bg-plum-deep/92 backdrop-blur-xl shadow-plum"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${SITE.fullName} — главная`}
          className={`relative z-[60] ${solid ? "text-washi" : "text-washi drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]"}`}
        >
          <Logo context={solid ? "headerBar" : "headerHero"} />
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
          aria-label="Основное меню"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-[0.18em] text-washi/90 transition-colors hover:text-sakura-light"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="relative z-[60] flex h-10 w-10 items-center justify-center text-washi lg:hidden"
          aria-expanded={mobileOpen}
          aria-label="Меню"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
              className="block h-px w-5 origin-center bg-washi"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              className="block h-px w-5 bg-washi"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
              className="block h-px w-5 origin-center bg-washi"
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-sakura/25 bg-plum-deep lg:hidden"
          >
            <nav className="flex flex-col px-4 py-6" aria-label="Мобильное меню">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-sakura/20 py-4 text-xs font-medium uppercase tracking-[0.22em] text-washi transition-colors hover:text-sakura-light"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
