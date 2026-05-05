import Link from "next/link";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <main className="bg-white">
      <Hero />

      <section id="collection" className="mx-auto max-w-[1600px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <AnimatedReveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-violet-muted">
              Каталог
            </p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-ink sm:text-4xl md:text-5xl">
              Коллекция{" "}
              <span className="text-gradient-violet">сезона</span>
            </h2>
          </div>
          <Link
            href="/sale"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-muted transition-colors hover:text-lime-brand"
          >
            Перейти в Sale
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </AnimatedReveal>
        <ProductGrid products={products} />
      </section>

      <section
        id="editorial"
        className="relative overflow-hidden border-y border-violet-muted/15 bg-violet-deep py-22 sm:py-28"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/4 rounded-full bg-lime-brand/20 blur-[90px]"
        />
        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <AnimatedReveal>
            <p className="mx-auto max-w-3xl text-center text-[11px] font-semibold uppercase tracking-[0.38em] text-lime-brand/90">
              Образ
            </p>
            <p className="mx-auto mt-8 max-w-2xl text-center text-lg font-light leading-relaxed text-white/80 sm:text-xl">
              Фактуры вместо украшений — вещи, которые остаются в гардеробе надолго.
            </p>
            <div className="mt-12 flex justify-center">
              <Link
                href="/#collection"
                className="inline-flex min-h-11 items-center border border-lime-brand/50 bg-transparent px-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-lime-brand transition-colors hover:bg-lime-brand hover:text-ink"
              >
                К коллекции
              </Link>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <section id="delivery" className="border-b border-neutral-200/80 bg-[var(--surface)] py-14">
        <div className="mx-auto flex max-w-[1600px] flex-wrap justify-center gap-10 px-4 text-center sm:gap-16 sm:px-6 lg:px-10">
          {[
            { t: "Доставка", d: "По городу и РФ — сроки при оформлении" },
            { t: "Примерка", d: "Подберём размер до отправки" },
            { t: "Поддержка", d: "Ответим до того, как вы нажмёте «купить»" },
          ].map((item) => (
            <div key={item.t} className="max-w-[220px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-muted">
                {item.t}
              </p>
              <p className="mt-3 text-sm font-light leading-relaxed text-neutral-600">{item.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
