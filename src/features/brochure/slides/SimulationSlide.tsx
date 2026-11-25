import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { simulate, type Position } from "@/lib/simulation";
import { products, simulationContent as c } from "../data/products";
import { SLIDES, slideMeta } from "../data/slides";
import type { ProductId } from "../types/brochure";

const parseDecimal = (value: string) => value.trim() === "" ? NaN : Number(value.replace(",", "."));
const formatNumber = (value: number) => new Intl.NumberFormat("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
const inputClass = "mt-2 w-full min-w-0 rounded-xl border border-gold/40 bg-black px-3 py-3 text-base font-bold text-white outline-none focus:border-gold";

export function SimulationSlide() {
  const [productId, setProductId] = useState<ProductId>("mini");
  const [position, setPosition] = useState<Position>("BUY");
  const [entry, setEntry] = useState("2350");
  const [exit, setExit] = useState("2360");
  const [lots, setLots] = useState("0,1");
  const [nights, setNights] = useState("0");
  const product = products.find((item) => item.id === productId)!;
  const entryValue = parseDecimal(entry);
  const exitValue = parseDecimal(exit);
  const lotValue = parseDecimal(lots);
  const nightValue = parseDecimal(nights);
  const minLot = product.spec.lots;
  const maxLot = Number(product.rows.maxOpenLot.replace(",", "."));
  const valid = lotValue >= minLot && lotValue <= maxLot && Number.isSafeInteger(nightValue) && nightValue >= 0;
  const result = valid ? simulate({ spec: { ...product.spec, lots: lotValue }, position, entryPrice: entryValue, priceMove: exitValue - entryValue }) : null;

  return (
    <div className="relative pb-4 pt-6">
      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-gold"><span aria-hidden className="h-px w-6 bg-gold" />{slideMeta("simulation").category}</div>
      <h1 className="relative mt-4 text-[clamp(1.9rem,8vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">{c.titleLead} <span className="text-gold">{c.titleHighlight}</span></h1>
      <p className="mt-5 text-base leading-relaxed text-muted">{c.practiceDescription}</p>

      <div className="mt-6 flex gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-xs leading-relaxed text-muted"><span aria-hidden className="font-bold text-gold">!</span><p>{c.practiceNotice}</p></div>

      <div className="mt-5 rounded-[1.5rem] border border-gold/40 bg-gradient-to-b from-[#1b1811] to-[#0b0a08] p-4">
        <div className="grid grid-cols-2 rounded-full border border-gold/20 bg-black p-1">
          {products.map((item) => <button key={item.id} type="button" aria-pressed={productId === item.id} onClick={() => { setProductId(item.id); setLots(String(item.spec.lots).replace(".", ",")); }} className={`rounded-full px-2 py-3 text-center ${productId === item.id ? "gold-gradient text-ink" : "text-muted"}`}><span className="block text-sm font-bold">{item.name}</span><span className="mt-1 block text-xs">{item.unitRange}</span></button>)}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {(["BUY", "SELL"] as const).map((choice) => <button key={choice} type="button" aria-pressed={position === choice} onClick={() => setPosition(choice)} className={`rounded-2xl border p-3 text-left ${position === choice ? "border-gold/70 bg-gold/15" : "border-gold/20 bg-black"}`}><span className={`block text-lg font-bold ${position === choice ? "text-[#f8d56b]" : "text-white"}`}>{choice}</span><span className="mt-1 block text-xs leading-relaxed text-muted">{choice === "BUY" ? c.buyHint : c.sellHint}</span></button>)}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="min-w-0 text-xs text-muted">{c.openLabel}<input className={inputClass} inputMode="decimal" value={entry} onChange={(e) => setEntry(e.target.value)} /></label>
          <label className="min-w-0 text-xs text-muted">{c.closeLabel}<input className={inputClass} inputMode="decimal" value={exit} onChange={(e) => setExit(e.target.value)} /></label>
          <label className="min-w-0 text-xs text-muted">{c.lotLabel}<input className={inputClass} inputMode="decimal" value={lots} onChange={(e) => setLots(e.target.value)} /></label>
          <label className="min-w-0 text-xs text-muted">{c.rolloverLabel}<input className={inputClass} inputMode="numeric" value={nights} onChange={(e) => setNights(e.target.value)} /></label>
        </div>
        <div className="mt-5 rounded-2xl border border-gold/50 bg-gold/5 p-4" aria-live="polite">
          <p className="text-[11px] font-bold tracking-[0.18em] text-gold">{c.grossLabel}</p>
          {result ? <><p className={`mt-2 text-[clamp(1.6rem,7vw,2rem)] font-extrabold ${result.grossPnl < 0 ? "text-red-400" : "text-[#f8d56b]"}`}>{result.grossPnl > 0 ? "+ " : result.grossPnl < 0 ? "− " : ""}USD {formatNumber(Math.abs(result.grossPnl))}</p><p className="mt-2 text-xs text-muted">({formatNumber(position === "BUY" ? exitValue : entryValue)} − {formatNumber(position === "BUY" ? entryValue : exitValue)}) × {product.spec.ouncesPerLot} oz × {lots} lot</p></> : <p className="mt-2 text-sm text-red-300">{c.invalid}</p>}
          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-white"><LockKeyhole className="mt-0.5 size-4 shrink-0 text-[#f8d56b]" aria-hidden />{c.locked}</p>
        </div>
      </div>

      <div className="mt-5 rounded-[1.25rem] border border-gold/20 bg-gradient-to-b from-[#1b1811] to-[#0b0a08] p-4">
        <h2 className="text-xs font-bold tracking-[0.2em] text-muted">{c.methodTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-white">{c.methodGross}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{c.methodNet}</p>
        <p className="mt-3 text-xs leading-relaxed text-muted">{c.methodNote}</p>
      </div>
    </div>
  );
}
