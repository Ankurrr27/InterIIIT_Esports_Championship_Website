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

    // We don't validate college email format here because admins may use standard emails.
    // If the email is invalid, it simply won't be found in the database.

    // Find the user by either collegeEmail or standard email
    const user = await User.findOne({ 
      $or: [
        { collegeEmail },
        { email: collegeEmail } // Reusing the collegeEmail argument as the standard email
      ]
    }).select("+password");

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

//update user

export const updateUser = async (userId, data) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // Only these fields are editable
    const allowedFields = ["name", "email"];

    // Check for invalid fields
    const invalidFields = Object.keys(data).filter(
        field => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
        throw new Error(
            `You cannot update the following field(s): ${invalidFields.join(", ")}`
        );
    }

    // Update name
    if (data.name !== undefined) {

        const name = data.name.trim();

        if (name.length === 0) {
            throw new Error("Name cannot be empty");
        }

        user.name = name;
    }

    // Update email
    if (data.email !== undefined) {

        if (!isValidEmail(data.email)) {
            throw new Error("Invalid email format");
        }

        const existingUser = await User.findOne({
            email: data.email,
            _id: { $ne: userId }
        });

        if (existingUser) {
            throw new Error("Email already in use");
        }

        user.email = data.email;
    }

    await user.save();

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