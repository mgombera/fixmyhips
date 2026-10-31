import type { Metadata } from "next";
import { PrintCenter } from "@/components/print/PrintCenter";
import { Container, PageHeader } from "@/components/ui";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/print");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/print" } };

export default function PrintPage() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Print"
        title="Print center"
        intro="Printable sheets for the fridge, your therapist or your bag. If you added your surgery date, your own dates print too."
      />
      <div className="mt-8">
        <PrintCenter />
      </div>
    </Container>
  );
}
