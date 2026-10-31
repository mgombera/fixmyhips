# fixmyhips.com

Patient companion site for Dr. Mufaddal Gombera's hip arthroscopy patients. The full spec is `docs/scope.md`; source clinical documents are in `docs/source/`; photos are in `public/images/` (originals summarized in `docs/photos/README.md`).

## Rules

- Build one milestone at a time (scope section 10). Each milestone: its own branch, tests passing, a pull request with the Vercel preview link, then stop for Dr. Gombera's review.
- Sign-off gates: milestone 2 (clinical content proof), milestone 7 (final walkthrough), and the 3D anatomy model. Never proceed past a gate without explicit approval.
- Clinical content comes only from `docs/source/` and the decisions table in scope section 11. Never invent sets, reps, doses or timelines.
- Write copy with no em dashes. Dates display as MM/DD/YYYY.
- No patient data leaves the browser: no forms, accounts, cookies or trackers. The one exception is cookieless page-view counts (Vercel Web Analytics, approved 10/31/2026): paths only, no query strings, no custom events, visible only in Dr. Gombera's Vercel dashboard.
- No "reviewed by" line or date on pages; it appears only in the footer, without a date (10/31/2026).
- Print sheets are generated until Dr. Gombera supplies his edited PDFs; drop them in `public/print/` and set them in `src/content/print.ts`.
- Accessibility: WCAG 2.2 AA, 44px touch targets, real buttons and links.

## Commands

- `npm run dev` / `npm run build` / `npm test` / `npm run lint`
