import type { Metadata } from "next";
import { CALL_NOW, CALL_NUMBERS, USUALLY_NORMAL } from "@/content";
import { AlertIcon, PhoneIcon } from "@/components/icons";
import { Container, PageHeader } from "@/components/ui";
import { routeInfo } from "@/lib/routes";
import { PRACTICE } from "@/lib/site";

const r = routeInfo("/red-flags");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/red-flags" } };

export default function RedFlagsPage() {
  return (
    <Container className="py-10">
      <PageHeader eyebrow="After surgery" title="When to call" intro="Some swelling, bruising and numbness is expected. These are not." />

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_20rem]">
        <section aria-labelledby="call" className="flex flex-col gap-4 rounded-xl border-2 border-alert bg-alert-surface p-5">
          <h2 id="call" className="m-0 flex items-center gap-3 font-display text-3xl font-bold uppercase text-alert">
            <AlertIcon className="h-7 w-7 shrink-0" /> {CALL_NOW.title}
          </h2>
          <ul className="m-0 flex list-disc flex-col gap-2 pl-6 text-lg font-semibold">
            {CALL_NOW.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="m-0 rounded-lg border border-alert p-3 font-bold">{CALL_NUMBERS.emergency}</p>
        </section>

        <div className="flex flex-col gap-3">
          <a
            href={`tel:${PRACTICE.office.tel}`}
            className="flex min-h-16 flex-col justify-center gap-0.5 rounded-xl bg-alert px-5 py-3 text-bg no-underline"
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              <PhoneIcon /> Office, weekdays
            </span>
            <span className="text-2xl font-bold">{PRACTICE.office.label}</span>
          </a>
          <a
            href={`tel:${PRACTICE.afterHours.tel}`}
            className="flex min-h-16 flex-col justify-center gap-0.5 rounded-xl border-2 border-alert px-5 py-3 text-alert no-underline"
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              <PhoneIcon /> Nights and weekends, on-call
            </span>
            <span className="text-2xl font-bold">{PRACTICE.afterHours.label}</span>
          </a>
          <p className="m-0 text-sm text-muted">{CALL_NUMBERS.afterHoursUse}</p>
        </div>
      </div>

      <section aria-labelledby="normal" className="mt-8 flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
        <h2 id="normal" className="m-0 font-display text-3xl font-bold uppercase">
          {USUALLY_NORMAL.title}
        </h2>
        <ul className="m-0 grid list-disc gap-x-8 gap-y-2 pl-6 sm:grid-cols-2">
          {USUALLY_NORMAL.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
