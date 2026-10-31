import type { Metadata } from "next";
import { PREHAB_EXERCISES, PREHAB_GOALS, PREHAB_INTRO, PREHAB_RESTRICTIONS, PT_OVERRIDE_NOTICE } from "@/content";
import { Bullets, Card, Container, PageHeader } from "@/components/ui";
import { AlertIcon, PhoneIcon } from "@/components/icons";
import { routeInfo } from "@/lib/routes";
import { PRACTICE } from "@/lib/site";

const r = routeInfo("/before/prehab");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/before/prehab" } };

export default function PrehabPage() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Before surgery · Optional"
        title="Prehab"
        intro="Two weeks of physical therapy before surgery, so you start recovery stronger and already know the rules."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <Card className="flex flex-col gap-4 self-start border-accent lg:col-start-2 lg:row-start-1">
          <h2 className="m-0 font-display text-3xl font-bold uppercase">{PREHAB_INTRO.title}</h2>
          <Bullets items={PREHAB_INTRO.points} />
          <a
            href={`tel:${PRACTICE.office.tel}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-5 font-bold text-accent-ink no-underline"
          >
            <PhoneIcon /> {PRACTICE.office.label}
          </a>
        </Card>
        <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1">
          <div role="note" className="flex gap-3 rounded-xl border-2 border-accent bg-surface p-4">
            <AlertIcon className="mt-0.5 shrink-0 text-accent" />
            <p className="m-0">{PT_OVERRIDE_NOTICE}</p>
          </div>
          {[PREHAB_GOALS, PREHAB_EXERCISES, PREHAB_RESTRICTIONS].map((s) => (
            <Card key={s.id} className="flex flex-col gap-3">
              <h2 className="m-0 text-xl font-bold">{s.title}</h2>
              <Bullets items={s.points} />
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
