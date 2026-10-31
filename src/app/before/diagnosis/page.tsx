import type { Metadata } from "next";
import Link from "next/link";
import { DIAGNOSIS, OUTCOMES } from "@/content";
import { Bullets, Card, Container, PageHeader, Reviewed, SectionTitle } from "@/components/ui";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/before/diagnosis");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/before/diagnosis" } };

// Figures taken from the approved OUTCOMES and recovery text (pre-op letter).
const STATS = [
  { label: "Success rate", value: "85 to 90%" },
  { label: "Pain resolved", value: "80%", note: "15% the same, 5% worse" },
  { label: "Major complication", value: "<1 in 1,000" },
  { label: "Full recovery", value: "6 to 9 mo", note: "Walking comfortably by 6 to 8 weeks for most" },
];

export default function DiagnosisPage() {
  const [intro, , returnToSport, complicationRate, complicationList] = OUTCOMES.points;
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Before surgery"
        title="Your diagnosis"
        intro={
          <>
            Why your hip hurts, and what surgery fixes.{" "}
            <Link href="/hip" className="underline underline-offset-2">
              Explore the hip
            </Link>{" "}
            to see each part.
          </>
        }
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {DIAGNOSIS.map((s) => (
          <Card key={s.id} className="flex flex-col gap-3">
            <h2 className="m-0 text-xl font-bold">{s.title}</h2>
            <Bullets items={s.points} />
          </Card>
        ))}
      </div>

      <section aria-labelledby="numbers" className="mt-14 flex flex-col gap-5">
        <SectionTitle id="numbers">Know the numbers</SectionTitle>
        <dl className="m-0 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <Card key={s.label} className="flex flex-col gap-1">
              <dt className="text-xs font-semibold uppercase tracking-widest text-muted">{s.label}</dt>
              <dd className="m-0 font-display text-5xl font-bold">{s.value}</dd>
              {s.note && <dd className="m-0 text-sm text-muted">{s.note}</dd>}
            </Card>
          ))}
        </dl>
        <div className="flex max-w-3xl flex-col gap-3">
          <p className="m-0">{intro}</p>
          <p className="m-0">{returnToSport}</p>
          <p className="m-0">{complicationRate}</p>
        </div>
        <details className="rounded-xl border border-border bg-surface">
          <summary className="flex min-h-14 cursor-pointer items-center px-5 font-semibold">
            Full list of possible risks and complications
          </summary>
          <div className="px-5 pb-5">
            <p className="m-0">{complicationList}</p>
            <p className="mt-3 mb-0 text-muted">
              Dr. Gombera lists these to inform you, not to frighten you. Complications are rare, but they can happen, and you
              have a right to know.
            </p>
          </div>
        </details>
      </section>
      <Reviewed />
    </Container>
  );
}
