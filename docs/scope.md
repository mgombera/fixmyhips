# fixmyhips.com Build Scope

10/30/2026 · @Mufaddal Gombera

Rebuild the hip arthroscopy patient guide from scratch as fixmyhips.com: a personal companion that tells each scheduled patient exactly what to do today, from booking through one year after surgery. Design direction: Athletic, on the gomberamd.com navy.

## 1. Purpose and audience

The site serves patients already scheduled for hip arthroscopy with Dr. Gombera, from the day surgery is booked through the one-year home program. It replaces the current 8-page v0 site, which shows the same text to everyone regardless of where they are in recovery.

**Core promise:** open the site, see what applies to you today.

**Primary users**

- Scheduled patients, on their phones, often in pain or on medication: large type, one-thumb use, no login.
- Family and caregivers helping with the pre-op checklist and early recovery.
- Physical therapists checking the protocol a patient was given.

**Out of scope for launch:** marketing to prospective patients (gomberamd.com does that), appointment booking, reminders, accounts.

**Who the site is for, stated on the site** (home page under setup, the footer of every page, and About): "This site is for patients who are scheduled for hip arthroscopy with Dr. Gombera. To learn more about hip problems or to be evaluated, request a consultation at gomberamd.com." The gomberamd.com mention links to its appointment page.

**Success measures (first 6 months)**

| Measure | Target | How measured |
| --- | --- | --- |
| Phone calls to the office asking routine questions answered on the site | Down, by staff estimate | Office staff log for 4 weeks before and after launch |
| Patients who set a surgery date | 60% of visitors | Cookieless analytics event (no date captured) |
| PreAdmit completed on time | No same-week cancellations for missed PreAdmit | Office records |
| Mobile performance | Lighthouse 90+ on all four scores | Lighthouse CI on each deploy |

## 2. Brand and visual system

Use the Athletic Recovery layout from the design canvas (boards C: After Surgery and Before Surgery), recolored onto the gomberamd.com brand navy #313E6B so fixmyhips.com reads as part of Dr. Gombera's practice.

**Color tokens (dark theme, default)**

| Token | Hex | Use |
| --- | --- | --- |
| bg | #10152A | Page background (deep navy from #313E6B) |
| surface | #19213D | Cards, panels |
| border | #2A3458 | Card borders, dividers |
| brand | #313E6B | Header band, badges, print headers |
| accent | #4DB8FF | Progress, active nav, links, primary buttons (dark text on it) |
| alert | #FF9B57 | Red flags and mandatory deadlines only |
| text | #E8ECF1 | Body text |
| muted | #A3ADC2 | Secondary text (must stay 4.5:1 on bg and surface) |

A light theme is required for printing and for users whose system is set to light mode. Same tokens, with white or #F4F6FA backgrounds and #313E6B as the primary text accent.

**Type:** Barlow Condensed 700 and 800 for numbers and headings ("DAY 18", phase names), Inter 400 to 600 for body. Self-hosted through next/font, no runtime Google Fonts calls.

**Photography (supplied 10/30/2026)**

| Photo | Placement |
| --- | --- |
| Headshot, gray suit | About Dr. Gombera, and the footer contact card |
| Operating room, blue scrubs | Home hero behind the date entry, and the Videos page header |
| Texas Orthopedic Hospital exterior at dusk | Surgery day page and the PreAdmit checklist item (where to go) |

Photos are optimized with next/image in AVIF and WebP, with descriptive alt text. Dark overlays keep text over photos at 4.5:1.

**Logo:** use the gomberamd.com logo, https://www.gomberamd.com/wp-content/uploads/logo.webp, copied into the repo during setup. It is a raster file, so check it prints sharply on the print pages; swap in a vector version later if one turns up.

**Accessibility (WCAG 2.2 AA, required)**

- Body text at least 17px on phones; touch targets at least 44px.
- Every control is a real button, link or labeled input; full keyboard use; visible focus ring in accent blue.
- Color is never the only signal (red flags also carry an icon and the word "Call").
- Respect reduced-motion settings; no autoplaying video.
- Plain language at about a 6th to 8th grade reading level; medical terms explained on first use.

## 3. Site map

Sixteen routes. The top bar always shows a Before surgery / After surgery switch, a Call button, and a Red flags link that is never more than one tap away.

| Route | Page | What it holds |
| --- | --- | --- |
| / | Home | Enter surgery date and procedure (or "not scheduled yet"); then redirects to the right mode. Returning visitors land on their dashboard. |
| /before | Before Surgery | Countdown, readiness bar, PreAdmit alert, checklist by time block (Now, 1 week before, Night before) |
| /before/surgery-day | Surgery Day | 5 steps: arrival call, consent, anesthesia, surgery (40 to 60 min), home same day; overnight stay note; Texas Orthopedic Hospital photo, address and map link |
| /before/diagnosis | Your Diagnosis | FAI (cam, pincer), labral tear, dysplasia; why surgery; alternatives; outcome numbers; full risk list |
| /before/add-ons | Biologic Add-ons | PRP, stem cell and connective tissue matrix: what they are, the evidence in plain terms, not covered by insurance, ask before surgery day |
| /after | Recovery Dashboard | Day count, phase and week, status tiles, today's session, next unlocks, PT override notice |
| /after/timeline | Recovery Timeline | All phases for the selected protocol, criteria to move on, milestone dates |
| /after/care | Home Care | Dressing, showering, ice, brace, activity limits, sleep position, driving, return to work, medications (standard regimen note) |
| /after/exercises | Exercise Library | Every exercise in the selected protocol, filterable by phase and week, each with video and cues |
| /hip | Your Hip | Interactive anatomy explorer: labrum, cartilage, cam and pincer, capsule, gluteus medius |
| /videos | Videos | The 3 existing videos plus any added later, grouped by topic |
| /faq | FAQ | All FAQs, searchable, grouped Before and After |
| /red-flags | When to Call | Normal versus call-now symptoms, office and after-hours numbers, ER guidance |
| /about | About Dr. Gombera | Headshot, credentials, Hip Preservation Center, link to gomberamd.com |
| /contact | Contact | Office (713) 794-3457, after hours (713) 799-2300, PreAdmit (713) 794-3525, info@gomberamd.com, Athena patient portal, address |
| /print | Print Center | Printable checklist, protocol, home care sheet and red-flag card for the selected procedure |

Old v0 routes (/introduction, /pre-op, /day-of-surgery, /post-op, /additional-info, /faq, /videos) redirect with 301s to their new equivalents, in case patients saved links.

## 4. Personalization logic

Two inputs drive the whole site: the surgery date and the procedure. Both stay on the patient's device.

**Procedure picker** (shown on Home and in settings)

1. Standard: hip arthroscopy, labral repair and osteoplasty (default)
2. Revision labral repair or labral reconstruction, with or without osteoplasty
3. Hip arthroscopy with gluteus medius repair
4. "My protocol is different": shows Standard with a banner telling the patient to follow the paper protocol they were given

Every protocol view carries this notice: "This is the standard protocol. If you were given a different protocol, follow that one instead."

**What each variant changes** (from the three PT protocols supplied 10/30/2026)

| Parameter | Standard | Revision or reconstruction | Gluteus medius repair |
| --- | --- | --- | --- |
| 20 lb foot-flat weight bearing | 3 weeks | 6 weeks | 6 weeks |
| Brace when walking | 4 weeks | 6 weeks | 4 weeks |
| Phase I hip flexion limit | 90° | 75° | 90° |
| Prone lying 2 to 3 hours a day | No | Yes | Yes |
| Extra restrictions | None | None | No active hip abduction, no passive adduction; abduction passive only; no external rotation past 30° |
| Phase I | Weeks 1 to 3 | Weeks 1 to 6 | Weeks 1 to 6 |
| Phase II | Weeks 4 to 6 | Weeks 7 to 9 | Weeks 7 to 9 |
| Phase III | Weeks 7 to 12 | Weeks 10 to 15 | Weeks 10 to 16 |
| Phase IV | Months 3 to 6 | Months 4 to 6 | Months 4 to 6, using the standard Phase IV exercises |
| Aqua therapy | After week 3, incisions healed | Same | Same |
| Running progression | After 3 months | After 4 months | After 4 months |
| Multidirectional agility | Not before week 16 | Not before week 16 | Not before week 16 |

Dr. Gombera settled the protocol inconsistencies on 10/30/2026 (section 11). The table reflects those decisions; the protocol PDFs should be corrected to match.

**Date math**

- Day 0 is the surgery date. Before it, the site is in Before mode and counts days remaining; from Day 0 on, it is in After mode and counts days since.
- Week = floor(days since surgery / 7) + 1. The current phase is the one whose week range contains that week.
- PreAdmit window = surgery date minus 30 days to surgery date minus 7 days. The readiness bar turns orange inside 10 days if PreAdmit is unchecked.
- Night-before items appear on surgery date minus 1, with the rule "no arrival-time call by 3 p.m.? Call (713) 794-3457."
- Dates display as MM/DD/YYYY in the patient's local time zone.
- No surgery date yet: the site shows general content in both modes, with a prompt to add the date.

**Clinic QR codes:** printed codes link to fixmyhips.com/start?p=standard, ?p=revision or ?p=glute. The code preselects the procedure only; the patient adds the date. No date or name ever goes in a URL.

**Privacy:** surgery date, procedure and checklist ticks are saved in the browser's local storage. Nothing is sent to a server. A "Clear my information" button in settings wipes it. If storage is blocked (private browsing), the site still works for the session and says the date will not be remembered.

## 5. Content model

All clinical content lives as typed data files in the repo, not inside page code. Changing a protocol, adding an FAQ or swapping a video is a one-file edit that Dr. Gombera can approve in a pull request. Every clinical item carries a `reviewedOn` date shown at the bottom of the page.

```
content/
  protocols/standard.ts      revision.ts      glute-medius.ts
  exercises.ts               one entry per exercise, shared by all protocols
  videos.ts                  registry of every video on the site
  faq.ts                     questions, answers, Before/After grouping
  red-flags.ts               normal vs call-now symptoms, phone numbers
  checklist-preop.ts         pre-op tasks with offsets from surgery date
  home-care.ts               dressing, shower, ice, brace, activity, driving, work
  medications.ts             standard regimen + "take as directed" note
  anatomy.ts                 hotspot text for the anatomy explorer
```

**Core types**

```typescript
type Protocol = {
  id: 'standard' | 'revision' | 'glute';
  title: string;
  weightBearing: { partialLbs: 20; weeks: number };
  braceWeeks: number;
  flexionLimitDeg: number;
  proneLying: boolean;
  restrictions: string[];
  phases: Phase[];
  reviewedOn: string; // MM/DD/YYYY
};

type Phase = {
  n: 1 | 2 | 3 | 4;
  name: string;
  startWeek: number; endWeek: number;
  goals: string[];
  weeks: { fromWeek: number; toWeek: number; exerciseIds: string[] }[];
  criteriaToProgress: string[];
};

type Exercise = {
  id: string;              // 'double-leg-bridge'
  name: string;
  cues: string[];          // from the protocol text only
  caution?: string;        // e.g. 'within ROM limits'
  videoIds: string[];      // keys into videos.ts; empty = show 'video coming soon'
};

type Video = {
  id: string;
  youtubeId: string;
  title: string;
  source: 'dr-gombera' | 'external';
  channel?: string;
  topics: ('overview' | 'surgery' | 'recovery' | 'exercise' | 'testimonial')[];
  approvedOn?: string;     // unapproved videos never render
};
```

**Rules the build must enforce**

- Exercise cues come only from the protocol documents. Sets and reps are not in the protocols, so they are left out unless Dr. Gombera supplies them.
- A video with no `approvedOn` date never appears on the site.
- A build check fails if any exercise in a protocol has no matching entry in exercises.ts, or any date-dependent content lacks a `reviewedOn` date.

## 6. Feature specs

Each feature lists what it does and the test it must pass before it ships.

### 6.1 Home and setup

- Two questions: surgery date (date picker, or "not scheduled yet") and procedure (the four options in section 4).
- Done when: a first-time visitor reaches a personalized dashboard in under 3 taps, and a returning visitor skips setup.

### 6.2 Recovery dashboard (After mode)

- Big day count, phase and week, phase progress bar sized to each phase's real length.
- Status tiles: weight bearing, flexion limit, brace (days left), driving, running (earliest start). Values come from the selected protocol.
- Today's session: this week's new exercises plus "continue previous weeks," each with a checkbox and video link. Ticks reset weekly.
- Next unlocks with dates (crutch wean, brace off, aqua therapy, resisted bike, running, agility), each labeled "estimate; your therapist decides."
- Done when: dashboards for all three protocols match the protocol documents at days 1, 18, 30, 45, 70, 100 and 130 (snapshot tests).

### 6.3 Pre-op countdown (Before mode)

- Days to surgery, readiness bar, orange PreAdmit alert with its deadline date.
- Checklist blocks: Now (pre-registration, PreAdmit, anesthesia history), 1 week before (cold therapy device, driver, time off, biologic add-on decision), Night before (nothing to eat or drink after midnight; medication holds from PreAdmit, with GLP-1 and blood-thinner callout; home setup; crutches and brace given on surgery day).
- Done when: every pre-op instruction in the pre-op letter appears in exactly one checklist item or the Surgery Day page.

### 6.4 Recovery timeline

- All four phases for the selected protocol, the current phase highlighted, goals and criteria to move on for each.
- Copy at the top: "Recovery is not a straight line. You move to the next phase when your therapist confirms you meet its criteria."

### 6.5 Exercise library and therapist override

- Filter by phase and week; each card shows name, cues, caution, video.
- A fixed notice on the dashboard session list and at the top of the library: "Your physical therapist has the final say. These are general suggestions from the standard protocol. If your therapist gives you different exercises, limits or timing, follow your therapist's plan. Stop any exercise that causes sharp pain."
- Exercises without an approved video show "Video coming soon" and the cues only.

### 6.6 Home care

- Sections: dressing (outer dressing off at 48 hours; steri-strips until they fall off, or removed day 4 if dressing supplies were sent; no creams), shower (from 48 hours, cover incisions, no baths), ice (30 to 45 minutes every 2 hours until first post-op visit, no need to wake at night), brace (walking and sitting; off for showering, exercises and sleep), activity and sleep, driving criteria, return to work (desk work typically 4 to 7 days), first post-op visit (10 to 14 days, with the Physician Assistant).
- Medications: shows the standard regimen (baby aspirin 81 mg twice daily for 2 weeks; Norco as needed; Naprosyn with food; Robaxin first week) under the heading "Standard regimen." Directly above it: "Your prescriptions may differ. Always take your medications as directed on your own prescription labels."

### 6.7 Anatomy explorer

- Launch: an interactive illustrated hip (SVG, layered), tappable parts: labrum, cartilage, cam bump, pincer, capsule, gluteus medius. Each opens plain-language text and "what we did" for the selected procedure.
- The 2D view also serves as the fallback wherever the 3D model cannot load (older phones, reduced-motion setting, slow connection).
- Done when: fully usable by keyboard and screen reader (parts are a list of buttons, the drawing is decoration).

**3D hip model (built by Claude Code, in scope for launch)**

- A rotatable, zoomable 3D right hip (mirrored for left) rendered in the browser with React Three Fiber (three.js). Drag to rotate, pinch to zoom, a reset button, and preset camera views: front, side, and the arthroscopic "inside the joint" view.
- Separate, tappable parts: pelvis and acetabulum, femoral head and neck, articular cartilage, labrum, capsule, gluteus medius tendon, and the cam and pincer bone. Tapping a part highlights it and opens the same plain-language text as the 2D explorer.
- Before and after toggle per procedure: before shows the cam bump and torn labrum; after shows the cam reshaped, the labrum repaired with knotless anchors, and the capsule closed. The gluteus medius procedure adds the tendon repair; the revision procedure shows a reconstructed labrum.
- How the geometry is made: bones come from an openly licensed, CT-derived anatomical mesh (candidates: BodyParts3D or Z-Anatomy; Claude Code confirms the license allows reuse and adds the required credit on the About page). Claude Code then builds the soft tissues (labrum ring, cartilage, capsule, tendon, anchors) as procedural geometry fitted to those bones, with a reproducible Blender or three.js script in the repo so the model can be regenerated or adjusted.
- Performance budget: one GLB file of at most 3 MB with meshopt compression, loaded only when the patient opens Your Hip; at least 30 frames per second on a mid-range phone. If the budget fails, the page shows the 2D explorer.
- Accessibility: the parts list is a set of real buttons beside the canvas, so everything the model shows is reachable without touching the 3D view.
- **Gate:** Dr. Gombera reviews the model's anatomy and the before and after states on a preview link before it ships.

### 6.8 Videos

- Lightweight YouTube embeds through the privacy-enhanced youtube-nocookie domain; nothing loads until the patient taps play.
- Launch set: the three existing videos (YouTube IDs 20ayXeRdXL0, \_ZuBxOM2KKs, eZBopkjkJ8s), currently titled on the old site "Understanding Hip Arthroscopy," "Hip Arthroscopy: I have my life back" and "Hip Arthroscopy Surgical Video." Ignore those old labels: a build script pulls each video's own title and channel from YouTube's oEmbed endpoint and writes them into videos.ts, so the site always shows the title as it appears on YouTube.
- Adding a video later = one new entry in videos.ts with an `approvedOn` date. Topic groups appear automatically once they have a video. A slot for Dr. Gombera's own exercise videos replaces an external pick by changing one `videoIds` entry.

### 6.9 Red flags

- Two columns: usually normal (bruising in groin, buttock or thigh; some numbness; small drainage; low-grade temperature; more pain on day 1 or 2) and call now (fever over 101°F or chills, calf pain, unrelenting pain, painful swelling or numbness, continuous drainage or bleeding, excessive nausea or vomiting, difficulty breathing).
- Tap-to-call buttons for (713) 794-3457 and (713) 799-2300; emergency line directs to the nearest ER.
- Reachable from every page in one tap.

### 6.10 Biologic add-ons

- Plain-language page on PRP, stem cell and connective tissue matrix: emerging evidence they may strengthen the repair; they do not heal the hip on their own; done during surgery; not covered by insurance; decide before surgery day.
- Call to action: call the office or email info@gomberamd.com. Pricing shows as "Call for pricing" with a tap-to-call button for (713) 794-3457.

### 6.11 FAQ, contact and portal

- FAQ: searchable, grouped Before and After, answers drawn from the corrected FAQ list. The physical therapy answer reads: formal PT typically lasts 2 to 4 months and may extend to 6 months as needed; the home program continues through 1 year.
- Contact: office, after-hours, PreAdmit, email, address and a map link.
- Patient portal button for non-urgent messages linking to the Fondren Athena portal, https://15533-8.portal.athenahealth.com, labeled "Not for urgent problems; call us."

### 6.12 Print center

- One-tap printable pages for the selected procedure: pre-op checklist, protocol overview, home care sheet, red-flag card. Print stylesheet in the light theme with the logo, practice address and reviewed-on date.
- Done when: each prints on letter paper with no cut-off content.

## 7. Exercise video map

54 of the 57 protocol exercises have a candidate YouTube video; log rolls and both stool rotation exercises have none and are the best candidates for Dr. Gombera's own clips. Every video below was confirmed to exist (title and channel checked through YouTube), but none has been watched yet. **Status for all: needs Dr. Gombera's review.** Nothing renders on the site until it has an `approvedOn` date (section 5).

Safety rules applied during the search: Phase I and II videos must not show hip flexion past 90° (75° for revision), active straight-leg raises, or external rotation beyond protocol limits. Log rolls are internal rotation only, so the common external-rotation log roll video was rejected.

| Phase | Exercise | Video | Channel | Watch for |
| --- | --- | --- | --- | --- |
| I | Hamstring sets | [Hamstring Sets](https://www.youtube.com/watch?v=NJv1hKZJsMY) | AskDoctorJo |  |
| I | Seated hamstring stretch | [Hamstring stretch in sitting](https://www.youtube.com/watch?v=9ywIMCH7TJQ) | NUH Singapore | Forward lean can pass 90° |
| I | Ankle pumps | [Ankle Pumps](https://www.youtube.com/watch?v=KxfFzSOAT7g) | Michigan Medicine |  |
| I | Supine passive hip ROM | [Passive Range of Motion Flexion](https://www.youtube.com/watch?v=CpV6cmKTl0c) | HipTV | Flexion must stop at limit |
| I | Log rolls (internal rotation only) | None suitable |  | Film own clip |
| I | Transverse abdominis bracing | [Transverse Abdominus Isometric](https://www.youtube.com/watch?v=oa6BNZVukDc) | Virginia Mason Franciscan Health |  |
| I | Glute sets | [Glute Sets](https://www.youtube.com/watch?v=TPUcaCNKwnY) | VNA Health Group |  |
| I | Abductor isometric | [Hooklying Isometric Hip Abduction with Belt](https://www.youtube.com/watch?v=ivM1KqzDdjM) | MedBridge |  |
| I | Prone lying | [Prone Lying Hip Extension](https://www.youtube.com/watch?v=SCBWckPG-0E) | HipandKneeTV | Made for hip replacement; may add leg lifts |
| I | Hip circumduction (passive) | [Caregiver-assisted Circumduction PROM](https://www.youtube.com/watch?v=OV2Dp5Wjc54) | UT Orthopedics | Check flexion range. Alt: [Circumduction in Neutral](https://www.youtube.com/watch?v=NEgJjS2zVAg) |
| I | Upright bike, no resistance | [Stationary Bike after Hip Arthroscopic Surgery](https://www.youtube.com/watch?v=HHxKHaKzQRY) | John Christoforetti, MD | Seat height keeps hip at or below 90° |
| I | Quadruped cat and camel | [Cat Camel](https://www.youtube.com/watch?v=1cs3SKwQZpM) | Baptist Health | Sitting back adds flexion |
| I | Quadruped rockback | [Quadruped rocking](https://www.youtube.com/watch?v=2Iq19sP3Ha8) | \[P\]rehab | Full rockback passes 90° |
| I | Quadruped hip extension | [Quadruped Hip Extension](https://www.youtube.com/watch?v=3CEpUodMswQ) | BSR Physical Therapy |  |
| I | Portal scar massage | [Get Rid of Scar Tissue](https://www.youtube.com/watch?v=_7LSCJKImXE) | AskDoctorJo | Only once incisions are closed |
| I | Double leg bridge | [Bridge exercise](https://www.youtube.com/watch?v=HDsvrNUcghY) | Mass General Orthopaedics |  |
| I | Stool rotations | None suitable |  | Film own clip |
| I | Physioball rollouts | [Tall Kneeling Stability Ball Roll Out](https://www.youtube.com/watch?v=AWaHsNLeTCQ) | GHF Training | Not a clinician channel; short range only |
| II | Bridge with band abduction | [Bridge with theraband abduction](https://www.youtube.com/watch?v=g3PbbAHbYto) | PT Jon |  |
| II | Half-kneeling weight shifts | [Half Kneeling Weight Shift](https://www.youtube.com/watch?v=GGuk22nM790) | Josh Avison | Weak pick; replace if possible |
| II | Half-kneeling single-arm row | [1/2 Kneel Single Arm Row](https://www.youtube.com/watch?v=6Y6fwZOkBBM) | Balance In Motion |  |
| II | Hip hikes off step | [Hip Hiking on Step](https://www.youtube.com/watch?v=yYM5uW3RXjI) | MedBridge |  |
| II | Standing weight shifts | [Stride Stance Weight Shift](https://www.youtube.com/watch?v=xWGC--1LpE4) | MedBridge | Forward and back only. Lateral: [Weight Shifting, Lateral](https://www.youtube.com/watch?v=BpFvOf9fcok) |
| II | Single leg stance progression | [Single Leg Balance Progression](https://www.youtube.com/watch?v=T6Dc8ewTJ9A) | BSR Physical Therapy |  |
| II | Quadruped fire hydrant | [Fire Hydrant Exercise](https://www.youtube.com/watch?v=IRkRgk2Gc1E) | Hinge Health | External rotation in flexion; limit arc |
| II | Half-kneeling lift and chop | [Half-Kneeling Chops and Lifts](https://www.youtube.com/watch?v=Ir6PF5Q4LO8) | Black Bear Physical Therapy |  |
| II | Double leg quarter squat | [Wall Quarter Squat](https://www.youtube.com/watch?v=vYNrBt3PAZo) | MedBridge |  |
| II | Forward step-up | [Forward Step Up](https://www.youtube.com/watch?v=7UvrEa84Nck) | Physical Therapy San Pedro | Step height keeps hip at or below 90° |
| II | Romanian deadlift | [Standing Hip Hinge](https://www.youtube.com/watch?v=Gs6--_Mk3WE) | MedBridge | Limit depth. Alt: [Hinge Health](https://www.youtube.com/watch?v=2W_gXhut5S8) |
| II | Modified plank on knees | [Modified Plank](https://www.youtube.com/watch?v=iDSHokfXqyA) | PureGym | Weak pick; gym chain |
| II | Physioball hamstring curls | [Bridges and Hamstring Curls on a Stability Ball](https://www.youtube.com/watch?v=3P_5CjnLE3o) | Atrius Health |  |
| II | Lateral step-up | [Lateral Step-up](https://www.youtube.com/watch?v=sXW9aOo03P8) | MedBridge |  |
| II | Y balance reach | [Y Balance Exercise](https://www.youtube.com/watch?v=lFNC1gq-ysk) | Rehab My Patient |  |
| II | Sidelying clamshell | [Clamshell Exercise](https://www.youtube.com/watch?v=t0ASA5CxgKI) | MedBridge | External rotation; limit range |
| II | Standing abduction isometric at wall | [Standing Isometric Hip Abduction at Wall](https://www.youtube.com/watch?v=TS7tLpZhhPA) | MedBridge |  |
| II | Leg press | [Partial Weight Bearing Single Leg Leg Press](https://www.youtube.com/watch?v=39IN4b-X5ck) | Mass General Orthopaedics | Sled set so hip stays at or below 90° |
| II | Resisted stool rotations | None suitable |  | Film own clip |
| III | Bridge with alternating knee extension | [Bridge with Knee Extension](https://www.youtube.com/watch?v=0CpBqkm6Whs) | Michael Braccio | Alt: [Single Leg Bridge](https://www.youtube.com/watch?v=eRq0TLfgH6c) |
| III | Plank, pillar bridge | [How to Do a Plank](https://www.youtube.com/watch?v=LSd0aTrVWlg) | Hinge Health |  |
| III | Lateral band walk in squat | [Band walks](https://www.youtube.com/watch?v=o6lmGWbu36s) | Mass General Orthopaedics |  |
| III | Bodyweight squat | [Squats](https://www.youtube.com/watch?v=IaInMN_WZDM) | AskDoctorJo |  |
| III | Single leg quarter squat | [Single Leg Quarter Squat](https://www.youtube.com/watch?v=dLtzuzDWX30) | MedBridge |  |
| III | Lunges, forward and reverse | [How to Do Lunges](https://www.youtube.com/watch?v=3zVrh37QqC8) | Hinge Health | Lateral: [Hinge Health](https://www.youtube.com/watch?v=u1K3p7YS31g) |
| III | Side plank | [Side plank exercise](https://www.youtube.com/watch?v=83YnX5JqaJI) | Mass General Orthopaedics |  |
| III | Elliptical | [Proper Use of an Elliptical](https://www.youtube.com/watch?v=NTeZV4t-x8w) | TriHealth | Not hip-specific |
| III | Glute and IT band stretching | [Glute Stretch](https://www.youtube.com/watch?v=4MHs4H9UfQs) | Hinge Health | Deep flexion with rotation. IT band: [AskDoctorJo](https://www.youtube.com/watch?v=wzDoSQ8-GWY) |
| IV | Balance squat with rotation | [Rotational Squat](https://www.youtube.com/watch?v=BJ9vu4DNrU0) | The MS Gym | Weak pick; made for MS audience |
| IV | Retro walking with band | [Resisted Retro Walk](https://www.youtube.com/watch?v=oRH5__OjF4s) | KIME Performance PT | Alt: [Backwards Monster Walk](https://www.youtube.com/watch?v=L1lVlpUTD2w), Midwest Orthopaedics at Rush |
| IV | Lunge with trunk rotation | [Alternating Lunge with Trunk Twist](https://www.youtube.com/watch?v=Y253Ci988B4) | Elite Sports Clubs | Weak pick |
| IV | Return-to-running progression | [Return to Running After Hip Surgery](https://www.youtube.com/shorts/5vpdAKCnH6g) | Carl Freeman, MD | A Short; confirm it is arthroscopy, not replacement |
| IV | Quick feet | [Ladder Drills](https://www.youtube.com/watch?v=3XGNjvIbZf0) | 3DPT | Made for ACL rehab |
| IV | Backpedaling | [Forward Backward Jog Stops](https://www.youtube.com/watch?v=L9Sf-FIvAtM) | MedStar Health |  |
| IV | Side shuffles | [Lateral Shuffle](https://www.youtube.com/watch?v=iBmvPEWt5og) | MedStar Health |  |
| IV | Broad jumps, 4-square hops | [Hopping and Jumping Progressions](https://www.youtube.com/watch?v=6XewJxTPrkE) | E3 Rehab | 4-square: [4 Square Hops](https://www.youtube.com/watch?v=vrV1GZBFWTU) |
| IV | Z and W cuts | [Early Cutting Drills](https://www.youtube.com/watch?v=xbonVpLhz5w) | \[P\]rehab | General cuts, not Z or W. Z: [Z-Drill](https://www.youtube.com/watch?v=Qwg4gnnhCq4) |
| IV | Carioca | [Carioca](https://www.youtube.com/watch?v=E6SKcfQBZlc) | Dr. Brian Abelson |  |
| IV | Single-leg hop progression | [Single-Leg Hop Stability Progression](https://www.youtube.com/watch?v=fU6zsyvHg6E) | Elite Performance Institute |  |

**Hip arthroscopy compilations** (useful on the Videos page; watch for active straight-leg raises before approving):

- [Post Operative Exercises Week 1, Hip Arthroscopy](https://www.youtube.com/watch?v=pBzMIHKjQR8), Nashville Hip Institute at TOA
- [Post Operative Hip FAI Surgery Exercises Level One](https://www.youtube.com/watch?v=RFnj6aaagWw), Dr. Derek Ochiai, Nirschl
- [Exercises to do immediately after arthroscopic hip surgery](https://www.youtube.com/watch?v=MK1ws9LQIws), Mark Ayzenberg, MD

**Own clips to film first:** log rolls, stool rotations, resisted stool rotations. Weak picks worth replacing with your own clips later: half-kneeling weight shift, modified plank, balance squat with rotation, lunge with trunk rotation, Z and W cuts.

## 8. Safety and legal

The site collects no patient information, and every clinical statement traces to a document Dr. Gombera approved. Dr. Gombera is the sole content approver.

**Standing notices (exact wording, shown where listed)**

| Notice | Where |
| --- | --- |
| "This is the standard protocol. If you were given a different protocol, follow that one instead." | Dashboard, timeline, exercise library, protocol print |
| "Your physical therapist has the final say. These are general suggestions from the standard protocol. If your therapist gives you different exercises, limits or timing, follow your therapist's plan. Stop any exercise that causes sharp pain." | Today's session, exercise library |
| "Your prescriptions may differ. Always take your medications as directed on your own prescription labels." | Above the standard medication regimen |
| "Dates are estimates. You move on when your therapist confirms you meet the phase criteria." | Next unlocks, timeline |
| "Videos from outside sources are shown for demonstration. Follow your own limits and your therapist's instructions." | Every external exercise video |
| "General education only. It does not replace advice from your care team. In an emergency, go to the nearest emergency room." | Footer of every page |

**Privacy**

- No forms, accounts, cookies or third-party trackers. Surgery date, procedure and checklist ticks live only in the patient's browser.
- Analytics are cookieless page-view counts only (Vercel Web Analytics). Custom events never include a date or a procedure.
- YouTube loads only when a patient taps play, through youtube-nocookie.com.
- A plain-language /privacy page states all of the above. Whether the site needs any HIPAA-specific measures is a question for Fondren's compliance contact; the design avoids collecting any patient information so that the question stays simple.

**Content governance**

- Everything under content/ is owned by Dr. Gombera in the repo's CODEOWNERS file: no clinical change merges without his approval.
- CHANGELOG.md records each clinical change with its date (MM/DD/YYYY) and approver.
- Each page shows "Reviewed MM/DD/YYYY." A yearly review reminder is a calendar item for the office, not a site feature.
- Before launch, the printed pre-op letter, discharge sheet, FAQ and PT protocols are corrected to match the site (separate change list), so patients never see two different answers.

## 9. Tech stack and hosting

A new GitHub repository deployed on Vercel at fixmyhips.com, built from scratch like Dr. Gombera's other sites. No server, database or backend at launch: every page is prerendered, and personalization runs in the browser.

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js, App Router, current stable release | Matches the existing Vercel workflow; static prerendering |
| Language | TypeScript, strict mode | Protocol data is type-checked |
| Styling | Tailwind CSS with the section 2 tokens | Fast, consistent theming, light and dark |
| UI primitives | Radix UI (tabs, dialog, accordion) | Accessible by default |
| Dates | date-fns | Reliable day and week math across time zones |
| Video | react-lite-youtube-embed, youtube-nocookie | No YouTube load until tap |
| 3D model | React Three Fiber (three.js) with drei helpers; GLB with meshopt compression | Custom part selection and before and after states |
| Tests | Vitest (date math, protocol data), Playwright plus axe (pages, accessibility), Lighthouse CI | Clinical logic is tested, not eyeballed |
| Hosting | Vercel: preview deploy per pull request, production from main | Dr. Gombera reviews each change on a preview link |
| Domain | fixmyhips.com apex, www redirects to apex; DNS pointed at Vercel | Separate patient-facing domain |

**Search engines:** the site is indexed. Each page gets its own title and description, sitemap.xml, robots.txt allowing all, a canonical fixmyhips.com address, and schema.org MedicalWebPage and Physician markup linking to gomberamd.com. Search engines see the general (no surgery date) version of each page, since personalization happens only in the browser.

The old v0 project stays live until launch day, then its routes 301 to fixmyhips.com and the deployment is retired.

## 10. Build plan

Eight milestones, each delivered as a pull request with a Vercel preview link. Two milestones are clinical sign-off gates where nothing proceeds until Dr. Gombera approves.

1. **Setup.** Repo, Vercel project, fixmyhips.com DNS, design tokens, fonts, layout shell, top bar with Before/After switch, Call and Red flags, 301 redirects from the old routes.
   - Done when: preview URL loads on a phone; Lighthouse 90+ on the empty shell.
2. **Clinical content as data.** Encode the three protocols, exercise library, pre-op checklist, home care, standard medications, FAQ and red flags from the source documents.
   - Done when: build checks pass and a printable "content proof" page lists every instruction by source document.
   - **Gate 1:** Dr. Gombera signs off the content proof.
3. **Personalization engine.** Setup flow, local storage, date math, procedure switching, QR presets, clear-my-information.
   - Done when: unit tests cover all three protocols at every phase boundary and the PreAdmit window.
4. **Before mode.** Countdown dashboard, checklist, Surgery Day, Your Diagnosis, Biologic Add-ons.
5. **After mode.** Recovery dashboard, timeline, exercise library with therapist notice, home care with medication notice.
   - Done when: snapshot tests at days 1, 18, 30, 45, 70, 100 and 130 match the protocols for each procedure.
6. **Supporting pages.** 3D hip model with the 2D explorer as fallback (anatomy gate: Dr. Gombera approves the model), Videos, FAQ search, Red flags, About, Contact with Athena link, Privacy.
7. **Print and polish.** Print center, light theme, full accessibility pass (axe clean, keyboard and screen reader walkthrough), analytics, performance.
   - **Gate 2:** Dr. Gombera walks through each procedure at the checkpoint days on his phone and approves or lists fixes.
8. **Launch.** Point fixmyhips.com at production, redirect the old v0 site, print clinic QR codes for each procedure, update the pre-op letter and discharge sheet with the site address and QR code.

How to hand this to Claude Code: give it this document, the three PT protocols, the discharge sheet, the pre-op letter, the corrected FAQ and the design canvas, then run one milestone per session and review each preview link before merging.

## 11. Open questions, parked items and sources

**Decisions from Dr. Gombera (10/30/2026)**

| Question | Decision |
| --- | --- |
| Gluteus medius rotation restriction | No external rotation past 30° |
| Gluteus medius Phase III end | Week 16 |
| Gluteus medius Phase IV | Use the standard protocol's Phase IV |
| Running start, revision and gluteus repair | 4 months |
| Length of formal PT | Typically 2 to 4 months, may extend to 6 months as needed |
| Existing video titles | Pulled from each YouTube video automatically |
| Logo | gomberamd.com logo |
| Patient portal | Fondren Athena portal, https://15533-8.portal.athenahealth.com |
| Search engines | Indexed, with the scheduled-patients statement and gomberamd.com consultation link |
| Biologic add-on pricing | Call for pricing |
| 3D hip model | Built by Claude Code as part of launch |

**Still open**

- [ ] Sets and reps per exercise, if wanted (not in the protocols; the site leaves them out until supplied).
- [ ] Review of each exercise video pick in section 7.

**Parked for later**

- Text or email reminders (needs contact info and HIPAA-appropriate hosting).
- Spanish version.
- More protocol variants (e.g. capsular plication, non-athlete standard).
- Dr. Gombera's own exercise videos replacing external picks.

**Source documents (supplied 10/30/2026)**

- Hip Labral Repair, Athletes: PT protocol (standard)
- Hip Labral Revision or Reconstruction: PT protocol
- Hip Gluteus Medius Tendon Repair: PT protocol
- Hip Arthroscopy Post-Operative Instruction Checklist (discharge sheet)
- What to Expect from your Hip Arthroscopy Surgery (pre-op letter)
- Current site: v0-react-hip-arthroscopy-page.vercel.app
- Design canvas: Hip Arthroscopy Guide Redesign, boards C (After Surgery, Before Surgery)
