import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { enter, smooth, useReplayOnView } from "../components/enter";
import { Image } from "@/components/ui/Image";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { coverContent as c } from "../data/content";
import { ChevronUp } from "lucide-react";

/** Hiasan 3D yang diburamkan di tepi layar, masing-masing masuk dari sisinya. */
const decorations = [
  {
    src: "/images/icon-bab/1.webp",
    position: "-right-8 top-12 size-32",
    opacity: "opacity-70",
    rotation: "rotate-330",
    fromX: 80,
    delay: 0.5,
  },
  {
    src: "/images/icon-bab/7.webp",
    position: "-left-14 top-[52%] size-36",
    opacity: "opacity-70",
    rotation: "rotate-30",
    fromX: -80,
    delay: 0.7,
  },
  {
    src: "/images/icon-bab/3.webp",
    position: "-right-9 bottom-24 size-32",
    opacity: "opacity-70",
    rotation: "rotate-330",
    fromX: 80,
    delay: 0.9,
  },
];

/** Layar pembuka, tampil sebelum sampul. */
export function IntroSlide({ onOpen }: { onOpen: () => void }) {
  // Animasi diputar saat halaman dibuka dan setiap kali intro kembali ke layar.
  const sectionRef = useRef<HTMLElement>(null);
  const shown = useReplayOnView(sectionRef);

  // Video hanya diputar saat intro terlihat, dan diam bila "kurangi gerakan" aktif.
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!shown || reduceMotion) return video.pause();
    // React tidak selalu menulis atribut muted saat SSR, padahal autoplay membutuhkannya
    video.muted = true;
    // Autoplay bisa ditolak (mis. mode hemat daya); poster tetap tampil
    video.play().catch(() => {});
  }, [shown, reduceMotion]);

  // Satu gerakan (terutama roda mouse) mengirim banyak event, jadi dibatasi
  // agar brosur dan analytics tidak terpicu berulang.
  const lastOpen = useRef(0);
  const open = () => {
    if (Date.now() - lastOpen.current < 1000) return;
    lastOpen.current = Date.now();
    track("brochure_start");
    onOpen();
  };

  // Usap/seret ke atas membuka brosur.
  const start = useRef<{ x: number; y: number } | null>(null);
  const begin = (x: number, y: number) => {
    start.current = { x, y };
  };
  const finish = (x: number, y: number) => {
    const from = start.current;
    start.current = null;
    if (!from) return;
    const up = from.y - y;
    if (up > 50 && up > Math.abs(x - from.x) * 1.2) open();
  };

  // Label "hidden"/"shown" diturunkan ke semua elemen motion di dalamnya.
  return (
    <motion.section
      ref={sectionRef}
      aria-label="Pembuka"
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      onTouchStart={(e) => begin(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={(e) =>
        finish(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
      }
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") begin(e.clientX, e.clientY);
      }}
      onPointerUp={(e) => {
        if (e.pointerType === "mouse") finish(e.clientX, e.clientY);
      }}
      onWheel={(e) => {
        if (e.deltaY > 20) open();
      }}
      // touch-none: browser tidak mengambil alih gerakan usap (mis. pull-to-refresh)
      className="relative isolate h-full touch-none select-none overflow-hidden bg-black"
    >
      {/* Video background layar penuh; paling belakang karena ditulis paling awal.
          Poster tampil saat video dimuat atau bila browser tidak mendukung WebM.
          ("M_00 · Intro.gif" ditulis ter-encode karena berisi spasi dan "·") */}
      <video
        ref={videoRef}
        src="/images/bg-intro.webm"
        poster="/images/M_00%20%C2%B7%20Intro.gif"
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-top"
      />
      {decorations.map((item) => (
        <motion.div
          key={item.src}
          aria-hidden
          {...enter({ x: item.fromX }, item.delay, { duration: 1.2 })}
          className={cn("pointer-events-none absolute -z-10", item.position)}
        >
          <Image
            src={item.src}
            alt=""
            loading="eager"
            className={cn(
              "size-full object-contain blur-[2px]",
              item.opacity,
              item.rotation,
            )}
          />
        </motion.div>
      ))}

      {/* overflow-clip: isi intro tidak bisa tergeser, sehingga jarak atas tetap utuh */}
      <div className="flex h-full flex-col overflow-clip px-6 pb-[calc(1rem+var(--safe-bottom))] pt-[calc(clamp(2.5rem,7vh,4rem)+var(--safe-top))] text-center">
        {/* 1. Logo turun dari atas, lalu tulisan "Solid" menyusul */}
        <div className="flex flex-col items-center gap-2">
          <motion.div {...enter({ y: -40, scale: 0.6 }, 0.1)}>
            <Image
              src="/images/Logo SG-WEB111.webp"
              alt="SGB"
              width={103}
              height={180}
              priority
              className="h-14 w-auto"
            />
          </motion.div>

          <motion.span
            {...enter({ scale: 1.25 }, 0.35)}
            className="pl-[0.3em] text-lg font-semibold tracking-[0.3em]"
          >
            Solid
          </motion.span>
        </div>

        {/* Ponsel selebar 70% wadah; di layar pendek mengecil mengikuti tinggi sisa
            (cqw/cqh) sehingga tidak menabrak logo maupun judul. */}
        <div className="relative my-4 min-h-0 flex-1 [container-type:size]">
          {/* 2. Cahaya dan ponsel naik bersama dari bawah layar */}
          <motion.div
            {...enter({ y: "60vh" }, 0.3, { ...smooth, duration: 1 })}
            className="absolute inset-0"
          >
            <Image
              src="/images/bg-intro-fix.webp"
              alt=""
              aria-hidden
              priority
              className="pointer-events-none absolute left-1/2 top-1/2 w-[135%] max-w-none -translate-x-1/2 -translate-y-1/2"
            />
            {/* Setelah sampai, ponsel melayang pelan (mati saat reduced motion) */}
            <Image
              src="/images/hp-intro.webp"
              alt="Tampilan aplikasi Solid pada dua ponsel"
              width={250}
              height={316}
              priority
              className="float-slow pointer-events-none absolute left-1/2 top-1/2 h-auto w-[min(70cqw,73cqh)] max-w-none -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>
        </div>

        {/* 3. Judul masuk dari kiri dan kanan, deskripsi dari kiri */}
        <div>
          <h1 className="text-[clamp(1.4rem,6.8vw,1.75rem)] font-extrabold leading-[1.3] tracking-tight">
            <motion.span {...enter({ x: "-100%" }, 0.9)} className="block">
              {c.titleLead}
            </motion.span>
            <motion.span
              {...enter({ x: "100%" }, 1.05)}
              className="block text-gold"
            >
              {c.titleHighlight}
            </motion.span>
          </h1>
          <motion.p
            {...enter({ x: -60 }, 1.3)}
            className="mt-2 text-[15px] leading-snug text-white"
          >
            {c.description}
          </motion.p>
        </div>

        {/* 4. Indikator swipe up memantul masuk, catatan memudar paling akhir.
            Tetap berupa button agar bisa diketuk dan dipakai dengan keyboard. */}
        <motion.div
          {...enter({ y: 40, scale: 0.8 }, 1.5, {
            type: "spring",
            stiffness: 260,
            damping: 18,
          })}
          className="mt-[clamp(1rem,3vh,2.5rem)] shrink-0"
        >
          <button
            type="button"
            onClick={open}
            aria-label={`${c.cta} untuk membuka brosur`}
            className="mx-auto flex min-h-14 min-w-32 items-center justify-center"
          >
            {/* alt kosong: nama tombol sudah diberikan lewat aria-label */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="bg-yellow-500 rounded-full p-1 animate-bounce opacity-50">
                <ChevronUp className="text-black h-5 w-5" />
              </div>
              <p className="uppercase text-sm font-bold opacity-50">{c.cta}</p>
            </div>
          </button>
        </motion.div>
        <motion.p
          {...enter({}, 1.85)}
          className="mt-3 text-center text-xs text-muted"
        >
          {c.footnote}
        </motion.p>
      </div>
    </motion.section>
  );
}
