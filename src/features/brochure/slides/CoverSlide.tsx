import { Image } from "@/components/ui/Image";
import { TriangleAlert } from "lucide-react";
import { useRef } from "react";
import { motion } from "motion/react";
import { chapterCardTitles, introContent as c } from "../data/content";
import { FIRST_CONTENT_INDEX, SLIDES } from "../data/slides";
import type { SlideId } from "../types/brochure";
import { useBrochure } from "../components/BrochureContext";
import { enter, useReplayOnView } from "../components/enter";

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
const CHAPTERS = SLIDES.slice(FIRST_CONTENT_INDEX);

export function CoverSlide() {
  const { goTo, openRisk } = useBrochure();

  // Animasi diputar setiap kali section ini kembali ke layar.
  const sectionRef = useRef<HTMLElement>(null);
  const shown = useReplayOnView(sectionRef);

  return (
    <motion.section
      ref={sectionRef}
      aria-label="Sampul"
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      className="relative isolate min-h-full overflow-hidden pb-36"
    >
      {/* Hero berada di belakang header dan judul, memudar ke hitam di tepinya */}
      {/* overflow-hidden: foto yang diperbesar saat animasi tidak melewati gradien tepi */}
      <div className="absolute inset-x-0 top-[calc(4.5rem+var(--safe-top))] -z-10 h-80 overflow-hidden">
        {/* Foto mengecil pelan ke ukuran asli; gradien tepinya tetap diam */}
        <motion.div
          {...enter({ scale: 1.15 }, 0.1, { duration: 1.6, ease: "easeOut" })}
          className="absolute inset-0"
        >
          <Image
            src="/images/banner-depan.webp"
            alt="Tampilan aplikasi Solid pada ponsel"
            fill
            priority
            className="object-cover object-[55%_50%]"
          />
        </motion.div>
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
      <motion.span
        aria-hidden
        {...enter({ x: 120 }, 0.5, { duration: 1.2, ease: "easeOut" })}
        className="pointer-events-none absolute right-0 top-0 -z-10 h-0.5 w-48 origin-right -rotate-[23deg] bg-linear-to-r from-transparent to-[#ffe08a]/70"
      />

      <header className="flex items-center justify-between px-6 pt-3">
        <motion.div
          {...enter({ x: -60 }, 0.25)}
          className="flex items-center gap-2"
        >
          <Image
            src="/images/Logo SG-WEB111.webp"
            alt="SGB"
            width={103}
            height={180}
            priority
            className="h-9 w-auto"
          />
          <span className="text-xl font-bold tracking-[0.3em]">Solid</span>
        </motion.div>

        <motion.div {...enter({ x: 60 }, 0.35)}>
          <button
            type="button"
            onClick={openRisk}
            className="flex min-h-9 items-center gap-2 rounded-full border border-danger/30 bg-[#1c0f0d]/90 px-3.5 text-xs font-bold text-red-500"
          >
            <TriangleAlert className="size-4" aria-hidden />
            Risiko
          </button>
        </motion.div>
      </header>

      <div className="px-6 pt-52">
        <motion.div
          {...enter({ x: -60 }, 0.5)}
          className="flex items-center gap-2.5 text-xs font-bold tracking-wide text-gold text-shadow-lg text-shadow-black"
        >
          - PANDUAN PEMULA
        </motion.div>

        <h1 className="mt-1 text-[clamp(1.7rem,8vw,2.15rem)] font-extrabold leading-[1.2] tracking-tight">
          <motion.span {...enter({ x: -120 }, 0.6)} className="block">
            {c.titleLead}
          </motion.span>
          <motion.span {...enter({ x: 120 }, 0.72)} className="block">
            {c.titleBreak} <span className="text-gold">{c.titleHighlight}</span>
          </motion.span>
        </h1>
        <motion.p
          {...enter({ y: 24 }, 0.88)}
          className="mt-4 text-[15px] leading-relaxed text-muted"
        >
          {c.description}
        </motion.p>
      </div>

      <ul
        aria-label={c.chaptersLabel}
        className="mt-3 grid grid-cols-2 gap-x-3.5 gap-y-5 px-6"
      >
        {CHAPTERS.map((slide, offset) => {
          const image = chapterImages[slide.id];
          const isLeft = offset % 2 === 0;
          // Kartu ganjil terakhir diletakkan di tengah
          const isCentered = isLeft && offset === CHAPTERS.length - 1;
          const from = isCentered
            ? { y: 40, scale: 0.8 }
            : { x: isLeft ? -90 : 90, scale: 0.9 };
          return (
            <li
              key={slide.id}
              className={
                isCentered ? "col-span-2 mx-auto w-[calc(50%-7px)]" : undefined
              }
              // Posisi zig-zag ada di <li>, animasi di dalamnya, agar transform tidak bertabrakan
              style={{
                transform: `translate(${cardShiftX[offset] ?? 0}px, ${isLeft ? LEFT_COLUMN_DROP : 0}px)`,
              }}
            >
              <motion.div
                {...enter(from, 1 + offset * 0.1, {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                })}
                className="h-full"
              >
                {/* Melayang di wadah tersendiri agar tidak bertabrakan dengan transform animasi masuk dan efek tekan.
                    Durasi dan titik mulai dibuat berbeda supaya kartu tidak bergerak serempak. */}
                <div
                  className="float-slow h-full"
                  style={{
                    animationDuration: `${3.6 + (offset % 3) * 0.5}s`,
                    animationDelay: `-${(offset * 1.3) % 4}s`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => goTo(FIRST_CONTENT_INDEX + offset)}
                    className="relative flex h-full min-h-[5.25rem] w-full flex-col items-start justify-center overflow-hidden rounded-2xl border border-gold bg-linear-to-b from-[#1f1805] to-[#0c0a05] py-2.5 pl-3.5 pr-[38%] text-left transition-transform active:scale-95"
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
                </div>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}
