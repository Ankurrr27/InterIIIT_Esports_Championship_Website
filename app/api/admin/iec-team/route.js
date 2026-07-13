import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/helpers/adminAuth";
import IECTeamMember from "@/lib/models/IECTeamMember";
import { uploadToCloudinary } from "@/lib/cloudinary";

/**
 * POST /api/admin/iec-team
 * Add a new IEC core team member
 */
export async function POST(req) {
  try {
    await requireAdmin(req);
    await dbConnect();

    const formData = await req.formData();
    const name = formData.get("name");
    const role = formData.get("role");
    const instagram = formData.get("instagram");
    const linkedin = formData.get("linkedin");
    const order = formData.get("order") || 0;
    const imageFile = formData.get("image");

    if (!name || !role || !imageFile) {
      return Response.json({ success: false, error: "Name, role, and image are required" }, { status: 400 });
    }

    let image_url = "";
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await uploadToCloudinary(buffer);
      image_url = result.url;
    }

    const member = await IECTeamMember.create({
      name,
      role,
      image_url,
      instagram,
      linkedin,
      order: Number(order)
    });

    return Response.json({ success: true, member });
  } catch (err) {
    const status = err.message.includes("Admin") || err.message.includes("Auth") ? 401 : 500;
    return Response.json({ success: false, error: err.message }, { status });
  }
}

/**
 * PATCH /api/admin/iec-team?id=...
 * Update a member's image (and optionally name/role/links)
 */
export async function PATCH(req) {
  try {
    await requireAdmin(req);
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return Response.json({ success: false, error: "ID required" }, { status: 400 });

    const formData = await req.formData();
    const imageFile = formData.get("image");
    const name = formData.get("name");
    const role = formData.get("role");
    const instagram = formData.get("instagram");
    const linkedin = formData.get("linkedin");
    const order = formData.get("order");

    const member = await IECTeamMember.findById(id);
    if (!member) return Response.json({ success: false, error: "Member not found" }, { status: 404 });

    // Update image if provided
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await uploadToCloudinary(buffer);
      member.image_url = result.url;
    }

    if (name) member.name = name;
    if (role) member.role = role;
    if (instagram !== null && instagram !== undefined) member.instagram = instagram;
    if (linkedin !== null && linkedin !== undefined) member.linkedin = linkedin;
    if (order !== null && order !== undefined) member.order = Number(order);

    await member.save();

    return Response.json({ success: true, member });
  } catch (err) {
    const status = err.message.includes("Admin") || err.message.includes("Auth") ? 401 : 500;
    return Response.json({ success: false, error: err.message }, { status });
  }
}

/**
 * DELETE /api/admin/iec-team?id=...
 */
export async function DELETE(req) {
  try {
    await requireAdmin(req);
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return Response.json({ success: false, error: "ID required" }, { status: 400 });

    await IECTeamMember.findByIdAndDelete(id);

    return Response.json({ success: true });
  } catch (err) {
    const status = err.message.includes("Admin") || err.message.includes("Auth") ? 401 : 500;
    return Response.json({ success: false, error: err.message }, { status });
  }
}
