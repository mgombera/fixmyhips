import { addDays, addMonths, differenceInCalendarDays, format, isValid, parse, parseISO } from "date-fns";
import { CHECKLIST, PREADMIT_WINDOW, PROTOCOLS } from "@/content";
import type { Phase, Protocol, ProtocolId } from "@/content";

// Pure date math for personalization (scope section 4). No storage, no React.
// Surgery dates are stored as ISO "YYYY-MM-DD" and shown as MM/DD/YYYY.

export type Procedure = ProtocolId | "different";

export function protocolFor(procedure: Procedure): Protocol {
  return PROTOCOLS[procedure === "different" ? "standard" : procedure];
}

export function fromISO(iso: string): Date | null {
  const d = parseISO(iso);
  return isValid(d) && /^\d{4}-\d{2}-\d{2}$/.test(iso) ? d : null;
}

export function toISO(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

export function formatUS(d: Date): string {
  return format(d, "MM/dd/yyyy");
}

export function parseUS(s: string): Date | null {
  const d = parse(s, "MM/dd/yyyy", new Date());
  return isValid(d) && /^\d{2}\/\d{2}\/\d{4}$/.test(s) ? d : null;
}

export type Milestone = { id: string; label: string; date: Date; dayAfterSurgery: number };

/** Key dates after surgery for a protocol, sorted by date. */
export function milestones(surgery: Date, protocol: Protocol): Milestone[] {
  const at = (day: number) => addDays(surgery, day);
  const list: Omit<Milestone, "dayAfterSurgery">[] = [
    { id: "shower", label: "You may shower (cover the incisions) and remove the outer dressing", date: at(2) },
    { id: "pt-start", label: "Formal physical therapy usually begins (days 3 to 5)", date: at(3) },
    { id: "desk-work", label: "Desk work or school, if pain allows (days 4 to 7)", date: at(4) },
    { id: "first-visit", label: "First post-op visit (days 10 to 14)", date: at(10) },
    { id: "travel", label: "Two-week limit on long sitting and long-distance travel ends", date: at(14) },
    { id: "aqua", label: "Aqua therapy can begin once incisions are healed", date: at(protocol.aquaTherapyAfterWeek * 7) },
    { id: "driving", label: "Driving may be possible: off narcotics, able to lift the leg, full control", date: at(21) },
    {
      id: "crutches",
      label: "Begin weaning off crutches, toward weight bearing as tolerated",
      date: at(protocol.weightBearing.weeks * 7),
    },
    { id: "brace", label: "Brace no longer needed when walking", date: at(protocol.braceWeeks * 7) },
    ...protocol.phases.slice(1).map((ph) => ({
      id: `phase-${ph.n}`,
      label: `Phase ${ph.n} begins: ${ph.name.toLowerCase()}`,
      date: at((ph.startWeek - 1) * 7),
    })),
    { id: "running", label: "Running progression can begin", date: addMonths(surgery, protocol.runningAfterMonths) },
    {
      id: "agility",
      label: "Multidirectional agility can begin",
      date: at((protocol.agilityNotBeforeWeek - 1) * 7),
    },
    { id: "year", label: "Home exercise program complete (1 year)", date: addMonths(surgery, 12) },
  ];
  return list
    .map((m) => ({ ...m, dayAfterSurgery: differenceInCalendarDays(m.date, surgery) }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

export type AfterStatus = {
  mode: "after";
  daysSince: number; // 0 = surgery day
  week: number; // 1-based
  phase: Phase | null; // null once past Phase IV (home program)
  phaseDay: number; // 0-based day within the phase
  phaseLength: number; // days
  partialWeightBearing: boolean;
  braceOn: boolean;
  upcoming: Milestone[];
};

export type PreAdmitState = "not-open" | "open" | "urgent" | "overdue";

export type BeforeStatus = {
  mode: "before";
  daysUntil: number; // >= 1
  preAdmitOpens: Date;
  preAdmitDeadline: Date;
  preAdmit: PreAdmitState;
  nightBefore: boolean;
  dueDates: Record<string, Date>;
};

export type Status = BeforeStatus | AfterStatus;

export function phaseForWeek(protocol: Protocol, week: number): Phase | null {
  return protocol.phases.find((ph) => week >= ph.startWeek && week <= ph.endWeek) ?? null;
}

export function status(
  surgery: Date,
  today: Date,
  procedure: Procedure,
  checked: Record<string, boolean> = {},
): Status {
  const protocol = protocolFor(procedure);
  const diff = differenceInCalendarDays(surgery, today);

  if (diff > 0) {
    const preAdmitOpens = addDays(surgery, -PREADMIT_WINDOW.opensDaysBefore);
    const preAdmitDeadline = addDays(surgery, -PREADMIT_WINDOW.closesDaysBefore);
    let preAdmit: PreAdmitState;
    if (diff > PREADMIT_WINDOW.opensDaysBefore) preAdmit = "not-open";
    else if (diff < PREADMIT_WINDOW.closesDaysBefore && !checked.preadmit) preAdmit = "overdue";
    else if (diff <= 10 && !checked.preadmit) preAdmit = "urgent";
    else preAdmit = "open";

    const dueDates: Record<string, Date> = {};
    for (const c of CHECKLIST) if (c.dueOffsetDays !== undefined) dueDates[c.id] = addDays(surgery, c.dueOffsetDays);

    return { mode: "before", daysUntil: diff, preAdmitOpens, preAdmitDeadline, preAdmit, nightBefore: diff === 1, dueDates };
  }

  const daysSince = diff === 0 ? 0 : -diff; // avoid -0 on surgery day
  const week = Math.floor(daysSince / 7) + 1;
  const phase = phaseForWeek(protocol, week);
  const phaseStartDay = phase ? (phase.startWeek - 1) * 7 : 0;
  const phaseLength = phase ? (phase.endWeek - phase.startWeek + 1) * 7 : 0;

  return {
    mode: "after",
    daysSince,
    week,
    phase,
    phaseDay: phase ? daysSince - phaseStartDay : 0,
    phaseLength,
    partialWeightBearing: daysSince < protocol.weightBearing.weeks * 7,
    braceOn: daysSince < protocol.braceWeeks * 7,
    upcoming: milestones(surgery, protocol).filter((m) => m.dayAfterSurgery > daysSince).slice(0, 5),
  };
}

/** Exercise ids that apply this week: everything introduced so far in the current phase. */
export function exercisesThisWeek(protocol: Protocol, week: number): { newThisWeek: string[]; continuing: string[] } {
  const phase = phaseForWeek(protocol, week);
  if (!phase) return { newThisWeek: [], continuing: [] };
  const newThisWeek = phase.weeks.filter((w) => w.fromWeek === week).flatMap((w) => w.exerciseIds);
  const continuing = phase.weeks
    .filter((w) => w.fromWeek < week)
    .flatMap((w) => w.exerciseIds)
    .filter((id) => !newThisWeek.includes(id));
  return { newThisWeek, continuing: [...new Set(continuing)] };
}
