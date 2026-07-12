import Team from "@/lib/models/Team";
import { GAMES } from "@/lib/constants/games";

export const getGameById = async (gameId) => {

    const game = GAMES[gameId];

    if (!game) {
        throw new Error("Game not found.");
    }

    const registeredTeams = await Team.countDocuments({
        game: gameId
    });

    const participatingColleges = await Team.distinct(
        "college",
        {
            game: gameId
        }
    );

    return {
        ...game,
        registeredTeams,
        participatingColleges: participatingColleges.length
    };

};