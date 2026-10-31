"use client";

import { useSyncExternalStore } from "react";
import type { Procedure } from "./recovery";

// The patient's settings, kept only in this browser (scope section 4, Privacy).
// Nothing here is ever sent to a server.

export type Profile = {
  v: 1;
  surgeryDate: string | null; // ISO YYYY-MM-DD, null = not scheduled yet
  procedure: Procedure;
  checklist: Record<string, boolean>; // pre-op checklist ticks
  exercises: Record<string, string[]>; // "YYYY-Www" -> exercise ids ticked that week
};

const KEY = "fixmyhips:profile";
const PRESET_KEY = "fixmyhips:preset";
const PROCEDURES: Procedure[] = ["standard", "revision", "glute", "different"];

let memory: Profile | null = null; // used when storage is blocked (private browsing)
let storageOk: boolean | null = null;
const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cached: Profile | null = null;

function canStore(): boolean {
  if (storageOk !== null) return storageOk;
  try {
    const t = "__fmh_test__";
    window.localStorage.setItem(t, t);
    window.localStorage.removeItem(t);
    storageOk = true;
  } catch {
    storageOk = false;
  }
  return storageOk;
}

function validate(x: unknown): Profile | null {
  if (!x || typeof x !== "object") return null;
  const p = x as Partial<Profile>;
  if (p.v !== 1 || !PROCEDURES.includes(p.procedure as Procedure)) return null;
  if (p.surgeryDate !== null && !/^\d{4}-\d{2}-\d{2}$/.test(String(p.surgeryDate))) return null;
  return {
    v: 1,
    surgeryDate: p.surgeryDate ?? null,
    procedure: p.procedure as Procedure,
    checklist: typeof p.checklist === "object" && p.checklist ? p.checklist : {},
    exercises: typeof p.exercises === "object" && p.exercises ? p.exercises : {},
  };
}

function read(): Profile | null {
  if (typeof window === "undefined") return null;
  if (!canStore()) return memory;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return memory;
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    cached = raw ? validate(JSON.parse(raw)) : null;
  } catch {
    cached = null;
  }
  return cached;
}

function emit() {
  for (const l of listeners) l();
}

function write(p: Profile | null) {
  memory = p;
  if (canStore()) {
    try {
      if (p) window.localStorage.setItem(KEY, JSON.stringify(p));
      else window.localStorage.removeItem(KEY);
    } catch {
      storageOk = false;
    }
  }
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

/** The saved profile, or null. Always null during server rendering. */
export function useProfile(): Profile | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

/** True once the component is running in the browser (avoids flashing setup to returning visitors). */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function storageAvailable(): boolean {
  return typeof window !== "undefined" && canStore();
}

export function saveSetup(surgeryDate: string | null, procedure: Procedure) {
  const prev = read();
  write({
    v: 1,
    surgeryDate,
    procedure,
    checklist: prev?.checklist ?? {},
    exercises: prev?.exercises ?? {},
  });
  clearPreset();
}

export function toggleChecklist(id: string, value: boolean) {
  const p = read();
  if (!p) return;
  write({ ...p, checklist: { ...p.checklist, [id]: value } });
}

export function clearProfile() {
  write(null);
  clearPreset();
}

// QR code preset: remembers the procedure from fixmyhips.com/start?p=... until setup is saved.
export function savePreset(procedure: Procedure) {
  try {
    window.sessionStorage.setItem(PRESET_KEY, procedure);
  } catch {}
}

export function readPreset(): Procedure | null {
  try {
    const v = window.sessionStorage.getItem(PRESET_KEY);
    return PROCEDURES.includes(v as Procedure) ? (v as Procedure) : null;
  } catch {
    return null;
  }
}

function clearPreset() {
  try {
    window.sessionStorage.removeItem(PRESET_KEY);
  } catch {}
}

export function isProcedure(v: string | null | undefined): v is Procedure {
  return PROCEDURES.includes(v as Procedure);
}
