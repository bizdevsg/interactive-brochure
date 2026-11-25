import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

export type OptionResult = "idle" | "correct" | "wrong";

/** Opsi kuis memakai radio native (navigasi panah keyboard bawaan) dengan tampilan kustom. */
export function QuizOption({
  name,
  value,
  label,
  checked,
  disabled,
  result,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  disabled: boolean;
  result: OptionResult;
  onChange: (value: string) => void;
}) {
  return (
    <label
      className={cn(
        "flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
        result === "correct" && "border-gold bg-[#2a2108]",
        result === "wrong" && "border-danger/70 bg-[#2a0d10]",
        result === "idle" && (checked ? "border-gold bg-[#201806]" : "border-gold/20 bg-surface"),
        disabled && "cursor-default",
      )}
    >
      <input
        type="radio"
        className="peer sr-only"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
      />
      <span
        aria-hidden
        className={cn(
          "grid size-7 shrink-0 place-items-center rounded-full border-2",
          checked || result !== "idle" ? "border-gold bg-gold text-ink" : "border-gold/40",
          result === "wrong" && "border-danger bg-danger text-white",
        )}
      >
        {result === "wrong" ? <X className="size-4" /> : (checked || result === "correct") && <Check className="size-4" />}
      </span>
      <span className="flex-1 text-[15px] font-semibold leading-snug">{label}</span>
      {result === "correct" && <span className="text-xs font-bold text-gold">Benar</span>}
      {result === "wrong" && <span className="text-xs font-bold text-danger">Kurang tepat</span>}
    </label>
  );
}
