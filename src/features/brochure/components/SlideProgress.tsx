import { cn } from "@/lib/cn";
import { CONTENT_SLIDE_COUNT } from "../data/slides";

/** Indikator progres 11 segmen untuk slide konten (indeks 1–11). */
export function SlideProgress({ index }: { index: number }) {
  return (
    <div
      role="progressbar"
      aria-label="Progres brosur"
      aria-valuemin={1}
      aria-valuemax={CONTENT_SLIDE_COUNT}
      aria-valuenow={index}
      className="flex gap-1.5"
    >
      {Array.from({ length: CONTENT_SLIDE_COUNT }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1 rounded-full transition-all duration-300",
            i + 1 === index ? "flex-[2] bg-gold" : i + 1 < index ? "flex-1 bg-gold/60" : "flex-1 bg-white/15",
          )}
        />
      ))}
    </div>
  );
}
