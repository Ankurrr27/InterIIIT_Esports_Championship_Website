import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/helpers/adminAuth";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

/**
 * GET /api/admin/staff
 * Get all staff members (ADMIN, MODERATOR)
 */
export async function GET(req) {
  try {
    await requireAdmin(req);
    await dbConnect();

    const staff = await User.find({ role: { $in: ["ADMIN", "MODERATOR"] } })
      .select("name email role collegeEmail createdAt")
      .lean();

    return Response.json({ success: true, staff });
  } catch (err) {
    const status = err.message.includes("Admin") || err.message.includes("Auth") ? 401 : 500;
    return Response.json({ success: false, error: err.message }, { status });
  }
}

/**
 * POST /api/admin/staff
 * Create a new staff member (Admin/Moderator)
 */
export async function POST(req) {
  try {
    await requireAdmin(req);
    await dbConnect();

    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    if (!["ADMIN", "MODERATOR"].includes(role)) {
      return Response.json({ success: false, error: "Invalid role" }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ success: false, error: "User already exists with this email" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      collegeEmail: email, // Use same for bypass
      password: hashed,
      role,
      college: "ADMIN",
      game: "BGMI", // Dummy required field
    });

    return Response.json({ success: true, message: "Staff member created", user: { id: newUser._id, email: newUser.email, role: newUser.role } }, { status: 201 });
  } catch (err) {
    const status = err.message.includes("Admin") || err.message.includes("Auth") ? 401 : 500;
    return Response.json({ success: false, error: err.message }, { status });
  }
}
