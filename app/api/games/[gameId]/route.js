import { getGameById } from "@/lib/service/game.service";
import { dbConnect } from "@/lib/mongodb";

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { gameId } = await params;
        const game = await getGameById(gameId);

        return Response.json({
            success: true,
            game
        });
    } catch (err) {
        return Response.json({
            success: false,
            error: err.message
        }, { status: 404 });
    }
}