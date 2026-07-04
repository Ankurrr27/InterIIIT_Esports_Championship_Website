import { withAuth } from "@/lib/helpers/apiHandler";
import {
  requestJoinTeam,
  getPendingRequests,
} from "@/lib/service/team.service";

// Send Join Request
export const POST = withAuth(async (req, currentUser) => {
  const { teamId } = await req.json();

  if (!teamId) {
    throw new Error("Team ID is required.");
  }

  const result = await requestJoinTeam(
    currentUser._id,
    teamId
  );

  return Response.json({
    success: true,
    ...result,
  });
});

// Get Pending Requests (Leader)
export const GET = withAuth(async (req, currentUser) => {
  const requests = await getPendingRequests(currentUser._id);

  return Response.json({
    success: true,
    requests,
  });
});