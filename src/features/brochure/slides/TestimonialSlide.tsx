import { useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, UserRound } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Image } from "@/components/ui/Image";
import { cn } from "@/lib/cn";
import { enter, useReplayOnView } from "../components/enter";
import { testimonialContent as c } from "../data/content";
import { slideMeta } from "../data/slides";

const SWITCH_SECONDS = 0.7;

type Slot = "front" | "right" | "left" | "hidden";

/** Posisi kartu: satu di depan, satu mengintip di kanan, satu di kiri (x relatif lebar kartu). */
const slotPose: Record<
  Slot,
  { x: string; y: number; scale: number; rotate: number; opacity: number }
> = {
  front: { x: "0%", y: 0, scale: 1, rotate: 0, opacity: 1 },
  right: { x: "54%", y: 10, scale: 0.86, rotate: 7, opacity: 1 },
  left: { x: "-54%", y: 10, scale: 0.86, rotate: -7, opacity: 1 },
  hidden: { x: "0%", y: 10, scale: 0.7, rotate: 0, opacity: 0 },
};

const slotOf = (depth: number, total: number): Slot =>
  depth === 0
    ? "front"
    : depth === 1
      ? "right"
      : depth === total - 1
        ? "left"
        : "hidden";

/** Jumlah titik lintasan; cukup rapat sehingga lengkungannya terlihat mulus */
const PATH_STEPS = 30;
const easeInOut = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

/**
 * Animasi satu kartu sebagai satu lintasan lengkung tanpa titik berhenti.
 *
 * Kartu depan dan kartu samping yang bertukar saling menjauh dulu; ukuran keduanya
 * berpapasan tepat di tengah, saat tidak bersentuhan, dan di situlah lapisannya
 * bertukar (lihat DeckCard). Kartu yang pindah dari satu sisi ke sisi lain
 * (`wraps`) mengecil sehingga lewat di belakang.
 */
function cardMotion(
  fromSlot: Slot,
  slot: Slot,
): { animate: TargetAndTransition; transition: Transition } {
  const start = slotPose[fromSlot];
  const end = slotPose[slot];

  if (fromSlot === slot) {
    return {
      animate: end,
      transition: { duration: SWITCH_SECONDS, ease: "easeInOut" },
    };
  }

  const wraps =
    (fromSlot === "left" && slot === "right") ||
    (fromSlot === "right" && slot === "left");
  const toFront = slot === "front";
  const startX = parseFloat(start.x);
  const endX = parseFloat(end.x);
  // Arah lengkungan: menjauh ke sisi asal (masuk) atau ke sisi tujuan (keluar)
  const side = Math.sign(toFront ? startX : endX);

  // `null` = mulai dari posisi saat ini, jadi klik beruntun tidak membuat kartu melompat
  const path = <T,>(point: (e: number) => T): [null, ...T[]] => [
    null,
    ...Array.from({ length: PATH_STEPS }, (_, i) =>
      point(easeInOut((i + 1) / PATH_STEPS)),
    ),
  ];
  const mix = (a: number, b: number, e: number) => a + (b - a) * e;
  const arc = (e: number) => Math.sin(Math.PI * e);

  return {
    animate: {
      x: path(
        (e) => `${mix(startX, endX, e) + (wraps ? 0 : side * 24 * arc(e))}%`,
      ),
      y: path((e) => mix(start.y, end.y, e) - (wraps ? 30 * arc(e) : 0)),
      scale: path(
        (e) => mix(start.scale, end.scale, e) - (wraps ? 0.14 : 0.05) * arc(e),
      ),
      rotate: path((e) => mix(start.rotate, end.rotate, e)),
      opacity: end.opacity,
    },
    transition: { duration: SWITCH_SECONDS, ease: "linear" },
  };
}

/**
 * Lapisan kartu dihitung dari ukurannya di setiap frame: makin besar, makin depan.
 * Motion tidak bisa menjadwalkan zIndex (nilainya langsung melompat ke akhir),
 * yang membuat kartu yang maju terlihat memotong kartu yang mundur.
 */
function DeckCard({
  fromSlot,
  slot,
  className,
  children,
}: {
  fromSlot: Slot;
  slot: Slot;
  className: string;
  children: ReactNode;
}) {
  const scale = useMotionValue(slotPose[slot].scale);
  const zIndex = useTransform(scale, (value) => Math.round(value * 100));
  const { animate, transition } = cardMotion(fromSlot, slot);

  return (
    <motion.article
      style={{ scale, zIndex }}
      initial={false}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </motion.article>
  );
}

type Testimonial = (typeof c.items)[number];

function CardFace({ entry }: { entry: Testimonial }) {
  return (
    <>
      {entry.photo ? (
        <Image src={entry.photo} alt="" fill className="object-cover" />
      ) : (
        // Pengganti selama foto belum tersedia
        <span className="absolute inset-0 flex items-start justify-center bg-[radial-gradient(ellipse_at_50%_30%,#7a5a24,#2c2010_55%,#0d0b07)] pt-[22%]">
          <UserRound
            aria-hidden
            className="size-2/5 text-white/35"
            strokeWidth={1.25}
          />
        </span>
      )}
      {/* <span className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/60 bg-black/70 px-2 py-0.5 text-[9px] font-bold tracking-[0.12em] text-[#f8d56b]">
        {c.cardBadge}
      </span> */}
      <span className="absolute inset-x-0 bottom-0 flex flex-col bg-linear-to-t from-yellow-900/90 via-[#2a1e07]/95 to-transparent px-2.5 pb-2.5 pt-10">
        <span className="block text-center text-[clamp(0.65rem,3vw,0.75rem)] leading-snug text-white">
          <span
            aria-hidden
            className="mr-1 inline-block align-[-0.25em] text-3xl font-bold leading-[0] text-gold"
          >
            “
          </span>
          {entry.quote}”
        </span>
        <span
          aria-hidden
          className="mx-auto mt-2 h-px w-2/4 bg-linear-to-r from-transparent via-[#ffd75e] to-transparent"
        />
        <span className="mt-1.5 block text-center text-xs font-bold text-white">
          {entry.name}
        </span>
        <span className="block text-center text-[10px] text-white/80">
          {entry.role}
        </span>
      </span>
    </>
  );
}

function ArrowButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-[200] grid size-11 -translate-y-1/2 place-items-center rounded-full border-2 border-gold bg-black/80 text-white transition-transform active:scale-90",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TestimonialSlide() {
  const [{ index, previous }, setDeck] = useState<{
    index: number;
    previous: number | null;
  }>({ index: 0, previous: null });
  const [detailsOpen, setDetailsOpen] = useState(false);
  const total = c.items.length;
  const item = c.items[index];

  // Berputar: dari kartu terakhir kembali ke yang pertama, dan sebaliknya
  const goTo = (target: number) =>
    setDeck((deck) => {
      const next = (target + total) % total;
      return next === deck.index ? deck : { index: next, previous: deck.index };
    });
  const move = (dir: 1 | -1) => goTo(index + dir);

  const slotAt = (card: number, active: number) =>
    slotOf((card - active + total) % total, total);

  const rootRef = useRef<HTMLDivElement>(null);
  const shown = useReplayOnView(rootRef);

  // Usap kiri/kanan di tumpukan menukar kartu, bukan pindah bab
  const touch = useRef<{ x: number; y: number } | null>(null);

  return (
    <motion.div
      ref={rootRef}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      className="relative pb-4 pt-4"
    >
      <motion.div
        {...enter({ x: -40 }, 0.05)}
        className="flex items-center gap-2.5 text-xs font-bold tracking-wide text-gold"
      >
        <span aria-hidden className="h-0.5 w-3 rounded-full bg-gold" />
        {slideMeta("testimonial").category}
      </motion.div>
      <h1 className="mt-3 text-[clamp(1.7rem,8.4vw,2.15rem)] font-bold leading-[1.15]">
        <motion.span {...enter({ x: -80 }, 0.15)} className="block">
          {c.titleLead}
        </motion.span>
        <motion.span {...enter({ x: 80 }, 0.25)} className="block">
          {c.titleMiddle} <span className="text-gold">{c.titleHighlight}</span>
        </motion.span>
      </h1>
      <motion.p
        {...enter({ y: 20 }, 0.35)}
        className="mt-3 text-base leading-relaxed text-muted"
      >
        {c.description}
      </motion.p>

      {/* Tiga kartu menempati sel grid yang sama; posisinya diatur oleh animasi */}
      <motion.div
        {...enter({ y: 40, scale: 0.95 }, 0.5)}
        data-no-swipe
        role="group"
        aria-roledescription="carousel"
        aria-label={c.carouselLabel}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
      >
        <div
          className="relative isolate -mx-2 mt-4 grid pb-3 pt-1"
          onTouchStart={(e) => {
            touch.current = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
            };
          }}
          onTouchEnd={(e) => {
            const start = touch.current;
            touch.current = null;
            if (!start) return;
            const dx = e.changedTouches[0].clientX - start.x;
            const dy = e.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              move(dx < 0 ? 1 : -1);
            }
          }}
        >
          {c.items.map((entry, i) => {
            const slot = slotAt(i, index);
            const front = slot === "front";
            const before = previous === null ? slot : slotAt(i, previous);

            return (
              <DeckCard
                key={entry.id}
                fromSlot={before}
                slot={slot}
                className={cn(
                  "relative aspect-[2/3] w-[min(43%,19.5dvh)] justify-self-center overflow-hidden rounded-[1.25rem] border bg-[#14100a] transition-[box-shadow,border-color] duration-700 will-change-transform [grid-area:1/1]",
                  front
                    ? "border-gold shadow-[0_0_28px_8px_rgb(0_0_0/0.85),0_18px_40px_-18px_rgb(240_177_0/0.7)]"
                    : "border-gold/70 shadow-[0_0_18px_4px_rgb(0_0_0/0.7),0_18px_40px_-18px_rgb(240_177_0/0)]",
                )}
              >
                {/* Kartu depan membuka detail; kartu samping maju ke depan */}
                <button
                  type="button"
                  onClick={() => (front ? setDetailsOpen(true) : goTo(i))}
                  tabIndex={front ? 0 : -1}
                  aria-hidden={!front}
                  aria-label={`${c.details}: ${entry.name}`}
                  className="absolute inset-0 focus-visible:-outline-offset-4"
                >
                  <CardFace entry={entry} />
                </button>
                {/* Kartu samping sedikit digelapkan */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-black transition-opacity duration-700",
                    front ? "opacity-0" : "opacity-20",
                  )}
                />
              </DeckCard>
            );
          })}
          <ArrowButton
            label={c.previous}
            onClick={() => move(-1)}
            className="left-0"
          >
            <ChevronLeft className="size-5" strokeWidth={3} aria-hidden />
          </ArrowButton>
          <ArrowButton
            label={c.next}
            onClick={() => move(1)}
            className="right-0"
          >
            <ChevronRight className="size-5" strokeWidth={3} aria-hidden />
          </ArrowButton>
        </div>

        <div className="flex items-center justify-center">
          {c.items.map((entry, i) => (
            <button
              key={entry.id}
              type="button"
              aria-label={`${c.carouselLabel} ${i + 1}: ${entry.name}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className="grid h-9 min-w-4 place-items-center px-1"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-all",
                  i === index ? "w-6 bg-gold" : "w-2 bg-gold/40",
                )}
              />
            </button>
          ))}
        </div>
      </motion.div>

      <p className="sr-only" aria-live="polite">
        {item.name}, {item.role}: {item.quote} ({c.cardBadge})
      </p>

      <div className="mt-4 flex items-center gap-2">
        <motion.div {...enter({ x: -60 }, 0.75)} className="min-w-0 flex-1">
          <h2 className="text-[clamp(1.15rem,5.6vw,1.4rem)] font-bold leading-tight text-white">
            {c.closingLead}
            <span className="block text-gold">{c.closingHighlight}</span>
          </h2>
          <p className="mt-1.5 text-sm leading-snug text-muted">
            {c.closingBody}
          </p>
        </motion.div>
        {/* Gambar punya tepi kosong, jadi digeser sedikit ke kanan agar sejajar */}
        <motion.div
          {...enter({ x: 60, scale: 0.7 }, 0.85)}
          className="-mr-2 shrink-0"
        >
          <Image
            src="/images/quote-gold.webp"
            alt=""
            width={512}
            height={341}
            className="h-auto w-[clamp(7rem,38vw,9.5rem)] drop-shadow-[0_8px_18px_rgb(240_177_0/0.35)] rotate-12"
          />
        </motion.div>
      </div>

      <BottomSheet
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title={item.name}
      >
        <p className="text-xs font-bold tracking-wider text-gold">{c.badge}</p>
        <p className="mt-3 text-sm font-bold italic leading-relaxed text-white">
          “{item.quote}”
        </p>
        <p className="mt-2 text-xs text-muted">
          {item.name} · {item.role} · {c.sourceLabel}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {c.replaceNote}
        </p>
      </BottomSheet>
    </motion.div>
  );
}
