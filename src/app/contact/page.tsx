import type { Metadata } from "next";
import Link from "next/link";
import { Card, Container, PageHeader } from "@/components/ui";
import { PhoneIcon } from "@/components/icons";
import { routeInfo } from "@/lib/routes";
import { PRACTICE } from "@/lib/site";

const r = routeInfo("/contact");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/contact" } };

const LINES = [
  { name: "Office, weekdays", sub: "Questions, scheduling, rescheduling, refills before 5 p.m.", phone: PRACTICE.office },
  { name: "After hours and weekends", sub: "On-call physician, for urgent problems", phone: PRACTICE.afterHours },
  { name: "PreAdmit testing", sub: "Texas Orthopedic Hospital, 3rd floor. 8 a.m. to 5 p.m., Monday to Friday", phone: PRACTICE.preAdmit },
];

export default function ContactPage() {
  return (
    <Container className="py-10">
      <PageHeader eyebrow="Contact" title="Reach us" intro="Call for anything that cannot wait. Use the patient portal for non-urgent messages." />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {LINES.map((l) => (
          <a
            key={l.phone.tel}
            href={`tel:${l.phone.tel}`}
            className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-5 text-text no-underline hover:border-accent"
          >
            <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted">
              <PhoneIcon /> {l.name}
            </span>
            <span className="font-display text-4xl font-bold">{l.phone.label}</span>
            <span className="text-sm text-muted">{l.sub}</span>
          </a>
        ))}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card className="flex flex-col gap-2">
          <h2 className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">Patient portal</h2>
          <p className="m-0">Non-urgent messages through athenahealth. Not for urgent problems.</p>
          <a href={PRACTICE.portalUrl} className="inline-flex min-h-12 items-center self-start rounded-md bg-accent px-5 font-bold text-accent-ink no-underline">
            Open the patient portal
          </a>
        </Card>
        <Card className="flex flex-col gap-2">
          <h2 className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">Email</h2>
          <a href={`mailto:${PRACTICE.email}`} className="text-lg font-semibold">
            {PRACTICE.email}
          </a>
          <p className="m-0 text-sm text-muted">Please do not email medical details or urgent problems.</p>
        </Card>
        <Card className="flex flex-col gap-2">
          <h2 className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">Office</h2>
          <p className="m-0 font-semibold">{PRACTICE.group}</p>
          <p className="m-0">{PRACTICE.address}</p>
          <a href={PRACTICE.mapUrl} className="font-semibold">
            Open in maps
          </a>
        </Card>
      </div>
      <p className="mt-8 mb-0">
        Emergency? Go to the nearest emergency room. Worried about a symptom?{" "}
        <Link href="/red-flags" className="underline underline-offset-2">See when to call</Link>.
      </p>
    </Container>
  );
}
