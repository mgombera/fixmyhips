"use client";

import { procedureLabel } from "@/lib/procedures";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ANATOMY } from "@/content";
import { useHydrated, useProfile } from "@/lib/profile";
import type { ProtocolId } from "@/content";
import { BONE_TEXT, EXPLAINED, STAGE_NOTE } from "./parts";
import type { PartId, Stage, ViewId } from "./parts";
import { Hip2D } from "./Hip2D";

const HipModel3D = dynamic(() => import("./HipModel3D"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-muted">Loading 3D model...</div>,
});

function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const PROC_LABEL: Record<ProtocolId, string> = {
  standard: procedureLabel("standard"),
  revision: procedureLabel("revision"),
  glute: procedureLabel("glute"),
};

function Toggle<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex flex-wrap rounded-lg border border-border p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`min-h-11 rounded-md px-3 text-sm font-semibold uppercase tracking-wide ${
            value === o.value ? "bg-accent text-accent-ink" : "text-muted hover:text-text"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function HipExplorer() {
  const hydrated = useHydrated();
  const profile = useProfile();
  const [selected, setSelected] = useState<PartId | null>("labrum");
  const [stage, setStage] = useState<Stage>("before");
  const [view, setView] = useState<ViewId>("front");
  const [procedure, setProcedure] = useState<ProtocolId | null>(null);
  const [mode, setMode] = useState<"3d" | "2d" | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hideFemur, setHideFemur] = useState(false);

  useEffect(() => {
    setMode(webglAvailable() ? "3d" : "2d");
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const proc: ProtocolId =
    procedure ?? (profile?.procedure && profile.procedure !== "different" ? profile.procedure : "standard");
  const parts = EXPLAINED.filter((id) => id !== "gluteus-medius" || proc === "glute");
  const info =
    selected === "femur" || selected === "pelvis"
      ? { title: BONE_TEXT[selected].title, points: [BONE_TEXT[selected].text] }
      : ANATOMY.find((a) => a.id === selected);
  let note = selected ? STAGE_NOTE[stage][selected] : null;
  if (selected === "labrum" && stage === "after" && proc === "revision")
    note = "Shown reconstructed with a graft (green). In some revisions the labrum is repaired instead.";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-3">
        <Toggle
          label="Before or after surgery"
          value={stage}
          onChange={setStage}
          options={[
            { value: "before", label: "Before surgery" },
            { value: "after", label: "After surgery" },
          ]}
        />
        {mode === "3d" && (
          <Toggle
            label="Camera view"
            value={view}
            onChange={(vw) => {
              setView(vw);
              setHideFemur(vw === "inside");
            }}
            options={[
              { value: "front", label: "Front" },
              { value: "side", label: "Side" },
              { value: "inside", label: "Inside the joint" },
            ]}
          />
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        {mode === "3d" && (
          <label className="flex min-h-11 items-center gap-2 font-semibold">
            <input
              type="checkbox"
              checked={hideFemur}
              onChange={(e) => setHideFemur(e.target.checked)}
              className="h-5 w-5 accent-[var(--accent)]"
            />
            Hide the femur to see into the socket
          </label>
        )}
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor="proc" className="font-semibold">
          Procedure shown:
        </label>
        <select
          id="proc"
          value={proc}
          onChange={(e) => setProcedure(e.target.value as ProtocolId)}
          className="min-h-11 rounded-md border border-border bg-surface px-2 text-text"
        >
          {(Object.keys(PROC_LABEL) as ProtocolId[]).map((p) => (
            <option key={p} value={p}>
              {PROC_LABEL[p]}
            </option>
          ))}
        </select>
      </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
        <div
          role="img"
          aria-label={`Model of a right hip, ${stage} surgery. Use the list of parts to explore.`}
          className="relative h-[420px] overflow-hidden rounded-xl border border-border bg-[#0c1124] sm:h-[540px]"
        >
          {!hydrated || mode === null ? null : mode === "3d" ? (
            <HipModel3D
              selected={selected}
              onSelect={setSelected}
              stage={stage}
              view={view}
              showGlute={proc === "glute"}
              graft={proc === "revision"}
              hideFemur={hideFemur}
              autoRotate={!reducedMotion && selected === null}
            />
          ) : (
            <Hip2D selected={selected} onSelect={setSelected} stage={stage} />
          )}
          {mode === "3d" && (
            <p className="pointer-events-none absolute right-3 bottom-2 left-3 m-0 text-center text-xs text-[#a3adc2]">
              Drag to rotate · pinch or scroll to zoom · tap a part
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div role="group" aria-label="Parts of the hip" className="flex flex-wrap gap-2">
            {[...parts, "femur" as const, "pelvis" as const].map((id) => {
              const t = id === "femur" || id === "pelvis" ? BONE_TEXT[id].title : ANATOMY.find((a) => a.id === id)!.title;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={selected === id}
                  onClick={() => setSelected(id)}
                  className={`min-h-11 rounded-full px-4 text-sm font-semibold ${
                    selected === id ? "bg-accent text-accent-ink" : "border border-border text-text hover:border-accent"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
          <div aria-live="polite" className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
            {info ? (
              <>
                <h2 className="m-0 font-display text-3xl font-bold uppercase">{info.title}</h2>
                {info.points.map((pt) => (
                  <p key={pt} className="m-0">
                    {pt}
                  </p>
                ))}
                {note && <p className="m-0 text-sm font-semibold text-accent">In the model: {note}</p>}
              </>
            ) : (
              <p className="m-0 text-muted">Tap a part of the hip to learn about it.</p>
            )}
          </div>
          <p className="m-0 text-xs text-muted">
            A right hip from CT-based anatomy. Labrum, cartilage, capsule and tendon are illustrated, not exact. Your surgeon
            will explain your own findings.
          </p>
          <p className="m-0 text-xs text-muted">
            Bone models adapted from the{" "}
            <a href="https://github.com/hubmapconsortium/ccf-3d-reference-object-library" className="underline">
              HuBMAP Human Reference Atlas 3D Reference Object Library
            </a>{" "}
            (Visible Human Male), licensed{" "}
            <a href="https://creativecommons.org/licenses/by/4.0/" className="underline">
              CC BY 4.0
            </a>
            ; cropped, merged, simplified and re-centered.
          </p>
        </div>
      </div>
    </div>
  );
}
