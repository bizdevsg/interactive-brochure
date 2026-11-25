# SGB Interactive Brochure (versi Astro)

Clone dari `interactive-brochure` (Next.js). Framework diganti ke Astro; UI interaktif tetap React (island dengan `client:load`).

## Perintah

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Dev server di http://localhost:4321 |
| `npm run build` | Build statis ke `dist/` |
| `npm run preview` | Menjalankan hasil build |
| `npm test` | Unit test simulasi |
| `npm run typecheck` | `astro check` |

## Struktur

- `src/pages/index.astro` — halaman utama
- `src/layouts/BaseLayout.astro` — head, metadata, font
- `src/features/brochure/`, `src/components/`, `src/lib/`, `src/config/` — kode brosur
- `src/styles/globals.css` — tema Tailwind v4

## Beda dari versi Next.js

- `next/image` diganti `src/components/ui/Image.tsx` (<img> biasa, tanpa optimasi otomatis). Kompres gambar sebelum ditaruh di `public/images/`.
- `next/font` diganti `@fontsource-variable/plus-jakarta-sans`.
- Env var domain produksi: `PUBLIC_SITE_URL` (dulu `NEXT_PUBLIC_SITE_URL`).
- ESLint belum dikonfigurasi (config lama khusus Next.js).
