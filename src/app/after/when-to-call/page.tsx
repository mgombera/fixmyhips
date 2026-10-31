import type { Metadata } from "next";
import { CALL_NOW, CALL_NUMBERS, USUALLY_NORMAL } from "@/content";
import { Bullets, Card, Container, PageHeader } from "@/components/ui";
import { routeInfo } from "@/lib/routes";
import { PRACTICE } from "@/lib/site";

const r = routeInfo("/after/when-to-call");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/after/when-to-call" } };

export default function WhenToCallPage() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="After surgery"
        title="When to call"
        intro="Some swelling, bruising and numbness is expected after surgery. Call us if you notice any of the signs below."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="flex flex-col gap-3">
          <h2 className="m-0 text-xl font-bold">{CALL_NOW.title}</h2>
          <Bullets items={CALL_NOW.points} />
          <p className="m-0 text-sm text-muted">{CALL_NUMBERS.emergency}</p>
        </Card>
        <Card className="flex flex-col gap-3">
          <h2 className="m-0 text-xl font-bold">{USUALLY_NORMAL.title}</h2>
          <Bullets items={USUALLY_NORMAL.points} />
        </Card>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
        <p className="m-0">
          Office, weekdays:{" "}
          <a href={`tel:${PRACTICE.office.tel}`} className="whitespace-nowrap font-semibold underline underline-offset-2">
            {PRACTICE.office.label}
          </a>
        </p>
        <p className="m-0">
          Nights and weekends, on-call:{" "}
          <a href={`tel:${PRACTICE.afterHours.tel}`} className="whitespace-nowrap font-semibold underline underline-offset-2">
            {PRACTICE.afterHours.label}
          </a>
        </p>
      </div>
      <p className="mt-2 mb-0 text-sm text-muted">{CALL_NUMBERS.afterHoursUse}</p>
    </Container>
  );
}
