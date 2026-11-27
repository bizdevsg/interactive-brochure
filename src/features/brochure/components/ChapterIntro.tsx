import type { ReactNode } from "react";
import { motion } from "motion/react";
import { TriangleAlert } from "lucide-react";
import { enter } from "./enter";

/**
 * Pembuka slide bab: label, judul, dan deskripsi.
 * Animasinya mengikuti state "hidden"/"shown" dari elemen motion di atasnya.
 */
export function ChapterIntro({
  label,
  lead,
  highlight,
  description,
  stacked = false,
}: {
  label: string;
  lead: string;
  highlight: string;
  description: string;
  /** true: bagian emas selalu di baris sendiri; false: mengalir mengikuti lebar */
  stacked?: boolean;
}) {
  return (
    <>
      <motion.div
        {...enter({ x: -40 }, 0.05)}
        className="flex items-center gap-2.5 text-xs font-bold tracking-wide text-gold"
      >
        <span aria-hidden className="h-0.5 w-3 bg-gold" />
        {label}
      </motion.div>

      <h1 className="mt-3 text-[clamp(1.7rem,8.4vw,2.15rem)] font-bold leading-[1.15]">
        {stacked ? (
          <>
            <motion.span {...enter({ x: -80 }, 0.15)} className="block">
              {lead}
            </motion.span>
            <motion.span
              {...enter({ x: 80 }, 0.25)}
              className="block text-gold"
            >
              {highlight}
            </motion.span>
          </>
        ) : (
          <motion.span {...enter({ x: -80 }, 0.15)} className="block">
            {lead} <span className="text-gold">{highlight}</span>
          </motion.span>
        )}
      </h1>

      <motion.p
        {...enter({ y: 20 }, 0.35)}
        className="mt-4 text-base leading-relaxed text-muted"
      >
        {description}
      </motion.p>
    </>
  );
}

/** Kotak catatan dengan ikon peringatan di bawah slide. */
export function ChapterNote({
  delay,
  children,
}: {
  delay: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      {...enter({ y: 30 }, delay)}
      className="mt-4 flex gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-[13px] leading-relaxed text-muted"
    >
      <TriangleAlert aria-hidden className="size-5 shrink-0 text-gold" />
      <p>{children}</p>
    </motion.div>
  );
}
