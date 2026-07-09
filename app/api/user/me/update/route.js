import { withAuth } from "@/lib/helpers/apiHandler";
import { updateUser } from "@/lib/service/user.service";

export const PATCH = withAuth(async (req, currentUser) => {

    const body = await req.json();

    const user = await updateUser(currentUser._id, body);

    return Response.json({
        success: true,
        message: "Profile updated successfully.",
        user
    });

});