import { dbConnect } from "@/lib/mongodb";
import CollegeRequest from "@/lib/models/CollegeRequest";
import { requireStaff } from "@/lib/helpers/adminAuth";

/**
 * GET /api/college-requests/stats
 * Returns dashboard statistics (admin only).
 */
export async function GET(req) {
  try {
    await requireStaff(req);
    await dbConnect();

    const [total, pending, approved, rejected, recent] = await Promise.all([
      CollegeRequest.countDocuments(),
      CollegeRequest.countDocuments({ status: "Pending" }),
      CollegeRequest.countDocuments({ status: "Approved" }),
      CollegeRequest.countDocuments({ status: "Rejected" }),
      CollegeRequest.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("college_name club_name coordinator_name status createdAt college_logo")
        .lean(),
    ]);

    return Response.json({
      success: true,
      data: {
        total,
        pending,
        approved,
        rejected,
        recent,
      },
    });
  } catch (err) {
    const status = err.message.includes("Admin") || err.message.includes("Auth") ? 401 : 500;
    return Response.json(
      { success: false, error: err.message },
      { status }
    );
  }
}
