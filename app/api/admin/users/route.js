import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/helpers/adminAuth";
import User from "@/lib/models/User";
import Team from "@/lib/models/Team"; // Need for populate or if referenced

export async function GET(req) {
  await dbConnect();

  try {
    await requireAdmin(req);

    const users = await User.find({})
      .populate("teamId", "name isRegistered")
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      users,
    });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await dbConnect();

  try {
    await requireAdmin(req);
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return Response.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    if (user.teamId) {
      const team = await Team.findById(user.teamId);
      if (team && team.leaderId.toString() === userId) {
        return Response.json({ success: false, message: "Cannot delete a Team Leader. Please delete the team first." }, { status: 400 });
      }

      // If they are just a player, remove them from the team
      if (team) {
        await Team.updateOne(
          { _id: team._id },
          { $pull: { members: { userId: user._id } } }
        );
      }
    }

    await User.deleteOne({ _id: user._id });

    return Response.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  await dbConnect();

  try {
    await requireAdmin(req);
    const body = await req.json();
    const { userId, name, email, collegeEmail, college, game } = body;

    if (!userId) {
      return Response.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // If changing college or game while in a team, block it
    if (user.teamId && (user.college !== college || user.game !== game)) {
      return Response.json({ 
        success: false, 
        message: "Cannot change college or game while the user is in a team. Remove them from the team first." 
      }, { status: 400 });
    }

    // Check email uniqueness if email changed
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) return Response.json({ success: false, message: "Email is already in use by another user" }, { status: 400 });
      user.email = email;
    }

    if (collegeEmail && collegeEmail !== user.collegeEmail) {
      const existingCollegeEmail = await User.findOne({ collegeEmail });
      if (existingCollegeEmail) return Response.json({ success: false, message: "College email is already in use" }, { status: 400 });
      user.collegeEmail = collegeEmail;
    }

    if (name) user.name = name;
    if (college) user.college = college;
    if (game) user.game = game;

    await user.save();

    return Response.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
