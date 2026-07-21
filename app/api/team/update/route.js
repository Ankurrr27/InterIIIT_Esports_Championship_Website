import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import Team from "@/lib/models/Team";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export async function POST(req) {
  try {
    await dbConnect();
    const currentUser = await requireAuth(req);

    const formData = await req.formData();
    const teamId = formData.get("teamId");
    const name = formData.get("name");
    const bannerFile = formData.get("banner"); // File or null

    if (!teamId) {
      return NextResponse.json({ success: false, message: "Team ID is required" }, { status: 400 });
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

    // Update name if provided
    if (name && name !== team.name) {
      const existingTeam = await Team.findOne({ name, _id: { $ne: teamId } });
      if (existingTeam) {
        return NextResponse.json({ success: false, message: "Team name already taken" }, { status: 400 });
      }
      team.name = name;
    }

    // Upload banner if provided
    if (bannerFile && bannerFile.size > 0) {
      // Delete old banner from Cloudinary
      if (team.bannerPublicId) {
        await deleteFromCloudinary(team.bannerPublicId);
      }

      const bytes = await bannerFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await uploadToCloudinary(buffer, "iec-team-banners");
      team.banner = result.url;
      team.bannerPublicId = result.public_id;
    }

    await team.save();

    return NextResponse.json({ success: true, team });
  } catch (error) {
    console.error("Team update error:", error);
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}
