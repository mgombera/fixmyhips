"use client";

import Link from "next/link";
import { useProfile } from "@/lib/profile";
import { procedureLabel } from "@/lib/procedures";
import { formatUS, fromISO, status } from "@/lib/recovery";
import { PROTOCOL_NOTICE } from "@/content";

// One line under the header telling the patient where they are. Renders
// nothing until the browser has read the saved profile.
export function StatusBar() {
  const profile = useProfile();
  if (!profile) return null;

  const d = profile.surgeryDate ? fromISO(profile.surgeryDate) : null;
  let line: string;
  if (!d) {
    line = "Surgery date not set yet";
  } else {
    const s = status(d, new Date(), profile.procedure, profile.checklist);
    if (s.mode === "before") {
      line = `${s.daysUntil} ${s.daysUntil === 1 ? "day" : "days"} until surgery on ${formatUS(d)}`;
    } else if (s.daysSince === 0) {
      line = "Surgery day";
    } else if (s.phase) {
      line = `Day ${s.daysSince} · Phase ${s.phase.n} · Week ${s.week}`;
    } else {
      line = `Day ${s.daysSince} · Home exercise program`;
    }
  }

  return (
    <div className="border-b border-border bg-surface print:hidden">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 text-sm">
        <p className="m-0">
          <strong className="font-semibold">{line}</strong>
          <span className="text-muted"> · {procedureLabel(profile.procedure)}</span>
        </p>
        <Link href="/?setup=1" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-2">
          Change date or procedure
        </Link>
      </div>
      {profile.procedure === "different" && (
        <p className="m-0 border-t border-border px-4 py-2 text-center text-sm text-muted">{PROTOCOL_NOTICE}</p>
      )}
    </div>
  );
}
