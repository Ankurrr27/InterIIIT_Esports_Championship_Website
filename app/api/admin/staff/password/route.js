import { dbConnect } from "@/lib/mongodb";
import { requireStaff } from "@/lib/helpers/adminAuth";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

/**
 * PATCH /api/admin/staff/password
 * Change a staff member's password.
 * Admins can change anyone's password.
 * Moderators can only change their own password.
 */
export async function PATCH(req) {
  try {
    const currentUser = await requireStaff(req);
    await dbConnect();

    const { userId, newPassword } = await req.json();

    if (!userId || !newPassword) {
      return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Verify permissions
    if (currentUser.role !== "ADMIN" && currentUser.id.toString() !== userId.toString()) {
      return Response.json({ success: false, error: "You can only change your own password" }, { status: 403 });
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return Response.json({ success: false, error: "User not found" }, { status: 404 });
    }

    if (!["ADMIN", "MODERATOR"].includes(targetUser.role)) {
       return Response.json({ success: false, error: "Cannot change password of non-staff members here" }, { status: 403 });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    targetUser.password = hashed;
    await targetUser.save();

    return Response.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    const status = err.message.includes("Staff") || err.message.includes("Auth") ? 401 : 500;
    return Response.json({ success: false, error: err.message }, { status });
  }
}
