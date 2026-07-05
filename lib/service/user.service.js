import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { validateCollegeEmail, validateCollegeEmailMatch } from "@/lib/validators";
import { isValidEmail } from "@/lib/validators";
import { generateToken } from "@/lib/auth";

export const registerUser = async (data) => {
  const { name, email, password, collegeEmail, game, college } = data;

  if (!college) {
    throw new Error("Please select your college");
  }

  // validating normal email format
  if (!isValidEmail(email)) {
    throw new Error("Invalid email format");
  }

  //validating college email domain is recognised
  if (!validateCollegeEmail(collegeEmail)) {
    throw new Error("Invalid college email domain");
  }

  // cross-check: selected college must match the college email domain
  if (!validateCollegeEmailMatch(college, collegeEmail)) {
    throw new Error(
      `Your college email does not match ${college}. Please use your institute email.`
    );
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

export const loginUser = async ({ collegeEmail, password }) => {

    // Check if required fields are present
    if (!collegeEmail || !password) {
        throw new Error("College email and password are required");
    }

      if (!isValidEmail(collegeEmail)) {
        throw new Error("Invalid email format");
    }

    // Validate the college email format/domain
    if (!validateCollegeEmail(collegeEmail)) {
        throw new Error("Invalid college email");
    }

    // Find the user (password is excluded by default)
    const user = await User.findOne({ collegeEmail }).select("+password");

    // Don't reveal whether the email exists
    if (!user) {
        throw new Error("Invalid college email or password");
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error("Invalid college email or password");
    }

    // Generate JWT
    const token = generateToken(user);

    // Return only safe user data
    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,               
            collegeEmail: user.collegeEmail,
            college: user.college,
            game: user.game,
            role: user.role,
            teamId: user.teamId
        }
    };
};

export const getCurrentUser = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        collegeEmail: user.collegeEmail,
        college: user.college,
        game: user.game,
        role: user.role,
        teamId: user.teamId
    };
};