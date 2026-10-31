import type { Metadata } from "next";
import * as C from "@/content";
import type { InfoSection, Phase, Protocol, SourceId } from "@/content";

// Gate 1: printable proof of every clinical statement, grouped by topic,
// with its source. Not linked from the site and not indexed.

export const metadata: Metadata = {
  title: "Content proof",
  robots: { index: false, follow: false },
};

function Sources({ ids, derived }: { ids: SourceId[]; derived?: boolean }) {
  return (
    <span className="ml-2 inline-flex flex-wrap gap-1 align-middle">
      {ids.map((s) => (
        <span key={s} title={C.SOURCES[s]} className="rounded bg-slate-200 px-1.5 py-0.5 text-[11px] font-semibold text-slate-700">
          {s}
        </span>
      ))}
      {derived && (
        <span className="rounded bg-amber-300 px-1.5 py-0.5 text-[11px] font-bold text-amber-950">REVIEW: derived</span>
      )}
    </span>
  );
}

function H2({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mt-12 mb-3 border-b-2 border-slate-800 pb-1 text-2xl font-bold text-slate-900 break-after-avoid">
      {children}
    </h2>
  );
}

function Section({ s }: { s: InfoSection }) {
  return (
    <div className={`mb-4 break-inside-avoid rounded border p-3 ${s.derived ? "border-amber-400 bg-amber-50" : "border-slate-300"}`}>
      <h3 className="m-0 text-base font-bold text-slate-900">
        {s.title}
        <Sources ids={s.source} derived={s.derived} />
      </h3>
      <ul className="mt-2 mb-0 list-disc pl-5 text-sm text-slate-800">
        {s.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

function PhaseBlock({ ph }: { ph: Phase }) {
  return (
    <div className="mb-4 break-inside-avoid rounded border border-slate-300 p-3">
      <h4 className="m-0 text-base font-bold text-slate-900">
        Phase {ph.n}: {ph.name} ({ph.rangeLabel}; site weeks {ph.startWeek} to {ph.endWeek})
        <Sources ids={ph.source} derived={ph.derived} />
      </h4>
      <p className="mt-2 mb-1 text-sm font-semibold text-slate-700">Goals</p>
      <ul className="m-0 list-disc pl-5 text-sm text-slate-800">
        {ph.goals.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
      <p className="mt-2 mb-1 text-sm font-semibold text-slate-700">Exercises</p>
      <ul className="m-0 list-disc pl-5 text-sm text-slate-800">
        {ph.weeks.map((w) => (
          <li key={`${w.fromWeek}-${w.exerciseIds.join()}`}>
            <strong>
              Week {w.fromWeek}
              {w.toWeek !== w.fromWeek ? ` to ${w.toWeek}` : ""}:
            </strong>{" "}
            {w.notes?.length ? <em>{w.notes.join(". ")}. </em> : null}
            {w.exerciseIds.map((id) => C.exerciseById(id).name).join(", ")}
          </li>
        ))}
        {ph.cardio?.length ? (
          <li>
            <strong>Cardio:</strong> {ph.cardio.map((id) => C.exerciseById(id).name).join(", ")}
          </li>
        ) : null}
      </ul>
      <p className="mt-2 mb-1 text-sm font-semibold text-slate-700">Criteria to progress</p>
      <p className="m-0 text-sm text-slate-800">
        {ph.criteriaToProgress.length ? ph.criteriaToProgress.join("; ") : "None listed in the protocol"}
      </p>
    </div>
  );
}

function ProtocolBlock({ p }: { p: Protocol }) {
  return (
    <section className="mb-8">
      <h3 className="mb-2 text-xl font-bold text-slate-900">
        {p.shortTitle}: {p.title}
        <Sources ids={p.source} />
      </h3>
      <p className="m-0 text-sm text-slate-800">
        <strong>Range of motion limits:</strong> {p.romRestrictions.join("; ")}
        {p.extraRestrictions.length ? (
          <>
            {" "}
            <strong>Also:</strong> {p.extraRestrictions.join("; ")}
          </>
        ) : null}
      </p>
      <p className="mt-1 mb-3 text-sm text-slate-800">
        <strong>Driving:</strong> {p.driving}
      </p>
      {p.phases.map((ph) => (
        <PhaseBlock key={ph.n} ph={ph} />
      ))}
    </section>
  );
}

const ROWS: [string, (p: Protocol) => string][] = [
  ["20 lb foot-flat weight bearing", (p) => `${p.weightBearing.weeks} weeks`],
  ["Brace when walking", (p) => `${p.braceWeeks} weeks`],
  ["Hip flexion limit (Phase I)", (p) => `${p.flexionLimitDeg} degrees`],
  ["Prone lying 2 to 3 hours a day", (p) => (p.proneLying ? "Yes" : "No")],
  ["Aqua therapy", (p) => `After week ${p.aquaTherapyAfterWeek}, incisions healed`],
  ["Running progression", (p) => `After ${p.runningAfterMonths} months`],
  ["Multidirectional agility", (p) => `Not before week ${p.agilityNotBeforeWeek}`],
  ...[1, 2, 3, 4].map(
    (n) => [`Phase ${n}`, (p: Protocol) => p.phases[n - 1].rangeLabel] as [string, (p: Protocol) => string],
  ),
];

export default function ProofPage() {
  const protocols = Object.values(C.PROTOCOLS);
  const derivedCount = [...C.CHECKLIST, ...C.ANATOMY, ...C.HOME_CARE, ...C.SURGERY_DAY].filter((x) => x.derived).length;

  return (
    <div className="bg-white text-slate-900 print:bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="m-0 text-sm font-semibold uppercase tracking-widest text-slate-600">Milestone 2 · Gate 1</p>
        <h1 className="mt-1 mb-3 text-4xl font-bold">Clinical content proof</h1>
        <div className="rounded border-2 border-slate-800 p-4 text-sm">
          <p className="m-0">
            <strong>Status:</strong>{" "}
            {C.CONTENT_REVIEWED_ON ? `Signed off ${C.CONTENT_REVIEWED_ON}` : "Not yet signed off by Dr. Gombera"}
          </p>
          <p className="mt-2 mb-0">
            Every clinical statement the site will show, with its source in grey. Items marked{" "}
            <span className="rounded bg-amber-300 px-1 font-bold">REVIEW: derived</span> ({derivedCount}) are a summary or
            inference, not a sentence from a source document: approve, edit or remove each one. Exercise sets and reps are
            not in the protocols and do not appear anywhere.
          </p>
          <p className="mt-2 mb-0">Sources: {Object.entries(C.SOURCES).map(([k, v]) => `${k} = ${v}`).join("; ")}.</p>
        </div>

        <nav aria-label="Proof sections" className="mt-4 text-sm print:hidden">
          {[
            ["notices", "Notices"],
            ["compare", "Protocol comparison"],
            ["protocols", "Protocols"],
            ["exercises", "Exercises"],
            ["before", "Before surgery"],
            ["after", "Home care"],
            ["meds", "Medications"],
            ["flags", "Red flags"],
            ["learn", "Diagnosis and results"],
            ["anatomy", "Anatomy"],
            ["faq", "FAQ"],
            ["videos", "Videos"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="mr-3 inline-block py-1 text-blue-800 underline">
              {label}
            </a>
          ))}
        </nav>

        <H2 id="notices">Standing notices (exact wording)</H2>
        <ul className="list-disc pl-5 text-sm">
          <li>{C.PROTOCOL_NOTICE}</li>
          <li>{C.PT_OVERRIDE_NOTICE}</li>
          <li>{C.MEDICATION_NOTICE}</li>
          <li>{C.DATES_ARE_ESTIMATES}</li>
          <li>{C.VIDEO_NOTICE}</li>
          <li>{C.HOME_PROGRAM}</li>
        </ul>

        <H2 id="compare">Protocol comparison</H2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-slate-400 bg-slate-100 p-2 text-left">Parameter</th>
                {protocols.map((p) => (
                  <th key={p.id} className="border border-slate-400 bg-slate-100 p-2 text-left">
                    {p.shortTitle}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, f]) => (
                <tr key={label}>
                  <th scope="row" className="border border-slate-400 p-2 text-left font-semibold">
                    {label}
                  </th>
                  {protocols.map((p) => (
                    <td key={p.id} className="border border-slate-400 p-2">
                      {f(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H2 id="protocols">Protocols, phase by phase</H2>
        {protocols.map((p) => (
          <ProtocolBlock key={p.id} p={p} />
        ))}

        <H2 id="exercises">Exercise library ({C.EXERCISES.length})</H2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {["Exercise", "Cues (protocol text only)", "Caution", "Videos", "Source"].map((h) => (
                  <th key={h} className="border border-slate-400 bg-slate-100 p-2 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {C.EXERCISES.map((e) => (
                <tr key={e.id} className="break-inside-avoid">
                  <td className="border border-slate-400 p-2 font-semibold">
                    {e.name}
                    {e.therapistOnly ? <span className="block text-xs font-normal">With therapist</span> : null}
                  </td>
                  <td className="border border-slate-400 p-2">{e.cues.join("; ") || "None given"}</td>
                  <td className="border border-slate-400 p-2">{e.caution ?? ""}</td>
                  <td className="border border-slate-400 p-2">{e.videoIds.length || "Film own clip"}</td>
                  <td className="border border-slate-400 p-2 text-xs">{e.source.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H2 id="before">Before surgery</H2>
        <h3 className="text-lg font-bold">Pre-op checklist</h3>
        {C.CHECKLIST.map((c) => (
          <Section
            key={c.id}
            s={{
              id: c.id,
              title: `${c.title} (${{ now: "Now", "week-before": "1 week before", "night-before": "Night before" }[c.block]}${
                c.dueOffsetDays !== undefined ? `, due ${Math.abs(c.dueOffsetDays)} day(s) before surgery` : ""
              })`,
              points: [c.detail],
              source: c.source,
              derived: c.derived,
            }}
          />
        ))}
        <p className="text-sm">
          PreAdmit window: opens {C.PREADMIT_WINDOW.opensDaysBefore} days before surgery, closes{" "}
          {C.PREADMIT_WINDOW.closesDaysBefore} days before.
        </p>
        <h3 className="text-lg font-bold">Surgery day</h3>
        {C.SURGERY_DAY.map((s) => (
          <Section key={s.id} s={s} />
        ))}
        <Section s={C.BIOLOGICS} />

        <H2 id="after">Home care after surgery</H2>
        {C.HOME_CARE.map((s) => (
          <Section key={s.id} s={s} />
        ))}

        <H2 id="meds">Medications</H2>
        <p className="text-sm font-semibold">{C.MEDICATION_NOTICE}</p>
        <Section s={C.STANDARD_MEDICATIONS} />
        <Section s={C.MEDICATION_TIPS} />

        <H2 id="flags">Red flags</H2>
        <Section s={C.USUALLY_NORMAL} />
        <Section s={C.CALL_NOW} />
        <ul className="list-disc pl-5 text-sm">
          {Object.values(C.CALL_NUMBERS).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <H2 id="learn">Diagnosis and results</H2>
        {C.DIAGNOSIS.map((s) => (
          <Section key={s.id} s={s} />
        ))}
        <Section s={C.OUTCOMES} />

        <H2 id="anatomy">Anatomy explorer text</H2>
        {C.ANATOMY.map((s) => (
          <Section key={s.id} s={s} />
        ))}

        <H2 id="faq">FAQ</H2>
        {C.FAQ.map((f) => (
          <Section key={f.id} s={{ id: f.id, title: `${f.group === "before" ? "Before" : "After"}: ${f.q}`, points: [f.a], source: f.source, derived: f.derived }} />
        ))}

        <H2 id="videos">Videos ({C.VIDEOS.length}, none approved yet)</H2>
        <p className="text-sm">
          Titles fill in automatically from YouTube during the build. Approve a video by adding an approval date to it.
        </p>
        <ol className="list-decimal pl-5 text-sm">
          {C.VIDEOS.map((v) => (
            <li key={v.id}>
              <a className="text-blue-800 underline" href={`https://www.youtube.com/watch?v=${v.youtubeId}`}>
                {v.title ?? v.id}
              </a>
              {v.channel ? `, ${v.channel}` : ""}
              {v.caution ? <span className="text-amber-800">. Watch for: {v.caution}</span> : null}
              {". "}
              <span className="text-slate-600">
                Used by:{" "}
                {C.EXERCISES.filter((e) => e.videoIds.includes(v.id))
                  .map((e) => e.name)
                  .join(", ") || v.topics.join(", ")}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
