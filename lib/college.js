import { COLLEGE_MAP } from "./collegeMap";

export const getCollegeFromEmail = (email) => {
  if (!email || !email.includes("@")) return null;

  const domain = email.split("@")[1].toLowerCase();

  return COLLEGE_MAP[domain] || null;
};