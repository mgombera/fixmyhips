// Copy the YouTube thumbnail of each of Dr. Gombera's videos into
// public/video-thumbs/ and list the ones saved in src/content/video-thumbs.json.
// Runs before every build, so patients load the image from fixmyhips.com and
// their browser never contacts YouTube until they tap play. If a thumbnail
// cannot be fetched, the site shows a designed title card instead.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("..", import.meta.url);
const outDir = fileURLToPath(new URL("public/video-thumbs/", root));
const listPath = fileURLToPath(new URL("src/content/video-thumbs.json", root));
const source = readFileSync(fileURLToPath(new URL("src/content/videos.ts", root)), "utf8");

// Only the videos shown on the site (Dr. Gombera's own section).
const ids = [...source.matchAll(/\{[^{}]*\}/g)]
  .map((m) => m[0])
  .filter((block) => block.includes('"dr-gombera"'))
  .map((block) => block.match(/youtubeId:\s*"([^"]+)"/)?.[1])
  .filter(Boolean);

mkdirSync(outDir, { recursive: true });
const saved = [];
await Promise.all(
  ids.map(async (id) => {
    for (const size of ["maxresdefault", "hqdefault"]) {
      try {
        const res = await fetch(`https://i.ytimg.com/vi/${id}/${size}.jpg`, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) continue;
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length < 2000) continue; // YouTube's tiny "no image" placeholder
        writeFileSync(`${outDir}${id}.jpg`, buf);
        saved.push(id);
        return;
      } catch {}
    }
  }),
);

writeFileSync(listPath, JSON.stringify(saved.sort(), null, 2) + "\n");
console.log(`video thumbnails: saved ${saved.length} of ${ids.length}`);
