import { withAuth } from "@/lib/helpers/apiHandler";
import { respondToInvitation } from "@/lib/service/team.service";

export const POST = withAuth(async (req, currentUser) => {
  const { invitationId, accept } = await req.json();

  if (!invitationId || accept === undefined) {
    throw new Error("Invitation ID and accept status are required.");
  }

  const result = await respondToInvitation(currentUser._id, invitationId, accept);

  return Response.json({
    success: true,
    ...result,
  });
});
