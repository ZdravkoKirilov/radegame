import { Player, GameId } from "@app/game-mechanics";

export type ActiveGame = {
    game_id: GameId;
    setup: number;
    players: Player[];
    public_id: number;
};