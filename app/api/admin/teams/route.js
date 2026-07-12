import { dbConnect } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import Team from "@/lib/models/Team";
import User from "@/lib/models/User"; // needed for population
import JoinRequest from "@/lib/models/JoinRequest";
import Invitation from "@/lib/models/Invitation";

export async function GET(req) {
  await dbConnect();

  try {
    const user = await requireAuth(req);
    if (user.role !== "ADMIN") {
      return Response.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const teams = await Team.find({})
      .populate("leaderId", "name email collegeEmail")
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      teams,
    });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await dbConnect();

  try {
    const user = await requireAuth(req);
    if (user.role !== "ADMIN") {
      return Response.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const url = new URL(req.url);
    const teamId = url.searchParams.get("teamId");

    if (!teamId) {
      return Response.json({ success: false, message: "Team ID is required" }, { status: 400 });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return Response.json({ success: false, message: "Team not found" }, { status: 404 });
    }

    // Cascade delete members
    await User.updateMany(
      { _id: { $in: team.members.map((m) => m.userId) } },
      { $set: { teamId: null, role: "PLAYER" } }
    );

    await JoinRequest.deleteMany({ teamId: team._id });
    await Invitation.deleteMany({ teamId: team._id });
    await Team.deleteOne({ _id: team._id });

    return Response.json({
      success: true,
      message: "Team deleted successfully",
    });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
