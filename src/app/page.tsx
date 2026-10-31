import Image from "next/image";
import { Suspense } from "react";
import { HomeSetup } from "@/components/HomeSetup";
import { AUDIENCE_STATEMENT, PRACTICE } from "@/lib/site";

export default function Home() {
  return (
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
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:py-20 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-start">
        <div className="flex flex-col gap-6">
          <p className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">
            Hip arthroscopy with Dr. Gombera
          </p>
          <h1 className="m-0 font-display text-6xl font-extrabold uppercase leading-[0.9] sm:text-8xl">
            Your hip.
            <br />
            <span className="text-accent">Your plan.</span>
          </h1>
          <p className="m-0 max-w-xl text-lg">
            Enter your surgery date and procedure to see exactly what to do today, from the day you book surgery through a
            full year of recovery.
          </p>
          <div className="hidden max-w-xl flex-col gap-1 lg:flex">
            <p className="m-0 font-semibold">{AUDIENCE_STATEMENT}</p>
            <p className="m-0 text-muted">
              To learn more about hip problems or to be evaluated, request a consultation at{" "}
              <a href={PRACTICE.consultUrl} className="underline underline-offset-2">
                gomberamd.com
              </a>
              .
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Suspense fallback={<div className="min-h-96 rounded-xl border border-border bg-surface" />}>
            <HomeSetup />
          </Suspense>
          <div className="flex flex-col gap-1 lg:hidden">
            <p className="m-0 font-semibold">{AUDIENCE_STATEMENT}</p>
            <p className="m-0 text-muted">
              To learn more about hip problems or to be evaluated, request a consultation at{" "}
              <a href={PRACTICE.consultUrl} className="underline underline-offset-2">
                gomberamd.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
