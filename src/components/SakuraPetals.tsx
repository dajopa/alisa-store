"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";

type PetalConfig = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  sway: number;
  opacity: number;
  hue: string;
  rotate: number;
};

function SakuraPetalSvg({ hue }: { hue: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-full w-full drop-shadow-[0_1px_3px_rgba(196,92,122,0.35)]"
      fill="none"
    >
      <path
        d="M12 2.5c-1.2 2.8-3.4 4.8-6.2 5.8 2.8 1 5 3 6.2 5.8 1.2-2.8 3.4-4.8 6.2-5.8-2.8-1-5-3-6.2-5.8Z"
        fill={hue}
        opacity="0.92"
      />
      <path
        d="M12 22c-0.8-2-2.2-3.4-4-4.2 1.8-0.8 3.2-2.2 4-4.2 0.8 2 2.2 3.4 4 4.2-1.8 0.8-3.2 2.2-4 4.2Z"
        fill={hue}
        opacity="0.75"
      />
      <circle cx="12" cy="12" r="1.2" fill="#fff8f5" opacity="0.6" />
    </svg>
  );
}

function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function createPetals(count: number): PetalConfig[] {
  const hues = ["#ffb7c5", "#f4a7b9", "#ffcdd8", "#e8889e", "#ffd6e0"];
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: seeded(id + 1) * 100,
    size: 12 + seeded(id + 2) * 16,
    delay: seeded(id + 3) * 20,
    duration: 12 + seeded(id + 4) * 18,
    sway: (seeded(id + 5) - 0.5) * 140,
    opacity: 0.55 + seeded(id + 6) * 0.4,
    hue: hues[id % hues.length]!,
    rotate: seeded(id + 7) * 360,
  }));
}

export function SakuraPetals() {
  const petals = useMemo(() => createPetals(40), []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[40] overflow-hidden"
      aria-hidden
    >
      {petals.map((petal) => {
        const style: CSSProperties = {
          left: `${petal.left}%`,
          width: `${petal.size}px`,
          height: `${petal.size}px`,
          animationDuration: `${petal.duration}s`,
          animationDelay: `${petal.delay}s`,
          ["--sway" as string]: `${petal.sway}px`,
          ["--petal-opacity" as string]: String(petal.opacity),
          transform: `rotate(${petal.rotate}deg)`,
        };

        return (
          <span key={petal.id} className="sakura-petal" style={style}>
            <SakuraPetalSvg hue={petal.hue} />
          </span>
        );
      })}
    </div>
  );
}
