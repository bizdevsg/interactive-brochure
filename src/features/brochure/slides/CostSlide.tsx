import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { ChapterIntro, ChapterNote } from "../components/ChapterIntro";
import { enter, useReplayOnView } from "../components/enter";
import { costContent as c } from "../data/content";
import { slideMeta } from "../data/slides";

/** Tumpukan koin: posisi koin teratas (x, y) dan jumlah koinnya. */
const stacks = [
  { x: 43, y: 12, count: 5 },
  { x: 21, y: 28, count: 3 },
];

function CoinStacks() {
  return (
    <svg aria-hidden viewBox="0 0 64 56" className="w-[68%]">
      {stacks.map(({ x, y, count }) =>
        // Digambar dari bawah ke atas agar koin atas menutupi koin di bawahnya
        Array.from({ length: count }, (_, i) => {
          const top = y + (count - 1 - i) * 6;
          return (
            <g key={`${x}-${i}`} stroke="#5c3b00" strokeWidth={0.8}>
              <path
                d={`M${x - 15} ${top}v5a15 6 0 0 0 30 0v-5`}
                fill="#b98200"
              />
              <ellipse cx={x} cy={top} rx={15} ry={6} fill="#f6c42f" />
              <ellipse
                cx={x}
                cy={top}
                rx={9}
                ry={3.2}
                fill="#ffdc6b"
                stroke="#a87200"
              />
            </g>
          );
        }),
      )}
    </svg>
  );
}

export function CostSlide() {
  const [openId, setOpenId] = useState<string | null>(c.items[0]?.id ?? null);
  const reduceMotion = useReducedMotion();
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
        stacked
        label={slideMeta("cost").category}
        lead={c.titleLead}
        highlight={c.titleHighlight}
        description={c.description}
      />

      <ul className="mt-6 space-y-4">
        {c.items.map((item, i) => {
          const open = openId === item.id;
          const panelId = `cost-panel-${item.id}`;
          return (
            <motion.li
              key={item.id}
              {...enter({ y: 30 }, 0.5 + i * 0.12)}
              className={cn(
                "overflow-hidden rounded-[1.4rem] border bg-linear-to-b from-[#1a160c] to-[#0a0906] transition-[border-color,box-shadow]",
                open
                  ? "border-gold shadow-[0_0_14px_rgb(240_177_0/0.35)]"
                  : "border-gold/40",
              )}
            >
              <h2>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex w-full items-center gap-3.5 p-4 text-left"
                >
                  <span className="grid size-13 shrink-0 place-items-center rounded-full border border-gold">
                    <CoinStacks />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold leading-tight text-white">
                      {item.title}
                    </span>
                    {item.tagline && (
                      <span className="mt-1 block text-[15px] font-bold leading-tight text-gold">
                        {item.tagline}
                      </span>
                    )}
                  </span>
                  {/* Dua garis: garis tegak berputar menjadi datar, sehingga + berubah jadi − */}
                  <span aria-hidden className="relative size-5 shrink-0 text-gold">
                    <Minus className="absolute inset-0 size-5" />
                    <Minus
                      className={cn(
                        "absolute inset-0 size-5 transition-transform duration-300 motion-reduce:transition-none",
                        open ? "rotate-0" : "rotate-90",
                      )}
                    />
                  </span>
                </button>
              </h2>
              {/* pl-[5.125rem]: sejajar dengan judul (padding + lingkaran ikon + jarak) */}
              {/* Panel selalu ada di DOM agar tingginya bisa dianimasikan; inert saat tertutup */}
              <motion.div
                id={panelId}
                inert={!open}
                initial={false}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden"
              >
                <p className="pb-4 pl-20.5 pr-4 text-[13px] leading-snug text-muted">
                  {item.body}
                </p>
              </motion.div>
            </motion.li>
          );
        })}
      </ul>

      <ChapterNote delay={1.05}>{c.note}</ChapterNote>
    </motion.div>
  );
}
