import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type TouchEvent,
} from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { GoldButton } from "@/components/ui/GoldButton";
import { track } from "@/lib/analytics";
import { SLIDES, chapterNumber } from "../data/slides";
import { IntroSlide } from "../slides/IntroSlide";
import { globalRiskSheet, riskContent } from "../data/content";
import { useSlideNavigation } from "../hooks/useSlideNavigation";
import type { QuizState, SlideId } from "../types/brochure";
import { CoverSlide } from "../slides/CoverSlide";
import { EcosystemSlide } from "../slides/EcosystemSlide";
import { ProductsSlide } from "../slides/ProductsSlide";
import { SimulationSlide } from "../slides/SimulationSlide";
import { VideoSlide } from "../slides/VideoSlide";
import { TestimonialSlide } from "../slides/TestimonialSlide";
import { CostSlide } from "../slides/CostSlide";
import { RiskSlide } from "../slides/RiskSlide";
import { QuizSlide } from "../slides/QuizSlide";
import { ClosingSlide } from "../slides/ClosingSlide";
import { BrochureContext } from "./BrochureContext";
import { SlideHeader, SlideNumber } from "./SlideHeader";
import { SlideNavigation } from "./SlideNavigation";

/** Registry slide. Slide yang belum dibuat memakai placeholder (dikerjakan satu per satu). */
const registry: Partial<Record<SlideId, ComponentType>> = {
  intro: IntroSlide,
  cover: CoverSlide,
  ecosystem: EcosystemSlide,
  products: ProductsSlide,
  simulation: SimulationSlide,
  video: VideoSlide,
  testimonial: TestimonialSlide,
  cost: CostSlide,
  risk: RiskSlide,
  quiz: QuizSlide,
  closing: ClosingSlide,
};

function Placeholder({ title }: { title: string }) {
  return (
    <div className="mt-10 rounded-2xl border border-dashed border-gold/40 p-5 text-center text-muted">
      <p className="font-bold text-white">{title}</p>
      <p className="mt-1 text-sm">Slide ini belum dibuat.</p>
    </div>
  );
}

const variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 28 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -28 }),
};

export function BrochureShell() {
  const nav = useSlideNavigation();
  const { index, dir, goTo, next, prev } = nav;
  const [navigated, setNavigated] = useState(false);
  const [riskOpen, setRiskOpen] = useState(false);
  const [quiz, setQuiz] = useState<QuizState>({ answers: {}, current: 0 });
  const contentRef = useRef<HTMLDivElement>(null);

  const meta = SLIDES[index];
  const Slide = registry[meta.id];

  const wrap = useCallback(
    (fn: () => void, event?: "slide_next" | "slide_previous") => () => {
      setNavigated(true);
      if (event) track(event, { from: index });
      fn();
    },
    [index],
  );

  const ctx = useMemo(
    () => ({
      index,
      goTo: (i: number) => {
        setNavigated(true);
        goTo(i);
      },
      next: wrap(next, "slide_next"),
      prev: wrap(prev, "slide_previous"),
      openRisk: () => setRiskOpen(true),
      navigated,
      quiz,
      setQuiz,
    }),
    [index, goTo, next, prev, wrap, navigated, quiz],
  );

  useEffect(() => {
    track("brochure_open");
  }, []);
  useEffect(() => {
    track("slide_view", { slide: index });
    if (index === SLIDES.length - 1) track("brochure_complete");
  }, [index]);
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [index]);

  // Keyboard: panah kiri/kanan (diabaikan saat mengetik, slider, radio, atau dialog terbuka)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.defaultPrevented ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey
      )
        return;
      const t = e.target as HTMLElement | null;
      if (
        t?.closest(
          "input, textarea, select, [contenteditable='true'], [data-no-swipe]",
        )
      )
        return;
      if (document.querySelector("dialog[open]")) return;
      if (e.key === "ArrowRight") ctx.next();
      if (e.key === "ArrowLeft") ctx.prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ctx]);

  // Swipe antarslide (diabaikan di dalam carousel / dialog)
  const [touch, setTouch] = useState<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: TouchEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest("[data-no-swipe], dialog")) return setTouch(null);
    setTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (!touch) return;
    const dx = e.changedTouches[0].clientX - touch.x;
    const dy = e.changedTouches[0].clientY - touch.y;
    setTouch(null);
    if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0 && index < SLIDES.length - 1) ctx.next();
    if (dx > 0 && index > 0) ctx.prev();
  };

  return (
    <BrochureContext.Provider value={ctx}>
      <MotionConfig reducedMotion="user">
        {/* fixed inset-0, bukan dvh: sebagian simulator HP melaporkan dvh lebih pendek dari layarnya */}
        <div className="fixed inset-0 flex justify-center bg-ink">
          <main
            className="relative h-full w-full max-w-[430px] overflow-hidden bg-ink"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              {(meta.id === "intro" || meta.id === "cover") && Slide ? (
                <motion.div
                  key={meta.id}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Slide />
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="absolute inset-0 flex min-h-0 flex-col"
                >
                  <div
                    ref={contentRef}
                    className="relative isolate min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-hide"
                  >
                    {/* Cahaya emas dekoratif: berada di dalam area scroll agar ikut bergulir */}
                    <div
                      aria-hidden
                      className="gold-light pointer-events-none absolute inset-x-0 top-0 -z-10 h-136"
                    />
                    <SlideHeader index={index} />
                    <div className="relative min-h-full">
                      <SlideNumber
                        index={chapterNumber(index)}
                        direction={dir}
                      />
                      <AnimatePresence mode="wait" initial={false} custom={dir}>
                        <motion.div
                          key={meta.id}
                          custom={dir}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="relative px-5 pb-28"
                        >
                          {Slide ? (
                            <Slide />
                          ) : (
                            <Placeholder title={meta.title} />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                  <SlideNavigation />
                </motion.div>
              )}
            </AnimatePresence>

            <BottomSheet
              open={riskOpen}
              onClose={() => setRiskOpen(false)}
              title={globalRiskSheet.title}
            >
              <p className="text-[15px] leading-relaxed text-muted">
                {riskContent.statement}
              </p>
              <GoldButton
                className="mt-4 w-full"
                onClick={() => {
                  setRiskOpen(false);
                  ctx.goTo(SLIDES.findIndex((s) => s.id === "risk"));
                }}
              >
                {globalRiskSheet.goToRisk}
              </GoldButton>
            </BottomSheet>
          </main>
        </div>
      </MotionConfig>
    </BrochureContext.Provider>
  );
}
