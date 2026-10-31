import type { Metadata } from "next";
import Image from "next/image";
import { SURGERY_DAY } from "@/content";
import { Bullets, Container, PageHeader } from "@/components/ui";
import { routeInfo } from "@/lib/routes";
import { PRACTICE } from "@/lib/site";

const r = routeInfo("/before/surgery-day");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/before/surgery-day" } };

export default function SurgeryDayPage() {
  return (
    <>
      <Container className="py-10">
        <PageHeader eyebrow="Before surgery" title="Surgery day" intro="What happens, step by step, from the arrival call to going home." />
        <ol className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {SURGERY_DAY.map((s, i) => (
            <li key={s.id} className="flex flex-col gap-3 rounded-xl border-t-4 border-accent bg-surface p-5">
              <span className="font-display text-4xl font-extrabold text-accent" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="m-0 text-lg font-bold">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h2>
              <Bullets items={s.points} />
            </li>
          ))}
        </ol>
      </Container>

      <section aria-labelledby="where" className="mt-12">
        <div className="relative isolate overflow-hidden">
          <Image
            src="/images/hospital.jpg"
            alt="Texas Orthopedic Hospital at dusk, main entrance"
            fill
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-bg via-bg/80 to-bg/10" />
          <Container className="py-16 sm:py-24">
            <div className="flex max-w-md flex-col gap-3">
              <h2 id="where" className="m-0 font-display text-4xl font-bold uppercase">
                Where to go
              </h2>
              <p className="m-0 text-lg font-semibold">{PRACTICE.hospital}</p>
              <p className="m-0">{PRACTICE.address}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={PRACTICE.mapUrl}
                  className="inline-flex min-h-12 items-center rounded-md bg-accent px-5 font-bold text-accent-ink no-underline"
                >
                  Open in maps
                </a>
                <a
                  href={`tel:${PRACTICE.office.tel}`}
                  className="inline-flex min-h-12 items-center rounded-md border border-accent px-5 font-bold text-accent no-underline"
                >
                  Call {PRACTICE.office.label}
                </a>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
