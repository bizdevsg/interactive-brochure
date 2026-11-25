export type SlideId =
  | "intro"
  | "cover"
  | "ecosystem"
  | "products"
  | "simulation"
  | "video"
  | "testimonial"
  | "cost"
  | "risk"
  | "quiz"
  | "closing";

export interface SlideMeta {
  id: SlideId;
  /** Judul slide (PRD §5.2) */
  title: string;
  /** Label kategori pada header, mis. "PANDUAN PEMULA" */
  category: string;
  /** Label tombol Lanjut jika berbeda dari default */
  nextLabel?: string;
}

export type ProductId = "mini" | "mikro";

export interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; label: string }[];
  correctId: string;
  explanation: string;
}

export interface QuizState {
  /** Jawaban per pertanyaan yang sudah diperiksa: questionId → optionId */
  answers: Record<string, string>;
  current: number;
}
