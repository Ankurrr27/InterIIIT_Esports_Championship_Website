import { dbConnect } from "@/lib/mongodb";
import IECTeamMember from "@/lib/models/IECTeamMember";

export async function getIECTeamMembers() {
  await dbConnect();
  return IECTeamMember.find({}).sort({ order: 1, createdAt: 1 }).lean();
}
