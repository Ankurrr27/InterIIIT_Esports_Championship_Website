import { dbConnect } from "@/lib/mongodb";
import { requestJoinTeam } from "@/lib/service/team.service";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    const result = await requestJoinTeam(body);
    return Response.json(result);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}