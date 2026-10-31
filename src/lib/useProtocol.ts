"use client";

import { useProfile } from "./profile";
import { fromISO, protocolFor } from "./recovery";
import type { Procedure } from "./recovery";

/** The protocol for the saved procedure, or the standard one when nothing is set. */
export function useProtocol() {
  const profile = useProfile();
  const procedure: Procedure = profile?.procedure ?? "standard";
  return {
    profile,
    procedure,
    protocol: protocolFor(procedure),
    surgery: profile?.surgeryDate ? fromISO(profile.surgeryDate) : null,
    isDefault: !profile,
  };
}
