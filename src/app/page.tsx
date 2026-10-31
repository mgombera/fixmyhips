import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { HomeSetup } from "@/components/HomeSetup";
import { Container, SectionTitle } from "@/components/ui";

const LEARN = [
  {
    href: "/hip",
    title: "Your hip",
    text: "Turn a 3D hip, tap each part, and see what surgery repairs.",
    cta: "Explore the hip",
  },
  {
    href: "/videos",
    title: "Videos",
    text: "Hip arthroscopy explained, a patient's story, and every exercise after surgery.",
    cta: "Watch videos",
  },
  {
    href: "/faq",
    title: "FAQ",
    text: "Showering, crutches, the brace, driving, work, sports and more.",
    cta: "Read answers",
  },
];

const STAGES = [
  {
    href: "/before",
    title: "Before surgery",
    text: "Your countdown, PreAdmit deadline, checklist, surgery day and diagnosis.",
  },
  {
    href: "/after",
    title: "After surgery",
    text: "Your day and phase, this week's exercises, what unlocks next, timeline and home care.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/operating-room.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={55}
          className="-z-10 object-cover object-[50%_30%] opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/85 to-bg/50" />
        <Container className="flex flex-col gap-6 py-14 sm:py-20">
          <p className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">Hip arthroscopy with Dr. Gombera</p>
          <h1 className="m-0 font-display text-6xl font-extrabold uppercase leading-[0.9] sm:text-8xl">
            Your hip.
            <br />
            <span className="text-accent">Your plan.</span>
          </h1>
          <p className="m-0 max-w-xl text-lg">
            Learn about your hip and your surgery, then follow a plan for exactly what to do today, from booking through a
            full year of recovery.
          </p>
        </Container>
      </section>

      {/* 1. Learn first */}
      <Container className="flex flex-col gap-5 pt-4">
        <SectionTitle>Start here</SectionTitle>
        <div className="grid gap-4 md:grid-cols-3">
          {LEARN.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 text-text no-underline hover:border-accent"
            >
              <h3 className="m-0 font-display text-4xl font-bold uppercase">{c.title}</h3>
              <p className="m-0 flex-1 text-muted">{c.text}</p>
              <span className="font-semibold text-accent group-hover:underline">{c.cta}</span>
            </Link>
          ))}
        </div>
      </Container>

      {/* 2. Then the plan */}
      <Container className="flex flex-col gap-5 pt-14">
        <SectionTitle>Your surgery plan</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          {STAGES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col gap-2 rounded-xl border-t-4 border-accent bg-surface p-5 text-text no-underline"
            >
              <h3 className="m-0 font-display text-4xl font-bold uppercase">{c.title}</h3>
              <p className="m-0 text-muted">{c.text}</p>
              <span className="font-semibold text-accent group-hover:underline">Open</span>
            </Link>
          ))}
        </div>
        <div className="max-w-2xl">
          <p className="mt-2 mb-3 text-lg font-semibold">Make it personal: add your surgery date and procedure.</p>
          <Suspense fallback={<div className="min-h-64 rounded-xl border border-border bg-surface" />}>
            <HomeSetup />
          </Suspense>
        </div>
      </Container>
    </>
  );
}
