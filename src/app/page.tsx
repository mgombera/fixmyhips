import Image from "next/image";
import Link from "next/link";
// Milestone 1 home: brand shell. Milestone 3 replaces the buttons with the
// surgery date and procedure setup, with the audience statement beneath it.
// Until then the statement appears in the footer on every page.
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
          className="-z-10 object-cover object-[50%_30%] opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/80 to-bg/40" />
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20 sm:py-28">
          <p className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">
            Hip arthroscopy with Dr. Gombera
          </p>
          <h1 className="m-0 font-display text-6xl font-extrabold uppercase leading-[0.9] sm:text-8xl">
            Your hip.
            <br />
            <span className="text-accent">Your plan.</span>
          </h1>
          <p className="m-0 max-w-xl text-lg">
            See exactly what to do today, from the day you book surgery through a full year of recovery.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/before"
              className="inline-flex min-h-12 items-center rounded-md bg-accent px-6 font-bold text-accent-ink no-underline"
            >
              I&apos;m getting ready for surgery
            </Link>
            <Link
              href="/after"
              className="inline-flex min-h-12 items-center rounded-md border border-accent px-6 font-bold text-accent no-underline"
            >
              I&apos;ve had surgery
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
