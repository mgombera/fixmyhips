import type { Procedure } from "./recovery";

export const PROCEDURE_OPTIONS: { value: Procedure; label: string; detail: string }[] = [
  {
    value: "standard",
    label: "Hip arthroscopy with labral repair",
    detail: "Labral repair and osteoplasty. Choose this if you are not sure.",
  },
  {
    value: "revision",
    label: "Revision or labral reconstruction",
    detail: "A repeat hip arthroscopy, or a labrum rebuilt with a graft.",
  },
  {
    value: "glute",
    label: "With gluteus medius repair",
    detail: "Hip arthroscopy plus repair of the tendon on the side of the hip.",
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
