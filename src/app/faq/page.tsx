import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { Container, PageHeader } from "@/components/ui";
import { routeInfo } from "@/lib/routes";
import { FAQ } from "@/content";

const r = routeInfo("/faq");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/faq" } };

// FAQPage structured data for search engines.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FaqPage() {
  return (
    <Container className="py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader eyebrow="Questions" title="FAQ" intro="Answers to the questions patients ask most, before and after surgery." />
      <div className="mt-8">
        <FaqList />
      </div>
    </Container>
  );
}
