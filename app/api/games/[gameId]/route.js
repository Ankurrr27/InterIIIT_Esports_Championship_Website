import { withApi } from "@/lib/helpers/apiHandler";
import { getGameById } from "@/lib/service/game.service";

export const GET = withApi(async (req, { params }) => {

    const game = await getGameById(params.gameId);

    return Response.json({
        success: true,
        game
    });

});