import type { Metadata } from "next";
import { HipExplorer } from "@/components/hip/HipExplorer";
import { Container, PageHeader, Reviewed } from "@/components/ui";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/hip");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/hip" } };

export default function HipPage() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Explore"
        title="Your hip"
        intro="Turn the hip, tap a part, and switch between before and after surgery to see what was repaired."
      />
      <div className="mt-8">
        <HipExplorer />
      </div>
      <Reviewed />
    </Container>
  );
}
