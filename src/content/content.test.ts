import { describe, expect, it } from "vitest";
import * as C from "./index";

const exerciseIds = new Set(C.EXERCISES.map((e) => e.id));
const videoIds = new Set(C.VIDEOS.map((v) => v.id));

describe("protocols", () => {
  for (const p of Object.values(C.PROTOCOLS)) {
    describe(p.id, () => {
      it("has four phases in order with no gaps or overlaps", () => {
        expect(p.phases.map((ph) => ph.n)).toEqual([1, 2, 3, 4]);
        for (let i = 1; i < p.phases.length; i++) {
          expect(p.phases[i].startWeek).toBe(p.phases[i - 1].endWeek + 1);
        }
      });

      it("keeps every week block inside its phase", () => {
        for (const ph of p.phases) {
          for (const w of ph.weeks) {
            expect(w.fromWeek).toBeGreaterThanOrEqual(ph.startWeek);
            expect(w.toWeek).toBeLessThanOrEqual(ph.endWeek);
            expect(w.fromWeek).toBeLessThanOrEqual(w.toWeek);
          }
        }
      });

      it("only references exercises that exist", () => {
        for (const ph of p.phases) {
          for (const id of [...ph.weeks.flatMap((w) => w.exerciseIds), ...(ph.cardio ?? [])]) {
            expect(exerciseIds.has(id), `${p.id}: ${id}`).toBe(true);
          }
        }
      });
    });
  }

  it("matches the variant table in scope section 4", () => {
    const { standard, revision, glute } = C.PROTOCOLS;
    expect([standard.weightBearing.weeks, revision.weightBearing.weeks, glute.weightBearing.weeks]).toEqual([3, 6, 6]);
    expect([standard.braceWeeks, revision.braceWeeks, glute.braceWeeks]).toEqual([4, 6, 4]);
    expect([standard.flexionLimitDeg, revision.flexionLimitDeg, glute.flexionLimitDeg]).toEqual([90, 75, 90]);
    expect([standard.proneLying, revision.proneLying, glute.proneLying]).toEqual([false, true, true]);
    expect([standard.runningAfterMonths, revision.runningAfterMonths, glute.runningAfterMonths]).toEqual([3, 4, 4]);
    expect(glute.phases[2].endWeek).toBe(16);
    expect(glute.romRestrictions).toContain("No external rotation past 30 degrees");
  });
});

describe("exercises and videos", () => {
  it("has unique exercise ids", () => {
    expect(exerciseIds.size).toBe(C.EXERCISES.length);
  });

  it("has unique video ids and YouTube ids", () => {
    expect(videoIds.size).toBe(C.VIDEOS.length);
    expect(new Set(C.VIDEOS.map((v) => v.youtubeId)).size).toBe(C.VIDEOS.length);
  });

  it("only references videos that exist", () => {
    for (const e of C.EXERCISES) for (const v of e.videoIds) expect(videoIds.has(v), `${e.id}: ${v}`).toBe(true);
  });

  it("uses every exercise in at least one protocol", () => {
    const used = new Set(
      Object.values(C.PROTOCOLS).flatMap((p) => p.phases.flatMap((ph) => [...ph.weeks.flatMap((w) => w.exerciseIds), ...(ph.cardio ?? [])])),
    );
    for (const e of C.EXERCISES) expect(used.has(e.id), e.id).toBe(true);
  });

  it("has no sets or reps invented in the cues", () => {
    // The only repetition count in the protocols is "30 repetitions" for passive ROM.
    for (const e of C.EXERCISES) {
      const cues = e.cues.join(" ");
      expect(cues, e.id).not.toMatch(/\b\d+\s*x\s*\d+\b|\bsets?\b|\breps?\b/i);
      if (/repetitions/i.test(cues)) expect(e.id).toBe("supine-prom");
    }
  });

  it("has an MM/DD/YYYY approval date on every approved video", () => {
    for (const v of C.approvedVideos()) expect(v.approvedOn).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    expect(C.approvedVideos().length).toBe(C.VIDEOS.length); // all approved 10/30/2026
  });
});

describe("all content", () => {
  const everything = JSON.stringify(C);

  it("contains no em dashes", () => {
    expect(everything).not.toMatch(/—/);
  });

  it("uses MM/DD/YYYY for dates", () => {
    expect(everything).not.toMatch(/\b\d{4}-\d{2}-\d{2}\b/);
  });

  it("has a valid review date or none yet", () => {
    if (C.CONTENT_REVIEWED_ON !== null) expect(C.CONTENT_REVIEWED_ON).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it("names a source for every item unless it is marked derived", () => {
    const items = [
      ...C.CHECKLIST,
      ...C.SURGERY_DAY,
      ...C.HOME_CARE,
      ...C.DIAGNOSIS,
      ...C.ANATOMY,
      ...C.FAQ,
      ...C.EXERCISES,
      C.BIOLOGICS,
      C.STANDARD_MEDICATIONS,
      C.MEDICATION_TIPS,
      C.USUALLY_NORMAL,
      C.CALL_NOW,
      C.OUTCOMES,
    ];
    for (const it of items) {
      expect(it.source.length > 0 || it.derived === true, JSON.stringify(it).slice(0, 80)).toBe(true);
    }
  });
});
