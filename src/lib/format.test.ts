import { describe, expect, it } from "vitest";
import { formatPrice, parseNumber } from "./format";

describe("parseNumber", () => {
  it("membaca format Indonesia", () => {
    expect(parseNumber("2.350,00")).toBe(2350);
    expect(parseNumber("2.360,5")).toBe(2360.5);
    expect(parseNumber("2.350")).toBe(2350);
    expect(parseNumber("0,1")).toBe(0.1);
  });

  it("membaca titik sebagai desimal bila bukan pemisah ribuan", () => {
    expect(parseNumber("2350.5")).toBe(2350.5);
    expect(parseNumber("0.125")).toBe(0.125);
  });

  it("teks tidak valid menjadi NaN", () => {
    for (const text of ["", "  ", "abc", "1,2,3", "Infinity", "1e5", "0x10"]) {
      expect(parseNumber(text)).toBeNaN();
    }
  });

  it("hasil formatPrice bisa dibaca kembali", () => {
    for (const value of [0.01, 999.99, 2350, 1234567.8]) {
      expect(parseNumber(formatPrice(value))).toBe(value);
    }
  });
});

describe("formatPrice", () => {
  it("selalu dua desimal dan tidak pernah menampilkan NaN", () => {
    expect(formatPrice(2350)).toBe("2.350,00");
    expect(formatPrice(NaN)).toBe("—");
  });
});
