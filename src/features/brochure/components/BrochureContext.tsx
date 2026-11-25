import { createContext, useContext } from "react";
import type { QuizState } from "../types/brochure";

export interface BrochureContextValue {
  index: number;
  goTo: (i: number) => void;
  next: () => void;
  prev: () => void;
  openRisk: () => void;
  /** true setelah pengguna berpindah slide (untuk memindah fokus secara terkontrol) */
  navigated: boolean;
  quiz: QuizState;
  setQuiz: (q: QuizState) => void;
}

export const BrochureContext = createContext<BrochureContextValue | null>(null);

export function useBrochure(): BrochureContextValue {
  const ctx = useContext(BrochureContext);
  if (!ctx) throw new Error("useBrochure harus dipakai di dalam BrochureShell");
  return ctx;
}
