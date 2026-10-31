"use client";

import { Analytics } from "@vercel/analytics/next";

// Cookieless page-view counts (Vercel Web Analytics), visible only in Dr.
// Gombera's Vercel dashboard. Approved 10/31/2026. No custom events. The query
// string and hash are dropped so nothing beyond the page path is sent (for
// example, /start?p=glute is counted as /start).
export function PageViews() {
  return (
    <Analytics
      beforeSend={(event) => {
        if (new URL(event.url).pathname.startsWith("/walkthrough")) return null;
        return { ...event, url: event.url.split(/[?#]/)[0] };
      }}
    />
  );
}
