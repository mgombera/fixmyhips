import { addDays, addMonths, differenceInCalendarDays } from "date-fns";
import { exercisesThisWeek, formatUS, protocolFor, status } from "./recovery";
import type { AfterStatus, Milestone, Procedure } from "./recovery";
import type { Phase } from "@/content";

// Everything the recovery dashboard shows, as plain data, so it can be tested
// against the protocols without rendering (scope 6.2 snapshot tests).

export type Tile = { label: string; value: string; note: string };

export type DashboardModel = {
  daysSince: number;
  week: number;
  phase: Phase | null;
  phases: { n: number; name: string; weeks: number; state: "done" | "current" | "next" }[];
  phaseProgressPct: number;
  tiles: Tile[];
  newThisWeek: string[];
  continuing: string[];
  upcoming: Milestone[];
};

export function dashboardModel(surgery: Date, today: Date, procedure: Procedure): DashboardModel | null {
  const s = status(surgery, today, procedure);
  if (s.mode !== "after") return null;
  const a = s as AfterStatus;
  const p = protocolFor(procedure);

  const wbEnd = addDays(surgery, p.weightBearing.weeks * 7);
  const braceEnd = addDays(surgery, p.braceWeeks * 7);
  const braceDaysLeft = differenceInCalendarDays(braceEnd, today);
  const running = addMonths(surgery, p.runningAfterMonths);

  const tiles: Tile[] = [
    a.partialWeightBearing
      ? { label: "Weight bearing", value: `${p.weightBearing.partialLbs} lb`, note: `Foot flat with crutches until about ${formatUS(wbEnd)}` }
      : { label: "Weight bearing", value: "As tolerated", note: "Wean off crutches as your therapist directs" },
    a.braceOn
      ? {
          label: "Brace",
          value: `${braceDaysLeft} ${braceDaysLeft === 1 ? "day" : "days"}`,
          note: "Left wearing it when walking and sitting",
        }
      : { label: "Brace", value: "Done", note: "No longer needed when walking" },
    a.phase?.n === 1
      ? { label: "Hip flexion limit", value: `${p.flexionLimitDeg}°`, note: "No sitting with the hip bent past this" }
      : { label: "Aqua therapy", value: "Allowed", note: "Once incisions are fully healed" },
    a.daysSince < differenceInCalendarDays(running, surgery)
      ? { label: "Running", value: formatUS(running), note: "Earliest start of the running progression" }
      : { label: "Running", value: "Allowed", note: "Follow your therapist's running progression" },
  ];

  const current = a.phase?.n ?? 5;
  const { newThisWeek, continuing } = exercisesThisWeek(p, a.week);

  return {
    daysSince: a.daysSince,
    week: a.week,
    phase: a.phase,
    phases: p.phases.map((ph) => ({
      n: ph.n,
      name: ph.name,
      weeks: ph.endWeek - ph.startWeek + 1,
      state: ph.n < current ? "done" : ph.n === current ? "current" : "next",
    })),
    phaseProgressPct: a.phase ? Math.round(((a.phaseDay + 1) / a.phaseLength) * 100) : 100,
    tiles,
    newThisWeek,
    continuing,
    upcoming: a.upcoming,
  };
}
