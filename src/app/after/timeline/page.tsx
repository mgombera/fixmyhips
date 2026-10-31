import type { Metadata } from "next";
import { Timeline } from "@/components/Timeline";
import { Container, PageHeader } from "@/components/ui";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/after/timeline");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/after/timeline" } };

export default function TimelinePage() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="After surgery"
        title="Recovery timeline"
        intro="Recovery is not a straight line. You move to the next phase when your therapist confirms you meet its criteria."
      />
      <div className="mt-8">
        <Timeline />
      </div>
    </Container>
  );
}
