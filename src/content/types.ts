// Content model (scope section 5). Every clinical item records where it came from.

export type SourceId =
  | "pt-standard" // Hip Labral Repair, Athletes: PT protocol
  | "pt-revision" // Hip Labral Revision or Reconstruction: PT protocol
  | "pt-glute" // Hip Arthroscopy with Gluteus Medius Repair: PT protocol
  | "discharge" // Post-Operative Instruction Checklist
  | "preop-letter" // What to Expect from your Hip Arthroscopy Surgery
  | "decisions" // Dr. Gombera's decisions, 10/30/2026 (scope section 11)
  | "prehab" // Preoperative Rehabilitation (Prehab) Protocol for Hip Arthroscopy Patients
  | "myhealthtrack" // myHealthTrack flyer (Dr. Gombera Recovery Pathways), supplied 11/01/2026
  | "old-site-faq"; // FAQ on the original v0 site

export type Sourced = {
  source: SourceId[];
  /**
   * True when the item is a reasonable inference or plain-language summary
   * rather than a statement found in a source document. Shown highlighted on
   * the content proof so Dr. Gombera can approve, edit or remove it.
   */
  derived?: boolean;
};

export type ProtocolId = "standard" | "revision" | "glute";

export type WeekBlock = {
  fromWeek: number;
  toWeek: number;
  exerciseIds: string[];
  notes?: string[];
};

export type Phase = Sourced & {
  n: 1 | 2 | 3 | 4;
  name: string;
  startWeek: number;
  endWeek: number;
  rangeLabel: string; // as the protocol states it, e.g. "Weeks 1 to 3", "Months 3 to 6"
  goals: string[];
  weeks: WeekBlock[];
  cardio?: string[]; // exercise ids
  criteriaToProgress: string[];
};

export type Protocol = {
  id: ProtocolId;
  title: string;
  shortTitle: string;
  source: SourceId[];
  weightBearing: { partialLbs: 20; pattern: string; weeks: number };
  braceWeeks: number;
  flexionLimitDeg: number;
  proneLying: boolean;
  romRestrictions: string[];
  extraRestrictions: string[];
  aquaTherapyAfterWeek: number;
  runningAfterMonths: number;
  agilityNotBeforeWeek: number;
  driving: string;
  notes: string[];
  phases: Phase[];
};

export type Exercise = Sourced & {
  id: string;
  name: string;
  cues: string[];
  caution?: string;
  therapistOnly?: boolean;
  videoIds: string[];
};

export type Video = {
  id: string;
  youtubeId: string;
  /** Filled automatically from YouTube oEmbed by scripts/fetch-video-titles.mjs. */
  title?: string;
  channel?: string;
  source: "dr-gombera" | "external";
  topics: ("overview" | "surgery" | "recovery" | "exercise" | "testimonial")[];
  caution?: string;
  /** MM/DD/YYYY. A video with no approval date never renders on the site. */
  approvedOn?: string;
};

export type ChecklistItem = Sourced & {
  id: string;
  block: "now" | "week-before" | "night-before";
  title: string;
  detail: string;
  /** Days relative to surgery (negative = before). Used for deadlines. */
  dueOffsetDays?: number;
  link?: { label: string; href: string };
};

export type InfoSection = Sourced & {
  id: string;
  title: string;
  points: string[];
};

export type FaqItem = Sourced & {
  id: string;
  group: "before" | "after";
  q: string;
  a: string;
};
