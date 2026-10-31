"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { clearProfile, readPreset, saveSetup, storageAvailable } from "@/lib/profile";
import type { Profile } from "@/lib/profile";
import { PROCEDURE_OPTIONS } from "@/lib/procedures";
import { formatUS, fromISO, toISO } from "@/lib/recovery";
import type { Procedure } from "@/lib/recovery";
import { differenceInCalendarDays } from "date-fns";

export function SetupForm({ existing }: { existing: Profile | null }) {
  const router = useRouter();
  const [date, setDate] = useState(existing?.surgeryDate ?? "");
  const [notScheduled, setNotScheduled] = useState(existing ? existing.surgeryDate === null : false);
  const [procedure, setProcedure] = useState<Procedure>(() => existing?.procedure ?? readPreset() ?? "standard");
  const [error, setError] = useState<string | null>(null);
  const [cleared, setCleared] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!notScheduled) {
      const d = fromISO(date);
      if (!d) {
        setError("Enter your surgery date, or choose \"Not scheduled yet.\"");
        return;
      }
      saveSetup(toISO(d), procedure);
      router.push(differenceInCalendarDays(d, new Date()) > 0 ? "/before" : "/after");
      return;
    }
    saveSetup(null, procedure);
    router.push("/before");
  }

  const parsed = fromISO(date);

  return (
    <form onSubmit={submit} className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-5 sm:p-6" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="surgery-date" className="font-display text-2xl font-bold uppercase tracking-wide">
          1. Your surgery date
        </label>
        <input
          id="surgery-date"
          type="date"
          value={date}
          disabled={notScheduled}
          onChange={(e) => {
            setDate(e.target.value);
            setError(null);
          }}
          aria-describedby="date-help"
          aria-invalid={error ? true : undefined}
          className="min-h-12 w-full max-w-xs rounded-md border border-border bg-bg px-3 text-lg text-text disabled:opacity-50"
        />
        <p id="date-help" className="m-0 text-sm text-muted">
          {parsed && !notScheduled ? `Surgery on ${formatUS(parsed)}.` : "Use the date on your surgery confirmation."}
        </p>
        <label className="flex min-h-11 items-center gap-3">
          <input
            type="checkbox"
            checked={notScheduled}
            onChange={(e) => {
              setNotScheduled(e.target.checked);
              setError(null);
            }}
            className="h-5 w-5 accent-[var(--accent)]"
          />
          <span>Not scheduled yet</span>
        </label>
      </div>

      <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
        <legend className="mb-2 p-0 font-display text-2xl font-bold uppercase tracking-wide">2. Your procedure</legend>
        {PROCEDURE_OPTIONS.map((o) => (
          <label
            key={o.value}
            className={`flex cursor-pointer gap-3 rounded-lg border p-3 ${
              procedure === o.value ? "border-accent bg-bg" : "border-border"
            }`}
          >
            <input
              type="radio"
              name="procedure"
              value={o.value}
              checked={procedure === o.value}
              onChange={() => setProcedure(o.value)}
              className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]"
            />
            <span className="flex flex-col">
              <span className="font-semibold">{o.label}</span>
              <span className="text-sm text-muted">{o.detail}</span>
            </span>
          </label>
        ))}
      </fieldset>

      {error && (
        <p role="alert" className="m-0 rounded-md border border-alert bg-alert-surface p-3 font-semibold text-alert">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="min-h-12 rounded-md bg-accent px-6 text-lg font-bold text-accent-ink"
        >
          {existing ? "Save changes" : "Show my plan"}
        </button>
        <p className="m-0 text-sm text-muted">
          {storageAvailable()
            ? "Saved only on this device. Nothing is sent to us or anyone else."
            : "Your browser is blocking storage (private browsing?), so this will be forgotten when you close the page."}
        </p>
        {existing && (
          <button
            type="button"
            onClick={() => {
              clearProfile();
              setDate("");
              setNotScheduled(false);
              setProcedure("standard");
              setCleared(true);
            }}
            className="min-h-11 self-start rounded-md border border-border px-4 text-sm font-semibold text-muted hover:text-text"
          >
            Clear my information from this device
          </button>
        )}
        {cleared && (
          <p role="status" className="m-0 text-sm font-semibold">
            Your information was removed from this device.
          </p>
        )}
      </div>
    </form>
  );
}
