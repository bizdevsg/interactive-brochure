import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Handshake,
  ShieldCheck,
  Smartphone,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Image } from "@/components/ui/Image";
import { cn } from "@/lib/cn";
import { ChapterIntro, ChapterNote } from "../components/ChapterIntro";
import { enter, useReplayOnView } from "../components/enter";
import { ecosystemContent as c, type EcosystemRoleId } from "../data/content";
import { slideMeta } from "../data/slides";

/** Ikon pengganti selama gambar 3D belum diisi di data/content.ts. */
const fallbackIcons: Record<EcosystemRoleId, LucideIcon> = {
  dana: Wallet,
  pengawasan: ShieldCheck,
  pialang: Handshake,
  aplikasi: Smartphone,
};

/**
 * Posisi diagram mengikuti desain, dalam koordinat viewBox "25 645 720 570".
 * Kartu memakai persen agar garis dan kartu tetap sejajar di semua lebar layar.
 */
const cardPositions: Record<EcosystemRoleId, string> = {
  dana: "left-0 top-[55.3%]",
  pengawasan: "left-[24.4%] top-[69.3%]",
  pialang: "left-[52.2%] top-[69.3%]",
  aplikasi: "left-[76.6%] top-[55.3%]",
};

/**
 * Simetris terhadap x = 385 (tengah diagram). Tiap titik berada tepat di tengah
 * kartunya: x = 25 + 720 × (left + 23.4% / 2). Ubah bersama cardPositions.
 */
const connectors = [
  { path: "M268 758C180 775 109 835 109 912", dot: [109, 912] },
  { path: "M328 868C300 892 285 940 285 998", dot: [285, 998] },
  { path: "M442 868C470 892 485 940 485 998", dot: [485, 998] },
  { path: "M502 758C590 775 661 835 661 912", dot: [661, 912] },
];

const goldFrame =
  "border border-[#f5d97a] bg-linear-to-b from-[#1a160c] to-[#0a0906] shadow-[0_0_18px_rgb(240_177_0/0.35)]";

function RoleIcon({
  image,
  Icon,
  className,
}: {
  image: string | null;
  Icon: LucideIcon;
  className?: string;
}) {
  return image ? (
    <Image src={image} alt="" className={cn("object-contain", className)} />
  ) : (
    <Icon
      aria-hidden
      strokeWidth={1.6}
      className={cn("text-gold", className)}
    />
  );
}

export function EcosystemSlide() {
  const [selected, setSelected] = useState<EcosystemRoleId>(c.roles[0].id);
  const role = c.roles.find((item) => item.id === selected) ?? c.roles[0];

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
        stacked
        label={slideMeta("ecosystem").category}
        lead={c.titleLead}
        highlight={c.titleHighlight}
        description={c.description}
      />

      {/* Diagram: Anda di tengah, terhubung ke empat peran */}
      <div className="relative -mx-1 mt-7 aspect-[720/570]">
        <svg
          aria-hidden
          viewBox="25 645 720 570"
          fill="none"
          className="absolute inset-0 size-full"
        >
          {connectors.map(({ path, dot: [cx, cy] }, i) => (
            <g key={path}>
              <motion.path
                d={path}
                stroke="#8a6a1f"
                strokeWidth={4}
                variants={{
                  hidden: { pathLength: 0, transition: { duration: 0 } },
                  shown: {
                    pathLength: 1,
                    transition: { duration: 0.6, delay: 0.7 + i * 0.1 },
                  },
                }}
              />
              <motion.circle
                cx={cx}
                cy={cy}
                r={12}
                fill="#f0b100"
                {...enter({}, 1.2 + i * 0.1, { duration: 0.3 })}
              />
            </g>
          ))}
        </svg>

        <motion.div
          {...enter({ y: -30, scale: 0.7 }, 0.45)}
          className="absolute left-[33.6%] top-[0.9%] w-[32.8%]"
        >
          <div
            className={cn(
              "flex aspect-square flex-col items-center justify-center rounded-full text-center leading-tight",
              goldFrame,
            )}
          >
            <RoleIcon
              image={c.customer.image}
              Icon={Users}
              // margin negatif memangkas ruang kosong bawaan gambar
              className="-mb-2 -mt-3 size-[62%]"
            />
            <span className="text-[13px] font-bold text-white">
              {c.customer.name}
            </span>
            <span className="w-3/4 text-[13px] leading-tight text-gold">
              {c.customer.role}
            </span>
          </div>
        </motion.div>

        {c.roles.map((item, i) => {
          const active = item.id === selected;
          return (
            <motion.div
              key={item.id}
              {...enter({ y: 30, scale: 0.7 }, 1.1 + i * 0.12, {
                type: "spring",
                stiffness: 220,
                damping: 18,
              })}
              className={cn("absolute w-[23.4%]", cardPositions[item.id])}
            >
              <button
                type="button"
                aria-pressed={active}
                aria-label={item.title}
                onClick={() => setSelected(item.id)}
                className={cn(
                  "grid aspect-square w-full place-items-center rounded-[22%] transition-transform active:scale-95",
                  goldFrame,
                )}
              >
                {/* Peran yang tidak dipilih diredupkan, bingkainya tetap emas */}
                <span
                  className={cn(
                    "grid size-[86%] place-items-center transition-opacity",
                    !active && "opacity-45",
                  )}
                >
                  <RoleIcon
                    image={item.image}
                    Icon={fallbackIcons[item.id]}
                    className="size-full"
                  />
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Rincian peran terpilih */}
      <motion.div {...enter({ y: 30 }, 1.6)} className="mt-6">
        <div aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={role.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "mx-auto flex w-[min(100%,17rem)] items-center gap-3 rounded-[1.4rem] px-4 py-3.5",
                goldFrame,
              )}
            >
              <RoleIcon
                image={role.image}
                Icon={fallbackIcons[role.id]}
                className="-mx-1.5 size-16 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold leading-tight text-white">
                  {role.title}
                </h2>
                <p className="mt-1 text-[13px] leading-tight text-muted">
                  {role.body}
                </p>
                {!role.verified && (
                  <span className="mt-2 inline-block rounded-full border border-gold/40 px-2 text-[9px] font-bold leading-4 tracking-wider text-gold/80">
                    {c.verifyBadge}
                  </span>
                )}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </motion.div>

      <ChapterNote delay={1.75}>{c.note}</ChapterNote>
    </motion.div>
  );
}
