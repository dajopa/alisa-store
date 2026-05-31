"use client";

import { motion } from "framer-motion";

type Props = {
  className?: string;
};

export function HeroSakuraArt({ className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 240 280" className="h-full w-full drop-shadow-[0_8px_32px_rgba(255,183,197,0.25)]">
        <defs>
          <linearGradient id="heroSakuraPetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd6e0" />
            <stop offset="100%" stopColor="#e8889e" />
          </linearGradient>
        </defs>
        <path
          d="M118 250 Q95 170 118 90 Q141 170 118 250"
          stroke="#6b3a48"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M118 210 Q155 150 185 125"
          stroke="#6b3a48"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M118 175 Q75 120 55 75"
          stroke="#6b3a48"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M118 195 Q145 165 165 145"
          stroke="#6b3a48"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <g fill="url(#heroSakuraPetal)" opacity="0.95">
          <circle cx="185" cy="125" r="18" />
          <circle cx="198" cy="115" r="14" />
          <circle cx="172" cy="115" r="14" />
          <circle cx="185" cy="108" r="12" />
        </g>
        <g fill="#ffcdd8" opacity="0.92">
          <circle cx="55" cy="75" r="16" />
          <circle cx="44" cy="68" r="12" />
          <circle cx="66" cy="68" r="12" />
        </g>
        <g fill="url(#heroSakuraPetal)" opacity="0.94">
          <circle cx="165" cy="145" r="15" />
          <circle cx="176" cy="137" r="11" />
          <circle cx="154" cy="137" r="11" />
        </g>
        <g fill="url(#heroSakuraPetal)">
          <circle cx="118" cy="155" r="26" />
          <circle cx="136" cy="142" r="20" />
          <circle cx="100" cy="142" r="20" />
          <circle cx="118" cy="130" r="18" />
          <circle cx="118" cy="172" r="18" />
          <circle cx="118" cy="155" r="7" fill="#fff8f5" opacity="0.8" />
        </g>
        <g fill="#ffb7c5" opacity="0.55">
          <ellipse cx="40" cy="200" rx="6" ry="4" transform="rotate(-25 40 200)" />
          <ellipse cx="200" cy="210" rx="5" ry="3" transform="rotate(15 200 210)" />
          <ellipse cx="175" cy="55" rx="5" ry="3" transform="rotate(40 175 55)" />
        </g>
      </svg>
    </motion.div>
  );
}
