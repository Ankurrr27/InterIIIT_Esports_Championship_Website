// Maps email domain → college name (used for resolving college from email)
export const COLLEGE_MAP = {
  "iiitkota.ac.in": "IIIT Kota",
  "iiitnagpur.ac.in": "IIIT Nagpur",
  "iiitpatna.ac.in": "IIIT Patna"
};

// Reverse map: college name → email domain (used for validating email matches selected college)
export const COLLEGE_DOMAIN_MAP = Object.fromEntries(
  Object.entries(COLLEGE_MAP).map(([domain, name]) => [name, domain])
);

// Sorted list of college names for dropdowns
export const COLLEGE_LIST = Object.values(COLLEGE_MAP).sort();