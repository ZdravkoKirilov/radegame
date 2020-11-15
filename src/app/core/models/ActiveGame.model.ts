import { Player, GameId, SetupId } from "@app/game-mechanics";

export type ActiveGame = {
    game_id: GameId;
    setup: SetupId;
    players: Player[];
    public_id: number;
};