import { SITE } from "@/lib/site";
import { Logo } from "./Logo";
import { TelegramLinks } from "./TelegramLinks";

export function Footer() {
  return (
    <footer className="relative border-t border-sakura/25 bg-plum-deep text-washi">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-seigaiha opacity-40"
      />
      <div className="relative mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Logo context="footer" />
            <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-washi/60">
              {SITE.tagline}
            </p>
          </div>
          <div className="text-sm text-washi/75">
            <p>
              <a href={SITE.phoneHref} className="transition-colors hover:text-sakura-light">
                {SITE.phoneDisplay}
              </a>
            </p>
            <TelegramLinks
              className="mt-2"
              linkClassName="transition-colors hover:text-sakura-light"
            />
            <p className="mt-2">{SITE.addressDisplay}</p>
            <p className="mt-2 text-washi/50">{SITE.hours}</p>
          </div>
        </div>
        <p className="mt-10 border-t border-sakura/20 pt-8 text-center text-[11px] text-washi/40 sm:text-left">
          © {new Date().getFullYear()} {SITE.fullName}. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
