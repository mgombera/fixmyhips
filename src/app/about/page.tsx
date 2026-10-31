import type { Metadata } from "next";
import Image from "next/image";
import { Card, Container, SectionTitle } from "@/components/ui";
import { routeInfo } from "@/lib/routes";
import { PRACTICE } from "@/lib/site";

const r = routeInfo("/about");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/about" } };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Mufaddal M. Gombera, MD",
  medicalSpecialty: ["Orthopedic", "SportsMedicine"],
  url: "https://www.gomberamd.com/",
  telephone: "+1-713-794-3457",
  address: { "@type": "PostalAddress", streetAddress: "7401 Main Street", addressLocality: "Houston", addressRegion: "TX", postalCode: "77030", addressCountry: "US" },
};

// Credentials below need Dr. Gombera's confirmation before launch (milestone 7 walkthrough).
const TRAINING = [
  "Doctor of Medicine, Baylor College of Medicine",
  "Orthopaedic surgery residency, University of Michigan",
  "Sports medicine fellowship, Northwestern University",
  "Bachelor of Business Administration with High Honors, McCombs School of Business, The University of Texas at Austin",
];

const ROLES = [
  "Director, Hip Preservation Center",
  "Orthopedic surgery and sports medicine, Fondren Orthopedic Group",
  "Vice Chief of Staff, Texas Orthopedic Hospital",
  "Clinical Assistant Professor, UTMB",
  "Clinical Associate Professor, University of Houston College of Medicine",
];

export default function AboutPage() {
  return (
    <Container className="py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid items-start gap-8 lg:grid-cols-[22rem_1fr]">
        <Image
          src="/images/headshot.jpg"
          alt="Dr. Mufaddal Gombera"
          width={1674}
          height={2000}
          sizes="(min-width: 1024px) 22rem, 100vw"
          className="h-auto w-full max-w-sm rounded-xl"
          priority
        />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">Your surgeon</p>
            <h1 className="m-0 font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-7xl">
              Mufaddal M. Gombera, MD
            </h1>
            <p className="m-0 text-lg">Orthopedic surgery and sports medicine · Houston, Texas</p>
          </div>
          <p className="m-0 max-w-2xl text-lg">
            Dr. Gombera directs the Hip Preservation Center and specializes in Hip Arthroscopy, including fully knotless
            labral and capsular repair, a postless technique, and a capsule-sparing approach.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="flex flex-col gap-3">
              <SectionTitle>Roles</SectionTitle>
              <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5">
                {ROLES.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Card>
            <Card className="flex flex-col gap-3">
              <SectionTitle>Training</SectionTitle>
              <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5">
                {TRAINING.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Card>
          </div>
          <a
            href={PRACTICE.consultUrl}
            className="inline-flex min-h-12 items-center self-start rounded-md bg-accent px-5 font-bold text-accent-ink no-underline"
          >
            More at gomberamd.com
          </a>
        </div>
      </div>
    </Container>
  );
}
