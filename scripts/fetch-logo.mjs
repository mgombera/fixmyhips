// Copy the gomberamd.com logo into public/brand/ so the site (and every
// printout) serves it from fixmyhips.com. Runs before every build. If the file
// is already in the repo, nothing is downloaded. If the download fails, the
// site keeps using the gomberamd.com address (src/lib/logo.json).

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const REMOTE = "https://www.gomberamd.com/wp-content/uploads/logo.webp";
const LOCAL = "/brand/gomberamd-logo.webp";
const root = new URL("..", import.meta.url);
const file = fileURLToPath(new URL(`public${LOCAL}`, root));
const json = fileURLToPath(new URL("src/lib/logo.json", root));

let src = REMOTE;
if (existsSync(file)) {
  src = LOCAL;
} else {
  try {
    const res = await fetch(REMOTE, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(String(res.status));
    mkdirSync(fileURLToPath(new URL("public/brand", root)), { recursive: true });
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    src = LOCAL;
  } catch (e) {
    console.warn(`logo: download failed (${e.message}); using ${REMOTE}`);
  }
}
writeFileSync(json, JSON.stringify({ src }, null, 2) + "\n");
console.log(`logo: ${src}`);
