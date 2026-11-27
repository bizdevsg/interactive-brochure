import { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { ChapterIntro, ChapterNote } from "../components/ChapterIntro";
import { enter, useReplayOnView } from "../components/enter";
import {
  comparisonRows,
  products,
  productsContent as c,
} from "../data/products";
import { slideMeta } from "../data/slides";
import type { ProductId } from "../types/brochure";

export function ProductsSlide() {
  const [selected, setSelected] = useState<ProductId>("mini");

  // Animasi dikendalikan lewat state, sehingga tetap jalan di dalam AnimatePresence
  const rootRef = useRef<HTMLDivElement>(null);
  const shown = useReplayOnView(rootRef);

  return (
    <motion.div
      ref={rootRef}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      className="relative pb-4 pt-4"
    >
      <ChapterIntro
        label={slideMeta("products").category}
        lead={c.titleLead}
        highlight={c.titleHighlight}
        description={c.description}
      />

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {products.map((product, i) => {
          const active = selected === product.id;
          return (
            // Kedua kartu masuk dari sisinya masing-masing
            <motion.div
              key={product.id}
              {...enter({ x: i === 0 ? -80 : 80, scale: 0.9 }, 0.5 + i * 0.1, {
                type: "spring",
                stiffness: 200,
                damping: 20,
              })}
              className="min-w-0"
            >
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(product.id)}
                className={cn(
                  "flex h-full w-full flex-col items-start rounded-[1.25rem] border border-gold bg-linear-to-b from-[#1c1810] to-[#0d0b07] px-3.5 py-3.5 text-left transition-[box-shadow,transform] active:scale-95",
                  // Kartu terpilih dibedakan dengan bingkai tebal dan cahaya
                  active &&
                    "ring-1 ring-gold shadow-[0_0_20px_rgb(240_177_0/0.35)]",
                )}
              >
                <span className="text-[17px] font-bold leading-tight text-white">
                  {product.name}
                </span>
                <span className="mt-2 text-[10px] font-bold text-muted/70">
                  {c.minOpeningLabel}
                </span>
                <span className="mt-1 whitespace-nowrap text-[clamp(1.15rem,6vw,1.45rem)] font-bold leading-tight text-[#f2c94c]">
                  {product.minOpening}
                </span>
                <span className="mt-2 text-[13px] text-muted">
                  {c.unitLabel} {product.unitRange}
                </span>
                {/* {!product.verified && (
                  <span className="mt-2 rounded-full border border-gold/40 px-2 text-[9px] font-bold leading-4 tracking-wider text-gold/80">
                    {c.tempBadge}
                  </span>
                )} */}
              </button>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        {...enter({ y: 40 }, 0.75)}
        className="mt-5 overflow-hidden rounded-[1.25rem] border border-gold bg-[#17130d]"
      >
        <table className="w-full table-fixed text-left">
          <thead className="bg-[#f7d117] text-[13px] uppercase text-black">
            <tr>
              <th scope="col" className="py-3 pl-4 pr-2 font-bold">
                {c.parameterLabel}
              </th>
              {products.map((product) => (
                <th
                  key={product.id}
                  scope="col"
                  className="w-14 py-3 pr-2 text-right font-bold last:w-16 last:pr-4"
                >
                  {product.shortName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <motion.tr
                key={row.key}
                {...enter({}, 0.95 + i * 0.07, { duration: 0.4 })}
                className="border-t border-gold/20"
              >
                <th
                  scope="row"
                  className="py-3 pl-4 pr-2 text-[13px] font-normal leading-snug text-muted"
                >
                  {row.label}
                </th>
                {products.map((product) => (
                  <td
                    key={product.id}
                    className={cn(
                      "py-3 pr-2 text-right text-sm font-bold text-white transition-colors last:pr-4",
                      selected === product.id && "bg-gold/5",
                    )}
                  >
                    {product.rows[row.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <ChapterNote delay={1.5}>{c.note}</ChapterNote>
    </motion.div>
  );
}
