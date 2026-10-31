import type { Protocol } from "@/content";

// Plain-language rule lists shared by the timeline page and the printed protocol.

export function romLimits(p: Protocol): string[] {
  return [`No sitting with the hip bent past ${p.flexionLimitDeg} degrees`, ...p.romRestrictions, ...p.extraRestrictions];
}

export function keyRules(p: Protocol): string[] {
  return [
    `${p.weightBearing.partialLbs} lb weight bearing, ${p.weightBearing.pattern}, for ${p.weightBearing.weeks} weeks`,
    `Brace when walking for ${p.braceWeeks} weeks`,
    ...(p.proneLying ? ["Lie on your stomach 2 to 3 hours a day in Phase I"] : []),
    `Aqua therapy after week ${p.aquaTherapyAfterWeek}, once incisions are healed`,
    `Running progression after ${p.runningAfterMonths} months`,
    ...p.notes,
  ];
}
