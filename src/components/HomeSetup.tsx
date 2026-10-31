"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useHydrated, useProfile } from "@/lib/profile";
import { procedureLabel } from "@/lib/procedures";
import { formatUS, fromISO, status } from "@/lib/recovery";
import { SetupForm } from "./SetupForm";

// Returning visitors see a short summary with a link to their dashboard
// (no automatic redirect, so the information on the home page stays reachable).
// /?setup=1 opens the form to change settings.
export function HomeSetup() {
  const hydrated = useHydrated();
  const profile = useProfile();
  const params = useSearchParams();
  const editing = params.get("setup") === "1";

  if (!hydrated) return <div className="min-h-64 rounded-xl border border-border bg-surface" aria-busy="true" />;
  if (!profile || editing) return <SetupForm existing={profile} />;

  const d = profile.surgeryDate ? fromISO(profile.surgeryDate) : null;
  const s = d ? status(d, new Date(), profile.procedure, profile.checklist) : null;
  const after = s?.mode === "after";
  const line = !s
    ? "Surgery date not set yet"
    : s.mode === "before"
      ? `${s.daysUntil} ${s.daysUntil === 1 ? "day" : "days"} until surgery on ${formatUS(d!)}`
      : s.daysSince === 0
        ? "Today is surgery day"
        : `Day ${s.daysSince}${s.phase ? ` · Phase ${s.phase.n} · Week ${s.week}` : " · Home exercise program"}`;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-accent bg-surface p-5 sm:p-6">
      <p className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">Welcome back</p>
      <p className="m-0 font-display text-4xl font-bold uppercase leading-none">{line}</p>
      <p className="m-0 text-muted">{procedureLabel(profile.procedure)}</p>
      <div className="flex flex-wrap gap-3">
        <Link
          href={after ? "/after" : "/before"}
          className="inline-flex min-h-12 items-center rounded-md bg-accent px-5 font-bold text-accent-ink no-underline"
        >
          Go to my {after ? "recovery dashboard" : "checklist"}
        </Link>
        <Link
          href="/?setup=1"
          className="inline-flex min-h-12 items-center rounded-md border border-border px-5 font-semibold text-text no-underline"
        >
          Change date or procedure
        </Link>
      </div>
    </div>
  );
}
