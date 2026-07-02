// export const validateCollegeEmail = (email) => {
//   const allowedDomain = process.env.COLLEGE_DOMAIN; 
//   return email.endsWith(`@${allowedDomain}`);
// };

export const validateCollegeEmail = (email) => {
  if (!email || !email.includes("@")) return false;

  const domain = email.split("@")[1]?.toLowerCase();

  const allowed = (process.env.COLLEGE_DOMAINS || "")
    .split(",")
    .map(d => d.trim().toLowerCase());

  return allowed.includes(domain);
};

export const isValidEmail = (email) => {
  if (!email) return false;

  email = email.trim().toLowerCase();

  const regex =
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  return regex.test(email);
};