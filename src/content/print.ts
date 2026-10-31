import type { ProtocolId } from "./types";

// Print center (scope 6.12). Each sheet is generated from the site's content
// until Dr. Gombera supplies his own edited PDF. To substitute a PDF:
//   1. Put the file in public/print/ (name it YYYY-MM-DD-descriptive-name.pdf).
//   2. Set `pdf` below: `all` for one file for every procedure, or one entry
//      per procedure (a procedure entry wins over `all`).
// With a PDF set, the print center offers the PDF and the generated page is
// still available as "Print the web version".

export type PrintSheetId = "checklist" | "protocol" | "care" | "red-flags";

export type PrintSheet = {
  id: PrintSheetId;
  title: string;
  summary: string;
  /** Which of Dr. Gombera's documents this sheet corresponds to. */
  matches: string;
  pdf: Partial<Record<ProtocolId | "all", string>>;
};

export const PRINT_SHEETS: PrintSheet[] = [
  {
    id: "checklist",
    title: "Before surgery checklist",
    summary: "PreAdmit, medications, fasting and what to bring, with your deadlines if you added a date.",
    matches: "Pre-op letter",
    pdf: {},
  },
  {
    id: "protocol",
    title: "Physical therapy protocol",
    summary: "Your four phases, restrictions, goals and when to move on. Bring it to your therapist.",
    matches: "PT protocol for your procedure",
    pdf: {},
  },
  {
    id: "care",
    title: "Home care sheet",
    summary: "Dressing, showering, ice, brace, activity, driving, work and medications.",
    matches: "Discharge sheet",
    pdf: {},
  },
  {
    id: "red-flags",
    title: "When to call card",
    summary: "Warning signs and phone numbers. Keep it on the fridge.",
    matches: "Discharge sheet, warning signs",
    pdf: {},
  },
];

export function printSheet(id: string): PrintSheet | undefined {
  return PRINT_SHEETS.find((s) => s.id === id);
}

/** Dr. Gombera's PDF for this sheet and procedure, or null to use the generated page. */
export function pdfFor(sheet: PrintSheet, procedure: ProtocolId): string | null {
  return sheet.pdf[procedure] ?? sheet.pdf.all ?? null;
}
