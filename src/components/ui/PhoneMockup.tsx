import { cn } from "@/lib/cn";

/**
 * Ilustrasi perangkat murni CSS (tanpa gambar, tanpa angka akun/transaksi).
 * Ganti dengan screenshot aplikasi yang disetujui bila tersedia (PRD §6 SL-04).
 */
function Phone({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative aspect-[9/19] overflow-hidden rounded-[1.9rem] border-[3px] border-[#2b2b2b] bg-[#0b0b0b] p-[5%] shadow-[0_20px_50px_-15px_rgb(0_0_0/0.9)]",
        className,
      )}
    >
      <div className="mx-auto h-[1.6%] w-1/4 rounded-full bg-[#1f1f1f]" />
      <div className="mt-[7%] flex h-[21%] flex-col justify-end gap-[6%] rounded-xl gold-gradient p-[7%]">
        <div className="h-[10%] w-2/3 rounded-full bg-ink/40" />
        <div className="h-[10%] w-1/3 rounded-full bg-ink/30" />
      </div>
      <div className="mt-[6%] flex flex-col gap-[4%]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-[6%] rounded-lg bg-[#1a1a1a] p-[5%]"
          >
            <div className="aspect-square w-[22%] rounded-md bg-gold/30" />
            <div className="flex-1 space-y-[10%]">
              <div className="h-1 rounded-full bg-white/30" />
              <div className="h-1 w-2/3 rounded-full bg-white/15" />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-[7%] bottom-[3%] flex h-[7%] items-center justify-around rounded-full bg-[#171717]">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={cn(
              "size-1.5 rounded-full",
              i === 3 ? "bg-gold" : "bg-white/25",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function PhoneMockup({
  variant = "pair",
  label,
  className,
}: {
  variant?: "single" | "pair";
  label: string;
  className?: string;
}) {
  if (variant === "single") {
    return (
      <div
        role="img"
        aria-label={label}
        className={cn("mx-auto w-1/2", className)}
      >
        <Phone />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("relative mx-auto aspect-[1/1.05] w-full", className)}
    ></div>
  );
}
