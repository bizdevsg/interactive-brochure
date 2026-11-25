import type { SlideId, SlideMeta } from "../types/brochure";

/** Urutan tampilan: Pembuka, Sampul, lalu slide konten. */
export const SLIDES: SlideMeta[] = [
  { id: "intro", title: "Pembuka", category: "" },
  { id: "cover", title: "Kenali Sebelum Memulai", category: "" },
  { id: "ecosystem", title: "Siapa berperan di balik transaksi?", category: "KENALI EKOSISTEMNYA" },
  { id: "products", title: "Mini atau Mikro?", category: "MINI DAN MIKRO" },
  { id: "simulation", title: "Harga berubah, apa dampaknya?", category: "SIMULASI EDUKATIF" },
  { id: "video", title: "Video & Promo — Demo", category: "VIDEO & PROMO" },
  { id: "testimonial", title: "Testimoni Nasabah — Demo", category: "TESTIMONI" },
  { id: "cost", title: "Bukan selisih harga saja.", category: "BIAYA DAN TANYA JAWAB" },
  { id: "risk", title: "Peluang dan risiko berjalan bersama.", category: "WAJIB DIBACA", nextLabel: "Saya Sudah Membaca" },
  { id: "quiz", title: "Sudah siap belajar lebih lanjut?", category: "CEK KESIAPAN" },
  { id: "closing", title: "Lanjut lewat kanal resmi.", category: "TAUTAN RESMI", nextLabel: "Kembali ke Awal" },
];

/** Indeks slide konten pertama (setelah Pembuka dan Sampul). */
export const FIRST_CONTENT_INDEX = 2;
export const CONTENT_SLIDE_COUNT = SLIDES.length - FIRST_CONTENT_INDEX;
/** Nomor bab (1, 2, …) dari indeks tampilan. */
export const chapterNumber = (index: number) => index - FIRST_CONTENT_INDEX + 1;

/** Ambil metadata slide berdasarkan id (tidak bergantung pada urutan). */
export const slideMeta = (id: SlideId): SlideMeta => {
  const meta = SLIDES.find((s) => s.id === id);
  if (!meta) throw new Error(`Slide tidak ditemukan: ${id}`);
  return meta;
};
