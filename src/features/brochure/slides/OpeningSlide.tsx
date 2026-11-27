import { useEffect, useRef, useState } from "react";
import { useBrochure } from "../components/BrochureContext";
import { SlideNavigation } from "../components/SlideNavigation";
import { CoverSlide } from "./CoverSlide";
import { IntroSlide } from "./IntroSlide";

/**
 * Halaman pembuka: Intro memenuhi layar. Setelah "Buka brosur" ditekan,
 * section Sampul muncul di bawahnya dan layar bergulir ke sana.
 */
export function OpeningSlide() {
  const { coverRevealed, revealCover } = useBrochure();
  const scroller = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const openedOnMount = useRef(coverRevealed);
  const scrollPending = useRef(false);
  const [atCover, setAtCover] = useState(coverRevealed);

  const scrollTo = (top: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.current?.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  const showCover = () => {
    // Sampul selalu dibuka dari bagian atasnya
    if (coverRef.current) coverRef.current.scrollTop = 0;
    scrollTo(coverRef.current?.offsetTop ?? 0);
    coverRef.current?.focus({ preventScroll: true });
  };

  // Kembali dari bab: langsung berada di Sampul, tanpa animasi gulir.
  useEffect(() => {
    if (openedOnMount.current && scroller.current && coverRef.current) {
      scroller.current.scrollTop = coverRef.current.offsetTop;
    }
  }, []);

  // Sampul baru ada di DOM setelah state berubah, jadi gulirnya menunggu di sini.
  useEffect(() => {
    if (coverRevealed && scrollPending.current) {
      scrollPending.current = false;
      showCover();
    }
  }, [coverRevealed]);

  const open = () => {
    if (coverRevealed) return showCover();
    scrollPending.current = true;
    revealCover();
  };

  return (
    <div className="relative h-full">
      <div
        ref={scroller}
        onScroll={(e) => {
          const el = e.currentTarget;
          setAtCover(el.scrollTop > el.clientHeight * 0.6);
        }}
        // overflow-hidden: tidak bisa digulir manual, pindah section hanya lewat tombol
        className="relative h-full overflow-hidden"
      >
        <div className="h-full">
          <IntroSlide onOpen={open} />
        </div>
        {coverRevealed && (
          // Isi Sampul digulir sendiri; overscroll-contain menahan gulir agar tidak tembus
          <div
            ref={coverRef}
            tabIndex={-1}
            className="fade-under-nav h-full overflow-y-auto overflow-x-hidden overscroll-contain outline-none"
          >
            <CoverSlide />
          </div>
        )}
      </div>

      {atCover && (
        <SlideNavigation
          prevLabel="Kembali"
          nextLabel="Lanjut"
          onPrev={() => scrollTo(0)}
        />
      )}
    </div>
  );
}
