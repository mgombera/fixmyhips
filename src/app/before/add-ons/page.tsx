import type { Metadata } from "next";
import { BIOLOGICS } from "@/content";
import { Card, Container, PageHeader } from "@/components/ui";
import { PhoneIcon } from "@/components/icons";
import { routeInfo } from "@/lib/routes";
import { PRACTICE } from "@/lib/site";

const r = routeInfo("/before/add-ons");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/before/add-ons" } };

export default function AddOnsPage() {
  const points = BIOLOGICS.points.filter((p) => !p.startsWith("Call for pricing"));
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Before surgery · Optional"
        title="Biologic add-ons"
        intro="PRP, stem cell and connective tissue matrix treatments that can be added during your surgery."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <Card>
          <ul className="m-0 flex list-disc flex-col gap-3 pl-5 text-lg">
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Card>
        <Card className="flex flex-col gap-4 border-accent">
          <h2 className="m-0 font-display text-3xl font-bold uppercase">Call for pricing</h2>
          <p className="m-0 text-muted">Not covered by insurance. Decide before your surgery day so it can be arranged.</p>
          <a
            href={`tel:${PRACTICE.office.tel}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-5 font-bold text-accent-ink no-underline"
          >
            <PhoneIcon /> {PRACTICE.office.label}
          </a>
          <a
            href={`mailto:${PRACTICE.email}`}
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-accent px-5 font-bold text-accent no-underline"
          >
            {PRACTICE.email}
          </a>
        </Card>
      </div>
    </Container>
  );
}
