export type Position = "BUY" | "SELL";

export interface ContractSpec {
  /** Ukuran kontrak dalam oz per lot */
  ouncesPerLot: number;
  /** Jumlah lot yang disimulasikan */
  lots: number;
  /** Margin dalam USD per lot */
  marginPerLot: number;
  /** Komisi dalam USD per lot; null = belum dikonfirmasi (dihitung 0 dan diberi label) */
  commissionPerLot: number | null;
}

export interface SimulationInput {
  spec: ContractSpec;
  position: Position;
  /** Harga masuk (USD/oz), data simulasi edukatif */
  entryPrice: number;
  /** Perubahan harga (USD/oz) dari harga masuk; boleh negatif */
  priceMove: number;
}

export type Outcome = "profit" | "loss" | "flat";

export interface SimulationResult {
  exitPrice: number;
  grossPnl: number;
  commission: number;
  netPnl: number;
  margin: number;
  /** Hasil bersih dibanding margin; null jika margin 0 */
  netToMargin: number | null;
  outcome: Outcome;
  commissionUnconfirmed: boolean;
}

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * P/L (USD) = (harga keluar − harga masuk) × oz/lot × lot × arah (BUY = +1, SELL = −1).
 * Asumsi: tanpa spread, swap, pajak, dan biaya lain di luar komisi. Hanya ilustrasi edukatif.
 * Mengembalikan null untuk input tidak valid, sehingga UI tidak pernah menampilkan NaN/Infinity.
 */
export function simulate(input: SimulationInput): SimulationResult | null {
  const { spec, position, entryPrice, priceMove } = input;
  const numbers = [
    spec.ouncesPerLot,
    spec.lots,
    spec.marginPerLot,
    entryPrice,
    priceMove,
    spec.commissionPerLot ?? 0,
  ];
  if (!numbers.every(Number.isFinite)) return null;
  if (spec.ouncesPerLot <= 0 || spec.lots <= 0 || entryPrice <= 0) return null;
  if (spec.marginPerLot < 0 || (spec.commissionPerLot ?? 0) < 0) return null;

  const exitPrice = entryPrice + priceMove;
  if (exitPrice <= 0) return null;

  const direction = position === "BUY" ? 1 : -1;
  const grossPnl = round2(
    (exitPrice - entryPrice) * spec.ouncesPerLot * spec.lots * direction,
  );
  const commission = round2((spec.commissionPerLot ?? 0) * spec.lots);
  const netPnl = round2(grossPnl - commission);
  const margin = round2(spec.marginPerLot * spec.lots);

  return {
    exitPrice: round2(exitPrice),
    grossPnl,
    commission,
    netPnl,
    margin,
    netToMargin: margin > 0 ? netPnl / margin : null,
    outcome: netPnl > 0 ? "profit" : netPnl < 0 ? "loss" : "flat",
    commissionUnconfirmed: spec.commissionPerLot === null,
  };
}
