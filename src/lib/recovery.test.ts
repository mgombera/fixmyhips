import { describe, expect, it } from "vitest";
import { addDays } from "date-fns";
import { PROTOCOLS } from "@/content";
import { exercisesThisWeek, formatUS, fromISO, milestones, parseUS, status, toISO } from "./recovery";
import type { AfterStatus, BeforeStatus } from "./recovery";

const surgery = new Date(2026, 9, 13); // 10/13/2026
const day = (n: number) => addDays(surgery, n);
const after = (n: number, p: "standard" | "revision" | "glute" | "different" = "standard") =>
  status(surgery, day(n), p) as AfterStatus;
const before = (n: number, checked = {}) => status(surgery, day(-n), "standard", checked) as BeforeStatus;

describe("date formats", () => {
  it("round-trips ISO storage and MM/DD/YYYY display", () => {
    expect(formatUS(surgery)).toBe("10/13/2026");
    expect(toISO(surgery)).toBe("2026-10-13");
    expect(formatUS(fromISO("2026-10-13")!)).toBe("10/13/2026");
    expect(formatUS(parseUS("10/13/2026")!)).toBe("10/13/2026");
  });

  it("rejects malformed dates", () => {
    expect(fromISO("2026-13-01")).toBeNull();
    expect(fromISO("10/13/2026")).toBeNull();
    expect(parseUS("2026-10-13")).toBeNull();
  });

  it("counts calendar days across the daylight saving change", () => {
    // 11/01/2026 is the end of daylight saving time in the US.
    expect(after(25).daysSince).toBe(25);
    expect(formatUS(day(25))).toBe("11/07/2026");
  });
});

describe("after surgery", () => {
  it("treats surgery day as day 0, week 1", () => {
    const s = after(0);
    expect(s.mode).toBe("after");
    expect([s.daysSince, s.week, s.phase?.n]).toEqual([0, 1, 1]);
  });

  it("matches the design example: day 18 is Phase I, week 3", () => {
    const s = after(18);
    expect([s.week, s.phase?.n, s.partialWeightBearing, s.braceOn]).toEqual([3, 1, true, true]);
  });

  // Every phase boundary, every protocol: last day of a phase and first day of the next.
  for (const p of Object.values(PROTOCOLS)) {
    it(`${p.id}: switches phase exactly at each boundary`, () => {
      for (const ph of p.phases) {
        const first = (ph.startWeek - 1) * 7;
        const last = ph.endWeek * 7 - 1;
        expect(after(first, p.id).phase?.n, `${p.id} day ${first}`).toBe(ph.n);
        expect(after(last, p.id).phase?.n, `${p.id} day ${last}`).toBe(ph.n);
      }
      const end = p.phases[3].endWeek * 7;
      expect(after(end, p.id).phase).toBeNull();
    });

    it(`${p.id}: weight bearing and brace end on schedule`, () => {
      const wb = p.weightBearing.weeks * 7;
      expect(after(wb - 1, p.id).partialWeightBearing).toBe(true);
      expect(after(wb, p.id).partialWeightBearing).toBe(false);
      const brace = p.braceWeeks * 7;
      expect(after(brace - 1, p.id).braceOn).toBe(true);
      expect(after(brace, p.id).braceOn).toBe(false);
    });
  }

  it("uses each protocol's own phase dates", () => {
    expect(after(30, "standard").phase?.n).toBe(2);
    expect(after(30, "revision").phase?.n).toBe(1);
    expect(after(30, "glute").phase?.n).toBe(1);
    expect(after(108, "revision").phase?.n).toBe(4); // week 16
    expect(after(108, "glute").phase?.n).toBe(3); // week 16
  });

  it("falls back to the standard protocol for a different protocol", () => {
    expect(after(30, "different").phase?.n).toBe(after(30, "standard").phase?.n);
  });

  it("lists running at 3 months standard and 4 months revision", () => {
    const run = (id: "standard" | "revision") => milestones(surgery, PROTOCOLS[id]).find((m) => m.id === "running")!;
    expect(formatUS(run("standard").date)).toBe("01/13/2027");
    expect(formatUS(run("revision").date)).toBe("02/13/2027");
  });

  it("shows only upcoming milestones, soonest first", () => {
    const s = after(18);
    expect(s.upcoming.length).toBeGreaterThan(0);
    expect(s.upcoming.every((m) => m.dayAfterSurgery > 18)).toBe(true);
    expect(s.upcoming[0].id).toBe("aqua"); // day 21
  });
});

describe("before surgery", () => {
  it("counts days until surgery", () => {
    expect(before(12).daysUntil).toBe(12);
    expect(before(1).nightBefore).toBe(true);
    expect(before(2).nightBefore).toBe(false);
  });

  it("sets the PreAdmit window to 30 through 7 days before surgery", () => {
    const s = before(12);
    expect(formatUS(s.preAdmitOpens)).toBe("09/13/2026");
    expect(formatUS(s.preAdmitDeadline)).toBe("10/06/2026");
  });

  it("moves PreAdmit through its states", () => {
    expect(before(31).preAdmit).toBe("not-open");
    expect(before(30).preAdmit).toBe("open");
    expect(before(11).preAdmit).toBe("open");
    expect(before(10).preAdmit).toBe("urgent");
    expect(before(7).preAdmit).toBe("urgent");
    expect(before(6).preAdmit).toBe("overdue");
    expect(before(6, { preadmit: true }).preAdmit).toBe("open");
    expect(before(10, { preadmit: true }).preAdmit).toBe("open");
  });

  it("dates checklist deadlines from the surgery date", () => {
    expect(formatUS(before(12).dueDates.fasting)).toBe("10/12/2026");
    expect(formatUS(before(12).dueDates.preadmit)).toBe("10/06/2026");
  });
});

describe("weekly exercises", () => {
  it("separates new exercises from ones continuing in the phase", () => {
    const w3 = exercisesThisWeek(PROTOCOLS.standard, 3);
    expect(w3.newThisWeek).toContain("double-leg-bridge");
    expect(w3.continuing).toContain("ankle-pumps");
    expect(w3.continuing).toContain("circumduction");
  });

  it("starts fresh in a new phase", () => {
    const w4 = exercisesThisWeek(PROTOCOLS.standard, 4);
    expect(w4.newThisWeek).toContain("hip-hikes");
    expect(w4.continuing).toEqual([]);
  });

  it("returns nothing past Phase IV", () => {
    expect(exercisesThisWeek(PROTOCOLS.standard, 30)).toEqual({ newThisWeek: [], continuing: [] });
  });
});
