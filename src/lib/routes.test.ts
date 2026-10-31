import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { LEGACY_REDIRECTS, PRIMARY_NAV, ROUTES } from "./routes";

const appDir = join(__dirname, "..", "app");

describe("site map", () => {
  it("has a page file for every route", () => {
    for (const r of ROUTES) {
      const file = join(appDir, r.path === "/" ? "" : r.path, "page.tsx");
      expect(existsSync(file), `${r.path} -> ${file}`).toBe(true);
    }
  });

  it("has unique paths", () => {
    const paths = ROUTES.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("only links to real routes from the main nav and redirects", () => {
    const paths = new Set(ROUTES.map((r) => r.path));
    for (const n of PRIMARY_NAV) expect(paths.has(n.href)).toBe(true);
    for (const r of LEGACY_REDIRECTS) expect(paths.has(r.destination)).toBe(true);
  });

  it("uses no em dashes in route copy", () => {
    for (const r of ROUTES) expect(r.title + r.summary).not.toMatch(/\u2014/);
  });
});
