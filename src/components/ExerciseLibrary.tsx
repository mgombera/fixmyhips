"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PROTOCOL_NOTICE, PT_OVERRIDE_NOTICE, VIDEOS, VIDEO_NOTICE, exerciseById } from "@/content";
import { useHydrated } from "@/lib/profile";
import { useProtocol } from "@/lib/useProtocol";
import { VideoPlayer } from "./VideoPlayer";

function weekLabel(from: number, to: number) {
  return from === to ? `Week ${from}` : `Weeks ${from} to ${to}`;
}

export function ExerciseLibrary() {
  const hydrated = useHydrated();
  const { protocol, isDefault } = useProtocol();
  const [phase, setPhase] = useState<number | "all">("all");

  // Arriving from a "How to" link: keep the whole list visible so the anchor works.
  useEffect(() => {
    if (window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }, [hydrated]);

  if (!hydrated) return <div className="min-h-96" aria-busy="true" />;

  const shown = new Set<string>();
  const phases = protocol.phases.filter((ph) => phase === "all" || ph.n === phase);

  return (
    <div className="flex flex-col gap-6">
      <div role="note" className="flex flex-col gap-2 rounded-xl border border-accent bg-surface p-4">
        <p className="m-0 font-semibold">{PT_OVERRIDE_NOTICE}</p>
        <p className="m-0 font-semibold">{VIDEO_NOTICE}</p>
        <p className="m-0 text-sm text-muted">
          Showing the {protocol.shortTitle.toLowerCase()} protocol. {PROTOCOL_NOTICE}{" "}
          {isDefault && (
            <Link href="/" className="underline">
              Set your procedure
            </Link>
          )}
        </p>
      </div>

      <div role="group" aria-label="Filter by phase" className="flex flex-wrap gap-2">
        {(["all", 1, 2, 3, 4] as const).map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={phase === p}
            onClick={() => setPhase(p)}
            className={`min-h-11 rounded-md px-4 text-sm font-semibold uppercase tracking-wide ${
              phase === p ? "bg-accent text-accent-ink" : "border border-border text-muted hover:text-text"
            }`}
          >
            {p === "all" ? "All phases" : `Phase ${p}`}
          </button>
        ))}
      </div>

      {phases.map((ph) => (
        <section key={ph.n} id={`phase-${ph.n}`} aria-labelledby={`ph-${ph.n}`} className="flex scroll-mt-4 flex-col gap-4">
          <h2 id={`ph-${ph.n}`} className="m-0 font-display text-3xl font-bold uppercase">
            Phase {ph.n}: {ph.name} <span className="text-muted">· {ph.rangeLabel}</span>
          </h2>
          {[...ph.weeks.map((w) => ({ label: weekLabel(w.fromWeek, w.toWeek), ids: w.exerciseIds, notes: w.notes })), ...(ph.cardio?.length ? [{ label: "Cardio", ids: ph.cardio, notes: undefined }] : [])].map(
            (block) => (
              <div key={`${ph.n}-${block.label}`} className="flex flex-col gap-3">
                <h3 className="m-0 text-sm font-semibold uppercase tracking-widest text-muted">
                  {block.label}
                  {block.notes?.length ? <span className="normal-case tracking-normal"> · {block.notes.join(". ")}</span> : null}
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {block.ids.map((id) => {
                    const e = exerciseById(id);
                    const anchor = shown.has(id) ? undefined : id;
                    shown.add(id);
                    const videos = e.videoIds
                      .map((v) => VIDEOS.find((x) => x.id === v))
                      .filter((v): v is NonNullable<typeof v> => Boolean(v?.approvedOn));
                    return (
                      <article key={`${block.label}-${id}`} id={anchor} className="flex scroll-mt-4 flex-col gap-3 rounded-xl border border-border bg-surface p-4">
                        <h4 className="m-0 text-lg font-bold">{e.name}</h4>
                        {e.therapistOnly && <p className="m-0 text-sm font-semibold text-accent">Done with your therapist</p>}
                        {e.cues.length > 0 && (
                          <ul className="m-0 flex list-disc flex-col gap-1 pl-5">
                            {e.cues.map((c) => (
                              <li key={c}>{c}</li>
                            ))}
                          </ul>
                        )}
                        {e.caution && (
                          <p className="m-0 rounded-md bg-alert-surface p-2 text-sm font-semibold text-alert">{e.caution}</p>
                        )}
                        {videos.length > 0 ? (
                          <div className="flex flex-col gap-2">
                            {videos.map((v) => (
                              <VideoPlayer key={v.id} video={v} />
                            ))}
                            <p className="m-0 text-xs text-muted">{VIDEO_NOTICE}</p>
                          </div>
                        ) : (
                          <p className="m-0 text-sm text-muted">Video coming soon. Ask your therapist to show you.</p>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            ),
          )}
        </section>
      ))}
    </div>
  );
}
