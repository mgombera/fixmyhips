"use client";

import Link from "next/link";
import { CHECKLIST, PREADMIT_WINDOW } from "@/content";
import type { ChecklistItem } from "@/content";
import { toggleChecklist, useHydrated, useProfile } from "@/lib/profile";
import { formatUS, fromISO, status } from "@/lib/recovery";
import type { BeforeStatus } from "@/lib/recovery";
import { PRACTICE } from "@/lib/site";
import { AlertIcon, PhoneIcon } from "./icons";

const BLOCKS: { id: ChecklistItem["block"]; title: string }[] = [
  { id: "now", title: "Now" },
  { id: "week-before", title: "1 week before" },
  { id: "night-before", title: "Night before" },
];

function PreAdmitAlert({ s, done }: { s: BeforeStatus; done: boolean }) {
  const deadline = formatUS(s.preAdmitDeadline);
  if (done) {
    return (
      <div role="status" className="rounded-xl border border-accent bg-surface p-4">
        <strong>PreAdmit marked done.</strong>{" "}
        <span className="text-muted">If PreAdmit asked for more tests or follow-up, finish those before surgery.</span>
      </div>
    );
  }
  if (s.preAdmit === "not-open") {
    return (
      <div className="rounded-xl border border-border bg-surface p-4">
        <strong>PreAdmit testing is mandatory.</strong>{" "}
        <span className="text-muted">
          Your window opens {formatUS(s.preAdmitOpens)} ({PREADMIT_WINDOW.opensDaysBefore} days before surgery) and closes{" "}
          {deadline}.
        </span>
      </div>
    );
  }
  const strong = s.preAdmit === "urgent" || s.preAdmit === "overdue";
  return (
    <div
      role={strong ? "alert" : undefined}
      className={`flex flex-col gap-3 rounded-xl border-2 p-4 sm:flex-row sm:items-center sm:justify-between ${
        strong ? "border-alert bg-alert-surface" : "border-accent bg-surface"
      }`}
    >
      <div className="flex gap-3">
        <AlertIcon className={`mt-0.5 shrink-0 ${strong ? "text-alert" : "text-accent"}`} />
        <p className="m-0">
          <strong className={strong ? "text-alert" : ""}>
            {s.preAdmit === "overdue" ? `The PreAdmit deadline was ${deadline}.` : `Complete PreAdmit by ${deadline}.`}
          </strong>{" "}
          It is mandatory: it is how you are cleared to receive anesthesia.
          {s.preAdmit === "overdue" ? " Call PreAdmit today." : ""}
        </p>
      </div>
      <a
        href={`tel:${PRACTICE.preAdmit.tel}`}
        className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md px-4 font-bold no-underline ${
          strong ? "bg-alert text-bg" : "bg-accent text-accent-ink"
        }`}
      >
        <PhoneIcon /> {PRACTICE.preAdmit.label}
      </a>
    </div>
  );
}

function Item({
  item,
  checked,
  canTick,
  due,
}: {
  item: ChecklistItem;
  checked: boolean;
  canTick: boolean;
  due?: Date;
}) {
  const id = `chk-${item.id}`;
  return (
    <li className={`flex gap-3 rounded-lg bg-bg p-4 ${checked ? "opacity-70" : ""}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={!canTick}
        onChange={(e) => toggleChecklist(item.id, e.target.checked)}
        className="mt-1 h-6 w-6 shrink-0 accent-[var(--accent)]"
        aria-describedby={`${id}-d`}
      />
      <div className="flex min-w-0 flex-col gap-1">
        <label htmlFor={id} className={`text-lg font-semibold ${checked ? "line-through" : ""}`}>
          {item.title}
        </label>
        {due && !checked && (
          <span className="text-sm font-semibold text-accent">
            {item.block === "night-before" ? "Night of" : "By"} {formatUS(due)}
          </span>
        )}
        <p id={`${id}-d`} className="m-0 text-muted">
          {item.detail}
        </p>
        {item.link && (
          <a href={item.link.href} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-2">
            {item.link.label}
          </a>
        )}
      </div>
    </li>
  );
}

export function BeforeDashboard() {
  const hydrated = useHydrated();
  const profile = useProfile();
  if (!hydrated) return <div className="min-h-96" aria-busy="true" />;

  const d = profile?.surgeryDate ? fromISO(profile.surgeryDate) : null;
  const s = d && profile ? status(d, new Date(), profile.procedure, profile.checklist) : null;
  const before = s?.mode === "before" ? s : null;
  const checked = profile?.checklist ?? {};
  const doneCount = CHECKLIST.filter((c) => checked[c.id]).length;
  const pct = Math.round((doneCount / CHECKLIST.length) * 100);

  return (
    <div className="flex flex-col gap-8">
      {/* Countdown */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-1">
          <p className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">
            Before surgery · Texas Orthopedic Hospital
          </p>
          {before ? (
            <h1 className="m-0 font-display text-7xl font-extrabold uppercase leading-[0.9] sm:text-9xl">
              <span className="text-accent">{before.daysUntil}</span> {before.daysUntil === 1 ? "day" : "days"} out
            </h1>
          ) : (
            <h1 className="m-0 font-display text-6xl font-extrabold uppercase leading-[0.9] sm:text-8xl">Get ready</h1>
          )}
        </div>
        {d && before && (
          <p className="m-0 font-display text-3xl font-bold uppercase">Surgery · {formatUS(d)}</p>
        )}
      </div>

      {!profile && (
        <div className="rounded-xl border border-accent bg-surface p-4">
          <strong>Add your surgery date to see your deadlines and tick items off.</strong>{" "}
          <Link href="/" className="font-semibold underline underline-offset-2">
            Set up your plan
          </Link>
        </div>
      )}
      {profile && !d && (
        <div className="rounded-xl border border-border bg-surface p-4">
          No surgery date yet. You can start the list now.{" "}
          <Link href="/?setup=1" className="font-semibold underline underline-offset-2">
            Add your date
          </Link>{" "}
          when it is scheduled to see your deadlines.
        </div>
      )}
      {s?.mode === "after" && d && (
        <div className="rounded-xl border border-accent bg-surface p-4">
          <strong>Your surgery was on {formatUS(d)}.</strong>{" "}
          <Link href="/after" className="font-semibold underline underline-offset-2">
            Go to your recovery dashboard
          </Link>
        </div>
      )}

      {/* Readiness */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm font-semibold text-muted">
          <span>
            READINESS · {doneCount} OF {CHECKLIST.length} DONE
          </span>
        </div>
        <div
          className="h-3.5 rounded bg-border"
          role="progressbar"
          aria-label="Pre-surgery checklist"
          aria-valuemin={0}
          aria-valuemax={CHECKLIST.length}
          aria-valuenow={doneCount}
        >
          <div
            className={`h-3.5 rounded ${before?.preAdmit === "urgent" || before?.preAdmit === "overdue" ? "bg-alert" : "bg-accent"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {before && <PreAdmitAlert s={before} done={Boolean(checked.preadmit)} />}

      {before?.nightBefore && (
        <div role="status" className="rounded-xl border-2 border-accent bg-surface p-4">
          <strong>Surgery is tomorrow.</strong> Nothing to eat or drink after midnight. Expect a call with your arrival time;
          no call by 3 p.m.? Call{" "}
          <a href={`tel:${PRACTICE.office.tel}`} className="font-semibold underline">
            {PRACTICE.office.label}
          </a>
          .
        </div>
      )}

      {/* Checklist */}
      <div className="grid gap-4 lg:grid-cols-3">
        {BLOCKS.map((b) => (
          <section key={b.id} aria-labelledby={`blk-${b.id}`} className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
            <h2 id={`blk-${b.id}`} className="m-0 font-display text-2xl font-bold uppercase tracking-wide">
              {b.title}
            </h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {CHECKLIST.filter((c) => c.block === b.id).map((c) => (
                <Item
                  key={c.id}
                  item={c}
                  checked={Boolean(checked[c.id])}
                  canTick={Boolean(profile)}
                  due={before?.dueDates[c.id]}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
