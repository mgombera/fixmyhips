// Fetch each video's title and channel from YouTube oEmbed and save them to
// src/content/video-titles.json. Runs before every build. If YouTube cannot be
// reached, existing titles are kept and the build continues.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("..", import.meta.url);
const outPath = fileURLToPath(new URL("src/content/video-titles.json", root));
const source = readFileSync(fileURLToPath(new URL("src/content/videos.ts", root)), "utf8");
const ids = [...source.matchAll(/youtubeId:\s*"([^"]+)"/g)].map((m) => m[1]);

let existing = {};
try {
  existing = JSON.parse(readFileSync(outPath, "utf8"));
} catch {}

const out = { ...existing };
let fetched = 0;
await Promise.all(
  ids.map(async (id) => {
    try {
      const res = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`,
        { signal: AbortSignal.timeout(8000) },
      );
      if (!res.ok) return;
      const j = await res.json();
      out[id] = { title: j.title, channel: j.author_name };
      fetched++;
    } catch {}
  }),
);

writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");
console.log(`video titles: fetched ${fetched} of ${ids.length}`);
