import type { Metadata } from "next";
import Image from "next/image";
import { MHT_INTRO, MHT_LINK, MHT_NOTICE, MHT_PATHWAYS, MHT_TIERS } from "@/content";
import { AlertIcon } from "@/components/icons";
import { Bullets, Card, Container, PageHeader } from "@/components/ui";
import { routeInfo } from "@/lib/routes";
import { PRACTICE } from "@/lib/site";

const r = routeInfo("/after/home-program");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/after/home-program" } };

export default function HomeProgramPage() {
  return (
    <Container className="py-10">
      <PageHeader eyebrow="After surgery · Optional" title="Home program" intro={MHT_INTRO} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <Card className="flex flex-col items-center gap-3 self-start border-accent text-center lg:col-start-2 lg:row-start-1">
          <h2 className="m-0 font-display text-3xl font-bold uppercase">Get started</h2>
          <a
            href={MHT_LINK}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-accent px-5 font-bold text-accent-ink no-underline"
          >
            Open myHealthTrack
          </a>
          <Image
            src="/images/2026-11-01-myhealthtrack-qr.png"
            alt="QR code that opens myHealthTrack"
            width={180}
            height={180}
            className="rounded-md bg-white p-2"
          />
          <p className="m-0 text-sm text-muted">On a computer? Scan with your phone camera. Please use the camera, not a QR reader app.</p>
          <p className="m-0 text-sm">
            Questions or cost:{" "}
            <a href={`tel:${PRACTICE.office.tel}`} className="whitespace-nowrap font-semibold underline underline-offset-2">
              {PRACTICE.office.label}
            </a>
          </p>
        </Card>

        <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1">
          <div role="note" className="flex gap-3 rounded-xl border border-accent bg-surface p-4">
            <AlertIcon className="mt-0.5 shrink-0 text-accent" />
            <p className="m-0">{MHT_NOTICE}</p>
          </div>

          <Card className="flex flex-col gap-3">
            <h2 className="m-0 text-xl font-bold">Choose your pathway</h2>
            <dl className="m-0 flex flex-col gap-3">
              {MHT_PATHWAYS.map((p) => (
                <div key={p.procedure} className="flex flex-col gap-0.5">
                  <dt className="text-sm text-muted">{p.procedure}</dt>
                  <dd className="m-0 font-semibold">{p.pathway}</dd>
                </div>
              ))}
            </dl>
          </Card>

          {MHT_TIERS.map((t) => (
            <Card key={t.id} className="flex flex-col gap-3">
              <h2 className="m-0 text-xl font-bold">{t.title}</h2>
              <Bullets items={t.points} />
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
