/** Локальные изображения — всегда загружаются, без внешних ссылок */

export const heroSlides = [
  {
    src: "/images/hero.svg",
    alt: "Студия дизайна ALISA — оформление профилей",
    objectPosition: "object-center",
  },
] as const;

export const servicePhotos: Record<string, string> = {
  "1": "/images/1.png",
  "2": "/images/2.png",
  "3": "/images/3.png",
  "4": "/images/4.png",
};

export const productPhotos: Record<string, string> = {
  "1": "/images/5.png",
  "2": "/images/6.png",
  "3": "/images/7.png",
  "4": "/images/8.png",
};
