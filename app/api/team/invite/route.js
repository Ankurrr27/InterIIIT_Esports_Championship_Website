import { withAuth } from "@/lib/helpers/apiHandler";
import { inviteMember } from "@/lib/service/team.service";

export const POST = withAuth(async (req, currentUser) => {
  const { email } = await req.json();

  if (!email) {
    throw new Error("Email is required.");
  }

  const result = await inviteMember(currentUser._id, email);

  return Response.json({
    success: true,
    ...result,
  });
});
