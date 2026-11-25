import type { ProductId } from "../types/brochure";
import type { ContractSpec } from "@/lib/simulation";

/**
 * Spesifikasi kontrak. SEMUA angka di bawah berstatus SEMENTARA dan belum diverifikasi
 * terhadap dokumen kontrak resmi (PRD §6 SL-03). Jangan dipublikasikan sebelum disetujui.
 */
export interface Product {
  id: ProductId;
  name: string;
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
    tick: string;
  };
}

export const products: Product[] = [
  {
    id: "mini",
    name: "Mini Account",
    minOpening: "Rp 5.000.000",
    unitRange: "0,1–0,5 lot",
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
      commission: "—",
      tick: "0,01",
    },
  },
  {
    id: "mikro",
    name: "Mikro Account",
    minOpening: "Rp 500.000",
    unitRange: "0,01–0,05 lot",
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
  { key: "tick", label: "Tick harga" },
];

export const productsContent = {
  titleLead: "Mini atau",
  titleHighlight: "Mikro?",
  description:
    "Bandingkan kebutuhan awal dan satuan transaksinya. Pembukaan bukan batas kerugian.",
  minOpeningLabel: "MINIMAL PEMBUKAAN",
  unitLabel: "Satuan",
  parameterLabel: "Parameter",
  tempBadge: "SEMENTARA",
  selected: "Dipilih",
  note: "Parameter bertanda Sementara belum diverifikasi dan dapat berubah. Konfirmasikan ke kanal resmi sebelum mengambil keputusan.",
};

/** Data simulasi edukatif (bukan harga pasar nyata). */
export const simulationContent = {
  titleLead: "Harga berubah,",
  titleHighlight: "apa dampaknya?",
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
  practiceDescription: "Coba BUY atau SELL dalam simulasi edukasi. Ini bukan harga pasar atau transaksi riil.",
  practiceNotice: "Latihan hitung. Harga contoh bersifat hipotetis, bukan saran dan bukan harga pasar. Tidak ada order sungguhan yang dikirim.",
  buyHint: "beli · kotor positif bila naik",
  sellHint: "jual · kotor positif bila turun",
  openLabel: "Harga buka (USD/oz)",
  closeLabel: "Harga tutup (USD/oz)",
  lotLabel: "Lot",
  rolloverLabel: "Malam rollover",
  grossLabel: "SELISIH KOTOR · CONTOH",
  locked: "Hasil bersih terkunci — komisi, rollover, dan pajak belum diverifikasi.",
  invalid: "Masukkan harga positif, lot dalam rentang produk, dan malam rollover berupa bilangan bulat nol atau lebih.",
  methodTitle: "CARA MENGHITUNG",
  methodGross: "Selisih kotor = (tutup − buka untuk BUY, atau buka − tutup untuk SELL) × ukuran kontrak × lot.",
  methodNet: "Bersih = selisih kotor − komisi − rollover − biaya lain − pajak yang berlaku.",
  methodNote: "Jika menggunakan harga eksekusi bid/ask, spread sudah tercermin pada harga dan tidak dikurangi lagi. Margin hanya dana jaminan, bukan batas kerugian. Spesifikasi kontrak masih sementara dan belum diverifikasi.",
};
