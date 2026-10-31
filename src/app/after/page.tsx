import type { Metadata } from "next";
import { AfterDashboard } from "@/components/AfterDashboard";
import { Container, Reviewed } from "@/components/ui";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/after");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/after" } };

export default function AfterPage() {
  return (
    <Container className="py-10">
      <AfterDashboard />
      <Reviewed />
    </Container>
  );
}
