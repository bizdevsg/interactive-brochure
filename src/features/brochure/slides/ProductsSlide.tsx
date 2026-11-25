import { useState } from "react";
import { comparisonRows, products, productsContent as c } from "../data/products";
import { SLIDES, slideMeta } from "../data/slides";
import type { ProductId } from "../types/brochure";

export function ProductsSlide() {
  const [selected, setSelected] = useState<ProductId>("mini");

  return (
    <div className="relative pb-4 pt-6">
      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-gold">
        <span aria-hidden className="h-px w-6 bg-gold" />
        {slideMeta("products").category}
      </div>
      <h1 className="relative mt-4 text-[clamp(1.9rem,8vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">
        {c.titleLead} <span className="text-gold">{c.titleHighlight}</span>
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted">{c.description}</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            aria-pressed={selected === product.id}
            onClick={() => setSelected(product.id)}
            className={`min-w-0 rounded-[1.25rem] border bg-gradient-to-b from-[#1b1811] to-[#0b0a08] p-4 text-left transition-colors ${selected === product.id ? "border-gold/60" : "border-gold/20"}`}
          >
            {!product.verified && <span className="inline-block rounded-full border border-gold/50 bg-gold/10 px-2 py-1 text-[9px] font-bold tracking-[0.16em] text-[#f8d56b]">{c.tempBadge}</span>}
            <span className="mt-2 block text-base font-bold text-white">{product.name}</span>
            <span className="mt-2 block text-[9px] font-bold tracking-[0.16em] text-muted">{c.minOpeningLabel}</span>
            <span className="mt-2 block text-[clamp(1.05rem,4.7vw,1.4rem)] font-extrabold tracking-tight text-[#f8d56b]">{product.minOpening}</span>
            <span className="mt-2 block text-xs text-muted">{c.unitLabel} {product.unitRange}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-[1.25rem] border border-gold/25 bg-[#15120e]">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="bg-gold text-ink">
            <tr>
              <th scope="col" className="w-[52%] px-4 py-3 text-xs font-bold">{c.parameterLabel}</th>
              {products.map((product) => <th key={product.id} scope="col" className="px-1 py-3 text-center text-xs font-bold">{product.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.key} className="border-t border-gold/15">
                <th scope="row" className="px-4 py-4 text-xs font-normal leading-relaxed text-muted">{row.label}</th>
                {products.map((product) => <td key={product.id} className={`px-1 py-4 text-center font-bold ${selected === product.id ? "text-[#f8d56b]" : "text-white"}`}>{product.rows[row.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-xs leading-relaxed text-muted">
        <span aria-hidden className="font-bold text-gold">i</span>
        <p>{c.note}</p>
      </div>
    </div>
  );
}
