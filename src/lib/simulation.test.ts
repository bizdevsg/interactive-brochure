import { describe, expect, it } from "vitest";
import { simulate, type ContractSpec } from "./simulation";

const mini: ContractSpec = {
  ouncesPerLot: 100,
  lots: 0.1,
  marginPerLot: 100,
  commissionPerLot: null,
};

describe("simulate", () => {
  it("BUY untung saat harga naik", () => {
    const r = simulate({ spec: mini, position: "BUY", entryPrice: 2000, priceMove: 5 })!;
    expect(r.grossPnl).toBe(50);
    expect(r.outcome).toBe("profit");
  });

  it("BUY rugi saat harga turun", () => {
    const r = simulate({ spec: mini, position: "BUY", entryPrice: 2000, priceMove: -5 })!;
    expect(r.grossPnl).toBe(-50);
    expect(r.outcome).toBe("loss");
  });

  it("SELL kebalikan BUY", () => {
    const up = simulate({ spec: mini, position: "SELL", entryPrice: 2000, priceMove: 5 })!;
    const down = simulate({ spec: mini, position: "SELL", entryPrice: 2000, priceMove: -5 })!;
    expect(up.grossPnl).toBe(-50);
    expect(down.grossPnl).toBe(50);
  });

  it("tidak ada perubahan harga → impas", () => {
    const r = simulate({ spec: mini, position: "BUY", entryPrice: 2000, priceMove: 0 })!;
    expect(r.netPnl).toBe(0);
    expect(r.outcome).toBe("flat");
  });

  it("skala mikro 10x lebih kecil dari mini untuk pergerakan yang sama", () => {
    const mikro = { ...mini, lots: 0.01 };
    const a = simulate({ spec: mini, position: "BUY", entryPrice: 2000, priceMove: 10 })!;
    const b = simulate({ spec: mikro, position: "BUY", entryPrice: 2000, priceMove: 10 })!;
    expect(a.grossPnl).toBeCloseTo(b.grossPnl * 10, 6);
  });

  it("menghitung margin dan rasio hasil terhadap margin", () => {
    const r = simulate({ spec: mini, position: "BUY", entryPrice: 2000, priceMove: 5 })!;
    expect(r.margin).toBe(10);
    expect(r.netToMargin).toBe(5);
  });

  it("komisi dikurangkan dari hasil bersih jika tersedia", () => {
    const spec = { ...mini, commissionPerLot: 5 };
    const r = simulate({ spec, position: "BUY", entryPrice: 2000, priceMove: 5 })!;
    expect(r.commission).toBe(0.5);
    expect(r.netPnl).toBe(49.5);
    expect(r.commissionUnconfirmed).toBe(false);
  });

  it("komisi belum dikonfirmasi ditandai dan dihitung 0", () => {
    const r = simulate({ spec: mini, position: "BUY", entryPrice: 2000, priceMove: 1 })!;
    expect(r.commission).toBe(0);
    expect(r.commissionUnconfirmed).toBe(true);
  });

  it("rasio null jika margin 0 (tanpa Infinity)", () => {
    const r = simulate({
      spec: { ...mini, marginPerLot: 0 },
      position: "BUY",
      entryPrice: 2000,
      priceMove: 1,
    })!;
    expect(r.netToMargin).toBeNull();
  });

  it("membulatkan desimal float dengan benar", () => {
    const r = simulate({ spec: mini, position: "BUY", entryPrice: 2000.1, priceMove: 0.3 })!;
    expect(r.grossPnl).toBe(3);
  });

  it("input tidak valid mengembalikan null, bukan NaN/Infinity", () => {
    expect(simulate({ spec: mini, position: "BUY", entryPrice: NaN, priceMove: 1 })).toBeNull();
    expect(simulate({ spec: mini, position: "BUY", entryPrice: 2000, priceMove: Infinity })).toBeNull();
    expect(simulate({ spec: { ...mini, lots: 0 }, position: "BUY", entryPrice: 2000, priceMove: 1 })).toBeNull();
    expect(simulate({ spec: mini, position: "BUY", entryPrice: 0, priceMove: 1 })).toBeNull();
    expect(simulate({ spec: mini, position: "BUY", entryPrice: 10, priceMove: -10 })).toBeNull();
  });

  it("semua keluaran berhingga untuk rentang slider", () => {
    for (let move = -20; move <= 20; move++) {
      for (const position of ["BUY", "SELL"] as const) {
        const r = simulate({ spec: mini, position, entryPrice: 2000, priceMove: move })!;
        expect(Number.isFinite(r.netPnl)).toBe(true);
        expect(Number.isFinite(r.exitPrice)).toBe(true);
      }
    }
  });
});
