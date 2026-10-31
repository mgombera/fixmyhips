import type { FaqItem, InfoSection } from "./types";

// Diagnosis, anatomy and FAQ. Sources: pre-op letter, old site FAQ, decisions.

export const DIAGNOSIS: InfoSection[] = [
  {
    id: "fai",
    title: "Femoroacetabular impingement (FAI)",
    points: [
      "Abnormal contact between the ball of the hip (femoral head) and the rim of the socket (acetabulum), which damages the cartilage lining, the labrum, or both.",
      "It is caused by an abnormal shape of the ball, the socket, or both. Repeated hip motion increases the contact.",
      "It affects all ages, from the early teens through adult life, and is increasingly recognized as a cause of hip arthritis.",
      "Arthroscopy reshapes the socket and/or the ball to stop the impingement. It aims to relieve pain and lower the risk of arthritis, but does not eliminate it.",
    ],
    source: ["preop-letter"],
  },
  {
    id: "labral-tear",
    title: "Labral tear",
    points: [
      "The labrum is a ring of cartilage around the socket. It can be partly damaged or torn.",
      "Tears are usually linked to FAI, but can also come from dysplasia, injury or overuse.",
      "During arthroscopy the labrum is repaired, or sometimes the damaged tissue is removed (debrided). Occasionally it is reconstructed with a graft.",
      "MRI or CT usually, but not always, shows a labral tear.",
    ],
    source: ["preop-letter"],
  },
  {
    id: "dysplasia",
    title: "Hip dysplasia",
    points: [
      "A shallow socket. Some force normally carried by the socket shifts onto the labrum, which can tear it.",
      "In mild or borderline dysplasia, repairing the labrum can relieve pain, but arthroscopy does not deepen the socket or remove the higher risk of arthritis.",
      "In advanced dysplasia, a larger reconstruction such as a periacetabular osteotomy (PAO) can increase coverage.",
      "Dysplasia and impingement are opposite ends of a spectrum: under-coverage versus over-coverage. Ask Dr. Gombera if you are unsure of your diagnosis.",
    ],
    source: ["preop-letter"],
  },
  {
    id: "why-surgery",
    title: "Why surgery, and the alternatives",
    points: [
      "Surgery is recommended for persistent pain that interferes with daily life, work or sport and has not improved with conservative treatment.",
      "Alternatives range from no treatment to physical therapy, medication or injections. These can be arranged if you prefer.",
    ],
    source: ["preop-letter"],
  },
];

// Anatomy explorer text. Parts the pre-op letter does not describe are
// marked derived for Dr. Gombera's review.
export const ANATOMY: InfoSection[] = [
  {
    id: "labrum",
    title: "Labrum",
    points: [
      "A ring of cartilage around the rim of the socket.",
      "Impingement, dysplasia, injury or overuse can tear it. It is repaired back to the bone, or reconstructed with a graft in some revision cases.",
    ],
    source: ["preop-letter"],
  },
  {
    id: "cartilage",
    title: "Cartilage",
    points: ["The smooth lining of the socket. Impingement can damage it, which causes pain."],
    source: ["preop-letter"],
  },
  {
    id: "cam",
    title: "Cam bump",
    points: ["Extra bone where the ball meets the neck of the femur. It pinches the labrum when the hip bends. Osteoplasty reshapes it."],
    source: ["preop-letter"],
    derived: true,
  },
  {
    id: "pincer",
    title: "Pincer",
    points: ["Extra coverage from the rim of the socket that pinches the labrum. It can be reshaped during arthroscopy."],
    source: ["preop-letter"],
    derived: true,
  },
  {
    id: "capsule",
    title: "Capsule",
    points: ["The strong envelope of tissue around the hip joint. It is repaired at the end of surgery to keep the hip stable."],
    source: [],
    derived: true,
  },
  {
    id: "gluteus-medius",
    title: "Gluteus medius",
    points: ["A muscle on the side of the hip that steadies the pelvis when you walk. Its tendon can tear from the bone and be repaired during the same surgery."],
    source: ["pt-glute"],
    derived: true,
  },
];

export const FAQ: FaqItem[] = [
  {
    id: "length",
    group: "before",
    q: "How long does the surgery take?",
    a: "Usually about 40 to 60 minutes. Plan to spend about half a day at the hospital. It is typically outpatient surgery, but an overnight stay is available in certain situations.",
    source: ["preop-letter", "decisions", "old-site-faq"],
  },
  {
    id: "anesthesia",
    group: "before",
    q: "Will I be asleep?",
    a: "Yes. The surgery is performed under general anesthesia. You will meet the anesthesia team at PreAdmit and again on the day of surgery.",
    source: ["preop-letter"],
  },
  {
    id: "eat",
    group: "before",
    q: "Can I eat or drink before surgery?",
    a: "Nothing to eat or drink after midnight. PreAdmit will tell you which medications to stop, especially GLP-1 medications and blood thinners.",
    source: ["decisions"],
  },
  {
    id: "brace-crutches-get",
    group: "before",
    q: "When do I get crutches and a brace?",
    a: "Usually on the day of surgery. If insurance does not cover the brace, we will discuss alternatives with you.",
    source: ["decisions"],
  },
  {
    id: "shower",
    group: "after",
    q: "When can I shower?",
    a: "48 hours after surgery. Cover the incisions with waterproof bandaids or plastic and change the bandaids daily. Leave the steri-strips on until they fall off, unless dressing supplies were sent to you; in that case remove them on day 4. No baths or soaking.",
    source: ["discharge", "old-site-faq"],
  },
  {
    id: "dressings-mail",
    group: "after",
    q: "What if I receive dressings in the mail?",
    a: "Some patients receive dressing supplies to help healing. Remove the steri-strips and apply the new dressings on day 4 after surgery, following the instructions included.",
    source: ["discharge", "old-site-faq"],
  },
  {
    id: "crutches",
    group: "after",
    q: "How long will I need crutches?",
    a: "Usually 3 weeks for the standard procedure, and 6 weeks after a revision, labral reconstruction or gluteus medius repair. Your therapist will help you wean off them.",
    source: ["pt-standard", "pt-revision", "pt-glute"],
  },
  {
    id: "brace",
    group: "after",
    q: "How long will I wear the brace?",
    a: "When walking and sitting for 4 weeks (6 weeks after a revision or reconstruction). It can come off for showering, exercises and sleep.",
    source: ["discharge", "pt-revision", "decisions"],
  },
  {
    id: "pt",
    group: "after",
    q: "Will I need physical therapy?",
    a: "Yes. Formal physical therapy usually begins 3 to 5 days after surgery and typically lasts 2 to 4 months, extending to 6 months as needed. Your home exercise program continues through 1 year.",
    source: ["discharge", "decisions", "pt-standard"],
  },
  {
    id: "work",
    group: "after",
    q: "When can I go back to work or school?",
    a: "Typically 4 to 7 days after surgery for desk work or school, if pain allows. Heavy lifting usually takes 3 to 6 months.",
    source: ["discharge", "preop-letter", "decisions"],
  },
  {
    id: "drive",
    group: "after",
    q: "When can I drive?",
    a: "Not while taking narcotic pain medication. You need to be able to lift your leg (around 3 weeks) and control it fully. It is best to wait until your first post-op visit.",
    source: ["discharge", "pt-standard"],
  },
  {
    id: "sports",
    group: "after",
    q: "When can I return to sports?",
    a: "Running begins at 3 months for the standard procedure and 4 months after a revision or gluteus medius repair. Return to sport usually takes 6 to 9 months, and improvement can continue for up to 12 months.",
    source: ["pt-standard", "decisions", "preop-letter", "old-site-faq"],
  },
  {
    id: "first-visit",
    group: "after",
    q: "When is my first visit after surgery?",
    a: "Usually 10 to 14 days after surgery, with our Physician Assistant. No stitches need removing because the sutures are buried under the skin.",
    source: ["discharge", "preop-letter"],
  },
];
