import { withAuth } from "@/lib/helpers/apiHandler";

export const GET = withAuth(async (req, currentUser) => {

    return Response.json({
        success: true,
        user: {
            id: currentUser._id,
            name: currentUser.name,
            email: currentUser.email,
            collegeEmail: currentUser.collegeEmail,
            college: currentUser.college,
            game: currentUser.game,
            role: currentUser.role,
            teamId: currentUser.teamId
        }
    });

});

export const PATCH = withAuth(async (req, currentUser) => {
    try {
        const body = await req.json();
        const { name, college, game } = body;

        if (name) currentUser.name = name;
        if (college) currentUser.college = college;
        
        // Prevent game change if user is in a team
        if (game) {
            if (currentUser.teamId) {
                return Response.json({ success: false, error: "Cannot change game while in a team. Leave the team first." }, { status: 400 });
            }
            currentUser.game = game;
        }

        await currentUser.save();

        return Response.json({
            success: true,
            user: {
                id: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                collegeEmail: currentUser.collegeEmail,
                college: currentUser.college,
                game: currentUser.game,
                role: currentUser.role,
                teamId: currentUser.teamId
            }
        });
    } catch (error) {
        return Response.json({ success: false, error: "Failed to update profile" }, { status: 500 });
    }
});