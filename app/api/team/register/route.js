import { withAuth } from "@/lib/helpers/apiHandler";
import { registerTeam } from "@/lib/service/team.service";

export const POST = withAuth(async (req, currentUser) => {
  const result = await registerTeam(currentUser._id);

  return Response.json({
    success: true,
    ...result,
  });
});
