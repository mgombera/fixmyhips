import type { SourceId } from "./types";

export * from "./types";
export * from "./protocols";
export * from "./exercises";
export * from "./videos";
export * from "./before";
export * from "./after";
export * from "./safety";
export * from "./learn";

/**
 * Date Dr. Gombera signed off the clinical content (MM/DD/YYYY).
 * Gate 1 approved by Dr. Gombera on 10/30/2026, including the 6 derived items. Update this date whenever clinical content changes and is re-approved.
 */
export const CONTENT_REVIEWED_ON: string | null = "10/30/2026";

export const SOURCES: Record<SourceId, string> = {
  "pt-standard": "PT protocol: hip arthroscopy, osteoplasty and labral repair (athletes)",
  "pt-revision": "PT protocol: labral revision repair or reconstruction",
  "pt-glute": "PT protocol: hip arthroscopy with gluteus medius repair",
  discharge: "Post-operative instruction checklist (discharge sheet)",
  "preop-letter": "What to Expect from your Hip Arthroscopy Surgery (pre-op letter)",
  decisions: "Dr. Gombera's decisions, 10/30/2026",
  "old-site-faq": "FAQ on the original site",
};
