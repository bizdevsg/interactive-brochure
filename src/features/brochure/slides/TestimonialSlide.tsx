import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { testimonialContent as c } from "../data/content";
import { SLIDES, slideMeta } from "../data/slides";

export function TestimonialSlide() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const item = c.items[index];

  function changeItem(next: number) {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  }

  return (
    <div className="relative pb-4 pt-6">
      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-gold"><span aria-hidden className="h-px w-6 bg-gold" />{slideMeta("testimonial").category}</div>
      <h1 className="relative mt-4 text-[clamp(1.9rem,8vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">{c.titleLead} <span className="text-gold">{c.titleHighlight}</span></h1>
      <p className="mt-5 text-base leading-relaxed text-muted">{c.description}</p>

      <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-gold/40 bg-gradient-to-b from-[#1b1811] to-[#0b0a08] shadow-[0_18px_35px_-25px_rgba(240,177,0,0.5)]">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.article key={item.id} custom={direction} initial={{ opacity: 0, x: direction * 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * -20 }} transition={{ duration: 0.2 }} className="p-5" aria-live="polite">
            <span className="inline-block rounded-full border border-gold/50 bg-gold/10 px-2.5 py-1.5 text-[9px] font-bold tracking-[0.14em] text-[#f8d56b]">{c.badge}</span>
            <span aria-hidden className="mt-2 block h-14 text-7xl font-extrabold leading-none text-[#f8d56b]">“</span>
            <blockquote className="mt-4 text-[clamp(1.2rem,5vw,1.5rem)] font-bold italic leading-snug text-white">{item.quote}</blockquote>
            <div className="mt-5 flex items-center gap-3">
              <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full border border-gold text-sm font-bold text-[#f8d56b]">C{index + 1}</span>
              <div><p className="text-sm font-bold text-white">{item.name}</p><p className="mt-1 text-xs text-muted">{c.sourceLabel}</p></div>
            </div>
            <div className="mt-4 border-t border-gold/20 pt-4">
              <p className="text-xs leading-relaxed text-muted">{c.replaceNote}</p>
              <button type="button" onClick={() => setDetailsOpen(true)} className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#f8d56b]">{c.details} <ArrowRight className="size-4" aria-hidden /></button>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div data-no-swipe className="mt-4 flex items-center justify-between gap-2">
        <button type="button" disabled={index === 0} onClick={() => changeItem(index - 1)} className="inline-flex min-h-11 items-center text-sm font-bold text-[#f8d56b] disabled:text-muted disabled:opacity-50"><ChevronLeft className="size-4" aria-hidden />{c.previous}</button>
        <div aria-hidden className="flex items-center gap-1.5">{c.items.map((entry, i) => <span key={entry.id} className={`h-2 rounded-full ${i === index ? "w-5 bg-gold" : "w-2 bg-gold/30"}`} />)}</div>
        <button type="button" disabled={index === c.items.length - 1} onClick={() => changeItem(index + 1)} className="inline-flex min-h-11 items-center text-sm font-bold text-[#f8d56b] disabled:text-muted disabled:opacity-50">{c.next}<ChevronRight className="size-4" aria-hidden /></button>
      </div>
      <p className="text-center text-xs text-muted">{index + 1} / {c.items.length}</p>

      <BottomSheet open={detailsOpen} onClose={() => setDetailsOpen(false)} title={item.name}>
        <p className="text-sm font-bold italic leading-relaxed text-white">{item.quote}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{c.description}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{c.replaceNote}</p>
      </BottomSheet>
    </div>
  );
}
