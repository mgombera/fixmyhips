"use client";

import { useRouter } from "next/navigation";
import { addDays } from "date-fns";
import type { ProtocolId } from "@/content";
import { clearProfile, saveSetup } from "@/lib/profile";
import { toISO } from "@/lib/recovery";

// One tap sets an example surgery date and procedure on this device, then
// opens the page to review. Checkpoint days come from scope section 10.

const PROCS: { id: ProtocolId; label: string }[] = [
  { id: "standard", label: "Standard" },
  { id: "revision", label: "Revision or reconstruction" },
  { id: "glute", label: "Gluteus medius repair" },
];

const BEFORE = [
  { label: "Not scheduled yet", offset: null as number | null },
  { label: "12 days out", offset: 12 },
  { label: "PreAdmit overdue (5 days out)", offset: 5 },
  { label: "Night before", offset: 1 },
];

const AFTER_DAYS = [1, 18, 30, 45, 70, 100, 130];

const btn =
  "inline-flex min-h-11 items-center rounded-md border border-border bg-bg px-3 text-sm font-semibold text-text hover:border-accent";

export function Walkthrough() {
  const router = useRouter();
  const load = (proc: ProtocolId, surgery: Date | null, to: string) => {
    clearProfile(); // start each state with nothing ticked
    saveSetup(surgery ? toISO(surgery) : null, proc);
    router.push(to);
  };
  const today = new Date();

  return (
    <div className="flex flex-col gap-6">
      {PROCS.map((p) => (
        <section key={p.id} aria-labelledby={`wt-${p.id}`} className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
          <h2 id={`wt-${p.id}`} className="m-0 font-display text-3xl font-bold uppercase">
            {p.label}
          </h2>
          <div className="flex flex-col gap-2">
            <h3 className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">Before surgery</h3>
            <div className="flex flex-wrap gap-2">
              {BEFORE.map((b) => (
                <button
                  key={b.label}
                  type="button"
                  className={btn}
                  onClick={() => load(p.id, b.offset === null ? null : addDays(today, b.offset), "/before")}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">After surgery</h3>
            <div className="flex flex-wrap gap-2">
              {AFTER_DAYS.map((d) => (
                <button key={d} type="button" className={btn} onClick={() => load(p.id, addDays(today, -d), "/after")}>
                  Day {d}
                </button>
              ))}
            </div>
          </div>
        </section>
      ))}
      <button
        type="button"
        onClick={() => {
          clearProfile();
          router.push("/");
        }}
        className="inline-flex min-h-12 items-center self-start rounded-md bg-accent px-5 font-bold text-accent-ink"
      >
        Done: clear the example from this device
      </button>
    </div>
  );
}
