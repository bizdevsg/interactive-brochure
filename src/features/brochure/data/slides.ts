import type { SlideId, SlideMeta } from "../types/brochure";

/** Urutan tampilan: halaman pembuka (Intro + Sampul), lalu slide konten. */
export const SLIDES: SlideMeta[] = [
  { id: "cover", title: "Kenali Sebelum Memulai", category: "" },
  { id: "ecosystem", title: "Siapa berperan di balik transaksi?", category: "KENALI EKOSISTEMNYA" },
  { id: "products", title: "Kenali Pilihan Akun SG Solid", category: "MINI DAN MIKRO" },
  { id: "simulation", title: "Harga Berubah. Apa Dampaknya?", category: "LATIHAN HITUNG" },
  { id: "video", title: "Video & Promo", category: "VIDEO & PROMO" },
  { id: "testimonial", title: "Cerita dari Berbagai Perspektif", category: "CERITA DARI BERBAGAI PERSPEKTIF" },
  { id: "cost", title: "Pahami Biaya Sebelum Transaksi", category: "BIAYA DAN TANYA JAWAB" },
  { id: "risk", title: "Peluang dan risiko berjalan bersama.", category: "WAJIB DIBACA", nextLabel: "Saya Sudah Membaca" },
  { id: "quiz", title: "Sudah siap belajar lebih lanjut?", category: "CEK KESIAPAN" },
  { id: "closing", title: "Lanjut lewat kanal resmi.", category: "TAUTAN RESMI", nextLabel: "Kembali ke Awal" },
];

/** Indeks slide konten pertama (setelah halaman pembuka). */
export const FIRST_CONTENT_INDEX = 1;
export const CONTENT_SLIDE_COUNT = SLIDES.length - FIRST_CONTENT_INDEX;
/** Nomor bab (1, 2, …) dari indeks tampilan. */
export const chapterNumber = (index: number) => index - FIRST_CONTENT_INDEX + 1;

/** Ambil metadata slide berdasarkan id (tidak bergantung pada urutan). */
export const slideMeta = (id: SlideId): SlideMeta => {
  const meta = SLIDES.find((s) => s.id === id);
  if (!meta) throw new Error(`Slide tidak ditemukan: ${id}`);
  return meta;
};
