import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useBrochure } from "./BrochureContext";

/** Blok judul slide: eyebrow, H1 (menerima fokus setelah navigasi), deskripsi. */
export function SlideIntro({
  eyebrow,
  title,
  description,
  tone = "gold",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "gold" | "danger";
}) {
  const { navigated } = useBrochure();
  const h1 = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (navigated) h1.current?.focus({ preventScroll: true });
  }, [navigated]);

  return (
    <div className="relative mt-6">
      <div className={cn("flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]", tone === "gold" ? "text-gold" : "text-danger")}>
        <span className={cn("h-px w-12", tone === "gold" ? "bg-gold" : "bg-danger")} aria-hidden />
        {eyebrow}
      </div>
      <h1
        ref={h1}
        tabIndex={-1}
        className="mt-4 text-[clamp(1.75rem,8.4vw,2.25rem)] font-extrabold leading-[1.12] outline-none"
      >
        {title}
      </h1>
      {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
    </div>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return <span className="gold-text">{children}</span>;
}
