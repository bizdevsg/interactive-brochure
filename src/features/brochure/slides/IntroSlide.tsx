import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  motion,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import { GoldButton } from "@/components/ui/GoldButton";
import { Image } from "@/components/ui/Image";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { coverContent as c } from "../data/content";
import { useBrochure } from "../components/BrochureContext";

const smooth: Transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

/** Animasi masuk: dari posisi awal `from` ke posisi aslinya, setelah `delay` detik. */
const enter = (
  from: TargetAndTransition,
  delay: number,
  transition: Transition = smooth,
) => ({
  variants: {
    hidden: { opacity: 0, ...from },
    shown: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { ...transition, delay },
    },
  },
});

/** Hiasan 3D yang diburamkan di tepi layar, masing-masing masuk dari sisinya. */
const decorations = [
  {
    src: "/images/icon-bab/1.webp",
    position: "-right-8 top-12 size-32",
    opacity: "opacity-30",
    rotation: "rotate-330",
    fromX: 80,
    delay: 0.5,
  },
  {
    src: "/images/icon-bab/7.webp",
    position: "-left-14 top-[52%] size-36",
    opacity: "opacity-40",
    rotation: "rotate-30",
    fromX: -80,
    delay: 0.7,
  },
  {
    src: "/images/icon-bab/3.webp",
    position: "-right-9 bottom-24 size-32",
    opacity: "opacity-50",
    rotation: "rotate-330",
    fromX: 80,
    delay: 0.9,
  },
];

/** Layar pembuka, tampil sebelum sampul. */
export function IntroSlide() {
  const { next } = useBrochure();
  // AnimatePresence initial={false} di shell mematikan animasi pada render pertama,
  // jadi animasi dipicu lewat perubahan state setelah komponen terpasang.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Label "hidden"/"shown" diturunkan ke semua elemen motion di dalamnya.
  return (
    <motion.section
      aria-label="Pembuka"
      initial="hidden"
      animate={mounted ? "shown" : "hidden"}
      className="relative isolate h-full overflow-hidden bg-black"
    >
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
              "size-full object-contain blur-[5px]",
              item.opacity,
              item.rotation,
            )}
          />
        </motion.div>
      ))}

      <div className="flex h-full flex-col overflow-y-auto overflow-x-hidden px-6 pb-[calc(1rem+var(--safe-bottom))] pt-[calc(clamp(1.25rem,4vh,3.5rem)+var(--safe-top))] text-center">
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

        {/* Ukuran ponsel mengikuti lebar layar agar proporsinya sama di semua perangkat.
            min-h menjaga ruangnya; di layar yang sangat pendek halaman bisa digulir. */}
        <div className="relative my-3 min-h-[min(76vw,20.5rem)] flex-1">
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
              className="float-slow pointer-events-none absolute left-1/2 top-1/2 h-auto w-[70%] max-w-none -translate-x-1/2 -translate-y-1/2"
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

        {/* 4. Tombol memantul masuk, catatan memudar paling akhir */}
        <motion.div
          {...enter({ y: 40, scale: 0.8 }, 1.5, {
            type: "spring",
            stiffness: 260,
            damping: 18,
          })}
          className="mt-[clamp(1rem,3vh,2.5rem)] shrink-0"
        >
          <GoldButton
            className="min-h-14 w-full text-base"
            onClick={() => {
              track("brochure_start");
              next();
            }}
          >
            <p>{c.cta}</p>
            <ArrowDown
              className="ml-5 size-5 rotate-270 animate-bounce"
              aria-hidden
            />
          </GoldButton>
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
