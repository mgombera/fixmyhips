"use client";

import { useState } from "react";
import type { Video } from "@/content";

// Click-to-load YouTube embed. Nothing is requested from YouTube (not even a
// thumbnail) until the patient taps play; then youtube-nocookie.com is used.
export function VideoPlayer({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const title = video.title ?? "Exercise video";
  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-border bg-bg p-4 text-center hover:border-accent"
    >
      <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true" className="text-accent">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path d="M10 8l6 4-6 4z" fill="var(--bg)" />
      </svg>
      <span className="font-semibold">Play: {title}</span>
      {video.channel && <span className="text-sm text-muted">{video.channel} on YouTube</span>}
    </button>
  );
}
