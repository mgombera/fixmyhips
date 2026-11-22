"use client";

import Image from "next/image";
import { useState } from "react";
import { VIDEO_CAPTION } from "@/content";
import type { Video } from "@/content";

// Click-to-load YouTube embed. Nothing is requested from YouTube until the
// patient taps play (thumbnails are copies served from this site); then
// youtube-nocookie.com is used.
export function VideoPlayer({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const title = video.title ?? "Video";
  const caption = <p className="m-0 mt-1.5 text-xs text-muted">{VIDEO_CAPTION}</p>;
  if (playing) {
    return (
      <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption}
      </div>
    );
  }
  // The thumbnail is a copy stored on this site (see scripts/fetch-video-thumbs.mjs).
  // Without one, a navy title card stands in.
  return (
    <div>
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Play: ${title}`}
        className="group relative isolate flex aspect-video w-full flex-col items-center justify-end overflow-hidden rounded-lg border border-border bg-[#313E6B] p-4 text-center text-white hover:border-accent focus-visible:border-accent"
      >
        {video.thumb ? (
          <Image
            src={video.thumb}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="-z-10 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-3 -z-10 font-display text-sm font-extrabold uppercase tracking-widest text-white/60"
          >
            Fix<span className="text-[#4DB8FF]">/</span>My Hips
          </span>
        )}
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <svg
          width="56"
          height="56"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 drop-shadow-lg transition-transform group-hover:scale-110"
        >
          <circle cx="12" cy="12" r="11" fill="#1B64A8" />
          <path d="M10 8l6 4-6 4z" fill="#fff" />
        </svg>
        <span className="font-semibold leading-snug [text-shadow:0_1px_3px_rgb(0_0_0/0.8)]">{title}</span>
        {video.channel && <span className="text-sm text-white/80">{video.channel} on YouTube</span>}
      </button>
      {caption}
    </div>
  );
}
