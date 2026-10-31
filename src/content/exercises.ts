import type { Exercise } from "./types";

// Cues come only from the protocol text. Where a protocol gives no detail,
// cues are empty: the patient follows the video and the therapist.
// Sets and reps are not in the protocols and are intentionally absent.

const P = ["pt-standard", "pt-revision", "pt-glute"] as Exercise["source"];
const SR = ["pt-standard", "pt-revision"] as Exercise["source"];

export const EXERCISES: Exercise[] = [
  // Phase I
  { id: "hamstring-sets", name: "Hamstring sets", source: P, cues: [], videoIds: ["v-hamstring-sets"] },
  { id: "seated-hamstring-stretch", name: "Seated hamstring stretch", source: P, cues: [], caution: "Keep within your hip flexion limit", videoIds: ["v-seated-hamstring-stretch"] },
  { id: "ankle-pumps", name: "Ankle pumps", source: [...P, "discharge"], cues: ["Perform continuously throughout the day"], videoIds: ["v-ankle-pumps"] },
  {
    id: "supine-prom",
    name: "Passive range of motion, lying on your back",
    source: P,
    therapistOnly: true,
    cues: [
      "Flexion to 75 degrees",
      "Abduction to 30 degrees",
      "External and internal rotation to 20 degrees, with the hip bent",
      "30 repetitions in each direction",
    ],
    videoIds: ["v-supine-prom"],
  },
  { id: "log-rolls", name: "Log rolls", source: P, cues: [], videoIds: [] },
  {
    id: "core-isometrics",
    name: "Isometrics",
    source: P,
    cues: ["Focus on the deep abdominals, obliques, gluteals and abductors"],
    videoIds: ["v-ta-bracing", "v-glute-sets", "v-abductor-isometric"],
  },
  { id: "prone-lying", name: "Prone lying (lying on your stomach)", source: ["pt-revision", "pt-glute"], cues: ["Prone hangs", "Lie on your stomach 2 to 3 hours a day"], videoIds: ["v-prone-lying"] },
  {
    id: "circumduction",
    name: "Circumduction",
    source: P,
    therapistOnly: true,
    cues: [
      "Hip bent to 70 degrees, knee bent to 90 degrees",
      "Gently move the thigh in small circles, first clockwise, then counterclockwise",
      "Avoid rotation",
      "5 minutes in each direction",
      "Repeat in neutral: hip out to the side 20 degrees, knee straight",
    ],
    videoIds: ["v-circumduction", "v-circumduction-neutral"],
  },
  { id: "upright-bike", name: "Stationary bike, no resistance", source: P, cues: ["No resistance", "Keep the seat high", "No recumbent bike"], videoIds: ["v-upright-bike"] },
  { id: "cat-camel", name: "Quadruped cat and camel", source: P, cues: ["Be mindful of your range of motion limits"], videoIds: ["v-cat-camel"] },
  { id: "rockback", name: "Quadruped rockback", source: P, cues: ["With a slight backward pelvic tilt", "Be mindful of your range of motion limits"], videoIds: ["v-rockback"] },
  { id: "quadruped-hip-extension", name: "Quadruped hip extension", source: P, cues: ["Be mindful of your range of motion limits"], videoIds: ["v-quadruped-hip-extension"] },
  { id: "soft-tissue-mobilization", name: "Soft tissue mobilization", source: P, therapistOnly: true, cues: ["Start superficial, progress to deep"], videoIds: [] },
  { id: "scar-massage", name: "Scar massage at the incisions", source: P, cues: ["5 minutes"], caution: "Only once incisions are healed", videoIds: ["v-scar-massage"] },
  { id: "aquatic-therapy", name: "Aquatic therapy", source: P, cues: ["May begin after week 3, as long as incisions are well healed"], videoIds: [] },
  { id: "double-leg-bridge", name: "Double leg bridges", source: P, cues: [], videoIds: ["v-double-leg-bridge"] },
  { id: "stool-rotations", name: "Stool rotations", source: P, cues: ["Within your range of motion limits"], videoIds: [] },
  { id: "physioball-rollouts", name: "Physioball rollouts", source: P, cues: [], videoIds: ["v-physioball-rollouts"] },

  // Phase II
  { id: "bridge-abduction", name: "Double leg bridges with abduction", source: SR, cues: [], videoIds: ["v-bridge-abduction"] },
  { id: "half-kneel-weight-shift", name: "Half-kneeling weight shifts", source: SR, cues: [], videoIds: ["v-half-kneel-weight-shift"] },
  { id: "half-kneel-row", name: "Half-kneeling single-arm row and extension", source: SR, cues: ["With a TheraBand or sport cord"], videoIds: ["v-half-kneel-row"] },
  { id: "hip-hikes", name: "Hip hikes", source: SR, cues: ["Off the edge of a step"], videoIds: ["v-hip-hikes"] },
  { id: "standing-weight-shifts", name: "Standing weight shifts", source: SR, cues: ["Side to side, and forward and backward"], videoIds: ["v-weight-shift-stride", "v-weight-shift-lateral"] },
  { id: "single-leg-stance", name: "Single leg stance", source: SR, cues: ["Balance progression"], videoIds: ["v-single-leg-stance"] },
  { id: "fire-hydrant", name: "Quadruped fire hydrant", source: SR, cues: [], videoIds: ["v-fire-hydrant"] },
  { id: "half-kneel-lift-chop", name: "Half-kneeling lifts and chops", source: SR, cues: ["Upper body only, with a sport cord", "No hip or torso rotation"], videoIds: ["v-lift-chop"] },
  { id: "quarter-squat", name: "Double leg quarter squats", source: SR, cues: [], videoIds: ["v-quarter-squat"] },
  { id: "forward-step-up", name: "Forward step-ups", source: SR, cues: [], videoIds: ["v-forward-step-up"] },
  { id: "romanian-deadlift", name: "Forward shift to Romanian deadlift", source: SR, cues: [], videoIds: ["v-hip-hinge"] },
  { id: "modified-plank", name: "Modified prone plank", source: SR, cues: ["Knees to elbows"], videoIds: ["v-modified-plank"] },
  { id: "ball-hamstring-curl", name: "Therapy ball hamstring curls", source: SR, cues: [], videoIds: ["v-ball-hamstring-curl"] },
  { id: "lateral-step-up", name: "Side step-ups", source: P, cues: [], videoIds: ["v-lateral-step-up"] },
  { id: "y-balance", name: "Y balance reaching", source: P, cues: [], videoIds: ["v-y-balance"] },
  { id: "clamshell", name: "Side-lying clamshells", source: ["pt-revision", "pt-glute"], cues: ["Progress to TheraBand resistance"], videoIds: ["v-clamshell"] },
  { id: "standing-abduction-isometric", name: "Standing hip abduction isometrics", source: ["pt-revision", "pt-glute"], cues: ["Against a foam roller or wall"], videoIds: ["v-standing-abduction-isometric"] },
  { id: "resisted-stool-rotations", name: "Resisted stool rotations", source: SR, cues: ["Begin week 8"], videoIds: [] },
  { id: "leg-press", name: "Leg press", source: ["pt-glute"], cues: ["Low weight", "Both legs first (week 9), then one leg at a time (Phase III)"], videoIds: ["v-leg-press"] },
  { id: "quad-hamstring-strengthening", name: "Quadriceps and hamstring strengthening", source: ["pt-glute"], cues: ["Advance as directed by your therapist"], therapistOnly: true, videoIds: [] },
  { id: "balance-training", name: "Balance training", source: ["pt-glute"], cues: ["Bosu ball, balance board, single leg stance"], videoIds: ["v-single-leg-stance"] },

  // Phase III
  { id: "bridge-knee-extension", name: "Bridge with alternating knee extensions", source: SR, cues: [], videoIds: ["v-bridge-knee-extension"] },
  { id: "pillar-bridge", name: "Half prone plank (pillar bridge)", source: P, cues: ["Progress to full plank or Bosu when appropriate"], videoIds: ["v-pillar-bridge"] },
  { id: "lateral-band-walk", name: "Side stepping in an athletic squat", source: SR, cues: ["Progress to a TheraBand"], videoIds: ["v-lateral-band-walk"] },
  { id: "bodyweight-squat", name: "Double leg body weight squats", source: P, cues: [], videoIds: ["v-bodyweight-squat"] },
  { id: "single-leg-quarter-squat", name: "Single leg quarter squat", source: P, cues: [], videoIds: ["v-single-leg-quarter-squat"] },
  { id: "lunges", name: "Forward, lateral and reverse lunges", source: P, cues: [], videoIds: ["v-lunges", "v-lateral-lunge"] },
  { id: "side-plank", name: "Side plank", source: SR, cues: [], videoIds: ["v-side-plank"] },
  { id: "glute-it-stretching", name: "Abductor, IT band and gluteus maximus stretching", source: ["pt-glute"], cues: [], videoIds: ["v-glute-stretch", "v-it-band-stretch"] },
  { id: "elliptical", name: "Elliptical trainer", source: P, cues: ["Start with 5 minutes, increase 5 minutes each week"], videoIds: ["v-elliptical"] },
  { id: "resisted-bike", name: "Resisted biking", source: P, cues: ["Advance resistance as tolerated"], videoIds: [] },

  // Phase IV
  { id: "balance-squat-rotation", name: "Balance squats with rotations", source: SR, cues: [], videoIds: ["v-balance-squat-rotation"] },
  { id: "retro-walk-band", name: "Retro walking with resistance band", source: SR, cues: [], videoIds: ["v-retro-walk"] },
  { id: "lunge-trunk-rotation", name: "Lunge with trunk rotations", source: SR, cues: ["With a sport cord or physioball"], videoIds: ["v-lunge-trunk-rotation"] },
  { id: "running-progression", name: "Running progression", source: SR, cues: ["Begin with single plane agilities"], videoIds: ["v-running-progression"] },
  { id: "quick-feet", name: "Quick feet", source: SR, cues: [], videoIds: ["v-quick-feet"] },
  { id: "backpedal", name: "Backpedaling", source: SR, cues: [], videoIds: ["v-backpedal"] },
  { id: "side-shuffle", name: "Side shuffles", source: SR, cues: [], videoIds: ["v-side-shuffle"] },
  { id: "double-leg-plyometrics", name: "Double leg plyometrics", source: SR, cues: ["For example broad jumps and 4-square hops"], videoIds: ["v-hopping", "v-four-square"] },
  { id: "sport-specific", name: "Sport-specific exercises", source: SR, cues: [], therapistOnly: true, videoIds: [] },
  { id: "z-w-cuts", name: "Z and W cuts", source: SR, cues: ["Not before week 16"], videoIds: ["v-cutting"] },
  { id: "carioca", name: "Cariocas", source: SR, cues: ["Not before week 16"], videoIds: ["v-carioca"] },
  { id: "single-leg-plyometrics", name: "Single leg plyometrics", source: SR, cues: ["Not before week 16"], videoIds: ["v-single-leg-hop"] },
];

export const PT_OVERRIDE_NOTICE =
  "Your physical therapist has the final say. These are general suggestions from the standard protocol. If your therapist gives you different exercises, limits or timing, follow your therapist's plan. Stop any exercise that causes sharp pain.";

export const DATES_ARE_ESTIMATES =
  "Dates are estimates. You move on when your therapist confirms you meet the phase criteria.";

export function exerciseById(id: string): Exercise {
  const e = EXERCISES.find((x) => x.id === id);
  if (!e) throw new Error(`Unknown exercise ${id}`);
  return e;
}
