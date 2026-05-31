import { servicePhotos } from "./media";
import { formatPrice } from "./products";

export type Service = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const catalog: Omit<Service, "image">[] = [
  {
    id: "1",
    name: "Дизайн аватарки",
    price: 1500,
    description:
      "Уникальная аватарка для YouTube, Twitch, VK, Telegram и Discord. Форматы под каждую платформу.",
  },
  {
    id: "2",
    name: "Главный баннер канала",
    price: 2500,
    description:
      "Шапка профиля / channel art с вашим стилем, логотипом и ключевым сообщением для зрителей.",
  },
  {
    id: "3",
    name: "Рекламные баннеры",
    price: 3500,
    description:
      "Набор из 3 рекламных баннеров для стримов, постов и промо — единый визуальный стиль.",
  },
  {
    id: "4",
    name: "Оформление профиля под ключ",
    price: 7500,
    description:
      "Полный комплект: аватарка, главный баннер, рекламные креативы и мини-гайд по использованию.",
  },
];

function attachPhoto(s: (typeof catalog)[number]): Service {
  const photo = servicePhotos[s.id];
  if (!photo) {
    throw new Error(`servicePhotos missing id "${s.id}" — добавьте в src/lib/media.ts`);
  }
  return { ...s, image: photo };
}

export const services: Service[] = catalog.map(attachPhoto);

export { formatPrice };
