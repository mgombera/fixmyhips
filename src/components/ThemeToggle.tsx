"use client";

import { useSyncExternalStore } from "react";
import { THEME_KEY as KEY } from "@/lib/theme";

// Light or dark, chosen by the patient. Stored only in this browser. With no
// choice saved, the site follows the phone or computer setting.
type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function current(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  mq.addEventListener("change", cb);
  return () => {
    listeners.delete(cb);
    mq.removeEventListener("change", cb);
  };
}

function setTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
  try {
    window.localStorage.setItem(KEY, t);
  } catch {}
  for (const l of listeners) l();
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, current, () => null);
  if (!theme) return <span className="inline-block h-11 w-11" aria-hidden="true" />;
  const next: Theme = theme === "light" ? "dark" : "light";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-text hover:border-accent"
    >
      {theme === "light" ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}
