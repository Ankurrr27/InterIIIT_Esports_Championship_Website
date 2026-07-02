import { dbConnect } from "@/lib/mongodb";
import { registerUser } from "@/lib/service/user.service";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    const user = await registerUser(body);
    return Response.json(user);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}