import type { Phase, Protocol, ProtocolId } from "./types";

// Encoded from docs/source/pt-protocol-*.txt plus Dr. Gombera's decisions of
// 10/30/2026 (scope section 11). Wording stays close to the protocols; plain
// language for patients is written on the pages in milestones 4 and 5.

const PHASE_IV_EXERCISES = [
  "balance-squat-rotation",
  "retro-walk-band",
  "lunge-trunk-rotation",
  "running-progression",
  "quick-feet",
  "backpedal",
  "side-shuffle",
  "double-leg-plyometrics",
  "sport-specific",
];
const PHASE_IV_ADVANCED = ["z-w-cuts", "carioca", "single-leg-plyometrics"];

const PHASE_IV_GOALS = [
  "No complaints of pain or weakness",
  "Running progression",
  "Safe return to sport or functional activities",
  "Maintenance of strength, endurance and balance",
  "Education about any possible limitations",
];

function phaseIV(startWeek: number, rangeLabel: string, extraSource: Phase["source"] = []): Phase {
  return {
    n: 4,
    name: "Plyometrics and return to sport",
    startWeek,
    endWeek: 26,
    rangeLabel,
    source: ["pt-standard", ...extraSource],
    goals: PHASE_IV_GOALS,
    weeks: [
      { fromWeek: startWeek, toWeek: 26, exerciseIds: PHASE_IV_EXERCISES },
      {
        fromWeek: Math.max(16, startWeek),
        toWeek: 26,
        exerciseIds: PHASE_IV_ADVANCED,
        notes: ["Advanced and multidirectional agility: not before week 16"],
      },
    ],
    criteriaToProgress: [],
  };
}

const PHASE_I_WEEK_1 = [
  "hamstring-sets",
  "seated-hamstring-stretch",
  "ankle-pumps",
  "supine-prom",
  "log-rolls",
  "core-isometrics",
];
const PHASE_I_WEEK_2 = [
  "circumduction",
  "upright-bike",
  "cat-camel",
  "rockback",
  "quadruped-hip-extension",
  "soft-tissue-mobilization",
  "scar-massage",
];
const PHASE_I_WEEK_3 = ["aquatic-therapy", "double-leg-bridge", "stool-rotations", "physioball-rollouts"];

const PHASE_I_CRITERIA = [
  "Well-controlled pain after surgery",
  "No hip or pelvis deviations (limp) when walking",
];
const PHASE_II_CRITERIA = [
  "No gait deviations",
  "Minimal pain after activities",
  "Range of motion equal to the other side",
];

const PHASE_III_STANDARD_EXERCISES = [
  "bridge-knee-extension",
  "pillar-bridge",
  "lateral-band-walk",
  "bodyweight-squat",
  "single-leg-quarter-squat",
  "lunges",
  "side-plank",
];

const PHASE_III_GOALS = [
  "Prevent compensation due to fatigue",
  "Begin resisted biking",
  "Progress strengthening from double leg to single leg",
  "Return to prior activities without pain or irritation",
  "Progress leg strength and endurance",
];

const COMMON_NOTES = [
  "This protocol is non-linear.",
  "Patients may progress at different rates. Do not push through the pain.",
];

const DRIVING =
  "Avoid driving until you are no longer taking narcotic pain medication, are able to actively lift your leg (around 3 weeks) and have the limb control to perform all driving tasks.";

export const STANDARD: Protocol = {
  id: "standard",
  title: "Hip arthroscopy, osteoplasty and labral repair",
  shortTitle: "Standard",
  source: ["pt-standard"],
  weightBearing: { partialLbs: 20, pattern: "foot flat, with crutches", weeks: 3 },
  braceWeeks: 4,
  flexionLimitDeg: 90,
  proneLying: false,
  romRestrictions: [
    "Abduction to 45 degrees",
    "No extension past 0 degrees",
    "Internal rotation to neutral",
    "External rotation to 30 degrees",
  ],
  extraRestrictions: [],
  aquaTherapyAfterWeek: 3,
  runningAfterMonths: 3,
  agilityNotBeforeWeek: 16,
  driving: DRIVING,
  notes: COMMON_NOTES,
  phases: [
    {
      n: 1,
      name: "Protection and range of motion",
      startWeek: 1,
      endWeek: 3,
      rangeLabel: "Weeks 1 to 3",
      source: ["pt-standard"],
      goals: [
        "Protect the repair",
        "Avoid hip flexor irritation: no sitting with the hip bent past 90 degrees, avoid actively lifting the leg, activate the deep core muscles",
        "Control and decrease pain, inflammation and swelling",
        "Avoid scar tissue with passive motion and soft tissue mobilization",
        "Hip brace when walking for 4 weeks",
        "20 lb weight bearing, foot flat, for 3 weeks, then weight bearing as tolerated",
      ],
      weeks: [
        { fromWeek: 1, toWeek: 1, exerciseIds: PHASE_I_WEEK_1 },
        { fromWeek: 2, toWeek: 2, exerciseIds: PHASE_I_WEEK_2, notes: ["Continue week 1 exercises"] },
        {
          fromWeek: 3,
          toWeek: 3,
          exerciseIds: PHASE_I_WEEK_3,
          notes: ["Continue week 2 exercises", "Wean from crutches and normalize walking pattern"],
        },
      ],
      criteriaToProgress: PHASE_I_CRITERIA,
    },
    {
      n: 2,
      name: "Stability and gait",
      startWeek: 4,
      endWeek: 6,
      rangeLabel: "Weeks 4 to 6",
      source: ["pt-standard"],
      goals: [
        "Protect the repair",
        "Normalize walking pattern",
        "Begin closed chain and weight shift exercises",
        "Continue Phase I exercises as appropriate",
      ],
      weeks: [
        {
          fromWeek: 4,
          toWeek: 4,
          exerciseIds: [
            "upright-bike",
            "bridge-abduction",
            "half-kneel-weight-shift",
            "half-kneel-row",
            "standing-abduction-isometric",
            "hip-hikes",
          ],
        },
        {
          fromWeek: 5,
          toWeek: 5,
          exerciseIds: [
            "clamshell",
            "standing-weight-shifts",
            "single-leg-stance",
            "fire-hydrant",
            "half-kneel-lift-chop",
            "quarter-squat",
            "forward-step-up",
          ],
        },
        {
          fromWeek: 6,
          toWeek: 6,
          exerciseIds: ["romanian-deadlift", "modified-plank", "ball-hamstring-curl", "lateral-step-up", "y-balance"],
        },
      ],
      criteriaToProgress: PHASE_II_CRITERIA,
    },
    {
      n: 3,
      name: "Strength and muscular endurance",
      startWeek: 7,
      endWeek: 12,
      rangeLabel: "Weeks 7 to 12",
      source: ["pt-standard"],
      goals: PHASE_III_GOALS,
      weeks: [
        {
          fromWeek: 7,
          toWeek: 12,
          exerciseIds: PHASE_III_STANDARD_EXERCISES,
          notes: ["Continue all appropriate exercises from Phase II"],
        },
        { fromWeek: 8, toWeek: 12, exerciseIds: ["resisted-stool-rotations"], notes: ["Resisted stool rotations begin week 8"] },
      ],
      cardio: ["elliptical", "resisted-bike"],
      criteriaToProgress: ["No pain with daily activities", "Normal walking pattern"],
    },
    phaseIV(13, "Months 3 to 6"),
  ],
};

export const REVISION: Protocol = {
  id: "revision",
  title: "Hip arthroscopy, labral revision repair or reconstruction, with or without osteoplasty",
  shortTitle: "Revision or reconstruction",
  source: ["pt-revision", "decisions"],
  weightBearing: { partialLbs: 20, pattern: "foot flat, with crutches", weeks: 6 },
  braceWeeks: 6,
  flexionLimitDeg: 75,
  proneLying: true,
  romRestrictions: [
    "Abduction to 45 degrees",
    "No extension past 0 degrees",
    "Internal rotation to neutral",
    "External rotation to 30 degrees",
  ],
  extraRestrictions: [],
  aquaTherapyAfterWeek: 3,
  runningAfterMonths: 4,
  agilityNotBeforeWeek: 16,
  driving: DRIVING,
  notes: COMMON_NOTES,
  phases: [
    {
      n: 1,
      name: "Protection and range of motion",
      startWeek: 1,
      endWeek: 6,
      rangeLabel: "Weeks 1 to 6",
      source: ["pt-revision"],
      goals: [
        "Protect the repair",
        "Avoid hip flexor irritation: no sitting with the hip bent past 75 degrees, avoid actively lifting the leg, activate the deep core muscles",
        "Control and decrease pain, inflammation and swelling",
        "Avoid scar tissue with passive motion and soft tissue mobilization",
        "Hip brace when walking for 6 weeks",
        "20 lb weight bearing, foot flat, for 6 weeks, then weight bearing as tolerated",
        "Lie on your stomach 2 to 3 hours a day",
      ],
      weeks: [
        { fromWeek: 1, toWeek: 1, exerciseIds: [...PHASE_I_WEEK_1, "prone-lying"] },
        { fromWeek: 2, toWeek: 2, exerciseIds: PHASE_I_WEEK_2, notes: ["Continue week 1 exercises"] },
        { fromWeek: 3, toWeek: 6, exerciseIds: PHASE_I_WEEK_3, notes: ["Continue week 2 exercises"] },
      ],
      criteriaToProgress: PHASE_I_CRITERIA,
    },
    {
      n: 2,
      name: "Stability and gait",
      startWeek: 7,
      endWeek: 9,
      rangeLabel: "Weeks 7 to 9",
      source: ["pt-revision"],
      goals: [
        "Protect the repair",
        "Normalize walking pattern",
        "Begin closed chain and weight shift exercises",
        "Continue Phase I exercises as appropriate",
      ],
      weeks: [
        {
          fromWeek: 7,
          toWeek: 7,
          exerciseIds: [
            "upright-bike",
            "bridge-abduction",
            "half-kneel-weight-shift",
            "half-kneel-row",
            "standing-abduction-isometric",
            "hip-hikes",
          ],
          notes: ["Wean from crutches and normalize walking pattern"],
        },
        {
          fromWeek: 8,
          toWeek: 8,
          exerciseIds: [
            "clamshell",
            "standing-weight-shifts",
            "single-leg-stance",
            "fire-hydrant",
            "half-kneel-lift-chop",
            "quarter-squat",
            "forward-step-up",
            "resisted-stool-rotations",
          ],
        },
        {
          fromWeek: 9,
          toWeek: 9,
          exerciseIds: ["romanian-deadlift", "modified-plank", "ball-hamstring-curl", "lateral-step-up", "y-balance"],
        },
      ],
      criteriaToProgress: PHASE_II_CRITERIA,
    },
    {
      n: 3,
      name: "Strength and muscular endurance",
      startWeek: 10,
      endWeek: 15,
      rangeLabel: "Weeks 10 to 15",
      source: ["pt-revision"],
      goals: PHASE_III_GOALS,
      weeks: [
        {
          fromWeek: 10,
          toWeek: 15,
          exerciseIds: PHASE_III_STANDARD_EXERCISES,
          notes: ["Continue all appropriate exercises from Phase II"],
        },
      ],
      cardio: ["elliptical", "resisted-bike"],
      criteriaToProgress: ["No pain with daily activities", "Normal walking pattern"],
    },
    phaseIV(16, "Months 4 to 6"),
  ],
};

export const GLUTE: Protocol = {
  id: "glute",
  title: "Hip arthroscopy with gluteus medius repair",
  shortTitle: "With gluteus medius repair",
  source: ["pt-glute", "decisions"],
  weightBearing: { partialLbs: 20, pattern: "foot flat, with crutches", weeks: 6 },
  braceWeeks: 4,
  flexionLimitDeg: 90,
  proneLying: true,
  romRestrictions: [
    "Abduction to 45 degrees, passive only",
    "No extension past 0 degrees",
    "No external rotation past 30 degrees",
  ],
  extraRestrictions: ["No active hip abduction", "No passive hip adduction"],
  aquaTherapyAfterWeek: 3,
  runningAfterMonths: 4,
  agilityNotBeforeWeek: 16,
  driving: DRIVING,
  notes: COMMON_NOTES,
  phases: [
    {
      n: 1,
      name: "Protection and range of motion",
      startWeek: 1,
      endWeek: 6,
      rangeLabel: "Weeks 1 to 6",
      source: ["pt-glute", "decisions"],
      goals: [
        "Protect the repair",
        "Avoid active hip abduction and passive hip adduction",
        "Avoid hip flexor irritation: no sitting with the hip bent past 90 degrees",
        "Control and decrease pain, inflammation and swelling",
        "Avoid scar tissue with passive motion and soft tissue mobilization",
        "Hip brace when walking for 4 weeks",
        "20 lb weight bearing, foot flat, for 6 weeks, then weight bearing as tolerated",
        "Lie on your stomach 2 to 3 hours a day",
      ],
      weeks: [
        { fromWeek: 1, toWeek: 1, exerciseIds: [...PHASE_I_WEEK_1, "prone-lying"] },
        { fromWeek: 2, toWeek: 2, exerciseIds: PHASE_I_WEEK_2, notes: ["Continue week 1 exercises"] },
        { fromWeek: 3, toWeek: 6, exerciseIds: PHASE_I_WEEK_3, notes: ["Continue week 2 exercises"] },
      ],
      criteriaToProgress: PHASE_I_CRITERIA,
    },
    {
      n: 2,
      name: "Stability and gait",
      startWeek: 7,
      endWeek: 9,
      rangeLabel: "Weeks 7 to 9",
      source: ["pt-glute"],
      goals: [
        "Protect the repair",
        "Normalize walking pattern",
        "Begin closed chain and weight shift exercises",
        "Continue Phase I exercises as appropriate",
      ],
      weeks: [
        {
          fromWeek: 7,
          toWeek: 7,
          exerciseIds: ["upright-bike"],
          notes: ["Wean from crutches and normalize walking pattern"],
        },
        { fromWeek: 8, toWeek: 8, exerciseIds: ["clamshell", "standing-abduction-isometric"] },
        {
          fromWeek: 9,
          toWeek: 9,
          exerciseIds: ["leg-press", "quad-hamstring-strengthening", "lateral-step-up", "y-balance", "balance-training", "elliptical"],
          notes: ["Leg press: both legs, low weight"],
        },
      ],
      criteriaToProgress: PHASE_II_CRITERIA,
    },
    {
      n: 3,
      name: "Strength and muscular endurance",
      startWeek: 10,
      endWeek: 16,
      rangeLabel: "Weeks 10 to 16",
      source: ["pt-glute", "decisions"],
      goals: PHASE_III_GOALS,
      weeks: [
        {
          fromWeek: 10,
          toWeek: 16,
          exerciseIds: [
            "leg-press",
            "pillar-bridge",
            "bodyweight-squat",
            "single-leg-quarter-squat",
            "lunges",
            "glute-it-stretching",
          ],
          notes: ["Continue all appropriate exercises from Phase II", "Leg press: one leg at a time, low weight"],
        },
      ],
      cardio: ["elliptical", "resisted-bike"],
      criteriaToProgress: [],
    },
    phaseIV(17, "Months 4 to 6", ["decisions"]),
  ],
};

export const PROTOCOLS: Record<ProtocolId, Protocol> = {
  standard: STANDARD,
  revision: REVISION,
  glute: GLUTE,
};

export const PROTOCOL_NOTICE =
  "This is the standard protocol. If you were given a different protocol, follow that one instead.";

export const HOME_PROGRAM = "Continue your home exercise program through 1 year.";
