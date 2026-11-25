/**
 * Konfigurasi terpusat. Semua URL/kontak WAJIB diverifikasi (PRD §6 SL-11, §14).
 * Nilai `null` = belum diverifikasi → UI menampilkan tombol nonaktif, bukan data karangan.
 */
export const siteConfig = {
  name: "SGB Interactive Brochure",
  company: "PT Solid Gold Berjangka",
  description:
    "Brosur digital interaktif pengenalan Gold Mini dan Gold Mikro melalui aplikasi Solid. Materi edukasi, bukan ajakan bertransaksi.",
  /** Isi dengan domain produksi, mis. https://brosur.example.com */
  url: import.meta.env.PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export interface OfficialLink {
  id: string;
  title: string;
  subtitle: string;
  /** null = belum diverifikasi */
  href: string | null;
}

export const officialLinks: OfficialLink[] = [
  {
    id: "website",
    title: "Situs resmi",
    subtitle: "Informasi dari kanal resmi",
    href: null,
  },
  {
    id: "android",
    title: "Unduh untuk Android",
    subtitle: "Google Play",
    href: null,
  },
  {
    id: "ios",
    title: "Unduh untuk iPhone",
    subtitle: "App Store",
    href: null,
  },
];

/** Dokumen pemberitahuan risiko resmi. null = belum tersedia. */
export const riskDocumentUrl: string | null = null;
