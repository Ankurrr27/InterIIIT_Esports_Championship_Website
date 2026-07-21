import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import Team from "@/lib/models/Team";

export async function POST(req) {
  try {
    await dbConnect();
    const currentUser = await requireAuth(req);

    const body = await req.json();
    const { teamId, name } = body;

    if (!teamId || !name) {
      return NextResponse.json({ success: false, message: "Team ID and name are required" }, { status: 400 });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return NextResponse.json({ success: false, message: "Team not found" }, { status: 404 });
    }

    if (team.leaderId.toString() !== currentUser._id.toString()) {
      return NextResponse.json({ success: false, message: "Only the captain can edit the team" }, { status: 403 });
    }

    if (team.isRegistered) {
      return NextResponse.json({ success: false, message: "Cannot edit a registered team" }, { status: 403 });
    }

    // Check if name is already taken
    const existingTeam = await Team.findOne({ name, _id: { $ne: teamId } });
    if (existingTeam) {
      return NextResponse.json({ success: false, message: "Team name already taken" }, { status: 400 });
    }

    team.name = name;
    await team.save();

    return NextResponse.json({ success: true, team });
  } catch (error) {
    console.error("Team update error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
