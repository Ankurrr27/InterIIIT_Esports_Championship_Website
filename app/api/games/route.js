import { GAMES } from "@/lib/constants/games";

export async function GET() {
    return Response.json({
        success: true,
        games: GAMES
    });
}