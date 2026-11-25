import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface Option<T extends string> {
  id: T;
  label: string;
}

/** Kontrol segmen: status terpilih ditandai warna + ikon centang (tidak hanya warna). */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="grid grid-flow-col auto-cols-fr gap-1 rounded-full border border-gold/25 bg-surface p-1">
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            className={cn(
              "flex min-h-11 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-bold transition-colors",
              active ? "gold-gradient text-ink" : "text-muted",
            )}
          >
            {active && <Check className="size-4" aria-hidden />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
