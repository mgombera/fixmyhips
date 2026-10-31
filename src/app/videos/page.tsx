import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { VIDEO_NOTICE, approvedVideos } from "@/content";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Container, SectionTitle } from "@/components/ui";
import { routeInfo } from "@/lib/routes";

const r = routeInfo("/videos");
export const metadata: Metadata = { title: r.title, description: r.summary, alternates: { canonical: "/videos" } };

export default function VideosPage() {
  const videos = approvedVideos();
  const fromDr = videos.filter((v) => v.source === "dr-gombera");
  const recovery = videos.filter((v) => v.source === "external" && v.topics.includes("recovery"));
  const exerciseCount = videos.filter((v) => v.topics.includes("exercise")).length;

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image src="/images/operating-room.jpg" alt="" fill sizes="100vw" quality={55} className="-z-10 object-cover object-[50%_25%] opacity-30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/80 to-bg/40" />
        <Container className="flex flex-col gap-3 py-14">
          <p className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">Watch</p>
          <h1 className="m-0 font-display text-6xl font-extrabold uppercase leading-[0.9] sm:text-8xl">Videos</h1>
          <p className="m-0 max-w-2xl text-lg">Hip arthroscopy explained, a patient&apos;s story, and exercises after surgery.</p>
        </Container>
      </section>
      <Container className="flex flex-col gap-12 py-10">
        <p role="note" className="m-0 rounded-xl border border-accent bg-surface p-4 font-semibold">
          {VIDEO_NOTICE}
        </p>

        <section aria-labelledby="dr" className="flex flex-col gap-4">
          <SectionTitle id="dr">From Dr. Gombera</SectionTitle>
          <div className="grid gap-4 md:grid-cols-3">
            {fromDr.map((v) => (
              <div key={v.id} className="flex flex-col gap-2">
                <VideoPlayer video={v} />
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="rec" className="flex flex-col gap-4">
          <SectionTitle id="rec">Early recovery exercises</SectionTitle>
          <p className="m-0 text-muted">Overviews from other hip arthroscopy programs. Your own protocol and therapist come first.</p>
          <div className="grid gap-4 md:grid-cols-3">
            {recovery.map((v) => (
              <VideoPlayer key={v.id} video={v} />
            ))}
          </div>
        </section>

        <section aria-labelledby="ex" className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
          <SectionTitle id="ex">Exercise by exercise</SectionTitle>
          <p className="m-0">
            {exerciseCount} short videos, one for each exercise in your protocol, sorted by phase and week.
          </p>
          <Link
            href="/after/exercises"
            className="inline-flex min-h-12 items-center self-start rounded-md bg-accent px-5 font-bold text-accent-ink no-underline"
          >
            Open the exercise library
          </Link>
        </section>
      </Container>
    </>
  );
}
