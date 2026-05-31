import { AnimatedReveal } from "@/components/AnimatedReveal";
import { Hero } from "@/components/Hero";
import { MapSection } from "@/components/MapSection";
import { ProductGrid } from "@/components/ProductGrid";
import { ServiceGrid } from "@/components/ServiceGrid";
import { TelegramLinks } from "@/components/TelegramLinks";
import { products } from "@/lib/products";
import { services } from "@/lib/services";
import { SITE } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="relative bg-washi bg-washi-texture">
      {/* Название студии */}
      <Hero />

      {/* Информация о студии */}
      <section id="about" className="relative mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <AnimatedReveal>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-sakura-deep">
            О студии
          </p>
          <h2 className="heading-display text-3xl font-semibold text-plum-deep sm:text-4xl lg:text-5xl">
            {SITE.fullName}
          </h2>
          <p className="mt-6 max-w-3xl text-base font-light leading-relaxed text-muted sm:text-lg">
            {SITE.description}
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { label: "Опыт", value: "Более 200 оформленных профилей" },
              { label: "Платформы", value: "YouTube, Twitch, VK, Telegram, Discord" },
              { label: "Сроки", value: "От 1 до 3 рабочих дней на заказ" },
            ].map((item) => (
              <li key={item.label} className="card-sakura px-5 py-6 shadow-none">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sakura-deep">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-plum/90">{item.value}</p>
              </li>
            ))}
          </ul>
        </AnimatedReveal>
      </section>

      {/* Услуги */}
      <section
        id="services"
        className="relative border-y border-sakura/20 bg-washi-soft bg-seigaiha py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <AnimatedReveal className="mb-12">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-sakura-deep">
              Прайс
            </p>
            <h2 className="heading-display text-3xl font-semibold text-plum-deep sm:text-4xl lg:text-5xl">
              Наши услуги
            </h2>
            <p className="mt-4 max-w-2xl text-base font-light text-muted">
              Каждая услуга с фото и указанной стоимостью.
            </p>
          </AnimatedReveal>
          <ServiceGrid services={services} />
        </div>
      </section>

      {/* Товары */}
      <section id="products" className="relative mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <AnimatedReveal className="mb-12">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-sakura-deep">
            Готовые наборы
          </p>
          <h2 className="heading-display text-3xl font-semibold text-plum-deep sm:text-4xl lg:text-5xl">
            Товары и шаблоны
          </h2>
          <p className="mt-4 max-w-2xl text-base font-light text-muted">
            Готовые пакеты оформления — фото и цена указаны для каждого товара.
          </p>
        </AnimatedReveal>
        <ProductGrid products={products} />
      </section>

      {/* Адрес и карта */}
      <section
        id="contacts"
        className="relative border-t border-sakura/20 bg-washi-soft bg-seigaiha py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <AnimatedReveal className="mb-12">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-sakura-deep">
              Контакты
            </p>
            <h2 className="heading-display text-3xl font-semibold text-plum-deep sm:text-4xl lg:text-5xl">
              Как нас найти
            </h2>
          </AnimatedReveal>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-10">
            <div className="card-sakura flex flex-col justify-center p-8 shadow-none">
              <h3 className="heading-display text-xl font-semibold text-plum-deep">Адрес</h3>
              <p className="mt-4 text-lg text-plum/90">{SITE.addressDisplay}</p>
              <dl className="mt-8 space-y-5 border-t border-sakura/15 pt-6 text-sm">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sakura-deep">
                    Телефон
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={SITE.phoneHref}
                      className="text-plum/90 transition-colors hover:text-sakura-deep"
                    >
                      {SITE.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sakura-deep">
                    Telegram
                  </dt>
                  <dd className="mt-2">
                    <TelegramLinks linkClassName="text-plum/90 transition-colors hover:text-sakura-deep" />
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sakura-deep">
                    Часы работы
                  </dt>
                  <dd className="mt-2 text-plum/90">{SITE.hours}</dd>
                </div>
              </dl>
            </div>
            <MapSection />
          </div>
        </div>
      </section>
    </main>
  );
}
