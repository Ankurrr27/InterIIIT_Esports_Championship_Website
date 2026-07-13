import { dbConnect } from "@/lib/mongodb";
import IECTeamMember from "@/lib/models/IECTeamMember";

export async function GET() {
  try {
    await dbConnect();

    const team = await IECTeamMember.find({}).sort({ order: 1, createdAt: 1 }).lean();

    return Response.json({ success: true, team });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
