import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { costContent as c } from "../data/content";
import { SLIDES, slideMeta } from "../data/slides";

export function CostSlide() {
  const [openId, setOpenId] = useState<string | null>(c.items[0]?.id ?? null);

  return (
    <div className="relative pb-4 pt-6">
      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-gold">
        <span aria-hidden className="h-px w-6 bg-gold" />{slideMeta("cost").category}
      </div>
      <h1 className="relative mt-4 text-[clamp(1.9rem,8vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">
        {c.titleLead} <span className="text-gold">{c.titleHighlight}</span>
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted">{c.description}</p>

      <div className="mt-6 space-y-4">
        {c.items.map((item, index) => {
          const open = openId === item.id;
          const panelId = `cost-panel-${item.id}`;
          return (
            <article key={item.id} className={`overflow-hidden rounded-[1.25rem] border bg-gradient-to-b from-[#1b1811] to-[#0b0a08] ${open ? "border-gold/80" : "border-gold/20"}`}>
              <h2>
                <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenId(open ? null : item.id)} className="flex w-full items-center gap-3 p-4 text-left">
                  <span className="shrink-0 text-xs font-bold tracking-[0.18em] text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1"><span className="block text-lg font-bold text-white">{item.title}</span><span className={`mt-1 block text-xs leading-relaxed ${open ? "font-bold text-[#f8d56b]" : "text-muted"}`}>{item.tagline}</span></span>
                  {open ? <Minus className="size-5 shrink-0 text-[#f8d56b]" aria-hidden /> : <Plus className="size-5 shrink-0 text-[#f8d56b]" aria-hidden />}
                </button>
              </h2>
              <div id={panelId} hidden={!open} className="px-4 pb-5">
                <span className="inline-block rounded-full border border-gold/50 bg-gold/10 px-2 py-1 text-[9px] font-bold tracking-[0.16em] text-[#f8d56b]">{c.verifyBadge}</span>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-xs leading-relaxed text-muted">
        <span aria-hidden className="font-bold text-gold">i</span><p>{c.note}</p>
      </div>
    </div>
  );
}
