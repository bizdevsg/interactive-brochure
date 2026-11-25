const usd = new Intl.NumberFormat("id-ID", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Format angka USD gaya Indonesia, selalu berhingga. Nilai tidak valid → "—". */
export function formatUsd(value: number, withSign = false): string {
  if (!Number.isFinite(value)) return "—";
  const sign = withSign && value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}$${usd.format(Math.abs(value))}`;
}

export function formatNumber(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value);
}
