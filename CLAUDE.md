> Catatan: clone ini memakai **Astro + React islands**, bukan Next.js. Bagian PRD yang menyebut Next.js (§9) tidak berlaku untuk framework; lihat README.md.

# PRODUCT REQUIREMENTS DOCUMENT

# SGB — Interactive Mobile Brochure

**PT Solid Gold Berjangka**

| Document Information | Detail                                          |
| -------------------- | ----------------------------------------------- |
| Document Version     | 2.0                                             |
| Document Status      | Draft for Development                           |
| Project              | SGB Interactive Mobile Brochure                 |
| Company              | PT Solid Gold Berjangka                         |
| Platform             | Mobile Web                                      |
| Framework            | Next.js App Router                              |
| Primary Viewport     | 390 × 844 px                                    |
| Design Concept       | Premium Dark & Gold                             |
| Brand Primary        | `#F0B100`                                       |
| Brand Background     | `#131313`                                       |
| Primary Language     | Bahasa Indonesia                                |
| Secondary Language   | English, jika materi terjemahan telah disetujui |

---

# 1. Product Overview

## 1.1 Background

PT Solid Gold Berjangka membutuhkan brosur digital interaktif yang memberikan pengalaman pengenalan produk Gold Mini melalui smartphone.

Brosur akan digunakan sebagai media edukasi, presentasi, dan pengenalan layanan perusahaan kepada calon nasabah maupun masyarakat umum.

Berbeda dengan website konvensional, brosur ini menggunakan pendekatan **mobile interactive presentation** dengan perpindahan slide secara bertahap.

Setiap slide memiliki konten edukasi dan elemen interaktif untuk memudahkan pengguna memahami materi.

## 1.2 Product Vision

Menciptakan pengalaman brosur digital yang modern, premium, ringan, dan interaktif, dengan identitas visual PT Solid Gold Berjangka.

Pengalaman pengguna harus terasa seperti membuka aplikasi mobile, tetapi tetap dapat diakses menggunakan browser tanpa instalasi.

## 1.3 Product Objectives

1. Memperkenalkan produk Gold Mini.
2. Membantu pengguna memahami konsep perdagangan Gold Mini secara bertahap.
3. Memperkenalkan aplikasi Solid.
4. Menjelaskan konsep harga, spread, dan risiko.
5. Menyajikan video demonstrasi dan materi testimoni yang telah disetujui.
6. Memberikan pengalaman edukasi melalui kuis interaktif.
7. Mengarahkan pengguna menuju kanal informasi resmi SGB.
8. Menyediakan brosur digital yang mudah dibagikan melalui URL atau QR Code.

## 1.4 Non-Goals

Brosur tidak digunakan untuk:

- Melakukan transaksi perdagangan secara langsung.
- Mengelola dana atau rekening pengguna.
- Memberikan rekomendasi investasi personal.
- Memberikan sinyal trading.
- Menjanjikan keuntungan.
- Menggantikan dokumen pemberitahuan risiko atau perjanjian resmi.

---

# 2. Target Users

## 2.1 Primary Users

**Calon Nasabah**

Pengguna yang ingin memahami produk Gold Mini sebelum mencari informasi lebih lanjut.

## 2.2 Secondary Users

**Marketing dan Relationship Officer SGB**

Menggunakan brosur sebagai media presentasi digital pada smartphone.

## 2.3 General Audience

Masyarakat umum yang ingin memperoleh edukasi pengenalan perdagangan berjangka.

## 2.4 User Characteristics

- Mayoritas mengakses melalui smartphone.
- Mengutamakan informasi ringkas.
- Terbiasa menggunakan navigasi sentuh.
- Memerlukan penjelasan sederhana dan bertahap.
- Dapat memiliki pengetahuan perdagangan yang terbatas.

---

# 3. Platform & Display Requirements

## 3.1 Mobile-Only Design

Brosur hanya memiliki satu desain utama, yaitu mobile portrait.

**Design baseline: 390 × 844 px.**

| Parameter            | Specification          |
| -------------------- | ---------------------- |
| Primary Design       | 390 × 844 px           |
| Minimum Width        | 320px                  |
| Main Support         | 360–430px              |
| Maximum Layout Width | 430px                  |
| Design Orientation   | Portrait               |
| Application Type     | Mobile Web             |
| Interaction          | Touch, mouse, keyboard |
| Installation         | Tidak diperlukan       |

390 × 844 digunakan sebagai baseline desain, bukan ukuran viewport yang dipaksakan secara absolut.

## 3.2 Desktop Behavior

Pada desktop:

- Menampilkan brosur dalam container maksimal 430px.
- Container diposisikan horizontal center.
- Background luar menggunakan `#131313`.
- Tidak membuat layout desktop terpisah.
- Mendukung navigasi dengan mouse dan keyboard.
- Tidak meregangkan UI untuk memenuhi layar desktop.

## 3.3 Viewport Adaptation

Sistem harus mendukung berbagai tinggi layar.

Ketentuan:

- Gunakan dynamic viewport units jika diperlukan.
- Hormati safe-area perangkat.
- Hindari konten tertutup browser navigation.
- Konten panjang boleh menggunakan internal scrolling.
- Navigasi slide harus mudah dijangkau.
- Hindari horizontal overflow yang tidak disengaja.

---

# 4. Design System

## 4.1 Design Direction

**Theme: SGB Premium Dark & Gold**

Karakter visual:

- Premium.
- Elegant.
- Modern.
- Minimalist.
- Professional.
- High contrast.
- Immersive.
- Consistent.

Desain mengikuti referensi screenshot yang diberikan dengan penggunaan background gelap, aksen emas, kartu informasi, garis dekoratif, dan transisi antar-slide.

## 4.2 Core Color Palette

| Token        | HEX       | Description     |
| ------------ | --------- | --------------- |
| Primary Gold | `#F0B100` | Primary accent  |
| Primary Dark | `#131313` | Main background |

Kedua warna merupakan warna utama yang ditentukan untuk project.

## 4.3 Supporting Color Palette

| Token            | HEX       | Usage                |
| ---------------- | --------- | -------------------- |
| Background Deep  | `#0A0A0A` | Variasi background   |
| Surface          | `#1C1C1C` | Cards                |
| Surface Elevated | `#252525` | Modal / bottom sheet |
| Border           | `#333333` | Border elements      |
| Foreground       | `#FFFFFF` | Primary text         |
| Text Muted       | `#A3A3A3` | Secondary text       |
| Gold Soft        | `#D9A000` | Gold variation       |

Supporting colors adalah rekomendasi teknis, bukan warna resmi tambahan dari brand guideline.

## 4.4 Color Usage

**Primary Background**

Seluruh area utama brosur menggunakan `#131313` atau warna gelap yang konsisten.

**Gold Accent**

Gunakan `#F0B100` untuk:

- CTA utama.
- Headline highlight.
- Active state.
- Progress indicator.
- Icons tertentu.
- Border highlight.
- Interactive focus.
- Decorative elements.

**Typography**

- Heading: White.
- Important highlight: Gold.
- Body: White / neutral.
- Secondary description: Muted gray.

**Primary Button**

- Background: `#F0B100`.
- Text: `#131313`.
- Border radius: pill atau rounded sesuai referensi.
- Pressed state harus terlihat.
- Disabled state harus tetap terbaca.

**Secondary Button**

- Background: transparent / dark.
- Border: dark gold atau muted.
- Text: White.
- Active indicator: Gold.

## 4.5 Typography

Gunakan **Inter** atau **Plus Jakarta Sans**, kecuali tersedia font resmi dari brand guideline.

| Element         | Size    |
| --------------- | ------- |
| Display         | 32–40px |
| Main Heading    | 24–32px |
| Section Heading | 20–24px |
| Card Title      | 14–18px |
| Body            | 14–16px |
| Supporting Text | 12–14px |
| Micro Label     | 10–12px |

Font size boleh menyesuaikan kebutuhan viewport, tetapi informasi utama harus tetap mudah dibaca.

## 4.6 Layout Spacing

- Horizontal padding: 20px.
- Section gap: 16–24px.
- Card padding: 12–16px.
- Main card radius: 12–20px.
- Button height: minimum 44px.
- Touch target: minimum 44 × 44px.
- Safe-area padding wajib diperhitungkan.

## 4.7 Decorative Elements

Mengikuti referensi:

- Subtle gold diagonal light.
- Radial glow.
- Dark textured background.
- Thin gold separators.
- Decorative slide numbering.
- Gold gradient accents.

Aturan:

- Efek dekoratif tidak boleh mengurangi keterbacaan.
- Hindari animasi glow terus-menerus yang berat.
- Gunakan CSS jika efek dapat dibuat tanpa gambar tambahan.

---

# 5. Brochure Architecture

## 5.1 Presentation Model

Brosur menggunakan model:

**1 Cover + 11 Content Slides**

Total terdapat 12 tampilan.

Setiap slide merupakan komponen independen yang dirender di dalam presentation container.

Perpindahan antarslide menggunakan state client-side dan tidak memerlukan navigasi route Next.js baru pada setiap slide.

## 5.2 Slide Structure

| Screen | Slide Name                         |
| ------ | ---------------------------------- |
| Cover  | Kenali Sebelum Memulai             |
| 01     | Kenali Emas, Pahami Caranya        |
| 02     | Siapa Berperan di Balik Transaksi? |
| 03     | Mini atau Mikro?                   |
| 04     | Lihat Solid Lebih Dekat            |
| 05     | Harga Berubah, Apa Dampaknya?      |
| 06     | Video & Promo Demo                 |
| 07     | Testimoni Nasabah Demo             |
| 08     | Bukan Selisih Harga Saja           |
| 09     | Peluang dan Risiko                 |
| 10     | Sudah Siap Belajar Lebih Lanjut?   |
| 11     | Lanjut Lewat Kanal Resmi           |

Judul dan urutan mengikuti referensi visual. Copy final harus diverifikasi terhadap materi SGB yang telah disetujui.

---

# 6. Detailed Slide Requirements

## SL-00 — Interactive Cover

**Priority: P0**

### Objective

Memberikan first impression premium dan memperkenalkan identitas SGB.

### UI Components

- Logo SGB.
- Dark background.
- Decorative gold light.
- Hero visual aplikasi pada smartphone.
- Main headline.
- Supporting description.
- Primary CTA.

### Main Copy

**Kenali Sebelum Memulai**

### CTA

**Mulai Membaca**

### Interaction

- Entrance animation.
- Subtle image reveal.
- CTA menuju Slide 01.
- Optional subtle floating animation pada hero image.

### Acceptance Criteria

- Cover tampil dengan baik di 390 × 844.
- CTA terlihat dan dapat ditekan.
- Gambar tidak mengalami distorsi.
- Tidak ada horizontal overflow.
- Tetap berfungsi dengan reduced motion.

---

## SL-01 — Kenali Emas, Pahami Caranya

**Priority: P0**

### Objective

Memperkenalkan konsep dasar Gold Mini.

### UI Components

- Header SGB / Solid Mini.
- Language selector.
- Slide number dekoratif.
- Section label.
- Main headline.
- Description.
- Gold illustration.
- Product introduction cards.
- Navigation buttons.

### Interaction

- Tap pada kartu informasi.
- Animated card reveal.
- Kembali ke Cover.
- Lanjut ke Slide 02.

### Content Requirements

Materi harus menjelaskan pengenalan Gold Mini secara ringkas, tanpa memberikan janji keuntungan.

---

## SL-02 — Siapa Berperan di Balik Transaksi?

**Priority: P0**

### Objective

Menjelaskan pihak-pihak yang terlibat dalam ekosistem perdagangan.

### UI Components

- Headline.
- Supporting description.
- Interactive participant selector.
- Diagram hubungan antar-pihak.
- Informational cards.
- Navigation controls.

### Interaction

- Tap setiap peserta untuk membuka detail.
- Active item menggunakan Gold.
- Detail ditampilkan dalam expandable card.
- User dapat kembali ke diagram tanpa berpindah slide.

### Content Requirements

Nama pihak, peran, dan hubungan kelembagaan harus sesuai informasi yang benar dan terverifikasi.

---

## SL-03 — Mini atau Mikro?

**Priority: P0**

### Objective

Memberikan pemahaman mengenai perbedaan produk atau spesifikasi kontrak.

### UI Components

- Two-column product comparison.
- Product cards.
- Comparison table.
- Highlighted information.
- Supporting note.

### Interaction

- Product selection.
- Highlight selected product.
- Scrollable comparison bila diperlukan.
- Navigation controls.

### Data Requirements

Setiap angka dan spesifikasi wajib bersumber dari dokumen kontrak resmi yang berlaku.

### Acceptance Criteria

- Tabel tetap terbaca pada layar 320px.
- Tidak ada kolom yang terpotong.
- Informasi produk tidak hanya dibedakan berdasarkan warna.
- Nilai tidak boleh di-hardcode tanpa sumber yang disetujui.

---

## SL-04 — Lihat Solid Lebih Dekat

**Priority: P0**

### Objective

Memperkenalkan aplikasi Solid sebagai salah satu kanal layanan perusahaan.

### UI Components

- Application showcase.
- Device mockup.
- Short description.
- Feature highlights.
- Interactive previews.

### Interaction

- Tap fitur aplikasi untuk melihat penjelasan.
- Optional image carousel.
- Animated device entrance.

### Requirements

- Screenshot aplikasi menggunakan aset yang disetujui.
- Tidak menggambarkan fungsi aplikasi yang belum tersedia.
- Tidak menampilkan informasi akun atau transaksi asli.

---

## SL-05 — Harga Berubah, Apa Dampaknya?

**Priority: P0**

### Objective

Menjelaskan pengaruh perubahan harga terhadap skenario posisi perdagangan.

### UI Components

- Segmented control Gold Mini / Gold Mikro.
- BUY / SELL selector.
- Price information.
- Example calculation.
- Simulated outcome card.
- Risk explanation.

### Interaction

Pengguna dapat:

1. Memilih jenis kontrak.
2. Memilih skenario BUY atau SELL.
3. Melihat perubahan hasil simulasi.
4. Membaca penjelasan mengenai potensi keuntungan dan kerugian.

### Calculation Requirements

- Gunakan data simulasi edukatif.
- Formula harus sesuai spesifikasi kontrak yang disetujui.
- Jelaskan asumsi perhitungan.
- Sertakan biaya dan risiko apabila relevan.
- Jangan menampilkan simulasi sebagai janji hasil nyata.
- Angka dalam referensi desain tidak otomatis menjadi spesifikasi resmi.

### Acceptance Criteria

- Perubahan pilihan memperbarui seluruh angka terkait.
- Format angka konsisten.
- Tidak terdapat perhitungan dengan nilai `NaN` atau `Infinity`.
- Skenario kerugian disajikan secara seimbang.
- Semua perhitungan memiliki automated unit tests.

---

## SL-06 — Video & Promo Demo

**Priority: P0**

### Objective

Menyajikan demonstrasi visual penggunaan aplikasi atau pengenalan materi.

### UI Components

- Video thumbnail.
- Play button.
- Video player.
- Supporting description.
- Navigation controls.

### Interaction

- Tap untuk memutar video.
- Pause / resume.
- Mute / unmute.
- Playback controls.
- Full-screen jika browser mendukung.

### Media Requirements

- Video tidak autoplay dengan suara.
- Thumbnail dioptimasi.
- Video menggunakan lazy loading.
- Video memiliki caption atau ringkasan yang sesuai.
- Materi promosi memerlukan persetujuan yang berlaku.

---

## SL-07 — Testimoni Nasabah Demo

**Priority: P0**

### Objective

Menyampaikan ilustrasi pengalaman penggunaan layanan melalui materi testimoni atau demonstrasi yang telah disetujui.

### UI Components

- Testimonial card.
- Quote.
- Source attribution.
- Supporting information.
- Navigation controls.

### Interaction

- Testimonial carousel jika tersedia lebih dari satu.
- Swipe horizontal.
- Tap untuk mengganti testimonial.

### Compliance Requirements

- Testimoni asli memerlukan bukti dan izin penggunaan.
- Konten demonstrasi tidak boleh disamarkan sebagai pengalaman nasabah nyata.
- Tidak boleh menjanjikan hasil perdagangan yang sama bagi pengguna lain.
- Gunakan penanda "Demo" jika kontennya hanya simulasi.

---

## SL-08 — Bukan Selisih Harga Saja

**Priority: P0**

### Objective

Mengedukasi pengguna tentang spread, biaya, dan komponen biaya transaksi lainnya.

### UI Components

- Spread explanation card.
- Fee information cards.
- Expandable accordion.
- Highlighted key messages.
- Navigation controls.

### Interaction

- Tap untuk membuka penjelasan biaya.
- Accordion open / close.
- Active state menggunakan Gold.

### Requirements

- Informasi biaya berasal dari dokumen resmi yang berlaku.
- Seluruh asumsi harus dijelaskan.
- Tidak menyembunyikan biaya penting.
- Tidak menggunakan angka perkiraan tanpa label yang sesuai.

---

## SL-09 — Peluang dan Risiko

**Priority: P0 — Compliance Critical**

### Objective

Memberikan penjelasan risiko secara jelas sebelum pengguna mencapai CTA akhir.

### UI Components

- Red / warning accent hanya untuk informasi risiko yang sesuai.
- Risk warning card.
- Opportunity information.
- Risk explanation cards.
- Supporting disclosure.
- Navigation controls.

### Main Content

- Potensi keuntungan.
- Potensi kerugian.
- Risiko perubahan harga.
- Risiko leverage jika relevan.
- Pentingnya memahami karakteristik kontrak.
- Akses menuju dokumen risiko resmi.

### Interaction

- Expandable risk information.
- Link menuju dokumen pemberitahuan risiko.

### Requirements

- Konten risiko wajib mudah ditemukan.
- Tidak boleh menyamarkan risiko dengan animasi.
- Materi harus seimbang.
- CTA tidak boleh menekan pengguna untuk segera bertransaksi.

---

## SL-10 — Sudah Siap Belajar Lebih Lanjut?

**Priority: P0**

### Objective

Mengukur pemahaman awal pengguna melalui kuis edukasi.

### UI Components

- Quiz title.
- Current question.
- Progress indicator.
- Answer options.
- Selected state.
- Feedback message.
- Navigation controls.

### Interaction

1. Tampilkan satu pertanyaan.
2. User memilih jawaban.
3. User mengirim atau memeriksa jawaban.
4. Sistem memberikan feedback.
5. User melanjutkan ke pertanyaan berikutnya.

### Requirements

- Gunakan 3–5 pertanyaan untuk MVP.
- Satu jawaban untuk setiap pertanyaan, kecuali dinyatakan lain.
- Setiap feedback memiliki penjelasan singkat.
- Kuis tidak menjadi syarat untuk mengakses kanal resmi.
- Tidak mengumpulkan identitas pribadi.
- Tidak menganggap hasil kuis sebagai penilaian kesesuaian investasi.

### Acceptance Criteria

- Pengguna tidak dapat mengirim jawaban kosong.
- Jawaban dapat dipilih dengan keyboard.
- Progress diperbarui secara akurat.
- Hasil kuis tidak menyesatkan.

---

## SL-11 — Lanjut Lewat Kanal Resmi

**Priority: P0**

### Objective

Menutup pengalaman brosur dan memudahkan pengguna mengakses informasi resmi perusahaan.

### UI Components

- Closing headline.
- Supporting description.
- Official website card.
- Official contact card.
- Share brochure button.
- Back navigation.
- Company footer.

### Interaction

- Open official website.
- Open verified contact channel.
- Share brochure.
- Copy brochure URL.
- Kembali ke slide sebelumnya.
- Optional restart brochure.

### Requirements

- Semua URL harus diverifikasi.
- Informasi perusahaan harus konsisten.
- Tidak menggunakan kontak pribadi yang belum disetujui.
- Tampilkan akses ke informasi risiko jika diperlukan.

---

# 7. Global Navigation System

## 7.1 Navigation Model

Brosur menggunakan navigasi sequential slide.

### Main Controls

- Kembali.
- Lanjut.
- Progress indicator.
- Current slide state.
- Language selector.

## 7.2 Navigation Behavior

**Kembali**

Membuka slide sebelumnya.

**Lanjut**

Membuka slide berikutnya.

**Cover CTA**

Membuka Slide 01.

**Final Slide**

Menyediakan CTA resmi dan opsi kembali atau memulai ulang.

## 7.3 Navigation Rules

- Tidak melakukan full-page reload saat mengganti slide.
- Posisi slide dikelola melalui state.
- Transisi tidak memblokir interaksi.
- Tombol disabled ketika navigasi tidak tersedia.
- State slide tetap konsisten ketika browser Back / Forward digunakan.
- Gunakan URL fragment atau parameter yang sesuai agar slide tertentu bisa dibuka langsung.
- Scroll position direset ketika membuka slide baru, kecuali ada alasan UX yang berbeda.

## 7.4 Navigation Placement

Mengikuti referensi desain:

- Progress berada dekat navigasi bawah.
- Tombol Kembali di sebelah kiri.
- Tombol Lanjut di sebelah kanan.
- Tombol aktif menggunakan Gold.
- Navigasi tetap mudah dijangkau ketika konten slide panjang.

## 7.5 Swipe Behavior

Untuk MVP:

- Horizontal swipe hanya wajib untuk carousel.
- Perpindahan slide utama menggunakan tombol.
- Swipe antarslide dapat ditambahkan setelah diuji agar tidak berbenturan dengan carousel dan scrolling.

---

# 8. Animation & Motion System

## 8.1 Animation Library

Gunakan **Motion for React**.

## 8.2 Transition Types

- Fade.
- Slide horizontal.
- Slide vertical.
- Scale reveal.
- Staggered entrance.
- Subtle glow.
- Card transition.
- Progress transition.

## 8.3 Slide Transition

Saat pengguna menekan Lanjut:

1. Slide lama menjalankan exit animation.
2. Konten slide baru dirender.
3. Slide baru menjalankan entrance animation.
4. Fokus keyboard dipindahkan secara terkontrol.
5. State navigasi diperbarui.

## 8.4 Animation Timing

| Animation          | Recommended Duration   |
| ------------------ | ---------------------- |
| Button feedback    | 100–180ms              |
| Card transition    | 200–350ms              |
| Slide transition   | 300–450ms              |
| Entrance animation | 300–600ms              |
| Decorative motion  | Menyesuaikan kebutuhan |

## 8.5 Performance Rules

- Prioritaskan transform dan opacity.
- Gunakan GPU-friendly animations.
- Hindari animasi layout besar.
- Jangan menjalankan banyak animasi kompleks bersamaan.
- Implementasikan `prefers-reduced-motion`.
- Pastikan seluruh konten tetap bisa diakses ketika JavaScript animation dimatikan, sejauh memungkinkan.

---

# 9. Technical Architecture

## 9.1 Technology Stack

| Category        | Technology            |
| --------------- | --------------------- |
| Framework       | Next.js App Router    |
| Language        | TypeScript            |
| UI              | React                 |
| Styling         | Tailwind CSS v4       |
| Animation       | Motion                |
| Icons           | Lucide React          |
| State           | React Hooks / Context |
| Images          | Next Image            |
| Fonts           | Next Font             |
| Package Manager | npm                   |

## 9.2 Rendering Strategy

Gunakan pendekatan hybrid:

**Server Components**

- Page shell.
- Initial content.
- SEO metadata.
- Static data delivery.

**Client Components**

- Slide controller.
- Slide transitions.
- Interactive cards.
- Comparison selectors.
- Calculation simulator.
- Quiz.
- Video controls.

Tujuan: mengurangi JavaScript client yang tidak diperlukan.

## 9.3 Application Architecture

```text
Next.js App Router
       |
       v
Brochure Page
       |
       v
Brochure Shell
       |
       +-- Slide Controller
       |
       +-- Progress Indicator
       |
       +-- Slide Navigation
       |
       +-- Language Selector
       |
       +-- Active Slide
              |
              +-- Slide Content
              +-- Slide Interactions
              +-- Slide Animations
```

## 9.4 Proposed Folder Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── features/
│   └── brochure/
│       ├── components/
│       │   ├── BrochureShell.tsx
│       │   ├── SlideController.tsx
│       │   ├── SlideHeader.tsx
│       │   ├── SlideNavigation.tsx
│       │   ├── SlideProgress.tsx
│       │   └── LanguageSelector.tsx
│       │
│       ├── slides/
│       │   ├── CoverSlide.tsx
│       │   ├── IntroductionSlide.tsx
│       │   ├── TransactionSlide.tsx
│       │   ├── ComparisonSlide.tsx
│       │   ├── SolidAppSlide.tsx
│       │   ├── SimulationSlide.tsx
│       │   ├── VideoSlide.tsx
│       │   ├── TestimonialSlide.tsx
│       │   ├── CostSlide.tsx
│       │   ├── RiskSlide.tsx
│       │   ├── QuizSlide.tsx
│       │   └── ClosingSlide.tsx
│       │
│       ├── data/
│       │   ├── slides.ts
│       │   ├── products.ts
│       │   ├── quiz.ts
│       │   └── content.ts
│       │
│       ├── hooks/
│       │   ├── useSlideNavigation.ts
│       │   └── useBrochureProgress.ts
│       │
│       └── types/
│           └── brochure.ts
│
├── components/
│   └── ui/
│
├── lib/
└── config/

public/
├── images/
├── icons/
├── videos/
└── fonts/
```

## 9.5 Component Architecture

Semua slide menggunakan shared components.

Minimal shared components:

- GoldButton.
- OutlineButton.
- SlideHeader.
- SlideFooter.
- ProgressIndicator.
- InformationCard.
- ComparisonCard.
- ExpandableCard.
- VideoPlayer.
- QuizOption.
- SegmentedControl.
- Modal / BottomSheet.

Dilarang menduplikasi implementasi UI yang fungsinya sama tanpa alasan teknis.

## 9.6 State Management

Gunakan React state dan Context jika diperlukan.

State minimal:

- `currentSlide`.
- `activeLanguage`.
- `selectedProduct`.
- `selectedPosition`.
- `quizAnswers`.
- `quizCurrentQuestion`.
- `videoState`.

State yang hanya digunakan pada satu slide sebaiknya tetap lokal pada slide tersebut.

## 9.7 Content Configuration

Semua konten harus terpisah dari UI.

Setiap slide memiliki:

- ID.
- Title.
- Category.
- Description.
- Content data.
- Navigation metadata.
- Media references.

Konten bisnis disimpan melalui konfigurasi terpusat.

---

# 10. Localization

## 10.1 Supported Languages

- Bahasa Indonesia: default.
- English: secondary, jika disetujui.

## 10.2 Language Switcher

Posisi mengikuti referensi, yaitu pada header bagian kanan.

## 10.3 Requirements

- Bahasa dapat diganti tanpa full reload.
- Active slide dipertahankan.
- Seluruh UI menggunakan bahasa terpilih.
- Format angka mengikuti konteks bahasa dan materi.
- Konten produk dan risiko harus memiliki terjemahan yang disetujui.
- Jika terjemahan belum tersedia, opsi bahasa tersebut tidak ditampilkan pada production.

---

# 11. Non-Functional Requirements

## 11.1 Performance Targets

| Metric                   | Target        |
| ------------------------ | ------------- |
| Lighthouse Performance   | ≥ 90          |
| Lighthouse Accessibility | ≥ 90          |
| LCP                      | ≤ 2.5 detik   |
| INP                      | ≤ 200ms       |
| CLS                      | ≤ 0.1         |
| Animation Frame Rate     | Target 60 FPS |

Pengujian dilakukan pada production build dengan kondisi perangkat dan jaringan yang terdokumentasi.

## 11.2 Mobile Optimization

- Lazy-load video.
- Optimize hero images.
- Gunakan responsive assets.
- Hindari video autoplay.
- Minimalkan JavaScript initial bundle.
- Batasi komponen interaktif yang dimuat pada awal brosur.
- Gunakan dynamic imports untuk modul berat apabila diperlukan.
- Hindari library tambahan yang tidak memberikan manfaat jelas.

## 11.3 Accessibility

Target WCAG 2.2 AA.

Requirements:

- Semantic HTML.
- Keyboard navigation.
- Visible focus.
- Sufficient color contrast.
- Reduced motion.
- Screen-reader labels.
- Touch targets yang memadai.
- Informasi tidak bergantung pada warna saja.
- Tidak ada keyboard trap pada slide, modal, atau video player.

## 11.4 Browser Support

- Chrome Android.
- Samsung Internet.
- Safari iOS.
- Microsoft Edge.
- Desktop Chrome untuk mode preview.

---

# 12. SEO & Sharing

## 12.1 SEO

- Page title.
- Meta description.
- Canonical URL.
- Open Graph metadata.
- Social sharing image.
- Relevant structured data jika sesuai.

## 12.2 Sharing

Pengguna dapat:

- Copy URL.
- Share melalui native sharing.
- Membuka brosur dari QR Code.

## 12.3 Direct Slide Access

Dukung pembukaan slide tertentu menggunakan URL, tanpa mengorbankan pengalaman navigasi.

Contoh konsep:

`/brochure?slide=5`

Implementasi final boleh menggunakan query parameter atau URL fragment.

---

# 13. Analytics

## 13.1 Core Events

| Event               | Description                  |
| ------------------- | ---------------------------- |
| brochure_open       | Membuka brosur               |
| brochure_start      | Menekan Mulai Membaca        |
| slide_view          | Melihat slide                |
| slide_next          | Navigasi lanjut              |
| slide_previous      | Navigasi kembali             |
| product_select      | Memilih produk               |
| simulation_interact | Berinteraksi dengan simulasi |
| video_play          | Memutar video                |
| quiz_answer         | Menjawab pertanyaan          |
| brochure_complete   | Membuka slide terakhir       |
| contact_click       | Mengakses kanal kontak       |
| brochure_share      | Membagikan brosur            |

## 13.2 Analytics Requirements

- Jangan mengumpulkan informasi personal tanpa dasar dan persetujuan yang sesuai.
- Hindari event duplikat akibat re-render.
- Analytics tidak boleh memperlambat interaksi utama.
- Tracking mengikuti kebijakan privasi perusahaan.

---

# 14. Security & Compliance

## 14.1 Content Approval

Semua konten harus melalui proses verifikasi dan persetujuan yang berlaku sebelum publikasi.

Termasuk:

- Informasi perusahaan.
- Spesifikasi Gold Mini / Mikro.
- Perhitungan simulasi.
- Informasi spread dan biaya.
- Materi promosi.
- Testimoni.
- Informasi risiko.
- Legalitas dan kontak resmi.

## 14.2 Financial Content Rules

- Tidak menjanjikan keuntungan.
- Tidak memberikan sinyal perdagangan personal.
- Tidak menyamarkan risiko.
- Tidak menggunakan data simulasi seolah-olah data real.
- Perhitungan harus memiliki sumber dan asumsi.
- Materi promosi wajib memenuhi ketentuan regulator yang berlaku.

## 14.3 Security Requirements

- HTTPS.
- Validated external links.
- Minimal external scripts.
- Tidak menyimpan credential pengguna.
- Tidak mengekspos informasi sensitif.
- Dependency security review sebelum release.

---

# 15. Development Phases

## Phase 1 — Foundation (P0)

Deliverables:

- Next.js setup.
- TypeScript.
- Tailwind CSS.
- Dark & Gold theme.
- Mobile-only container.
- Shared components.
- Slide controller.
- Navigation system.

## Phase 2 — Core Slides (P0)

Deliverables:

- Cover.
- Slide 01–04.
- Slide 08–09.
- Slide 11.
- Responsive layout.
- Basic slide transitions.

## Phase 3 — Interactive Features (P0)

Deliverables:

- Product selection.
- Price impact simulation.
- Video player.
- Testimonial carousel.
- Interactive quiz.
- Progress indicator.

## Phase 4 — Enhancements (P1)

Deliverables:

- Localization, jika materi tersedia.
- Improved motion.
- URL slide persistence.
- Sharing enhancements.
- Optional gesture navigation.

## Phase 5 — QA & Production (P0)

Deliverables:

- Cross-device tests.
- Browser compatibility tests.
- Accessibility audit.
- Performance audit.
- Calculation verification.
- Content and compliance approval.
- Production deployment.

---

# 16. Acceptance Criteria

## 16.1 Layout

- [ ] Layout mengikuti desain 390 × 844.
- [ ] Mendukung minimum viewport 320px.
- [ ] Tidak ada horizontal overflow.
- [ ] Desktop menampilkan centered mobile container.
- [ ] Semua elemen mendukung safe-area.

## 16.2 Visual

- [ ] Primary Gold menggunakan `#F0B100`.
- [ ] Main Background menggunakan `#131313`.
- [ ] Seluruh slide konsisten dengan design system.
- [ ] Typography mengikuti hierarki yang ditetapkan.
- [ ] Semua media memiliki kualitas yang sesuai.
- [ ] Kontras dan keterbacaan terpenuhi.

## 16.3 Navigation

- [ ] Cover menuju Slide 01.
- [ ] Semua slide dapat dinavigasi.
- [ ] Kembali / Lanjut berfungsi.
- [ ] Progress indicator akurat.
- [ ] Tidak ada page reload antar-slide.
- [ ] Browser Back / Forward berfungsi.
- [ ] Konten panjang dapat di-scroll tanpa menghalangi navigasi.

## 16.4 Interaction

- [ ] Product selection berfungsi.
- [ ] Simulation calculation valid.
- [ ] Video dapat diputar.
- [ ] Testimonial carousel berfungsi.
- [ ] Accordion dapat dibuka / ditutup.
- [ ] Quiz dapat diselesaikan.
- [ ] Language switcher berfungsi jika diaktifkan.
- [ ] CTA menuju kanal resmi.

## 16.5 Quality

- [ ] Tidak ada critical console errors.
- [ ] Tidak ada broken assets.
- [ ] Performance diuji.
- [ ] Accessibility diuji.
- [ ] Semua interaksi mendukung touch.
- [ ] Reduced motion didukung.
- [ ] Seluruh konten telah diverifikasi.
- [ ] Persetujuan publikasi yang diperlukan telah diperoleh.

---

# 17. Risks & Mitigations

| Risk                          | Mitigation                         |
| ----------------------------- | ---------------------------------- |
| Slide terlalu panjang         | Internal scrolling                 |
| Navigasi tertutup browser UI  | Safe-area dan dynamic viewport     |
| Animasi lambat                | Optimized motion                   |
| Bundle JavaScript besar       | Component-level lazy loading       |
| Konten tidak konsisten        | Centralized content data           |
| Simulasi tidak akurat         | Formula validation dan unit tests  |
| Video terlalu berat           | Lazy loading                       |
| Kuis membingungkan            | Short questions dan clear feedback |
| Klaim promosi bermasalah      | Compliance review                  |
| Layout rusak pada layar kecil | Responsive testing                 |

---

# 18. Definition of Done

Project dinyatakan selesai ketika:

1. Semua 12 tampilan telah diimplementasikan sesuai referensi.
2. Navigasi antarslide berfungsi tanpa page reload.
3. UI mengikuti warna `#F0B100` dan `#131313`.
4. Tampilan mobile konsisten pada perangkat yang ditargetkan.
5. Fitur simulasi, video, quiz, dan interactive cards berjalan baik.
6. Seluruh materi dan angka telah diverifikasi.
7. Target kualitas diuji dan hasilnya didokumentasikan.
8. Seluruh persyaratan compliance dan approval publikasi terpenuhi.

---

# 19. Final Deliverables

**Primary Deliverable**

SGB Interactive Mobile Brochure berbasis Next.js dengan 12 tampilan, berfokus pada edukasi Gold Mini dan pengalaman mobile interactive presentation.

**Technical Deliverables**

- Next.js source code.
- Reusable UI components.
- Responsive mobile layout.
- Slide controller.
- Animation system.
- Interactive product information.
- Educational simulation.
- Video integration.
- Interactive quiz.
- Localization support.
- Production build configuration.

**Design Deliverables**

- Dark & Gold design system.
- Mobile components.
- Slide transition definitions.
- Interaction states.
- Responsive specifications.

**Quality Deliverables**

- Device testing report.
- Performance audit.
- Accessibility validation.
- Calculation tests.
- Compliance approval record.

---

**Document Status:** PRD v2.0 — Ready for Technical Planning, Pending Content & Compliance Approval.

**Project:** PT Solid Gold Berjangka — Interactive Mobile Brochure.
