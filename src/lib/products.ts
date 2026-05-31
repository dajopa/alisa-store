import { productPhotos } from "./media";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const catalog: Omit<Product, "image">[] = [
  {
    id: "1",
    name: "Набор «YouTube Start»",
    price: 990,
    description: "Готовые шаблоны аватарки и channel art для нового YouTube-канала.",
  },
  {
    id: "2",
    name: "Набор «Twitch Streamer»",
    price: 1290,
    description: "Аватар, офлайн-баннер, панели и заглушки для Twitch-канала.",
  },
  {
    id: "3",
    name: "Пакет «VK и Telegram»",
    price: 790,
    description: "Обложка, аватар и баннеры для сообщества VK и канала в Telegram.",
  },
  {
    id: "4",
    name: "Шаблоны баннеров (5 шт.)",
    price: 590,
    description: "Универсальные рекламные баннеры для постов, сторис и промо-акций.",
  },
];

function attachPhoto(p: (typeof catalog)[number]): Product {
  const photo = productPhotos[p.id];
  if (!photo) {
    throw new Error(`productPhotos missing id "${p.id}" — добавьте в src/lib/media.ts`);
  }
  return { ...p, image: photo };
}

export const products: Product[] = catalog.map(attachPhoto);

export function formatPrice(n: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}
