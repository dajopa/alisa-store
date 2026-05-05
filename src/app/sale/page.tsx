import Link from "next/link";
import { SaleToolbar } from "@/components/SaleToolbar";
import { saleProducts } from "@/lib/products";

export default function SalePage() {
  return (
    <main className="mx-auto max-w-[1600px] px-4 pb-24 pt-28 sm:px-6 lg:px-10 lg:pb-32 lg:pt-32">
      <header className="mb-14 lg:mb-20">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.38em] text-violet-muted">
          Лимитированно
        </p>
        <h1 className="text-4xl font-bold uppercase tracking-tight text-ink sm:text-5xl md:text-6xl">
          Sale{" "}
          <span className="text-gradient-violet">
            −%
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-neutral-600">
          Сниженные цены на часть моделей. Указаны актуальные суммы — онлайн-оплата на сайте пока не
          подключена, заказ можно согласовать отдельно.
        </p>
      </header>

      {saleProducts.length === 0 ? (
        <div className="border border-violet-muted/20 bg-[var(--surface)] px-8 py-16 text-center">
          <p className="text-sm font-light text-neutral-600">
            Позиций со скидкой пока нет — загляните в основной каталог или добавьте цены «до» в
            данные товаров.
          </p>
          <Link
            href="/#collection"
            className="mt-8 inline-flex min-h-11 items-center bg-lime-brand px-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink hover:brightness-105"
          >
            В каталог
          </Link>
        </div>
      ) : (
        <SaleToolbar initialProducts={saleProducts} />
      )}
    </main>
  );
}
