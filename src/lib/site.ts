import logo from "./logo.json";
// Practice facts used across the site. Clinical content lives in content/ (milestone 2).

export const PRACTICE = {
  doctor: "Mufaddal M. Gombera, MD",
  specialty: "Orthopedic Surgery and Sports Medicine",
  group: "Fondren Orthopedic Group",
  hospital: "Texas Orthopedic Hospital",
  address: "7401 Main Street, Houston, TX 77030",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=7401+Main+St+Houston+TX+77030",
  office: { label: "(713) 794-3457", tel: "+17137943457" },
  afterHours: { label: "(713) 799-2300", tel: "+17137992300" },
  preAdmit: { label: "(713) 794-3525", tel: "+17137943525" },
  email: "info@gomberamd.com",
  portalUrl: "https://15533-8.portal.athenahealth.com",
  consultUrl: "https://www.gomberamd.com/",
  logoUrl: logo.src, // local copy made by scripts/fetch-logo.mjs, or the gomberamd.com address
} as const;

export const AUDIENCE_STATEMENT =
  "This site is for patients who are scheduled for hip arthroscopy with Dr. Gombera.";

export const DISCLAIMER =
  "General education only. It does not replace advice from your care team. In an emergency, go to the nearest emergency room.";
