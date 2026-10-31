import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({ url: `https://fixmyhips.com${r.path === "/" ? "" : r.path}` }));
}
