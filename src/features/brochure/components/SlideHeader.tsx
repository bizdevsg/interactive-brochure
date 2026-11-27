import { Image } from "@/components/ui/Image";
import { AnimatePresence, motion } from "motion/react";
import { SLIDES, CONTENT_SLIDE_COUNT, chapterNumber } from "../data/slides";
import { SlideProgress } from "./SlideProgress";
import { useBrochure } from "./BrochureContext";
import { TriangleExclamationPoint } from "lucide-react";

const pad = (n: number) => String(n).padStart(2, "0");

export function SlideNumber({
  index,
  direction,
}: {
  index: number;
  direction: number;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-7 top-0 isolate flex h-[10rem] select-none text-[10rem] font-black italic leading-none text-gold/[0.2]"
    >
      {pad(index)
        .split("")
        .map((digit, position) => (
          <span
            key={position}
            // Lebar mengikuti angka Calibri (±0,51em) agar kedua digit rapat
            className="relative block h-full w-[0.52em] [clip-path:inset(0_-0.18em)]"
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.span
                key={digit}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ y: d > 0 ? "100%" : "-100%" }),
                  center: { y: 0 },
                  exit: (d: number) => ({ y: d > 0 ? "-100%" : "100%" }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 block text-center"
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </span>
        ))}

      {/* Overlay di depan angka: memudar ke hitam di bagian bawah agar judul tetap terbaca */}
      <div className="absolute inset-x-[-0.2em] inset-y-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black" />
    </div>
  );
}

export function SlideHeader({ index }: { index: number }) {
  const { openRisk } = useBrochure();
  return (
    <header className="relative px-5 pt-[calc(1.25rem+var(--safe-top))]">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/Logo SG-WEB111.webp"
            alt=""
            width={103}
            height={180}
            className="h-9 w-auto"
            priority
          />
          <span className="text-xl font-bold tracking-[0.3em]">Solid</span>
        </div>
        <button
          type="button"
          onClick={openRisk}
          className="flex items-center gap-1 rounded-full border border-gold/40 bg-ink/60 px-3 py-3 text-xs font-bold text-red-500"
        >
          <TriangleExclamationPoint className="h-4" />
          <span>Risiko</span>
        </button>
      </div>
      {/* <p className="relative mt-4 text-xs font-bold uppercase tracking-[0.2em] text-muted">
        {pad(chapterNumber(index))} / {CONTENT_SLIDE_COUNT} ·{" "}
        {SLIDES[index].category}
      </p>
      <div className="relative mt-3">
        <SlideProgress index={chapterNumber(index)} />
      </div> */}
    </header>
  );
}
