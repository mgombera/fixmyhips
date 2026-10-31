import type { Video } from "./types";
import titles from "./video-titles.json";

// Video registry. A video renders only with an approvedOn date (all approved 10/30/2026).
// To withdraw one, give it approvedOn: undefined explicitly.
// Titles and channels are filled by scripts/fetch-video-titles.mjs (YouTube oEmbed).
// Exercise picks come from the scope's section 7 search; each still needs review.

const RAW: Video[] = [
  // Existing videos from the original site (Dr. Gombera supplied the links)
  { id: "existing-1", youtubeId: "20ayXeRdXL0", source: "dr-gombera", topics: ["overview"] },
  { id: "existing-2", youtubeId: "_ZuBxOM2KKs", source: "dr-gombera", topics: ["overview"] },
  { id: "existing-3", youtubeId: "eZBopkjkJ8s", source: "dr-gombera", topics: ["overview"] },

  // Hip arthroscopy exercise compilations
  { id: "comp-nashville-week1", youtubeId: "pBzMIHKjQR8", source: "external", topics: ["recovery"], caution: "Check for active straight-leg raises" },
  { id: "comp-ochiai-level1", youtubeId: "RFnj6aaagWw", source: "external", topics: ["recovery"], caution: "Check for active straight-leg raises" },
  { id: "comp-ayzenberg", youtubeId: "MK1ws9LQIws", source: "external", topics: ["recovery"], caution: "Check for active straight-leg raises" },

  // Single exercises
  { id: "v-hamstring-sets", youtubeId: "NJv1hKZJsMY", source: "external", topics: ["exercise"] },
  { id: "v-seated-hamstring-stretch", youtubeId: "9ywIMCH7TJQ", source: "external", topics: ["exercise"], caution: "Forward lean can pass 90 degrees" },
  { id: "v-ankle-pumps", youtubeId: "KxfFzSOAT7g", source: "external", topics: ["exercise"] },
  { id: "v-supine-prom", youtubeId: "CpV6cmKTl0c", source: "external", topics: ["exercise"], caution: "Flexion must stop at the limit" },
  { id: "v-ta-bracing", youtubeId: "oa6BNZVukDc", source: "external", topics: ["exercise"] },
  { id: "v-glute-sets", youtubeId: "TPUcaCNKwnY", source: "external", topics: ["exercise"] },
  { id: "v-abductor-isometric", youtubeId: "ivM1KqzDdjM", source: "external", topics: ["exercise"] },
  { id: "v-prone-lying", youtubeId: "SCBWckPG-0E", source: "external", topics: ["exercise"], caution: "Made for hip replacement; may add leg lifts" },
  { id: "v-circumduction", youtubeId: "OV2Dp5Wjc54", source: "external", topics: ["exercise"], caution: "Check flexion range" },
  { id: "v-circumduction-neutral", youtubeId: "NEgJjS2zVAg", source: "external", topics: ["exercise"] },
  { id: "v-upright-bike", youtubeId: "HHxKHaKzQRY", source: "external", topics: ["exercise"], caution: "Seat height keeps hip at or below 90 degrees" },
  { id: "v-cat-camel", youtubeId: "1cs3SKwQZpM", source: "external", topics: ["exercise"], caution: "Sitting back adds flexion" },
  { id: "v-rockback", youtubeId: "2Iq19sP3Ha8", source: "external", topics: ["exercise"], caution: "Full rockback passes 90 degrees" },
  { id: "v-quadruped-hip-extension", youtubeId: "3CEpUodMswQ", source: "external", topics: ["exercise"] },
  { id: "v-scar-massage", youtubeId: "_7LSCJKImXE", source: "external", topics: ["exercise"], caution: "Only once incisions are closed" },
  { id: "v-double-leg-bridge", youtubeId: "HDsvrNUcghY", source: "external", topics: ["exercise"] },
  { id: "v-physioball-rollouts", youtubeId: "AWaHsNLeTCQ", source: "external", topics: ["exercise"], caution: "Not a clinician channel; short range only" },
  { id: "v-bridge-abduction", youtubeId: "g3PbbAHbYto", source: "external", topics: ["exercise"] },
  { id: "v-half-kneel-weight-shift", youtubeId: "GGuk22nM790", source: "external", topics: ["exercise"], caution: "Weak pick; replace if possible" },
  { id: "v-half-kneel-row", youtubeId: "6Y6fwZOkBBM", source: "external", topics: ["exercise"] },
  { id: "v-hip-hikes", youtubeId: "yYM5uW3RXjI", source: "external", topics: ["exercise"] },
  { id: "v-weight-shift-stride", youtubeId: "xWGC--1LpE4", source: "external", topics: ["exercise"] },
  { id: "v-weight-shift-lateral", youtubeId: "BpFvOf9fcok", source: "external", topics: ["exercise"] },
  { id: "v-single-leg-stance", youtubeId: "T6Dc8ewTJ9A", source: "external", topics: ["exercise"] },
  { id: "v-fire-hydrant", youtubeId: "IRkRgk2Gc1E", source: "external", topics: ["exercise"], caution: "External rotation in flexion; limit arc" },
  { id: "v-lift-chop", youtubeId: "Ir6PF5Q4LO8", source: "external", topics: ["exercise"] },
  { id: "v-quarter-squat", youtubeId: "vYNrBt3PAZo", source: "external", topics: ["exercise"] },
  { id: "v-forward-step-up", youtubeId: "7UvrEa84Nck", source: "external", topics: ["exercise"], caution: "Step height keeps hip at or below 90 degrees" },
  { id: "v-hip-hinge", youtubeId: "Gs6--_Mk3WE", source: "external", topics: ["exercise"], caution: "Limit depth" },
  { id: "v-modified-plank", youtubeId: "iDSHokfXqyA", source: "external", topics: ["exercise"], caution: "Weak pick; gym chain" },
  { id: "v-ball-hamstring-curl", youtubeId: "3P_5CjnLE3o", source: "external", topics: ["exercise"] },
  { id: "v-lateral-step-up", youtubeId: "sXW9aOo03P8", source: "external", topics: ["exercise"] },
  { id: "v-y-balance", youtubeId: "lFNC1gq-ysk", source: "external", topics: ["exercise"] },
  { id: "v-clamshell", youtubeId: "t0ASA5CxgKI", source: "external", topics: ["exercise"], caution: "External rotation; limit range" },
  { id: "v-standing-abduction-isometric", youtubeId: "TS7tLpZhhPA", source: "external", topics: ["exercise"] },
  { id: "v-leg-press", youtubeId: "39IN4b-X5ck", source: "external", topics: ["exercise"], caution: "Sled set so hip stays at or below 90 degrees" },
  { id: "v-bridge-knee-extension", youtubeId: "0CpBqkm6Whs", source: "external", topics: ["exercise"] },
  { id: "v-pillar-bridge", youtubeId: "LSd0aTrVWlg", source: "external", topics: ["exercise"] },
  { id: "v-lateral-band-walk", youtubeId: "o6lmGWbu36s", source: "external", topics: ["exercise"] },
  { id: "v-bodyweight-squat", youtubeId: "IaInMN_WZDM", source: "external", topics: ["exercise"] },
  { id: "v-single-leg-quarter-squat", youtubeId: "dLtzuzDWX30", source: "external", topics: ["exercise"] },
  { id: "v-lunges", youtubeId: "3zVrh37QqC8", source: "external", topics: ["exercise"] },
  { id: "v-lateral-lunge", youtubeId: "u1K3p7YS31g", source: "external", topics: ["exercise"] },
  { id: "v-side-plank", youtubeId: "83YnX5JqaJI", source: "external", topics: ["exercise"] },
  { id: "v-elliptical", youtubeId: "NTeZV4t-x8w", source: "external", topics: ["exercise"], caution: "Not hip-specific" },
  { id: "v-glute-stretch", youtubeId: "4MHs4H9UfQs", source: "external", topics: ["exercise"], caution: "Deep flexion with rotation" },
  { id: "v-it-band-stretch", youtubeId: "wzDoSQ8-GWY", source: "external", topics: ["exercise"] },
  { id: "v-balance-squat-rotation", youtubeId: "BJ9vu4DNrU0", source: "external", topics: ["exercise"], caution: "Weak pick; made for an MS audience" },
  { id: "v-retro-walk", youtubeId: "oRH5__OjF4s", source: "external", topics: ["exercise"] },
  { id: "v-lunge-trunk-rotation", youtubeId: "Y253Ci988B4", source: "external", topics: ["exercise"], caution: "Weak pick" },
  { id: "v-running-progression", youtubeId: "5vpdAKCnH6g", source: "external", topics: ["exercise"], caution: "A Short; confirm it is arthroscopy, not replacement" },
  { id: "v-quick-feet", youtubeId: "3XGNjvIbZf0", source: "external", topics: ["exercise"], caution: "Made for ACL rehab" },
  { id: "v-backpedal", youtubeId: "L9Sf-FIvAtM", source: "external", topics: ["exercise"] },
  { id: "v-side-shuffle", youtubeId: "iBmvPEWt5og", source: "external", topics: ["exercise"] },
  { id: "v-hopping", youtubeId: "6XewJxTPrkE", source: "external", topics: ["exercise"] },
  { id: "v-four-square", youtubeId: "vrV1GZBFWTU", source: "external", topics: ["exercise"] },
  { id: "v-cutting", youtubeId: "xbonVpLhz5w", source: "external", topics: ["exercise"], caution: "General cuts, not Z or W" },
  { id: "v-carioca", youtubeId: "E6SKcfQBZlc", source: "external", topics: ["exercise"] },
  { id: "v-single-leg-hop", youtubeId: "fU6zsyvHg6E", source: "external", topics: ["exercise"] },
];

/** All videos approved by Dr. Gombera on 10/30/2026. */
export const VIDEOS_APPROVED_ON = "10/30/2026";

const T = titles as Record<string, { title?: string; channel?: string }>;

export const VIDEOS: Video[] = RAW.map((v) => ({ approvedOn: VIDEOS_APPROVED_ON, ...v, ...T[v.youtubeId] }));

/** Shown under every video. The full VIDEO_NOTICE appears at the top of each video page. */
export const VIDEO_CAPTION = "These videos are only a suggestion and are not formal medical advice.";

export const VIDEO_NOTICE =
  "These videos are only a suggestion and are not formal medical advice. The program from your therapist takes precedence, and all exercises should be done under your therapist's observation.";


export function approvedVideos(): Video[] {
  return VIDEOS.filter((v) => Boolean(v.approvedOn));
}
