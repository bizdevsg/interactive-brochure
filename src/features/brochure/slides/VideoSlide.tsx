import { useState } from "react";
import { Image } from "@/components/ui/Image";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { videoContent as c } from "../data/content";
import { SLIDES, slideMeta } from "../data/slides";

export function VideoSlide() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const item = c.items[index];

  const changeItem = (next: number) => {
    setPlaying(false);
    setIndex(next);
  };

  return (
    <div className="relative pb-4 pt-6">
      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-gold"><span aria-hidden className="h-px w-6 bg-gold" />{slideMeta("video").category}</div>
      <h1 className="relative mt-4 text-[clamp(1.9rem,8vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">{c.titleLead} <span className="text-gold">{c.titleHighlight}</span></h1>
      <p className="mt-5 text-base leading-relaxed text-muted">{c.description}</p>

      <article className="mt-6 overflow-hidden rounded-[1.5rem] border border-gold/40 bg-[#110f0c]">
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          {playing && item.src ? (
            <video key={item.id} src={item.src} poster={item.poster ?? undefined} controls autoPlay playsInline className="h-full w-full object-contain" />
          ) : (
            <>
              <Image src={item.poster ?? "/images/main-image-new.webp"} alt="" fill sizes="(max-width: 430px) 100vw, 430px" className="object-contain opacity-75" />
              <span className="absolute left-3 top-3 rounded-full border border-gold/50 bg-black/75 px-3 py-1.5 text-[9px] font-bold tracking-[0.14em] text-[#f8d56b]">{c.badge}</span>
              {item.src ? (
                <button type="button" onClick={() => setPlaying(true)} aria-label={c.play} className="gold-gradient absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-ink shadow-[0_0_35px_rgba(240,177,0,0.35)]"><Play className="ml-1 size-7 fill-current" aria-hidden /></button>
              ) : (
                <span className="absolute inset-x-0 bottom-0 bg-black/80 px-4 py-2 text-center text-xs text-muted">{c.unavailable}</span>
              )}
            </>
          )}
        </div>
        <div aria-hidden className="h-1 bg-gold/20"><div className="h-full bg-gold" style={{ width: `${((index + 1) / c.items.length) * 100}%` }} /></div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-white">{item.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
          <button type="button" onClick={() => setDetailsOpen(true)} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#f8d56b]">{c.details} <ArrowRight className="size-4" aria-hidden /></button>
        </div>
      </article>

      <div data-no-swipe className="mt-4 flex items-center justify-between gap-2">
        <button type="button" disabled={index === 0} onClick={() => changeItem(index - 1)} className="inline-flex min-h-11 items-center text-sm font-bold text-[#f8d56b] disabled:text-muted disabled:opacity-50"><ChevronLeft className="size-4" aria-hidden />{c.previous}</button>
        <div aria-hidden className="flex items-center gap-1.5">{c.items.map((entry, i) => <span key={entry.id} className={`h-2 rounded-full ${i === index ? "w-5 bg-gold" : "w-2 bg-gold/30"}`} />)}</div>
        <button type="button" disabled={index === c.items.length - 1} onClick={() => changeItem(index + 1)} className="inline-flex min-h-11 items-center text-sm font-bold text-[#f8d56b] disabled:text-muted disabled:opacity-50">{c.next}<ChevronRight className="size-4" aria-hidden /></button>
      </div>

      <BottomSheet open={detailsOpen} onClose={() => setDetailsOpen(false)} title={item.title}>
        <p className="text-sm leading-relaxed text-muted">{item.summary}</p>
        {!item.src && <p className="mt-3 text-sm text-muted">{c.unavailable}</p>}
      </BottomSheet>
    </div>
  );
}
