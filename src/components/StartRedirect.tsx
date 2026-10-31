"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { isProcedure, savePreset } from "@/lib/profile";

const ALIASES: Record<string, string> = { glute: "glute", gluteus: "glute", rev: "revision" };

export function StartRedirect() {
  const params = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const raw = params.get("p")?.toLowerCase() ?? "";
    const p = ALIASES[raw] ?? raw;
    if (isProcedure(p)) savePreset(p);
    router.replace("/?setup=1");
  }, [params, router]);
  return null;
}
