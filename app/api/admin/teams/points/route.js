import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/helpers/adminAuth";
import Team from "@/lib/models/Team";

/**
 * PATCH /api/admin/teams/points
 * Update a team's points and matches played.
 */
export async function PATCH(req) {
  try {
    await requireAdmin(req);
    await dbConnect();

    const { teamId, points, matchesPlayed } = await req.json();

    if (!teamId || points === undefined || matchesPlayed === undefined) {
      return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const team = await Team.findByIdAndUpdate(
      teamId,
      { $set: { points: Number(points), matchesPlayed: Number(matchesPlayed) } },
      { new: true }
    ).lean();

    if (!team) {
      return Response.json({ success: false, error: "Team not found" }, { status: 404 });
    }

    return Response.json({ success: true, team });
  } catch (err) {
    const status = err.message.includes("Admin") || err.message.includes("Auth") ? 401 : 500;
    return Response.json({ success: false, error: err.message }, { status });
  }
}
