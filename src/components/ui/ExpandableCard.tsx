import { useId, type ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "./Badge";

interface Props {
  number: string;
  title: string;
  tagline: string;
  badge?: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}

/** Kartu accordion: tombol dengan aria-expanded + panel (animasi grid-rows, tanpa layout berat). */
export function ExpandableCard({ number, title, tagline, badge, open, onToggle, children }: Props) {
  const panelId = useId();
  return (
    <div
      className={cn(
        "rounded-2xl border bg-surface transition-colors",
        open ? "border-gold shadow-[0_0_28px_-12px_rgb(240_177_0/0.5)]" : "border-gold/20",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex min-h-14 w-full items-start gap-3 rounded-2xl p-4 text-left"
      >
        <span className="pt-0.5 text-xs font-bold tracking-widest text-gold">{number}</span>
        <span className="min-w-0 flex-1">
          {badge && <Badge className="mb-2">{badge}</Badge>}
          <span className="block text-lg font-bold leading-tight">{title}</span>
          <span className="mt-1 block text-sm font-semibold text-[#f8d56b]">{tagline}</span>
        </span>
        {open ? (
          <Minus className="mt-1 size-5 shrink-0 text-gold" aria-hidden />
        ) : (
          <Plus className="mt-1 size-5 shrink-0 text-gold" aria-hidden />
        )}
      </button>
      <div id={panelId} role="region" aria-label={title} className="expand" data-open={open}>
        <div>
          <div className="px-4 pb-4 pl-[3.25rem] text-[15px] leading-relaxed text-muted">{children}</div>
        </div>
      </div>
    </div>
  );
}
