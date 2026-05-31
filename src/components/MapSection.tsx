import { SITE } from "@/lib/site";

export function MapSection() {
  return (
    <div className="card-sakura overflow-hidden shadow-none">
      <iframe
        src={SITE.mapEmbedUrl}
        title={`Карта — ${SITE.fullName}`}
        className="h-[360px] w-full sm:h-[420px]"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
