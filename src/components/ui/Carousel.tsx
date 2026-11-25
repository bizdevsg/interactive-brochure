import { useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** Carousel scroll-snap: swipe horizontal native + tombol + dots. Menandai data-no-swipe agar tidak memindah slide. */
export function Carousel({ items, label }: { items: ReactNode[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const many = items.length > 1;

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const clamped = Math.min(Math.max(i, 0), items.length - 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: clamped * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section aria-roledescription="carousel" aria-label={label} data-no-swipe>
      <ul
        ref={track}
        onScroll={(e) => {
          const el = e.currentTarget;
          setActive(Math.round(el.scrollLeft / Math.max(el.clientWidth, 1)));
        }}
        className="scroll-hide flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
      >
        {items.map((item, i) => (
          <li
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} dari ${items.length}`}
            className="w-full shrink-0 snap-center"
          >
            {item}
          </li>
        ))}
      </ul>
      {many && (
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="flex min-h-11 items-center gap-1 pr-3 text-sm font-semibold text-gold disabled:text-muted disabled:opacity-60"
          >
            <ChevronLeft className="size-4" aria-hidden /> Sebelumnya
          </button>
          <div className="flex items-center gap-1.5" aria-hidden>
            {items.map((_, i) => (
              <span
                key={i}
                className={cn("h-2 rounded-full transition-all", i === active ? "w-6 bg-gold" : "w-2 bg-gold/35")}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === items.length - 1}
            className="flex min-h-11 items-center gap-1 pl-3 text-sm font-semibold text-gold disabled:text-muted disabled:opacity-60"
          >
            Berikutnya <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      )}
      <p className="sr-only" aria-live="polite">{`Slide ${active + 1} dari ${items.length}`}</p>
    </section>
  );
}
