import type { InfoSection } from "./types";

// Home care after surgery. Sources: discharge sheet, pre-op letter, decisions.

export const HOME_CARE: InfoSection[] = [
  {
    id: "dressing",
    title: "Dressing",
    points: [
      "Keep your surgical dressing on. You may remove the outer bulky dressing 48 hours after surgery.",
      "It is normal for the hip to bleed, swell or bruise after surgery. If blood soaks the bandage, do not be alarmed: reinforce it with more dressing.",
      "Keep the steri-strips (butterfly bandages) in place until they fall off on their own.",
      "If dressing supplies were sent to you, remove the steri-strips and apply the new dressings on day 4 after surgery.",
      "Do not put ointments or creams on the incisions.",
    ],
    source: ["discharge"],
  },
  {
    id: "bathing",
    title: "Showering",
    points: [
      "Keep the incisions clean and dry.",
      "You may shower 48 hours after surgery. Cover the incisions with waterproof bandaids or plastic, and change the bandaids daily.",
      "Do not soak the operated leg, for example in a bath.",
      "The brace may come off to shower.",
    ],
    source: ["discharge"],
  },
  {
    id: "ice",
    title: "Ice",
    points: [
      "Start icing right after surgery.",
      "Use the ice machine, or ice packs if you did not get a machine, for 30 to 45 minutes every 2 hours until your first post-op visit.",
      "Protect your skin to avoid frostbite.",
      "You do not need to wake up at night to change the ice unless you are uncomfortable.",
    ],
    source: ["discharge", "decisions"],
  },
  {
    id: "brace",
    title: "Brace",
    points: [
      "Wear the brace when walking and sitting. The number of weeks depends on your procedure (4 weeks standard).",
      "It can come off to shower, during exercises and at night.",
    ],
    source: ["discharge", "decisions"],
  },
  {
    id: "activity",
    title: "Activity",
    points: [
      "Raise your leg to chest level whenever possible to decrease swelling.",
      "Walk with crutches, 20 lb weight bearing. The number of weeks depends on your procedure.",
      "It is safe to bend the hip within the brace limits. Do not bend the hip past 90 degrees (75 degrees after a Labral Revision or Reconstruction).",
      "Do ankle pumps continuously throughout the day.",
      "Avoid activities that increase hip pain, such as long periods of standing or walking.",
      "Avoid long periods of sitting or long-distance travel for 2 weeks after surgery.",
      "Formal physical therapy usually begins 3 to 5 days after surgery. Your prescription and protocol come with your discharge paperwork.",
    ],
    source: ["discharge"],
  },
  {
    id: "avoid-8-weeks",
    title: "Take care with these for up to 8 weeks",
    points: [
      "Prolonged standing, especially on hard surfaces",
      "Prolonged walking, such as around shopping centers",
      "Heavy lifting",
      "Squatting or crouching",
      "Sleeping on your side. Try to sleep on your back. If you must sleep on your side, lie on the side without surgery with a pillow under your operated leg to hold it level with your body.",
      "Using a clutch in a manual car (left hips): it may flare symptoms in the first couple of weeks. Switch cars if possible.",
    ],
    source: ["preop-letter"],
  },
  {
    id: "driving",
    title: "Driving",
    points: [
      "Do not drive while taking narcotic pain medication.",
      "It is best to wait until you have been seen in the office after surgery.",
      "You need to be able to actively lift your leg (around 3 weeks) and have full control of it for all driving tasks.",
    ],
    source: ["discharge", "pt-standard"],
  },
  {
    id: "work",
    title: "Returning to work or school",
    points: [
      "Most people return to desk work or school 4 to 7 days after surgery, if pain allows. Your hip will be sore: avoid lifting, pushing, pulling or carrying.",
      "Full recovery and return to heavy lifting generally take 3 to 6 months.",
      "There are no fixed rules for return to work; these are guidelines for you and your employer.",
    ],
    source: ["discharge", "preop-letter", "decisions"],
  },
  {
    id: "follow-up",
    title: "First post-op visit",
    points: [
      "Usually 10 to 14 days after surgery, with our Physician Assistant.",
      "She will check your incisions, go over the surgery and your recovery, and answer your questions.",
      "To reschedule, call (713) 794-3457.",
    ],
    source: ["discharge", "preop-letter"],
  },
  {
    id: "expect",
    title: "What to expect",
    points: [
      "Discomfort and stiffness are normal for a few days. Pain may be felt in the hip, lower back, buttock, knee and ankle.",
      "Pain is often worse on day 1 or 2, when swelling peaks.",
      "Swelling and bruising in the groin, buttock and thigh are common, caused by the fluid used during surgery. They improve over the following days.",
      "Most people walk relatively pain-free 6 to 8 weeks after surgery (8 to 10 weeks after a Glute Tendon Repair). Full recovery, and return to elite sport, can take 6 to 9 months or more.",
    ],
    source: ["discharge", "preop-letter"],
  },
];

export const MEDICATION_NOTICE =
  "Your prescriptions may differ. Always take your medications as directed on your own prescription labels.";

export const STANDARD_MEDICATIONS: InfoSection = {
  id: "standard-regimen",
  title: "Standard regimen",
  points: [
    "Baby aspirin (81 mg), 1 tablet twice a day for 2 weeks, to lower the risk of a blood clot.",
    "Norco, 1 tablet every 6 hours as needed for pain. Do not take more than 4,000 mg of acetaminophen in 24 hours.",
    "Naprosyn, 1 tablet every 12 hours with food (anti-inflammatory). Tell us if you cannot take it or other NSAIDs. It is OK with aspirin. Do not combine it with other NSAIDs such as ibuprofen, Advil, Aleve or etodolac.",
    "Robaxin, 1 tablet every 12 hours as needed, for the first week. Helps with pain and muscle spasm.",
  ],
  source: ["discharge", "decisions"],
};

export const MEDICATION_TIPS: InfoSection = {
  id: "medication-tips",
  title: "Taking pain medication",
  points: [
    "Take pain medication with food to reduce nausea.",
    "Common side effects are nausea, drowsiness and constipation. For constipation, an over-the-counter laxative and plenty of water can help.",
    "If you have problems with nausea and vomiting, contact the office.",
    "Do not drive or operate machinery, and avoid alcohol, while taking narcotic pain medication.",
    "Prescriptions are sent to your local pharmacy. For refills, call our office or your pharmacy. We cannot refill after 5 p.m. or refill narcotic medication on weekends.",
  ],
  source: ["discharge", "preop-letter"],
};

// Optional guided home program (myHealthTrack flyer, supplied 11/01/2026).
// Neutral wording: no savings claims; cost questions go to the office.
export const MHT_LINK = "https://mht.link/fondren2";

export const MHT_INTRO =
  "myHealthTrack is an app Dr. Gombera's practice uses for guided recovery at home. It works on your phone or in a web browser, any time of day.";

export const MHT_NOTICE =
  "myHealthTrack does not replace your surgeon's protocol or your physical therapist. If anything in the app differs from your printed protocol or your therapist's instructions, follow your protocol and your therapist.";

export const MHT_TIERS: InfoSection[] = [
  {
    id: "mht-educate",
    title: "Free: learn about your recovery",
    points: ["Educational videos on your procedure", "A phase-by-phase recovery timeline", "Answers to common questions"],
    source: ["myhealthtrack"],
  },
  {
    id: "mht-resources",
    title: "Free: resources for success",
    points: [
      "A care plan with milestones and goals",
      "Guided habit coaching: nutrition and hydration, sleep and mindset",
      "Weekly doctor's notes to help keep you on track",
    ],
    source: ["myhealthtrack"],
  },
  {
    id: "mht-premium",
    title: "Premium: rehab anywhere, any time",
    points: [
      "A home rehab program built to match your surgeon's protocol and restrictions",
      "Video-guided exercises with clear reps and progressions",
      "Ask our office about cost and whether it can replace any in-person therapy visits",
    ],
    source: ["myhealthtrack"],
  },
];

/** Which myHealthTrack pathway to choose, by procedure. */
export const MHT_PATHWAYS: { procedure: string; pathway: string }[] = [
  { procedure: "Hip Arthroscopy, Osteoplasty and Labral Repair", pathway: "Hip Arthroscopy and Labral Repair" },
  { procedure: "Hip Arthroscopy with Glute Tendon Repair", pathway: "Hip Arthroscopy w/Gluteus Medius Repair" },
  { procedure: "Labral Revision or Reconstruction", pathway: "Ask our office which pathway to use" },
];
