import { ArrowLeft, ArrowRight } from "lucide-react";
import { GoldButton } from "@/components/ui/GoldButton";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { SLIDES } from "../data/slides";
import { useBrochure } from "./BrochureContext";

/** Navigasi bawah untuk berpindah antarslide. */
export function SlideNavigation({
  prevLabel = "Kembali",
  nextLabel = "Lanjut",
  onPrev,
}: {
  prevLabel?: string;
  nextLabel?: string;
  /** Pengganti aksi tombol kiri; bila diisi, tombol tetap aktif di slide pertama */
  onPrev?: () => void;
}) {
  const { index, next, prev, goTo } = useBrochure();
  const isLast = index === SLIDES.length - 1;

  return (
    <nav
      aria-label="Navigasi slide"
      className="absolute inset-x-0 bottom-0 z-20 px-5 pb-3 pt-8"
    >
      <div className="grid grid-cols-2 gap-3">
        <OutlineButton
          className="!min-h-10 !px-4 !text-sm"
          onClick={onPrev ?? prev}
          disabled={!onPrev && index === 0}
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
