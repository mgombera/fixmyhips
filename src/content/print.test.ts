import { describe, expect, it } from "vitest";
import { PRINT_SHEETS, pdfFor } from "./print";

describe("print center", () => {
  it("has the four sheets from the scope", () => {
    expect(PRINT_SHEETS.map((s) => s.id)).toEqual(["checklist", "protocol", "care", "red-flags"]);
  });

  it("uses the generated page until a PDF is supplied", () => {
    for (const s of PRINT_SHEETS) expect(pdfFor({ ...s, pdf: {} }, "standard")).toBeNull();
  });

  it("prefers a procedure PDF over the all-procedures PDF", () => {
    const s = { ...PRINT_SHEETS[1], pdf: { all: "/print/a.pdf", glute: "/print/g.pdf" } };
    expect(pdfFor(s, "glute")).toBe("/print/g.pdf");
    expect(pdfFor(s, "standard")).toBe("/print/a.pdf");
  });

  it("only points at files in public/print and uses no em dashes", () => {
    for (const s of PRINT_SHEETS) {
      for (const f of Object.values(s.pdf)) expect(f).toMatch(/^\/print\/.+\.pdf$/);
      expect(s.title + s.summary).not.toMatch(/—/);
    }
  });
});
