import { COLLEGE_MAP, COLLEGE_DOMAIN_MAP } from "./collegeMap";

/**
 * Validates that the email belongs to a recognised college domain.
 */
export const validateCollegeEmail = (email) => {
  if (!email || !email.includes("@")) return false;

  const domain = email.split("@")[1]?.toLowerCase();
  return domain in COLLEGE_MAP;
};

/**
 * Validates that the college email domain matches the selected college.
 * e.g. college = "IIIT Kota" → email must end with @iiitkota.ac.in
 */
export const validateCollegeEmailMatch = (college, email) => {
  if (!college || !email || !email.includes("@")) return false;

  const expectedDomain = COLLEGE_DOMAIN_MAP[college];
  if (!expectedDomain) return false;

  const actualDomain = email.split("@")[1]?.toLowerCase();
  return actualDomain === expectedDomain;
};

export const isValidEmail = (email) => {
  if (!email) return false;

  email = email.trim().toLowerCase();

  const regex =
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  return regex.test(email);
};