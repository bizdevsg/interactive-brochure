import { useRef, useState, type ReactNode } from "react";
import { motion, useAnimationControls } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calculator,
  Check,
  ChevronDown,
  ChevronRight,
  Info,
  Minus,
  Plus,
} from "lucide-react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Image } from "@/components/ui/Image";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { formatNumber, formatPrice, parseNumber } from "@/lib/format";
import { simulate, type Position } from "@/lib/simulation";
import { ChapterIntro, ChapterNote } from "../components/ChapterIntro";
import { enter, useReplayOnView } from "../components/enter";
import { products, simulationContent as c } from "../data/products";
import { slideMeta } from "../data/slides";
import type { ProductId } from "../types/brochure";

const DEFAULT_ENTRY = 2350;
const DEFAULT_EXIT = 2360;
const MAX_NIGHTS = 30;

const fieldClass =
  "mt-2 flex h-11 items-center rounded-2xl border border-gold/25 bg-black/60 focus-within:border-gold";

/** Kolom harga: bisa diketik, atau digeser 1 USD dengan tombol − dan +. */
function PriceField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const parsed = parseNumber(value);
  const step = (delta: number) => {
    const nextValue = Math.round((parsed + delta) * 100) / 100;
    if (nextValue > 0) onChange(formatPrice(nextValue));
  };

  return (
    <div className="min-w-0">
      <label className="block text-[13px] text-white">
        {label}
        <span className={cn(fieldClass, "pl-3 pr-1")}>
          <input
            className="w-full min-w-0 flex-1 bg-transparent text-sm font-bold text-white outline-none"
            inputMode="decimal"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => {
              if (Number.isFinite(parsed)) onChange(formatPrice(parsed));
            }}
          />
          {[
            { delta: -1, Icon: Minus, name: "Kurangi" },
            { delta: 1, Icon: Plus, name: "Tambah" },
          ].map(({ delta, Icon, name }) => (
            // Area sentuh setinggi kolom; lingkaran yang terlihat lebih kecil
            <button
              key={delta}
              type="button"
              aria-label={`${name} ${label}`}
              disabled={!Number.isFinite(parsed)}
              onClick={() => step(delta)}
              className="grid h-11 w-8 shrink-0 place-items-center disabled:opacity-40"
            >
              <span className="grid size-5 place-items-center rounded-full bg-gold text-black">
                <Icon aria-hidden className="size-3.5" strokeWidth={3} />
              </span>
            </button>
          ))}
        </span>
      </label>
    </div>
  );
}

function SelectField({
  id,
  label,
  extra,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  extra?: ReactNode;
  value: number;
  options: number[];
  onChange: (value: number) => void;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5">
        <label htmlFor={id} className="text-[13px] text-white">
          {label}
        </label>
        {extra}
      </div>
      <div className={cn(fieldClass, "relative")}>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="size-full appearance-none rounded-2xl bg-transparent pl-3 pr-9 text-sm font-bold text-white outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-surface">
              {formatNumber(option)}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3 size-4 text-white"
        />
      </div>
    </div>
  );
}

export function SimulationSlide() {
  const [productId, setProductId] = useState<ProductId>("mini");
  const [position, setPosition] = useState<Position>("BUY");
  const [entry, setEntry] = useState(formatPrice(DEFAULT_ENTRY));
  const [exit, setExit] = useState(formatPrice(DEFAULT_EXIT));
  const [lots, setLots] = useState(
    () => products.find((item) => item.id === "mini")!.spec.lots,
  );
  const [nights, setNights] = useState(1);
  const [nightsHint, setNightsHint] = useState(false);
  const [methodOpen, setMethodOpen] = useState(false);

  const product = products.find((item) => item.id === productId)!;
  const minLot = product.spec.lots;
  const maxLot = parseNumber(product.rows.maxOpenLot);
  // Pilihan lot kelipatan minimum sampai batas lot terbuka, tanpa sisa pecahan float
  const lotOptions = Array.from(
    { length: Math.round(maxLot / minLot) },
    (_, i) => Math.round((i + 1) * minLot * 100) / 100,
  );

  const entryValue = parseNumber(entry);
  const exitValue = parseNumber(exit);
  const result = simulate({
    spec: { ...product.spec, lots },
    position,
    entryPrice: entryValue,
    priceMove: exitValue - entryValue,
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const shown = useReplayOnView(rootRef);
  const resultRef = useRef<HTMLDivElement>(null);
  const resultPulse = useAnimationControls();

  const interact = () => track("simulation_interact");

  // Hasil selalu diperbarui langsung; tombol ini merapikan angka dan menyorot hasil
  const showResult = () => {
    interact();
    if (Number.isFinite(entryValue)) setEntry(formatPrice(entryValue));
    if (Number.isFinite(exitValue)) setExit(formatPrice(exitValue));
    resultRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    resultPulse.start({
      scale: [1, 1.04, 1],
      transition: { duration: 0.5, delay: 0.2 },
    });
  };

  const applyScenario = (move: number) => {
    interact();
    if (Number.isFinite(entryValue) && entryValue + move > 0) {
      setExit(formatPrice(entryValue + move));
    }
  };

  const [from, to] =
    position === "BUY" ? [entryValue, exitValue] : [exitValue, entryValue];

  return (
    <motion.div
      ref={rootRef}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      className="relative pb-4 pt-4"
    >
      <ChapterIntro
        label={slideMeta("simulation").category}
        lead={c.titleLead}
        highlight={c.titleHighlight}
        description={c.practiceDescription}
      />

      <ChapterNote delay={0.5}>{c.practiceNotice}</ChapterNote>

      <motion.div
        {...enter({ y: 40 }, 0.65)}
        className="mt-5 rounded-[1.5rem] border border-gold bg-linear-to-b from-[#1b1710] to-[#0b0906] p-4"
      >
        {/* Pilihan akun */}
        <div className="grid grid-cols-2 gap-3">
          {products.map((item) => {
            const active = productId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  interact();
                  track("product_select", { product: item.id });
                  setProductId(item.id);
                  setLots(item.spec.lots);
                }}
                className={cn(
                  "relative flex min-h-12 min-w-0 items-center gap-1.5 rounded-2xl border bg-linear-to-b from-[#1f1805] to-black py-1.5 pl-1.5 pr-5 text-left transition-[border-color,box-shadow,transform] active:scale-95",
                  active
                    ? "border-gold shadow-[0_0_14px_rgb(240_177_0/0.4)]"
                    : "border-gold/20",
                )}
              >
                <Image
                  src={c.productImage}
                  alt=""
                  className="size-9 shrink-0 object-contain"
                />
                <span className="min-w-0 leading-tight">
                  <span className="block text-sm font-bold text-white">
                    {c.productNames[item.id]}
                  </span>
                  <span className="mt-0.5 block text-[0.7rem] text-white/90">
                    {item.unitRange}
                  </span>
                </span>
                {active && (
                  <span className="absolute right-1.5 top-1/2 grid size-4 -translate-y-1/2 place-items-center rounded-full bg-gold text-black">
                    <Check aria-hidden className="size-3" strokeWidth={4} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* BUY / SELL */}
        <div className="mt-3.5 grid grid-cols-2 gap-3 rounded-full border border-gold p-1">
          {(["BUY", "SELL"] as const).map((choice) => {
            const active = position === choice;
            const Arrow = choice === "BUY" ? ArrowUpRight : ArrowDownRight;
            return (
              <button
                key={choice}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  interact();
                  setPosition(choice);
                }}
                className={cn(
                  "min-h-11 min-w-0 rounded-full border py-1 pl-3 pr-2 text-left leading-tight transition-colors",
                  active
                    ? "border-transparent bg-linear-to-b from-[#ffe680] to-[#f5b81c] text-black"
                    : "border-white/15 bg-black text-white",
                )}
              >
                <span className="flex items-center gap-1 text-sm font-bold">
                  <Arrow aria-hidden className="size-4" strokeWidth={3} />
                  {choice}
                </span>
                <span className="block pl-5 text-[11px]">
                  {choice === "BUY" ? c.buyHint : c.sellHint}
                </span>
              </button>
            );
          })}
        </div>

        {/* Input */}
        <div className="mt-3.5 grid grid-cols-2 gap-3">
          <PriceField label={c.openLabel} value={entry} onChange={setEntry} />
          <PriceField label={c.closeLabel} value={exit} onChange={setExit} />
          <SelectField
            id="sim-lot"
            label={c.lotLabel}
            value={lots}
            options={lotOptions}
            onChange={(value) => {
              interact();
              setLots(value);
            }}
          />
          <SelectField
            id="sim-nights"
            label={c.rolloverLabel}
            value={nights}
            options={Array.from({ length: MAX_NIGHTS + 1 }, (_, i) => i)}
            onChange={setNights}
            extra={
              <button
                type="button"
                aria-expanded={nightsHint}
                aria-label={`Penjelasan ${c.rolloverLabel}`}
                onClick={() => setNightsHint((open) => !open)}
                // Margin negatif: area sentuh lebih besar tanpa menggeser tata letak
                className="-m-2 grid size-8 place-items-center text-muted"
              >
                <Info aria-hidden className="size-3.5" />
              </button>
            }
          />
        </div>
        {nightsHint && (
          <p className="mt-2 text-xs leading-relaxed text-muted">
            {c.rolloverHint}
          </p>
        )}

        {/* Skenario cepat: harga tutup dihitung dari harga buka */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-bold text-white">
            {c.scenarioLabel}
          </span>
          {c.scenarios.map(({ move, label }) => (
            <button
              key={move}
              type="button"
              aria-pressed={Math.abs(exitValue - entryValue - move) < 0.001}
              onClick={() => applyScenario(move)}
              className={cn(
                "min-h-9 rounded-full border px-3.5 text-[13px] font-bold text-white transition-transform active:scale-95 aria-pressed:ring-1",
                move > 0
                  ? "border-emerald-500 bg-emerald-950/70 ring-emerald-400"
                  : "border-red-400 bg-red-950/60 ring-red-300",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Hasil */}
        <motion.div
          ref={resultRef}
          // Wadah terpisah dari varian "shown" agar denyut bisa dipicu dari tombol
          animate={resultPulse}
          className="mt-3.5 rounded-2xl border border-gold/50 bg-linear-to-b from-[#2a1f08] to-[#14100a] p-4"
          aria-live="polite"
        >
          <p className="text-[11px] font-bold tracking-wide text-gold">
            {c.grossLabel}
          </p>
          {result ? (
            <>
              <p
                className={cn(
                  "mt-1 text-[clamp(1.6rem,8vw,2rem)] font-bold leading-tight",
                  result.grossPnl < 0 ? "text-red-400" : "text-[#f2c94c]",
                )}
              >
                {result.grossPnl > 0 ? "+ " : result.grossPnl < 0 ? "− " : ""}
                USD {formatPrice(Math.abs(result.grossPnl))}
              </p>
              <p className="mt-1 text-xs text-muted">
                ({formatNumber(to)} − {formatNumber(from)}) ×{" "}
                {product.spec.ouncesPerLot} oz × {formatNumber(lots)} lot
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-red-300">{c.invalid}</p>
          )}
          <p className="mt-3 flex items-center gap-2.5 text-[13px] leading-snug text-white">
            <Info aria-hidden className="size-4 shrink-0 text-gold" />
            {c.locked}
          </p>
        </motion.div>
      </motion.div>

      <motion.div {...enter({ y: 20 }, 0.85)} className="mt-5">
        <button
          type="button"
          onClick={showResult}
          className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-linear-to-b from-[#ffe680] to-[#fbbc1f] text-[15px] font-bold text-black transition-transform active:scale-95"
        >
          <Calculator aria-hidden className="size-5" />
          {c.calculate}
          <ChevronRight aria-hidden className="size-4" strokeWidth={3} />
        </button>
        <button
          type="button"
          onClick={() => setMethodOpen(true)}
          className="mx-auto mt-1 flex min-h-11 items-center gap-1.5 px-3 text-[13px] text-gold"
        >
          <Info aria-hidden className="size-4" />
          {c.methodLink}
        </button>
      </motion.div>

      <BottomSheet
        open={methodOpen}
        onClose={() => setMethodOpen(false)}
        title={c.methodLink}
      >
        <p className="text-[15px] leading-relaxed text-white">
          {c.methodGross}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          {c.methodNet}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {c.methodNote}
        </p>
        <p className="mt-3 text-sm font-bold leading-relaxed text-gold">
          {c.disclaimer}
        </p>
      </BottomSheet>
    </motion.div>
  );
}
