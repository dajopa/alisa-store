import type { Service } from "@/lib/services";
import { ServiceCard } from "./ServiceCard";

type Props = {
  services: Service[];
};

export function ServiceGrid({ services }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => (
        <ServiceCard key={s.id} service={s} index={i} />
      ))}
    </div>
  );
}
