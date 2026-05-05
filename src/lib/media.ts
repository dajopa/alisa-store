/**
 * Медиа сайта: баннер и фото товаров (nikifilini).
 * Для второго кадра карточки (hover) указана та же ссылка — добавьте отдельный ракурс при желании.
 */

const BANNER =
  "https://nikifilini.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2026/04/category-ubit-billa-2048x1366.jpg.webp";

export const heroSlides = [
  {
    src: BANNER,
    alt: "Баннер — распродажа",
    objectPosition: "object-[center_center]",
  },
] as const;

export const productPhotos: Record<
  string,
  { image: string; hoverImage: string }
> = {
  "1": {
    image:
      "https://nikifilini.com/wp-content/uploads/2026/04/mokap-veshhejayvtsj-1.jpg",
    hoverImage:
      "https://nikifilini.com/wp-content/uploads/2026/04/mokap-veshhejayvtsj-1.jpg",
  },
  "2": {
    image:
      "https://nikifilini.com/wp-content/uploads/2026/04/tishka-var-spina-1.jpg",
    hoverImage:
      "https://nikifilini.com/wp-content/uploads/2026/04/tishka-var-spina-1.jpg",
  },
  "3": {
    image:
      "https://nikifilini.com/wp-content/uploads/2026/04/mokap-veshhejwd-1.jpg",
    hoverImage:
      "https://nikifilini.com/wp-content/uploads/2026/04/mokap-veshhejwd-1.jpg",
  },
  "4": {
    image:
      "https://nikifilini.com/wp-content/uploads/2026/02/pered-bodi-1.jpg",
    hoverImage:
      "https://nikifilini.com/wp-content/uploads/2026/02/pered-bodi-1.jpg",
  },
  "5": {
    image:
      "https://nikifilini.com/wp-content/uploads/2025/07/t-body-SMBR-X-NF-_-T-TOPPA-1-2-1.jpg",
    hoverImage:
      "https://nikifilini.com/wp-content/uploads/2025/07/t-body-SMBR-X-NF-_-T-TOPPA-1-2-1.jpg",
  },
  "6": {
    image:
      "https://nikifilini.com/wp-content/uploads/2025/11/dzhinsy-p-2.jpg",
    hoverImage:
      "https://nikifilini.com/wp-content/uploads/2025/11/dzhinsy-p-2.jpg",
  },
};
