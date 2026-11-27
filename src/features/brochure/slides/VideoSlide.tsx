import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Image } from "@/components/ui/Image";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { ChapterIntro } from "../components/ChapterIntro";
import { enter, useReplayOnView } from "../components/enter";
import { videoContent as c } from "../data/content";
import { slideMeta } from "../data/slides";

type VideoItem = (typeof c.items)[number];

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -60 }),
};

/** Area video: thumbnail dulu, elemen <video> baru dimuat setelah tombol putar ditekan. */
function VideoStage({
  item,
  playing,
  onPlay,
}: {
  item: VideoItem;
  playing: boolean;
  onPlay: () => void;
}) {
  const [failed, setFailed] = useState(false);

  if (playing && item.src && !failed) {
    return (
      <video
        src={item.src}
        poster={item.poster ?? undefined}
        controls
        autoPlay
        playsInline
        aria-label={item.title}
        onError={() => setFailed(true)}
        className="size-full bg-black object-contain"
      />
    );
  }

  return (
    <>
      {item.poster ? (
        <Image src={item.poster} alt="" fill className="object-cover" />
      ) : (
        // Thumbnail pengganti selama gambar resmi belum tersedia
        <div className="flex size-full flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_50%_100%,#5a2c06,#24140a_45%,#0c0f12_100%)]">
          <Image
            src="/images/Logo SG-WEB111.webp"
            alt=""
            width={103}
            height={180}
            className="h-[62%] w-auto"
          />
          <span className="text-[11px] font-bold tracking-[0.12em] text-white/60">
            {c.posterCaption}
          </span>
        </div>
      )}
      {item.src && !failed ? (
        <button
          type="button"
          onClick={onPlay}
          aria-label={`${c.play}: ${item.title}`}
          className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-black shadow-[0_0_30px_rgb(240_177_0/0.45)] transition-transform active:scale-95"
        >
          <Play className="ml-0.5 size-6 fill-current" aria-hidden />
        </button>
      ) : (
        <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-[11px] text-white/80">
          {failed ? c.failed : c.unavailable}
        </span>
      )}
    </>
  );
}

function ArrowButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border-2 border-gold/80 text-white transition-transform active:scale-90"
    >
      {children}
    </button>
  );
}

export function VideoSlide() {
  const [[index, direction], setPage] = useState([0, 1]);
  const [playing, setPlaying] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const item = c.items[index];

  const rootRef = useRef<HTMLDivElement>(null);
  const shown = useReplayOnView(rootRef);

  // Berputar: dari item terakhir kembali ke yang pertama, dan sebaliknya
  const goToItem = (target: number, dir: number) => {
    setPlaying(false);
    setPage([(target + c.items.length) % c.items.length, dir]);
  };
  const move = (dir: number) => goToItem(index + dir, dir);

  // Usap kiri/kanan di kartu mengganti video, bukan pindah bab
  const touch = useRef<{ x: number; y: number } | null>(null);

  return (
    <motion.div
      ref={rootRef}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      className="relative pb-4 pt-4"
    >
      <ChapterIntro
        label={slideMeta("video").category}
        lead={c.titleLead}
        highlight={c.titleHighlight}
        description={c.description}
      />

      <motion.div
        {...enter({ y: 50, scale: 0.95 }, 0.5)}
        data-no-swipe
        role="group"
        aria-roledescription="carousel"
        aria-label={c.carouselLabel}
        onKeyDown={(e) => {
          // Di dalam video, tombol panah dipakai untuk memajukan putaran
          if (e.target instanceof HTMLVideoElement) return;
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
      >
        <div
          className="mt-6 overflow-hidden rounded-[1.5rem] border border-gold bg-[#14100c]"
          onTouchStart={(e) => {
            touch.current = playing
              ? null
              : { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }}
          onTouchEnd={(e) => {
            const from = touch.current;
            touch.current = null;
            if (!from) return;
            const dx = e.changedTouches[0].clientX - from.x;
            const dy = e.changedTouches[0].clientY - from.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              move(dx < 0 ? 1 : -1);
            }
          }}
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.article
              key={item.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="relative mt-3 aspect-video overflow-hidden rounded-2xl bg-black">
                <VideoStage
                  item={item}
                  playing={playing}
                  onPlay={() => {
                    track("video_play", { video: item.id });
                    setPlaying(true);
                  }}
                />
              </div>
              <div className="px-[1.1rem] pb-2 pt-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[17px] font-bold text-white">
                    {item.title}
                  </h2>
                  {!item.verified && (
                    <span className="rounded-full border border-gold/40 px-2 text-[9px] font-bold leading-4 tracking-wider text-gold/80">
                      {c.verifyBadge}
                    </span>
                  )}
                </div>
                {/* Tinggi tetap 3 baris agar tombol di bawah kartu tidak melompat */}
                <p className="mt-2 line-clamp-3 min-h-[4.125rem] text-sm leading-[1.375rem] text-muted">
                  {item.summary}
                </p>
                <button
                  type="button"
                  onClick={() => setDetailsOpen(true)}
                  className="mt-1 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#f8d56b]"
                >
                  {c.details} <ArrowRight className="size-4" aria-hidden />
                </button>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-center gap-8">
          <ArrowButton label={c.previous} onClick={() => move(-1)}>
            <ChevronLeft className="size-5" strokeWidth={3} aria-hidden />
          </ArrowButton>
          <div className="flex items-center">
            {c.items.map((entry, i) => (
              <button
                key={entry.id}
                type="button"
                aria-label={`${c.carouselLabel} ${i + 1}: ${entry.title}`}
                aria-current={i === index}
                onClick={() => goToItem(i, i > index ? 1 : -1)}
                className="grid h-11 min-w-4 place-items-center px-1"
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
          <ArrowButton label={c.next} onClick={() => move(1)}>
            <ChevronRight className="size-5" strokeWidth={3} aria-hidden />
          </ArrowButton>
        </div>
      </motion.div>

      <BottomSheet
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title={item.title}
      >
        <p className="text-[15px] leading-relaxed text-muted">
          {item.detail ?? item.summary}
        </p>
        {!item.detail && (
          <p className="mt-3 text-sm font-bold text-gold">{c.detailMissing}</p>
        )}
      </BottomSheet>
    </motion.div>
  );
}
