import { SITE } from "@/lib/site";

type Props = {
  className?: string;
  linkClassName?: string;
};

export function TelegramLinks({ className = "", linkClassName = "" }: Props) {
  return (
    <div className={`flex flex-wrap gap-x-4 gap-y-1 ${className}`}>
      {SITE.telegram.map((tg) => (
        <a
          key={tg.href}
          href={tg.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {tg.label}
        </a>
      ))}
    </div>
  );
}
