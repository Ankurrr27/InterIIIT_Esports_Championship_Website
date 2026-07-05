import { dbConnect } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import { getCurrentTeam } from "@/lib/service/team.service";

export async function GET(req) {
  await dbConnect();

  try {
    const user = await requireAuth(req);

    const team = await getCurrentTeam(user._id);

    return Response.json({
      success: true,
      team,
      currentUser: {
        id: user._id,
        role: user.role,
      },
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 400,
      }
    );
  }
}