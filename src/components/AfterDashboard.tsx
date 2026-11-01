"use client";

import Link from "next/link";
import { DATES_ARE_ESTIMATES, HOME_PROGRAM, PT_OVERRIDE_NOTICE, exerciseById } from "@/content";
import { dashboardModel } from "@/lib/dashboard";
import { toggleExercise, useHydrated, useProfile } from "@/lib/profile";
import { addDays } from "date-fns";
import { formatUS, fromISO } from "@/lib/recovery";

const EXAMPLE_DAY = 18;
import { AlertIcon } from "./icons";

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div role="note" className="flex gap-3 rounded-lg border border-accent bg-bg p-4">
      <AlertIcon className="mt-0.5 shrink-0 text-accent" />
      <p className="m-0 text-sm">{children}</p>
    </div>
  );
}

export function AfterDashboard() {
  const hydrated = useHydrated();
  const profile = useProfile();
  if (!hydrated) return <div className="min-h-96" aria-busy="true" />;

  const today = new Date();
  const realDate = profile?.surgeryDate ? fromISO(profile.surgeryDate) : null;
  const realModel = realDate && profile ? dashboardModel(realDate, today, profile.procedure) : null;
  // No date yet, or surgery still ahead: show a labeled example (day 18, standard protocol).
  const example = !realModel;
  const d = example ? addDays(today, -EXAMPLE_DAY) : realDate!;
  const m = realModel ?? dashboardModel(d, today, "standard")!;
  const exampleReason = !profile
    ? { text: "Add your surgery date to see your own day, phase and exercises.", href: "/", cta: "Set up your plan" }
    : !realDate
      ? { text: "Add your surgery date to see your own day, phase and exercises.", href: "/?setup=1", cta: "Add your date" }
      : { text: `Your surgery is on ${formatUS(realDate)}. Until then, use your pre-surgery checklist.`, href: "/before", cta: "Go to your checklist" };

  const ticked = new Set(example ? [] : (profile?.exercises[`week-${m.week}`] ?? []));
  const session = [...m.newThisWeek.map((id) => ({ id, isNew: true })), ...m.continuing.map((id) => ({ id, isNew: false }))];
  const done = session.filter((s) => ticked.has(s.id)).length;
  const totalWeeks = m.phases.reduce((n, p) => n + p.weeks, 0);

  return (
    <div className="flex flex-col gap-8">
      {example && (
        <div role="note" className="flex flex-col gap-2 rounded-xl border-2 border-accent bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">
            <strong>Example: this is what your dashboard looks like on day {EXAMPLE_DAY}</strong> (standard protocol).{" "}
            {exampleReason.text}
          </p>
          <Link
            href={exampleReason.href}
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-accent px-5 font-bold text-accent-ink no-underline"
          >
            {exampleReason.cta}
          </Link>
        </div>
      )}
      {/* Day and phase */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-1">
          <p className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">After surgery · {formatUS(d)}</p>
          <h1 className="m-0 font-display text-7xl font-extrabold uppercase leading-[0.9] sm:text-9xl">
            {m.daysSince === 0 ? (
              <>
                Surgery <span className="text-accent">day</span>
              </>
            ) : (
              <>
                Day <span className="text-accent">{m.daysSince}</span>
              </>
            )}
          </h1>
        </div>
        <div className="flex flex-col gap-1 sm:text-right">
          <p className="m-0 font-display text-3xl font-bold uppercase">
            {m.phase ? `Phase ${m.phase.n} · Week ${m.week}` : "Home program"}
          </p>
          <p className="m-0 text-muted">{m.phase ? m.phase.name : HOME_PROGRAM}</p>
        </div>
      </div>

      {/* Phase bar, widths proportional to each phase's length */}
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: m.phases.map((p) => `${p.weeks}fr`).join(" ") }}
        role="img"
        aria-label={
          m.phase
            ? `Phase ${m.phase.n} of 4, ${m.phaseProgressPct} percent through this phase`
            : "All four phases complete"
        }
      >
        {m.phases.map((p) => (
          <div key={p.n} className="flex min-w-0 flex-col gap-2">
            <div className="h-3.5 overflow-hidden rounded bg-border">
              <div
                className="h-full rounded bg-accent"
                style={{ width: p.state === "done" ? "100%" : p.state === "current" ? `${m.phaseProgressPct}%` : "0%" }}
              />
            </div>
            <span className={`truncate text-xs font-semibold ${p.state === "current" ? "text-accent" : "text-muted"}`}>
              P{p.n}
              <span className="hidden sm:inline"> · {p.weeks} WK</span>
            </span>
          </div>
        ))}
      </div>
      <p className="sr-only">Phases cover the first {totalWeeks} weeks.</p>

      {/* Tiles */}
      <dl className="m-0 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {m.tiles.map((t) => (
          <div key={t.label} className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-4">
            <dt className="text-xs font-semibold uppercase tracking-widest text-muted">{t.label}</dt>
            <dd className="m-0 font-display text-3xl font-bold uppercase sm:text-4xl">{t.value}</dd>
            <dd className="m-0 text-sm text-muted">{t.note}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        {/* Today's session */}
        <section aria-labelledby="session" className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="session" className="m-0 font-display text-3xl font-bold uppercase">
              This week&apos;s exercises
            </h2>
            {session.length > 0 && (
              <span className="text-sm text-muted">
                {done} of {session.length} done
              </span>
            )}
          </div>
          <Notice>{PT_OVERRIDE_NOTICE}</Notice>
          {session.length === 0 ? (
            <p className="m-0">
              {m.phase
                ? "No new exercises this week. Continue what your therapist has you doing."
                : "You have finished the formal phases. Keep up your home exercise program through 1 year."}
            </p>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {session.map(({ id, isNew }) => {
                const e = exerciseById(id);
                const cid = `ex-${id}`;
                return (
                  <li key={id} className="flex items-center gap-3 rounded-lg bg-bg p-3">
                    <input
                      id={cid}
                      type="checkbox"
                      checked={ticked.has(id)}
                      disabled={example}
                      onChange={(ev) => toggleExercise(m.week, id, ev.target.checked)}
                      className="h-6 w-6 shrink-0 accent-[var(--accent)]"
                    />
                    <label htmlFor={cid} className="flex min-w-0 flex-1 flex-col">
                      <span className="font-semibold">{e.name}</span>
                      <span className="text-sm text-muted">
                        {isNew ? "New this week" : "Continue"}
                        {e.therapistOnly ? " · with your therapist" : ""}
                        {(() => {
                          const cue = e.cues.find((c) => !e.name.toLowerCase().includes(c.toLowerCase()));
                          return cue ? ` · ${cue}` : "";
                        })()}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Next unlocks */}
        <section aria-labelledby="next" className="flex flex-col gap-3">
          <h2 id="next" className="m-0 font-display text-2xl font-bold uppercase text-muted">
            Coming up
          </h2>
          <ol className="m-0 flex list-none flex-col gap-2 p-0">
            {m.upcoming.map((u, i) => (
              <li
                key={u.id}
                className={`flex justify-between gap-3 rounded-xl border p-4 ${i === 0 ? "border-accent" : "border-border"}`}
              >
                <span className="font-semibold">{u.label}</span>
                <span className={`shrink-0 font-semibold ${i === 0 ? "text-accent" : "text-muted"}`}>{formatUS(u.date)}</span>
              </li>
            ))}
          </ol>
          <p className="m-0 text-sm text-muted">{DATES_ARE_ESTIMATES}</p>
        </section>
      </div>
    </div>
  );
}
