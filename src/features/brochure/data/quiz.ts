import type { QuizQuestion } from "../types/brochure";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Tentang posisi BUY dan SELL, pernyataan mana yang benar?",
    options: [
      { id: "a", label: "Hanya BUY yang bisa mengalami kerugian." },
      { id: "b", label: "BUY maupun SELL dapat untung atau rugi." },
      { id: "c", label: "SELL pasti untung jika harga bergerak." },
    ],
    correctId: "b",
    explanation:
      "Arah harga yang berlawanan dengan posisi menimbulkan kerugian, baik pada BUY maupun SELL.",
  },
  {
    id: "q2",
    question: "Apakah biaya transaksi hanya selisih harga (spread)?",
    options: [
      { id: "a", label: "Ya, hanya spread." },
      { id: "b", label: "Tidak, ada komponen lain seperti komisi dan pajak yang perlu dicek." },
      { id: "c", label: "Tidak ada biaya sama sekali." },
    ],
    correctId: "b",
    explanation:
      "Spread bukan satu-satunya biaya. Cek komisi, pajak, dan biaya lain di kanal resmi sebelum bertransaksi.",
  },
  {
    id: "q3",
    question: "Angka pada simulasi di brosur ini adalah…",
    options: [
      { id: "a", label: "Jaminan hasil yang akan didapat." },
      { id: "b", label: "Prediksi harga emas." },
      { id: "c", label: "Ilustrasi edukatif, bukan hasil nyata." },
    ],
    correctId: "c",
    explanation:
      "Simulasi memakai data contoh untuk belajar. Hasil nyata bergantung pada harga, biaya, dan eksekusi.",
  },
];
