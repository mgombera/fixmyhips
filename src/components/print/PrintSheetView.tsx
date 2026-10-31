"use client";

import Link from "next/link";
import { useState } from "react";
import { addDays } from "date-fns";
import {
  CALL_NOW,
  CALL_NUMBERS,
  CHECKLIST,
  DATES_ARE_ESTIMATES,
  HOME_CARE,
  HOME_PROGRAM,
  MEDICATION_NOTICE,
  MEDICATION_TIPS,
  PROTOCOLS,
  PROTOCOL_NOTICE,
  PT_OVERRIDE_NOTICE,
  STANDARD_MEDICATIONS,
  USUALLY_NORMAL,
  exerciseById,
  pdfFor,
  printSheet,
} from "@/content";
import type { InfoSection, PrintSheetId, ProtocolId } from "@/content";
import { useHydrated, useProfile } from "@/lib/profile";
import { keyRules, romLimits } from "@/lib/protocolText";
import { formatUS, fromISO } from "@/lib/recovery";
import { PRACTICE } from "@/lib/site";

// One printable sheet. On screen it shows a toolbar (procedure and Print
// button); on paper only the light-themed sheet prints, sized for letter.

const PROC_LABEL: Record<ProtocolId, string> = {
  standard: "Standard: labral repair and osteoplasty",
  revision: "Revision or labral reconstruction",
  glute: "With gluteus medius repair",
};

function List({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-disc flex-col gap-1 pl-5">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

function Block({ title, children, long }: { title: string; children: React.ReactNode; long?: boolean }) {
  return (
    <section className={`flex flex-col gap-1.5 ${long ? "" : "break-inside-avoid"}`}>
      <h2 className="m-0 break-after-avoid border-b border-border pb-1 text-base font-bold uppercase tracking-wide text-brand">{title}</h2>
      {children}
    </section>
  );
}

function Section({ s }: { s: InfoSection }) {
  return (
    <Block title={s.title}>
      <List items={s.points} />
    </Block>
  );
}

function Checklist({ surgery }: { surgery: Date | null }) {
  const blocks = [
    { id: "now", title: "Now" },
    { id: "week-before", title: "1 week before" },
    { id: "night-before", title: "Night before" },
  ] as const;
  return (
    <div className="flex flex-col gap-4">
      {surgery && <p className="m-0 font-semibold">Surgery date: {formatUS(surgery)}</p>}
      <div className="columns-2 gap-6 [&>section]:mb-4">
      {blocks.map((b) => (
        <Block key={b.id} title={b.title}>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {CHECKLIST.filter((c) => c.block === b.id).map((c) => {
              const due = surgery && c.dueOffsetDays !== undefined ? addDays(surgery, c.dueOffsetDays) : null;
              return (
                <li key={c.id} className="flex break-inside-avoid gap-2.5">
                  <span aria-hidden="true" className="mt-1 inline-block h-4 w-4 shrink-0 rounded-sm border-2 border-text" />
                  <span>
                    <strong>{c.title}</strong>
                    {due ? <strong> (by {formatUS(due)})</strong> : null}. {c.detail}
                  </span>
                </li>
              );
            })}
          </ul>
        </Block>
      ))}
      </div>
    </div>
  );
}

function ProtocolSheet({ id, surgery }: { id: ProtocolId; surgery: Date | null }) {
  const p = PROTOCOLS[id];
  return (
    <div className="flex flex-col gap-4">
      <p className="m-0 rounded border border-border p-2 text-sm font-semibold">
        {PROTOCOL_NOTICE} {PT_OVERRIDE_NOTICE}
      </p>
      {surgery && <p className="m-0 font-semibold">Surgery date: {formatUS(surgery)}</p>}
      <div className="columns-2 gap-6 [&>section]:mb-4">
        <Block title="Range of motion limits, Phase I">
          <List items={romLimits(p)} />
        </Block>
        <Block title="Key rules">
          <List items={keyRules(p)} />
        </Block>
      </div>
      {p.phases.map((ph) => {
        const start = surgery ? addDays(surgery, (ph.startWeek - 1) * 7) : null;
        const end = surgery ? addDays(surgery, ph.endWeek * 7 - 1) : null;
        const ex = [...new Set(ph.weeks.flatMap((w) => w.exerciseIds))].map((e) => exerciseById(e).name);
        return (
          <Block
            long
            key={ph.n}
            title={`Phase ${ph.n}: ${ph.name} · ${ph.rangeLabel}${start && end ? ` · ${formatUS(start)} to ${formatUS(end)}` : ""}`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="m-0 mb-1 text-sm font-bold">Goals</h3>
                <List items={ph.goals} />
              </div>
              <div>
                <h3 className="m-0 mb-1 text-sm font-bold">Move on when</h3>
                {ph.criteriaToProgress.length ? (
                  <List items={ph.criteriaToProgress} />
                ) : (
                  <p className="m-0">{ph.n === 4 ? HOME_PROGRAM : "Your therapist decides when you are ready for the next phase."}</p>
                )}
              </div>
            </div>
            {ex.length > 0 && (
              <p className="m-0 text-sm">
                <strong>Exercises:</strong> {ex.join(", ")}.
              </p>
            )}
          </Block>
        );
      })}
      <p className="m-0 text-sm">
        {DATES_ARE_ESTIMATES} {HOME_PROGRAM}
      </p>
    </div>
  );
}

function CareSheet() {
  return (
    <div className="flex flex-col gap-4">
      <div className="columns-2 gap-6 [&>section]:mb-4">
        {HOME_CARE.map((s) => (
          <Section key={s.id} s={s} />
        ))}
      </div>
      <p className="m-0 rounded border border-border p-2 font-semibold">{MEDICATION_NOTICE}</p>
      <div className="columns-2 gap-6 [&>section]:mb-4">
        <Section s={STANDARD_MEDICATIONS} />
        <Section s={MEDICATION_TIPS} />
      </div>
    </div>
  );
}

function RedFlagCard() {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex break-inside-avoid flex-col gap-2 rounded-lg border-2 border-alert p-4">
        <h2 className="m-0 text-xl font-bold uppercase text-alert">{CALL_NOW.title}</h2>
        <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5 text-lg font-semibold">
          {CALL_NOW.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="m-0 font-bold">{CALL_NUMBERS.emergency}</p>
      </section>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-border p-3">
          <p className="m-0 text-sm font-semibold uppercase">Office, weekdays</p>
          <p className="m-0 text-2xl font-bold">{PRACTICE.office.label}</p>
        </div>
        <div className="rounded-lg border border-border p-3">
          <p className="m-0 text-sm font-semibold uppercase">Nights and weekends, on-call</p>
          <p className="m-0 text-2xl font-bold">{PRACTICE.afterHours.label}</p>
        </div>
      </div>
      <p className="m-0 text-sm">{CALL_NUMBERS.afterHoursUse}</p>
      <Section s={USUALLY_NORMAL} />
    </div>
  );
}

export function PrintSheetView({ id }: { id: PrintSheetId }) {
  const hydrated = useHydrated();
  const profile = useProfile();
  const [chosen, setChosen] = useState<ProtocolId | null>(null);
  const sheet = printSheet(id)!;
  const saved: ProtocolId = profile?.procedure && profile.procedure !== "different" ? profile.procedure : "standard";
  const proc = chosen ?? saved;
  const surgery = profile?.surgeryDate ? fromISO(profile.surgeryDate) : null;
  const pdf = pdfFor(sheet, proc);
  const perProcedure = id === "protocol";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 print:hidden">
        <Link href="/print" className="self-start font-semibold underline underline-offset-2">
          Back to the print center
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          {perProcedure && (
            <>
              <label htmlFor="proc" className="font-semibold">
                Procedure:
              </label>
              <select
                id="proc"
                value={proc}
                onChange={(e) => setChosen(e.target.value as ProtocolId)}
                className="min-h-11 rounded-md border border-border bg-surface px-2 text-text"
              >
                {(Object.keys(PROC_LABEL) as ProtocolId[]).map((p) => (
                  <option key={p} value={p}>
                    {PROC_LABEL[p]}
                  </option>
                ))}
              </select>
            </>
          )}
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-12 items-center rounded-md bg-accent px-5 font-bold text-accent-ink"
          >
            Print this page
          </button>
          {pdf && (
            <a href={pdf} className="inline-flex min-h-12 items-center font-semibold underline underline-offset-2">
              Open Dr. Gombera&apos;s PDF instead
            </a>
          )}
        </div>
        <p className="m-0 text-sm text-muted">
          {surgery
            ? "Your dates are added from this device only. They are not sent anywhere."
            : "Add your surgery date on the home page to print your own dates."}
        </p>
      </div>

      {/* The sheet: always light, letter width */}
      <article className="theme-light mx-auto w-full max-w-[8.5in] rounded-lg bg-white p-8 text-[15px] leading-snug text-text shadow print:max-w-none print:rounded-none print:p-0 print:shadow-none">
        <header className="mb-5 flex items-center justify-between gap-4 border-b-2 border-brand pb-3">
          <div>
            <p className="m-0 text-xs font-semibold uppercase tracking-widest text-muted">Fix My Hips · {PRACTICE.doctor}</p>
            <h1 className="m-0 font-display text-4xl font-extrabold uppercase leading-tight text-brand">{sheet.title}</h1>
            {perProcedure && <p className="m-0 font-semibold">{PROTOCOLS[proc].title}</p>}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PRACTICE.logoUrl} alt="Mufaddal Gombera, MD" className="h-12 w-auto" />
        </header>

        {!hydrated ? null : id === "checklist" ? (
          <Checklist surgery={surgery} />
        ) : id === "protocol" ? (
          <ProtocolSheet id={proc} surgery={surgery} />
        ) : id === "care" ? (
          <CareSheet />
        ) : (
          <RedFlagCard />
        )}

        <footer className="mt-6 flex break-inside-avoid flex-wrap justify-between gap-2 border-t border-border pt-2 text-xs text-muted">
          <span>
            {PRACTICE.group} · {PRACTICE.address}
          </span>
          <span>
            Office {PRACTICE.office.label} · After hours {PRACTICE.afterHours.label} · fixmyhips.com
          </span>
          <span className="w-full">Content reviewed by Dr. Gombera.</span>
        </footer>
      </article>
    </div>
  );
}
