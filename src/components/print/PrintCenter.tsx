"use client";

import Link from "next/link";
import { PRINT_SHEETS, pdfFor } from "@/content";
import { useProfile } from "@/lib/profile";
import { Card } from "../ui";

// Lists the four sheets. Where Dr. Gombera has supplied his own PDF
// (src/content/print.ts), that is offered first.
export function PrintCenter() {
  const profile = useProfile();
  const proc = profile?.procedure && profile.procedure !== "different" ? profile.procedure : "standard";
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {PRINT_SHEETS.map((s) => {
        const pdf = pdfFor(s, proc);
        return (
          <Card key={s.id} className="flex flex-col gap-3">
            <h2 className="m-0 font-display text-3xl font-bold uppercase">{s.title}</h2>
            <p className="m-0 text-muted">{s.summary}</p>
            <div className="mt-auto flex flex-wrap items-center gap-3">
              {pdf ? (
                <>
                  <a
                    href={pdf}
                    className="inline-flex min-h-12 items-center rounded-md bg-accent px-5 font-bold text-accent-ink no-underline"
                  >
                    Open PDF
                  </a>
                  <Link href={`/print/${s.id}`} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-2">
                    Print the web version
                  </Link>
                </>
              ) : (
                <Link
                  href={`/print/${s.id}`}
                  className="inline-flex min-h-12 items-center rounded-md bg-accent px-5 font-bold text-accent-ink no-underline"
                >
                  Open and print
                </Link>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
