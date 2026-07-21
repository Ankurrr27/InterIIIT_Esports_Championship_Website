import { COLLEGE_MAP, COLLEGE_DOMAIN_MAP } from "./collegeMap";
import CollegeRequest from "@/lib/models/CollegeRequest";

/**
 * Validates that the email belongs to a recognised college domain.
 */
export const validateCollegeEmail = async (email) => {
  if (!email || !email.includes("@")) return false;

  const domain = email.split("@")[1]?.toLowerCase();
  
  // Static check
  if (Object.values(COLLEGE_DOMAIN_MAP).includes(domain)) return true;

  // Dynamic check
  const approved = await CollegeRequest.findOne({ status: "Approved", email_domain: domain });
  return !!approved;
};

/**
 * Validates that the college email domain matches the selected college.
 */
export const validateCollegeEmailMatch = async (college, email) => {
  if (!college || !email || !email.includes("@")) return false;

  const actualDomain = email.split("@")[1]?.toLowerCase();
  
  // Static check
  const expectedDomain = COLLEGE_DOMAIN_MAP[college];
  if (expectedDomain && actualDomain === expectedDomain) return true;

  // Dynamic check
  const approved = await CollegeRequest.findOne({ status: "Approved", college_name: college, email_domain: actualDomain });
  return !!approved;
};

export const isValidEmail = (email) => {
  if (!email) return false;

  email = email.trim().toLowerCase();

  const regex =
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  return regex.test(email);
};