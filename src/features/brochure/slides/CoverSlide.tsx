import { Image } from "@/components/ui/Image";
import { TriangleAlert } from "lucide-react";
import { motion } from "motion/react";
import { chapterCardTitles, introContent as c } from "../data/content";
import { FIRST_CONTENT_INDEX, SLIDES } from "../data/slides";
import type { SlideId } from "../types/brochure";
import { useBrochure } from "../components/BrochureContext";
import { SlideNavigation } from "../components/SlideNavigation";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

/** Ilustrasi 3D per bab. */
const chapterImages: Partial<Record<SlideId, string>> = {
  ecosystem: "/images/icon-bab/1.webp",
  products: "/images/icon-bab/2.webp",
  simulation: "/images/icon-bab/3.webp",
  video: "/images/icon-bab/4.webp",
  testimonial: "/images/icon-bab/5.webp",
  cost: "/images/icon-bab/6.webp",
  risk: "/images/icon-bab/7.webp",
  quiz: "/images/icon-bab/8.webp",
  closing: "/images/icon-bab/9.webp",
};

/** Geseran horizontal (px) per kartu agar susunannya zig-zag. */
const cardShiftX = [5, 4, -3, -3, 6, 5, -1, -1, 4];
/** Kolom kiri diturunkan sejauh ini (px) dibanding kolom kanan. */
const LEFT_COLUMN_DROP = 24;

export function CoverSlide() {
  const { goTo, openRisk } = useBrochure();

  return (
    <div className="relative h-full bg-ink">
      <section
        aria-label="Sampul"
        className="relative isolate h-full overflow-y-auto overflow-x-hidden pb-36"
      >
        {/* Hero berada di belakang header dan judul, memudar ke hitam di tepinya */}
        <div className="absolute inset-x-0 top-[calc(4.5rem+var(--safe-top))] -z-10 h-80">
          <Image
            src="/images/banner-depan.webp"
            alt="Tampilan aplikasi Solid pada ponsel"
            fill
            priority
            className="object-cover object-[55%_50%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-b from-ink via-transparent via-20% to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-ink to-transparent"
          />
        </div>

        {/* Cahaya dan garis emas di pojok kanan atas */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-[radial-gradient(ellipse_60%_55%_at_90%_0%,rgb(240_177_0/0.3),transparent_75%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 -z-10 h-0.5 w-48 origin-right -rotate-[23deg] bg-linear-to-r from-transparent to-[#ffe08a]/70"
        />

        <header className="flex items-center justify-between px-6 pt-[calc(3.25rem+var(--safe-top))]">
          <div className="flex items-center gap-2">
            <Image
              src="/images/Logo SG-WEB111.webp"
              alt="SGB"
              width={103}
              height={180}
              priority
              className="h-9 w-auto"
            />
            <span className="text-xl font-bold tracking-[0.3em]">Solid</span>
          </div>

          <button
            type="button"
            onClick={openRisk}
            className="flex min-h-9 items-center gap-2 rounded-full border border-danger/30 bg-[#1c0f0d]/90 px-3.5 text-xs font-bold text-red-500"
          >
            <TriangleAlert className="size-4" aria-hidden />
            Risiko
          </button>
        </header>

        <motion.div {...rise(0.1)} className="px-6 pt-52">
          <div className="flex items-center gap-2.5 text-xs font-bold tracking-wide text-gold">
            <span aria-hidden className="h-px w-6 bg-gold" />
            PANDUAN PEMULA
          </div>

          <h1 className="mt-3 text-[clamp(1.7rem,8vw,2.15rem)] font-extrabold leading-[1.2] tracking-tight">
            {c.titleLead}
            <br />
            {c.titleBreak}{" "}
            <span className="text-gold">{c.titleHighlight}</span>
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            {c.description}
          </p>
        </motion.div>

        <motion.ul
          {...rise(0.2)}
          aria-label={c.chaptersLabel}
          className="mt-3 grid grid-cols-2 gap-x-3.5 gap-y-5 px-6"
        >
          {SLIDES.slice(FIRST_CONTENT_INDEX).map((slide, offset) => {
            const image = chapterImages[slide.id];
            const dropY = offset % 2 === 0 ? LEFT_COLUMN_DROP : 0;
            return (
              <li
                key={slide.id}
                style={{
                  transform: `translate(${cardShiftX[offset] ?? 0}px, ${dropY}px)`,
                }}
              >
                <button
                  type="button"
                  onClick={() => goTo(FIRST_CONTENT_INDEX + offset)}
                  className="relative flex h-full min-h-[5.25rem] w-full flex-col items-start justify-center overflow-hidden rounded-2xl border border-gold bg-linear-to-b from-[#1f1805] to-[#0c0a05] py-2.5 pl-3.5 pr-[38%] text-left"
                >
                  <span className="rounded-full bg-gold px-2 text-[10px] font-extrabold leading-4 text-black">
                    {String(offset + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-xs font-bold leading-[1.15] text-white">
                    {chapterCardTitles[slide.id] ?? slide.title}
                  </span>
                  {image && (
                    <Image
                      src={image}
                      alt=""
                      width={96}
                      height={96}
                      className="pointer-events-none absolute right-2 top-1/2 aspect-square w-[35%] -translate-y-1/2 object-contain"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </motion.ul>
      </section>

      <SlideNavigation prevLabel="Kembali" nextLabel="Lanjut" />
    </div>
  );
}
