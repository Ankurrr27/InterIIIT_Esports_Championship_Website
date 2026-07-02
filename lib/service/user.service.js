import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { validateCollegeEmail } from "@/lib/validators";
import { isValidEmail } from "@/lib/validators";
import { getCollegeFromEmail } from "@/lib/college";

export const registerUser = async (data) => {
  const { name, email, password, collegeEmail, game} = data;
  
  // validating normal email format
  if (!isValidEmail(email)) {
    throw new Error("Invalid email format");
  }

  //validating college email
  if (!validateCollegeEmail(collegeEmail)) {
    throw new Error("Invalid college email domain");
  }

  //extracting college from email using map
  const college = getCollegeFromEmail(collegeEmail);

  if (!college) {
    throw new Error("College not recognized");
  }

  //check if user already exists
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  return User.create({
    name,
    email,
    password: hashed,
    collegeEmail,
    game,
    college
  });
};