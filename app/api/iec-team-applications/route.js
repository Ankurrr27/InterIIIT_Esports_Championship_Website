import { dbConnect } from "@/lib/mongodb";
import IECTeamApplication from "@/lib/models/IECTeamApplication";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/helpers/adminAuth";

/**
 * POST /api/iec-team-applications
 * Public: Submit a new IEC team application.
 */
export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();

    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const role = formData.get("role")?.trim();
    const instagram = formData.get("instagram")?.trim() || null;
    const linkedin = formData.get("linkedin")?.trim() || null;
    const reason_to_join = formData.get("reason_to_join")?.trim();
    const imageFile = formData.get("image");

    // Validate required fields
    if (!name || !email || !role || !reason_to_join) {
      return Response.json(
        { success: false, error: "Name, email, role, and reason to join are required" },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!imageFile || imageFile.size === 0) {
      return Response.json(
        { success: false, error: "Profile image is required" },
        { status: 400 }
      );
    }

    // Check duplicate email
    const existing = await IECTeamApplication.findOne({
      email: email.toLowerCase(),
      status: { $ne: "REJECTED" },
    });

    if (existing) {
      return Response.json(
        { success: false, error: "An application with this email already exists" },
        { status: 409 }
      );
    }

    // Upload image to Cloudinary
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await uploadToCloudinary(buffer, "iec-team-applications");
    const image_url = result.url;

    // Create application
    const application = await IECTeamApplication.create({
      name,
      email: email.toLowerCase(),
      role,
      image_url,
      instagram,
      linkedin,
      reason_to_join,
      status: "PENDING",
    });

    return Response.json(
      { success: true, message: "Application submitted successfully", id: application._id },
      { status: 201 }
    );
  } catch (err) {
    console.error("IEC team application POST error:", err);
    if (err.stack) console.error(err.stack);
    return Response.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/iec-team-applications
 * Admin: Fetch all applications, optionally filtered by status.
 */
export async function GET(req) {
  try {
    await dbConnect();
    await requireAdmin(req);

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const filter = {};
    if (status && ["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      filter.status = status;
    }

    const applications = await IECTeamApplication.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({ success: true, data: applications });
  } catch (err) {
    console.error("IEC team application GET error:", err);
    return Response.json(
      { success: false, error: err.message || "Internal server error" },
      { status: err.message?.includes("access") ? 403 : 500 }
    );
  }
}
