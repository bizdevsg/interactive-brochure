import { useState } from "react";
import { Image } from "@/components/ui/Image";
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Play,
  Smartphone,
} from "lucide-react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { officialLinks, siteConfig } from "@/config/site";
import { closingContent as c } from "../data/content";
import { SLIDES, slideMeta } from "../data/slides";

const icons = { website: Globe2, android: Play, ios: Smartphone };

export function ClosingSlide() {
  const [legalOpen, setLegalOpen] = useState(false);

  return (
    <div className="relative pb-4 pt-6">
      <div
        aria-hidden
        className="relative mx-auto mb-6 mt-8 flex h-44 w-full max-w-[360px] items-end justify-center overflow-hidden"
      >
        <div className="absolute top-5 aspect-square w-full rounded-full border border-[#f8d56b]/70 bg-[radial-gradient(circle_at_50%_0%,rgba(240,177,0,0.14),transparent_60%)] shadow-[0_-12px_45px_rgba(240,177,0,0.3)]" />
        <Globe2
          className="absolute top-9 size-40 text-[#f8d56b]/50"
          strokeWidth={0.6}
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-gold">
        <span aria-hidden className="h-px w-3 bg-gold" />
        {slideMeta("closing").category}
      </div>
      <h1 className="relative mt-4 text-[clamp(1.9rem,8vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">
        {c.titleLead} <span className="text-gold">{c.titleHighlight}</span>
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted">
        {c.description}
      </p>

      <div className="mt-6 space-y-3">
        {officialLinks.map((link) => {
          const Icon = icons[link.id as keyof typeof icons] ?? Globe2;
          const contents = (
            <>
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-gold/40 bg-gold/10 text-[#f8d56b]">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-white">
                  {link.title}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {link.href ? link.subtitle : c.unavailable}
                </span>
              </span>
              <ArrowUpRight
                className="size-5 shrink-0 text-[#f8d56b]"
                aria-hidden
              />
            </>
          );
          const classes =
            "flex w-full items-center gap-3 rounded-2xl border border-gold/20 bg-gradient-to-b from-[#1b1811] to-[#0b0a08] p-4 text-left";
          return link.href ? (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={classes}
            >
              {contents}
            </a>
          ) : (
            <div key={link.id} aria-disabled="true" className={classes}>
              {contents}
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-gold/20 bg-black/40 p-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/Logo SG-WEB111.webp"
            alt=""
            width={103}
            height={180}
            className="h-9 w-auto"
          />
          <p className="text-sm font-bold text-white">{siteConfig.company}</p>
        </div>
        <button
          type="button"
          onClick={() => setLegalOpen(true)}
          className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#f8d56b]"
        >
          {c.legal.cta}
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>

      <BottomSheet
        open={legalOpen}
        onClose={() => setLegalOpen(false)}
        title={c.legal.title}
      >
        <p className="text-sm leading-relaxed text-muted">{c.legal.body}</p>
      </BottomSheet>
    </div>
  );
}
