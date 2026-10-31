"use client";

import { useMemo, useState } from "react";
import { FAQ } from "@/content";

export function FaqList() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? FAQ.filter((f) => (f.q + " " + f.a).toLowerCase().includes(t)) : FAQ;
  }, [q]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="faq-search" className="font-semibold">
          Search questions
        </label>
        <input
          id="faq-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="For example: shower, crutches, drive"
          className="min-h-12 w-full max-w-lg rounded-md border border-border bg-surface px-3 text-lg text-text"
        />
        <p className="m-0 text-sm text-muted" aria-live="polite">
          {q ? `${results.length} ${results.length === 1 ? "answer" : "answers"}` : ""}
        </p>
      </div>
      {(["before", "after"] as const).map((g) => {
        const items = results.filter((f) => f.group === g);
        if (!items.length) return null;
        return (
          <section key={g} aria-labelledby={`faq-${g}`} className="flex flex-col gap-3">
            <h2 id={`faq-${g}`} className="m-0 font-display text-3xl font-bold uppercase">
              {g === "before" ? "Before surgery" : "After surgery"}
            </h2>
            {items.map((f) => (
              <details key={f.id} className="rounded-xl border border-border bg-surface" open={Boolean(q)}>
                <summary className="flex min-h-14 cursor-pointer items-center px-5 text-lg font-semibold">{f.q}</summary>
                <p className="m-0 px-5 pb-5">{f.a}</p>
              </details>
            ))}
          </section>
        );
      })}
      {results.length === 0 && (
        <p className="m-0">
          No answers match. Call the office at <a href="tel:+17137943457">(713) 794-3457</a>.
        </p>
      )}
    </div>
  );
}
