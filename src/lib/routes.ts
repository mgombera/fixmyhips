// Every route in the site map (scope section 3). Used by navigation,
// placeholder pages and the route test.

export type Mode = "before" | "after" | "general";

export type RouteInfo = {
  path: string;
  title: string;
  summary: string;
  mode: Mode;
  milestone: number; // milestone that delivers the real page
};

export const ROUTES: RouteInfo[] = [
  { path: "/", title: "Home", summary: "Enter your surgery date and procedure to see what applies to you today.", mode: "general", milestone: 3 },
  { path: "/before", title: "Before Surgery", summary: "Your countdown, readiness checklist and PreAdmit deadline.", mode: "before", milestone: 4 },
  { path: "/before/surgery-day", title: "Surgery Day", summary: "What happens on the day, step by step, from the arrival call to going home.", mode: "before", milestone: 4 },
  { path: "/before/diagnosis", title: "Your Diagnosis", summary: "Impingement, labral tears and dysplasia, why surgery is recommended, and the numbers to know.", mode: "before", milestone: 4 },
  { path: "/before/add-ons", title: "Biologic Add-ons", summary: "PRP, stem cell and connective tissue matrix options. Not covered by insurance. Call for pricing.", mode: "before", milestone: 4 },
  { path: "/after", title: "Recovery Dashboard", summary: "Your day, phase and week, today's session and what unlocks next.", mode: "after", milestone: 5 },
  { path: "/after/timeline", title: "Recovery Timeline", summary: "All four phases of your protocol and what it takes to move on.", mode: "after", milestone: 5 },
  { path: "/after/care", title: "Home Care", summary: "Dressing, showering, ice, brace, activity, driving, work and medications.", mode: "after", milestone: 5 },
  { path: "/after/exercises", title: "Exercise Library", summary: "Every exercise in your protocol, with cues and videos.", mode: "after", milestone: 5 },
  { path: "/hip", title: "Your Hip", summary: "Explore the hip in 3D and see what was repaired.", mode: "general", milestone: 6 },
  { path: "/videos", title: "Videos", summary: "Videos about hip arthroscopy and recovery.", mode: "general", milestone: 6 },
  { path: "/faq", title: "FAQ", summary: "Answers to common questions before and after surgery.", mode: "general", milestone: 6 },
  { path: "/red-flags", title: "When to Call", summary: "What is normal after surgery and what needs a call right away.", mode: "general", milestone: 6 },
  { path: "/about", title: "About Dr. Gombera", summary: "Your surgeon and the Hip Preservation Center.", mode: "general", milestone: 6 },
  { path: "/contact", title: "Contact", summary: "Office, after-hours, PreAdmit, email and the patient portal.", mode: "general", milestone: 6 },
  { path: "/print", title: "Print Center", summary: "Printable checklists, protocol and home care sheets for your procedure.", mode: "general", milestone: 7 },
  { path: "/privacy", title: "Privacy", summary: "What this site stores and what it never collects.", mode: "general", milestone: 6 },
];

export const PRIMARY_NAV = [
  { href: "/hip", label: "Your Hip" },
  { href: "/videos", label: "Videos" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function routeInfo(path: string): RouteInfo {
  const r = ROUTES.find((x) => x.path === path);
  if (!r) throw new Error(`Unknown route ${path}`);
  return r;
}

// Old v0 site paths, redirected permanently (scope section 3).
export const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  { source: "/introduction", destination: "/before/diagnosis" },
  { source: "/pre-op", destination: "/before" },
  { source: "/day-of-surgery", destination: "/before/surgery-day" },
  { source: "/post-op", destination: "/after" },
  { source: "/additional-info", destination: "/after/care" },
];
