import type { Procedure } from "./recovery";

export const PROCEDURE_OPTIONS: { value: Procedure; label: string; detail: string }[] = [
  {
    value: "standard",
    label: "Hip Arthroscopy, Osteoplasty and Labral Repair",
    detail: "The standard procedure. Choose this if you are not sure.",
  },
  {
    value: "revision",
    label: "Labral Revision or Reconstruction",
    detail: "A repeat Hip Arthroscopy, or a labrum rebuilt with a graft.",
  },
  {
    value: "glute",
    label: "Hip Arthroscopy with Glute Tendon Repair",
    detail: "Hip Arthroscopy plus repair of the gluteus medius tendon on the side of the hip.",
  },
  {
    value: "different",
    label: "My protocol is different",
    detail: "You will see the standard protocol as a guide. Follow the paper protocol you were given.",
  },
];

export function procedureLabel(p: Procedure): string {
  return PROCEDURE_OPTIONS.find((o) => o.value === p)!.label;
}
