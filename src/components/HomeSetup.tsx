"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useHydrated, useProfile } from "@/lib/profile";
import { fromISO } from "@/lib/recovery";
import { SetupForm } from "./SetupForm";

// Returning visitors go straight to their dashboard; /?setup=1 opens the form to change settings.
export function HomeSetup() {
  const hydrated = useHydrated();
  const profile = useProfile();
  const params = useSearchParams();
  const router = useRouter();
  const editing = params.get("setup") === "1";

  useEffect(() => {
    if (!hydrated || !profile || editing) return;
    const d = profile.surgeryDate ? fromISO(profile.surgeryDate) : null;
    router.replace(d && differenceInCalendarDays(d, new Date()) <= 0 ? "/after" : "/before");
  }, [hydrated, profile, editing, router]);

  if (!hydrated || (profile && !editing)) {
    return <div className="min-h-96 rounded-xl border border-border bg-surface" aria-busy="true" />;
  }
  return <SetupForm existing={profile} />;
}
