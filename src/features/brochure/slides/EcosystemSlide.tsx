import { useEffect, useRef, useState } from "react";
import { Image } from "@/components/ui/Image";
import { motion, useReducedMotion } from "motion/react";
import { ecosystemContent as c, type EcosystemCategory } from "../data/content";
import { SLIDES, slideMeta } from "../data/slides";
import { BuildingComplex, User } from "lucide-react";

export function EcosystemSlide() {
  const [category, setCategory] = useState<EcosystemCategory>("profil");
  const [selected, setSelected] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const selectedCard = useRef<HTMLElement>(null);
  const items = c.items.filter((item) => item.category === category);

  useEffect(() => {
    if (selected)
      selectedCard.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
  }, [selected, category]);

  return (
    <div className="relative pb-4 pt-6">
      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-gold">
        <span aria-hidden className="h-px w-6 bg-gold" />
        {slideMeta("ecosystem").category}
      </div>
      <h1 className="relative mt-4 text-[clamp(1.9rem,8vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">
        {c.titleLead} <span className="text-gold">{c.titleHighlight}</span>
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted">
        {c.description}
      </p>

      <div
        className="mt-6 flex flex-wrap gap-2"
        aria-label={slideMeta("ecosystem").category}
      >
        {c.categories.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={category === item.id}
            onClick={() => {
              setCategory(item.id);
              setSelected(null);
            }}
            className={`min-h-10 rounded-full border px-4 text-xs font-bold transition-colors ${category === item.id ? "border-gold/70 bg-gold/15 text-[#f8d56b]" : "border-gold/20 bg-[#17140f] text-muted"}`}
          >
            {item.label}
            {/* <span className="ml-1 font-normal text-muted">
              {c.items.filter((entry) => entry.category === item.id).length}
            </span> */}
          </button>
        ))}
      </div>

      <div className="relative mt-5 grid grid-cols-3 items-start rounded-[1.25rem] border border-gold/20 bg-gradient-to-b from-[#1b1811] to-[#0b0a08] px-2 py-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-2 top-[3rem] flex h-0.5 items-center px-[16.6667%]"
        >
          {[0, 1].map((line) => (
            <motion.span
              key={line}
              className="h-full w-1/2 origin-left bg-gradient-to-r from-gold/30 via-gold to-gold/30"
              initial={reducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: line * 0.2, ease: "easeOut" }}
            />
          ))}
        </div>
        {c.nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => {
              setCategory(node.target);
              setSelected(node.itemId);
            }}
            className="relative flex min-w-0 flex-col items-center rounded-lg text-center"
          >
            <span
              className={`grid size-14 place-items-center rounded-full border ${node.id === "solid" ? "border-gold bg-[#2a210d] shadow-[0_0_22px_rgba(240,177,0,0.2)]" : "border-gold/20 bg-[#17140f]"}`}
            >
              {node.id === "solid" ? (
                <Image
                  src="/images/Logo SG-WEB111.webp"
                  alt="Solid Gold"
                  width={103}
                  height={180}
                  className="h-10 w-auto"
                />
              ) : node.id === "anda" ? (
                <span className="text-2xl font-bold text-[#f8d56b]">
                  <User />
                </span>
              ) : (
                <span className="text-2xl font-bold text-[#f8d56b]">
                  <BuildingComplex />
                </span>
              )}
            </span>
            <span className="mt-2 text-sm font-bold text-white">
              {node.name}
            </span>
            <span className="mt-2 text-xs text-muted">{node.role}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {items.map((item, index) => (
          <article
            key={item.id}
            ref={selected === item.id ? selectedCard : undefined}
            className={`scroll-m-6 rounded-[1.25rem] border bg-gradient-to-b from-[#1b1811] to-[#0b0a08] p-5 ${selected === item.id ? "border-gold/70" : "border-gold/20"}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold tracking-[0.18em] text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              {!item.verified && (
                <span className="rounded-full border border-gold/50 bg-gold/10 px-2 py-1 text-[9px] font-bold tracking-[0.16em] text-[#f8d56b]">
                  {c.verifyBadge}
                </span>
              )}
            </div>
            <h2 className="mt-3 text-lg font-bold text-white">{item.title}</h2>
            <p className="mt-3 text-sm font-bold leading-relaxed text-[#f8d56b]">
              {item.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 flex gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-xs leading-relaxed text-muted">
        <span aria-hidden className="font-bold text-gold">
          i
        </span>
        <p>{c.note}</p>
      </div>
    </div>
  );
}
