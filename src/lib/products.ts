import { productPhotos } from "./media";

export type Product = {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  hoverImage?: string;
  category: string;
  onSale?: boolean;
};

/** Названия и цены в ₽; картинки в `media.ts` → productPhotos */
const catalog: Omit<Product, "image" | "hoverImage">[] = [
  {
    id: "1",
    name: "ФУТБОЛКА | HUNTER'S INSTINCT (ИНСТИНКТ ОХОТНИКА)",
    price: 4074,
    category: "Футболки",
  },
  {
    id: "2",
    name: "ФУТБОЛКА | CURSED ASCENSION (ПРОКЛЯТОЕ ВОЗНЕСЕНИЕ)",
    price: 4473,
    category: "Футболки",
  },
  {
    id: "3",
    name: "ФУТБОЛКА | GOJO (ГОДЖО)",
    price: 3570,
    category: "Футболки",
  },
  {
    id: "4",
    name: "БОДИ | PAIN AWAKENING (ПРОБУЖДЕНИЕ БОЛИ)",
    price: 2994,
    category: "Боди",
  },
  {
    id: "5",
    name: "БОДИ SOMBRA X NIKIFILINI | T-TOPPA 1 (ТОП 1)",
    price: 3368,
    category: "Боди",
  },
  {
    id: "6",
    name: "ДЖИНСЫ | OPPAI DARK BLUE (БОЛЬШАЯ СИЛА, ТЕМНО-СИНИЙ)",
    price: 6925,
    category: "Джинсы",
  },
];

function attachPhotos(p: (typeof catalog)[number]): Product {
  const photos = productPhotos[p.id];
  if (!photos) {
    throw new Error(`productPhotos missing id "${p.id}" — добавьте в src/lib/media.ts`);
  }
  return {
    ...p,
    image: photos.image,
    hoverImage: photos.hoverImage,
  };
}

export const products: Product[] = catalog.map(attachPhotos);

export function formatPrice(n: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export const saleProducts = products.filter(
  (p) => p.onSale || (p.compareAtPrice && p.compareAtPrice > p.price),
);
