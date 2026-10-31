import type { Metadata } from "next";
import { BeforeDashboard } from "@/components/BeforeDashboard";
import { Container, Reviewed } from "@/components/ui";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/before");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/before" } };

export default function BeforePage() {
  return (
    <Container className="py-10">
      <BeforeDashboard />
      <Reviewed />
    </Container>
  );
}
