import { useEffect, useState, type RefObject } from "react";
import {
  useInView,
  type TargetAndTransition,
  type Transition,
} from "motion/react";

/**
 * true saat seperempat elemen terlihat. Baru kembali false setelah elemen praktis
 * keluar layar, sehingga animasi diputar ulang saat pengguna kembali ke sana.
 * Hasilnya dipakai lewat `animate` (bukan whileInView) karena AnimatePresence
 * initial={false} di shell dapat melewati posisi awal bila `animate` kosong.
 */
export function useReplayOnView(ref: RefObject<Element | null>) {
  const enough = useInView(ref, { amount: 0.25 });
  // Bukan "some": tepi yang hanya menempel pada layar juga dihitung terlihat.
  const visible = useInView(ref, { amount: 0.02 });
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (enough) setShown(true);
    else if (!visible) setShown(false);
  }, [enough, visible]);
  return shown;
}

export const smooth: Transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

/**
 * Animasi masuk: dari posisi awal `from` ke posisi aslinya, setelah `delay` detik.
 * Parent menentukan kapan label "hidden" berubah menjadi "shown".
 */
export const enter = (
  from: TargetAndTransition,
  delay: number,
  transition: Transition = smooth,
) => ({
  variants: {
    // Kembali ke posisi awal tanpa animasi (dipakai saat animasi di-reset)
    hidden: { opacity: 0, ...from, transition: { duration: 0 } },
    shown: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { ...transition, delay },
    },
  },
});
