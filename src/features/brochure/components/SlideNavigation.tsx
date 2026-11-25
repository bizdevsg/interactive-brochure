import { ArrowLeft, ArrowRight } from "lucide-react";
import { GoldButton } from "@/components/ui/GoldButton";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { SLIDES } from "../data/slides";
import { useBrochure } from "./BrochureContext";

/** Navigasi bawah untuk berpindah antarslide. */
export function SlideNavigation({
  prevLabel = "Prev",
  nextLabel = "Next",
}: {
  prevLabel?: string;
  nextLabel?: string;
}) {
  const { index, next, prev, goTo } = useBrochure();
  const isLast = index === SLIDES.length - 1;

  return (
    <nav
      aria-label="Navigasi slide"
      className="absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-ink via-ink via-80% to-transparent px-5 pb-3 pt-8"
    >
      <div className="grid grid-cols-2 gap-3">
        <OutlineButton
          className="!min-h-10 !px-4 !text-sm"
          onClick={prev}
          disabled={index === 0}
        >
          <ArrowLeft className="size-4" aria-hidden /> {prevLabel}
        </OutlineButton>
        <GoldButton
          className="!min-h-10 !px-4 !text-sm"
          onClick={isLast ? () => goTo(0) : next}
          aria-label={isLast ? "Kembali ke awal" : undefined}
        >
          {nextLabel} <ArrowRight className="size-4" aria-hidden />
        </GoldButton>
      </div>
      <p className="mt-2 text-center text-xs text-muted">
        Geser kiri/kanan untuk pindah bab
      </p>
    </nav>
  );
}
