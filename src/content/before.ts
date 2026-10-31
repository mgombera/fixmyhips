import type { ChecklistItem, InfoSection } from "./types";

// Pre-op checklist, surgery day and add-ons.
// Sources: pre-op letter, discharge sheet, Dr. Gombera's decisions (10/30/2026).

export const PREADMIT_WINDOW = { opensDaysBefore: 30, closesDaysBefore: 7 };

export const CHECKLIST: ChecklistItem[] = [
  {
    id: "pre-register",
    block: "now",
    title: "Pre-register online",
    detail:
      "Pre-registration must be completed no less than 7 days before surgery. At texasorthopedic.com, open the Menu, go to Patients and Visitors, choose Online Pre-Registration, then under MyHealthOne choose Create your account or Sign in. You can also complete it at your PreAdmit visit.",
    dueOffsetDays: -7,
    link: { label: "Open texasorthopedic.com", href: "https://www.texasorthopedic.com" },
    source: ["preop-letter"],
  },
  {
    id: "preadmit",
    block: "now",
    title: "Complete PreAdmit testing (mandatory)",
    detail:
      "PreAdmit is required for clearance to receive anesthesia. It is on the 3rd floor of Texas Orthopedic Hospital, where the nursing and anesthesiology teams will interview you and order any tests needed, such as blood tests or an EKG. Complete it within 30 days of surgery and at least one week before. Call (713) 794-3525 to schedule, or walk in 8 a.m. to 5 p.m., Monday through Friday.",
    dueOffsetDays: -7,
    link: { label: "Call PreAdmit (713) 794-3525", href: "tel:+17137943525" },
    source: ["preop-letter"],
  },
  {
    id: "anesthesia-history",
    block: "now",
    title: "Tell the anesthesia team your history",
    detail:
      "If you are prone to nausea or vomiting after anesthesia, or have had complications with anesthesia, let the anesthesia team know.",
    source: ["preop-letter"],
  },
  {
    id: "cold-therapy",
    block: "week-before",
    title: "Decide on a cold therapy device",
    detail:
      "A cold therapy device helps decrease pain and swelling after surgery. It is optional and may or may not be covered by your insurance, so check with your insurance company. You can also purchase one to own. Contact us with questions.",
    source: ["preop-letter"],
  },
  {
    id: "biologics",
    block: "week-before",
    title: "Optional: decide on a biologic add-on",
    detail:
      "PRP, stem cell or connective tissue matrix treatment can be added during surgery. It is not covered by insurance. Call the office for pricing before surgery day.",
    source: ["preop-letter", "decisions"],
  },
  {
    id: "driver",
    block: "week-before",
    title: "Arrange a ride home and help at home",
    detail:
      "Surgery is usually outpatient, so you go home the same day, and you cannot drive while taking narcotic pain medication.",
    source: ["preop-letter", "discharge"],
    derived: true,
  },
  {
    id: "time-off",
    block: "week-before",
    title: "Plan time off work or school",
    detail:
      "Most people return to desk work or school 4 to 7 days after surgery, if pain allows. Heavy lifting usually takes 3 to 6 months.",
    source: ["discharge", "preop-letter", "decisions"],
  },
  {
    id: "fasting",
    block: "night-before",
    title: "Nothing to eat or drink after midnight",
    detail:
      "PreAdmit will tell you which medications to stop and when. Make sure they know if you take a GLP-1 medication (such as Ozempic, Wegovy, Mounjaro or Zepbound) or any blood thinner.",
    dueOffsetDays: -1,
    source: ["decisions"],
  },
  {
    id: "arrival-call",
    block: "night-before",
    title: "Expect a call with your arrival time",
    detail:
      "The office calls the day before surgery with your arrival time. If you have not heard from us by 3 p.m. that day, call (713) 794-3457.",
    dueOffsetDays: -1,
    link: { label: "Call the office", href: "tel:+17137943457" },
    source: ["decisions"],
  },
  {
    id: "home-setup",
    block: "night-before",
    title: "Get home ready for recovery",
    detail:
      "Have your ice machine or ice packs ready and a place to keep your leg raised to chest level. Crutches and a hip brace are usually given to you on the day of surgery. If insurance does not cover the brace, we will discuss alternatives with you.",
    source: ["discharge", "decisions"],
    derived: true,
  },
];

export const SURGERY_DAY: InfoSection[] = [
  {
    id: "arrive",
    title: "Arrive in the morning",
    points: [
      "Patients come to the hospital in the morning, have surgery, and go home the same day (outpatient surgery).",
      "Your arrival time comes by phone the day before. No call by 3 p.m.? Call (713) 794-3457.",
    ],
    source: ["preop-letter", "decisions"],
  },
  {
    id: "consent",
    title: "Sign the consent",
    points: [
      'A nurse will have you sign the operative permit. It will read "Hip Arthroscopy: Labral Repair, Osteoplasty." Additional procedures may be included depending on what is found in or around the hip.',
    ],
    source: ["preop-letter"],
  },
  {
    id: "anesthesia",
    title: "Meet the anesthesia team",
    points: [
      "The surgery is performed under general anesthesia.",
      "You will meet the anesthesia team at your pre-op appointment and again on the day of surgery.",
    ],
    source: ["preop-letter"],
  },
  {
    id: "surgery",
    title: "Surgery",
    points: [
      "The ball and socket are gently separated by about 1 cm using traction on the foot, which makes room for a small camera (the arthroscope).",
      "Two, three or sometimes four small incisions are made on the side of the hip, each about 5 to 10 mm long.",
      "Surgery usually takes about 40 to 60 minutes.",
      "At the end, medication may be injected into the hip to reduce pain. Incisions are closed with buried sutures, so no stitches need to be removed.",
    ],
    source: ["preop-letter", "decisions"],
  },
  {
    id: "home",
    title: "Home the same day",
    points: [
      "Ice starts right away.",
      "You will walk with crutches, 20 lb weight bearing, and wear the brace when walking and sitting.",
      "An overnight stay is available in certain situations.",
    ],
    source: ["discharge", "decisions"],
  },
];

export const BIOLOGICS: InfoSection = {
  id: "biologics",
  title: "Biologic add-ons: PRP, stem cell and connective tissue matrix",
  points: [
    "Stem cells are used to repair diseased or damaged tissues.",
    "Stem cell, connective tissue matrix or PRP injections may not heal your hip on their own, but there is emerging evidence they can augment and strengthen your surgical repair.",
    "These treatments can be done during your surgery.",
    "They are currently not covered by insurance.",
    "Call for pricing: (713) 794-3457, or email info@gomberamd.com.",
  ],
  source: ["preop-letter", "decisions"],
};
