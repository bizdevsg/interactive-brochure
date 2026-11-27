import type { ProductId } from "../types/brochure";
import type { ContractSpec } from "@/lib/simulation";

/**
 * Spesifikasi kontrak. SEMUA angka di bawah berstatus SEMENTARA dan belum diverifikasi
 * terhadap dokumen kontrak resmi (PRD §6 SL-03). Jangan dipublikasikan sebelum disetujui.
 */
export interface Product {
  id: ProductId;
  name: string;
  /** Judul kolom pada tabel perbandingan */
  shortName: string;
  minOpening: string;
  unitRange: string;
  verified: boolean;
  spec: ContractSpec;
  /** Nilai untuk tabel perbandingan */
  rows: {
    contractSize: string;
    minLot: string;
    maxOpenLot: string;
    margin: string;
    commission: string;
    rollover: string;
    tick: string;
  };
}

export const products: Product[] = [
  {
    id: "mini",
    name: "Mini Account",
    shortName: "Mini",
    minOpening: "Rp 5.000.000",
    unitRange: "0,1 - 0,5 lot",
    verified: false,
    spec: {
      ouncesPerLot: 100,
      lots: 0.1,
      marginPerLot: 100,
      commissionPerLot: null,
    },
    rows: {
      contractSize: "100",
      minLot: "0,1",
      maxOpenLot: "0,5",
      margin: "100",
      commission: "-",
      rollover: "0,5",
      tick: "0,01",
    },
  },
  {
    id: "mikro",
    name: "Micro Account",
    shortName: "Mikro",
    minOpening: "Rp 500.000",
    unitRange: "0,01 - 0,05 lot",
    verified: false,
    spec: {
      ouncesPerLot: 100,
      lots: 0.01,
      marginPerLot: 100,
      commissionPerLot: null,
    },
    rows: {
      contractSize: "100",
      minLot: "0,01",
      maxOpenLot: "0,05",
      margin: "100",
      commission: "—",
      rollover: "0,5",
      tick: "0,01",
    },
  },
];

export const comparisonRows: { key: keyof Product["rows"]; label: string }[] = [
  { key: "contractSize", label: "Ukuran kontrak (oz/lot)" },
  { key: "minLot", label: "Minimum lot" },
  { key: "maxOpenLot", label: "Batas lot terbuka" },
  { key: "margin", label: "Margin (USD/lot)" },
  { key: "commission", label: "Komisi (USD/lot)" },
  { key: "rollover", label: "Rollover BUY/SELL (USD/lot/malam)" },
  { key: "tick", label: "Tick harga (USD/oz)" },
];

export const productsContent = {
  titleLead: "Kenali Pilihan",
  titleHighlight: "Akun SG Solid",
  description:
    "Pahami kebutuhan pembukaan awal dan spesifikasi setiap jenis akun sebelum menentukan pilihan.",
  minOpeningLabel: "MINIMAL PEMBUKAAN",
  unitLabel: "Satuan",
  parameterLabel: "Parameter",
  tempBadge: "SEMENTARA",
  selected: "Dipilih",
  note: "Informasi dalam brosur ini dapat diperbarui sesuai kebijakan dan ketentuan yang berlaku.",
};

/** Data simulasi edukatif (bukan harga pasar nyata). */
export const simulationContent = {
  titleLead: "Harga Berubah.",
  titleHighlight: "Apa Dampaknya?",
  productNames: { mini: "Gold Mini", mikro: "Gold Mikro" } as Record<
    ProductId,
    string
  >,
  /** Sementara memakai ikon koin; ganti bila ilustrasi per akun sudah ada */
  productImage: "/images/icon-bab/2.webp",
  scenarioLabel: "Skenario hipotetis:",
  scenarios: [
    { move: 10, label: "Naik +10" },
    { move: -10, label: "Turun -10" },
  ],
  rolloverHint:
    "Rollover adalah biaya untuk posisi yang menginap. Biaya ini belum dihitung dalam selisih kotor.",
  calculate: "Hitung Potensi",
  methodLink: "Cara Menghitung",
  description:
    "Geser perubahan harga dan lihat dampaknya pada posisi BUY atau SELL. Rugi dan untung sama-sama mungkin.",
  entryPrice: 2000,
  moveMin: -20,
  moveMax: 20,
  moveStep: 1,
  assumptions: [
    "Harga masuk 2.000,00 USD/oz adalah angka contoh, bukan harga pasar.",
    "Hasil = (harga keluar − harga masuk) × oz/lot × lot, dibalik untuk SELL.",
    "Tanpa spread, swap, pajak, dan biaya lain. Komisi belum dikonfirmasi, jadi dihitung 0.",
    "Spesifikasi kontrak masih sementara dan belum diverifikasi.",
  ],
  disclaimer: "Simulasi edukatif, bukan janji atau prediksi hasil nyata.",
  practiceDescription:
    "Simulasikan posisi BUY dan SELL untuk memahami bagaimana perubahan harga memengaruhi hasil transaksi.",
  practiceNotice:
    "Latihan hitung. Harga contoh bersifat hipotetis, bukan saran dan bukan harga pasar. Tidak ada order sungguhan yang dikirim.",
  buyHint: "Beli, profit bila harga naik",
  sellHint: "Jual, profit bila harga turun",
  openLabel: "Harga buka (USD/oz)",
  closeLabel: "Harga tutup (USD/oz)",
  lotLabel: "Lot",
  rolloverLabel: "Malam rollover",
  grossLabel: "SELISIH KOTOR · CONTOH",
  locked:
    "Belum termasuk komisi, rollover, dan pajak. Hasil bersih belum dapat dihitung karena parameter biaya belum diverifikasi.",
  invalid:
    "Masukkan harga positif, lot dalam rentang produk, dan malam rollover berupa bilangan bulat nol atau lebih.",
  methodTitle: "CARA MENGHITUNG",
  methodGross:
    "Selisih kotor = (tutup − buka untuk BUY, atau buka − tutup untuk SELL) × ukuran kontrak × lot.",
  methodNet:
    "Bersih = selisih kotor − komisi − rollover − biaya lain − pajak yang berlaku.",
  methodNote:
    "Jika menggunakan harga eksekusi bid/ask, spread sudah tercermin pada harga dan tidak dikurangi lagi. Margin hanya dana jaminan, bukan batas kerugian. Spesifikasi kontrak masih sementara dan belum diverifikasi.",
};
