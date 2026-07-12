import { withAuth } from "@/lib/helpers/apiHandler";
import { joinWithCode } from "@/lib/service/team.service";

export const POST = withAuth(async (req, currentUser) => {
  const { inviteCode } = await req.json();

  if (!inviteCode) {
    throw new Error("Invite code is required.");
  }

  const result = await joinWithCode(currentUser._id, inviteCode);

  return Response.json({
    success: true,
    ...result,
  });
});
