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

/** Harga dengan dua desimal, mis. 2350 → "2.350,00". */
export function formatPrice(value: number): string {
  return Number.isFinite(value) ? usd.format(value) : "—";
}

/**
 * Membaca angka ketikan pengguna: "2.350,00", "2350,5", "2350.5", atau "2.350".
 * Titik dianggap pemisah ribuan bila ada koma, atau bila diikuti kelompok 3 digit.
 * Teks yang tidak valid → NaN.
 */
export function parseNumber(value: string): number {
  const text = value.trim();
  if (text === "") return NaN;
  const thousands = text.includes(",") || /^[1-9]\d{0,2}(\.\d{3})+$/.test(text);
  const normalized = (thousands ? text.replaceAll(".", "") : text).replace(
    ",",
    ".",
  );
  return /^-?(\d+(\.\d*)?|\.\d+)$/.test(normalized) ? Number(normalized) : NaN;
}

export function formatNumber(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value);
}
