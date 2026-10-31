import type { Metadata } from "next";
import { Suspense } from "react";
import { StartRedirect } from "@/components/StartRedirect";

// Clinic QR codes link here: fixmyhips.com/start?p=standard | revision | glute.
// The code preselects the procedure only. No date or name ever goes in a URL.

export const metadata: Metadata = {
  title: "Get started",
  robots: { index: false, follow: true },
};

export default function StartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="m-0 text-lg">Setting up your plan...</p>
      <Suspense>
        <StartRedirect />
      </Suspense>
    </div>
  );
}
