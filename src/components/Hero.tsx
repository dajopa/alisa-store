"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { heroSlides } from "@/lib/media";
import { SITE } from "@/lib/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const slide = heroSlides[0];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative -mt-16 min-h-[85vh] w-full overflow-hidden pt-16 sm:min-h-[88vh]"
      aria-label="Главный экран"
    >
      <motion.div style={{ scale }} className="absolute inset-0 z-[1] overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority
            sizes="100vw"
            className={`object-cover object-center ${slide.objectPosition}`}
          />
        </div>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-br from-plum-deep/75 via-plum/50 to-ink/80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,183,197,0.2),transparent_60%)]"
        aria-hidden
      />

      <motion.div
        style={{ y }}
        className="relative z-10 flex min-h-[85vh] flex-col justify-center px-4 pt-24 sm:min-h-[88vh] sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.42em] text-sakura-light"
          >
            Добро пожаловать
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="heading-display max-w-3xl text-4xl font-semibold leading-tight text-washi sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {SITE.fullName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 max-w-xl text-base font-light leading-relaxed text-washi/80 md:text-lg"
          >
            {SITE.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/#services"
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-sakura px-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-plum-deep shadow-sakura transition-[filter] hover:brightness-105"
            >
              Наши услуги
            </Link>
            <Link
              href={SITE.orderTelegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-sakura-light/50 bg-washi/10 px-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-washi backdrop-blur-sm transition-colors hover:border-sakura hover:text-sakura-light"
            >
              Заказать дизайн
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
