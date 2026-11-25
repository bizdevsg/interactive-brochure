/**
 * Konten bisnis terpusat, terpisah dari UI (PRD §9.7).
 * Item bertanda `verified: false` belum diverifikasi → UI menampilkan label "Perlu verifikasi".
 * Semua teks WAJIB melalui proses persetujuan sebelum publikasi (PRD §14.1).
 */

export const coverContent = {
  titleLead: "Langkah kecil.",
  titleHighlight: "Pemahaman lebih besar.",
  description:
    "Kenali akun Mini dan Mikro melalui aplikasi Solid. Pahami cara kerja, biaya, dan risikonya sebelum menentukan langkah Anda.",
  cta: "Buka brosur",
  footnote: "Materi edukasi · bukan ajakan bertransaksi",
};

export const introContent = {
  titleLead: "Kenali emas.",
  titleBreak: "Pahami",
  titleHighlight: "caranya.",
  description:
    "Gold Mini & Gold Mikro melalui Solid. Mulai dari cara kerja, bukan janji hasil.",
  readMore: "Baca pengantar",
  intro: {
    title: "Pengantar",
    paragraphs: [
      "Gold Mini dan Gold Mikro adalah dua jenis akun untuk berdagang emas yang dapat diakses melalui aplikasi Solid.",
      "Brosur ini menjelaskan cara kerjanya langkah demi langkah: siapa saja pihak yang terlibat, perbedaan kedua akun, pengaruh perubahan harga, biaya, dan risiko.",
      "Materi ini bersifat edukatif. Tidak ada janji keuntungan dan bukan ajakan untuk bertransaksi.",
    ],
  },
  imageHint: "Ketuk gambar untuk memperbesar",
  chaptersLabel: "DAFTAR BAB",
};

/** Judul pendek pada kartu daftar bab di sampul. */
export const chapterCardTitles: Record<string, string> = {
  ecosystem: "Siapa Saja di Balik Transaksi?",
  products: "Kenali Akun Mini dan Mikro",
  simulation: "Saat Harga Bergerak, Apa yang Terjadi?",
  video: "Video & Promo",
  testimonial: "Testimoni Nasabah",
  cost: "Bukan selisih harga saja",
  risk: "Peluang dan Risiko",
  quiz: "Sudah siap belajar?",
  closing: "Kanal Resmi",
};

export type EcosystemCategory = "profil" | "pengawasan" | "dana";

export interface EcosystemItem {
  id: string;
  category: EcosystemCategory;
  title: string;
  tagline: string;
  body: string;
  verified: boolean;
}

export const ecosystemContent = {
  titleLead: "Siapa berperan di balik",
  titleHighlight: "transaksi?",
  description:
    "Ketuk tiap peran. Pahami bedanya aplikasi, pialang, pengawasan, dan alur dana.",
  categories: [
    { id: "profil", label: "Profil perusahaan" },
    { id: "pengawasan", label: "Pengawasan" },
    { id: "dana", label: "Dana nasabah" },
  ] as { id: EcosystemCategory; label: string }[],
  nodes: [
    {
      id: "anda",
      initial: "A",
      name: "Anda",
      role: "Calon nasabah",
      target: "dana",
      itemId: "nasabah",
    },
    {
      id: "solid",
      initial: "SC",
      name: "Solid",
      role: "Pialang/Broker",
      target: "profil",
      itemId: "solid",
    },
    {
      id: "bursa",
      initial: "B",
      name: "Bursa Berjangka",
      role: "Penyelenggara",
      target: "profil",
      itemId: "bursa",
    },
  ] as {
    id: string;
    initial: string;
    name: string;
    role: string;
    target: EcosystemCategory;
    itemId: string;
  }[],
  items: [
    {
      id: "solid",
      category: "profil",
      title: "Solid",
      tagline: "Aplikasi untuk mengakses layanan transaksi.",
      body: "Solid adalah aplikasi, bukan regulator atau lembaga penjamin keuntungan. Ia menjadi pintu akses ke layanan pialang.",
      verified: false,
    },
    {
      id: "pialang",
      category: "profil",
      title: "Pialang SGB",
      tagline: "Pihak penyedia layanan kepada nasabah.",
      body: "Profil, identitas hukum, izin, dan hubungan kelembagaan SGB perlu dicek melalui sumber resmi terkini.",
      verified: false,
    },
    {
      id: "regulator",
      category: "pengawasan",
      title: "Regulator",
      tagline: "Pihak yang mengawasi kegiatan perdagangan berjangka.",
      body: "Nama dan kewenangan regulator dapat berubah mengikuti peraturan. Periksa situs regulator untuk informasi terkini.",
      verified: false,
    },
    {
      id: "bursa",
      category: "pengawasan",
      title: "Bursa berjangka",
      tagline: "Penyelenggara tempat kontrak diperdagangkan.",
      body: "Peran dan nama bursa perlu dikonfirmasi melalui kanal resmi sebelum dipublikasikan.",
      verified: false,
    },
    {
      id: "kliring",
      category: "pengawasan",
      title: "Lembaga kliring",
      tagline: "Pihak yang mengelola penyelesaian transaksi.",
      body: "Peran lembaga kliring perlu dikonfirmasi melalui kanal resmi sebelum dipublikasikan.",
      verified: false,
    },
    {
      id: "nasabah",
      category: "dana",
      title: "Anda (calon nasabah)",
      tagline: "Pemilik keputusan dan tanggung jawab atas posisinya.",
      body: "Anda perlu memahami produk, biaya, dan risiko sebelum membuka akun. Tidak perlu terburu-buru.",
      verified: true,
    },
    {
      id: "rekening",
      category: "dana",
      title: "Rekening dana",
      tagline: "Alur dana perlu diperiksa langsung.",
      body: "Pastikan rekening tujuan dana sesuai informasi resmi SGB. Jangan transfer ke rekening yang tidak terverifikasi.",
      verified: false,
    },
    {
      id: "pengaduan",
      category: "dana",
      title: "Pengaduan",
      tagline: "Ada jalur jika terjadi masalah.",
      body: "Informasi jalur pengaduan resmi perlu dilengkapi dari kanal resmi SGB.",
      verified: false,
    },
  ] as EcosystemItem[],
  note: "Peran di atas dijelaskan secara umum, bukan jaminan. Verifikasi status perusahaan, izin, dan rekening langsung melalui kanal resmi SGB dan situs regulator sebelum membuka akun.",
  verifyBadge: "PERLU VERIFIKASI",
};

export const videoContent = {
  titleLead: "Video & Promo —",
  titleHighlight: "Demo",
  description:
    "Contoh isi sementara. Bukan program atau penawaran resmi; semua materi dapat diganti melalui admin.",
  badge: "DEMO — BUKAN PROMO RESMI",
  unavailable: "Video belum tersedia",
  previous: "Sebelumnya",
  next: "Berikutnya",
  details: "Baca detail lengkap",
  play: "Putar video",
  items: [
    {
      id: "demo-1",
      title: "Contoh video promosi",
      summary:
        "Video demo tanpa suara. Ganti dengan video promosi yang sudah disetujui.",
      /** Isi dengan path video yang disetujui, mis. "/videos/demo.mp4". null = belum diunggah. */
      src: null as string | null,
      poster: null as string | null,
    },
  ],
};

export const testimonialContent = {
  titleLead: "Testimoni Nasabah —",
  titleHighlight: "Demo",
  description:
    "Seluruh contoh di bagian ini fiktif, bukan pengalaman atau pernyataan nasabah nyata.",
  badge: "DEMO — FIKTIF, BUKAN NASABAH NYATA",
  items: [
    {
      id: "t1",
      quote: "Urutan materinya membantu saya memahami istilah dasar.",
      name: "Contoh 1 · Memahami dasar",
    },
    {
      id: "t2",
      quote: "Penjelasan risikonya jelas dan saya tidak merasa didesak.",
      name: "Contoh 2 · Memahami risiko",
    },
    {
      id: "t3",
      quote: "Saya jadi tahu biaya bukan hanya selisih harga.",
      name: "Contoh 3 · Memahami biaya",
    },
  ],
  sourceLabel: "Naskah fiktif",
  replaceNote: "Ganti dengan testimoni asli setelah mendapat izin.",
  previous: "Sebelumnya",
  next: "Berikutnya",
  details: "Baca detail lengkap",
};

export const costContent = {
  titleLead: "Bukan selisih harga",
  titleHighlight: "saja.",
  description:
    "Kenali biaya sebelum melihat hasil bersih. Ketuk istilah yang belum dipahami.",
  items: [
    {
      id: "spread",
      title: "Spread",
      tagline: "Selisih harga beli dan jual.",
      body: "Jika input simulator adalah harga eksekusi bid/ask, spread sudah tercermin pada harga. Jangan kurangi spread lagi. Spread dapat berubah, bukan biaya tetap.",
    },
    {
      id: "komisi",
      title: "Komisi",
      tagline: "Biaya layanan transaksi.",
      body: "Komisi adalah biaya layanan atas transaksi. Nominalnya belum dikonfirmasi pada brosur ini, jadi cek nilai terbaru di kanal resmi.",
    },
    {
      id: "pajak",
      title: "Pajak",
      tagline: "Dihitung dari basis biaya yang berlaku.",
      body: "Pajak dihitung dari basis biaya sesuai ketentuan yang berlaku. Tarif efektif belum dikonfirmasi pada brosur ini.",
    },
    {
      id: "rollover",
      title: "Rollover",
      tagline: "Biaya posisi yang menginap.",
      body: "Ketentuan, nominal, dan waktu cutoff rollover belum diverifikasi. Periksa informasi terkini melalui kanal resmi.",
    },
  ],
  verifyBadge: "PERLU VERIFIKASI",
  note: "Nominal komisi, tarif pajak efektif, dan cutoff rollover masih perlu pemeriksaan. Hasil bersih tetap dikunci sampai dikonfirmasi.",
};

export const riskContent = {
  titleLead: "Peluang dan",
  titleHighlight: "risiko",
  titleTail: "berjalan bersama.",
  description:
    "Pergerakan harga dapat menimbulkan kerugian. Baca pernyataan lengkap sebelum melanjutkan.",
  statementLabel: "PERNYATAAN RISIKO LENGKAP",
  statement:
    "Perdagangan berjangka memiliki risiko tinggi dan dapat menimbulkan kerugian. Pahami karakteristik produk, mekanisme transaksi, margin, biaya, serta seluruh risiko sebelum bertransaksi. Tidak ada jaminan keuntungan.",
  items: [
    {
      id: "kerugian",
      title: "Kerugian",
      tagline: "BUY maupun SELL dapat rugi.",
      body: "Jika arah harga berlawanan dengan posisi, hasil kotor bisa negatif. Biaya dapat membuat hasil bersih negatif meskipun harga tidak berubah.",
    },
    {
      id: "peluang",
      title: "Peluang",
      tagline: "Ada peluang, tetapi tidak dijamin.",
      body: "Perubahan harga yang sesuai arah posisi dapat memberi hasil positif. Peluang yang sama berarti risiko yang sama besarnya, dan hasil masa lalu bukan jaminan.",
    },
    {
      id: "margin",
      title: "Margin dan leverage",
      tagline: "Eksposur lebih besar dari dana yang disetor.",
      body: "Margin memungkinkan posisi lebih besar daripada dana yang ditempatkan, sehingga perubahan harga kecil dapat berdampak besar pada hasil. Pahami ketentuan margin pada kontrak.",
    },
    {
      id: "eksekusi",
      title: "Volatilitas & eksekusi",
      tagline: "Harga dan hasil eksekusi bisa berbeda.",
      body: "Pergerakan cepat, likuiditas, serta kondisi sistem dapat memengaruhi eksekusi. Angka simulasi tidak menjamin harga atau hasil.",
    },
    {
      id: "demo",
      title: "Demo bukan hasil riil",
      tagline: "Belajar tanpa menganggapnya jaminan.",
      body: "Hasil demo dan simulasi bukan rekam jejak atau prediksi hasil riil.",
    },
  ],
  verifyBadge: "PERLU VERIFIKASI",
  docLabel: "Baca dokumen pemberitahuan risiko resmi",
  docMissing: "Dokumen pemberitahuan risiko resmi belum ditautkan",
};

export const quizContent = {
  titleLead: "Sudah siap belajar",
  titleHighlight: "lebih lanjut?",
  description:
    "Cek pemahamanmu, lalu gunakan demo jika tersedia. Tidak perlu terburu-buru membuka akun.",
  progressLabel: "KESIAPAN BELAJAR",
  questionLabel: "Pertanyaan",
  previous: "Sebelumnya",
  next: "Pertanyaan berikutnya",
  showResult: "Lihat hasil",
  correct: "Jawaban benar",
  incorrect: "Belum tepat",
  resultTitle: "Kuis selesai",
  resultLabel: "Jawaban benar",
  retry: "Ulangi kuis",
  disclaimer:
    "Kuis ini hanya untuk belajar. Hasilnya bukan penilaian kesesuaian investasi, tidak mengumpulkan data pribadi, dan bukan syarat untuk mengakses kanal resmi.",
};

export const closingContent = {
  titleLead: "Lanjut lewat",
  titleHighlight: "kanal resmi.",
  description:
    "Periksa ketentuan terkini langsung dari sumbernya. Brosur ini tidak menerima dana atau order.",
  legal: {
    cta: "Baca informasi hukum lengkap",
    title: "Informasi hukum",
    body: "Informasi legalitas PT Solid Gold Berjangka (izin, nomor dokumen, dan kontak resmi) akan ditampilkan setelah diverifikasi dan disetujui. Sampai saat itu, rujuk kanal resmi perusahaan.",
  },
  thanks: "Terima kasih telah membaca",
  share: "Bagikan brosur",
  copy: "Salin tautan",
  copied: "Tautan disalin",
  unavailable: "Tautan belum tersedia",
};

export const globalRiskSheet = {
  title: "Pernyataan risiko",
  goToRisk: "Buka bab risiko lengkap",
};
