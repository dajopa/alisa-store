"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Компания",
    links: [
      { href: "/#editorial", label: "О нас" },
      { href: "/#collection", label: "Каталог" },
      { href: "/sale", label: "Sale" },
    ],
  },
  {
    title: "Сервис",
    links: [
      { href: "/#delivery", label: "Доставка" },
      { href: "/#delivery", label: "Возврат" },
      { href: "/#collection", label: "Уход за изделиями" },
    ],
  },
  {
    title: "Связь",
    links: [
      { href: "#contacts", label: "Контакты" },
      { href: "#contacts", label: "FAQ" },
      { href: "/#collection", label: "Шоурум" },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Footer() {
  return (
    <footer id="contacts" className="mt-24 bg-ink text-white">
      <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-22">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-24">
          <div className="grid gap-12 sm:grid-cols-3 lg:max-w-3xl">
            {columns.map((col, ci) => (
              <motion.div
                key={col.title}
                custom={ci}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
              >
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-lime-brand/85">
                  {col.title}
                </p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm font-light text-white/65 transition-colors hover:text-lime-brand"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            custom={4}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col justify-between border-t border-violet-muted/30 pt-12 lg:border-t-0 lg:pt-0"
          >
            <div>
              <div className="text-white">
                <Logo context="footer" />
              </div>
              <p className="mt-8 max-w-xs text-[11px] font-light uppercase tracking-[0.22em] text-violet-glow/90">
                Контакты
              </p>
              <p className="mt-4 font-mono text-sm text-white">{SITE.phoneDisplay}</p>
              <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-white/55">
                {SITE.addressDisplay}
              </p>
            </div>
            <div className="mt-12 lg:mt-16">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
                Соцсети
              </p>
              <div className="flex gap-6 text-white/70">
                <motion.a
                  href="#"
                  aria-label="Instagram"
                  whileHover={{ scale: 1.08, color: "#dbff4d" }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <InstagramIcon />
                </motion.a>
                <motion.a
                  href="#"
                  aria-label="Pinterest"
                  whileHover={{ scale: 1.08, color: "#dbff4d" }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <PinterestIcon />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-16 border-t border-violet-muted/25 pt-10 text-center text-[11px] font-light text-white/35 sm:text-left"
        >
          <span>
            © {new Date().getFullYear()} {SITE.brand}. Все права защищены.
          </span>
        </motion.div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8-.11-.78-.21-2.03.04-2.9.23-.99 1.47-6.29 1.47-6.29s-.38-.76-.38-1.88c0-1.76 1.02-3.07 2.29-3.07 1.08 0 1.6.81 1.6 1.78 0 1.08-.69 2.7-1.05 4.2-.3 1.26.63 2.28 1.87 2.28 2.24 0 3.96-2.36 3.96-5.77 0-3.02-2.17-5.13-5.27-5.13-3.59 0-5.7 2.69-5.7 5.47 0 1.08.42 2.24.94 2.87.1.12.12.23.09.36l-.34 1.37c-.05.22-.18.27-.41.16-1.54-.72-2.5-2.97-2.5-4.78 0-3.89 2.82-7.46 8.14-7.46 4.27 0 7.59 3.04 7.59 7.1 0 4.24-2.67 7.66-6.37 7.66-1.25 0-2.42-.65-2.82-1.42l-.77 2.93c-.28 1.08-1.04 2.43-1.55 3.26 1.17.36 2.41.56 3.71.56 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}
