import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function InformationCard({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "danger" | "active";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        tone === "default" && "border-gold/20 bg-surface",
        tone === "active" && "border-gold bg-surface shadow-[0_0_28px_-10px_rgb(240_177_0/0.5)]",
        tone === "danger" && "border-danger/50 bg-[#2a0d10]",
        className,
      )}
    >
      {children}
    </div>
  );
}
