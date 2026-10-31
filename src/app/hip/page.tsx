import type { Metadata } from "next";
import Link from "next/link";
import { HipExplorer } from "@/components/hip/HipExplorer";
import { Container, PageHeader } from "@/components/ui";
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
      <p className="mt-6 mb-0">
        <Link href="/before/diagnosis#imaging-section" className="font-semibold underline underline-offset-2">
          See a real cam bump on X-ray and through the arthroscope, before and after surgery
        </Link>
      </p>
    </Container>
  );
}
