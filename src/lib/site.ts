/** Контакты и информация о студии — правьте здесь */
export const SITE = {
  brand: "ALISA",
  fullName: "Студия дизайна ALISA",
  tagline: "Оформление профилей для YouTube, Twitch и других соцсетей",
  description:
    "Студия дизайна ALISA создаёт визуальный стиль для блогеров, стримеров и авторов контента. " +
    "Делаем аватарки, главные баннеры, рекламные креативы и полное оформление профиля под ключ. " +
    "Работаем с YouTube, Twitch, VK, Telegram, Discord и другими платформами.",
  phoneDisplay: "+7 (495) 123-45-67",
  phoneHref: "tel:+74951234567",
  addressDisplay: "г. Ярославль, ул. Автозаводская, 5/1",
  hours: "Пн–Пт 10:00–20:00, Сб 11:00–17:00",
  orderTelegramHref: "https://t.me/btwempty",
  telegram: [
    { label: "@btwblank", href: "https://t.me/btwblank" },
    { label: "@btwempty", href: "https://t.me/btwempty" },
  ],
  /** Виджет Яндекс.Карт */
  mapEmbedUrl:
    "https://yandex.ru/map-widget/v1/?ll=39.847885%2C57.641771&z=17&pt=39.847885%2C57.641771,pm2rdm",
} as const;
