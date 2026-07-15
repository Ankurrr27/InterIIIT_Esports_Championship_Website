import { revalidatePath } from "next/cache";
import { getIECTeamMembers } from "@/lib/helpers/iecTeam";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const team = await getIECTeamMembers();

    return Response.json({ success: true, team });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST() {
  revalidatePath("/iec-team");
  return Response.json({ success: true });
}
