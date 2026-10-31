import type { Metadata } from "next";
import Link from "next/link";
import { HOME_CARE, MEDICATION_NOTICE, MEDICATION_TIPS, STANDARD_MEDICATIONS } from "@/content";
import { Bullets, Card, Container, PageHeader, Reviewed, SectionTitle } from "@/components/ui";
import { AlertIcon } from "@/components/icons";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/after/care");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/after/care" } };

export default function CarePage() {
  return (
    <Container className="py-10">
      <PageHeader eyebrow="After surgery" title="Home care" intro="Dressing, showering, ice, brace, activity, driving, work and medications." />

      <Link
        href="/red-flags"
        className="mt-8 flex min-h-14 items-center gap-3 rounded-xl border-2 border-alert bg-alert-surface p-4 font-semibold text-alert no-underline"
      >
        <AlertIcon className="shrink-0" />
        Fever over 101°F, calf pain, or pain that will not let up? See when to call.
      </Link>

      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
        {[...HOME_CARE.map((s) => ({ id: s.id, title: s.title })), { id: "medications", title: "Medications" }].map((s) => (
          <a key={s.id} href={`#${s.id}`} className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-2">
            {s.title}
          </a>
        ))}
      </nav>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {HOME_CARE.map((s) => (
          <Card key={s.id} className="flex scroll-mt-4 flex-col gap-3">
            <h2 id={s.id} className="m-0 text-xl font-bold">
              {s.title}
            </h2>
            <Bullets items={s.points} />
          </Card>
        ))}
      </div>

      <section aria-labelledby="medications" className="mt-14 flex scroll-mt-4 flex-col gap-4">
        <SectionTitle id="medications">Medications</SectionTitle>
        <div role="note" className="flex gap-3 rounded-xl border-2 border-accent bg-surface p-4">
          <AlertIcon className="mt-0.5 shrink-0 text-accent" />
          <p className="m-0 text-lg font-semibold">{MEDICATION_NOTICE}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="flex flex-col gap-3">
            <h3 className="m-0 text-xl font-bold">{STANDARD_MEDICATIONS.title}</h3>
            <Bullets items={STANDARD_MEDICATIONS.points} />
          </Card>
          <Card className="flex flex-col gap-3">
            <h3 className="m-0 text-xl font-bold">{MEDICATION_TIPS.title}</h3>
            <Bullets items={MEDICATION_TIPS.points} />
          </Card>
        </div>
      </section>
      <Reviewed />
    </Container>
  );
}
