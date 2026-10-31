"use client";

import Image from "next/image";
import { useState } from "react";

// Dr. Gombera's own intraoperative images (supplied 10/31/2026, identifiers
// removed). The copyright line is burned into each web copy and repeated below.
export const IMAGING_COPYRIGHT =
  "Images © 2026 Mufaddal Gombera, MD. All rights reserved. Do not copy or reuse without written permission.";

function Figure({ src, alt, caption }: { src: string; alt: string; caption: React.ReactNode }) {
  return (
    <figure className="m-0 flex flex-col gap-2">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-black">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
      </div>
      <figcaption className="text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

export function CamImaging() {
  const [outlined, setOutlined] = useState(true);
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="m-0 text-xl font-bold">X-ray during surgery</h3>
          <button
            type="button"
            aria-pressed={outlined}
            onClick={() => setOutlined((v) => !v)}
            className="min-h-11 rounded-md border border-border px-4 text-sm font-semibold hover:border-accent"
          >
            {outlined ? "Hide the outline" : "Show the outline"}
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Figure
            src={outlined ? "/images/2026-10-31-cam-xray-before-outlined.jpg" : "/images/2026-10-31-cam-xray-before.jpg"}
            alt={
              outlined
                ? "X-ray of the hip before the bone is reshaped. A red outline marks the extra bone at the junction of the ball and the neck."
                : "X-ray of the hip before the bone is reshaped, showing extra bone where the ball meets the neck."
            }
            caption={
              <>
                <strong className="text-text">Before.</strong> The extra bone where the ball meets the neck{outlined ? " (outlined in red)" : ""} is
                what causes cam-type impingement (FAI).
              </>
            }
          />
          <Figure
            src="/images/2026-10-31-cam-xray-after.jpg"
            alt="X-ray of the same hip after the extra bone has been removed."
            caption={
              <>
                <strong className="text-text">After.</strong> The extra bone has been shaved away.
              </>
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="m-0 text-xl font-bold">Through the arthroscope</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <Figure
            src="/images/2026-10-31-cam-scope-before.jpg"
            alt="Arthroscopic view inside the hip. A red outline marks the excess bone causing impingement, just below the repaired labrum."
            caption={
              <>
                <strong className="text-text">Before.</strong> The excess bone causing impingement (outlined in red), next to the
                labrum repair.
              </>
            }
          />
          <Figure
            src="/images/2026-10-31-cam-scope-after.jpg"
            alt="Arthroscopic view of the same area after the excess bone has been removed."
            caption={
              <>
                <strong className="text-text">After.</strong> The excess bone has been removed.
              </>
            }
          />
        </div>
      </div>
      <p className="m-0 text-xs text-muted">{IMAGING_COPYRIGHT}</p>
    </div>
  );
}
