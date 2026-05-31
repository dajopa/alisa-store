"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Service } from "@/lib/services";
import { formatPrice } from "@/lib/services";

type Props = {
  service: Service;
  index?: number;
};

export function ServiceCard({ service, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{
        duration: 0.52,
        delay: Math.min(index * 0.08, 0.32),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="card-sakura group"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-washi-dark">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-deep/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="border-t border-sakura/15 p-5 sm:p-6">
        <h3 className="heading-display text-xl font-semibold text-plum-deep">{service.name}</h3>
        <p className="mt-2 text-sm font-light leading-relaxed text-muted">{service.description}</p>
        <p className="mt-4 text-lg font-semibold text-sakura-deep">
          Стоимость: {formatPrice(service.price)}
        </p>
      </div>
    </motion.article>
  );
}
