import { withAuth } from "@/lib/helpers/apiHandler";
import { getInvitations } from "@/lib/service/team.service";

// Get pending invitations for the current user
export const GET = withAuth(async (req, currentUser) => {
  const invitations = await getInvitations(currentUser._id);

  return Response.json({
    success: true,
    invitations,
  });
});
