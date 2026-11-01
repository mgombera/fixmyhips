"use client";

import Link from "next/link";
import { addDays } from "date-fns";
import { DATES_ARE_ESTIMATES, HOME_PROGRAM, PROTOCOL_NOTICE } from "@/content";
import { useHydrated } from "@/lib/profile";
import { formatUS, status } from "@/lib/recovery";
import { useProtocol } from "@/lib/useProtocol";
import { Bullets } from "./ui";
import { keyRules, romLimits } from "@/lib/protocolText";

export function Timeline() {
  const hydrated = useHydrated();
  const { protocol, procedure, surgery, isDefault } = useProtocol();
  if (!hydrated) return <div className="min-h-96" aria-busy="true" />;

  const s = surgery ? status(surgery, new Date(), procedure) : null;
  const currentN = s?.mode === "after" ? (s.phase?.n ?? 5) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
        <p className="m-0">
          <strong>Showing: {protocol.title}.</strong>{" "}
          {isDefault ? (
            <Link href="/" className="underline underline-offset-2">
              Set your procedure
            </Link>
          ) : (
            <Link href="/?setup=1" className="underline underline-offset-2">
              Change procedure
            </Link>
          )}
        </p>
        <p className="m-0 text-sm text-muted">{PROTOCOL_NOTICE}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4">
          <h2 className="m-0 mb-2 text-sm font-semibold uppercase tracking-widest text-muted">Range of motion limits, Phase I</h2>
          <Bullets items={romLimits(protocol)} />
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <h2 className="m-0 mb-2 text-sm font-semibold uppercase tracking-widest text-muted">Key rules</h2>
          <Bullets items={keyRules(protocol)} />
        </div>
      </div>

      <ol className="m-0 flex list-none flex-col gap-4 p-0">
        {protocol.phases.map((ph) => {
          const current = ph.n === currentN;
          const done = ph.n < currentN;
          const start = surgery ? addDays(surgery, (ph.startWeek - 1) * 7) : null;
          const end = surgery ? addDays(surgery, ph.endWeek * 7 - 1) : null;
          return (
            <li
              key={ph.n}
              aria-current={current ? "step" : undefined}
              className={`flex flex-col gap-4 rounded-xl border bg-surface p-5 ${current ? "border-2 border-accent" : "border-border"} ${done ? "opacity-75" : ""}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="m-0 font-display text-3xl font-bold uppercase">
                  Phase {ph.n}: {ph.name}
                </h2>
                <span className="font-semibold text-muted">
                  {ph.rangeLabel}
                  {start && end ? ` · ${formatUS(start)} to ${formatUS(end)}` : ""}
                </span>
              </div>
              {current && (
                <span className="self-start rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-accent-ink">
                  You are here
                </span>
              )}
              {done && <span className="text-sm font-semibold text-muted">Completed</span>}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="m-0 mb-2 text-sm font-semibold uppercase tracking-widest text-muted">Goals</h3>
                  <Bullets items={ph.goals} />
                </div>
                <div>
                  <h3 className="m-0 mb-2 text-sm font-semibold uppercase tracking-widest text-muted">Move on when</h3>
                  {ph.criteriaToProgress.length ? (
                    <Bullets items={ph.criteriaToProgress} />
                  ) : (
                    <p className="m-0">
                      {ph.n === 4 ? HOME_PROGRAM : "Your therapist decides when you are ready for the next phase."}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="m-0 text-sm text-muted">
        {DATES_ARE_ESTIMATES} {HOME_PROGRAM}
      </p>
    </div>
  );
}
