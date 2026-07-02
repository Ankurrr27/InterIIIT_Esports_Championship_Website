import { dbConnect } from "@/lib/mongodb";
import { createTeam } from "@/lib/service/team.service";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    const team = await createTeam(body);
    return Response.json(team);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}