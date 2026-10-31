import type { InfoSection } from "./types";

// Red flags and outcomes. Sources: discharge sheet, pre-op letter.

export const USUALLY_NORMAL: InfoSection = {
  id: "normal",
  title: "Usually normal",
  points: [
    "Some swelling and numbness",
    "Bleeding, swelling or bruising around the hip, groin, buttock or thigh",
    "A small amount of drainage from the incisions",
    "A low-grade temperature",
    "More pain on day 1 or 2 after surgery",
    "Stiffness and discomfort for a few days",
  ],
  source: ["discharge", "preop-letter"],
};

export const CALL_NOW: InfoSection = {
  id: "call",
  title: "Call us if you have",
  points: [
    "Painful swelling or numbness",
    "Pain that will not let up",
    "Fever over 101°F, or chills",
    "Continuous drainage or bleeding from an incision",
    "Difficulty breathing",
    "Excessive nausea or vomiting",
    "Calf pain",
  ],
  source: ["discharge"],
};

export const CALL_NUMBERS = {
  office: "For questions or problems, call the office at (713) 794-3457.",
  afterHours: "After hours and on weekends, reach the on-call physician at (713) 799-2300.",
  emergency: "If you have an emergency that needs immediate attention, go to the nearest emergency room.",
  afterHoursUse: "Please keep after-hours and weekend calls for emergencies; we will handle less urgent problems during the week.",
};

export const OUTCOMES: InfoSection = {
  id: "outcomes",
  title: "Results and risks",
  points: [
    "This surgery is successful about 85 to 90 percent of the time. It is most successful at relieving pain.",
    "About 80 percent of Dr. Gombera's patients say their pain is resolved, 15 percent say it is the same, and 5 percent say it is worse.",
    "Returning to vigorous work or sport depends on the damage to your hip, how well it heals, how well you rehabilitate and how demanding your activity is.",
    "The complication rate is low. The risk of a major complication is substantially less than 1 in 1,000. Most complications are temporary.",
    "Possible complications include infection, fracture, increased pain, bleeding, nerve injury, abandoned procedure, blood clot in the leg or lung, impotence, instrument breakage, avascular necrosis of the femoral head, leakage of irrigation fluid, delayed wound healing, worsening symptoms, popping, labral re-tear, excess bone formation, arthritis, stiffness, need for further surgery, and the risks of anesthesia itself.",
  ],
  source: ["preop-letter"],
};
