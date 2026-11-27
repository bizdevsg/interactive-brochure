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
  cta: "Swipe Up",
  footnote: "Kenali lebih dekat dengan Solid Gold",
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
  risk: "Peluang dan risiko",
  quiz: "Sudah siap belajar lanjut?",
  closing: "Lanjut lewat kanal kami",
};

export type EcosystemRoleId = "dana" | "pengawasan" | "pialang" | "aplikasi";

export interface EcosystemRole {
  id: EcosystemRoleId;
  title: string;
  body: string;
  /** Path ikon 3D, mis. "/images/ekosistem/dana.webp". null = pakai ikon garis. */
  image: string | null;
  verified: boolean;
}

export const ecosystemContent = {
  titleLead: "Siapa berperan di balik",
  titleHighlight: "transaksi?",
  description:
    "Setiap transaksi melibatkan peran yang berbeda. Kenali fungsi aplikasi, pialang, pengawasan, dan alur dana.",
  customer: {
    name: "Anda",
    role: "Calon Nasabah",
    image: "/images/icon-user.webp" as string | null,
  },
  /** Urutan = posisi kartu dari kiri ke kanan; yang pertama terpilih di awal. */
  roles: [
    {
      id: "dana",
      title: "Pengelolaan Dana Nasabah",
      body: "Menjaga dan nasabah secara terpisah di rekening khusus (Segregated Account).",
      image: "/images/icon-dompet.webp",
      verified: true,
    },
    {
      id: "pengawasan",
      title: "Pengawasan & Regulasi",
      body: "Mengawasi dan mengatur perdagangan berjangka.",
      image: "/images/icon-sheild-law.webp",
      verified: true,
    },
    {
      id: "pialang",
      title: "Pialang Berjangka SGB",
      body: "Penyelenggara layanan perdagangan berjangka.",
      image: "/images/icon-hand-shake.webp",
      verified: true,
    },
    {
      id: "aplikasi",
      title: "Aplikasi SG Solid",
      body: "Platform untuk mengakses informasi dan layanan transaksi.",
      image: "/images/icon-hp-sg.webp",
      verified: true,
    },
  ] as EcosystemRole[],
  note: "Ini merupakan gambaran umum ekosistem perdagangan berjangka. Periksa legalitas, izin, dan status rekening melalui kanal resmi perusahaan serta regulator terkait sebelum melakukan transaksi.",
  verifyBadge: "PERLU VERIFIKASI",
};

export const videoContent = {
  titleLead: "Video &",
  titleHighlight: "Promo",
  description:
    "Lihat video pengenalan untuk memahami layanan dan fitur SG Solid.",
  carouselLabel: "Video",
  posterCaption: "PT SOLID GOLD BERJANGKA",
  unavailable: "Video belum tersedia",
  failed: "Video tidak dapat dimuat",
  previous: "Video sebelumnya",
  next: "Video berikutnya",
  details: "Baca detail lengkap",
  detailMissing: "Teks lengkap belum tersedia.",
  verifyBadge: "PERLU VERIFIKASI",
  play: "Putar video",
  /**
   * src: path video yang sudah disetujui, mis. "/videos/profil.mp4". null = belum diunggah.
   * poster: gambar thumbnail. detail: teks lengkap untuk "Baca detail lengkap".
   */
  items: [
    {
      id: "company-profile",
      title: "Company Profile",
      summary:
        "PT Solid Gold Berjangka (SGB) adalah perusahaan pialang berjangka terkemuka yang berdiri sejak tahun 2002 dan beroperasi …",
      detail: null as string | null,
      src: null as string | null,
      poster: null as string | null,
      verified: false,
    },
    {
      id: "video-2",
      title: "Video 2",
      summary: "Materi video belum tersedia.",
      detail: null as string | null,
      src: null as string | null,
      poster: null as string | null,
      verified: false,
    },
    {
      id: "video-3",
      title: "Video 3",
      summary: "Materi video belum tersedia.",
      detail: null as string | null,
      src: null as string | null,
      poster: null as string | null,
      verified: false,
    },
  ],
};

export const testimonialContent = {
  titleLead: "Cerita dari",
  titleMiddle: "Berbagai",
  titleHighlight: "Perspektif",
  description:
    "Kenali pengalaman belajar dan mengenal pasar dari berbagai sudut pandang.",
  /** Wajib tetap tampil selama nama, foto, dan kutipan masih fiktif (PRD §6 SL-07) */
  // disclaimer:
  //   "Ilustrasi demo: nama, foto, dan kutipan bersifat fiktif, bukan testimoni nasabah nyata.",
  closingLead: "Berbagai Perspektif,",
  closingHighlight: "Satu Tujuan",
  closingBody:
    "Belajar, memahami, dan mengelola peluang dengan lebih bijak bersama SG Solid.",
  badge: "DEMO — FIKTIF, BUKAN NASABAH NYATA",
  /** Nama, peran, dan kutipan fiktif; isi `photo` dengan path gambar bila sudah ada */
  items: [
    {
      id: "nadia",
      name: "Nadia",
      role: "Freelancer",
      quote:
        "Cocok buat aku yang sibuk. Mulai dari Akun Mikro, prosesnya praktis dan fleksibel.",
      photo: "/images/people/testi-2.webp" as string | null,
    },
    {
      id: "dimas",
      name: "Dimas",
      role: "Pemilik UMKM",
      quote: "Dengan Akun Mini bisa atur modal lebih rapi sesuai budget saya.",
      photo: "/images/people/testi-3.webp" as string | null,
    },
    {
      id: "rizky",
      name: "Rizky",
      role: "Staf Admin",
      quote: "Bisa mulai dengan modal terjangkau, jadi aman sambil belajar.",
      photo: "/images/people/testi-1.webp" as string | null,
    },
  ],
  cardBadge: "DEMO · FIKTIF",
  sourceLabel: "Naskah fiktif",
  replaceNote: "Ganti dengan testimoni asli setelah mendapat izin.",
  carouselLabel: "Testimoni demo",
  previous: "Sebelumnya",
  next: "Berikutnya",
  details: "Baca detail lengkap",
};

export const costContent = {
  titleLead: "Pahami Biaya",
  titleHighlight: "Sebelum Transaksi",
  description:
    "Kenali komponen biaya yang dapat memengaruhi hasil akhir transaksi.",
  items: [
    {
      id: "spread",
      title: "Spread",
      tagline: "Selisih harga beli dan jual",
      body: "Jika input simulator adalah harga eksekusi bid/ask, spread sudah tercermin pada harga. Jangan kurangi spread lagi. Spread dapat berubah, bukan biaya tetap.",
    },
    {
      id: "komisi",
      title: "Komisi Transaksi",
      tagline: null,
      body: "Biaya layanan transaksi sesuai ketentuan yang berlaku.",
    },
    {
      id: "pajak",
      title: "Pajak",
      tagline: null,
      body: "Pajak dihitung dari basis biaya sesuai ketentuan yang berlaku. Tarif efektif belum dikonfirmasi pada brosur ini.",
    },
    {
      id: "rollover",
      title: "Rollover",
      tagline: null,
      body: "Ketentuan, nominal, dan waktu cutoff rollover belum diverifikasi. Periksa informasi terkini melalui kanal resmi.",
    },
  ],
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
