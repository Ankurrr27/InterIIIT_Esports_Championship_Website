import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import User from "@/lib/models/User";
import Team from "@/lib/models/Team"; // Needed to register the model for populate

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await dbConnect();
    const currentUser = await requireAuth(req);

    if (!currentUser.college) {
      return NextResponse.json({ success: false, message: "User college not found" }, { status: 400 });
    }

    // Find all users from the same college (regardless of game, so they can see everyone)
    const directory = await User.find({ 
      college: currentUser.college,
      _id: { $ne: currentUser._id }
    })
      .populate("teamId", "name isRegistered")
      .select("name email collegeEmail profileImage game role teamId createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, directory, college: currentUser.college });
  } catch (error) {
    console.error("Directory fetch error:", error);
    // requireAuth throws error on fail, catch it here
    if (error.message === "Authorization header missing" || error.message.includes("token")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}
