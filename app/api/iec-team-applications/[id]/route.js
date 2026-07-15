import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/mongodb";
import IECTeamApplication from "@/lib/models/IECTeamApplication";
import IECTeamMember from "@/lib/models/IECTeamMember";
import { requireAdmin } from "@/lib/helpers/adminAuth";

/**
 * PATCH /api/iec-team-applications/[id]
 * Admin: Update application status.
 * If approved, automatically create an IECTeamMember record.
 */
export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    await requireAdmin(req);

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status || !["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return Response.json(
        { success: false, error: "Invalid status. Must be PENDING, APPROVED, or REJECTED" },
        { status: 400 }
      );
    }

    const application = await IECTeamApplication.findById(id);
    if (!application) {
      return Response.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    const previousStatus = application.status;
    application.status = status;
    await application.save();

    // If approved, create an IECTeamMember
    if (status === "APPROVED" && previousStatus !== "APPROVED") {
      // Check if member already exists
      const existingMember = await IECTeamMember.findOne({
        name: application.name,
        role: application.role,
      });

      if (!existingMember) {
        const memberCount = await IECTeamMember.countDocuments();
        await IECTeamMember.create({
          name: application.name,
          role: application.role,
          image_url: application.image_url,
          instagram: application.instagram,
          linkedin: application.linkedin,
          order: memberCount,
        });
      }
    }

    revalidatePath("/iec-team");

    return Response.json({
      success: true,
      message: `Application ${status.toLowerCase()} successfully`,
    });
  } catch (err) {
    console.error("IEC team application PATCH error:", err);
    return Response.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/iec-team-applications/[id]
 * Admin: Permanently delete an application.
 */
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    await requireAdmin(req);

    const { id } = await params;

    const application = await IECTeamApplication.findByIdAndDelete(id);
    if (!application) {
      return Response.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    revalidatePath("/iec-team");

    return Response.json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (err) {
    console.error("IEC team application DELETE error:", err);
    return Response.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
