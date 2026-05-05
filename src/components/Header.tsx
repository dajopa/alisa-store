"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";
import { AccountDrawer } from "./AccountDrawer";
import { CartDrawer } from "./CartDrawer";
import { SearchOverlay } from "./SearchOverlay";

const nav = [
  { href: "/", label: "Магазин" },
  { href: "/sale", label: "Sale" },
  { href: "/#collection", label: "Новое" },
  { href: "/#editorial", label: "Образ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const { totalQty } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const locked = searchOpen || accountOpen || cartOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen, accountOpen, cartOpen]);

  const solid = scrolled || mobileOpen;

  const navTone = solid
    ? "text-white/90 hover:text-lime-brand"
    : "text-white hover:text-lime-brand drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] lg:mix-blend-difference lg:drop-shadow-none";

  const logoTone = solid
    ? "text-white"
    : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] lg:mix-blend-difference lg:drop-shadow-none";

  const iconTone = solid
    ? "text-white hover:text-lime-brand"
    : "text-white hover:text-lime-brand drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] lg:mix-blend-difference lg:drop-shadow-none";

  const burgerBars = solid ? "bg-white" : "bg-white";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-400 ${
          solid
            ? "border-b border-violet-muted/40 bg-ink/92 backdrop-blur-xl shadow-violet"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:h-[4.25rem] sm:px-6 lg:px-10">
          <Link
            href="/"
            aria-label={`${SITE.brand} — главная`}
            className={`relative z-[60] ${logoTone}`}
          >
            <span className="isolate inline-flex mix-blend-normal lg:mix-blend-normal">
              <Logo context={solid ? "headerBar" : "headerHero"} />
            </span>
          </Link>

          <nav
            className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex ${navTone}`}
            aria-label="Основное меню"
          >
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.span
                  className={`relative text-xs font-medium uppercase tracking-[0.18em] ${
                    pathname === item.href ? "text-lime-brand" : ""
                  }`}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-2 left-0 right-0 h-px bg-lime-brand"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </motion.span>
              </Link>
            ))}
          </nav>

          <div className={`relative z-[60] flex items-center gap-3 sm:gap-5 ${iconTone}`}>
            <motion.button
              type="button"
              aria-label="Поиск"
              className="relative rounded-full p-2 transition-colors"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </motion.button>
            <motion.button
              type="button"
              aria-label="Личный кабинет"
              className="relative hidden rounded-full p-2 transition-colors sm:block"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setAccountOpen(true)}
            >
              <UserIcon />
            </motion.button>
            <motion.button
              type="button"
              aria-label="Корзина"
              className="relative rounded-full p-2 transition-colors"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCartOpen(true)}
            >
              <BagIcon />
              <AnimatePresence>
                {totalQty > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-lime-brand px-1 text-[10px] font-bold leading-none text-ink"
                  >
                    {totalQty > 99 ? "99+" : totalQty}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center lg:hidden"
              aria-expanded={mobileOpen}
              aria-label="Меню"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className="sr-only">Меню</span>
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={{
                    rotate: mobileOpen ? 45 : 0,
                    y: mobileOpen ? 6 : 0,
                  }}
                  className={`block h-px w-5 origin-center ${burgerBars}`}
                />
                <motion.span
                  animate={{ opacity: mobileOpen ? 0 : 1 }}
                  className={`block h-px w-5 ${burgerBars}`}
                />
                <motion.span
                  animate={{
                    rotate: mobileOpen ? -45 : 0,
                    y: mobileOpen ? -6 : 0,
                  }}
                  className={`block h-px w-5 origin-center ${burgerBars}`}
                />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-violet-muted/35 bg-ink lg:hidden"
            >
              <nav className="flex flex-col gap-0 px-4 py-6" aria-label="Мобильное меню">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      href={item.href}
                      className="block border-b border-violet-muted/25 py-4 text-xs font-medium uppercase tracking-[0.22em] text-white transition-colors hover:text-lime-brand"
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

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AccountDrawer open={accountOpen} onClose={() => setAccountOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M6 19c0-3.5 3-6 6-6s6 2.5 6 6" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <path d="M9 11V8a3 3 0 016 0v3" strokeLinecap="round" />
      <rect x="5" y="11" width="14" height="10" rx="1" />
    </svg>
  );
}
