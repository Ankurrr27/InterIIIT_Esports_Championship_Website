import { withApi } from "@/lib/helpers/apiHandler";
import { getGames } from "@/lib/service/game.service";

export const GET = withApi(async () => {

    const games = getGames();

    return Response.json({
        success: true,
        games
    });

});