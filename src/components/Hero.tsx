"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/lib/media";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const heroVisibleRef = useRef(false);
  const [index, setIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const slideCount = heroSlides.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + slideCount) % slideCount);
    },
    [slideCount],
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        heroVisibleRef.current = entry.intersectionRatio > 0.3;
      },
      { threshold: [0, 0.15, 0.3, 0.6, 1] },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!heroVisibleRef.current) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const dx = pointerStartX.current - e.clientX;
    pointerStartX.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    if (dx > 56) go(1);
    else if (dx < -56) go(-1);
  };

  const onPointerCancel = () => {
    pointerStartX.current = null;
  };

  return (
    <section
      ref={ref}
      className="relative -mt-16 min-h-[85vh] w-full overflow-hidden pt-16 sm:min-h-[90vh]"
      aria-roledescription={slideCount > 1 ? "carousel" : undefined}
      aria-label={
        slideCount > 1 ? "Главный баннер, листание фото" : "Главный баннер"
      }
    >
      <motion.div style={{ scale }} className="absolute inset-0 z-[1] overflow-hidden touch-pan-y">
        <motion.div
          className={`flex h-full ${slideCount > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
          animate={{ x: `calc(-${index} * 100vw)` }}
          transition={{ type: "spring", stiffness: 260, damping: 36, mass: 0.82 }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          {heroSlides.map((slide, i) => (
            <div
              key={slide.src}
              className="relative h-full w-screen max-w-[100vw] flex-shrink-0 select-none"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                sizes="100vw"
                draggable={false}
                className={`pointer-events-none object-cover ${slide.objectPosition}`}
              />
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-br from-violet-deep/85 via-ink/55 to-ink/90"
        aria-hidden
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 z-[2] h-72 w-72 rounded-full bg-lime-brand/15 blur-[100px]"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {slideCount > 1 && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[15] flex -translate-y-1/2 justify-between px-2 sm:px-4">
            <motion.button
              type="button"
              aria-label="Предыдущий слайд"
              className="pointer-events-auto flex h-11 w-11 items-center justify-center border border-white/25 bg-ink/40 text-white backdrop-blur-md transition-colors hover:border-lime-brand/60 hover:text-lime-brand sm:h-12 sm:w-12"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => go(-1)}
            >
              <Chevron direction="left" />
            </motion.button>
            <motion.button
              type="button"
              aria-label="Следующий слайд"
              className="pointer-events-auto flex h-11 w-11 items-center justify-center border border-white/25 bg-ink/40 text-white backdrop-blur-md transition-colors hover:border-lime-brand/60 hover:text-lime-brand sm:h-12 sm:w-12"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => go(1)}
            >
              <Chevron direction="right" />
            </motion.button>
          </div>

          <div
            className="absolute bottom-[calc(14rem+env(safe-area-inset-bottom))] left-1/2 z-[15] flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-[calc(15rem+env(safe-area-inset-bottom))]"
            role="tablist"
            aria-label="Выбор слайда"
          >
            <div className="flex gap-2 rounded-full border border-white/15 bg-ink/35 px-3 py-2 backdrop-blur-md">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Слайд ${i + 1} из ${heroSlides.length}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-lime-brand" : "w-2 bg-white/35 hover:bg-white/55"
                  }`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45"
              aria-live="polite"
            >
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(heroSlides.length).padStart(2, "0")}
            </p>
          </div>
        </>
      )}

      <motion.div
        style={{ y }}
        className="relative z-10 flex min-h-[85vh] flex-col justify-end px-4 pb-16 pt-32 sm:min-h-[90vh] sm:px-6 sm:pb-24 lg:px-10"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.42em] text-lime-brand/95"
          >
            SS / Коллекция
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl text-4xl font-bold uppercase leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Чистая форма
            <br />
            <span className="text-white/92">и характер</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="mt-6 max-w-lg text-sm font-light leading-relaxed text-white/70 md:text-base"
          >
            Редакционный крой и спокойные пропорции — вещи на каждый день без лишнего шума.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="mt-11 flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/#collection"
                className="inline-flex min-h-12 items-center justify-center bg-lime-brand px-11 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink shadow-lime transition-[filter] hover:brightness-105"
              >
                Смотреть каталог
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/sale"
                className="inline-flex min-h-12 items-center justify-center border border-white/35 bg-white/5 px-11 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:border-lime-brand/70 hover:text-lime-brand"
              >
                Sale
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  const d = direction === "left";
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={d ? "" : "rotate-180"}
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
