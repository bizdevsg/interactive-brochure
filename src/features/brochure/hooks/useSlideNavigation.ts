import { useCallback, useSyncExternalStore } from "react";
import { SLIDES } from "../data/slides";

interface NavState {
  index: number;
  dir: 1 | -1;
}

/**
 * Posisi slide dikelola client-side dan disinkronkan ke URL (?slide=N) lewat History API,
 * sehingga Back/Forward browser dan deep link berfungsi tanpa reload (PRD §7.3, §12.3).
 * Disimpan sebagai external store agar aman untuk SSR (server selalu render Cover).
 */
const SERVER_STATE: NavState = { index: 0, dir: 1 };
let state: NavState = SERVER_STATE;
const listeners = new Set<() => void>();
const total = SLIDES.length;

function emit() {
  listeners.forEach((l) => l());
}

function setIndex(next: number) {
  if (next === state.index) return;
  state = { index: next, dir: next > state.index ? 1 : -1 };
  emit();
}

function readUrlIndex(): number {
  const raw = new URLSearchParams(window.location.search).get("slide");
  const n = Number(raw);
  return raw !== null && Number.isInteger(n) && n >= 0 && n < total ? n : 0;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onPop = () => setIndex(readUrlIndex());
  window.addEventListener("popstate", onPop);
  // sinkron awal dari URL (deep link)
  setIndex(readUrlIndex());
  return () => {
    listeners.delete(listener);
    window.removeEventListener("popstate", onPop);
  };
}

export function useSlideNavigation() {
  const slideCount = total;
  const nav = useSyncExternalStore(
    subscribe,
    () => state,
    () => SERVER_STATE,
  );

  const goTo = useCallback((target: number) => {
    const next = Math.min(Math.max(target, 0), total - 1);
    if (next === state.index) return;
    const url = new URL(window.location.href);
    if (next === 0) url.searchParams.delete("slide");
    else url.searchParams.set("slide", String(next));
    window.history.pushState(null, "", url);
    setIndex(next);
  }, []);

  return {
    index: nav.index,
    dir: nav.dir,
    goTo,
    next: useCallback(() => goTo(state.index + 1), [goTo]),
    prev: useCallback(() => goTo(state.index - 1), [goTo]),
    isFirst: nav.index === 0,
    isLast: nav.index === slideCount - 1,
  };
}
